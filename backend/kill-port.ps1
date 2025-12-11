import { exec } from 'child_process';
import { platform } from 'os';

const PORT = 5000;

const killPort = () => {
  const isWindows = platform() === 'win32';
  
  const command = isWindows
    ? `netstat -ano | findstr :${PORT}`
    : `lsof -ti:${PORT}`;

  exec(command, (error, stdout) => {
    if (error) {
      console.log(`Port ${PORT} is free ✓`);
      return;
    }

    if (isWindows) {
      // Extract PID from Windows netstat output
      const lines = stdout.split('\n');
      const pids = new Set();
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          pids.add(parts[parts.length - 1]);
        }
      });

      pids.forEach(pid => {
        if (pid && pid !== '0') {
          exec(`taskkill /PID ${pid} /F`, (err) => {
            if (!err) {
              console.log(`✓ Killed process ${pid} on port ${PORT}`);
            }
          });
        }
      });
    } else {
      // Unix-like systems
      const pids = stdout.trim().split('\n');
      pids.forEach(pid => {
        if (pid) {
          exec(`kill -9 ${pid}`, (err) => {
            if (!err) {
              console.log(`✓ Killed process ${pid} on port ${PORT}`);
            }
          });
        }
      });
    }
  });
};

killPort();