import { frameset as getFrameset } from '../stored.js';
import sanitize from '../../../utils/sanitize.js';
import __global from '../../../utils/global.js';
import utils from '../../../utils/utils.js';
import node from '../../../utils/node.js';
import fields from './fields.js';

/* global document, __cometi18n */

export default function( options ){

	const _d = document;

	const _global = __global();

	const frameset = getFrameset();

	const id = 'comet-panel';

	const fragment = _d.createDocumentFragment();

	const __core = {

		data: {
			panel: null,
		},

		loadAfter: function(){
			fields();

		},

		onclose: function( ev, ui ){
			ev.preventDefault();

			__core.destroy();

			if( utils.isFunction( options.close.do ) ){
				options.close.do( ev, ui );

			}

		},

		create: function( forceCreate ){
			var panel, body, header, button, title, tabs;

			forceCreate = forceCreate === false ? false : true;

			if( ( ( panel = node( _d.getElementById( id ) ) ).isNode() ) ){
				__core.data.panel = panel;

				if( !forceCreate ){
					return;

				}
				panel.remove();

			}
			panel = _d.createElement( 'div' );
			panel.id = id;
			panel.className = 'comet-panel comet-ui';
			panel.innerHTML = '<div class="comet-header"><div class="comet-top"></div></div><div class="comet-body"></div>';
			panel.style.left = sanitize.number({ value: options.position, default: 0, min: 0 });
			fragment.appendChild( panel );
			__core.data.panel = panel;

			header = panel.firstChild;
			body = panel.lastChild;

			button = _d.createElement( 'button' );
			button.className = 'comet-button comet-close';

			if( options.close.title !== '' ){
				button.title = options.close.title;

			}
			button.innerHTML = options.close.inner;
			header.firstChild.appendChild( button );
			node( button ).on( 'click', __core.onclose );

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
			frameset.append( fragment );
			_global.set( 'panel', panel, true );
			__core.loadAfter();

		},

		destroy: function(){
			node( __core.data.panel ).remove();
			_global.set( 'panel', false, true );

		}

	};

	if( !utils.isObject( options ) ){
		options = {};

	}
	options.close = utils.isObject( options.close ) ? options.close : {};
	options.close.title = !utils.isStringEmpty( options.close.title ) ? utils.trim( options.close.title ) : __cometi18n.ui.close;
	options.close.inner = !utils.isStringEmpty( options.close.inner ) ? utils.trim( options.close.inner ) : '<span class="cico cico-x"></span>';

	__core.create();

	return {
		target: __core.data.panel,
		create: __core.create,
		destroy: __core.destroy

	};

}