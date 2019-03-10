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
			modal: false

		},

		file: function( entry ){

			const __file = {

				catch: {

					url: function(){
						var url;

						const __regex = {
							import: /@import\s+url\(\'?\"?([^'")]+)\'?\"?\);?/i,
							link: /<link[^>]*href="?'?([^'"]+)'?"?[^>\/]*\/?>/i,
						};

						const __try = {

							matching: function( type ){
								var m;

								type = utils.isString( type ) ? utils.trim( type.toLowerCase() ) : false;

								return ( !type || !( type in __regex ) || ( m = entry.match( __regex[type] ) ) === null || !utils.isString( m[1] ) ? false : utils.trim( m[1] ) );


							},

							import: function(){
								return __try.matching( 'import' );

							},

							link: function(){
								return __try.matching( 'link' );

							}

						};

						return ( utils.isString( entry ) ? ( !( url = __try.link() ) ? ( !( __try.import() ) ? false : url ) : url ) : false );

					},

					fonts: function( raw ){

						const __try = {

							regex: {
								fontFace: /@font-face\s*\{[^}]+\}/gmi,
								fontFamily: /font-family\:\s*(?:'|")?([^'"()]+)(?:'|")?/i,
								fontWeight: /font-weight\:\s*([a-z0-9\s]+)/i
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

							toObject: function(){
								const fonts = {};
								var i = 0;

								if( __fonts.fonts.length < 1 ){
									return {};

								}

								for( i; i < __fonts.fonts.length; i++ ){

									fonts[i] = __fonts.fonts[i];

								}
								return fonts;

							},

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
						var response = '';
						
						if( rawFile.readyState !== 4 ){
							return;

						}

						if( rawFile.status === 200 || rawFile.status == 0 ){
							response = __file.catch.fonts( rawFile.responseText );
							console.log( response );
							return true;
						}
						//@TODO: error;

					}
					rawFile.send( null );

				},

				save: function(){

				},

				sanitize: function(){

				}

			};

			var r_url;

			if( !( r_url = __file.catch.url() ) ){
				console.log( 'mmee');
				return;

			}
			__file.call( r_url );


		},

		utils: {

			resourceTypes: {
				google: 'Google Fonts',
				typeKit: 'TypeKit',
				custom: __cometi18n.ui.custom

			},

			is_resource: function( value ){

				return ( utils.isString( value ) && value in __core.utils.resourceTypes );

			}

		},

		actions: {

			font: {

				is_importing: false,

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
						__core.actions.font.import,
						{
							resource: wfields[0].lastChild,
							embed: wfields[1].lastChild
						}
						);

					__core.data.modal = modal({
						classes: 'comet-fontsbox',
						header: '<h4>' + __cometi18n.ui.addFont + '</h4>',
						content: fragment,

					});


				},

				remove: function(){

				},

				import: function( ev, ui, _data ){

					ev.preventDefault();

					if( __core.actions.font.is_importing ){
						return;

					}
					__core.actions.font.is_importing = true;
					node( ui ).addClass( 'comet-waitwhile' );
					ui.innerHTML = '<span class="cico cico-spin"></span>';

					if( !__core.utils.is_resource( _data.resource.value ) ){
						return;

					}

					__core.file( _data.embed.value );

				},

			},

			set: {
				counter: function(){

				},

				loadTime: function(){

				},

			},



		}

	};

	(function(){
		const source = _d.getElementById( 'comet-sourceframe8679171600336466' );
		var fragment, wrapper, header, h_inner, body, b_inner;

		if( source === null || source.parentNode === null ){
			return;

		}
		fragment = _d.createDocumentFragment();
		header = _d.createElement( 'div' );
		header.className = 'comet-header comet-top comet-wrapper';

		h_inner = '<div class="comet-column">';
		h_inner += '<h4></h4>';
		h_inner += '<span></span>';
		h_inner += '</div>';
		h_inner += '<div class="comet-column">';
		h_inner += '<button class="comet-button comet-buttonPrimary" title="' + __cometi18n.ui.addFont + '"><span class="cico cico-plus"></span></button>';
		h_inner += '</div>';

		header.innerHTML = h_inner;

		body = _d.createElement( 'div' );
		body.className = 'comet-body comet-fontslist comet-wrapper';
		body.innerHTML = 'coucou';

		fragment.appendChild( header );
		fragment.appendChild( body );

		node( header.lastChild.firstChild ).on( 'click', __core.actions.font.add );

		__core.data.counter = header.firstChild.firstChild;
		__core.data.loadInfo = header.firstChild.lastChild;

		source.parentNode.replaceChild( fragment, source );


	})();

}