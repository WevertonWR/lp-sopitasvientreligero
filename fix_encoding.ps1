$text = [System.IO.File]::ReadAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", [System.Text.Encoding]::UTF8)
$bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($text)
$fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
[System.IO.File]::WriteAllText("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html", $fixed, [System.Text.Encoding]::UTF8)
