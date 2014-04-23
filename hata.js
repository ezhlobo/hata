(function( window, undefined ) {

	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		// Hata wrapper
		Hata = function( selector ) {
			this.items = Hata.getBySelector( selector );

			return this;
		};

	// Convert something into an array
	Hata.nodesToArray = function( obj ) {
		return obj ? [].slice.call( obj ) : [];
	};

	// Get array of elements by selector
	Hata.getBySelector = function( selector ) {
		return Hata.nodesToArray( document.querySelectorAll( selector ) );
	};

	// Link Hata.fn to prototype of Hata
	Hata.fn = Hata.prototype = {};

	window.Hata = Hata;

})( window );
