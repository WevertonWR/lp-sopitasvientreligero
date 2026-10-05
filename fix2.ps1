$content = [System.IO.File]::ReadAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", [System.Text.Encoding]::UTF8)

# Revert my bad script's replacements if they exist
$content = $content -replace "", ""

# These are the ones shown in the screenshot
$content = $content -replace "dÃAa", "día"
$content = $content -replace "dÃAas", "días"
$content = $content -replace "categorÃAa", "categoría"
$content = $content -replace "alimentaciÃ³n", "alimentación"
$content = $content -replace "estÃ¡s", "estás"
$content = $content -replace "quÃ©", "qué"
$content = $content -replace "mÃ¡s", "más"
$content = $content -replace "fÃ¡cil", "fácil"
$content = $content -replace "OrganizaciÃ³n", "Organización"

# General mojibake replacements
$content = $content.Replace("Ã­", "í")
$content = $content.Replace("Ã±", "ñ")
$content = $content.Replace("Ã³", "ó")
$content = $content.Replace("Ã¡", "á")
$content = $content.Replace("Â¡", "¡")
$content = $content.Replace("Ãº", "ú")
$content = $content.Replace("Ã©", "é")
$content = $content.Replace("Ã ", "Á")
$content = $content.Replace("Â¿", "¿")
$content = $content.Replace("Ã‰", "É")
$content = $content.Replace("â€¦", "…")
$content = $content.Replace("Ã", "í") # Catchall for í if soft hyphen is stripped

[System.IO.File]::WriteAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", $content, [System.Text.Encoding]::UTF8)
