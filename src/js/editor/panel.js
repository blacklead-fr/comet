import sanitize from '../utils/sanitize.js';
import utils from '../utils/utils.js';
import redefine from './redefine.js';
import node from '../utils/node.js';

export default function( options ){
	const _d = document;
	const editor = utils.getNode( 'editor' );
	const id = 'comet-panel';
	const fragment = _d.createDocumentFragment();
	var panel, inner, body, header, button, buttons, title, tabs, content;

	options = utils.isObject( options ) ? options : {};
	options.close = utils.isObject( options.close ) ? options.close : {};
	options.close.title = !utils.isStringEmpty( options.close.title ) ? utils.trim( options.close.title ) : __cometi18n.ui.close;
	options.close.inner = !utils.isStringEmpty( options.close.inner ) ? utils.trim( options.close.inner ) : '<span class="cico cico-x"></span>';


	if( ( ( panel = node( _d.getElementById( id ) ) ).isNode() ) ){
		panel.remove();

	}
	panel = _d.createElement( 'div' );
	panel.id = id;
	panel.className = 'comet-panel comet-ui';
	panel.innerHTML = '<div class="comet-header"><div class="comet-top"></div></div><div class="comet-body"></div>';
	panel.style.left = sanitize.number({ value: options.position, default: 0, min: 0 });
	fragment.appendChild( panel );

	header = panel.firstChild;
	body = panel.lastChild;

	button = _d.createElement( 'button' );
	button.className = 'comet-button comet-close';

	if( options.close.title !== '' ){
		button.title = options.close.title;

	}
	button.innerHTML = options.close.inner;
	header.firstChild.appendChild( button );

	if( !utils.isStringEmpty( options.title ) ){
		title = _d.createElement( 'span' );
		title.className = 'comet-title';
		title.innerHTML = utils.trim( options.title );
		header.firstChild.appendChild( title );

	}

	if( 'tabs' in options && options.tabs ){
		tabs = _d.createElement( 'div' );
		tabs.className = 'comet-tabs';
		tabs.appendChild( options.tabs );
		header.appendChild( tabs );

	}

	if( 'content' in options && options.content ){
		body.appendChild( options.content );

	}else{
		body.innerHTML = __cometi18n.messages.error.unreach;
	}
	editor.appendChild( fragment );
	redefine.workflow();

	node( button ).on( 'click', function( ev, ui ){
		ev.preventDefault();
		var _exit;

		if( utils.isFunction( options.close.do ) ){
			_exit = options.close.do( ev, ui );

		}

		if( utils.isBool( _exit ) && !_exit ){
			return;

		}
		node( panel ).remove();
		redefine.workflow();

	});

	return {
		target: panel,
		destroy: function(){
			node( panel ).remove();
			redefine.workflow();

		}

	};

}