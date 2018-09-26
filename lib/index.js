const doSomethingSlowly = (x) => {
  return x + 1;
};

const doSomethingAsync = (x, next) => {
  setTimeout(next, 0);
};

const doSomethingComplicated = (x, y, z) => {
  return x + y + z;
};

module.exports = {
  doSomethingSlowly,
  doSomethingAsync,
  doSomethingComplicated
};
