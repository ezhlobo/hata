(function( window, document, undefined ) {

	var
		// Save the previous value of the Hata variable
		_Hata = Hata,

		// Establish the object that gets returned to break out of a loop iteration
		breaker = {},

		each = function( obj, iterator ) {
			if ( Array.isArray( obj ) ) {
				var i = 0,
					l = obj.length;

				for ( ; i < l; i++ ) {
					if ( iterator.call( obj[ i ], obj[ i ], i ) === false ) break;
				}
			} else {
				var key;

				for ( key in obj ) {
					if ( iterator.call( obj[ key ], obj[ key ], key ) === false ) break;
				}
			}
		},

		// Types of standard selectors
		regExp = {
			Tag: /^[-_a-z0-9]+$/i,
			Class: /^\.[-_a-z0-9]+$/i,
			Id: /^#[-_a-z0-9]+$/i
		},

		includeUnique = function( array, element ) {
			if ( !( array.indexOf( element ) !== -1 ) ) {
				array.push( element );
			}

			return array;
		},

		makeArray = function( obj ) {
			return Array.prototype.slice.call( obj );
		},

		// State of document ready
		isDomReady = false,

		// Array of callbacks that are invoked when the document is ready
		onDomReady = [],

		// Invoked when the document is ready
		readyCallback = function() {
			if ( !isDomReady ) {
				isDomReady = true;

				each( onDomReady, function( value, i ) {
					onDomReady[ i ]();
				});

				onDomReady = [];
			}
		};

	document.addEventListener( "DOMContentLoaded", readyCallback, false );
	window.addEventListener( "load", readyCallback, false );

	var Hata = function( selector, context ) {
		if ( !( this instanceof Hata )  ) {
			return new Hata( selector, context );
		}

		// Handle with context
		if ( context !== undefined ) {
			return new Hata( context || document ).find( selector );
		}

		// HANDLE: hata(""), hata(null), hata(undefined), hata(false)
		if ( !selector ) {
			this.elems = [];

			return this;
		}

		// HANDLE: hata(hata(selector))
		if ( selector instanceof Hata ) {
			return selector;
		}

		var elems =
			// HANDLE: hata(String)
			selector === "body" ? [ document.body ] :
			typeof selector === "string" ? Hata._query( document, selector ) :

			// HANDLE: hata(DOMElement)
			selector === window || selector.nodeType ? [ selector ] :

			makeArray( selector );

		if ( elems.length === 1 && elems[ 0 ] == null ) {
			elems.length = 0;
		}

		this.elems = elems;

		return this;
	};

	Hata.extend = function( obj ) {
		each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
			each( source, function( value, prop ) {
				obj[ prop ] = value;
			});
		});

		return obj;
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

		fn: Hata.prototype,

		each: each,

		_query: function( context, selector ) {
			if ( regExp.Id.test( selector ) ) {
				return [( context.getElementById ? context : document ).getElementById( selector.substr( 1 ) )];
			}

			if ( regExp.Class.test( selector ) ) {
				return makeArray( context.getElementsByClassName( selector.substr( 1 ) ) );
			}

			if ( regExp.Tag.test( selector ) ) {
				return makeArray( context.getElementsByTagName( selector ) );
			}

			return makeArray( context.querySelectorAll( selector ) );
		},

		_find: function( context, selector ) {
			if ( !selector ) {
				return context == null ? [] : [ context ];
			}

			var result =
				selector.nodeName ? [ selector ] :
				typeof selector === "string" ? Hata._query( context, selector ) :
				[ context ];

			return (result.length === 1 && result[ 0 ] == null) ? [] : result;
		}
	});

	Hata.extend( Hata.fn, {
		get: function( index ) {
			var elements = this.elems;

			if ( index !== undefined ) {
				return elements[ index < 0 ? elements.length + index : index ];
			}

			return elements;
		},

		eq: function( index ) {
			return new Hata( this.get( index ) );
		},

		is: function( selector ) {
			return this.filter( selector ).get().length > 0;
		},

		each: function( iterator ) {
			each( this.get(), iterator );

			return this;
		},

		find: function( selector ) {
			var result = [];

			this.each(function( element ) {
				var i = 0,
					l = found.length,
					found = Hata._find( element, selector );

				while ( i < l ) {
					includeUnique( result, found[ i++ ]);
				}
			});

			return new Hata( result );
		},

		closest: function( selector ) {
			var parent,
				closest = [],
				elements = new Hata( selector ).get();

			this.each(function( element ) {
				parent = element;

				while ( parent !== document && elements.indexOf( parent ) < 0 ) {
					parent = parent.parentNode;
				}

				if ( parent !== document || selector === document ) {
					includeUnique( closest, parent );
				}
			});

			return new Hata( closest );
		},

		parents: function( selector ) {
			var parent,
				parents = [],
				elements = new Hata( selector ).get();

			this.each(function( element ) {
				parent = element.parentNode;

				while ( parent !== document ) {
					if ( elements.indexOf( parent ) !== -1 ) {
						includeUnique( parents, parent );
					}

					parent = parent.parentNode;
				}
			});

			return new Hata( parents );
		},

		filter: function( selector ) {
			var elements = new Hata( selector ),
				result = [];

			this.each(function( element ) {
				if ( elements.get().indexOf( element ) !== -1 ) {
					includeUnique( result, element );
				}
			});

			return new Hata( result );
		}
	});

	window.hata = Hata;

}( window, window.document ));
