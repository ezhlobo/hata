new function () {

	module( "Selectors" );

	test( "Standart", function() {
		deepEqual(
			ha(), ja(),
			"hata() return empty hata object");

		deepEqual(
			ha( "" ), ja( "" ),
			"hata( '' ) return empty hata object");

		deepEqual(
			ha( false ), ja( false ),
			"hata( false ) return empty hata object");

		// Not like jQuery
		deepEqual(
			ha( true ), [],
			"hata( true ) return empty hata object");

		deepEqual(
			ha( null ), ja( null ),
			"hata( null ) return empty hata object");

		deepEqual(
			ha( undefined ), ja( undefined ),
			"hata( undefined ) return empty hata object");

		deepEqual(
			ha( window ), ja( window ),
			"hata( window )");

		deepEqual(
			ha( document ), ja( document ),
			"hata( document )");

		deepEqual(
			ha( "body" ), ja( "body" ),
			"hata( 'body' )");

		deepEqual(
			ha( "#" + ID ), ja( "#" + ID ),
			"hata( '#ID' )");

		deepEqual(
			ha( "#" + ID + ", #" + ID + "-h1" ), ja( "#" + ID + ", #" + ID + "-h1" ),
			"hata( '#ID, #ID2' )");

		deepEqual(
			ha( ".foo" ), ja( ".foo" ),
			"hata( '.class' )");

		deepEqual(
			ha( ".foo, .bar" ), ja( ".foo, .bar" ),
			"hata( '.class, .class' )");

		deepEqual(
			ha( ".foo.foo-class" ), ja( ".foo.foo-class" ),
			"hata( '.class.class' )");

		deepEqual(
			ha( "*" ), ja( "*" ),
			"hata( '*' )");

		deepEqual(
			ha( "[title*=\"es\"]" ), ja( "[title*=\"es\"]" ),
			"hata( '[attr*=\"value\"]' )");

		deepEqual(
			ha( "a" ), ja( "a" ),
			"hata( 'tag' )");

		deepEqual(
			ha( "asd" ), ja( "asd" ),
			"hata( 'unknown' ) return empty hata object");

		deepEqual(
			ha( document.querySelectorAll( "p" ) ), ja( document.querySelectorAll( "p" ) ),
			"hata( document.querySelectorAll( 'tag' ) )");

		deepEqual(
			ha( document.getElementsByTagName( "p" ) ), ja( document.getElementsByTagName( "p" ) ),
			"hata( document.getElementsByTagName( 'p' ) )");

		deepEqual(
			ha( document.getElementById( ID ) ), ja( document.getElementById( ID ) ),
			"hata( document.getElementById( 'ID' ) )");

		deepEqual(
			ha( hata( "a" ) ), ja( "a" ),
			"hata( hata( 'tag' ) )");
	});

	test( "With context", function() {
		deepEqual(
			ha( "#" + ID + "-h1", "#" + ID ), ja( "#" + ID + "-h1", "#" + ID ),
			"hata( '#ID2', '#ID1' ) [Node #ID2 inside #ID1]");

		console.log(ha( "#" + ID));
		console.log(ha("#" + ID + "-h1" ));

		deepEqual(
			ha( "#" + ID, "#" + ID + "-h1" ), ja( "#" + ID, "#" + ID + "-h1" ),
			"hata( '#ID1', '#ID2' ) [Node #ID2 inside #ID1] return empty hata object");

		deepEqual(
			ha( "#" + ID + "-h1", hata( "#" + ID ) ), ja( "#" + ID + "-h1", "#" + ID ),
			"hata( '#ID2', hata( '#ID1' ) ) [Node #ID2 inside #ID1]");

		deepEqual(
			ha( "#" + ID, hata( "#" + ID + "-h1" ) ), ja( "#" + ID, "#" + ID + "-h1" ),
			"hata( '#ID1', hata( '#ID2' ) ) [Node #ID2 inside #ID1] return empty hata object");

		deepEqual(
			ha( "a", "p" ), ja( "a", "p" ),
			"hata( 'tag', 'tag' )");
	});

};
