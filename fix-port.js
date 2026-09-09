const net = require('net');
const { exec } = require('child_process');
const os = require('os');

const PORT = 3000;

// Try to detect if port is in use
const server = net.createServer();
server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`\n❌ Port ${PORT} is already in use!`);
    console.log('\nAttempting to find and kill the process...\n');
    
    if (os.platform() === 'win32') {
      // Windows
      exec(`netstat -ano | findstr :${PORT}`, (error, stdout, stderr) => {
        if (stdout) {
          console.log('Processes using port 3000:');
          console.log(stdout);
          
          // Extract PID (last column in netstat output)
          const match = stdout.match(/\d+\s*$/m);
          if (match) {
            const pid = match[0].trim();
            console.log(`\nFound PID: ${pid}`);
            console.log(`Killing process ${pid}...\n`);
            
            exec(`taskkill /PID ${pid} /F`, (killErr, killOut) => {
              if (killErr) {
                console.log(`❌ Error killing process: ${killErr.message}`);
              } else {
                console.log(`✅ Process killed successfully!`);
                console.log(`\n✅ Port ${PORT} is now free. You can restart the server with: npm run dev\n`);
              }
            });
          }
        } else {
          console.log('Could not determine the process using port 3000');
        }
      });
    }
  } else {
    throw err;
  }
});

server.once('listening', () => {
  console.log(`✅ Port ${PORT} is available!`);
  server.close();
});

server.listen(PORT);
