<#
  Dycom — clean up the Home page presentation
  ------------------------------------------------------------------
  Run this ONCE in the Sitecore PowerShell Extensions ISE (XM Cloud CM)
  against the 'dycom' site. It is idempotent and defensive: each step is
  guarded, logs what it does, and a failure in one step does not abort the
  rest. It only touches the 'dycom' site.

  What it does:
    1. Resolves the 'dycom' site and its Home page.
    2. Seeds a Dycom Network Map datasource (companies + locations) from the
       branch template, under <site>/Data.
    3. Clears the Home page body (headless-main) and adds:
         - a minimal Dycom header (Rich Text wordmark)
         - the Dycom Network Map rendering (bound to the seeded datasource)
         - a minimal Dycom footer (Rich Text)
    4. Gives the Home page a clean "Dycom" Page Design with NO partial designs,
       so the inherited SYNC header/footer chrome stops rendering.
    5. Ensures Dycom Network Map (and Rich Text) are in the site's Available
       Renderings so they show in the component picker.

  After running: Publish the site (or the Home item + Data) and refresh Pages.
#>

$ErrorActionPreference = "Continue"
$SiteName = "dycom"

# --- well-known ids -------------------------------------------------------
$pageDesignTemplateId   = "{1105B8F8-1E00-426B-BF1F-C840742D827B}"
$availRenderingsTplId    = "{76DA0A8D-FC7E-42B2-AF1E-205B49E43F98}"
$renderingsFieldId       = "{715AE6C0-71C8-4744-AB4F-65362D20AD65}"
$siteDataFolderTplId     = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
$mainPlaceholder         = "headless-main"

$mapRenderingPath   = "master:/sitecore/layout/Renderings/Project/click-click-launch/Dycom Network Map/Dycom Network Map"
$mapBranchPath      = "master:/sitecore/templates/Branches/Project/click-click-launch/Components/Dycom Network Map"

function Log($m) { Write-Host "[dycom-clean] $m" }

# --- 1. resolve the site --------------------------------------------------
Log "Resolving site '$SiteName'..."
$siteItem = Get-ChildItem "master:/sitecore/content" -Recurse -Language en |
  Where-Object { $_.Name -eq $SiteName -and (Test-Path "$($_.Paths.Path)/Home") } |
  Select-Object -First 1

if (-not $siteItem) {
  Log "ERROR: could not find a site named '$SiteName' with a Home child under /sitecore/content. Set `$SiteName correctly and re-run."
  return
}
$sitePath = $siteItem.Paths.Path
$home = Get-Item -Path "$sitePath/Home" -Language en
Log "Site: $sitePath"

# --- 2. seed the Dycom datasource from the branch -------------------------
$dsName = "Dycom Network Map"
$dsPath = "local:/Data/$dsName"
try {
  $dataFolderPath = "$sitePath/Data"
  if (-not (Test-Path $dataFolderPath)) {
    New-Item -Path $sitePath -Name "Data" -ItemType $siteDataFolderTplId | Out-Null
    Log "Created Data folder."
  }
  if (-not (Test-Path "$dataFolderPath/$dsName")) {
    $branch = Get-Item -Path $mapBranchPath -ErrorAction Stop
    New-Item -Path $dataFolderPath -Name $dsName -ItemType $branch.ID | Out-Null
    Log "Seeded sample datasource at $dataFolderPath/$dsName"
  } else {
    Log "Datasource already exists at $dataFolderPath/$dsName (left as-is)."
  }
} catch { Log "WARN seeding datasource: $($_.Exception.Message)" }

# --- helper: get-or-create a Rich Text datasource with given html ---------
$richTextRendering = Get-Item -Path "master:/sitecore/layout/Renderings/Feature/JSS Experience Accelerator/Page Content/Rich Text" -ErrorAction SilentlyContinue
if (-not $richTextRendering) {
  $richTextRendering = Get-ChildItem "master:/sitecore/layout/Renderings/Feature" -Recurse |
    Where-Object { $_.Name -eq "Rich Text" } | Select-Object -First 1
}

function New-RichTextDatasource($name, $html) {
  try {
    $rtTplId = $richTextRendering."Datasource Template"
    if (-not $rtTplId) { Log "WARN: Rich Text datasource template not found; skipping '$name'."; return $null }
    $rtTpl = Get-Item "master:$rtTplId" -ErrorAction SilentlyContinue
    if (-not $rtTpl) { Log "WARN: cannot resolve Rich Text template; skipping '$name'."; return $null }
    if (-not (Test-Path "$sitePath/Data/$name")) {
      $i = New-Item -Path "$sitePath/Data" -Name $name -ItemType $rtTpl.ID
      $i.Editing.BeginEdit() | Out-Null
      $i["Text"] = $html
      $i.Editing.EndEdit() | Out-Null
    }
    return "local:/Data/$name"
  } catch { Log "WARN creating Rich Text '$name': $($_.Exception.Message)"; return $null }
}

# --- 3. rebuild the Home body (headless-main) -----------------------------
try {
  Log "Clearing existing Home body renderings (final layout)..."
  Get-Rendering -Item $home -FinalLayout -Device (Get-LayoutDevice "Default") |
    ForEach-Object { Remove-Rendering -Item $home -Instance $_ -FinalLayout -Device (Get-LayoutDevice "Default") }

  $headerDs = New-RichTextDatasource "Dycom Header" "<div style='padding:16px 0;font-weight:800;font-size:20px;color:#005cb9'>Dycom &mdash; Family of Companies</div>"
  $footerDs = New-RichTextDatasource "Dycom Footer" "<div style='padding:24px 0;color:#5a5a5a;font-size:13px;border-top:1px solid #e5e7eb;margin-top:24px'>&copy; Dycom Industries &mdash; one connected network.</div>"

  if ($richTextRendering -and $headerDs) {
    Add-Rendering -Item $home -PlaceHolder $mainPlaceholder -Instance ($richTextRendering | New-Rendering) -DataSource $headerDs -FinalLayout
    Log "Added Dycom header."
  }

  $mapRendering = Get-Item -Path $mapRenderingPath -ErrorAction Stop
  Add-Rendering -Item $home -PlaceHolder $mainPlaceholder -Instance ($mapRendering | New-Rendering) -DataSource $dsPath -FinalLayout
  Log "Added Dycom Network Map (datasource $dsPath)."

  if ($richTextRendering -and $footerDs) {
    Add-Rendering -Item $home -PlaceHolder $mainPlaceholder -Instance ($richTextRendering | New-Rendering) -DataSource $footerDs -FinalLayout
    Log "Added Dycom footer."
  }
} catch { Log "WARN rebuilding Home body: $($_.Exception.Message)" }

# --- 4. clean Page Design (drops inherited SYNC header/footer chrome) ------
try {
  $pageDesignsItem = Get-Item -Path "$sitePath/Presentation/Page Designs" -Language en -ErrorAction Stop
  $dycomDesignPath = "$($pageDesignsItem.Paths.Path)/Dycom"
  if (-not (Test-Path $dycomDesignPath)) {
    $dycomDesign = New-Item -Path $pageDesignsItem.Paths.Path -Name "Dycom" -ItemType $pageDesignTemplateId
  } else {
    $dycomDesign = Get-Item $dycomDesignPath -Language en
  }
  $dycomDesign.Editing.BeginEdit() | Out-Null
  $dycomDesign["PartialDesigns"] = ""   # no header/footer chrome
  $dycomDesign.Editing.EndEdit() | Out-Null

  # map the Home page's template -> the clean Dycom page design
  $map = [Sitecore.Text.UrlString]::new([System.Web.HttpUtility]::UrlDecode([string]$pageDesignsItem.TemplatesMapping))
  $map[[string]$home.TemplateID] = "$($dycomDesign.ID)"
  $pageDesignsItem.Editing.BeginEdit() | Out-Null
  $pageDesignsItem.TemplatesMapping = [System.Web.HttpUtility]::UrlEncode($map.ToString())
  $pageDesignsItem.Editing.EndEdit() | Out-Null
  Log "Mapped Home template $($home.TemplateID) -> clean 'Dycom' page design (no partial designs)."
} catch { Log "WARN setting page design: $($_.Exception.Message) (body is still clean; remove SYNC partial designs manually if chrome persists)" }

# --- 5. ensure renderings are in the picker (Available Renderings) --------
try {
  $arRoot = Get-Item -Path "$sitePath/Presentation/Available Renderings" -Language en -ErrorAction Stop
  $grpPath = "$($arRoot.Paths.Path)/Dycom"
  if (-not (Test-Path $grpPath)) {
    $grp = New-Item -Path $arRoot.Paths.Path -Name "Dycom" -ItemType $availRenderingsTplId
  } else {
    $grp = Get-Item $grpPath -Language en
  }
  $ids = @((Get-Item $mapRenderingPath).ID.ToString())
  if ($richTextRendering) { $ids += $richTextRendering.ID.ToString() }
  $grp.Editing.BeginEdit() | Out-Null
  $grp[$renderingsFieldId] = ($ids -join "|")
  $grp.Editing.EndEdit() | Out-Null
  Log "Added Dycom Network Map to Available Renderings group 'Dycom'."
} catch { Log "WARN updating Available Renderings: $($_.Exception.Message)" }

Log "Done. Now Publish the 'dycom' site (Home + Data) and refresh Pages."
