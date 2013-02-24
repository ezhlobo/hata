new function () {

	var $ID = "#qunit-fixture",
		wrapper = window.document.getElementById("qunit-fixture");

	module("Miscellaneous");

	test(".get()", function() {
		expect(2);

		strictEqual(hata($ID).get(0), wrapper,
			"hata(\"#id\").get(0) return first DOMNode");

		deepEqual(hata($ID).get(), [wrapper],
			"hata(\"#id\").get() return array of all DOMNodes");
	});

};
