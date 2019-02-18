import message from '../utils/message.js';
import dialog from '../utils/dialog.js';
import modal from '../utils/modal.js';
import utils from '../utils/utils.js';
import parse from '../utils/parse.js';
import node from '../utils/node.js';
import ajax from '../utils/ajax.js';

export default function(){

	const _d = document;

	const _w = window;

	const _u = {

		message: function( text, type ){
			const m = _d.createElement( 'p' );
			m.className = 'comet-message comet-' + type;
			m.innerHTML = text;
			return m;

		},

		icons: {
			wait: '<span class="comet-waitWhileIcon cico cico-spin"></span>',
			arrow: '<span class="cico cico-arrow-right-alt"></span>'

		}


	};

	const __ = {

		create: function(){

			var is_saving = false;

			const nt = _d.getElementById( 'comet-newTemplate' );

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
					button.innerHTML = __cometi18n.ui.create;

				},

				open: function( ev, ui ){
					ev.preventDefault();
					const fragment = _d.createDocumentFragment();
					const wrapper = _d.createElement( 'div' );
					var inner;

					wrapper.className = 'comet-savebox comet-wrapper';

					fragment.appendChild( wrapper );

					inner = '<div class="comet-saveform">';
					inner += '<input type="text" class="comet-input" value="" placeholder="' + __cometi18n.ui.name + '" />';
					inner += '<button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.create + '">' + __cometi18n.ui.create + '</button>';
					inner += '</div>';
					wrapper.innerHTML = inner;

					node( wrapper.lastChild.lastChild ).on( 'click', __core.save, wrapper.lastChild.firstChild );

					modal({
						classes: 'comet-newtemplatebox',
						header: '<h4>' + __cometi18n.ui.newTemplate + '</h4>',
						content: fragment

					});

				},

				save: function( ev, ui, input ){
					ev.preventDefault();
					var name, _message, pp;

					if( is_saving || !node( input ).isNode() || input.parentNode === null || ( pp = input.parentNode.parentNode ) === null ){
						return;

					}
					is_saving = true;
					__core.toggle( ui, true );

					if( !utils.isString( name = input.value ) || utils.isStringEmpty( name = utils.trim( utils.stripTags( name ) ) ) ){
						_message = message( __cometi18n.messages.error.title, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );
						is_saving = false;
						__core.toggle( ui, false );
						return;

					}
					return;

					ajax({
						do: 'save',
						data: JSON.stringify({
							post_title: name,
							post_type: 'comet_mytemplates',
							post_content: '',
							meta: {},
							post_status: 'publish'
						})

					}).done(function( r ){
						var url, msg;

						is_saving = false;
						__core.toggle( ui, false );

						if( parseInt( r ) > 0 ){
							url = utils.addQueryArgs( { post: r, action: 'edit', comet: 'template'  }, __cometdata.edit_url );
							msg = __cometi18n.messages.success.newTemplate + '<br>' + __cometi18n.messages.redirect;
							msg += ' <a href="' + encodeURI( url ) + '">' + __cometi18n.messages.editPage + '</a>.';
							message( msg, 200 ).set( pp );
							_w.open( url, '_self' );
							return;

						}
						_message = message( __cometi18n.messages.error.default, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );


					});

				}

			};

			node( nt ).on( 'click', __core.open );

		},

		delete: function(){

			var isDeleting = false;

			const nt = _d.getElementsByClassName( 'comet-templateDelete' );

			const prop = {

				open: function( ev, ui ){
					ev.preventDefault();
					var msg = false;
					var id;

					if( !( id = parse.dataset( ui, 'id' ) ) || !( id = parse.id( id ) ) ){
						msg = __cometi18n.messages.error.noTemplate;

					}
					dialog({
						message: ( !msg ? __cometi18n.messages.warning.delete : msg ),
						confirm: prop.delete,
						data: {
							id: id,
							node: ui.parentNode.parentNode,
							error: ( !msg ? false : true )
						}
					});

				},

				delete: function( ev, ui, data ){
					ev.preventDefault();

					if( isDeleting || !utils.isObject( data ) || ( utils.isBool( data.error ) && data.error ) ){
						return;

					}
					isDeleting = true;
					data.dialog.destroy();

					ajax({
						do: 'dtemplate',
						id: data.id

					}).done(function( r ){
						isDeleting = false;

						if( [ 'false', 'FALSE', '0', 0 ].indexOf( r ) > -1 ){
							return;

						}
						_w.location.reload( true );

					});


				}

			};

			node( nt ).on( 'click', prop.open );

		},

		import: function(){

			var isImporting = false;

			const nt = _d.getElementById( 'comet-importTemplateBtn' );

			const prop = {

				open: function( ev, ui ){
					const input = _d.getElementById( 'comet-importTemplateFile' );
					var fragment = false;
					var wrapper;

					if( !node( input ).isNode() ){
						return;

					}
					fragment = _d.createDocumentFragment();
					wrapper = _d.createElement( 'div' );
					wrapper.innerHTML = __cometi18n.messages.selFile;
					fragment.appendChild( wrapper );

					modal({
						header: '<h4>' + __cometi18n.ui.impTemplate + '</h4>',
						content: fragment,
					});
					node( input ).on( 'change', prop.import );
					input.click();

				},

				import: function( ev, ui ){
					const files = ui.files;
					var wrapper, file, f, reader, fragment, item, d, o, id, n;

					if( !files || files.length < 1 ){
						return;

					}
					fragment = _d.createDocumentFragment();
					wrapper = ui.parentNode;
					wrapper.innerHTML = '<ul class="comet-import"></ul>';

					for( f = 0; f < files.length; f++ ){

						if( !( file = files[f] ).type.match( 'json' ) ){
							continue;

						}
						reader = new FileReader();

						item = _d.createElement( 'li' );
						item.innerHTML = escape( file.name ) + _u.icons.wait;
						fragment.appendChild( item );

						reader.onload = function( e ){
							var data;

							if( !( data = parse.json( e.target.result ) ) || !utils.isObject( data ) || !( 'title' in data ) || !utils.isObject( data.meta ) || !( 'content' in data ) ){
								return false;

							}
							data.post_type = 'comet_mytemplates';

							ajax({
								action: 'comet_ajAdmin',
								do: 'save',
								data: JSON.stringify( data )

							}).done(function( r ){
								item.lastChild.className = 'cico cico-check';

							});

						};
						reader.readAsText( file );

					}
					wrapper.firstChild.appendChild( fragment );

				}

			};

			node( nt ).on( 'click', prop.open );

		},

		export: function(){

			var isSaving = false;

			const nt = _d.getElementsByClassName( 'comet-templateExport' );

			const prop = {

				open: function( ev, ui ){
					ev.preventDefault();
					var fragment = false;
					var wrapper, inner, id;


					if(  !( id = parse.dataset( ui, 'id' ) ) || !( id = parse.id( id ) ) ){
						return;

					}
					fragment = _d.createDocumentFragment();
					wrapper = _d.createElement( 'div' );
					fragment.appendChild( wrapper );

					inner = '<input type="text" class="comet-input" value="" />';
					inner += '<button class="comet-button" title="' + __cometi18n.ui.save + '">' + _u.icons.arrow + '</button>';
					wrapper.innerHTML = inner;

					node( wrapper.lastChild ).on( 'click', prop.export, wrapper.firstChild);

					modal({
						header: '<h4>' + __cometi18n.ui.expTemplate + '</h4>',
						content: fragment,
					});
				},

				export: function( ev, ui, input ){
					ev.preventDefault();
					var msg = false;
					var wrapper, name, error;

					if( isSaving ){
						return;

					}
					ui.innerHTML = _u.icons.wait;

					if( !input || input === null ){
						msg = __cometi18n.messages.error.default;

					}else if( !utils.isString( name = input.value ) || utils.isStringEmpty( name = utils.trim( utils.stripTags( name ) ) ) ){
						msg = __cometi18n.messages.error.title;

					}

					if( !( wrapper = input.parentNode ) || wrapper === null ){
						ui.innerHTML = _u.icons.arrow;
						return;

					}
					node( wrapper.getElementsByClassName( 'comet-message' ) ).remove();

					if( msg ){
						error = _u.message( msg, 'error' );
						wrapper.appendChild( error );
						ui.innerHTML = _u.icons.arrow;
						return;

					}
					isSaving = true;

					ajax({
						action: 'comet_ajAdmin',
						do: 'get',
						id: id,

					}).done(function( r ){
						var data, uri, obj;

						isSaving = false;
						ui.innerHTML = _u.icons.arrow;

						if( !( data = parse.json( r ) ) || !utils.isObject( data ) || !( 'post_content' in data ) ){
							error = _u.message( __cometi18n.messages.error.default, 'error' );
							wrapper.appendChild( error );
							ui.innerHTML = _ui.icons.arrow;
							return;

						}

						obj = {
							title: name,
							content: data.post_content,
							meta: utils.isObject( data.meta ) ? data.meta : {},
						};
						uri = 'data:application/json;charset=utf-8,' + encodeURIComponent( JSON.stringify( obj ) );

						msg = __cometi18n.messages.success.newTemplate;
						msg += ' <a class="comet-button comet-buttonPrimary" href="' + uri + '" download="' + encodeURI( name ) + '.json">' + __cometi18n.ui.download + '</a>';
						error = _u.message( msg, 'success' );

						wrapper.innerHTML = '';
						wrapper.appendChild( error );
					});

				}

			};

			node( nt ).on( 'click', prop.open );

		},

		preview: function(){

			const nt = _d.getElementsByClassName( 'comet-templatePreview' );

			node( nt ).on( 'click', function( ev, ui ){
				ev.preventDefault();
				const url = utils.isString( ui.href ) ? utils.trim( utils.stripTags( ui.href ) ) : false;
				var inner = '<div>';

				if( !url ){
					inner += '<div class="comet-msgbox">';
					inner += '<span class="cico cico-exclamation"></span>';
					inner += '<p>' + __cometi18n.messages.error.unreach + '</p>';
					inner += '</div>';

				}else{
					inner += '<iframe src="' + encodeURI( url ) + '"></iframe>';

				}
				inner += '</div>';

				modal({
					classes: 'comet-previewbox',
					header: '<h4>' + __cometi18n.ui.pTemplate + '</h4>',
					content: inner
				});
			});

		}

	};
	__.create();
	__.delete();
	__.import();
	__.export();
	__.preview();

}