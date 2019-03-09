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

		file: function( options ){

			const __file = {

				call: function( embed ){

				},

				read: function( file ){
					const rawFile = new XMLHttpRequest();

					rawFile.open( 'GET', file, false);
					rawFile.onreadystatechange = function(){
						var response = '';
						
						if( rawFile.readyState === 4 ){

							if(rawFile.status === 200 || rawFile.status == 0){
								response = rawFile.responseText;
								alert( response );
							}
						}
					}
					rawFile.send(null);

				},

				save: function(){

				},

				sanitize: function(){

				}
			};

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

					inner = '<div class="comet-saveform">';
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