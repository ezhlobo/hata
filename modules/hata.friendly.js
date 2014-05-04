(function( window, Hata ) {

	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		// Regexp for types of selector
		selectorValue = '[-_a-z0-9]+';
		selectorTypes = {
			Tag: new RegExp('^' + selectorValue + '$', 'i'),
			Class: new RegExp('^\.' + selectorValue + '$', 'i'),
			Id: new RegExp('^#' + selectorValue + '$', 'i')
		};

	Hata.getBySelector_string = function( selector, context ) {
		var elems =

			selectorTypes.Id.test( selector ) ?
				[ context.getElementById( selector.substr( 1 ) ) ] :

			selectorTypes.Class.test( selector ) ?
				context.getElementsByClassName( selector.substr( 1 ) ) :

			selectorTypes.Tag.test( selector ) ?
				context.getElementsByTagName( selector ) :

				context.querySelectorAll( selector );

		return elems;
	};

	Hata.getBySelector = function( selector, context ) {
		var elems =

			// HANDLE: hata('')
			!selector ?
				[] :

			// HANDLE: hata(String)
			selector === 'body' ?
				[ document.body ] :

			typeof selector === 'string' ?
				Hata.nodesToArray( Hata.getBySelector_string( selector, context ) ) :

			// HANDLE: hata(DOMElement)
			selector === window || selector.nodeType ?
				[ selector ] :

				Hata.nodesToArray( selector );

		return elems;
	};

	window.hata = function( selector ) {
		return ( selector instanceof Hata ) ? selector : new Hata( selector );
	};

})( window, Hata );
