MKP, cache, log;


// return;
// MKP().run.rwrit = rrr.REPLServer + '';
//>util.inspect(_DAT_MTRX ,{showProxy:true,showHidden:true, getters:true})

// console.log(MKP().run.repl+'')
// if((MKP().run.repl+'')=='undefined')
//   setTimeout(() => MKP().run.repl(),100);

setTimeout(() => MKP().run.repl(), 100);

// const insp = require('util').inspect;//.replDefaults.compact = false;
// const out=require('util').inspect(insp ,{showProxy:true,showHidden:true, getters:true})

return () => {
  //console.log(require)
  const repl = MKP().deps.require('repl');

  const options = {
    useColors: true,
    useGlobal: true,
    historySize: 1000,
    compact: false,
    // breakEvalOnSigint: true,
    // prompt: '>',
    // context: {P:MKP()},
  };

//   console.log('\n//------- START REPL -------\n', options);
  if (cache.repl.fake) {
    new Promise(replServer => setTimeout(replServer, 200))
      .then(() => (cache.repl = global.rrr = new repl.REPLServer(options)))
      .then(replServer => {
        // console.log('\n//------- CACHE REPL -------\n', exp_cache.replInstance);
        // const replServer = repl.start({ prompt: '> ' });
        replServer.defineCommand('cls', {
          help: 'Clear screen',
          action: function (name) {
            this.clearBufferedCommand(); //this.lineParser.reset(); this.bufferedCommand = '';
            process.stdout.write('\u001B[2J\u001B[0;0f');
            this.displayPrompt();
          },
        });

        replServer.on('exit', () => {
          console.log('Received "exit" event from repl!');
          cache.repl = null;
          // process.exit();
        });

        return new Promise(resolve =>
          replServer.setupHistory('./repl.history', (err, replServer) => {
            // console.log('Received repl.history', err, replServer);
            resolve(replServer);
          })
        );
      })
      .then(replServer => {
        function initializeContext(context) {
          // console.log('\n\n\n',context,'\n\n\n')
          context._0 = MKP();
          //context = MKP();
        }
        initializeContext(replServer.context);
        replServer.on('reset', initializeContext);
        // replServer.write('//------- REPL REPL -------\n');
      });
  } else {
    console.log('\n//------- KILL REPL -------\n');
    cache.repl.close();
  }

  return cache.repl;
};
