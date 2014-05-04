new function () {

	module( 'Modules' );

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

		deepEqual(
			new Hata(window).items, [window],
			'new Hata( window )');

		deepEqual(
			new Hata(document).items, [document],
			'new Hata( document )');

		deepEqual(
			new Hata(document.querySelectorAll( "p" )).items, [document.querySelectorAll( "p" )],
			'new Hata( document.querySelectorAll( "p" ) )');

		deepEqual(
			new Hata(document.getElementsByTagName( "p" )).items, [document.getElementsByTagName( "p" )],
			'new Hata( document.getElementsByTagName( "p" ) )');

		deepEqual(
			new Hata(document.getElementById( ID )).items, [document.getElementById( ID )],
			'new Hata( document.getElementById( ID ) )');

		deepEqual(
			new Hata(new Hata('a')).items, ja('a'),
			'new Hata( new Hata( "a" ) )');

		deepEqual(
			hata().items, [],
			'hata() alias for new Hata');

	});

};
