MKP;

const { mkp, matrix, loader, require } = MKP().deps;

const mObj = {};
const MKP_2 = mkp.build(mObj);
matrix.install(mObj); // need MKP

MKP_2().deps = MKP().deps;

// deps.mkp = mkp;
// deps.matrix = matrix;
// deps.loader = loader;
// deps.require = require;

loader.install(MKP_2, { type: 'filesync', path: 'sandbox/*/*.js' });

const photon = {
  id: 'sandbox/matrix0a#run',
  listTasks: [],
  task: (s, ...a) => {
    photon.listTasks.push({
      x: photon.x,
      y: photon.y,
      strs: [...s],
      vals: [...a],
    });
    console.log(
      'P.task on ' + [photon.x, photon.y] + ' \n\x1b[48;2;139;25;45m' + s,
      a
    );
    return a;
  }
};

MKP_2().portal.main = MKP();
// mObj.defbuf = [0, 0, 0, 0, 0, 0];

MKP_2().loader.load(photon);

return MKP_2();
