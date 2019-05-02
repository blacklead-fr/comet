import dialog from '../../utils/dialog.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import library from './library.js';
import evSave from './save.js';

export default function( parentNode ){

	const _d = document;

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
				event: function( ev ){
					const pit = utils.getNode( 'generalSettings' );
					const toggled = 'is_toggled';
					var _pit;

					ev.preventDefault();

					if( !pit || !( ( _pit = node( pit ) ).isNode() ) ){
						return false;

					}

					if( _pit.hasClass( toggled ) ){
						_pit.removeClass( toggled );
						return;

					}
					_pit.addClass( toggled );
					
				}

			},

			templates: {
				title: __cometi18n.ui.templates,
				icon: 'cico-directory',
				event: library

			},

			saveAs: {
				title: __cometi18n.ui.sTemplate,
				icon: 'cico-dir-upload',
				event: evSave.saveAs

			},

			save: {
				title: __cometi18n.ui.save,
				icon: 'cico-update',
				event: evSave.save

			},

			exit: {
				title: __cometi18n.ui.exit,
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

			function button( title, icon ){
				const btn = _d.createElement( 'button' );
				btn.className = 'comet-footer__button comet-button';
				btn.setAttribute( 'aria-label', title );
				btn.innerHTML = '<span class="comet-footer__button__icon cico ' + icon + '"></span><span class="comet-footer__button__title">' + title + '</span>';

				return btn;


			}


			for( b in buttons ){

				if( !( b in __cometi18n.cockpit.options ) ){
					continue;

				}
				tmp = button( utils.trim( buttons[b].title ), utils.trim( buttons[b].icon ) );
				parentNode.appendChild( tmp );

				if( utils.isFunction( buttons[b].event ) ){
					node( ui ).on( 'click', buttons[b].event );

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