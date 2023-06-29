MKP, P, matrix, onstep, f2nw, fwn, shift, stringify, onset3;

return
const {
  matrix: { rerunfn },
  run: { cache },
} = MKP();

if (cache.socket.fake) {
  //onset3();
  rerunfn(['mkp','onset3'], P);
  return;
}

const socket = cache.socket;

// MKP().run.cache.socket
const emit = (...args) => {
  // if (!instance) if (!cache.socket.fake) instance = cache.socket;
  socket.emit(...args);
};

return (BUF, target, prop, value) => {
  const nextBUF = f2nw(onstep(BUF, prop));
  
  // const data = { key: 'code:' + mKey, x: mKey[0], y: mKey[1], text: stringify(value) };
  
  emit('matrix/root/alive', 'onset', nextBUF, stringify(value));


  return true;
};
