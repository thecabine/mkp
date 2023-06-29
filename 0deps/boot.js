(function (global, factory) {
  const MOD_NAME = './boot';
  const depsCache = (global.__DEPS_CACHE = global.__DEPS_CACHE || {});
  if (depsCache[MOD_NAME]) return depsCache[MOD_NAME];

  if (typeof module === 'object' && module.exports) {
    module.exports = depsCache[MOD_NAME] = factory(global, require);
  } else {
    const _require = path => {
      return depsCache[path];
    };
    depsCache[MOD_NAME] = factory(global, _require);
  }
})(
  typeof self === 'object' ? self : typeof global === 'object' ? global : this,

  ///////////////////////////////////////////////////////////////////////////////
  /////////////////////////////  ///////  //////////////////////////////////////////
  ////////////////// /////////  //////////////////////////  ///////////////////////////
  ///////////   /// /////////      ///  //     ////    //  ///  /////////////////////////////////
  /////////  /// / /////////  ///  //  //////  //  /////  /   ///////////////////////////////////
  //////// /////  ///    //  ///  //  /       //  /////     ////////////////////////////////////////
  ///////  ///  /  ///////  ///  //  /  ///  //  /////  //  ////////////////////////////////////
  ////////    ////  /////  ///  //  //.      //    //  ///  /////////////////////////////////
  //////////////////////////////   //////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  function (global, require) {
    // if (typeof require !== 'function') return;
    const mkp = require('./massive');
    // const mkp = require('./mkp');
    const matrix = require('./matrix');
    const loader = require('./loader');
    
    const installColorLog = matrix => {
      Object.assign(matrix, {
        'log,blue': (...args) =>
          console.log('\x1b[0;48;5;4m%s', ...args, '\x1b[0m'),

        'log,firefly': (...args) =>
          console.log(
            '\x1b[38;2;100;200;200;48;2;20;60;60m %s ',
            ...args,
            '\x1b[0m\n'
          ),

        'log,gray': (...args) =>
          console.log('\x1b[0;38;5;0;48;5;3m %s \x1b[0m', ...args, '\x1b[0m'),

        'log,green': (...args) =>
          console.log('\x1b[0;48;5;2m%s', ...args, '\x1b[0m'),

        'log,pink': (...args) =>
          console.log('\x1b[0;48;5;5m%s', ...args, '\x1b[0m'),

        'log,red': (...args) =>
          console.log('\x1b[0;48;5;1m%s', ...args, '\x1b[0m'),

        'log,simp': (...args) =>
          console.log('\x1b[0;38;5;155;48;5;22m%s', ...args, '\x1b[0m'),

        'log,teal': (...args) =>
          console.log('\x1b[0;38;5;0;48;5;6m%s', ...args, '\x1b[0m'),

        'log,yellow': (...args) =>
          console.log('\x1b[0;38;5;0;48;5;3m%s', ...args, '\x1b[0m'),
      });
    };
      
    // const _UniverseMatrix0 = {};
    const _UniverseMatrix0 = (global._UniverseMatrix0 = {});

    const begin = () => {
      installColorLog(_UniverseMatrix0);
      const MKP = mkp.build(_UniverseMatrix0);
      matrix.install(_UniverseMatrix0); // need MKP

      global._MKP = MKP;

      const deps = MKP().deps;
      deps.mkp = mkp;
      deps.matrix = matrix;
      deps.loader = loader;

      // setup loader prefs and defaults
      //  - parse URL params - set scheme load path -
      // run loader main fn
      //  - ... self preconfigure?
      //  - start fetching scheme
      //  - ? on finish all cb ?

      if (typeof process === 'object') {
        // assuming node env
        deps.require = require;
        loader.install(MKP, { type: 'filesync', path: '*/*.js' });

        const photon = {
          id: 'aspirin/boot#runcode',
          listTasks: [],
          task: (s, ...a) => {
            photon.listTasks.push({ x: photon.x, y: photon.y, strs: [...s], vals: [...a] });
            console.log('P.task on ' + [photon.x, photon.y] + ' \n\x1b[48;2;139;25;45m' + s, a);
            return a;
          },
          aspirin: {},
        };

        MKP().loader.load(); //photon);
      } else {
        // assuming browser env
        const webboot = require('./webboot');

        const photon = {
          id: 'aspirin/webboot#runcode',
          listTasks: [],
          task: (s, ...a) => {
            photon.listTasks.push({ x: photon.x, y: photon.y, strs: [...s], vals: [...a] });
            console.log('P.task on ' + [photon.x, photon.y] + ' \n\x1b[48;2;139;25;45m' + s, a);
            return a;
          },
          aspirin: {},
        };

        webboot.startWeb(MKP, photon);
        webboot.socketConnect(MKP);

        loader.install(MKP, { type: 'lssync', path: '' });
        const updateTrigger = MKP().view.update.trigger;

       

        MKP().loader.load(photon);

        // setTimeout(MKP().view.simple.render)
        setTimeout(()=>{
          const {auto} = MKP();
          [...'1'].reduce((m, v) => auto['run' + v](m) || m, undefined);
        }, 50)

        // MKP().auto.run2 = m =>{

        //   console.log('OOOOOOPPPSS2222', m)
        //   return 'ololololo22222'
        // } 
        // MKP().auto.run3 = m =>{

        //   console.log('OOOOOOPPPSS3333', m)

        // } 
        // MKP().auto.run0 = m =>{

        //   console.log('OOOOOOPPPS00000', m)

        // } 

        // setTimeout(() => {
        MKP().mkp.onset1 = (M => (BUF, target, prop, value) => {
          // const shiftedBuf = M['mkp,f2nw'](M['mkp,shift'](BUF, M['mkp,fwn'](prop)));
          const nextBUF = M['mkp,f2nw'](M['mkp,onstep'](BUF, prop));
          // console.log('--ONSET1::', nextBUF, value);
          updateTrigger(nextBUF, value);
          return true;
        })(MKP().mkp.matrix());
        // }, 100);
      }
    };

    return { begin };
  }
);
