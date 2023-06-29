(function (global, factory) {
  const MOD_NAME = './webboot';
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
  function (global, require) {
    const startWeb = (MKP, photon) => {
      // _UniverseMatrix0['c0,d0'] = '100'; //'()=>100'
      // _UniverseMatrix0['c0,d1'] = '101'; //'()=>101'
      // _UniverseMatrix0['c0,d2'] = '102'; //'()=>102'
      // _UniverseMatrix0['c1,d0'] = '110'; //'()=>110'
      // _UniverseMatrix0['c1,d1'] = '111'; //'()=>111'
      // _UniverseMatrix0['c1,d2'] = '112'; //'()=>112'
      _UniverseMatrix0['backgr,color,onset']=	 (matrix, mKey, value)=>{
         document.querySelector('html').style.background=value ;
         matrix['mkp,main']().backgp.color = 'new color: '+value+'\nat '+(new Date).toLocaleDateString() ;
         return true; 
        }	
        _UniverseMatrix0['backgr,color'] = `teal`	
        //_UniverseMatrix0['trigger,onset'] = ({key, x,y,text,d})=>console.log('t:onset', x,'\t', y,'\t', text,'\t', key, d)
        //_UniverseMatrix0['trigger,oncode'] = ({key, x,y,text})=>console.log('t:oncode', x,'\t', y,'\t', text,'\t', key)
        
        _UniverseMatrix0['trigger,onfile'] = data => {
          // MKP()[data.key[0]][data.key[1]] = data.source;
          // MKP().mkp.onset0(MKP().mkp.f2wn([0, data.key[0]]), undefined, data.key[1], data.source);
          // const value = MKP().matrix.runfn(MKP().matrix.add(data), photon)
          // console.log('t:onfile', data, value);
          
          // MKP().mkp.onsetx(data.key, value);
          
          MKP().local.storage.set(data.key, data.source);
          MKP().loader.oncode(data);
          setTimeout(()=>MKP().mkp.touch(data.key));
          setTimeout(MKP().view.simple.render, 20);
        };
        _UniverseMatrix0['trigger,onfmin'] = data => {
          // if(MKP().local.storage.get(data.key) == data.source) return;
           
          // MKP().local.storage.set(data.key, data.source);
          MKP().loader.oncode(data);
          // setTimeout(()=>MKP().mkp.touch(data.key));
        }

      const {
        mkp,
        view: { update },
      } = MKP();

      update.trigger = (buf, value, prop) => null;

      // _SM = MKP().mkp.clone();
      // _SM().mkp.onset = (M => (BUF, target, prop, value) => {
      //     const next = M['mkp,f2nw'](M['mkp,onstep'](BUF, prop));
      //     M[next] = value;
      //     update.trigger(next, value, prop);
      //     return true
      // })(_SM().mkp.matrix());

      // _SM().mkp.onset = _SM().mkp.onset0;

      window.TMP = {};
      const PREFIX = 'msv-';
      Object.assign(MKP().local.storage, {
        // getall: () => Object.entries(localStorage),//.map(([k,v])=>[k.split(','), v]),
        getall: () => Object.entries(TMP),//.map(([k,v])=>[k.split(','), v]),
        get: mKey => TMP[mKey],//localStorage.getItem(mKey),
        set: (mKey, data) => {

          if (data) return TMP[mKey] = data;
          //if (data) return localStorage.setItem(mKey, data);
        },
        update: () => {},
      });

      update.trigger = (BUF, value, prop) => {
        return
        // console.log(BUF, value, prop);
        
        const out = MKP().mkp.stringify(value);
        // console.log('TRIG', out);
        
        if (out !== undefined) {
          // console.log('ONSET ::', BUF, out);

          MKP().local.storage.set(BUF, 'return '+out);
          clearTimeout(window.RI)
          window.RI = setTimeout(MKP().view.simple.render, 500);
        }
      };

      global.VIEWER = MKP().view;
      // const {f2wn} = MKP().mkp;
      MKP().view.text.onchange = (mKey, el) => {
        //console.log('onchange', mKey, el)
        const [x,y] = mKey.split(',');
        MKP()[x][y] = el.value;
      };
      
      MKP().view.func.onchange = (mKey, el) => {
        console.log('onchange', mKey, el)
        const [x,y] = mKey.split(',');
        //MKP()[x][y] = el.target.value;
      };
      
      MKP().view.simple.render = () => {
        const outqqq = `<div>\${v}</div>`;
        const fwn = w => parseInt(w, 36);
        const fnw = n => n.toString(36);

        let arrxy = [
          // [[0, 0], 'top block', 'suprtest'],
          ...Object.entries(_UniverseMatrix0).map(([k, v]) => [k.split(','), k, v]),
        ];

        // const ui = MKP().mxclist.viewer[-900000000];
        const colwidth = 100; //ui.stepx.value;
        //  let a=[[10,0],[20,3],[40,10],[30,20],[3,15],[33,12],[3,10],[34,10]]
        let sx = {};
        let sy = {};
        const karrxy = arrxy.map(([[x, y], k, v]) => {
          const [kx, ky] = [x, y];
          //    const [kx,ky]= [ fnw(fwn(x)-fwn`utils`),fnw(fwn(y)-fwn`convert`) ]
          //    const [kx,ky]= [ fnw(fwn(x)-fwn(just._code.x)),fnw(fwn(y)-fwn(just._code.y)) ]

          sx[kx] = Math.max(
            sx[kx] || 0,
            typeof v == 'string'
              ? Math.min(colwidth * 3, (v + '').length * 9)
              : typeof v == 'function'
              ? 10
              : colwidth,
            colwidth
          );
          sy[ky] = 0;
          return [[kx, ky], k, v];
        });

        let columnLastX = 0; // ui.clastx.u0000 = 0;
        Object.keys(sx)
          .map(fwn)
          .sort((a, b) => a - b)
          .map(fnw)
          .map((v, i) => {
            const lc = sx[v];
            sx[v] = columnLastX;
            columnLastX = columnLastX + lc;
          });
        Object.keys(sy)
          .map(fwn)
          .sort((a, b) => a - b)
          .map(fnw)
          .map((v, i) => (sy[v] = i * 100));

        const outarr = karrxy.map(([[x, y], k, v]) => [[sx[x], sy[y]], k, v]);

        const strEscape = str =>
          str.replace(
            /(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!\/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi,
            ''
          );
        const tplVal = (k,v) => {
          let out = '';
          switch (typeof v) {
            case 'function':
              out = `<textarea onchange="VIEWER.func.onchange('${k}', this)">${strEscape(v + '')}</textarea>`;
              break;

            default:
              out = `<div><textarea onchange="VIEWER.text.onchange('${k}', this)">${(v + '')}</textarea></div>`;
              // out += `<div>typeof v = ${typeof v}</div>`
              break;
          }

          return out;
        };
        let html = outarr
          .map(
            ([[x, y], k, v], i) =>
              `<div style="translate: ${x}px ${y}px;z-index:${10 - k.length}"><code>${k}</code>${tplVal(k,v)}</div>`
              // `<div style="top:${00+y}px;left:${0+x}px;z-index:${10 - k.length}"><code>${k}</code>${tplVal(k,v)}</div>`
          )
          .join('\n');

        document.getElementById('new_viewer').innerHTML = html;
      };
    };

    const socketConnect = (MKP)=>{
      const io_url = `ws://${window.location.hostname}:5045`;
      const socket = io(io_url, { transports: ["websocket"] });
      //const socket = io(`${window.location.origin}`);

      let out = [];
      // socket.removeAllListeners();
      socket.on('connect', () => { // TIP: you can avoid listening on `connect` and listen on events directly too!
          // socket.emit('ask', 'tobi', 'woot', (data) => { // args are sent in order to acknowledgement function
          //     console.log(data); // data will be 'tobi says woot'
          //     // alert(data)
          // });
          // // socket.emit('test', (data) => {
          //     // setText('out', JSON.stringify(data, 0, 2))
          // })


          socket.on('quantmatrix/quant', (photon) => {
              MKP().trigger.onset(photon);
              // out.push(photon.x36+' '+photon.y36+' '+photon.u)
              // out.push(photon.y36)
              // setHTML('matrix_status', JSON.stringify(photon, 0, 2))
              // setHTML('socket_status', out.join('\n'))
          })

          socket.on('quantmatrix/scheme', (scheme) => {
              //scheme.map(addCode);
              console.log("SCHEME", scheme)
              // setHTML('matrix_status', JSON.stringify(scheme, 0, 2))
          })

          socket.on('matrix/root/alive', (reason, BUF, value) => {
              // console.log("matrix/root/alive", reason, BUF, value)
              MKP().begin[reason](BUF, value);
              // setHTML('matrix_status_2', JSON.stringify(code, 0, 2))
          })
          
          
          
          
          
          
          socket.on('service/webfile', (data) => {
              MKP().trigger.onfile(data); 
              //console.log("SCHEME", data)
              // setHTML('matrix_status', JSON.stringify(scheme, 0, 2))
          })

          
          socket.emit('service/fullfill/webfile', data => {
            // console.log('service/fullfill/webfile', data);
            Object.values(data).map(MKP().trigger.onfmin);

            setTimeout(MKP().view.simple.render, 500);
          });



      });


      // setClick('btn_test', () => {
      //     socket.emit('matrix/status', (data) => {
      //         setText('out', JSON.stringify(data, 0, 2))
      //     })


      // })



    }

    return {
      startWeb,
      socketConnect,
    };
  }
);
