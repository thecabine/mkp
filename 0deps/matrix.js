(function (global, factory) {
  const MOD_NAME = './matrix';
  const depsCache = (global.__DEPS_CACHE = global.__DEPS_CACHE || {});
  if (depsCache[MOD_NAME]) return depsCache[MOD_NAME];
  const mod = (depsCache[MOD_NAME] = factory(global));
  if (typeof module === 'object' && module.exports) module.exports = mod;
})(
  typeof self === 'object' ? self : typeof global === 'object' ? global : this,
  function matrixPackageInstaller() {
    const install = M =>
      Object.entries({
        aaa: v => console.trace(v),
        pstore: {},
        add: ({ key, source }) => {
          const mcode = M['matrix,mkfn']({ key, source });
          M['matrix,pstore'][key] = mcode;
          return mcode;
        },

        mkfn: ({ key, source }) => {
          const depsNames = M['mx4kve,q336'](source) || [];
          // console.log("<<<MKFN>>>", key, depsNames)
          const fn = new Function(depsNames, source);
          const [x, y, z, w] = key;

          Object.defineProperty(fn, 'name', { value: '§.mkfn ' + key.join(','), writable: false });
          return { x, y, z, w, key, fn, depsNames, source };
        },
        // MKP().matrix.deps.resolver.fn // 'rfezfmxo,df5f':
        runfn: (pcode, photon) => {
          // run photon code
          //    const resolver = k => k == 'P' ? photon : k == 'MKP' ? M['mkp,main'] : M['mkp,main'](M['mkp,f2wn']([pcode.x, k]));
          const resolver = k => {
            switch (k) {
              // case 'T': return 'something else';
              case 'P':
                return photon;
              case 'MKP':
                return M['mkp,main'];
            }
            //debugger
            //if(M.hasOwnProperty([pcode.x, k]))
            //  return M[[pcode.x, k]];

            //if(M.hasOwnProperty([`mkp`, k]))
            //  return M[[`mkp`, k]];

            return M['mkp,main'](M['mkp,f2wn']([pcode.x, k]));
          };

          const args = pcode.depsNames.map(resolver);
          return pcode.fn(...args);
        },
        rerunfn: (mKey, photon, delay = 0) => {
          const pcode = M['matrix,pstore'][mKey];
          // console.log(mKey,pcode, ['PHO',photon.x,photon.y], [pcode.repeat, pcode && pcode.repeat <= 3])
          if (pcode && (pcode.repeat == undefined || pcode.repeat <= 3))
            setTimeout(() => {
              pcode.repeat = (pcode.repeat || 0) + 1;
              photon.x = mKey[0];
              photon.y = mKey[1];
              photon.z = mKey[2];
              photon.w = mKey[3];
              const result = M['matrix,runfn'](pcode, photon);

              if (typeof result !== 'undefined') M[mKey] = result;
            }, delay);
        },
        'mx4kve,q336': str => {
          //'MKP().matrix.code.match.deps'
          const hasStopWords = str.search(/(\b(return|let|const|var|function|if)\b|\n\n)/);
          const part = hasStopWords >= 0 ? str.substring(0, hasStopWords) : str;
          //console.log(str,part)
          return String(part.match(/^[0-9a-z-A-Z ,;]+/gm) || '').match(/\w+/g);
        },
        'photon,z282cb': str => {
          //MKP().matrix.photon.create
        },
        'photon,mbdm5m': str => {
          //MKP().matrix.photon.jump
        },
        'photon,mbn2bh': str => {
          //MKP().matrix.photon.task
        },
      }).map(([k, v]) => (M[k.includes(',') ? k : ['matrix', k]] = v));

    //console.trace('\x1b[48;2;50;150;130mAAAAA','sdsdf');
    //mm = {};
    //o1 = install(mm);

    return {
      install,
    };
  }
);
