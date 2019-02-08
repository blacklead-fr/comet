import utils from '../../utils/utils.js';
import __field from './field.js';

export default function( fields, data ){
	var o, a, field, desc, classes;

	if( !utils.isObject( fields ) ){
		return '';

	}

	function isStNb( cur ){
		const type = typeof cur;

		return ( type === 'string' || type === 'number' );
	}

	function show(){
		var check, c1, c2;

		if( utils.isString( check = field.check ) && utils.isArray( ( check = ( field.check ).split( ':' ) ), 2 ) ){
			c1 = isStNb( check[0] ) ? utils.trim( check[0].toString() ) : '';
			c2 = isStNb( check[1] ) ? utils.trim( check[1].toString() ) : '';

			if( c1 in data && data[c1] !== c2 ){
				return false;

			}

		}
		return true;
	}

	o = '';

	for( a in fields ){
		field = fields[a];
		classes = 'comet-modalControlWrap';

		/*if( !show() ){
			classes += ' comet-modalControlHide';

		}*/
		o += '<div class="' + classes + '">';

		if( utils.isString( field.label ) ){
			o += '<div class="comet-modalControlLabel">';
			o += '<label for="comet-modalField' + a + '">';
			o += utils.trim( utils.stripTags( field.label ) );

			if( utils.isString( field.desc ) && ( desc = utils.trim( utils.stripTags( fields.desc, '<b><strong><i><a><span><sub><sup><ins>' ) ) ).length > 0 ){
				o += '<span class="comet-modalTooltip">';
				o += '<span class="comet-modalTooltipIcon">?</span>';
				o += '<span class="comet-modalTooltipText">' + desc + '</span>';
				o += '</span>';

			}
			o += '</label>';
			o += '</div>';

		}
		o += __field( a, field, data );
		o += '</div>';

	}
	return o;

}