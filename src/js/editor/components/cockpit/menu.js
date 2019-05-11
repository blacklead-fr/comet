import { isFunction, isNode } from '../../../utils/is.js';
import node from '../../../node/index.js';
import library from './library.js';

export default function( parentNode ){

	const _d = document;

	const className = 'comet-cockpit__exmenu__button';

	const __classes = {
		main: className,
		icon: className + '__icon',
		title: className + '__title'

	};

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
				const btn = _d.createElement( 'button' );
				btn.className = __classes.main + ' ' + __classes.main + '--' + id;
				btn.setAttribute( 'aria-label', title );
				btn.innerHTML = '<span class="' + __classes.icon + ' cico ' + icon + '"></span><span class="' + __classes.title + '">' + title + '</span>';

				return btn;


			}


			for( b in buttons ){
				tmp = button( b, buttons[b].title.trim(), buttons[b].icon.trim() );
				parentNode.appendChild( tmp );

				if( isFunction( buttons[b].event ) ){
					node( tmp ).on( 'click', buttons[b].event );

				}

			}

		},

		destroy: function(){

			parentNode.innerHTML = '';

		}

	};

	if( !isNode( parentNode ) ){
		return false;

	}
	__core.create();

	return {
		target: parentNode,
		destroy: __core.destroy

	};

}