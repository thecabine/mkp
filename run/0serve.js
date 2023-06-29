MKP, log;

const fs = MKP().deps.require('fs');

return (request, response) => {
  if (request.url == '/favicon.ico') {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('favicon');
    return;
  }

  // log.firefly('GET', request.url);

  const REQ_URL = request.url;

  if (REQ_URL == '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    response.end(`
    <html><head>
    <title>mkp massive</title>
    <script src="node_modules/socket.io/client-dist/socket.io.js"></script>
    </head><body>
      <h1>HELLO 123ssdsd</h1>
    </body></html>
    
    `);
  } else if (REQ_URL == '/nofile.html') {
    const data = { requrl: request.url };

    const text = `
  <h1>Hello World  1111 lololo!!!</h1>
  <pre>${JSON.stringify(data, 0, 2)}</pre>
  "${exp_cache.resp_word || 'not set yet!!!'}"
  `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(text);

    //   const file = fs.readFileSync(www_path + '/socket.html');

    //   //   console.log('REQUEST :: ', file);

    //   response.writeHead(200);
    //   response.end(file);
  } else if (REQ_URL.startsWith('/node_modules')) {
    fs.readFile(REQ_URL.slice(1), function (err, data) {
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      response.writeHead(200);
      response.end(data);
    });
  } else if (REQ_URL.startsWith('/0deps')) {
    // log.firefly('0deps', request.url);
    fs.readFile('.' + REQ_URL, function (err, data) {
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      response.writeHead(200);
      response.end(data);
    });
  } else {
    fs.readFile('www' + REQ_URL, function (err, data) {
      response.writeHead(200, { 
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=604800',

       });
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      response.writeHead(200);
      // response.writeHead(200, { 'Content-Type': 'text/html'})
      // response.writeHead(200, {'Content-Security-Policy': `default-src 'self'; style-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'` });
      // response.writeHead(200, {'Content-Security-Policy': 'script-src \'self\' http://localhost:8124  \'unsafe-inline\'' });
      // response.writeHead(200, {'Content-Security-Policy': 'script-src \'self\' http://localhost:8124 \'unsafe-eval\' \'unsafe-inline\'' });
      response.end(data);
    });
  }
};
