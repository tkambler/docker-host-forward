const { exec } = require('./util');

(async () => {

  const hostPorts = (process.env.HOST_PORTS || '').split(',')
    .map(port => port.trim())
    .map(port => parseInt(port, 10))
    .filter(port => port);

  if (!hostPorts.length) {
    throw new Error(`No host ports were configured`);
  }

  const promises = hostPorts.map(port => {
    console.log('Forwarding host port:', port);
    return exec('socat', [
      `tcp-l:${port},fork,reuseaddr`,
      `tcp:host.docker.internal:${port}`
    ]);
  });

  await Promise.all(promises);

})();
