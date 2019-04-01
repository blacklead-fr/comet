import utils from './utils.js';
import sanitize from './sanitize.js';

const gradient = {};

gradient.encode = function( colors ){
	var color, a, c, o, p;

	if( !utils.isArray( colors, 2 ) ){
		return '';

	}
	o = '';

	for( a = 0; a < colors.length; a++ ){

		if( !utils.isObject( color = colors[a] ) || !( 'color' in color ) || !( c  = sanitize.color( color.color ) ) ){
			continue;

		}
		p = sanitize.number( { value: color.stop, min: 0, max: 100, default: 0, float: true } );
		o += ( o.length > 0 ? '+' : '' ) + p + 'z' + c;
		
	}
	return o;
	
};

gradient.decode = function( str ){
	const d1 = '+';
	const d2 = 'z';
	const o = [];
	var a, depth1, depth2, crt, c;

	if( utils.isStringEmpty( str ) || !utils.isArray( ( depth1 = ( str = utils.trim( str ) ).split( d1 ) ), 2 ) ){
		return false;

	}

	for( a = 0; a < depth1.length; a++ ){

		if( utils.isStringEmpty( crt = depth1[a] ) || !utils.isArray( ( depth2 = ( crt = utils.trim( crt ) ).split( d2 ) ), 2 ) || !( c = sanitize.color( depth2[1] ) ) ){
			continue;

		}
		o[o.length] = {
			stop: sanitize.number( { value: depth2[0], min: 0, max: 100, default: 0, float: true } ),
			color: c
		};

	}
	return o;
	
};

export default gradient;
