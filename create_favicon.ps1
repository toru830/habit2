# ファビコン作成スクリプト
Add-Type -AssemblyName System.Drawing

# 32x32のビットマップを作成
$bitmap = New-Object System.Drawing.Bitmap(32, 32)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# 背景を黒に設定
$graphics.Clear([System.Drawing.Color]::FromArgb(0, 0, 0))

# 青い円を描画
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(74, 144, 226))
$graphics.FillEllipse($brush, 2, 2, 28, 28)

# 白いチェックマークを描画
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 2)
$graphics.DrawLine($pen, 8, 16, 16, 24)
$graphics.DrawLine($pen, 16, 24, 24, 8)

# 白いドットを描画
$graphics.FillEllipse([System.Drawing.Brushes]::White, 20, 20, 4, 4)

# ICOファイルとして保存
$bitmap.Save('favicon.ico', [System.Drawing.Imaging.ImageFormat]::Icon)

# リソースを解放
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "favicon.ico created successfully!"
