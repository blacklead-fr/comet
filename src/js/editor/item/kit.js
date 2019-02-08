import utils from '../../utils/utils.js';

export default function( id, title, html ){
	var ot, inner;

	html = utils.isBool( html ) ? html : false;

	ot = document.createElement( 'li' );
	ot.dataset.id = id;
	ot.className = 'comet-edModalItem';

	inner = '<span><span>#' + id + '</span>';

	if( !utils.isStringEmpty( title ) ){
		inner += utils.trim( title );

	}
	inner += '</span>';
	inner += '<button class="comet-edModalItemEdit comet-button" title="' + __cometi18n.ui.edit + '"><span class="cico cico-edit"></span></button>';
	inner += '<button class="comet-edModalItemDelete comet-button" title="' + __cometi18n.ui.delete + '"><span class="cico cico-trash"></span></button>';

	ot.innerHTML = inner;

	if( html ){
		return ot.outerHTML;

	}
	return ot;
	
}