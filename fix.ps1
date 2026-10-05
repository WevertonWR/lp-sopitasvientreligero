$content = [System.IO.File]::ReadAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", [System.Text.Encoding]::UTF8)

# Fix mojibake
$content = $content.Replace("Ã­", "í")
$content = $content.Replace("Ã±", "ñ")
$content = $content.Replace("Ã³", "ó")
$content = $content.Replace("Ã¡", "á")
$content = $content.Replace("Â¡", "¡")
$content = $content.Replace("Ãº", "ú")
$content = $content.Replace("Ã©", "é")
$content = $content.Replace("Ã ", "Á")

# Remove Laura Garcia card
$content = [regex]::Replace($content, '(?s)<div class="testimonial-card">\s*<img src="assets/img/opiniones/1fb72b6780be8c99d613c1bdf029cb8a \(1\)\.jpg"[^>]+>\s*<blockquote>[^<]+</blockquote>\s*<div class="testimonial-author">\s*<div class="author-avatar">L</div>\s*<div>\s*<strong>Laura García</strong>\s*<span>@laurita_g</span>\s*</div>\s*</div>\s*</div>', "")

# Remove Carlos Mendoza card
$content = [regex]::Replace($content, '(?s)<div class="testimonial-card">\s*<img src="assets/img/opiniones/2dc7f48862fb473a0c31c4ca717a0670 \(1\)\.jpg"[^>]+>\s*<blockquote>[^<]+</blockquote>\s*<div class="testimonial-author">\s*<div class="author-avatar">C</div>\s*<div>\s*<strong>Carlos Mendoza</strong>\s*<span>@carlos_mendoza85</span>\s*</div>\s*</div>\s*</div>', "")

[System.IO.File]::WriteAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", $content, [System.Text.Encoding]::UTF8)
