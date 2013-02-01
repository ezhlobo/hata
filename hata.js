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

		isFunction = function( obj ) {
			return obj && toString.call( obj ) === '[object Function]';
		},

		// @TODO
		// Need refactoring
		isArrayLike = function( obj ) {
			return obj && (Array.isArray( obj ) || (
					typeof obj != 'string' &&
					!isFunction( obj ) &&
					typeof obj.nodeName != 'string' &&
					typeof obj.length == 'number'
				));
		},

		makeArray = function( obj ) {
			return Array.prototype.slice.call( obj );
		},

		Hata = function( sel, context ) {
			if ( !(this instanceof Hata) ) {
				return new Hata( sel, context );
			}

			if ( context !== undefined ) {
				return new Hata( context || document ).find( sel );
			}

			context = context || document;

			this.elems =
					sel === window          ? [window]
				: sel instanceof Hata      ? makeArray( sel.elems )
				: sel === document        ? [document]
				: sel === 'body'          ? [document.body]
				: isArrayLike( sel )      ? makeArray( sel )
				: typeof sel === 'string' ? Hata._query( context, sel )
				:                           Hata._find( context, sel );

			if ( this.elems.length === 1 && this.elems[0] == null ) {
				this.elems.length = 0;
			}

			return this;
		};

	// @TODO
	// Need refactoring
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

	// @TODO
	// Need refactoring
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

		each: function( iterator, context ) {
			var elems = this.elems;

			for ( var i = 0, l = elems.length; i < l; i++ ) {
				if ( iterator.call( context, elems[i], i, elems ) === breaker ) return;
			}

			return this;
		},

		find: function( sel ) {
			var elems = [];

			this.each(function( parent ) {
				elems = elems.concat( Hata._find(parent, sel) );
			});

			return new Hata( elems );
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
