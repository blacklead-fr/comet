import { isString, isArray, isEmpty, isNumber, isBool, isObject } from '../is.js';
import { renderProperty, renderMuValues } from './render.js';
import { inArray } from '../fill.js';
import sanitize from '../sanitize.js';

const CORE = {

	isInset: function( value ){

		if( isString( value ) || isNumber( value ) || isBool( value ) ){
			value = ( ( value.toString() ).toLowerCase() ).trim();

		}
		return inArray( [ 'true', 'in', 'inset', '1' ], value );

	}

};

export function padding( top, right, bottom, left, vunit, hunit ){
	const MU = renderMuValues( top, right, bottom, left, vunit, hunit );
	return ( !isEmpty( MU ) ? renderProperty( 'padding', _mu ) : '' );

}

export function margin( top, right, bottom, left, vunit, hunit ){
	const MU = renderMuValues( top, right, bottom, left, vunit, hunit );
	return ( !isEmpty( MU ) ? renderProperty( 'margin', MU ) : '' );
}

export function shadow( entry ){
	var w, o;

	if( !isObject( entry ) ){
		return '';

	}
	entry.blur = sanitize.number( { value: entry.blur, default: 0, min: 0 } );
	entry.spread = sanitize.number( { value: entry.spread, default: 0 } );
	entry.x = sanitize.number( { value: entry.x, default: 0 } );
	entry.y = sanitize.number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 && entry.spread === 0 ) || ( entry.color = sanitize.color( entry.color ) ) === '' ){
		return '';

	}
	w = sanitize.valueUnit( entry.x, 'px' );
	w += ' ' + sanitize.valueUnit( entry.y, 'px' );
	w += ' ' + sanitize.valueUnit( entry.blur, 'px' );
	w += ' ' + sanitize.valueUnit( entry.spread, 'px' );
	w += ' ' + entry.color;
	w += CORE.isInset( entry.inset ) ? ' inset' : '';

	o = renderProperty( 'box-shadow', w );
	o += renderProperty( '-moz-box-shadow', w );
	o += renderProperty( '-webkit-box-shadow', w );

	return o;

}