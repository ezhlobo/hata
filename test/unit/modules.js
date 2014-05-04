new function () {

	module( 'Modules' );

	test( 'Friendly selectors', function() {

		deepEqual(
			hata('').items, [],
			'hata( "" ) returns empty hata object');

		deepEqual(
			hata(false).items, [],
			'hata( false ) returns empty hata object');

		deepEqual(
			hata(true).items, [],
			'hata( true ) returns empty hata object');

		deepEqual(
			hata(null).items, [],
			'hata( null ) returns empty hata object');

		deepEqual(
			hata(undefined).items, [],
			'hata( undefined ) returns empty hata object');

		deepEqual(
			hata(window).items, [window],
			'hata( window )');

		deepEqual(
			hata(document).items, [document],
			'hata( document )');

		deepEqual(
			hata(document.querySelectorAll( "p" )).items, [].slice.call(document.querySelectorAll( "p" )),
			'hata( document.querySelectorAll( "p" ) )');

		deepEqual(
			hata(document.getElementsByTagName( "p" )).items, [].slice.call(document.getElementsByTagName( "p" )),
			'hata( document.getElementsByTagName( "p" ) )');

		deepEqual(
			hata(document.getElementById( ID )).items, [document.getElementById( ID )],
			'hata( document.getElementById( ID ) )');

		deepEqual(
			hata( hata('a') ).items, [].slice.call(document.querySelectorAll( "a" )),
			'hata( hata( "a" ) )');

		deepEqual(
			hata( new Hata('a') ).items, [].slice.call(document.querySelectorAll( "a" )),
			'hata( new Hata( "a" ) )');

	});

};
