new function () {

	module( "Selectors" );

	test( 'Standart', function() {

		deepEqual(
			new Hata().items, [],
			'new Hata() returns empty hata object');

		deepEqual(
			new Hata('body').items, [document.body],
			'new Hata( "body" )');

		deepEqual(
			new Hata('#' + ID).items, ja('#' + ID),
			'new Hata( "#'+ID+'" )');

		deepEqual(
			new Hata('#' + ID + ', #' + ID + '-h1').items, ja('#' + ID + ', #' + ID + '-h1'),
			'new Hata( "#'+ID+', #'+ID+'-h1" )');

		deepEqual(
			new Hata('.foo').items, ja('.foo'),
			'new Hata( ".foo" )');

		deepEqual(
			new Hata('.foo, .bar').items, ja('.foo, .bar'),
			'new Hata( ".foo, .bar" )');

		ok(
			new Hata('.foo, .foo').items.length == 1,
			'new Hata( ".foo, .foo" ) returns hata object without doubles');

		deepEqual(
			new Hata('.foo.foo-class').items, ja('.foo.foo-class'),
			'new Hata( ".foo.foo-class" )');

		deepEqual(
			new Hata('*').items, ja('*'),
			'new Hata( "*" )');

		deepEqual(
			new Hata('[title*="es"]').items, ja('[title*="es"]'),
			'new Hata( "[title*=\"value\"]" )');

		deepEqual(
			new Hata('a').items, ja('a'),
			'new Hata( "a" )');

		deepEqual(
			new Hata('notexistedselector').items, ja('notexistedselector'),
			'new Hata( "notexistedselector" )');

	});

	test( 'Friendly selectors', function() {

		deepEqual(
			new Hata('').items, [],
			'new Hata( "" ) returns empty hata object');

		deepEqual(
			new Hata(false).items, [],
			'new Hata( false ) returns empty hata object');

		deepEqual(
			new Hata(true).items, [],
			'new Hata( true ) returns empty hata object');

		deepEqual(
			new Hata(null).items, [],
			'new Hata( null ) returns empty hata object');

		deepEqual(
			new Hata(undefined).items, [],
			'new Hata( undefined ) returns empty hata object');

		// deepEqual(
		// 	new Hata(window).items, [window],
		// 	'new Hata( window )');

	});

	// test( "Standart", function() {
	// 	deepEqual(
	// 		ha(), ja(),
	// 		"hata() return empty hata object");

	// 	deepEqual(
	// 		ha( "" ), ja( "" ),
	// 		"hata( '' ) return empty hata object");

	// 	deepEqual(
	// 		ha( false ), ja( false ),
	// 		"hata( false ) return empty hata object");

	// 	// Not like jQuery
	// 	deepEqual(
	// 		ha( true ), [],
	// 		"hata( true ) return empty hata object");

	// 	deepEqual(
	// 		ha( null ), ja( null ),
	// 		"hata( null ) return empty hata object");

	// 	deepEqual(
	// 		ha( undefined ), ja( undefined ),
	// 		"hata( undefined ) return empty hata object");

	// 	deepEqual(
	// 		ha( window ), ja( window ),
	// 		"hata( window )");

	// 	deepEqual(
	// 		ha( document ), ja( document ),
	// 		"hata( document )");

	// 	deepEqual(
	// 		ha( "body" ), ja( "body" ),
	// 		"hata( 'body' )");

	// 	deepEqual(
	// 		ha( "#" + ID ), ja( "#" + ID ),
	// 		"hata( '#ID' )");

	// 	deepEqual(
	// 		ha( "#" + ID + ", #" + ID + "-h1" ), ja( "#" + ID + ", #" + ID + "-h1" ),
	// 		"hata( '#ID, #ID2' )");

	// 	deepEqual(
	// 		ha( ".foo" ), ja( ".foo" ),
	// 		"hata( '.class' )");

	// 	deepEqual(
	// 		ha( ".foo, .bar" ), ja( ".foo, .bar" ),
	// 		"hata( '.class, .class' )");

	// 	deepEqual(
	// 		ha( ".foo.foo-class" ), ja( ".foo.foo-class" ),
	// 		"hata( '.class.class' )");

	// 	deepEqual(
	// 		ha( "*" ), ja( "*" ),
	// 		"hata( '*' )");

	// 	deepEqual(
	// 		ha( "[title*=\"es\"]" ), ja( "[title*=\"es\"]" ),
	// 		"hata( '[attr*=\"value\"]' )");

	// 	deepEqual(
	// 		ha( "a" ), ja( "a" ),
	// 		"hata( 'tag' )");

	// 	deepEqual(
	// 		ha( "asd" ), ja( "asd" ),
	// 		"hata( 'unknown' ) return empty hata object");

	// 	deepEqual(
	// 		ha( document.querySelectorAll( "p" ) ), ja( document.querySelectorAll( "p" ) ),
	// 		"hata( document.querySelectorAll( 'tag' ) )");

	// 	deepEqual(
	// 		ha( document.getElementsByTagName( "p" ) ), ja( document.getElementsByTagName( "p" ) ),
	// 		"hata( document.getElementsByTagName( 'p' ) )");

	// 	deepEqual(
	// 		ha( document.getElementById( ID ) ), ja( document.getElementById( ID ) ),
	// 		"hata( document.getElementById( 'ID' ) )");

	// 	deepEqual(
	// 		ha( hata( "a" ) ), ja( "a" ),
	// 		"hata( hata( 'tag' ) )");
	// });

};
