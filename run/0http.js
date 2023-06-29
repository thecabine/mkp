MKP, log, cache, http;
// run,http

const HTTP_PORT = process.env.HTTP_PORT || 8120;
const httpServ = MKP().deps.require('http');
const createServer = () =>
  (cache.http = httpServ
    .createServer((...a) => MKP().run.serve(...a))
    .listen(HTTP_PORT));

// console.log('Server ALREADY running at http://127.0.0.1:'+HTTP_PORT+'/');
// if (!cache.http.fake) cache.http.close(createServer);

return () => {
  if (cache.http.fake) {
    createServer();
    // console.trace('SSSS')
    MKP().loader.log.log(
      'HTTP Server running at',
      'http://localhost:' + HTTP_PORT + '/'
    );
  } else {
    MKP().loader.log.log(
      'Server ALREADY running at',
      'http://localhost:' + HTTP_PORT + '/'
    );
  }
  return cache.http;
};
// An example of a web server written with Node which responds with 'Hello World'.
// To run the server, put the code into a file called example.js and execute it with the node program.
