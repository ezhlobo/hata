new function () {

	module( 'Selectors' );

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

};
