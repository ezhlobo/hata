new function () {

	module("Miscellaneous");

	test( ".get()", function() {
		deepEqual(
			hata( "a" ).get( 0 ), jQuery( "a" ).get( 0 ),
			"hataObj.get( 0 ) return first node");

		deepEqual(
			hata( "a" ).get( -1 ), jQuery( "a" ).get( -1 ),
			"hataObj.get( -1 ) return last node");

		deepEqual(
			ha( "#" + ID ), ja( "#" + ID ),
			"hataObj.get() return array of all nodes");

		deepEqual(
			hata( "#" + ID ).get( 1000 ), jQuery( "#" + ID ).get( 1000 ),
			"hataObj.get( 1000 ) return node by not exist index");

		deepEqual(
			hata( "#" + ID ).get( "0" ), jQuery( "#" + ID ).get( 0 ),
			"hataObj.get( '0' )");

		deepEqual(
			ha(), ja(),
			"hata().get() return empty array");
	});

	test( ".length", function() {
		equal(
			hata().length, jQuery().length,
			"hata().length");

		equal(
			hata( "p" ).length, jQuery( "p" ).length,
			"hata( 'tag' ).length");

		equal(
			hata( "asd" ).length, jQuery( "asd" ).length,
			"hata( 'unknown' ).length");

		equal(
			hata( document.querySelectorAll( "p" ) ).length, jQuery( document.querySelectorAll( "p" ) ).length,
			"hata( document.querySelectorAll( 'tag' ) ).length");

		equal(
			hata( document.getElementsByTagName( "p" ) ).length, jQuery( document.getElementsByTagName( "p" ) ).length,
			"hata( document.getElementsByTagName( 'p' ) ).length");

		equal(
			hata( hata( "a" ) ).length, jQuery( "a" ).length,
			"hata( hata( 'tag' ) ).length");
	});

};
