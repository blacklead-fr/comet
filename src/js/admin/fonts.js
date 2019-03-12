import message from '../utils/message.js';
import modal from '../utils/modal.js';
import utils from '../utils/utils.js';
import parse from '../utils/parse.js';
import ajax from '../utils/ajax.js';
import node from '../utils/node.js';

/* global document, __cometi18n, __cometdata, console */

export default function(){

	const _d = document;

	const __core = {

		data: {
			collection: [],
			counter: false,
			loadInfo: false,
			fontsBox: false,
			modal: false,
			isImporting: false,

		},

		file: function( entry ){

			const __file = {

				counter: {
					length: 0,
					count: 0,
					failed: 0

				},

				catch: {

					url: function(){
						var url;

						const __try = {

							regex: {
								import: /@import\s+url\(\s*\'?\"?([^'")]+)\'?\"?\s*\)\s*;/i,
								link: /<link[^>]*href="?'?([^'"]+)'?"?[^>\/]*\/?>/i,
							},

							matching: function( type ){
								var m;

								type = utils.isString( type ) ? utils.trim( type.toLowerCase() ) : false;

								return ( !type || !( type in __try.regex ) || ( m = entry.match( __try.regex[type] ) ) === null || !utils.isString( m[1] ) ? false : utils.trim( m[1] ) );


							},

							import: function(){
								return __try.matching( 'import' );

							},

							link: function(){
								return __try.matching( 'link' );

							}

						};

						return ( utils.isString( entry ) ? ( !( url = __try.link() ) ? ( !( url = __try.import() ) ? false : url ) : url ) : false );

					},

					fonts: function( raw ){

						const __try = {

							regex: {
								fontFace: /@font-face\s*\{[^}]+\}/gmi,
								fontFamily: /font-family\:\s*(?:'|")?([^'";]+)(?:'|")?\s*;/i,
								fontWeight: /font-weight\:\s*([a-z0-9\s]+)\s*;/i
							},

							matching: function( _raw, type ){
								var m;

								type = utils.isString( type ) ? utils.trim( type ) : false;

								return ( !utils.isString( _raw ) || !type || !( type in __try.regex ) || ( m = _raw.match( __try.regex[type] ) ) === null ? false : m );


							},

							fontFace: function( _raw ){
								const m = __try.matching( _raw, 'fontFace' );
								return ( !m || m.length < 1 ? false : m );

							},

							fontFamily: function( _raw ){
								const m = __try.matching( _raw, 'fontFamily' );
								return ( !m || !utils.isString( m[1] ) ? false : utils.trim( m[1] ) );

							},

							fontWeight: function( _raw ){
								const m = __try.matching( _raw, 'fontWeight' );
								return ( !m ? false : __fonts.sanitizeWeight( m[1] ) );

							}

						};

						const __fonts = {

							names: [],

							fonts: [],

							get: function(){
								var ff, i, wei, fam, index;

								if( !( ff = __try.fontFace( raw ) ) ){
									return false;

								}

								for( i = 0; i < ff.length; i++ ){

									if( !( wei = __try.fontWeight( ff[i] ) ) || !( fam = __try.fontFamily( ff[i] ) ) ){
										continue;

									}
									__fonts.addFont( fam, wei, ff[i] );

								}
								return __fonts.fonts;

							},

							addFont: function( family, weight, _raw ){
								var index = __fonts.names.indexOf( family );
								var __raw;

								if( index < 0 ){
									index = __fonts.fonts.length;
									__fonts.names[index] = family;
									__fonts.fonts[index] = {
										family: family,
										weight: {}
									};

								}

								if( !utils.isObject( __fonts.fonts[index].weight ) || utils.isArray( __fonts.fonts[index].weight ) ){
									__fonts.fonts[index].weight = {};

								}

								if( utils.isString( _raw ) ){
									__raw = utils.isString( __raw = __fonts.fonts[index].weight[weight] ) ? __raw : '';
									__fonts.fonts[index].weight[weight] = __raw + _raw;

								}
								return index;

							},

							sanitizeWeight: function( weight ){

								weight = utils.isString( weight ) ? utils.trim( weight.toLowerCase() ) : weight;

								switch( weight ){

									case 'thin':
									case 'hairline':
									case '100':
									case 100:
									return 100;

									case 'extra light':
									case 'ultra light':
									case '200':
									case 200:
									return 200;

									case 'light':
									case '300':
									case 300:
									return 300;

									case 'normal':
									case '400':
									case 400:
									return 400;

									case 'medium':
									case '500':
									case 500:
									return 500;

									case 'semi bold':
									case 'demi bold':
									case '600':
									case 600:
									return 600;

									case 'bold':
									case '700':
									case 700:
									return 700;

									case 'extra bold':
									case 'ultra bold':
									case '800':
									case 800:
									return 800;

									case 'black':
									case 'heavy':
									case '900':
									case 900:
									return 900;

									default:
									return false;

								}


							}

						};

						return utils.isString( raw ) ? __fonts.get() : false;

					}


				},

				call: function( file ){
					const rawFile = new XMLHttpRequest();

					rawFile.open( 'GET', file, true );
					rawFile.onreadystatechange = function(){
						var response, i, args, gdata;
						
						if( rawFile.readyState !== 4 ){
							return;

						}

						if( rawFile.status === 200 || rawFile.status == 0 ){
							response = __file.catch.fonts( rawFile.responseText );

							if( utils.isArray( response ) ){
								__file.counter.length = response.length;
								__file.counter.count = response.length;
								__file.counter.failed = 0;

								for( i = 0; i < response.length; i++ ){

									args = {
										post_title: response[i].family,
										post_type: 'comet_fonts',
										post_status: 'publish',
										meta: response[i]
									};

									if( utils.isObject( gdata = __core.utils.getFontData( response[i].family ) ) ){
										__file.save( args, gdata.data.id, gdata.index );
										continue;

									}
									__file.save( args );

								}
								return;

							}

						}
						__core.actions.set.state( false );

						if( !__core.utils.isMessagesBox() ){
							return;

						}
						message( __cometi18n.messages.error.noFont, 400 ).set( __core.data.modal.fontBoxUi.messagesBox );

					}
					rawFile.send( null );

				},

				save: function( font, id, index ){
					const _data = {
						do: 'save',
						data: utils.json_encode( font )

					};

					if( id > 0 ){
						_data.id = id;

					}

					ajax( _data ).done(function( response ){
						var args;
						__file.counter.count--;

						if( ( id = parseInt( response ) ) < 1 ){
							__file.counter.failed++;

							if( __core.utils.isMessagesBox() ){
								message( 'Failed to import ' + __file.counter.failed + '/' + __file.counter.length + ' fonts.', 400 ).set( __core.data.modal.fontBoxUi.messagesBox );

							}

						}else{
							args = {
								id: id,
								family: font.post_title,
								weight: font.meta.weight
							};

							if( index < 0 ){
								index = __core.data.collection.length;
								__core.actions.addCard( args );

							}
							__core.data.collection[index] = args;
							__core.actions.addCss( args );

						}

						if( __file.counter.count < 1 ){
							__core.data.isImporting = false;
							__core.data.modal.destroy();

						}


					});

				},

			};

			var r_url;

			if( !( r_url = __file.catch.url() ) ){
				__core.actions.set.state( false );
				message( __cometi18n.messages.error.unreachFont, 400 ).set( __core.data.modal.fontBoxUi.messagesBox );
				return;

			}
			__file.call( r_url );


		},

		utils: {

			resourceTypes: {
				google: 'Google Fonts',
				typeKit: 'TypeKit',
				typography: 'Typography.com (H&Co)',
				custom: __cometi18n.ui.custom

			},

			is_resource: function( value ){
				return ( utils.isString( value ) && value in __core.utils.resourceTypes );

			},

			isMessagesBox: function(){
				return ( !__core.data.modal && node( __core.data.modal.fontBoxUi.messagesBox ).isNode() );

			},

			getFontData: function( entry ){
				var collection, i, isId;

				__core.data.collection = !utils.isArray( __core.data.collection ) ? [] : __core.data.collection;
				collection = __core.data.collection;
				entry = ( isId = entry > 0 ) || utils.isString( entry ) ? entry : false;

				if( false ){
					return false;

				}

				for( i = 0; i < collection.length; i++ ){

					if( ( isId && entry === parseInt( collection[i].id ) ) || ( collection[i].family === entry ) ){
						return {
							index: i,
							data: collection[i]
						};

					}

				}
				return false;

			}

		},

		actions: {

			add: function( ev ){
				const fragment = _d.createDocumentFragment();
				const wrapper = _d.createElement( 'div' );
				var inner, wfields;

				ev.preventDefault();

				wrapper.className = 'comet-savebox comet-wrapper';

				fragment.appendChild( wrapper );

				inner = '<div class="comet-messages comet-wrapper"></div>';

				inner += '<div class="comet-saveform">';
				inner += '<label>';
				inner += '<p>' + __cometi18n.ui.resource + '</p>';
				inner += '<select class="comet-input comet-capture" name="resource">';
				inner += '<option value="google">Google Fonts</option>';
				inner += '<option value="typeKit">TypeKit</option>';
				inner += '<option value="typography">Typography.com (H&Co)</option>';
				//inner += '<option value="custom">' + __cometi18n.ui.custom + '</option>';
				inner += '</select>';
				inner += '</label>';

				inner += '<label>';
				inner += '<p>' + __cometi18n.ui.embed + '</p>';
				inner += '<textarea class="comet-input comet-capture" name="embed"></textarea>';
				inner += '</label>';

				inner += '<button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.import + '">' + __cometi18n.ui.import + '</button>';
				inner += '</div>';
				wrapper.innerHTML = inner;

				wfields = wrapper.lastChild.children;

				node( wrapper.lastChild.lastChild ).on(
					'click',
					__core.actions.import,
					{
						resource: wfields[0].lastChild,
						embed: wfields[1].lastChild
					}
					);

				__core.data.modal = modal({
					classes: 'comet-fontbox',
					header: '<h4>' + __cometi18n.ui.addFont + '</h4>',
					content: fragment,
					done: function(){

						if( __core.data.isImporting ){
							return 1;

						}
						__core.data.modal = false;

					}

				});

				__core.data.modal.fontBoxUi = {
					box: wrapper,
					import: wrapper.lastChild.lastChild,
					messagesBox: wrapper.firstChild

				};


			},

			remove: function( ev, ui, _data ){

				ev.preventDefault();

				ajax({
					do: 'dtemplate',
					id: _data.id

				}).done(function( response ){
					var gdata;

					if( parseInt( response ) === 1 ){

						if( _data.card.parentNode !== null ){
							_data.card.parentNode.removeChild( _data.card );

						}

						if( utils.isObject( gdata = __core.utils.getFontData( _data.id ) ) ){
							delete __core.data.collection[gdata.index];

						}
						__core.actions.set.counter();
						__core.actions.set.loadTime();

					}

				});


			},

			import: function( ev, ui, _data ){

				ev.preventDefault();

				if( __core.data.isImporting ){
					return;

				}
				__core.actions.set.state( true );

				if( !__core.utils.is_resource( _data.resource.value ) ){
					//@TODO: error
					return;

				}

				if( !utils.isString( _data.embed.value ) ){
					//@TODO: error
					return;

				}
				__core.file( _data.embed.value );

			},

			set: {
				counter: function(){
					const count = __core.data.collection.length;

					if( count === 1 ){
						__core.data.counter.innerHTML = count + ' font family';
						return;
						
					}
					__core.data.counter.innerHTML = count + ' font families';

				},

				loadTime: function(){
					const count = __core.data.collection.length;
					var state = 'Slow';
					var classes = 'comet-gauge comet-indicator'

					if( count <= 2 ){
						state = 'Fast';
						classes += ' is-fast';


					}else if( count <= 4 ){
						state = 'Moderate';
						classes += ' is-moderate'; 

					}else{
						state = 'Slow';
						classes += ' is-slow';

					}
					__core.data.loadInfo.className = classes;
					__core.data.loadInfo.innerHTML = 'Load time: ' + state;

				},

				state: function( importing ){
					const button = __core.data.modal.fontBoxUi.import;
					const _button = node( button );
					importing = ( utils.isBool( importing ) && importing );
					__core.data.isImporting = importing;

					if( !_button.isNode() ){
						return false;

					}

					if( importing ){
						_button.addClass( 'comet-waitwhile' );
						button.innerHTML = '<span class="cico cico-spin"></span>';
						return true;

					}
					_button.removeClass( 'comet-waitwhile' );
					button.innerHTML = __cometi18n.ui.import;
					return true;

				}

			},

			addCard: function( data ){
				const fragment = _d.createDocumentFragment();
				const card = _d.createElement( 'div' );
				const name = utils.isObject( data ) && utils.isString( data.family ) ? data.family : false;
				var inner, count;

				if( !name ){
					return;

				}
				count = utils.isArray( data.weight ) ? data.weight.length : ( utils.isObject( data.weight ) ? Object.keys( data.weight ).length : 0 );
				fragment.appendChild( card );
				inner = '<div class="comet-previewbox comet-sampletext">';
				inner += '<p class="comet-inner comet-text" style="font-family:' + name + ';">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
				inner += '</div>';
				inner += '<div class="comet-info comet-wrapper">';
				inner += '<div class="comet-fontinfo">';
				inner += '<span class="comet-fontname">' + utils.capitalize( name ) + '</span>';
				inner += '<span class="comet-fontstyle">' + ( count === 1 ? '1 style' : count + ' styles' ) + '</span>';
				inner += '</div>';
				inner += '<div class="comet-actions comet-ui">';
				inner += '<button class="comet-button" title="' + __cometi18n.ui.delete + '"><span class="cico cico-trash"></span></button>';
				inner += '</div>';
				inner += '</div>';
				card.className = 'comet-font comet-wrapper comet-card';
				card.innerHTML = inner;

				node( card.lastChild.lastChild.firstChild ).on( 'click', __core.actions.remove, { card: card, id: data.id } );

				__core.data.fontsBox.appendChild( card );


			},

			addCss: function( data ){
				var css, inner, i;

				if( !utils.isObject( data ) || !utils.isObject( data.weight ) ){
					return;

				}
				inner = '';

				for( i in data.weight ){

					if( utils.isString( data.weight[i] ) ){
						inner += data.weight[i];

					}

				}
				css = _d.createElement( 'style' );
				css.type = 'text/css';
				css.innerHTML = inner;
				_d.head.appendChild( css );

			}

		}

	};

	(function(){
		const source = _d.getElementById( 'comet-sourceframe8679171600336466' );
		var fragment, wrapper, header, h_inner, body, i;

		if( source === null || source.parentNode === null ){
			return;

		}
		__core.data.collection = utils.isArray( __cometdata.fonts ) ? __cometdata.fonts : [];
		fragment = _d.createDocumentFragment();
		header = _d.createElement( 'div' );
		header.className = 'comet-header comet-top comet-wrapper';

		h_inner = '<div class="comet-column">';
		h_inner += '<h4></h4>';
		h_inner += '<span class="comet-gauge comet-indicator is-slow"></span>';
		h_inner += '</div>';
		h_inner += '<div class="comet-column">';
		h_inner += '<button class="comet-button comet-buttonPrimary" title="' + __cometi18n.ui.addFont + '"><span class="cico cico-plus"></span></button>';
		h_inner += '</div>';

		header.innerHTML = h_inner;

		body = _d.createElement( 'div' );
		body.className = 'comet-body comet-fontslist comet-wrapper';

		fragment.appendChild( header );
		fragment.appendChild( body );

		node( header.lastChild.firstChild ).on( 'click', __core.actions.add );

		__core.data.counter = header.firstChild.firstChild;
		__core.data.loadInfo = header.firstChild.lastChild;
		__core.data.fontsBox = body;

		if( __core.data.collection.length > 0 ){

			for( i = 0; i < __core.data.collection.length; i++ ){
				__core.actions.addCard( __core.data.collection[i] );
				__core.actions.addCss( __core.data.collection[i] );

			}
			console.log( __core.data.collection );

		}else{
			body.innerHTML = 'coucou';

		}

		source.parentNode.replaceChild( fragment, source );
		__core.actions.set.loadTime();
		__core.actions.set.counter();


	})();

}