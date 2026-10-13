import { spawn } from 'child_process';
import http from 'http';

const server = spawn('node', ['server.js'], { stdio: 'inherit' });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  await sleep(1500);
  const test = spawn('node', ['test-backend.js'], { stdio: 'inherit' });

  test.on('exit', (code) => {
    server.kill();
    process.exit(code || 0);
  });
}

run();
