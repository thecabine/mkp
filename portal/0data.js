MKP;


const { mkp, matrix, loader, require } = MKP().deps;

const mObj = {};
const MKP_2 = mkp.build(mObj);
matrix.install(mObj); // need MKP

MKP_2().deps = MKP().deps;

loader.install(MKP_2, { type: "filesync", path: "readdata/*/*.js" });

MKP_2().portal.main = MKP();

MKP_2().loader.load()

return MKP_2();

