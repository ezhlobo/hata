new function () {

	module("Traversing");

	test( ".eq()", function() {
		deepEqual(
			hata( "#" + ID ).eq( 0 ).get(), jQuery( "#" + ID ).eq( 0 ).toArray(),
			"hataObj.eq( 0 ) return hata object of hataObj first node");

		deepEqual(
			hata( "#" + ID ).eq( -1 ).get(), jQuery( "#" + ID ).eq( -1 ).toArray(),
			"hataObj.eq( -1 ) return hata object of hataObj last node");

		// Not like jQuery
		deepEqual(
			hata( "#" + ID ).eq().get(), ja( "#" + ID ),
			"hataObj.eq() return hataObj");

		deepEqual(
			hata( "#" + ID ).eq( 1000 ).get(), jQuery( "#" + ID ).eq( 1000 ).toArray(),
			"hataObj.eq( 1000 ) return hata object by not exist index");

		deepEqual(
			hata().eq().length, jQuery().eq().length,
			"hata().eq() return empty array");

		deepEqual(
			hata( "#" + ID ).eq( "0" ).get(), jQuery( "#" + ID ).eq( 0 ).toArray(),
			"hataObj.eq( '0' )");
	});

	test( ".is()", function() {
		ok(
			typeof hata().is() === "boolean",
			"return right type")

		ok(
			hata( "#" + ID ).is("div") === true,
			"hata( '#ID' ).is( 'tag' ) return true");

		ok(
			hata( "#" + ID ).is( document.getElementById( ID ) ) === true,
			"hata( '#ID' ).is( document.getElementById( 'ID' ) ) return true");

		ok(
			hata( "#" + ID ).is( document.querySelectorAll( "div" ) ) === true,
			"hata( '#ID' ).is( document.querySelectorAll( 'div' ) ) return true");

		ok(
			hata( "div" ).is( document.getElementById( ID ) ) === true,
			"hata( 'tag' ).is( document.getElementById( 'ID' ) ) return true");
	});

	test( ".each()", function() {
		ok(
			hata().each() instanceof hata,
			"hata().each() return hata object");

		var nodes = document.querySelectorAll( "p" ),
			outElems = [],
			outIndex = 0;

		hata( nodes ).each(function( elem, index ) {
			outElems.push( elem );
			outIndex = index;
		});

		deepEqual(
			outElems, [].slice.call( nodes ),
			"iterators has right first argument");

		ok(
			outIndex == --nodes.length,
			"iterators has right second arguments");

		hata( nodes ).each(function( elem, index ) {
			if ( index == nodes.length - 2 ) {
				return false;
			}
			outIndex = index;
		});

		ok(
			outIndex == nodes.length - 3,
			"correct break iterations");
	});

	test( ".find()", function() {
		var nodes = document.querySelectorAll( "p" );

		deepEqual(
			hata( document ).find( "p" ).get(), ja( nodes ),
			"hata( document ).find( 'p' )");

		deepEqual(
			hata( document ).find( "asd" ).get(), [],
			"hata( document ).find( 'unknown' ) return empty hata object");

		deepEqual(
			hata( "#" + ID ).find( "body" ).get(), [],
			"hata( '#ID' ).find( 'body' ) return empty hata object");

		deepEqual(
			hata( "#" + ID + "-h1" ).find( "#" + ID ).get(), [],
			"hata( '#ID2' ).find( '#ID1' ) [Node #ID2 inside #ID1] return empty hata object");
	});

	test( ".closest()", function() {
		deepEqual(
			hata( "p" ).closest( "body" ).get(), ja( "body" ),
			"hata( 'p' ).closest( 'body' )");

		deepEqual(
			hata( "body" ).closest( "body" ).get(), ja( "body" ),
			"hata( 'body' ).closest( 'body' )");

		deepEqual(
			hata( "p" ).closest( "div" ).get(), jQuery( "p" ).closest( "div" ).toArray(),
			"hata( 'p' ).closest( 'div' )");

		deepEqual(
			hata( "body" ).closest( "p" ).get(), [],
			"hata( 'body' ).closest( 'p' ) return empty hata object");

		deepEqual(
			hata( "p" ).closest( document ).get(), [],
			"hata( 'p' ).closest( document ) return empty hata object");
	});

	test( ".parent()", function() {
		equal(
			hata( "#" + ID + "-h1" ).parent().get( 0 ).id, ID,
			"Simple parent check");

		ok(
			isSimilarArrays( hata( "#" + ID + " a" ).parent().get(), jQuery( "#" + ID + " a" ).parent().toArray() ),
			"Check for results from parent");

		deepEqual(
			hata( "#" + ID + " p" ).parent().get(), ja( "#" + ID ),
			"Check for unique results from parent");
	});

	test( ".parents()", function() {
		deepEqual(
			hata( "#" + ID ).parents( "body" ).get(), ja( "body" ),
			"hata( '#ID' ).parents( 'body' )");

		ok(
			isSimilarArrays( hata( "a" ).parents( "p" ).get(), jQuery( "a" ).parents( "p" ).toArray() ),
			"hata( 'a' ).parents( 'p' )");

		deepEqual(
			hata( "body" ).parents( "body" ).get(), [],
			"hata( 'body' ).parents( 'body' ) return empty hata object");

		deepEqual(
			hata( "p" ).parents( "div" ).get(), jQuery( "p" ).parents( "div" ).toArray(),
			"hata( 'p' ).parents( 'div' )");

		deepEqual(
			hata( "body" ).parents( "p" ).get(), [],
			"hata( 'body' ).parents( 'p' ) return empty hata object");

		deepEqual(
			hata( "p" ).parents( document ).get(), [],
			"hata( 'p' ).parents( document ) return empty hata object");
	});

	test( ".filter()", function() {
		deepEqual(
			hata( "a" ).filter( ".foo" ).get(), ja( ".foo" ),
			"hata( 'a' ).filter( '.foo' )");

		deepEqual(
			hata( "a" ).filter( "p" ).get(), [],
			"hata( 'a' ).filter( 'p' ) return empty hata object");

		deepEqual(
			hata( "a" ).filter( "[title]" ).get(), ja( "a[title]" ),
			"hata( 'a' ).filter( '[title]' )");
	});

};
