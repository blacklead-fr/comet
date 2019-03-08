import utils from './utils.js';
import node from './node.js';

/* global document, __cometi18n */

export default function ( options ){
	const _d = document;
	const fragment = _d.createDocumentFragment();
	var modal, inner, header, button, body;

	if( !utils.isObject( options ) ){
		options = {};

	}
	options.close = utils.isObject( options.close ) ? options.close : {};
	options.close.title = !utils.isStringEmpty( options.close.title ) ? utils.trim( options.close.title ) : __cometi18n.ui.close;
	options.close.icon = !utils.isStringEmpty( options.close.icon ) ? utils.trim( options.close.icon ) : '<span class="cico cico-x"></span>';

	modal = _d.createElement( 'div' );
	//modal.className = 'comet-dialog comet-dialogGlobal';
	modal.className = 'comet-modal comet-ui' + ( !utils.isStringEmpty( options.classes ) ? ' ' + utils.trim( options.classes ) : ( utils.isArray( options.classes ) ? ' ' + ( options.classes ).join( ' ' ) : '' ) );


	inner = '<div class="comet-inner">';
	inner += '<div class="comet-header"></div>';
	inner += '<div class="comet-body"></div>';
	inner += '</div>';
	modal.innerHTML = inner;
	fragment.appendChild( modal );

	header = modal.firstChild.firstChild;
	body = modal.firstChild.lastChild;

	if( utils.isString( options.header ) ){
		header.innerHTML = options.header;

	}else{
		header.appendChild( options.header );

	}

	if( utils.isString( options.content ) ){
		body.innerHTML = options.content;

	}else{
		body.appendChild( options.content );

	}
	button = _d.createElement( 'button' );
	button.className = 'comet-button comet-close';
	button.title = options.close.title;
	button.innerHTML = options.close.icon;
	modal.appendChild( button );
/*


	inner = document.createElement( 'div' );
	inner.className = 'comet-dialogbox';

	header = document.createElement( 'div' );
	header.className = 'comet-dialogHeader';

	if( !utils.isStringEmpty( options.header ) ){
		header.innerHTML = options.header;

	}else if( ( nh = node( options.header ) ).isNode() ){
		header.appendChild( nh.prop() );

	}

	button = document.createElement( 'button' );
	button.className = 'comet-button comet-dialogCloseButton';
	button.title = options.close.title;
	button.innerHTML = options.close.icon;

	content = document.createElement( 'div' );
	content.className = 'comet-dialogContent';

	if( !utils.isStringEmpty( options.content ) ){
		content.innerHTML = options.content;

	}else if( ( nh = node( options.content ) ).isNode() ){
		content.appendChild( nh.prop() );

	}else{
		content.innerHTML = i18n.messages.unreach;

	}
	header.appendChild( button );
	inner.appendChild( header );
	inner.appendChild( content );

	modal.appendChild( inner );

	document.body.appendChild( modal );*/

	node( button ).on( 'click', function( ev, ui ){
		ev.preventDefault();

		if( utils.isFunction( options.done ) ){

			if( options.done( ev, ui ) === 1 ){
				return false;

			}

		}

		if( modal && modal.parentNode !== null ){
			modal.parentNode.removeChild( modal );

		}

	});

	_d.body.appendChild( fragment );

	return {
		target: modal,
		modal: modal.firstChild,
		header: header,
		body: body,
		destroy: function(){

			if( modal && modal.parentNode !== null ){
				modal.parentNode.removeChild( modal );

			}

		}
	};
	
}