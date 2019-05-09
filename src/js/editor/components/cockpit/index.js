import { frameset as getFrameset } from '../stored.js';
import utils from '../../../utils/utils.js';
import initElements from './elements.js';
import node from '../../../utils/node.js';
import initButtons from './buttons.js';
import initMenu from './menu.js';

export default function(){

	const _d = document;

	const prefix = 'comet';

	const slug = 'cockpit';

	const frameset = getFrameset();

	const __cockpit = {
		target: null,
		open: false,
		elements: []

	};

	const className = prefix + '-' + slug;

	const __classes = {
		main: className,
		open: className + '--open',
		expand: className + '__expand',
		header: {
			main: className + '__header',
			collapse: {
				main: className + '__header__switch',
				icon: className + '__header__switch__icon',
				tooltip: className + '__header__switch__tooltip'

			}

		},
		elements: {
			main: className + '__elements',
			searchbox: className + '__elements__searchbox',
			searchbar: className + '__elements__searchbox__bar',
			searchicon: className + '__elements__searchbox__icon',
			list: className + '__elements__list',
			hidden: className + '__elements__list__element--hidden'

		},
		menu: {
			main: className + '__exmenu'

		},
		footer: {
			main: className + '__footer'

		}

	};

	const __core = {

		events: {

			search: function( ev, ui ){
				const value = utils.isString( ui.value ) ? utils.trim( ui.value ) : '';
				const isEmpty = value.length < 1;
				var a, element, _element, regex, title;

				ev.preventDefault();

				if( __cockpit.elements.length < 1 ){
					return;

				}
				regex = new RegExp( value, 'i' );

				for( a = 0; a < __cockpit.elements.length; a++ ){

					if( ( element = __cockpit.elements[a] ) === null || !( ( _element = node( element ) ).isNode() ) ){
						continue;

					}

					if( !utils.isString( title = element.getAttribute( 'aria-label' ) ) ){
						continue;

					}

					if( !isEmpty && title.search( regex ) === -1 ){
						_element.addClass( __classes.elements.hidden );
						continue;

					}
					_element.removeClass( __classes.elements.hidden );

				}


			},

			toggle: function( ev, ui ){
				var n_cockpit;

				if( utils.isObject( ev ) ){
					ev.preventDefault();

				}

				if( __cockpit.target === null || !( ( n_cockpit = node( __cockpit.target ) ).isNode() ) ){
					return false;

				}

				if( n_cockpit.hasClass( __classes.open ) && __cockpit.open ){
					n_cockpit.removeClass( __classes.open );
					__cockpit.open = false;
					return;

				}
				n_cockpit.addClass( __classes.open );
				__cockpit.open = true;

			},

			create: function(){

				const fragment = _d.createDocumentFragment();
				const cockpit = _d.createElement( 'div' );
				const section = {
					header: null,
					elements: null,
					menu: null,
					footer: null

				};
				var inner;

				fragment.appendChild( cockpit );
				__cockpit.target = cockpit;

				cockpit.className = __classes.main;

				inner = '<header class="' + __classes.header.main + '">';
				inner += '<button class="' + __classes.header.collapse.main + '">';
				inner += '<span class="' +__classes.header.collapse.icon + ' cico cico-comet"></span>';
				inner += '<span class="' + __classes.header.collapse.tooltip + '"><span>' + __cometi18n.ui.collapse + '</span></span>'; // TRANSLATE
				inner += '</button>';
				inner += '<h4 class="' + __classes.expand + '">' + __cometi18n.ui.cockpit + '</h4>';
				inner += '</header>';

				inner += '<section class="' + __classes.elements.main + '">';
				inner += '<div class="' + __classes.elements.searchbox + ' ' + __classes.expand + '">';
				inner += '<input type="text" class="' + __classes.elements.searchbar + '" value="" placeholder="' + __cometi18n.ui.search + '" />';
				inner += '<span class="' + __classes.elements.searchicon + ' cico cico-search"></span>';
				inner += '</div>';
				inner += '<div class="' + __classes.elements.list + '"></div>';
				inner += '</section>';

				inner += '<section class="' + __classes.menu.main + ' ' + __classes.expand + '"></section>';

				inner += '<footer class="' + __classes.footer.main + '"></footer>';

				cockpit.innerHTML = inner;

				section.header = cockpit.children[0];
				section.elements = cockpit.children[1];
				section.menu = cockpit.children[2];
				section.footer = cockpit.children[3];

				__cockpit.elements = initElements( section.elements.lastChild );
				initMenu( section.menu );
				initButtons( section.footer );
				node( section.header.firstChild ).on( 'click', __core.events.toggle );
				node( section.elements.firstChild.firstChild ).on( 'input', __core.events.search );

				frameset.append( fragment );

			},

			destroy: function(){
				const target = __cockpit.target;

				if( target === null || target.parentNode === null ){
					return false;

				}
				target.parentNode.removeChild( target );
				return true;

			}


		}

	};

	if( !frameset ){
		return false;

	}
	__core.events.create();

	return {
		target: __cockpit.target,
		destroy: __core.events.destroy,
		toggle: __core.events.toggle

	};


}