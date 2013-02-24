new function () {

	var ID = "qunit-fixture",
		$ID = "#" + ID,
		win = window,
		doc = win.document,
		wrapper = doc.getElementById(ID),
		slice = [].slice,

		makeArray = function(obj) {
			return Array.prototype.slice.call(obj);
		};

	module("Selectors");

	test("Standart", function() {
		expect(19);

		deepEqual(hata().get(), [],
			"hata() return empty hata object");

		deepEqual(hata(window).get(), [win],
			"hata(window) is window");

		deepEqual(hata(doc).get(), [doc],
			"hata(document) is document");

		deepEqual(hata("body").get(), [doc.body],
			"hata(\"body\") is body");

		deepEqual(hata(hata("body")).get(), [doc.body],
			"hata( hata(\"body\") ) is body");

		deepEqual(hata(doc.getElementsByTagName("p")).get(), makeArray(doc.getElementsByTagName("p")),
			"hata( document.getElementsByTagName(\"p\") ) is right");

		deepEqual(hata(doc.querySelector("p")).get(), [doc.querySelector("p")],
			"hata( document.querySelector(\"p\") ) is right");
		deepEqual(hata(doc.querySelectorAll("p")).get(), makeArray(doc.querySelectorAll("p")),
			"hata( document.querySelectorAll(\"p\") ) is right");

		deepEqual(hata("p").get(), makeArray(doc.getElementsByTagName("p")),
			"hata(\"p\") is right");
		strictEqual(hata("p").get(0), doc.getElementsByTagName("p")[0],
			"hata(\"p\").get(0) is right");
		strictEqual(hata("p").get().length, doc.getElementsByTagName("p").length,
			"hata(\"p\") right length");
		strictEqual(hata($ID + " p").get().length, wrapper.getElementsByTagName("p").length,
			"hata(\"#id p\") right length");

		deepEqual(hata($ID).get(), [wrapper],
			"hata(\"#id\") is right");
		strictEqual(hata($ID).get().length, 1,
			"hata(\"#id\") right length");

		deepEqual(hata(".foo").get(), makeArray(doc.getElementsByClassName("foo")),
			"hata(\".foo\") is right");
		strictEqual(hata(".foo").get().length, doc.getElementsByClassName("foo").length,
			"hata(\".foo\") right length");

		deepEqual(hata(".foo").get(), makeArray(doc.getElementsByClassName("foo")),
			"hata(\".foo\") is right");

		strictEqual(hata("unknownTag").get().length, 0,
			"hata(\"unknownTag\") returns nothing");

		deepEqual(hata("#element_is_null").get(), [],
			"if no element should be empty");
	});

	test("With context", function() {
		expect(3);

		deepEqual(hata("p", $ID).get(), makeArray(wrapper.getElementsByTagName("p")),
			"hata(\"p\", \"#id\") is right");

		deepEqual(hata("p", hata($ID)).get(), makeArray(wrapper.getElementsByTagName("p")),
			"hata(\"p\", hata(\"#id\")) is right");

		deepEqual(hata("p", $ID).get(), makeArray(wrapper.getElementsByTagName("p")),
			"hata(\"p\", document.getElementById(\"id\")) is right");
	});

};
