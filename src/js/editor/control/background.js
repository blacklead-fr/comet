import { isNode, isString, isTrueValue } from '../../utils/is.js';
import node from '../../dom/element.js';

const DOCUMENT = document;

const CORE = {

	remove: function( ui ){

		if( ui.parentNode === null ){
			return;

		}
		ui.parentNode.removeChild( ui );

	}

};

export default function(){
	const bgClassName = 'cpb-backgroundComponents';
	var inner = '';
	var background;

	if( !isNode( content ) ){
		return;

	}
	node( content ).children( '.' + bgClassName, CORE.remove );

	background = DOCUMENT.createElement( 'div' );
	background.className = bgClassName;

	if( 'vid' in uidata && isTrueValue( uidata.vid ) && isString( uidata.vurl ) ){
		inner += '<video class="cpb-backgroundVideo" src="' + ( utils.stripTags( uidata.vurl ) ).trim() + '" loop autoplay muted preload="auto"></video>';

	}

	if( 'ov' in uidata && isTrueValue( uidata.ov ) && isString( uidata.ovc ) ){
		inner += '<div class="cpb-backgroundOverlay"></div>';

	}
	background.innerHTML = inner;

	content.appendChild( background );

}