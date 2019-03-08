import utils from './utils.js';
import node from './node.js';

/* global document */

const parse = {

	dataset: function( ui, match ){

		if( !node( ui ).isNode() || utils.isStringEmpty( match ) ){
			return false;

		}

		if( !utils.isObject( ui.dataset ) || !( ( match = utils.trim( match ) ) in ui.dataset ) ){
			return false;

		}

		if( utils.isNumber( ui.dataset[match] ) ){
			return ui.dataset[match];

		}

		if( !utils.isStringEmpty( ui.dataset[match] ) ){
			return utils.trim( ui.dataset[match] );

		}
		return false;

	},

	type: function( type ){
		const types = [ 'sections', 'rows', 'columns', 'elements', 'items' ];
		return ( !utils.isStringEmpty( type ) && types.indexOf( type = utils.trim( type ) ) > -1 ? type : false );

	},

	id: function( id ){
		return ( utils.isNumber( id = parseInt( id ) ) && !isNaN( id ) ? id : false );

	},

	style: function( s_id ){
		const _d = document;
		const s = !utils.isStringEmpty( s_id ) ? _d.getElementById( utils.trim( s_id ) ) : false;
		var _s;

		return ( ( ( _s = node( s ) ).isNode() ) && _s.prop().nodeName.toLowerCase() === 'style' ? _s.prop() : false );

	},

	html: function( str ){
		var s;

		if( !utils.isString( str ) ){
			return false;

		}
		s = document.createElement( 'div' );
		s.innerHTML = str;

		return s.children;

	},

	ids: function( str, type ){
		var ids, a, id, nids, n;

		if( utils.isStringEmpty( str ) || !utils.isArray( ( ids = str.split( ',' ) ), 1 ) ){
			return false;

		}
		nids = type === 'array' ? [] : {};
		n = 0;

		for( a = 0; a < ids.length; a++ ){

			if( !( id = parse.id( ids[a] ) ) ){
				continue;

			}

			if( type === 'array' ){
				nids.push( id );
				continue;

			}
			nids[id] = id;
			n++;
			nids.length = n;

		}
		return !nids.length ? false : nids;

	},

	json: function( str ){
		var j;

		try {
			j = JSON.parse( str );

		} catch( e ){
			return false;

		}
		return j;

	}

};

export default parse;
