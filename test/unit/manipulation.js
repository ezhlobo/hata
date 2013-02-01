new function () {

  var ID = 'qunit-fixture',
    $ID = '#' + ID,
    win = window,
    doc = win.document,
    wrapper = doc.getElementById(ID),
    slice = [].slice,

    makeArray = function(obj) {
      return Array.prototype.slice.call(obj);
    };

  module('Manipulation');

  test('hata.extend', function() {
    expect(3);

    hata.extend({
      get test() { return 'test'; },
      ping: function() { return 'pong'; }
    });

    equal(hata().test, 'test',
      'hata.extend getter');
    equal(hata().ping(), 'pong',
      'hata.extend method');

    var testObject = {};
    hata.extend(testObject, { prop : 'Yes' });

    equal(testObject.prop, 'Yes',
      'hata object extend');

  });

  test('hata().each', function() {
    expect(1);

    var hataElems = [];
    hata('p').each(function(elem, index) {
      hataElems[index] = elem;
    });

    deepEqual(hataElems, makeArray(doc.getElementsByTagName('p')),
      'hata("p").each()');
  });

  test('hata.noConflict', function() {
    expect(1);

    strictEqual(hata, hata.noConflict(),
      'noConflict returned the hata object');
  });

};
