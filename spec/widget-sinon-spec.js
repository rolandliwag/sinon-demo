const unexpected = require('unexpected');
const sinon = require('sinon');
const unexpectedSinon = require('unexpected-sinon');
const Widget = require('../lib/widget');

describe('widget', () => {
  const expect = unexpected.clone().installPlugin(unexpectedSinon);

  const slowStub = sinon.stub();
  const asyncStub = sinon.stub();
  const complexStub = sinon.stub();

  let widget;

  beforeEach(() => {
    slowStub.reset();
    asyncStub.reset();
    complexStub.reset();
    widget = new Widget(slowStub, asyncStub, complexStub);
  });

  it('should do something slowly', () => {
    slowStub.returns(0);

    expect(widget.doSlow(100), 'to equal', 0);
  });

  it('should do something asynchronously', (done) => {
    asyncStub.yields(null, 0);

    widget.doAsync(100, (err, value) => {
      if (err) {
        return done.fail(err);
      }

      expect(value, 'to equal', 0);
      done();
    });
  });

  it('should do something complicated', () => {
    complexStub.returns(0);

    expect(widget.doComplex(100, 99, 98), 'to equal', 0);
    expect(complexStub, 'was called with', 10, 99, 98)
    .and('was called times', 1);
  });
});
