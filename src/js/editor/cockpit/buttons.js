import dialog from '../../utils/dialog.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
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
				event: function(){

				}

			},

			settings: {
				title: __cometi18n.ui.settings,
				icon: 'cico-cog',
				event: utils.generalSettings().toggle

			},

			notifications: {
				title: __cometi18n.ui.notifications,
				icon: 'cico-exclamation',
				expand: true,
				event: utils.notifications().toggle

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

		create: function(){
			const slug = 'comet';
			const buttons = __core.buttons;
			var b, tmp;

			function button( title, icon, expand ){
				const btn = _d.createElement( 'button' );
				btn.className = __classes.button + ( utils.isBool( expand ) && expand ? ' ' + __classes.expand : '' );
				btn.setAttribute( 'aria-label', title );
				btn.innerHTML = '<span class="' + __classes.icon + ' cico ' + icon + '"></span><span class="' + __classes.title + '"><span>' + title + '</span></span>';

				return btn;

			}


			for( b in buttons ){
				tmp = button( utils.trim( buttons[b].title ), utils.trim( buttons[b].icon ), buttons[b].expand );
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