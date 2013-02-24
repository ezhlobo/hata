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

	module("Traversing");

	test(".eq()", function() {
		expect(3);

		deepEqual(hata($ID).eq(0).get(), hata(wrapper).get(),
			"hata(\"#id\").eq(0) return hata object of first DOMNode");

		var node = wrapper.querySelectorAll("p");

		deepEqual(hata("p").eq(-1).get(), hata(node[--node.length]).get(),
			"hata(\"p\").eq(-1) return hata object of last DOMNode");

		deepEqual(hata("p").eq(100).get(), hata("").get(),
			"hata(\"p\").eq(non-existent) return empty hata object");
	});

	test(".is()", function() {
		expect(5);

		ok(typeof hata().is() === "boolean",
			"return right type")

		ok(hata($ID).is("div") === true,
			"hata(\"#id\").is(\"div\") return true");

		ok(hata($ID).is(wrapper) === true,
			"hata(\"#id\").is(wrapper) return true");

		ok(hata($ID).is(doc.querySelectorAll("div")) === false,
			"hata(\"#id\").is(document.querySelectorAll(\"div\")) return false");

		ok(hata("div").is(wrapper) === false,
			"hata(\"div\").is(wrapper) return false");
	});

	test(".each()", function() {
		expect(4);

		ok(hata().each(function(){}) instanceof hata,
			"return hata object");

		var nodes = doc.querySelectorAll("p"),
			outElems = [],
			outIndex = 0;

		hata(nodes).each(function(elem, index) {
			outElems[outElems.length] = elem;
			outIndex = index;
		});

		deepEqual(outElems, makeArray(nodes),
			"iterators has right first argument");

		ok(outIndex == --nodes.length,
			"iterators has right second arguments");

		hata(nodes).each(function(elem, index) {
			if ( index == nodes.length - 2 ) {
				return false;
			}
			outIndex = index;
		});

		ok(outIndex == nodes.length - 3,
			"correct break iterations");
	});

	test(".find()", function() {
		expect(3);

		var nodes = doc.querySelectorAll("p");

		deepEqual(hata(doc).find("p").get(), makeArray(nodes),
			"hata(document).find(\"p\") is right");

		deepEqual(hata(doc).find("unknownTag").get(), [],
			"hata(document).find(unknownTag) return empty hata object");

		deepEqual(hata($ID).find("body").get(), [],
			"hata(\"#id\").find(\"body\") return empty hata object");
	});

	test(".closest()", function() {
		expect(3);

		deepEqual(hata("p").closest("body").get(), [doc.body],
			"hata(\"p\").closest(\"body\") is right");

		deepEqual(hata("body").closest("body").get(), [doc.body],
			"hata(\"body\").closest(\"body\") return hata object of body node");

		deepEqual(hata("body").closest("p").get(), [],
			"hata(\"body\").closest(\"p\") return empty hata object");
	});

	test(".parents()", function() {
		expect(3);

		deepEqual(hata($ID).parents("body").get(), [doc.body],
			"hata(\"#id\").parents(\"body\") return hata object of body node");

		deepEqual(hata("body").parents("body").get(), [],
			"hata(\"body\").parents(\"body\") return empty hata object");

		deepEqual(hata("body").parents("p").get(), [],
			"hata(\"body\").parents(\"p\") return empty hata object");
	});

	test(".filter()", function() {
		expect(3);

		deepEqual(hata("a").filter(".foo").get(), makeArray(doc.querySelectorAll(".foo")),
			"hata(\"a\").filter(\".foo\") is right");

		deepEqual(hata("a").filter("p").get(), [],
			"hata(\"a\").filter(\"p\") return empty hata object");

		var node = doc.querySelectorAll("a[title]");

		deepEqual(hata("a").filter("[title]").get(), makeArray(node),
			"hata(\"a\").filter(\"[title]\") is right");
	});

};
