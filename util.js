const { spawn } = require('child_process');

function exec(cmd, args, options) {
  let child;
  const promise = new Promise((resolve, reject) => {
    child = spawn(cmd, args, options);
    child.on('close', code => {
      if (code === 0) {
        resolve(child);
      } else {
        reject(new Error(`Non-zero exit code received: ${code}`));
      }
    })
  });
  promise.stdout = child.stdout;
  promise.stderr = child.stderr;
  return promise;
}

module.exports = {
  exec,
};
