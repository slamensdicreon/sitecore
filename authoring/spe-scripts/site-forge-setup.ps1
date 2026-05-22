Import-Function Get-ItemByIdSafe
Import-Function Update-PageTemplate
Import-Function Update-LinkField

function Invoke-ModuleScriptBody {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true, Position = 0 )]
        [Item]$Site,
    
        [Parameter(Mandatory = $true, Position = 1 )]
        [Item[]]$TenantTemplates        
    )
    
    begin {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - Begin (Forge Industrial)"
        Import-Function Get-ProjectTemplateBasedOnBaseTemplate
    }
    
    process {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - Process"
        $sitePath       = $Site.Paths.Path
        $siteCollection = $Site.Parent

        $homeItem = Get-Item -Path "$sitePath/Home" -Language $Site.Language
        Write-Verbose "Site path: $sitePath"

        # ─── Styles folder ────────────────────────────────────────────
        if (-not (Test-Path "$sitePath/Presentation/Styles")) {
            Import-Function Invoke-AddItem
            $action = Get-Item . -ID '{B2486523-7487-4526-978F-AD2E986B5CC4}'
            Invoke-AddItem $Site $action
        }

        # ─── Start item ───────────────────────────────────────────────
        $siteName     = $Site.Name
        $siteGrouping = Get-Item -Path "$sitePath/Settings/Site Grouping/$($siteName)" -Language $Site.Language
        $siteGrouping.StartItem = $homeItem.ID

        # ─── Page templates ──────────────────────────────────────────
        $basePageTemplateId     = "{AC9DE9BE-8E86-4147-8FBC-739D5560408B}"
        $baseHomePageTemplateId = "{4ACCF644-A506-421F-B60F-A05E5C6196B4}"
        $templatesRootPath      = "master:/sitecore/templates/Project/$($siteCollection.Name)"

        $pageTemplate = Get-Item -Path "$templatesRootPath/Page" -ErrorAction SilentlyContinue
        if ($pageTemplate) { $pageTemplate."__Base template" = $basePageTemplateId }

        $homePageTemplate     = Update-PageTemplate -BaseTemplateId $baseHomePageTemplateId `
                                                    -TemplateName "Home Page" `
                                                    -TemplatesRootPath $templatesRootPath
        $standardPageTemplate = Get-Item -Path "$templatesRootPath/forge-industrial/Pages/Standard Page" -ErrorAction SilentlyContinue

        # ─── Partial Designs ──────────────────────────────────────────
        $partialDesignsPath = "$sitePath/Presentation/Partial Designs"
        if (-not (Test-Path $partialDesignsPath)) {
            New-Item -Path $partialDesignsPath -ItemType "{B7692086-3943-40CE-9E1B-F5AECAB49A4F}" | Out-Null
        }
        $partialDesigns = Get-Item -Path $partialDesignsPath

        # Partial design template ID
        $partialDesignTemplateId = "{5A9AAF68-3342-4682-BD1D-33E7D00BAC8B}"

        # Helper: ensure a partial design exists, configure its placeholder
        function Ensure-PartialDesign {
            param([string]$Name, [string]$PlaceholderKey)
            $pd = Get-Item -Path "$partialDesignsPath/$Name" -ErrorAction SilentlyContinue
            if (-not $pd) {
                $pd = $partialDesigns | Add-Item -Name $Name -ItemType $partialDesignTemplateId -PassThru
            }
            if ($pd -and $PlaceholderKey) {
                $pd.Editing.BeginEdit()
                $pd["PlaceholderKey"] = $PlaceholderKey
                $pd.Editing.EndEdit()
            }
            return $pd
        }

        $headerPD = Ensure-PartialDesign -Name "Forge Header" -PlaceholderKey "forge-header"
        $footerPD = Ensure-PartialDesign -Name "Forge Footer" -PlaceholderKey "forge-footer"

        # Page-type-specific body partials (each gets ForgePageHeader + type-appropriate renderings)
        $productDetailBodyPD   = Ensure-PartialDesign -Name "Forge Product Detail Body"   -PlaceholderKey "forge-main"
        $industryLandingBodyPD = Ensure-PartialDesign -Name "Forge Industry Landing Body" -PlaceholderKey "forge-main"
        $aboutBodyPD           = Ensure-PartialDesign -Name "Forge About Body"            -PlaceholderKey "forge-main"
        $contactBodyPD         = Ensure-PartialDesign -Name "Forge Contact Body"          -PlaceholderKey "forge-main"
        $resourcesBodyPD       = Ensure-PartialDesign -Name "Forge Resources Body"        -PlaceholderKey "forge-main"
        $defaultBodyPD         = Ensure-PartialDesign -Name "Forge Default Body"          -PlaceholderKey "forge-main"

        # Idempotent helper: add a rendering to a partial if not already present
        function Add-PartialRendering {
            param([Item]$Partial, [string]$Placeholder, [Item]$Rendering)
            if ($Partial -and $Rendering) {
                if (-not (Get-Rendering -Item $Partial -Rendering $Rendering -FinalLayout -ErrorAction SilentlyContinue)) {
                    Add-Rendering -Item $Partial -PlaceHolder $Placeholder `
                                  -Instance ($Rendering | New-Rendering) -FinalLayout
                }
            }
        }

        # Shared rendering references
        $rHeader          = Get-Item -ID "{997FBD7D-AB28-44F8-DCCB-4A2506AAB902}"
        $rFooter          = Get-Item -ID "{9195085B-87F8-D0C3-C493-5AE959286450}"
        $rPageHeader      = Get-Item -ID "{801A35CA-4A86-D005-A738-92A9F3498856}"
        $rProductSpot     = Get-Item -ID "{08629CB1-FA20-7B6C-834F-728E05580B3F}"
        $rIndustriesR     = Get-Item -ID "{7F380110-6A3C-7D80-5296-80F42E7BE0E6}"
        $rCapability      = Get-Item -ID "{961A9A7B-1943-9779-7117-A5753A8D5EEC}"
        $rStatsBandR      = Get-Item -ID "{6457F496-9378-D3B7-B48A-2764C57D47A8}"
        $rContact         = Get-Item -ID "{C57A69C7-16A7-1520-231E-CD37683D80BF}"
        $rResourceListing = Get-Item -ID "{A79584BA-B35E-B4B8-7810-40F953CE5A3A}"

        # Wire global header / footer partials
        Add-PartialRendering -Partial $headerPD -Placeholder "forge-header" -Rendering $rHeader
        Add-PartialRendering -Partial $footerPD -Placeholder "forge-footer" -Rendering $rFooter

        # Product Detail body: ForgePageHeader + ForgeProductSpotlight
        Add-PartialRendering -Partial $productDetailBodyPD   -Placeholder "forge-main" -Rendering $rPageHeader
        Add-PartialRendering -Partial $productDetailBodyPD   -Placeholder "forge-main" -Rendering $rProductSpot

        # Industry Landing body: ForgePageHeader + ForgeIndustriesServed
        Add-PartialRendering -Partial $industryLandingBodyPD -Placeholder "forge-main" -Rendering $rPageHeader
        Add-PartialRendering -Partial $industryLandingBodyPD -Placeholder "forge-main" -Rendering $rIndustriesR

        # About body: ForgePageHeader + ForgeCapabilityShowcase + ForgeStatsBand
        Add-PartialRendering -Partial $aboutBodyPD           -Placeholder "forge-main" -Rendering $rPageHeader
        Add-PartialRendering -Partial $aboutBodyPD           -Placeholder "forge-main" -Rendering $rCapability
        Add-PartialRendering -Partial $aboutBodyPD           -Placeholder "forge-main" -Rendering $rStatsBandR

        # Contact body: ForgePageHeader + ForgeContactForm
        Add-PartialRendering -Partial $contactBodyPD         -Placeholder "forge-main" -Rendering $rPageHeader
        Add-PartialRendering -Partial $contactBodyPD         -Placeholder "forge-main" -Rendering $rContact

        # Resources body: ForgePageHeader + ForgeResourceListing
        Add-PartialRendering -Partial $resourcesBodyPD       -Placeholder "forge-main" -Rendering $rPageHeader
        Add-PartialRendering -Partial $resourcesBodyPD       -Placeholder "forge-main" -Rendering $rResourceListing

        # Default body: ForgePageHeader only
        Add-PartialRendering -Partial $defaultBodyPD         -Placeholder "forge-main" -Rendering $rPageHeader

        Write-Verbose "Partial designs configured (global header/footer + 6 page-type body partials)"

        # ─── Page Designs ──────────────────────────────────────────────
        $pageDesignsPath = "$sitePath/Presentation/Page Designs"
        if (-not (Test-Path $pageDesignsPath)) {
            New-Item -Path $pageDesignsPath -ItemType "{B7692086-3943-40CE-9E1B-F5AECAB49A4F}" | Out-Null
        }
        $pageDesigns = Get-Item -Path $pageDesignsPath

        $pageDesignTemplateId = "{1105B8F8-1E00-426B-BF1F-C840742D827B}"

        # Helper: create (or get) a named page design
        function Ensure-PageDesign {
            param([string]$Name, [string]$Partials)
            $pd = Get-Item -Path "$pageDesignsPath/$Name" -ErrorAction SilentlyContinue
            if (-not $pd) {
                $pd = $pageDesigns | Add-Item -Name $Name -ItemType $pageDesignTemplateId -PassThru
            }
            if ($pd) {
                $pd.Editing.BeginEdit()
                $pd["PartialDesigns"] = $Partials
                $pd.Editing.EndEdit()
                Write-Verbose "Page design '$Name' → $Partials"
            }
            return $pd
        }

        $headerFooter = "$($headerPD.ID)|$($footerPD.ID)"

        # Home: Header + Footer only (home body is fully composed via Add-Rendering on the home item)
        $homePD            = Ensure-PageDesign -Name "Home"              -Partials $headerFooter
        # Each inner page type gets its own type-specific body partial
        $productDetailPD   = Ensure-PageDesign -Name "Product Detail"    -Partials "$($headerPD.ID)|$($productDetailBodyPD.ID)|$($footerPD.ID)"
        $industryLandingPD = Ensure-PageDesign -Name "Industry Landing"  -Partials "$($headerPD.ID)|$($industryLandingBodyPD.ID)|$($footerPD.ID)"
        $aboutPD           = Ensure-PageDesign -Name "About"             -Partials "$($headerPD.ID)|$($aboutBodyPD.ID)|$($footerPD.ID)"
        $contactPD         = Ensure-PageDesign -Name "Contact"           -Partials "$($headerPD.ID)|$($contactBodyPD.ID)|$($footerPD.ID)"
        $resourcesPD       = Ensure-PageDesign -Name "Resources Listing" -Partials "$($headerPD.ID)|$($resourcesBodyPD.ID)|$($footerPD.ID)"
        $defaultPD         = Ensure-PageDesign -Name "Default"           -Partials "$($headerPD.ID)|$($defaultBodyPD.ID)|$($footerPD.ID)"

        # TemplatesMapping
        $map = [Sitecore.Text.UrlString]::new()
        if ($homePageTemplate)     { $map[$homePageTemplate.ID]     = "$($homePD.ID)" }
        if ($standardPageTemplate) { $map[$standardPageTemplate.ID] = "$($defaultPD.ID)" }
        if ($pageTemplate)         { $map[$pageTemplate.ID]         = "$($defaultPD.ID)" }
        $pageDesigns.Editing.BeginEdit()
        $pageDesigns["TemplatesMapping"] = [System.Web.HttpUtility]::UrlEncode($map.ToString())
        $pageDesigns.Editing.EndEdit()
        Write-Verbose "TemplatesMapping set for $($map.Count) template(s)"

        # ─── Data folder + seeded datasource items ────────────────────
        $siteFolderTemplateId = "{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}"
        $dataPath = "$sitePath/Home/Data"
        if (-not (Test-Path $dataPath)) {
            New-Item -Path "$sitePath/Home" -Name "Data" -ItemType $siteFolderTemplateId | Out-Null
        }

        # Template IDs for datasource items
        $tHero              = "{1597568B-C314-47E1-D388-4EBA8B010424}"
        $tLogoCloud         = "{AC3F6873-D358-1793-B5CB-F140FF311378}"
        $tCapabilityShowcase= "{1A52FB9A-2129-303D-6FCC-2A8C69A8EEE8}"
        $tStatsBand         = "{98A3AAF7-2FC4-98B2-4902-857772C2F187}"
        $tIndustries        = "{E3019800-D189-DE8F-8A2F-BCBCC5992977}"
        $tCaseStudy         = "{33BD5636-DE4E-6301-AE19-5D72D514F68E}"
        $tCtaBanner         = "{F72C3B8E-B6D2-BC38-F70F-F82DBD06CE09}"

        function Ensure-DatasourceItem {
            param([string]$Name, [string]$TemplateId, [hashtable]$Fields)
            $itemPath = "$dataPath/$Name"
            $dsItem = Get-Item -Path $itemPath -ErrorAction SilentlyContinue
            if (-not $dsItem) {
                $dsItem = New-Item -Path $dataPath -Name $Name -ItemType $TemplateId
            }
            if ($dsItem -and $Fields) {
                $dsItem.Editing.BeginEdit()
                foreach ($kv in $Fields.GetEnumerator()) { $dsItem[$kv.Key] = $kv.Value }
                $dsItem.Editing.EndEdit()
            }
            return $dsItem
        }

        $heroDS = Ensure-DatasourceItem -Name "Home Hero" -TemplateId $tHero -Fields @{
            heading    = "Precision. Power. Performance."
            subheading = "Industrial Manufacturing"
            description = "<p>Engineering solutions built for the demands of modern industry. From aerospace-grade machining to heavy fabrication, we deliver.</p>"
        }

        $logoCloudDS = Ensure-DatasourceItem -Name "Home Logo Cloud" -TemplateId $tLogoCloud -Fields @{
            heading = "Trusted by Industry Leaders"
        }

        $capabilityDS = Ensure-DatasourceItem -Name "Home Capability Showcase" -TemplateId $tCapabilityShowcase -Fields @{
            heading    = "Our Capabilities"
            subheading = "What We Do"
            sectionLabel = "Core Competencies"
        }

        $statsDS = Ensure-DatasourceItem -Name "Home Stats Band" -TemplateId $tStatsBand -Fields @{
            heading = "By the Numbers"
        }

        $industriesDS = Ensure-DatasourceItem -Name "Home Industries Served" -TemplateId $tIndustries -Fields @{
            heading    = "Industries We Serve"
            subheading = "End Markets"
        }

        $caseStudyDS = Ensure-DatasourceItem -Name "Home Case Studies" -TemplateId $tCaseStudy -Fields @{
            heading = "Client Success Stories"
        }

        $ctaDS = Ensure-DatasourceItem -Name "Home CTA" -TemplateId $tCtaBanner -Fields @{
            heading = "Ready to Start Your Project?"
            subheading = "Get in touch with our engineering team today."
        }

        # ─── Home page layout ─────────────────────────────────────────
        Write-Verbose "Composing Home page layout"

        $rHero               = Get-Item -ID "{A5DADFCC-C3E8-9F00-A3D1-DA60644CDF9F}"
        $rLogoCloud          = Get-Item -ID "{F59510F4-8DAE-6EAB-022B-B6D682A1BC03}"
        $rCapabilityShowcase = Get-Item -ID "{961A9A7B-1943-9779-7117-A5753A8D5EEC}"
        $rStatsBand          = Get-Item -ID "{6457F496-9378-D3B7-B48A-2764C57D47A8}"
        $rIndustries         = Get-Item -ID "{7F380110-6A3C-7D80-5296-80F42E7BE0E6}"
        $rCaseStudy          = Get-Item -ID "{88C304C8-8C60-8E4D-F371-4CA4E11FFA2A}"
        $rCtaBanner          = Get-Item -ID "{8A979DFE-9FAF-6D71-C277-9C0217A1CDF5}"

        # Required Home composition order (idempotent — skip if rendering already present):
        # Hero Industrial → Logo Cloud → Capability Showcase → Stats Band →
        # Industries Served → Case Study Carousel → CTA Banner
        $homeComposition = @(
            @{ Rendering = $rHero;               DataSource = "local:/Data/Home Hero" },
            @{ Rendering = $rLogoCloud;           DataSource = "local:/Data/Home Logo Cloud" },
            @{ Rendering = $rCapabilityShowcase;  DataSource = "local:/Data/Home Capability Showcase" },
            @{ Rendering = $rStatsBand;           DataSource = "local:/Data/Home Stats Band" },
            @{ Rendering = $rIndustries;          DataSource = "local:/Data/Home Industries Served" },
            @{ Rendering = $rCaseStudy;           DataSource = "local:/Data/Home Case Studies" },
            @{ Rendering = $rCtaBanner;           DataSource = "local:/Data/Home CTA" }
        )
        foreach ($entry in $homeComposition) {
            if (-not (Get-Rendering -Item $homeItem -Rendering $entry.Rendering -FinalLayout -ErrorAction SilentlyContinue)) {
                Add-Rendering -Item $homeItem -PlaceHolder "forge-main" `
                              -Instance ($entry.Rendering | New-Rendering) `
                              -DataSource $entry.DataSource -FinalLayout
            }
        }

        Write-Verbose "Home page layout composed with $($homeComposition.Count) renderings + datasources"

        # ─── Home page meta fields ─────────────────────────────────────
        $homeItem.Editing.BeginEdit()
        $homeItem["metaTitle"]       = "Forge Industrial – Precision Manufacturing Solutions"
        $homeItem["metaDescription"] = "B2B industrial manufacturing partner. CNC machining, fabrication, and custom engineering for aerospace, automotive, energy, and more."
        $homeItem.Editing.EndEdit()

        Write-Verbose "Forge Industrial site setup complete."
    }

    end {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - End"
    }
}
