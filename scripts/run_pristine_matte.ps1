Add-Type -Path "scripts/PristineMatteProcessor.cs" -ReferencedAssemblies System.Drawing

$brain = "C:\Users\chait\.gemini\antigravity\brain\284d9f27-53fc-400b-a6f7-0d8b907cc0c7"
$target = "c:\Users\chait\Downloads\LOVE\public\assets\particles"

if (!(Test-Path $target)) {
    New-Item -ItemType Directory -Path $target -Force | Out-Null
}

$jobs = @(
    @{
        Jpg = "$brain\isolated_peanut_studio_1794911539981.jpg"
        Png = "$target\groundnut-0.png"
        Thresh = 228
        Feather = 20
        Diff = 25
    },
    @{
        Jpg = "$brain\split_roasted_peanut_half_1794911611394.jpg"
        Png = "$target\groundnut-1.png"
        Thresh = 225
        Feather = 20
        Diff = 25
    },
    @{
        Jpg = "$brain\isolated_coconut_chunk_1794911549242.jpg"
        Png = "$target\coconut-0.png"
        Thresh = 236
        Feather = 14
        Diff = 16
    },
    @{
        Jpg = "$brain\golden_mustard_seeds_cluster_1794911554101.jpg"
        Png = "$target\mustard-0.png"
        Thresh = 220
        Feather = 20
        Diff = 25
    },
    @{
        Jpg = "$brain\black_sesame_seeds_cluster_1794911559830.jpg"
        Png = "$target\black-sesame-0.png"
        Thresh = 195
        Feather = 25
        Diff = 30
    },
    @{
        Jpg = "$brain\ghee_droplet_isolated_1794911566612.jpg"
        Png = "$target\ghee-0.png"
        Thresh = 225
        Feather = 18
        Diff = 20
    },
    @{
        Jpg = "$brain\isolated_green_olive_1794911572150.jpg"
        Png = "$target\olives-0.png"
        Thresh = 215
        Feather = 20
        Diff = 25
    }
)

foreach ($j in $jobs) {
    if (Test-Path $j.Jpg) {
        Write-Host "Processing $($j.Png)..."
        [PristineMatteProcessor]::ProcessImage($j.Jpg, $j.Png, $j.Thresh, $j.Feather, $j.Diff)
    } else {
        Write-Warning "Missing: $($j.Jpg)"
    }
}

Write-Host "Pristine matte generation complete!"
