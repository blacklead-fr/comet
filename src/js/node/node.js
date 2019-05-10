import * as __core from './default.js';

const DOCUMENT = document;

function onNodeList( entry, callback ){
	var n = 0;

	if( typeof callback !== 'function' ){
		return;

	}

	if( typeof entry === 'string' ){
		entry = DOCUMENT.querySelectorAll( entry );

	}

	if( typeof entry === 'object' && 'length' in entry && entry.length > 0 ){

		while( n < entry.length ){
			callback.apply( this, Array.prototype.slice.call( arguments, 2 ) );
			n++;
		}

	}

}

export default function( node ){

	return {

		classList: function(){
			return __core.classList( node );

		},

		hasClass: function( classe ){
			return __core.hasClass( node, classe );

		},

		hasClasses: function( classes ){
			return __core.hasClasses( node, classes );

		},

		removeClass: function( classe ){
			__core.removeClass( node, classe );

		},

		addClass: function( classe ){
			__core.addClass( node, classe );
		},

		toggleClass: function( classe ){
			__core.toggleClass( node, classe );

		},

		before: function( entry ){
			__core.before( node, entry );

		},

		after: function( entry ){
			__core.after( node, entry );

		},

		append: function( entry ){
			__core.append( node, entry );

		},

		prepend: function( entry ){
			__core.prepend( node, entry );

		},

		height: function( depth ){
			return __core.height( node, depth );

		},

		width: function( depth ){
			return __core.width( node, depth );

		},

		offset: function(){
			return __core.offset( node );

		},

		next: function( target ){
			return __core.next( node, target );

		},

		prev: function( target ){
			return __core.prev( node, target );

		},

		closest: function( target ){
			return __core.closest( node, target );

		},

		on: function( types, listener, data ){
			__core.on( node, types, listener, data );

		},

		load: function( object, url, callback ){
			return __core.load( node, url, callback );

		}

	};

}