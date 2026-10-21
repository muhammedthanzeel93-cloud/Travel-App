/**
 * WanderLust Monorepo Unified Dev Server Launcher
 * Starts both backend API server and frontend React client in parallel.
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('\n🌟 Launching WanderLust Monorepo Full-Stack Services...\n');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// 1. Launch Backend API Server (Port 5000)
console.log('📡 Starting Backend API Server on http://localhost:5000 ...');
const serverProcess = spawn(npmCmd, ['start', '--workspace=server'], {
  cwd: path.resolve(__dirname, '..'),
  shell: true,
  stdio: 'inherit',
  env: process.env
});

// 2. Launch Client Frontend UI (Port 6345)
console.log('💻 Starting Frontend Client UI on http://localhost:6345 ...');
const clientProcess = spawn(npmCmd, ['start', '--workspace=client'], {
  cwd: path.resolve(__dirname, '..'),
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PORT: '6345' }
});

const cleanup = () => {
  console.log('\n🛑 Shutting down WanderLust services...');
  try {
    if (serverProcess && serverProcess.pid) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', serverProcess.pid, '/f', '/t']);
      } else {
        serverProcess.kill('SIGINT');
      }
    }
    if (clientProcess && clientProcess.pid) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', clientProcess.pid, '/f', '/t']);
      } else {
        clientProcess.kill('SIGINT');
      }
    }
  } catch (e) {
    // ignore cleanup errors
  }
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
