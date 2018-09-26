class Widget {
  constructor (slow, async, complex) {
    this.slow = slow;
    this.async = async;
    this.complex = complex;
  }

  doSlow(...args) {
    return this.slow(...args);
  }

  doAsync(...args) {
    return this.async(...args);
  }

  doComplex(...args) {
    const complex = this.complex(...args);

    return this.complex(complex);
  }
};

module.exports = Widget;
