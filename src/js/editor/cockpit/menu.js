import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import library from './library.js';

export default function( parentNode ){

	const _d = document;

	const __core = {

		buttons: {

			templates: {
				icon: 'cico-directory',
				title: __cometi18n.ui.templates,
				event: library
			}
		},

		create: function(){
			const slug = 'comet';
			const buttons = __core.buttons;
			var b, tmp;

			function button( id, title, icon ){
				const mainClassName = 'comet-exmenu__button';
				const btn = _d.createElement( 'button' );
				btn.className = mainClassName + ' ' + mainClassName + '--' + id;
				btn.setAttribute( 'aria-label', title );
				btn.innerHTML = '<span class="' + mainClassName + '__icon cico ' + icon + '"></span><span class="' + mainClassName + '__title">' + title + '</span>';

				return btn;


			}


			for( b in buttons ){
				tmp = button( b, utils.trim( buttons[b].title ), utils.trim( buttons[b].icon ) );
				parentNode.appendChild( tmp );

				if( utils.isFunction( buttons[b].event ) ){
					node( tmp ).on( 'click', buttons[b].event );

				}

			}

		},

		destroy: function(){

			parentNode.innerHTML = '';

		}

	};

	if( !node( parentNode ).isNode() ){
		return false;

	}
	__core.create();

	return {
		target: parentNode,
		destroy: __core.destroy

	};

}