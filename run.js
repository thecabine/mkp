#!/usr/bin/env node
const { begin } = require('./0deps/boot');

// process.on('SIGABRT', function (error, orig) {
//   debugger
//   console.dir( error)
//   console.dir( orig)
//   console.trace()
//   console.log('\n\x1b[48;2;250;80;10m', 'GOT SIGABRT\n', error, orig, '\n\x1b[0m');
//   process.stdin.resume();
//   return false
// });

// function terminator(sig){
//   if (typeof sig === "string") {
//     console.log('%s: Received %s - terminating sample app ...',
//                  Date(Date.now()), sig);
//     // process.exit(1);
//   }     
//   console.log('%s: Node server stopped.', Date(Date.now()) );
// };

// process.on('exit', function() { terminator(); });

// ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
// ].forEach(function(element, index, array) {
//   process.on(element, function() { terminator(element); });
// });

process.on('uncaughtException', function (error, orig) {
  // if (!errorManagement.handler.isTrustedError(error)) process.exit(1);
  //errorManagement.handler.handleError(error);
  console.log('\n\x1b[48;2;250;80;10m', 'SYSTEM ERROR\n', error, orig, '\n\x1b[0m');
});
// PREVENT CLOSE NODE
async function main() {
  await new Promise(function () {});
  console.log('This text will never be printed');
}

function panic(error) {
  console.log('\n\x1b[48;2;250;180;10m', 'SYSTEM PANIC!!!\n', error, '\n\x1b[0m');
  // process.exit(1);
}

// https://stackoverflow.com/a/46916601/1478566
main()
  .catch(panic)
  .finally(
    clearInterval.bind(
      null,
      setInterval(a => a, 1e9)
    )
  );

begin();
