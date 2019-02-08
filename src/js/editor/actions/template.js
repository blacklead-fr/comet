import parse from '../../utils/parse.js';
import modal from '../../utils/modal.js';
import utils from '../../utils/utils.js';
import load from '../../utils/load.js';
import node from '../../utils/node.js';
import ajax from '../../utils/ajax.js';
import __data from '../data.js';

export default function( _node ){

	var tm_modal = false;

	var loaded = [];

	const _d = document;

	const __core = {

		open: function( ev, ui){
			ev.preventDefault();
			const args = {};
			var header, body, temp, inner;

			header = _d.createElement( 'div' );
			header.className = 'comet-searchbox';

			inner = '<select class="comet-ui comet-select">';
			inner += '<option value="cus">' + __cometi18n.ui.mytemplates + '</option>';
			inner += '</select>';

			inner += '<input type="text" class="comet-ui comet-input" placeholder="' + __cometi18n.ui.sTemplate + '"/>';
			header.innerHTML = inner;

			body = _d.createElement( 'div' );
			body.className = 'comet-templates comet-wrapper comet-mytemplates';

			tm_modal = modal({
				header: header,
				content: body
			});

			/* cus, pre */
			__core.load( 'cus' );

			node( header.firstChild ).on( 'change', __core.switch );
			node( header.lastChild ).on( 'input', __core.search );

		},

		preview: function( e, ui, edata ){
			e.preventDefault();
			var id, url;

			if( !utils.isObject( edata ) || !( id = parse.id( edata.id ) ) ){
				return;

			}
			url = utils.addQueryArgs( { id: id }, __cometdata.preview_url );

			modal({
				header: '<h4>' + edata.title + ' (' + edata.id + ')</h4>',
				content: '<iframe src="' + utils.escUrl( url ) + '"></iframe>'
			});

		},

		insert:  function( e, ui, id ){
			e.preventDefault();

			if( !( id = parse.id( id ) ) ){
				return;

			}

			ajax({
				id: id,
				meta: 'true',
				do: 'get'

			}).done( function( r ){
				var from = false;
				var data, re, tmp;
				var fa, fb, fc, fd, fe;
				var ids_a, ids_b, ids_c, ids_d, ids_e;
				var a, b, c, d, e;
				var id_a, id_b, id_c, id_d, id_e;

				if( r === '0' || !utils.isObject( tmp = parse.json( r ) ) ){
					return false;

				}

				if( !utils.isObject( data = tmp['meta'] ) || utils.isStringEmpty( data._sections ) ){
					return false;

				}

				if( !utils.isObject( data.sections ) || !utils.isArray( ( ids_a = parse.ids( data._sections, 'array' ) ), 1 ) ){
					return false;

				}
				fc = 0;

				for( a in ids_a ){
					id_a = ids_a[a];

					if( !( id_a = parse.id( ids_a[a] ) ) || !utils.isObject( data.sections[id_a] ) ){
						continue;

					}

					if( !( tmp = __data.create( 'sections', '0', 'last', data.sections[id_a] ) ) ){
						continue;

					}

					if( fc === 0 ){
						from = tmp;
						__data.removeIds( tmp, 'sections' );

					}

					if( utils.isStringEmpty( data.sections[id_a]._rows ) || !utils.isArray( ( ids_b = parse.ids( data.sections[id_a]._rows, 'array' ) ), 1 ) ){
						continue;

					}

					for( b in ids_b ){

						if( !( id_b = parse.id( ids_b[b] ) ) || !utils.isObject( data.rows[id_b] ) ){
							continue;

						}

						if( !( tmp = __data.create( 'rows', tmp, 'last', data.rows[id_b] ) ) ){
							continue;

						}

						if( fc === 0 ){ 
							__data.removeIds( tmp, 'rows' );

						}

						if( utils.isStringEmpty( data.rows[id_b]._columns ) || !utils.isArray( ( ids_c = parse.ids( data.rows[id_b]._columns, 'array' ) ), 1 ) ){
							continue;

						}

						for( c in ids_c ){

							if( !( id_c = parse.id( ids_c[c] ) ) || !utils.isObject( data.columns[id_c] ) ){
								continue;

							}

							if( !( tmp = __data.create( 'columns', tmp, 'last', data.columns[id_c] ) ) ){
								continue;

							}

							if( fc === 0 ){ 
								__data.removeIds( tmp, 'columns' );

							}

							if( utils.isStringEmpty( data.columns[id_c]._elements ) || !utils.isArray( ( ids_d = parse.ids( data.columns[id_c]._elements, 'array' ) ), 1 ) ){
								continue;

							}

							for( d in ids_d ){

								if( !( id_d = parse.id( ids_d[d] ) ) || !utils.isObject( data.elements[id_d] ) ){
									continue;

								}

								if( !( tmp = __data.create( 'elements', tmp, 'last', data.elements[id_d] ) ) ){
									continue;

								}

								if( fc === 0 ){ 
									__data.removeIds( tmp, 'elements' );

								}

								if( utils.isStringEmpty( data.elements[id_d]._items ) || !utils.isArray( ( ids_e = parse.ids( data.elements[id_d]._items, 'array' ) ), 1 ) ){
									continue;

								}

								for( e in ids_e ){

									if( !( id_e = parse.id( ids_e[e] ) ) || !utils.isObject( data.items[id_e] ) ){
										continue;

									}

									if( !( tmp = __data.create( 'items', tmp, 'last', data.items[id_e] ) ) ){
										continue;

									}

									if( fc === 0 ){ 
										__data.removeIds( tmp, 'items' );

									}
								}
							}
						}
					}
					fc++;

				}
				load.comet( __data.getData(), from );

			} );

			tm_modal.destroy();

		},

		search: function( ev, ui ){
			const v = utils.isString( ui.value ) ? utils.trim( ui.value ) : '';
			var regex, i;

			if( loaded.length < 1 ){
				return false;

			}
			regex = new RegExp( v, 'i' );

			for( i = 0; i < loaded.length; i++ ){

				if( !utils.isObject( loaded[i] ) ){
					continue;

				}

				if( v !== '' && loaded[i].title.search( regex ) === -1 ){
					loaded[i].node.style.display = 'none';
					continue;

				}
				loaded[i].node.style.display = 'block';

			}

		},

		switch: function( ev, ui ){
			var set;

			if( utils.isStringEmpty( set = ui.value ) || [ 'pre', 'cus' ].indexOf( set = utils.trim( set ) ) < 0 ){
				return;

			}
			__core.load( set );


		},

		load: function( set ){

			if( utils.isStringEmpty( set ) || [ 'cus', 'pre' ].indexOf( set = utils.trim( set ) ) < 0 ){
				return false;

			}

			ajax({
				do: 'templates',
				data: set

			}).done( function( templates ){
				const body = tm_modal.body.firstElementChild;
				const fragment = _d.createDocumentFragment();
				var t, template, id, title, buttonset, inner, scope;

				if( templates === '0' || body === null || !utils.isArray( ( templates = parse.json( templates ) ), 1 ) ){
					return;

				}
				loaded = [];

				for( t = 0; t < templates.length; t++ ){
					template = templates[t];

					if( !( id = parse.id( template.ID ) ) ){
						continue;

					}
					title = utils.isString( template.post_title ) ? utils.trim( template.post_title ) : '';

					scope = _d.createElement( 'div' );
					scope.className = 'comet-template comet-scope comet-collection';

					inner = '<figure class="comet-figure">';
					inner += '<span class="comet-id">' + id + '</span>';
					inner += '<div class="comet-inner comet-meta comet-abs comet-buttonset">';
					inner += '<button class="comet-button" title="' + __cometi18n.ui.insert + '" aria-label="' + __cometi18n.ui.insert + '"><span class="cico cico-dir-download"></span></button>';
					inner += '<button class="comet-button" title="' + __cometi18n.ui.preview + '" aria-label="' + __cometi18n.ui.preview + '"><span class="cico cico-eye"></span></button>';
					inner += '</div>';
					inner +='</figure>';
					inner += '<aside class="comet-aside">' + title + '</aside>';

					scope.innerHTML = inner;

					fragment.appendChild( scope );

					loaded[loaded.length] = {
						id: id,
						title: title,
						node: scope
					};

					buttonset = scope.firstChild.lastChild;

					node( buttonset.firstChild ).on( 'click', __core.insert, id );
					node( buttonset.lastChild ).on( 'click', __core.preview, { id: id, title: title } );

				}
				body.innerHTML = '';
				body.appendChild( fragment );

			});

		}
	};

	if( !node( _node ).isNode() ){
		return;

	}

	node( _node ).on( 'click', __core.open );

};