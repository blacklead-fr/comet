import { renderProperty } from './render.js';
import sanitize from '../sanitize.js';
import { isObject } from '../is.js';

export function shadow( entry ){
	var w;

	if( !isObject( entry ) ){
		return '';

	}
	entry.blur = sanitize.number( { value: entry.blur, default: 0, min: 0 } );
	entry.x = sanitize.number( { value: entry.x, default: 0 } );
	entry.y = sanitize.number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 ) || ( entry.color = sanitize.color( entry.color ) ) === '' ){
		return '';

	}
	w = sanitize.valueUnit( entry.x, 'px' );
	w += ' ' + sanitize.valueUnit( entry.y, 'px' );
	w += ' ' + sanitize.valueUnit( entry.blur, 'px' );
	w += ' ' + entry.color;

	return renderProperty( 'text-shadow', w );

}