new function () {

	module("Utilities");

	test( "hata.extend( [Function] )", function() {
		var fn = function() {};

		hata.extend( fn, {
			get getter() { return "ok" },
			property: "ok",
			method: function() { return "ok" }
		});

		ok(
			fn.getter === "ok",
			"Getter");

		ok(
			fn.property === "ok",
			"Property");

		ok(
			fn.method() === "ok",
			"Method");
	});

	test( "hata.extend( [Object] )", function() {
		var obj = {};

		hata.extend( obj, {
			get getter() { return "ok" },
			property: "ok",
			method: function() { return "ok" }
		});

		ok(
			obj.getter === "ok",
			"Getter");

		ok(
			obj.property === "ok",
			"Property");

		ok(
			obj.method() === "ok",
			"Method");

		obj = {
			item: "bad",
		};

		inject = {
			item: "ok",
		};

		var result = hata.extend({}, obj, inject );

		ok(
			result.item === "ok",
			"Return first extended object");
	});

	test( "hata.each", function() {
		var div = hata( "div" );
		div.each(function(){ this.foo = "zoo" });
		var pass = true;
		for ( var i = 0; i < div.get().length; i++ ) {
			if ( div.get( i ).foo != "zoo" ) {
				pass = false;
			}
		}

		ok(
			pass,
			"Execute a function, Relative");

		var i, label, seen, callback;

		seen = {};
		hata.each([ 3, 4, 5 ], function( v, k ) {
			seen[ k ] = v;
		});

		deepEqual(
			seen, { "0": 3, "1": 4, "2": 5 },
			"Array iteration");

		seen = {};
		hata.each({ name: "name", lang: "lang" }, function( v, k ) {
			seen[ k ] = v;
		});

		deepEqual(
			seen, { name: "name", lang: "lang" },
			"Object iteration");

		seen = [];
		hata.each( [ 1, 2, 3 ], function( v, k ) {
			seen.push( v );
			if ( k === 1 ) {
				return false;
			}
		});

		deepEqual(
			seen, [ 1, 2 ],
			"Broken array iteration");

		seen = [];

		hata.each({ "a": 1, "b": 2,"c": 3 }, function( v, k ) {
			seen.push( v );
			return false;
		});

		deepEqual(
			seen, [ 1 ],
			"Broken object iteration");

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
			equal(
				k, "length",
				"Object with " + label + " length treated like object");
		};
		for ( i in seen ) {
			label = i;
			hata.each({
				length: seen[ i ]
			}, callback );
		}


		var nodeList = document.querySelectorAll( "p" ), num = 0;
		hata.each( nodeList, function() {
			num++;
		});

		ok(
			nodeList.length === num,
			"Correct nodeList iteration");
	});

	test( "hata.fn", function() {
		deepEqual(
			hata.fn, hata.prototype,
			"Hata.fn has hata.prototype's properties");

		hata.fn.test = "ok";

		ok(
			hata().test === "ok",
			"Hata.fn behaves as a hata.prototype");

		delete hata.fn.test;
	});

	test( "hata.toArray", function() {
    ok(
    	Array.isArray( hata.toArray( arguments ) ),
    	"Arguments object converted into array");

    deepEqual(
    	hata.toArray(), [],
    	"Clean array if arguments are absent");

    var a = [1,2,3];
    ok(
    	hata.toArray( a ) !== a,
    	"Array is cloned");
    equal(
    	hata.toArray( a ).join(", "), "1, 2, 3",
    	"Cloned array contains same elements");

    equal(
    	hata.toArray( 10 )[0], 10,
    	"Convert number to array with one item");

    equal(
    	hata.toArray( "asd" )[0], "asd",
    	"Convert string to array with one item");

    var nodes = document.querySelectorAll( "p" ),
    	cleanNodes = hata.toArray( nodes ),
    	is = true;

    hata.each( nodes, function( item, key ) {
    	if ( cleanNodes.indexOf( item ) === -1 ) {
    		return is = false;
    	}
    });

    ok(
    	is,
    	"Correct convert NodeList to array");
	});

	test( "hata.pushUniq", function() {
		var arr = [],
			i = 0;

		function go( items ) {
			arr = [];
			i = 0;

			for ( ; i < items.length; i++ ) {
				hata.pushUniq( arr, items[ i ] );
			}
		}

		go([0, 1, 0]);
		ok( arr.length == 2, "Number");

		go(["a", "b", "a"]);
		ok( arr.length == 2, "String");

		go([true, false, true, false]);
		ok( arr.length == 2, "Boolean");

		go([ null, undefined, null, undefined ]);
		ok( arr.length == 2, "Null, Undefined");
	});

};
