$bytes = [System.IO.File]::ReadAllBytes("c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\index.html")
$hex = [System.BitConverter]::ToString($bytes)
$hex -replace "-", " " | Out-File -Encoding ASCII "c:\Users\eg511\OneDrive\Desktop\lp sopinha latam\hex.txt"
