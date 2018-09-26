const Widget = require('../lib/widget');

describe('widget', () => {

  const slowStub = jasmine.createSpy('slow');
  const asyncStub = jasmine.createSpy('async');
  const complexStub = jasmine.createSpy('complex');

  let widget;

  beforeEach(() => {
    slowStub.calls.reset();
    asyncStub.calls.reset();
    complexStub.calls.reset();
    widget = new Widget(slowStub, asyncStub, complexStub);
  });

  it('should do something slowly', () => {
    slowStub.and.returnValue(0);

    expect(widget.doSlow(100)).toEqual(0);
  });

  it('should do something asynchronously', (done) => {
    asyncStub.and.callFake((val, next) => {
      next(null, 0);
    });

    widget.doAsync(100, (err, value) => {
      if (err) {
        return done.fail(err);
      }

      expect(value).toEqual(0);
      done();
    });
  });

  it('should do something complicated', () => {
    complexStub.and.returnValue(0);

    expect(widget.doComplex(100, 99, 98)).toEqual(0);
    expect(complexStub).toHaveBeenCalledWith(10, 99, 98);
    expect(complexStub).toHaveBeenCalledTimes(1);
  });
});
