Import-Function Update-TemplateInsertOptions

function Invoke-ModuleScriptBody {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true, Position = 0 )]
        [Item]$Site,
    
        [Parameter(Mandatory = $true, Position = 1 )]
        [Item[]]$TenantTemplates        
    )
    
    begin {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - Begin (Forge Industrial Post Setup)"
        Import-Function Get-ProjectTemplateBasedOnBaseTemplate
    }
    
    process {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - Process"
        $siteCollection   = $Site.Parent
        $templatesRootPath = "master:/sitecore/templates/Project/$($siteCollection.Name)"

        $homePageTemplate     = Get-Item -Path "$templatesRootPath/forge-industrial/Pages/Home Page"     -ErrorAction SilentlyContinue
        $standardPageTemplate = Get-Item -Path "$templatesRootPath/forge-industrial/Pages/Standard Page" -ErrorAction SilentlyContinue

        if ($homePageTemplate -and $standardPageTemplate) {
            $insertOptions = @($standardPageTemplate.ID.ToString())
            Update-TemplateInsertOptions -TemplateItem $homePageTemplate -InsertOptions $insertOptions
            Write-Verbose "Insert options set: Home Page → Standard Page"
        }

        if ($standardPageTemplate) {
            $insertOptions = @($standardPageTemplate.ID.ToString())
            Update-TemplateInsertOptions -TemplateItem $standardPageTemplate -InsertOptions $insertOptions
            Write-Verbose "Insert options set: Standard Page → Standard Page"
        }

        Write-Verbose "Forge Industrial post-setup complete."
    }

    end {
        Write-Verbose "Cmdlet Invoke-ModuleScriptBody - End"
    }
}
