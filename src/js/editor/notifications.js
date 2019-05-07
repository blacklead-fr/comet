import _global from '../utils/global.js';
import utils from '../utils/utils.js';
import node from '../utils/node.js';

export default function(){

	const _d = document;

	const slug = 'notifications';

	const editor = utils.getNode( 'editor' );

	const __global = _global();

	const __data = {
		target: null,
		open: false,
		classes: [],
		notifications: null

	};

	const __core = {

		createClass: function( name ){
			const prefix = 'comet';
			var tmp;

			if( !utils.isString( name ) ){
				return false;

			}

			if( __data.classes.indexOf( tmp = prefix + '-' + utils.trim( name ) ) > -1 ){
				return tmp;

			}
			__data.classes[__data.classes.length] = tmp;
			return tmp;

		},

		events: {

			toggle: function( ev ){
				const c_open = __core.createClass( slug + '--open' );
				var _target;

				if( utils.isObject( ev ) ){
					ev.preventDefault();

				}

				if( !( ( _target = node( __data.target ) ).isNode() ) ){
					return false;

				}

				if( _target.hasClass( c_open ) && __data.open ){
					_target.removeClass( c_open );
					__data.open = false;
					return;

				}
				_target.addClass( c_open );
				__data.open = true;

			},

			destroy: function(){

				if( __data.target === null || __data.target.parentNode === null ){
					return false;

				}
				__data.target.parentNode.removeChild( __data.target );
				__global.unset( slug );

			},

			add: function( note, status ){
				var mainClass, notification, inner;

				if( !utils.isString( note ) ){
					return false;

				}

				switch( parseInt( status ) ){
					case 100:
					status = 'note';
					break;
					case 200:
					status = 'success';
					break;
					case 300:
					status = 'warning';
					break;
					default:
					status = 'error';

				}
				mainClass = __core.createClass( slug + '__list__note' );
				notification = _d.createElement( 'div' );
				notification.className = mainClass + ' ' + mainClass + '--' + status;

				inner = '<p class="' + mainClass + '__text">' + note + '</p>';
				inner += '<button class="' + mainClass + '__remove" aria-label="' + __cometi18n.ui.remove + '">';
				inner += '<span class="' + mainClass + '__remove__icon cico cico-x"></span>';
				inner += '<span class="' + mainClass + '__remove__tooltip">' + __cometi18n.ui.remove + '</span>';
				inner += '</button>';

				notification.innerHTML = inner;

				__data.notifications.appendChild( notification );

				node( notification.lastChild ).on( 'click', __core.events.remove );

				__core.events.toggle();

			},

			remove: function( ev, ui ){
				const notification = ui.parentNode;
				ev.preventDefault();

				if( notification === null || notification.parentNode === null ){
					return;

				}
				notification.parentNode.removeChild( notification );

			},

			clear: function( ev ){
				ev.preventDefault();
				__data.notifications.innerHTML = '';

			}

		}

	};

	const __rData = {
		target: null,
		toggle: __core.events.toggle,
		destroy: __core.events.destroy,
		add: __core.events.add

	};

	if( !editor ){
		return false;

	}

	(function(){
		const fragment = _d.createDocumentFragment();
		const wrap = _d.createElement( 'div' );
		const mainClass = __core.createClass( slug );
		const buttonClass = __core.createClass( slug + '__close' );
		var inner;

		fragment.appendChild( wrap );

		inner = '<header class="' + mainClass + '__header">';
		inner += '<h4>' + __cometi18n.ui.notifications + '</h4>';
		inner += '<button class="' + buttonClass + '">';
		inner += '<span class="' + buttonClass + '__icon cico cico-x"></span>';
		inner += '<span class="' + buttonClass + '__tooltip">' + __cometi18n.ui.close + '</span>';
		inner += '</button>';
		inner += '<p>';
		inner += '<button class="' + mainClass + '__clear">' + __cometi18n.ui.clearNx + '</button>';
		inner += '</p>';
		inner += '</header>';
		inner += '<section class="' + mainClass + '__list"></section>';

		wrap.className = mainClass;
		wrap.innerHTML = inner;


		__data.target = wrap;
		__rData.target = wrap;
		__data.notifications = wrap.lastChild;
		__global.set( slug, __rData, true );

		node( wrap.firstChild.children[1] ).on( 'click', __core.events.toggle );
		node( wrap.firstChild.lastChild.lastChild ).on( 'click', __core.events.clear );

		editor.appendChild( fragment );

	})();

	return __rData;
	
}