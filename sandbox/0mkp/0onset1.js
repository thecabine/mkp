MKP, matrix, onstep, f2nw, fwn, shift, stringify;

// MKP().cache.repl = global.rrr;
// MKP().cache.rofl = { a: '1', b: '2' };
// MKP().cache.arr = ['a', 'b', 'c'];
// MKP().cache.txt = '--- a , b , c --->';
// MKP().cache.num = 12321;
// MKP().cache.bool = true;

//AUTOSAVE
const { log, loader } = MKP();
let RUNNING = false;
loader.items.tosave = new Set();

const {absbase, parts} = loader.config;

// MKP().loader.log.firefly(' :: WRITE FILE :::', absbase);
const saveBulk = () => {
  for (const mKey of loader.items.tosave) {
    const filePath = absbase + '/' + mKey.split(',').join('/') + '.js';
    const value = matrix()[mKey];
    const content = stringify(value);
    loader.items.just.saved.add(mKey+'');
    loader.items.tosave.delete(mKey+'');
    // MKP().loader.log.red(' :: WRITE FILE :::', filePath,mKey, value);
    if (!content) return;
    const fp = loader.file.write(filePath, 'MKP;\n// ' + mKey + '\n\n\nreturn ' + content);
  }
};

const runPeriodic = (c = 4) => {
  if ((RUNNING = !!c)) setTimeout(c => (saveBulk(), runPeriodic(c)), 60, c - 1);
};

return (BUF, target, prop, value) => {
    const mKey = f2nw(onstep(BUF, prop));
    // console.log('BASE -- ', f2nw(mKey)) 
  
  const high = matrix()[[...mKey, 'onset']];
  if(high) {
    high(matrix, mKey, value);
    console.log('HIGH -- ', high) 

    return true;
  }

  if (mKey.length > 2) return true;

  loader.items.tosave.add(mKey+'');
  if (!RUNNING) runPeriodic(4);

  return true;
};
