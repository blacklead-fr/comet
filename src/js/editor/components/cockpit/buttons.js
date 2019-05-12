import { generalSettings as GeneralSettings, notifications as Notifications } from '../stored.js';
import { isNode, isBool, isObject, isFunction } from '../../../utils/is.js';
import dialog from '../../../utils/dialog.js';
import node from '../../../dom/element.js';
import device from './device.js';
import evSave from './save.js';

export default function( parentNode ){

	const _d = document;

	const className = 'comet-cockpit__footer';

	const __classes = {
		main: className,
		expand: 'comet-cockpit__expand',
		button: className + '__button',
		icon: className + '__button__icon',
		title: className + '__button__title',

	};

	const __core = {

		buttons: {

			responsive: {
				title: __cometi18n.ui.desktop,
				icon: 'cico-desktop',
				dataset: {
					device: 'desktop'
				},
				event: device

			},

			settings: {
				title: __cometi18n.ui.settings,
				icon: 'cico-cog',
				event: GeneralSettings().toggle

			},

			notifications: {
				title: __cometi18n.ui.notifications,
				icon: 'cico-exclamation',
				expand: true,
				event: Notifications().toggle

			},

			saveAs: {
				title: __cometi18n.ui.sTemplate,
				icon: 'cico-dir-upload',
				expand: true,
				event: evSave.saveAs

			},

			save: {
				title: __cometi18n.ui.save,
				icon: 'cico-update',
				event: evSave.save

			},

			exit: {
				title: __cometi18n.ui.exit,
				expand: true,
				icon: 'cico-power',
				event: function( ev ){

					ev.preventDefault();

					dialog({

						message: __cometi18n.messages.warning.exit,

						confirm: function(){

							window.location.replace( __cometdata.dashboard_url );

						}

					});
					
				}

			},

		},

		button: function( data ){
			const button = _d.createElement( 'button' );
			var a;

			button.className = __classes.button + ( isBool( data.expand ) && data.expand ? ' ' + __classes.expand : '' );
			button.setAttribute( 'aria-label', data.title );
			button.innerHTML = '<span class="' + __classes.icon + ' cico ' + data.icon + '"></span><span class="' + __classes.title + '"><span>' + data.title + '</span></span>';

			if( isObject( data.dataset ) ){

				for( a in data.dataset ){
					button.dataset[a] = data.dataset[a];

				}

			}

			if( isFunction( data.event ) ){
				node( button ).on( 'click', data.event );

			}
			return button;

		},

		create: function(){
			var b, tmp;

			for( b in __core.buttons ){
				tmp = __core.button(  __core.buttons[b] );
				parentNode.appendChild( tmp );

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