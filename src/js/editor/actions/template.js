import notification from '../notification.js';
import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import modal from '../../utils/modal.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import ajax from '../../utils/ajax.js';
import __data from '../data.js';

/* global document, __cometi18n, __cometdata */

export default function( _node ){

	var tm_modal = false;

	var loaded = [];

	const _d = document;

	const __core = {

		open: function( ev ){
			var header, body, inner;
			
			ev.preventDefault();

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
			var id, url;
			
			e.preventDefault();

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

			const __ins = {

				clone: function( data ){
					var from = false;
					var ids, a, count, id_;

					if( !utils.isObject( data ) || utils.isStringEmpty( data._sections ) ){
						return false;

					}

					if( !utils.isArray( ( ids = parse.ids( data._sections, 'array' ) ), 1 ) ){
						return false;

					}
					count = 0;

					for( a = 0; a < ids.length; a++ ){

						if( !( id_ = __ins._clone( 'sections', ids[a], data, '0' ) ) ){
							continue;

						}

						if( count === 0 ){
							from = id_;

						}
						count++;

					}
					return from;

				},

				_clone: function( type, id_, data, pid ){
					const _data = __data();
					const types = [ 'items', 'elements', 'columns', 'rows', 'sections' ];
					var children = [];
					var childtype, _childtype, n_id, a;

					if( !utils.isString( type ) || types.indexOf( type.toLowerCase() ) < 0 ){
						return false;

					}

					if( !utils.isObject( data ) || !utils.isObject( data[type] ) ){
						return false;

					}

					if( !utils.isObject( data[type][id_] ) ){
						data[type][id_] = {};

					}

					if( !( n_id = __data().create( ( type === 'elements' ? data[type][id_]._type : type ), pid, 'last', data[type][id_] ) ) ){
						return false;

					}
					childtype = _data.getChild( type );

					if( childtype && ( _childtype = '_' + childtype ) && utils.isObject( data[type][id_] ) && !utils.isStringEmpty( data[type][id_][_childtype] ) ){
						children = parse.ids( data[type][id_][_childtype], 'array' );

					}
					__data().removeIds( n_id, type );

					if( !utils.isArray( children, 1 ) ){
						return n_id;

					}

					for( a = 0; a < children.length; a++ ){
						__ins._clone( childtype, children[a], data, n_id );

					}
					return n_id;

				}

			};
			e.preventDefault();

			if( ( id = parse.id( id ) ) ){
				notification( __cometi18n.messages.warning.ltemplate, 300 );

				ajax({
					id: id,
					meta: 'true',
					do: 'get'

				}).done( function( r ){
					const frame = utils.getNode( 'frame' );
					var data, from;

					if( !frame || frame === null ){
						notification( __cometi18n.messages.error.ltemplate, 400 );
						return;

					}

					if( r === '0' || !utils.isObject( data = parse.json( r ) ) || !utils.isObject( data['meta'] ) ){
						notification( __cometi18n.messages.error.ltemplate, 400 );

					}
					from = __ins.clone( data['meta'] );
					layout( __data().getData() ).init( frame, from );
					notification( __cometi18n.messages.success.ltemplate, 200 );

				} );

			}

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

}