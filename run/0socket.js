MKP, log, cache, http;

// MKP().loader.log.firefly("INLOADER", typeof log, log+'')
const { deps } = MKP();
// log.teal('SOCKET');
const SOCKET_PORT = process.env.SOCKET_PORT || 5044;
const rootMatrix = MKP().mkp.matrix;
const toString = MKP().utils.tostr;

const getMatrix = () => {
  const points = Object.entries(rootMatrix()).map(([k, v]) => {
    return [k, toString(v)];
  });

  return points;
};
const startSocketServer = () => {
  // log.red('ahaha');

  // const exp_cache = cache.socket;
  // console.log("START RRR", Object.keys(runtime.deps),""+runtime.getDep('exp_cache'));
  // return;

  if (cache.socket.fake) {
    cache.socket = deps.require('socket.io')(http());
    cache.socket.listen(SOCKET_PORT);
    MKP().loader.log.firefly('START  on PORT ' + SOCKET_PORT);
  } else {
    MKP().loader.log.firefly('REUSE websocket on PORT ' + SOCKET_PORT);
    //   console.log("AAAA", Object.keys(cache.socket));
    //   console.log("AAAA", (cache.socket._events));
  }

  cache.socket.removeAllListeners();
  //cache.socket.removeAllListeners('connection');
  // cache.socket.removeAllListeners('test');
  cache.socket.on('connection', (connect) => {
    // log.red('HEREEEEEE---------------')
    //   connect.removeAllListeners('test');
    // log.yellow('SOCKET CONNECTION -----------------------------------------------');

    // matrix.reportScheme();

    connect.on('ask', (name, word, fn) => {
      fn(name + ' says ' + word);
    });

    connect.on('cycle/status', (fn) => {
      // "cycleInterval": 10,
      // "stack": [],
      // "running": false,
      // "stop": true,
      // "fuse": 997
      const { running, stop, cycleInterval, fuse } = cycle.getIntState();
      const data = {
        running,
        stop,
        cycleInterval,
        fuse,
        photonKeys: Object.values(matrix._int.PHOTONS).map((v) => v.key),
        deps: Object.keys(runtime.deps),
      };
      fn(data);
    });

    // connect.removeAllListeners('matrix/status');
    connect.on('matrix/status', (fn) => {
      const data = getMatrix();
      fn(data);
    });

    connect.on('service/fullfill/webfile', (fn) => {
      const data = MKP().webfiles.fullfill();
      fn(data);
    });
  });
};
// setTimeout(startSocketServer, 100)
startSocketServer();

return startSocketServer;
