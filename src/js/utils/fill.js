import { isArray, isString, isObject, isEmpty } from './is.js';

/**
* Computes the difference of arrays.
*
* @param {array}	array1	The array to compare from.
* @param {array}	array2	An array to compare against.
*
* @return {array} Returns an array containing all the entries from array1 that are not present in array2.
*/
export function arrayDiff( array1, array2 ){

	return array1.filter( function( i ){

		return array2.indexOf( i ) < 0;

	});

}

/**
* Checks if a value exists in an array.
*
* @param {array}	array	The array.
* @param {string}	value	The searched value.
*
* @return {boolean} Returns TRUE if value is found in the array, FALSE otherwise.
*/
export function inArray( array, value ){

	return isArray( array ) && array.length > 0 && isString( value ) && array.indexOf( value ) > -1;

}

/**
* Make a string's first character uppercase.
*
* @param {string}	str	The input string.
*
* @return {string} Returns the resulting string.
*/
export function capitalize( str ){

	return !isString( str ) || str.search( /[a-z]/gi ) !== 0 ? str : str.charAt(0).toUpperCase() + str.slice(1);

}

/**
* Strip whitespace (or other characters) from the beginning and end of a string.
*
* @param {mixed}	entry	A string that will be trimmed or an object with parameters.
*
* @return {string} Returns the trimmed string.
*/
export function xtrim( entry ){
	var s = '';
	var c;

	if( isString( entry ) ){
		return entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );

	}

	if( isObject( entry ) && 'str' in entry ){
		s = entry.str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );

		if( isString( entry.char ) ){
			c = entry.char === ']' ? '\\]' : c;
			c = entry.char === '\\' ? '\\\\' : c;
			s.replace( new RegExp( '^[' + c + ']+|[' + c + ']+$', 'g' ), '');
		}

	}
	return s;

}

/**
* Returns the JSON representation of a value.
*
* @param {object}	obj	The object being encoded.
* @param {boolean}	raw	Components have to be encoded or not. Default: true.
*
* @return {string} Returns a JSON encoded string.
*/
export function jsonEncode( obj, raw ){

	if( !isObject( obj ) || isArray( obj ) ){
		return '';

	}
	raw = isBool( raw ) ? raw : true;

	if( raw ){
		return encodeURIComponent( JSON.stringify( obj ) );

	}
	return JSON.stringify( obj );

}

/**
* Convert some special characters.
*
* @param {string}	str	The string being converted.
*
* @return {string} Returns the converted string.
*/
export function encodeChars( str ){
	const __core = {

		map: {
			'\\': '&#92;',
			"'": '&#39;',
			'"': '&#34;',
		},

		callback: function( m ){
			return __core.map[m];

		}

	};

	return !isString( str ) ? str : str.replace(/[\\'"]/g, __core.callback );

}

/**
* Checks and cleans a URL.
*
* @param {string}	url	The URL to be cleaned.
*
* @return {string} Returns the cleaned URL.
*/
export function escUrl( url ){
	var strip;

	function _deepReplace( search, subject ){
		var s;
		if( typeof search === 'object' ){
			for( s in search ) {
				subject = subject.replace( search[s], '' );
			}
		}
		return subject;
	}
	
	if( !isString( url ) || isEmpty( url = url.trim() ) ){
		return url;

	}
	
	if ( url.indexOf( 'mailto:' ) !== 0 ) {
		strip = [ '%0d', '%0a', '%0D', '%0A' ];
		url = _deepReplace( strip, url);
		
	}
	url = url.replace( '&', '&#038;' ).replace( '\'', '&#039;' );

	return encodeURI( url );

}

/**
* Strip HTML and PHP tags from a string.
*
* @param {string}	str		The input string.
* @param {string}	allowed	Optional second parameter to specify tags which should not be stripped.
*
* @return {string} Returns the stripped string.
*/
export function stripTags( str, allowed ){
	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	const mallowedTags = /<[a-z][a-z0-9]*>/g; 
	const commentsTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

	if( !isString( str ) ){
		return '';

	}
	allowed = (((allowed || '') + '').toLowerCase().match( mallowedTags) || [] ).join('');

	return str.replace( commentsTags, '' ).replace( tags, function( $0, $1 ){
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';

	});

}

/**
* Strip HTML and PHP tags from a string.
*
* @param {string}	str		The input string.
* @param {string}	only	Specify tags which should be stripped.
*
* @return {string} Returns the stripped string.
*/
export function stripOnly( str, only ){
	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	const onlyTags = /<[a-z][a-z0-9]*>/g;

	if( !isString( str ) ){
		return '';

	}
	only = (((only || '') + '').toLowerCase().match( onlyTags) || [] ).join('');

	return str.replace( tags, function( $0, $1 ){
		return only.indexOf('<' + $1.toLowerCase() + '>') > -1 ? '' : $0;

	});

}

/**
* Merge the contents of objects together into the first object.
*
* @param {object}	out			The source object.
* @param {object}	arguments	More objects containing additional properties to merge in.
*
* @return {object} Returns the object (no-inheritance).
*/
export function extend( out ){
	const args = arguments;
	var i, obj, key;

	if( !isObject( out ) ){
		out = {};

	}

	for( i = 1; i < args.length; i++ ){

		if( !( obj = args[i] ) ){
			continue;

		}

		for( key in obj ){

			if( !obj.hasOwnProperty(key) ){
				continue;

			}

			if( isObject( obj[key] ) ){
				out[key] = extend( out[key], obj[key] );
				continue;

			}
			out[key] = obj[key];

		}
		
	}
	return out;

}