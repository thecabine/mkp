(function (global, factory) {
  const MOD_NAME = './loader';
  const depsCache = (global.__DEPS_CACHE = global.__DEPS_CACHE || {});
  if (depsCache[MOD_NAME]) return depsCache[MOD_NAME];
  const mod = (depsCache[MOD_NAME] = factory(global));
  if (typeof module === 'object' && module.exports) module.exports = mod;
})(
  typeof self === 'object' ? self : typeof global === 'object' ? global : this,
  function loaderPackageInstaller(global) {
    const setconf = (MKP, schemePath) => {
      const { config } = MKP().loader;
      const { type, gun } = config;

      config.type = 'gunsync';

      gun.path = schemePath;
      gun.url = [
        `${window.location.origin}/gun`,
        // 'http://core.rainerg.net:5055/gun'
      ];
    };

    const pathregexp =
      /^(?:(?:(?<runtime>(?:\w+\/)+)?(?:\/matrixByName)?\/?(?<matrix>.+)\/scheme\/)|(?<path>.*))\b(?<x>\w+)\/(?<y>\w+)$/;

    // const parseXYPath = str => str.match(/(\w+)\/(\w+)$/).slice(-2);
    // const parseXYPath = path => path.match(/([a-z0-9]+)\/([a-z0-9]+).js$/).slice(1);
    const parseXYPath = path => path.slice(0, -3).split('/');
    
    const pathParser = (path) => {
      let [base, ...parts] = path.split(/(\*+)/);
      return {path, base, parts};
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    const installCommonUtils = (MKP, type) => {
      const { mkp, loader, matrix } = MKP();
      const currentMatrix = mkp.matrix();

      loader.log.firefly = (...a) =>
        console.log('\x1b[38;2;100;200;200;48;2;20;60;60m %s ', ...a, '\x1b[0m\n');
      loader.log.yellow = (...a) =>
        console.log('\x1b[38;2;70;40;10;48;2;255;235;59m %s ', ...a, '\x1b[0m\n');
      loader.log.yellow2 = (...args) =>
          console.log('\x1b[0;38;5;0;48;5;3m%s', ...args, '\x1b[0m'),
      loader.log.info = (...a) =>
        console.log('\x1b[38;2;110;180;150;48;2;25;35;60m %s \x1b[0m\n', ...a);
      loader.log.log = (...a) =>
        console.log('\x1b[48;2;220;60;30m %s \n', ...a, '\x1b[0m');
      loader.log.teal = (...args) =>
        console.log('\x1b[0;38;5;0;48;5;6m%s', ...args, '\x1b[0m');
      loader.log.red = (...args) =>
      console.log('\x1b[0;48;5;1m%s', ...args, '\x1b[0m');
      loader.log.pink = (...args) =>
        console.log('\x1b[0;48;5;5m%s', ...args, '\x1b[0m')
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////

      let photon = {
        id: 'deps/loader#' + type,
        task: (...a) => {
          return a;
        },
      };

      loader.oncode = ({ key, source }) => {
        const pcode = matrix.add({ key, source });

        const runCode = () => {
          const [x, y, z, w] = key;
          Object.assign(photon, { x, y, z, w });

          const result = matrix.runfn(pcode, photon);
          if (typeof result !== 'undefined') currentMatrix[key] = result;
        };
        // runCode();
        setTimeout(runCode);
      };

      loader.load = upperPhoton => {
        if (upperPhoton) photon = upperPhoton;
        loader.init();
      };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    const installFileLoader = MKP => {
      const { deps, mkp, loader } = MKP();
      const fs = deps.require('fs');
      const nodePath = deps.require('path')
      ///////////////////////////////////////////////////////////////////////////////////////////
      loader.file.read = path => {
        const absPath = nodePath.resolve(path);
        if (!fs.existsSync(absPath)) return '';
        // log.log(' :: READ FILE :::', absPath);
        return fs.readFileSync(absPath);
      };
      loader.file.write = (path, content) => {
        const absPath = nodePath.resolve(path);
        const dir = absPath.replace(/\/[^/]*$/, '');

        // loader.log.firefly(' :: WRITE FILE :::', absPath);

        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(absPath, content); //, { flag: "a" });
        return absPath;
      };
      ///////////////////////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////////////////
      global.watchCache = global.watchCache || {}; //instance.fswatch
      const chokidar = deps.require('chokidar');
      ///////////////////////////////////////////////////////////////////////////////////////////
      loader.watch = function watchFiles(path, cb, opts={}) {
        if (!global.watchCache[path] || !global.watchCache[path].watcher) {
          const {parts} = pathParser(path);
          // console.log('watchFiles', path)
          const watcher = chokidar.watch(parts.join(''), {
            ignored: /node_modules|(^|[\/\\])\../, // ignore dotfiles
            persistent: true,
            depth: 1,
            ignoreInitial: false,
            atomic: true,
            awaitWriteFinish: {
              stabilityThreshold: 100,
              pollInterval: 30,
            },
            ...opts,
          });
          watcher.on('all', (...args) => global.watchCache[path].cb(...args));

          global.watchCache[path] = { watcher, cb };

          // watcher.close().then(() => console.log('closed'));
        } else {
          global.watchCache[path].cb = cb;
        }
        // global.watchCache[path].watcher.add('matrix1/scheme/run/time.js');
      };
      loader.unwatch = function unWatchFiles(path) {
        if (global.watchCache[path] && global.watchCache[path].watcher) {
          return global.watchCache[path].watcher.close().then(() => {
            delete global.watchCache[path].watcher;
            // log.log('closed');
            return 'REMOVE WATCHER on "' + path + '"';
          });
        }
        return Promise.resolve('SUCCESS UNWATCH: NO WATCHER FOUND for ' + path);
      };
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////

      loader.items.just.saved = new Set();
      // loader.tmpdata = [];

      loader.onfile = (method, path, stats) => {
        const key = mkp.f2nw(mkp.f2wn(parseXYPath(path)));
        // loader.tmpdata.push({path, method, stats, key});
        // loader.log.info(' :: READ FILE :::', path, key, loader.config.path);
        // loader.log.info("LOADER ONFILE", method, path, stats, key)
        // Prevent load and run just saved code
        if (loader.items.just.saved.has(key + '')) {
          loader.items.just.saved.delete(key + '');
          return;
        }

        const fileSource = loader.file.read(path);
        const source = '// ' + key + '\n' + fileSource;
        // const source = ';MKP;// ' + key + '\n' + fileSrc;

        loader.oncode({ key, source });
      };
      ///////////////////////////////////////////////////////////////////////////////////////////
      
      loader.init = () => {
        const { path, parts, base } = loader.config;
        const absbase = nodePath.resolve(base);
        loader.config.absbase = absbase;
        const watchdir = path//parts.join('');
        const opts = {
          cwd: absbase,
        };
        // loader.log.pink(' :: LOADER INIT :::', watchdir, opts);
        loader.watch(watchdir, loader.onfile, opts);
      };
    };

    const installWebLoader = MKP => {};

    const installLSLoader = MKP => {
      const { loader } = MKP();

      loader.onlocal = ([mKey, codestr]) => {
        const key = mKey.split(',');
        const source = '// ' + key + '\n' + codestr;
        loader.oncode({ key, source });
      };

      loader.init = () => {
        const data = MKP().local.storage.getall();
        data.map(loader.onlocal);
      };

      // setTimeout(MKP().view.simple.render, 20);
    };

    const installGunLoader = MKP => {};
    
    const install = (MKP, opts = {}) => {
      const { config } = MKP().loader;
      const {base, parts} = pathParser(opts.path);
      Object.assign(config, opts, {base, parts});
      installCommonUtils(MKP, opts.type);

      switch (opts.type) {
        case 'filesync':
          return installFileLoader(MKP);
          break;
        case 'websync':
          return installWebLoader(MKP);
          break;
        case 'lssync':
          return installLSLoader(MKP);
          break;

        case 'gunsync':
          return installGunLoader(MKP);
          break;

        default:
          break;
      }
    };

    return {
      setconf,
      install,
      installFileLoader,
      installWebLoader,
      installLSLoader,
    };
  }
);
