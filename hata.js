(function( window, document, undefined ) {

	var
		// Save the previous value of the Hata variable.
		_Hata = Hata,

		// Establish the object that gets returned to break out of a loop iteration.
		breaker = {},

		// Types of standard selectors
		regExp = {
			Tag  : /^[-_a-z0-9]+$/i,
			Class: /^\.[-_a-z0-9]+$/i,
			Id   : /^#[-_a-z0-9]+$/i
		},

		includeUnique = function( array, element ) {
			if ( !( array.indexOf( element ) >= 0 ) ) {
				array[array.length] = element;
			}

			return array;
		},

		makeArray = function( obj ) {
			return Array.prototype.slice.call( obj );
		},

		Hata = function( sel, context ) {
			if ( !( this instanceof Hata ) ) {
				return new Hata( sel, context );
			}

			// Handle with context
			if ( context !== undefined ) {
				return new Hata( context || document ).find( sel );
			}

			// HANDLE: hata(''), hata(null), hata(undefined), hata(false)
			if ( !sel ) {
				this.elems = [document];
				return this;
			}

			var elems =
				// Handle HTML string
				sel === 'body' ? [document.body] :
				typeof sel === 'string' ? Hata._query( document, sel ) :

				// HANDLE: hata(DOMElement)
				sel === window || sel.nodeType ? [sel] :

				// HANDLE: hata(hata(sel));
				sel instanceof Hata ? makeArray( sel.elems ) :

				makeArray( sel );

			if ( elems.length === 1 && elems[0] == null ) {
				elems.length = 0;
			}

			this.elems = elems;

			return this;
		};

	Hata._query = function( context, sel ) {
		if ( regExp.Id.test( sel ) ) {
			return [context.getElementById(sel.substr(1))];
		}

		if ( regExp.Class.test( sel ) ) {
			return makeArray( context.getElementsByClassName(sel.substr(1)) );
		}

		if ( regExp.Tag.test( sel ) ) {
			return makeArray( context.getElementsByTagName(sel) );
		}

		return makeArray( context.querySelectorAll(sel) );
	};

	Hata._find = function( context, sel ) {
		if ( !sel ) {
			return context == null ? [] : [context];
		}

		var result = sel.nodeName ? [sel]
			: typeof sel === 'string' ? Hata._query( context, sel ) : [context];
		return (result.length === 1 && result[0] == null) ? [] : result;
	};

	Hata.extend = function( target, source ) {
		if ( !source ) {
			source = target;
			target = Hata.prototype;
		}

		for ( var key in source ) {
			if ( hasOwnProperty.call( source, key ) ) {
				target[key] = source[key];
			}
		}

		return target;
	};

	Hata.extend({
		get: function( index ) {
			var elems = this.elems;

			if ( index !== undefined ) {
				var n = index < 0 ? elems.length + index : index;
				return elems[n];
			}

			return elems;
		},

		eq: function( index ) {
			return new Hata( this.get(index) );
		},

		each: function( iterator ) {
			return this.elems.forEach( iterator.bind(this) );
		},

		find: function( sel ) {
			var result = [];

			this.each(function( elem ) {
				var i = 0,
					found = Hata._find( elem, sel ),
					l = found.length;

				while (i < l) {
					includeUnique( result, found[i++]);
				}
			});

			return new Hata( result );
		},

		closest: function( sel ) {
			var parent,
				parents = [],
				elements = new Hata ( sel ).get();

			this.each(function( elem ) {
				parent = elem;

				while ( parent !== document && elements.indexOf( parent ) < 0 ) {
					parent = parent.parentNode;
				}

				includeUnique( parents, parent );
			});

			return new Hata ( parents );
		},

		filter: function( sel ) {
			var elements = new Hata( sel ),
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

	Hata.noConflict = function() {
		if ( window.hata === Hata ) {
			window.hata = _Hata;
		}

		return Hata;
	};

}( window, window.document ));
