new function () {

	module("Utilities");

	test("hata.extend", function() {
		expect(3);

		hata.extend({
			get test() { return "test"; },
			ping: function() { return "pong"; }
		});

		ok(hata("test").test === "test",
			"hata.extend getter");
		ok(hata("ping").ping() === "pong",
			"hata.extend method");

		var testObject = {};
		hata.extend(testObject, { prop : "Yes" });

		ok(testObject.prop === "Yes",
			"hata object extend");
	});

	test("hata.noConflict", function() {
		expect(1);

		ok(hata === hata.noConflict(),
			"noConflict returned the hata object");
	});

};
