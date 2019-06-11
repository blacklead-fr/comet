import { isArray, isString } from './is.js';
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

export function inArray( array, value ){

	return isArray( array ) && array.length > 0 && isString( value ) && array.indexOf( value ) > -1;

}