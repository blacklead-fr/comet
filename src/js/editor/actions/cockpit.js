import sanitize from '../../utils/sanitize.js';
import notification from '../notification.js';
import message from '../../utils/message.js';
import dialog from '../../utils/dialog.js';
import modal from '../../utils/modal.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import ajax from '../../utils/ajax.js';
import template from './template.js';
import __data from '../data.js';

/* global document, window, __cometi18n, __cometdata */

const cockpit = {

	toggle: function( _n ){

		node( _n ).on( 'click', function( ev ){
			const pit = utils.getNode( 'cockpit' );
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

		});

	},

	settings: function( _n ){

		node( _n ).on( 'click', function( ev ){
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

		});

	},

	save: function( _n ){

		var is_saving = false;

		const _d = document;

		const __core = {

			toggle: function( button, saving ){
				const waitwhile = 'comet-waitwhile';
				const _button = node( button );

				if( !_button.isNode() ){
					return;

				}

				if( utils.isBool( saving ) && saving ){
					_button.addClass( waitwhile );
					button.innerHTML = '<span class="cico cico-spin"></span>';
					return;

				}
				_button.removeClass( waitwhile );
				button.innerHTML = __cometi18n.ui.save;

			},

			open: function( ev ){
				var mod = false;
				var content, inner, form;

				ev.preventDefault();

				content = _d.createElement( 'div' );
				content.className = 'comet-savebox comet-wrapper';

				inner = '<p>' + __cometi18n.messages.stemplate + ' <a href="' + utils.escUrl( 'https://blacklead.fr/support/docs/comet/my-templates/' ) + '" target="_blank">' + __cometi18n.messages.rmtemplate + '</a>.</p>';
				inner += '<div class="comet-saveform">';
				inner += '<input type="text" class="comet-input comet-ui" placeholder="' + __cometi18n.ui.tempname + '" />';
				inner += '<button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.save + '">' + __cometi18n.ui.save + '</button>';
				inner += '</div>';

				content.innerHTML = inner;

				mod = modal({
					classes: 'comet-save-template',
					header: '<h4>' + __cometi18n.ui.saveTemplate + '</h4>',
					content: content

				});

				form = content.lastChild;

				node( form.lastChild ).on( 'click', __core.save, { input: form.firstChild, modal: mod } );

			},

			save: function( ev, ui, edata ){
				const metaData = __data().getData();
				var m = '';
				var _message, val, pp;
				
				ev.preventDefault();

				if( !utils.isObject( edata ) || is_saving ){
					return;

				}
				is_saving = true;
				__core.toggle( ui, true );

				if( !node( edata.input ).isNode() ){
					m = __cometi18n.messages.error.savePost + '<br>';

				}

				if( !utils.isObject( metaData ) || utils.isStringEmpty( metaData._sections ) ){
					m = __cometi18n.messages.error.noContent + '<br>';

				}

				if( !utils.isString( val = edata.input.value ) || ( val = utils.trim( utils.stripTags( val ) ) ).length < 1 ){
					m += __cometi18n.messages.error.title;

				}

				if( m.length > 0 ){

					if( ui.parentNode !== null && ( pp = ui.parentNode.parentNode ) !== null ){
						_message = message( m, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );

					}
					is_saving = false;
					__core.toggle( ui, false );
					return;

				}

				ajax({
					do: 'save',
					data: utils.json_encode({
						post_title: utils.encode_chars( val ),
						meta: metaData,
						post_content: sanitize.content(),
						post_type: 'comet_mytemplates',
						post_status: 'publish'

					})

				}).done( function( r ){
					var code = 400;
					var msg = __cometi18n.messages.error.savePost;

					is_saving = false;
					__core.toggle( ui, false );

					if( parseInt( r ) > 0 ){
						msg = __cometi18n.messages.success.savePost;
						code = 200;

					}
					edata.modal.destroy();
					notification( msg, code );


				});

			},

		};

		node( _n ).on( 'click', __core.open );

	},

	lib: template,

	exit: function( _n ){

		node( _n ).on( 'click', function( ev ){
			ev.preventDefault();

			dialog({

				message: __cometi18n.messages.warning.exit,

				confirm: function(){

					window.location.replace( __cometdata.dashboard_url );

				}

			});
		} );

	},

};

export default cockpit;
