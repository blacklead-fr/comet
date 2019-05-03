import initElements from './cockpit/elements.js';
import initButtons from './cockpit/buttons.js';
import notification from './notification.js';
import message from '../utils/message.js';
import utils from '../utils/utils.js';
import node from '../utils/node.js';

export default function(){

	const _d = document;

	const slug = 'comet';

	const editor = utils.getNode( 'editor' );

	const __cockpit = {
		node: null,
		open: false,
		components: {
			settingsPanel: null,

		}

	};

	const __classes = {
		toggled: 'is_toggled',

	};

	const __core = {

		createClass: function( name ){

			return utils.isString( name ) ? slug + '-' + utils.trim( name ) : '';

		},

		nodeExists: {

			cockpit: function(){

				return ( __cockpit.node !== null && __cockpit.node.parentNode !== null );

			},

			settingsPanel: function(){

				return ( __cockpit.components.settingsPanel !== null && __cockpit.components.settingsPanel.parentNode !== null );

			}

		},

		events: {

			toggle: function( ev, ui ){
				var n_cockpit;

				if( utils.isObject( ev ) ){
					ev.preventDefault();

				}

				if( !__core.nodeExists.cockpit() || !( ( n_cockpit = node( __cockpit.node ) ).isNode() ) ){
					return false;

				}

				if( n_cockpit.hasClass( __classes.toggled ) && __cockpit.open ){
					n_cockpit.removeClass( __classes.toggled );
					__cockpit.open = false;
					return;

				}
				n_cockpit.addClass( __classes.toggled );
				__cockpit.open = true;

			},

			create: function(){

				const fragment = _d.createDocumentFragment();
				const cockpit = _d.createElement( 'div' );
				const section = {
					header: null,
					notifications: null,
					elements: null,
					footer: null

				};
				const expand = __core.createClass( 'cockpit__expand' );
				var inner;

				fragment.appendChild( cockpit );
				__cockpit.node = cockpit;

				cockpit.className = __core.createClass( 'cockpit' );

				inner = '<header class="' + __core.createClass( 'cockpit__header' ) + '">';
				inner += '<button class="' + __core.createClass( 'cockpit__header__switch' ) + '">';
				inner += '<span class="' + __core.createClass( 'cockpit__header__switch__icon cico cico-comet' ) + '"></span>';
				inner += '<span class="' + __core.createClass( 'cockpit__header__switch__tooltip' ) + '"><span>' + __cometi18n.ui.collapse + '</span></span>'; // TRANSLATE
				inner += '</button>';
				inner += '<h4 class="' + expand + '">' + __cometi18n.ui.cockpit + '</h4>';
				inner += '</header>';

				inner += '<section class="' + __core.createClass( 'notifications' ) + ' ' + expand + '">';
				inner += '<button class="' + __core.createClass( 'notifications__button' ) + '">';
				inner += '<span>Notifications</span>';
				inner += '<span class="' + __core.createClass( 'notifications__button__gauge' ) + '">0</span>';
				inner += '</button>';
				inner += '<div class="' + __core.createClass( 'notifications__all' ) + '">';
				inner += '<header class="' + __core.createClass( 'notifications__all__header' ) + '">';
				inner += '<h4>Notifications</h4>';
				inner += '<button class="' + __core.createClass( 'notifications__all__close' ) + ' ' + __core.createClass( 'button' ) + '">';
				inner += '<span class="' + __core.createClass( 'button__icon cico cico-x' ) + '"></span>';
				inner += '<span class="' + __core.createClass( 'button__tooltip' ) + '">' + __cometi18n.ui.close + '</span>';
				inner += '<p>';
				inner += '<button class="' + __core.createClass( 'notifications__all__clear' ) + '">' + __cometi18n.ui.clearNx + '</button>';
				inner += '</p>';
				inner += '</header>';
				inner += '<section class="' + __core.createClass( 'notifications__all__list' ) + '"></section>';
				inner += '</div>';
				inner += '</section>';

				inner += '<section class="' + __core.createClass( 'elements' ) + '">';
				inner += '<div class="' + __core.createClass( 'elements__searchbox' ) + ' ' + expand + '">';
				inner += '<input type="text" class="' + __core.createClass( 'elements__searchbox__bar' ) + '" value="" placeholder="' + __cometi18n.ui.search + '" />';
				inner += '<span class="' + __core.createClass( 'elements__searchbox__icon cico cico-search' ) + '"></span>';
				inner += '</div>';
				inner += '<div class="' + __core.createClass( 'elements__list' ) + '"></div>';
				inner += '</section>';

				inner += '<footer class="' + __core.createClass( 'footer' ) + '"></footer>';

				cockpit.innerHTML = inner;

				section.header = cockpit.children[0];
				section.notifications = cockpit.children[1];
				section.elements = cockpit.children[2];
				section.footer = cockpit.children[3];

				initElements( section.elements.lastChild );
				initButtons( section.footer );
				node( section.header.firstChild ).on( 'click', __core.events.toggle );

				editor.appendChild( fragment );

			},

			destroy: function(){

				if( !__core.nodeExists.cockpit() ){
					return false;

				}
				__cockpit.node.parentNode.removeChild( __cockpit.node );
				return true;

			}


		}

	};

	if( !editor ){
		return false;

	}
	__core.events.create();

	return {
		target: __cockpit.node,
		destroy: __core.events.destroy,
		toggle: __core.events.toggle

	};


}