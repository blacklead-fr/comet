import utils from './utils.js';

/* global window, Comet */

export default function (){

	window.Comet = typeof Comet !== 'object' ? {} : Comet;

	const prop = {

		get: function( from ){

			if( utils.isStringEmpty( from  ) || !( ( from = utils.trim( from ) ) in Comet ) ){
				return false;

			}

			return Comet[from];

		},

		set: function( to, data, forceErase ){

			if( utils.isStringEmpty( to ) ){
				return false;

			}
			to = utils.trim( to );
			forceErase = utils.isBool( forceErase ) ? forceErase : false;

			if( ( to in Comet && forceErase ) || !( to in Comet ) ){
				Comet[to] = data;

			}
			return this.get( to );

		},

		isSet: function( to ){

			return ( !this.get( to ) ? false : true );

		}


	};

	return prop;
}