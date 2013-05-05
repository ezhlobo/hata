(function( window, undefined ) {

	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		// Is a given value an array?
		isArray = Array.isArray,

		// Add an element to the array if it is unique
		pushUnique = function( array, element ) {
			if ( array.indexOf( element ) === -1 ) {
				array.push( element );
			}

			return array;
		},

		// Convert something into an array
		toArray = function( obj ) {
			if ( !obj ) return [];
			if ( /number|string/.test( typeof obj ) ) return [ obj ];
			return [].slice.call( obj );
		},

		isDomReady = false,
		onDomReady = [],
		domReadyCallback = function () {
			if ( isDomReady ) return;

			isDomReady = true;

			var i = 0,
				l = onDomReady.length;

			for ( ; i < l; i++ ) {
				onDomReady[ i ]();
			}

			onDomReady = [];
		},

		// Types of selectors
		selectorType = {
			Tag: /^[-_a-z0-9]+$/i,
			Class: /^\.[-_a-z0-9]+$/i,
			Id: /^#[-_a-z0-9]+$/i
		},

		// Return an array of nodes from the 'context' in
		// accordance with the 'selector'
		getElements_query = function( context, selector ) {
			if ( selectorType.Id.test( selector ) && context.getElementById ) {
				return [ context.getElementById( selector.substr( 1 ) ) ];
			}

			if ( selectorType.Class.test( selector ) ) {
				return toArray( context.getElementsByClassName( selector.substr( 1 ) ) );
			}

			if ( selectorType.Tag.test( selector ) ) {
				return toArray( context.getElementsByTagName( selector ) );
			}

			return toArray( context.querySelectorAll( selector ) );
		},

		// Return an array of found nodes from the 'context' in
		// accordance with the 'selector'
		getElements_find = function( context, selector ) {
			if ( !selector ) {
				return ( context == null ) ? [] : [ context ];
			}

			var result =
				selector.nodeName ? [ selector ] :
				typeof selector === "string" ? getElements_query( context, selector ) :
				[ context ];

			return ( result.length === 1 && result[ 0 ] == null ) ? [] : result;
		};

	var Hata = function( selector, context ) {
		if ( !( this instanceof Hata )  ) {
			return new Hata( selector, context );
		}

		// HANDLE: hata(hata(selector))
		if ( selector instanceof Hata ) {
			return selector;
		}

		// HANDLE: hata(""), hata(null), hata(undefined), hata(false)
		if ( !selector ) {
			this.elems = [];
			this.length = 0;

			return this;
		}

		// HANDLE with context
		if ( context !== undefined ) {
			return new Hata( context || document ).find( selector );
		}

		var elems =
			// HANDLE: hata(String)
			selector === "body" ? [ document.body ] :
			typeof selector === "string" ? getElements_query( document, selector ) :

			// HANDLE: hata(DOMElement)
			selector === window || selector.nodeType ? [ selector ] :

			toArray( selector );

		if ( elems.length === 1 && elems[ 0 ] == null ) {
			elems.length = 0;
		}

		this.elems = elems;
		this.length = this.elems.length;

		return this;
	};

	// The cornerstone an each implementation
	Hata.each = function( obj, iterator ) {
		var i = 0,
			l = obj.length;

		if ( isArray( obj ) || obj.toString() == "[object NodeList]" ) {
			for ( ; i < l; i++ ) {
				if ( iterator.call( obj[ i ], obj[ i ], i ) === false ) break;
			}
		} else {
			for ( i in obj ) {
				if ( iterator.call( obj[ i ], obj[ i ], i ) === false ) break;
			}
		}
	};

	// Extend a given object with all the properties in passed-in object(s)
	Hata.extend = function( obj ) {
		Hata.each( [].slice.call( arguments, 1 ), function( source ) {
			Hata.each( source, function( value, prop ) {
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

		pushUniq: pushUnique,

		toArray: toArray,

		// Copy of class prototype
		fn: Hata.prototype
	});

	Hata.extend( Hata.fn, {
		// Return the Nth node in the hata object OR clean array
		get: function( num ) {
			var elems = this.elems;

			return num == null ? elems :
				num < 0 ? elems[ this.length + num ] : elems[ num ];
		},

		// Return the Nth element
		eq: function( num ) {
			return new Hata( this.get( num ) );
		},

		// Return the element found in the context in accordance with the 'selector'
		find: function( selector ) {
			var result = [];

			this.each(function( elem ) {
				var i = 0,
					found = getElements_find( elem, selector ),
					l = found.length;

				while ( i < l ) {
					pushUnique( result, found[ i++ ]);
				}
			});

			return new Hata( result );
		},

		// Return 'this' or closest parent which satisfies the 'selector'
		closest: function( selector ) {
			var parent,
				closest = [],
				elems = new Hata( selector ).get();

			this.each(function( elem ) {
				parent = elem;

				while ( parent !== document && elems.indexOf( parent ) === -1 ) {
					parent = parent.parentNode;
				}

				if ( parent !== document ) {
					pushUnique( closest, parent );
				}
			});

			return new Hata( closest );
		},

		// Return parent
		parent: function() {
			var parents = [];

			this.each(function( elem ) {
				pushUnique( parents, elem.parentNode );
			});

			return new Hata( parents );
		},

		// Return parent which satisfies the 'selector'
		parents: function( selector ) {
			var parent,
				parents = [],
				elems = new Hata( selector ).get();

			this.each(function( elem ) {
				parent = elem.parentNode;

				while ( parent !== document ) {
					if ( elems.indexOf( parent ) !== -1 ) {
						pushUnique( parents, parent );
					}

					parent = parent.parentNode;
				}
			});

			return new Hata( parents );
		},

		// Return element which satisfies the 'selector'
		filter: function( selector ) {
			var elems = new Hata( selector ),
				result = [];

			this.each(function( elem ) {
				if ( elems.get().indexOf( elem ) !== -1 ) {
					pushUnique( result, elem );
				}
			});

			return new Hata( result );
		},

		// Is element satisfies the 'selector'?
		is: function( selector ) {
			return this.filter( selector ).length > 0;
		},

		// Invoke a 'iterator' on every item in a collection
		each: function( iterator ) {
			Hata.each( this.get(), iterator );

			return this;
		}
	});

	document.addEventListener( "DOMContentLoaded", domReadyCallback, false );
	window.addEventListener( "load", domReadyCallback, false );

	window.hata = Hata;

}( window ));
