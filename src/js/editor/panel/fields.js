import __global from '../../utils/global.js';
import range from '../../utils/ui/range.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import update from '../update.js';

export default function(){

	var fi = 0;

	const _d = document;

	const _global = __global();

	const globalList = _global.get( 'panelFields' );

	const __core = {

		range: function( ui ){

			range( ui, { 
				buttons: true,
				change: function(){
					update( ui );

				}

			} );

		}

	};

	if( globalList.length < 1 ){
		return;

	}

	for( fi; fi < globalList.length; fi++ ){

		if( !utils.isObject( globalList[fi] ) ){
			continue;

		}

		if( !( 'type' in globalList[fi] ) || !utils.isFunction( __core[globalList[fi].type] ) ){
			continue;

		}

		if( !( 'node' in globalList[fi] ) || !node( globalList[fi].node ).isNode() ){
			continue;

		}
		__core[globalList[fi].type]( globalList[fi].node );

	}


}