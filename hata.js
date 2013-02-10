(function( window, document, undefined ) {

	var
		// Save the previous value of the Hata variable
		_Hata = Hata,

		// Establish the object that gets returned to break out of a loop iteration
		breaker = {},

		// State of document ready
		isDomReady = false,

		// Array of callbacks that are invoked when the document is ready
		onDomReady = [],

		// Invoked when the document is ready
		readyCallback = function() {
			if ( !isDomReady ) {
				isDomReady = true;

				for ( var i = 0, l = onDomReady.length; i < l; i++ ) {
					onDomReady[ i ]();
				}

				onDomReady = [];
			}
		},

		// Types of standard selectors
		regExp = {
			Tag: /^[-_a-z0-9]+$/i,
			Class: /^\.[-_a-z0-9]+$/i,
			Id: /^#[-_a-z0-9]+$/i
		},

		includeUnique = function( array, element ) {
			if ( !( array.indexOf( element ) >= 0 ) ) {
				array.push( element );
			}

			return array;
		},

		makeArray = function( obj ) {
			return Array.prototype.slice.call( obj );
		},

		Hata = function( selector, context ) {
			if ( !(this instanceof Hata) ) {
				return new Hata( selector, context );
			}

			// Handle with context
			if ( context !== undefined ) {
				return new Hata( context || document ).find( selector );
			}

			// HANDLE: hata(""), hata(null), hata(undefined), hata(false)
			if ( !selector ) {
				this.elems = [ document ];
				return this;
			}

			var elems =
				// Handle HTML string
				selector === "body" ? [ document.body ] :
				typeof selector === "string" ? Hata._query( document, selector ) :

				// HANDLE: hata(DOMElement)
				selector === window || selector.nodeType ? [ selector ] :

				// HANDLE: hata(hata(selector));
				selector instanceof Hata ? makeArray( selector.elems ) :

				makeArray( selector );

			if ( elems.length === 1 && elems[0] == null ) {
				elems.length = 0;
			}

			this.elems = elems;

			return this;
		};

	document.addEventListener("DOMContentLoaded", readyCallback, false);
	window.addEventListener("load", readyCallback, false);

	Hata.extend = function( target, source ) {
		if ( !source ) {
			source = target;
			target = Hata.prototype;
		}

		for ( var key in source ) {
			if ( hasOwnProperty.call( source, key ) ) {
				target[ key ] = source[ key ];
			}
		}

		return target;
	};

	Hata.extend( Hata, {
		ready: function( fn ) {
			if ( isDomReady ) {
				fn();
			} else {
				onDomReady.push( fn );
			}

			return this;
		},

		noConflict: function() {
			if ( window.hata === Hata ) {
				window.hata = _Hata;
			}

			return Hata;
		},

		_query: function( context, selector ) {
			if ( regExp.Id.test( selector ) ) {
				return [ context.getElementById(selector.substr(1)) ];
			}

			if ( regExp.Class.test( selector ) ) {
				return makeArray( context.getElementsByClassName(selector.substr(1)) );
			}

			if ( regExp.Tag.test( selector ) ) {
				return makeArray( context.getElementsByTagName(selector) );
			}

			return makeArray( context.querySelectorAll(selector) );
		},

		_find: function( context, selector ) {
			if ( !selector ) {
				return context == null ? [] : [ context ];
			}

			var result = selector.nodeName ? [ selector ]
				: typeof selector === "string" ? Hata._query( context, selector ) : [ context ];
			return (result.length === 1 && result[0] == null) ? [] : result;
		}
	});

	Hata.extend({
		get: function( index ) {
			var elems = this.elems;

			if ( index !== undefined ) {
				var n = index < 0 ? elems.length + index : index;
				return elems[ n ];
			}

			return elems;
		},

		eq: function( index ) {
			return new Hata( this.get(index) );
		},

		is: function( selector ) {
			return this.filter( selector ).get().length > 0;
		},

		each: function( iterator ) {
			this.get().forEach( iterator.bind(this) );
			return this;
		},

		find: function( selector ) {
			var result = [];

			this.each(function( elem ) {
				var i = 0,
					found = Hata._find( elem, selector ),
					l = found.length;

				while (i < l) {
					includeUnique( result, found[ i++ ]);
				}
			});

			return new Hata( result );
		},

		closest: function( selector ) {
			var parent,
				parents = [],
				elements = new Hata( selector ).get();

			this.each(function( elem ) {
				parent = elem;

				while ( parent !== document && elements.indexOf( parent ) < 0 ) {
					parent = parent.parentNode;
				}

				includeUnique( parents, parent );
			});

			return new Hata( parents );
		},

		filter: function( selector ) {
			var elements = new Hata( selector ),
				result = [];

			this.each(function( parent ) {
				if ( elements.get().indexOf( parent ) >= 0 ) {
					includeUnique( result, parent );
				}
			});

			return new Hata( result );
		}
	});

	window.hata = Hata;

}( window, window.document ));
