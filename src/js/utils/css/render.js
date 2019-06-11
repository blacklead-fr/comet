import { isString, isNumber, isEmpty } from './is.js';
import { inArray } from './fill.js';
import sanitize from './sanitize.js';
import utils from './utils.js';

const CORE = {

	sanitizeAuto: function( entry ){
		const auto = [ 'auto', 'AUTO', 'aut', 'AUT' ];

		return ( isString( entry ) && inArray( auto, entry.trim() ) ? 'auto' : false );

	},

	sanitizeValue: function( entry ){

		return ( !CORE.sanitizeAuto( entry ) ? sanitize.number({ value: entry }) : 'auto' );

	}

};

export function renderMuValues( top, right, bottom, left, vunit, hunit ){
	var x = false;
	var y = false;
	var o;
	top = CORE.sanitizeValue( top );
	right = CORE.sanitizeValue( right );
	bottom = CORE.sanitizeValue( bottom );
	left = CORE.sanitizeValue( left );
	vunit = sanitize.unit( vunit );
	hunit = sanitize.unit( hunit );

	if( top === bottom ){
		y = top;

	}

	if( left === right ){
		x = left;

	}

	if( x === null ){
		x = 0;

	}

	if( y === null ){
		y = 0;

	}

	if( y === false ){
		top = top === null ? 0 : top;
		bottom = bottom === null ? 0 : bottom;

		if( top === bottom ){
			y = top;

		}

	}

	if( x === false ){
		right = right === null ? 0 : right;
		left = left === null ? 0 : left;

		if( right === left ){
			x = right;

		}

	}

	if( y === false || x ===  false ){
		o = sanitize.valueUnit( top, vunit );
		o += ' ';
		o += sanitize.valueUnit( right, hunit );
		o += ' ';
		o += sanitize.valueUnit( bottom, vunit );

		if( x === false ){
			o += ' ';
			o += sanitize.valueUnit( left, hunit );
		}

		return o;

	}

	if( y === x ){

		if( y === 0 ){
			return 0;

		}

		if( vunit === hunit ){
			return sanitize.valueUnit( y, vunit );

		}

	}
	o = sanitize.valueUnit( y, vunit );
	o += ' ';
	o += sanitize.valueUnit( x, hunit );
	return o;

}

export function renderRuleset( target, properties, device ){
	const devices = [ 'mobile', 'm', 'M', 'tablet', 't', 'T', 'TABLET' ];
	const index = isString( device ) ? devices.indexOf( device ) : -1;
	var classe;

	if( !isString( target ) || !isString( properties ) ){
		return '';

	}
	classe = ( index > -1 ? ( '.cpb-devicetype-' + ( index <= 2 ? 'mobile' : 'tablet' ) + ' ' ) : '' );
	classe += isString( target ) ? ' ' + target.trim() : '';

	return classe + '{' + properties.trim() + '}';

}

export function renderProperty( property, value ){

	if( !isString( property ) || isEmpty( property ) || ( !isNumber( value ) && ( !isString( value ) || isEmpty( value ) ) ) ){
		return '';

	}
	return utils.trim( property, ':' ) + ':' + utils.trim( value, ';' ) + ';';
	
}