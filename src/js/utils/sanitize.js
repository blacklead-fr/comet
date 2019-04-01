import utils from './utils.js';
import parse from './parse.js';
import node from './node.js';

/* global document */

const sanitize = {};

sanitize.number = function( entry ){
	var value;

	if( entry === null || !utils.isObject( entry ) ){
		entry = {
			value: entry
		};

	}

	if( entry.value !== null && ( utils.isString( entry.value ) || utils.isNumber( entry.value ) ) ){
		value = utils.isBool( entry.float ) && entry.float ? parseFloat( entry.value ) : parseInt( entry.value );

		if( utils.isNumber( entry.min ) && value < entry.min ){
			return entry.min;

		}

		if( utils.isNumber( entry.max ) && value > entry.max ){
			return entry.max;

		}

		if( !isNaN( value ) ){		
			return value;
		}

	}
	return ( utils.isNumber( entry.default ) ? parseFloat( entry.default ) : null );

};

sanitize.valueUnit = function( value, unit ){
	const auto = [ 'auto', 'AUTO', 'AUT', 'aut' ];

	if( utils.isString( value ) ){

		if( auto.indexOf( utils.trim( value ) ) > -1 ){
			return 'auto';

		}

	}
	unit = utils.isString( unit ) ? sanitize.unit( unit ) : '';
	value = sanitize.number( { value: value, float: ( unit !== 'px' ) } );

	return ( value === null || value === 0 ? '0' : value + unit );
};

sanitize.unit = function( unit ){

	unit = utils.isString( unit ) ? utils.trim( unit.toLowerCase() ) : unit;

	switch( unit ){
		case 'px':
		case 'pixel':
		case 'pix':
		case 'pxl':
		case 'pixels':
		return 'px';

		case 'em':
		case 'mul':
		case 'mu':
		case '*':
		return 'em';

		case '%':
		case 'percent':
		case 100:
		case '100':
		return '%';

		case 'pt':
		case 'points':
		case 'point':
		case 'pts':
		return 'pt';

		case 'cm':
		case 'centimeter':
		case 'centimeters':
		return 'cm';

		case 'mm':
		case 'millimeter':
		case 'millimeters':
		return 'mm';

		case 'in':
		case 'inches':
		case 'inch':
		return 'in';
		
		default:
		return '';
	}

};

sanitize.value = function( entry, def ){
	const typeE = typeof entry;
	const typeD = typeof def;
	var output = '';

	if( typeE === 'number' ){
		output = sanitize.number( entry );

	}else if( typeE === 'string' ){
		output = utils.trim( entry );
	}

	if( output === '' && def !== null ){
		if( typeD === 'number' ){
			output = sanitize.number( def );

		}else if( typeD === 'string' ){
			output = utils.trim( def );
		}
	}

	return output;

};

sanitize.color = function( str ){
	const regex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/i;

	if( !utils.isStringEmpty( str ) && regex.test( str = utils.trim( str ) ) ){
		return str;

	}
	
	return '';

};

sanitize.data = function( data, id ){
	const d = {};
	var ids, idsa, a;

	if( !utils.isObject( data )  || !utils.isObject( data.elements ) || !( id = parse.id( id ) ) || !utils.isObject( data.elements[id] ) ){
		return d;

	}
	d.el = data.elements[id];

	if( !utils.isStringEmpty( d.el._items ) && utils.isObject( data.items ) && utils.isArray( ( ids = parse.ids( d.el._items, 'array' ) ), 1 ) ){
		d.items = {};

		for( a = 0; a < ids.length; a++ ){

			if( !( idsa = parse.id( ids[a] ) ) || !utils.isObject( data.items[idsa] ) ){
				continue;

			}
			d.items[idsa] = data.items[idsa];

		}

	}
	return d;

};

sanitize.content = function(){
	const elements = document.getElementsByClassName( 'cpb-elementContent' );
	const __core = {

		map: {
			"'": '&#39;',
		},

		callback: function( m ){
			return __core.map[m];

		}

	};
	var o, e;

	if( !utils.isObject( elements ) ){
		return '';

	}
	o = '';

	for( e in elements ){

		if( !node( elements[e] ).isNode() ){
			continue;

		}
		o += utils.stripTags( elements[e].innerHTML, '<br><img><p><a><u><strike><b><strong><i><ins><del><hr><caption><span><h1><h2><h3><h4><h5><h6><video><audio>' );

	}
	return o.replace(/[']/g, __core.callback );

};

sanitize.post = function( str ){
	const allowed = '<br><img><p><a><u><strike><b><strong><i><ins><del><hr><caption><span><h1><h2><h3><h4><h5><h6><sub><sup><title>';

	return ( !utils.isStringEmpty( str ) ? utils.stripTags( str, allowed ) : '' );

};

sanitize.class = function( str, prefix ){

	return ( utils.toClass( utils.isString( prefix ) ? prefix : '' ) + utils.toClass( str ) );

};

sanitize.alignment = function( entry ){
	const c = 'cpb-align';
	entry = utils.isString( entry ) ? utils.trim( entry.toLowerCase() ) : entry;

	switch( entry ){
		case 'l':
		case 'left':
		case '<':
		return c + 'left';

		case 'r':
		case 'right':
		case '>':
		return c + 'right';

		case 'j':
		case 'justify':
		case '=':
		return c + 'justify';

		case 'm':
		case 'middle':
		return c + 'middle';

		case 't':
		case 'top':
		case '^':
		return c + 'top';

		case 'b':
		case 'bottom':
		case 'v':
		return c + 'bottom';

		default:
		return c + 'center';
	}

};

export default sanitize;