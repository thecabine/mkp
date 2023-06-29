MKP, shift, fwn, f2nw;
// mkp,onstep

return
const {cache} = MKP().run;

if(cache.socket.fake) {
  return
}

const socket = cache.socket

// MKP().run.cache.socket
const emit = (key, data) => {
  // if (!instance) if (!cache.socket.fake) instance = cache.socket;
  socket.emit(key, data);
};
return (BUF, prop) => {
  if (prop.includes(',')) BUF = [0, ...BUF];
  const next = shift(BUF, fwn(prop));
  const keys36 = f2nw(next);
  const data = {
    key: 'quant:'+keys36,
    x: keys36[0],
    y: keys36[1],
    text: prop,
    d: { keys36, prop },
  };
  emit('quantmatrix/quant', data);
  return next;
};
