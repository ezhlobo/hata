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

	module('Get');

	test('Standart selectors', function() {
		expect(19);

		deepEqual(hata(window).get(), [win],
			'hata(window) is window');

		deepEqual(hata().get(), [doc],
			'hata() is document');
		deepEqual(hata(doc).get(), [doc],
			'hata(document) is document');

		deepEqual(hata('body').get(), [doc.body],
			'hata("body") is body');

		deepEqual(hata(hata('body')).get(), [doc.body],
			'hata( hata("body") ) is body');

		deepEqual(hata(doc.getElementsByTagName('p')).get(), makeArray(doc.getElementsByTagName('p')),
			'hata( document.getElementsByTagName("p") ) is right');

		deepEqual(hata(doc.querySelector('p')).get(), [doc.querySelector('p')],
			'hata( document.querySelector("p") ) is right');
		deepEqual(hata(doc.querySelectorAll('p')).get(), makeArray(doc.querySelectorAll('p')),
			'hata( document.querySelectorAll("p") ) is right');

		deepEqual(hata('p').get(), makeArray(doc.getElementsByTagName('p')),
			'hata("p") is right');
		strictEqual(hata('p').get(0), doc.getElementsByTagName('p')[0],
			'hata("p").get(0) is right');
		strictEqual(hata('p').get().length, doc.getElementsByTagName('p').length,
			'hata("p") right length');
		strictEqual(hata($ID + ' p').get().length, wrapper.getElementsByTagName('p').length,
			'hata("#id p") right length');

		deepEqual(hata($ID).get(), [wrapper],
			'hata("#id") is right');
		strictEqual(hata($ID).get().length, 1,
			'hata("#id") right length');

		deepEqual(hata('.foo').get(), makeArray(doc.getElementsByClassName('foo')),
			'hata(".foo") is right');
		strictEqual(hata('.foo').get().length, doc.getElementsByClassName('foo').length,
			'hata(".foo") right length');

		deepEqual(hata('.foo').get(), makeArray(doc.getElementsByClassName('foo')),
			'hata(".foo") is right');

		strictEqual(hata('unknownTag').get().length, 0,
			'hata("unknownTag") returns nothing');

		deepEqual(hata('#element_is_null').get(), [],
			'if no element should be empty');

	});

	test('With context', function() {
		expect(5);

		// hata()

		deepEqual(hata('p', $ID).get(), makeArray(wrapper.getElementsByTagName('p')),
			'hata("p", "#id") is right');

		deepEqual(hata('p', hata($ID)).get(), makeArray(wrapper.getElementsByTagName('p')),
			'hata("p", hata("#id")) is right');

		deepEqual(hata('p', $ID).get(), makeArray(wrapper.getElementsByTagName('p')),
			'hata("p", document.getElementById("id")) is right');

		// hata().find()

		deepEqual(hata($ID).find('p').get(), makeArray(wrapper.getElementsByTagName('p')),
			'hata("#id").find("p") is right');

		deepEqual(hata($ID, doc).find('p').get(), makeArray(wrapper.getElementsByTagName('p')),
			'hata("#id", document).find("p") is right');

	});

	test('hata().closest', function() {
		expect(2);

		var hataObj;

		hataObj = hata('h1', $ID).closest($ID);
		deepEqual(hataObj.get(), [wrapper],
			'hata(sel, "#id").closest("#id") returned parent')

		hataObj = hata('h1', $ID).closest('h1');
		deepEqual(hataObj.get(), makeArray(wrapper.getElementsByTagName('h1')),
			'hata(sel, "#id").closest(sel) returned self')
	});

	test('hata().filter', function() {
		expect(2);

		var hataObj;

		hataObj = hata('a', $ID).filter('.foo');
		deepEqual(hataObj.get(), makeArray(wrapper.getElementsByClassName('foo')),
			'hata(sel, "#id").filter(class) is right')

		hataObj = hata('a', $ID).filter('[title=test]');
		deepEqual(hataObj.get(), makeArray(wrapper.querySelectorAll('a[title=test]')),
			'hata(sel, "#id").filter(attribute) is right')
	});

};
