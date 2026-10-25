$dest = Join-Path $PSScriptRoot "..\public\images"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$ids = @{
  "hero.jpg" = "photo-1600210492486-724fe5c67fb0"
  "intro.jpg" = "photo-1600607687939-ce8a6c25118c"
  "cta.jpg" = "photo-1600210492493-0946911123ea"
  "services-hero.jpg" = "photo-1600607687644-c7171b42498b"
  "projects-hero.jpg" = "photo-1616486338812-3dadae4b4ace"
  "solace-1.jpg" = "photo-1618221195710-dd6b41faaea6"
  "solace-2.jpg" = "photo-1631679706909-1844bbd07221"
  "solace-3.jpg" = "photo-1615873968403-89e068629265"
  "solace-4.jpg" = "photo-1616046229478-9901c5536a45"
  "form-1.jpg" = "photo-1600585154340-be6161a56a0c"
  "form-2.jpg" = "photo-1600566753190-17f0baa2a6c3"
  "form-3.jpg" = "photo-1600566753086-00f18fb6b3ea"
  "form-4.jpg" = "photo-1600489000022-c2086d79f9d4"
  "atelier-1.jpg" = "photo-1497366216548-37526070297c"
  "atelier-2.jpg" = "photo-1497366811353-6870744d04b2"
  "atelier-3.jpg" = "photo-1604328698692-f76ea9498e76"
  "atelier-4.jpg" = "photo-1524758631624-e2822e304c36"
  "haven-1.jpg" = "photo-1611892440504-42a792e24d32"
  "haven-2.jpg" = "photo-1582719478250-c89cae4dc85b"
  "haven-3.jpg" = "photo-1578683010236-d716f9a3f461"
  "haven-4.jpg" = "photo-1590490360182-c33d57733427"
  "linen-1.jpg" = "photo-1600121848594-d8644e57abab"
  "linen-2.jpg" = "photo-1616594039964-ae9021a400a0"
  "linen-3.jpg" = "photo-1595526114035-0d45ed16cfbf"
  "linen-4.jpg" = "photo-1505691938895-1758d7feb511"
  "north-1.jpg" = "photo-1497215728101-856f4ea42174"
  "north-2.jpg" = "photo-1497366754035-f200968a6e72"
  "north-3.jpg" = "photo-1600880292203-757bb62b4baf"
  "courtyard-1.jpg" = "photo-1517248135467-4c7edcad34c4"
  "courtyard-2.jpg" = "photo-1559339352-11d035aa65de"
  "courtyard-3.jpg" = "photo-1550966871-3ed3cdb5ed0c"
  "stone-1.jpg" = "photo-1600585154526-990dced4db0d"
  "stone-before.jpg" = "photo-1493663284031-b7e3aefcae8e"
  "stone-2.jpg" = "photo-1600210491369-e753d80a41f3"
  "stone-3.jpg" = "photo-1556909114-f6e7ad7d3136"
  "material.jpg" = "photo-1615529328331-f8917597711f"
}
$failed = 0
foreach ($name in $ids.Keys) {
  $out = Join-Path $dest $name
  $url = "https://images.unsplash.com/$($ids[$name])?auto=format&fit=crop&w=1800&q=75"
  & curl.exe -L --fail --silent --show-error --max-time 60 -A "Mozilla/5.0" -o $out $url
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $out) -or (Get-Item $out).Length -lt 10000) {
    Write-Output "FAIL $name"
    $failed += 1
  } else {
    Write-Output "OK $name $((Get-Item $out).Length)"
  }
}
if ($failed -gt 0) { exit 1 }
