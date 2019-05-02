import sanitize from '../../utils/sanitize.js';
import notification from '../notification.js';
import message from '../../utils/message.js';
import modal from '../../utils/modal.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import ajax from '../../utils/ajax.js';
import __data from '../data.js';

export default {

	save: function( ev ){

		var is_saving = false;

		const _d = document;

		const __core = {

			toggle: function( button, state ){
				const waitwhile = 'comet-waitwhile';
				const _button = node( button );

				if( !_button.isNode() ){
					return;

				}

				if( utils.isBool( state ) && state ){
					_button.addClass( waitwhile );
					return;

				}
				_button.removeClass( waitwhile );

			},

			catch_data: function(){
				const form = _d.getElementById( 'comet-postSettings' );
				const n_names = [ 'input', 'select', 'textarea' ];
				const i_types = [ 'text', 'number', 'range', 'hidden', 'date', 'color', 'checkbox', 'radio', 'email', 'image', 'file', 'month', 'password', 'search', 'tel', 'time', 'url', 'week' ];
				const f_data = {};
				var fields, field, a, index;

				if( !node( form ).isNode() || form.nodeName.toLowerCase() !== 'form' || ( fields = form.elements ).length < 1 ){
					return f_data;

				}

				for( a = 0; a < fields.length; a++ ){

					if( !node( field = fields[a] ).isNode() || ( index = n_names.indexOf( field.nodeName.toLowerCase() ) ) < 0 ){
						continue;

					}

					if( utils.isStringEmpty( field.name ) ){
						continue;

					}

					if( index === 0 && i_types.indexOf( field.type.toLowerCase() ) < 0 ){
						continue;

					}
					f_data[field.name] = utils.encode_chars( field.value );

				}

				return f_data;

			}

		};
		ev.preventDefault();

		(function(){
			var id, e_data;

			if( !( id = parse.id( __cometdata.post_id ) ) || is_saving ){
				return;

			}
			is_saving = true;
			__core.toggle( ui, true );
			e_data = __core.catch_data();
			e_data.meta = __data().getData();
			e_data.post_content = sanitize.content();

			ajax({
				do: 'save',
				id: id,
				data: utils.json_encode( e_data )

			}).done(function( r ){
				var code = 400;
				var msg = __cometi18n.messages.error.savePost;

				if( parseInt( r ) > 0 ){
					msg = __cometi18n.messages.success.savePost;
					code = 200;

				}
				notification( msg, code );
				is_saving = false;
				__core.toggle( ui, false );

			});

		})();

	},

	saveAs: function( ev, ui ){


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
		ev.preventDefault();

		(function(){

			var mod = false;
			var content, inner, form;

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
		})();

	}

};