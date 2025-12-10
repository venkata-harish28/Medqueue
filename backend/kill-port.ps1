# kill-port.ps1
$port = 5000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($process) {
    $processId = $process.OwningProcess
    Write-Host "Killing process $processId using port $port"
    Stop-Process -Id $processId -Force
    Write-Host "Port $port is now free"
} else {
    Write-Host "Port $port is not in use"
}   