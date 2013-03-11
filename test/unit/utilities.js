new function () {

	module("Utilities");

	test("hata.extend", function() {
		expect(5);

		hata.extend( hata.fn, {
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

		var result, initial = {
			// This will make "copyIsArray" true
			array: [ 1, 2, 3, 4 ],
			// If "copyIsArray" doesn't get reset to false, the check
			// will evaluate true and enter the array copy block
			// instead of the object copy block. Since the ternary in the
			// "copyIsArray" block will will evaluate to false
			// (check if operating on an array with ), this will be
			// replaced by an empty array.
			object: {}
		};

		result = hata.extend( {}, initial );

		deepEqual( result, initial, "The [result] and [initial] have equal shape and values" );
		ok( !Array.isArray( result.object ), "result.object wasn't paved with an empty array" );
	});

	test("hata.each", function() {
		expect(14);

		var div = hata("div");
		div.each(function(){this.foo = "zoo";});
		var pass = true;
		for ( var i = 0; i < div.get().length; i++ ) {
			if ( div.get(i).foo != "zoo" ) {
				pass = false;
			}
		}
		ok( pass, "Execute a function, Relative" );

		var i, label, seen, callback;

		seen = {};
		hata.each( [ 3, 4, 5 ], function( v, k ) {
			seen[ k ] = v;
		});
		deepEqual( seen, { "0": 3, "1": 4, "2": 5 }, "Array iteration" );

		seen = {};
		hata.each( { name: "name", lang: "lang" }, function( v, k ) {
			seen[ k ] = v;
		});
		deepEqual( seen, { name: "name", lang: "lang" }, "Object iteration" );

		seen = [];
		hata.each( [ 1, 2, 3 ], function( v, k ) {
			seen.push( v );
			if ( k === 1 ) {
				return false;
			}
		});
		deepEqual( seen, [ 1, 2 ] , "Broken array iteration" );

		seen = [];
		hata.each( {"a": 1, "b": 2,"c": 3 }, function( v, k ) {
			seen.push( v );
			return false;
		});
		deepEqual( seen, [ 1 ], "Broken object iteration" );

		seen = {
			"undefined": undefined,
			"null": null,
			"false": false,
			"true": true,
			"empty string": "",
			"nonempty string": "string",
			"string \"0\"": "0",
			"negative": -1,
			"excess": 1
		};
		callback = function( v, k ) {
			equal( k, "length", "Object with " + label + " length treated like object" );
		};
		for ( i in seen ) {
			label = i;
			hata.each( { length: seen[ i ] }, callback );
		}
	});

	test("hata.noConflict", function() {
		expect(1);

		ok(hata === hata.noConflict(),
			"noConflict returned the hata object");
	});

};
