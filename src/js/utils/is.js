const DOCUMENT = document;

const WINDOW = window;

export function isNode( object ){

	return isObject( object ) && 'nodeType' in object && ( object.nodeType === Node.ELEMENT_NODE || object.nodeType === 1 );

}

export function isDocument( object ){

	return object === DOCUMENT;

}

export function isWindow( object ){

	return object === WINDOW;

}

export function isString( entry ){

	return typeof entry === 'string';

}

export function isObject( entry ){

	return typeof entry === 'object';

}

export function isNumber( entry ){

	return typeof entry === 'number';

}

export function isBool( entry ){

	return typeof entry === 'boolean';

}

export function isFunction( entry ){

	return typeof entry === 'function';

}

export function isDefined( entry ){

	return typeof entry !== 'undefined';

}

export function isArray( entry ){

	return isObject( entry ) && 'length' in entry;

}

export function isEmpty( entry ){

	switch( entry ){

		case '':
		case 'undefined':
		case 'null':
		case 'NaN':
		case undefined:
		case NaN:
		case false:
		case null:
		return true;

		default:
		return !isDefined( entry ) || ( ( isArray( entry ) || isString( entry ) ) && entry.length < 1 );

	}

}

export function isClassName( entry ){

	return isString( entry ) && entry.search( /(^[^a-z]|[^a-z0-9\-_])/gi ) < 0;

}