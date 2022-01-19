const { exec } = require('./util');

(async () => {

  const hostAddr = (() => {
    switch (process.env.HOST_PLATFORM) {
      case 'darwin':
        return 'host.dockerl.internal';
      case 'linux':
      default:
        return '172.17.0.1';
    }
  })();

  const hostPorts = (process.env.HOST_PORTS || '').split(',')
    .map(port => port.trim())
    .map(port => parseInt(port, 10))
    .filter(port => port);

  if (!hostPorts.length) {
    throw new Error(`No host ports were configured`);
  }

  const procs = [];

  const promises = hostPorts.map(port => {
    console.log('Forwarding host port:', port);
    const promise = exec('socat', [
      `tcp-l:${port},fork,reuseaddr`,
      `tcp:${hostAddr}:${port}`
    ]);
    procs.push(promise.process);
    return promise;
  });

  process.on('SIGINT', () => {
    console.log('interrupt');
    procs.forEach(proc => proc.kill());
  });

  await Promise.all(promises);

})();
