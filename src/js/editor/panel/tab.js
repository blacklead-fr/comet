import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import __fields from './fields.js';
import kit from '../item/kit.js';
import __data from '../data.js';

export default function( sections, data, isItems ){
	var o, a, s;

	if( isItems === true ){

		function getItems(){
			var output = '';
			var ids, i, id, dataItem;

			if( !utils.isObject( data ) || utils.isStringEmpty( data._items ) || !utils.isArray( ( ids = parse.ids( data._items, 'array' ) ), 1 ) ){
				return '';

			}

			for( i = 0; i < ids.length; i++ ){

				if( !( id = parse.id( ids[i] ) ) || !( dataItem = __data().get( id, 'items' ) ) ){
					continue;

				}
				output += kit( id, dataItem.title, true );
				
			}
			return output;

		}

		o = '<div class="comet-editorModalItems">';
		o += '<ul class="comet-edModalItems">';
		o += getItems();
		o += '</ul>';
		o += '<div class="comet-edMIAdd"><button class="comet-button comet-buttonPrimary comet-edModalItemAdd"><span class="cico cico-plus"></span></button></div>';
		o += '</div>';
		return o;

	}

	if( !utils.isObject( sections ) ){
		return '';

	}
	o = '';

	for( a in sections ){

		if( !utils.isObject( s = sections[a] ) || !utils.isString( s.name ) || !utils.isObject( s.fields ) ){
			continue;

		}
		o += '<div class="comet-editorModalSection">';
		o += '<h4 class="comet-editorModalSectionHeader">' + utils.trim( s.name ) + '</h4>';
		o += '<div class="comet-editorModalSectionBody">';
		o += __fields( s.fields, data );
		o += '</div>';
		o += '</div>';
	}
	return o;

}