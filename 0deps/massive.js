(function (global, factory) {
  // const MOD_NAME = './mkp';
  const MOD_NAME = './massive';
  const depsCache = (global.__DEPS_CACHE = global.__DEPS_CACHE || {});
  if (depsCache[MOD_NAME]) return depsCache[MOD_NAME];
  const mod = (depsCache[MOD_NAME] = factory(global));
  if (typeof module === 'object' && module.exports) module.exports = mod;
})(
  typeof self === 'object' ? self : typeof global === 'object' ? global : this,
  
  console.log('\x1b[48;2;39;25;145m  >  BEGIN  DEPS :: MKP MASSIVE  \x1b[0m') ||
  
  function mkpPackageInstaller(global) {
    const installer = M =>
      ({
        'mkp,matrix': () => M,
        'mkp,fwn': w => parseInt(w, 36),
        'mkp,fwbn': w =>
          w
            .split(/(?=(?:.{8})*$)/)
            .reverse()
            .map((v, i) => BigInt(parseInt(v, 36)) * 36n ** BigInt(i * 8))
            .reduce((m, v) => m + v),
        'mkp,fnw': n => n.toString(36),
        'mkp,f2wn': aw => aw.map(M['mkp,fwn']),
        'mkp,f2nw': an => an.map(M['mkp,fnw']),
        'mkp,efn': expression => eval(expression.replace(/[a-z0-9]+/g, M['mkp,fwn'])),
        'mkp,efw': expression => M['mkp,fnw'](M['mkp,efn'](expression)),
        'mkp,shift': ([c, ...h], v, i) => [...h, c + v],
        'mkp,onstep': (BUF, prop) => {
          // console.log('\x1b[48;2;9;65;185m MKP::ONSTEP', M['mkp,f2nw'](BUF), BUF, prop, '\x1b[0m')
          const nextBUF = M['mkp,shift'](BUF, M['mkp,fwn'](prop));
          if (prop.includes(',')) 
            return [0, ...nextBUF];
          return nextBUF;
        },
        'mkp,onget': (BUF, target, prop, receiver) => {
          if (typeof prop == 'symbol') {
            return type => {
              // console.log('GET->SYMBOL->type', prop, type);
              switch (prop) {
                case Symbol.toPrimitive:
                  return M['mkp,onprim'](BUF, type, prop);
                case Symbol.iterator:
                  return (target['[]'] = [][Symbol.iterator]());
              }
              return undefined;
            };
          }

          switch (prop) {
            case 'BUF':
              return BUF;
            case 'BUF36':
              return M['mkp,f2nw'](BUF);
            case 'handle':
              return handle;
            case 'prototype':
              return target.prototype;
            case 'constructor':
              return target.constructor;
            case 'hasOwnProperty':
              return hasProperty;
            case 'toJSON':
              return JSON.stringify(target);
            case 'valueOf':
              return receiver.valueOf;
            case 'toString':
              return function () {
                return receiver.$className;
              };
          }
//          console.log('GET->BUF prop', M['mkp,f2nw'](BUF),prop);
          return M['mkp,main'](M['mkp,onstep'](BUF, prop));
        },
        'mkp,onprim': (BUF, type, prop) => M[M['mkp,f2nw'](BUF)],
        'mkp,oncall': (BUF, ...args) =>
          console.log('\x1b[48;2;39;65;185m MKP::ONCALL', M['mkp,f2nw'](BUF), ...args, '\x1b[0m'),
        // 'mkp,onset': (BUF, target, prop, value) => (
        //   (M[M['mkp,f2nw'](M['mkp,onstep'](BUF, prop))] = value), true
        //   // for (let i = 0; i <= 5; i++) (fn => fn && fn(args))(M['mkp,onset' + i]);
        // M[M['mkp,f2nw'](M['mkp,onstep'](BUF, prop))] = value;
        // ),
        'mkp,onset0': (BUF, target, prop, value) => {
          const nextBUF = M['mkp,f2nw'](M['mkp,onstep'](BUF, prop));
          // console.log('BASE -- ', M['mkp,f2nw'](BUF), prop)
          const high = M[[...nextBUF, 'onset']];
          if (high) {
            // console.log('HIGH -- ', high);
            if (!high(M, nextBUF, value)) return false;
          }
          M[nextBUF] = value;
          return true;
        },
        'mkp,touch': (key) => {
          if(!M.hasOwnProperty(key)) return;
          const high = M[[...key, 'onset']];
          if (high) {
            // console.log('HIGH TOUCH X -- ', high);
            if (!high(M, key, M[key])) return false;
          }
        },
        'mkp,main': function mkpMain(BUF = M.defbuf || [0, 0]) {
          const step = M['mkp,f2nw'](BUF);
          if(Object.hasOwn(M, step))
            return M[step];

          const OBJ = function () {
            /* MKP OBJ */
          };
          return new Proxy(OBJ, {
            get: (...args) => M['mkp,onget'](BUF, ...args),
            apply: (...args) => M['mkp,oncall'](BUF, ...args),
            set: (...args) => {
              for (let i = 5; i >= 0; i--) {
                // console.log('ONSET', i)
                const fn = M['mkp,onset' + i];
                if (fn) fn(BUF, ...args);
              }
              return true;
            },
          });
        },

        'mkp,install': pack => pack.forEach(([k, v]) => (M[k] = v)),
        'mkp,stringify': (() => {
          const isPlainObject = v =>
            !!v &&
            typeof v === 'object' &&
            (v.__proto__ === null || v.__proto__ === Object.prototype);

          function JSONreplacer(k, v) {
            // log.red(k, this, typeof v, isPlainObject(v));
            if (
              typeof k == 'symbol' ||
              typeof v == 'symbol' ||
              (typeof v == 'function' && v + '' == 'undefined')
            )
              return undefined;
            if (typeof v == 'object')
              return isPlainObject(v) ? v : Array.isArray(v) ? v : undefined;
            if (typeof v == 'function') return v + '';
            if (typeof v == 'number') return v;
            if (typeof v == 'boolean') return v;
            if (typeof v == 'string') return v;
            if (typeof v == 'undefined') return undefined;
            return undefined;
            // return (isPlainObject(v) ? v : v + '') + '(' + isPlainObject(v) + ')';
            // return k == '' ? v : typeof v !== 'symbol' ? isPlainObject(v) + '' : undefined;
          }
          const stringify = value => {
            try {
              if (typeof v == 'boolean') return v;
              if (typeof value == 'function')
                return value + '' === 'undefined' ? undefined : '' + value;
              if (typeof value == 'number') return '' + value;
              if (value instanceof RegExp) return '' + value;
              if (typeof value == 'string') return '`' + value.replace(/([`$])/g, '\\$1') + '`';
              if (typeof value == 'object') return JSON.stringify(value, JSONreplacer, 2);
            } catch (error) {
              console.error(error);
            }
            return undefined;
          };
          return stringify;
        })(),
      });//.forEach(([k, v]) => (M[k] = v));

    const build = (qm = {}) => {
      qm[['mkp', 'build']] = build;
      Object.assign(qm, installer(qm));
      return qm['mkp,main'];
    };

    return {
      installer,
      build,
    };
  }
);
