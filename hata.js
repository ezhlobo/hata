(function( window, undefined ) {

	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		// Hata wrapper
		Hata = function( selector ) {
			this.items = Hata.getBySelector( selector, document );

			return this;
		};

	// Convert something into an array
	Hata.nodesToArray = function( obj ) {
		return [].slice.call( obj );
	};

	// Get array of elements by selector
	Hata.getBySelector = function( selector ) {
		return selector ? Hata.nodesToArray( Hata.getBySelector_string( selector ) ) : [];
	};

	// Get NodeList of nodes by string selector
	Hata.getBySelector_string = function( selector ) {
		return document.querySelectorAll( selector );
	};

	// Link Hata.fn to prototype of Hata
	Hata.fn = Hata.prototype = {};

	window.Hata = Hata;

})( window );
