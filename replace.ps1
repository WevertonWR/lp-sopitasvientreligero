$images = @("005b6490b0946dbf1c07332691a483c6.jpg", "1fb72b6780be8c99d613c1bdf029cb8a (1).jpg", "1fb72b6780be8c99d613c1bdf029cb8a.jpg", "2bb4e86de7b44794cede580f40169108.jpg", "2dc7f48862fb473a0c31c4ca717a0670 (1).jpg", "2dc7f48862fb473a0c31c4ca717a0670.jpg", "300f59f1a9ca8d1998df2225d9511709.jpg", "576b733a22c1b7aa7c4ae983e6bfc9d4.jpg", "7227e7e6c18688870e525d2bfdebeeea.jpg", "7b32bec0237986eda10a7326c9ef17eb.jpg", "83ac79760ec6d5d32d152676c6dfaeb4.jpg", "8b8256f1a5d1b86eccae844be6167335.jpg", "8d12821ed36ce7d3633497ec21aebc4c.jpg", "c71b74a4123a639dd8be69c25209cc6f.jpg", "f0b6b8cb7ec6e1319378e0a02060a32d.jpg", "f25a26b33640f8655b4ae2867b8f442d.jpg")

$content = Get-Content "index.html" -Raw
$parts = $content -split '<div class="testimonial-image-placeholder"></div>'

$newContent = $parts[0]
for ($i = 0; $i -lt $parts.Length - 1; $i++) {
    $imgName = $images[$i % 16]
    $replacement = "<img src=`"assets/img/opiniones/$imgName`" alt=`"Foto de reseña`" class=`"testimonial-image`">"
    $newContent += $replacement + $parts[$i + 1]
}

Set-Content "index.html" -Value $newContent -Encoding UTF8
