import { isString, isArray, isEmpty } from '../utils/is.js';
import { on as bind, removeClass, addClass } from './default.js';

const DOCUMENT = document;

export default function( entry ){
	var elements = entry;

	if( isString( entry ) ){
		elements = DOCUMENT.querySelectorAll( entry );

	}

	if( !isArray( elements ) || isEmpty( elements ) ){
		return false;

	}

	return {

		removeClass: function( className ){
			var a;

			for( a = 0; a < elements.length; a++ ){
				removeClass( elements[a], className );

			}

		},

		addClass: function( className ){
			var a;

			for( a = 0; a < elements.length; a++ ){
				addClass( elements[a], className );

			}

		},

		on: function( types, listener, data ){
			var a;

			for( a = 0; a < elements.length; a++ ){
				bind( elements[a], types, listener, data );

			}

		}

	};


}