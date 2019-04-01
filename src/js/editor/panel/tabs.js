import f_gradient from '../../utils/ui/gradient.js';
import f_color from '../../utils/ui/color-picker.js';
import sanitize from '../../utils/sanitize.js';
import f_range from '../../utils/ui/range.js';
import f_numbers from './fields/numbers.js';
import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import f_icon from './fields/icon.js';
import __target from '../target.js';
import update from '../update.js';
import panel from '../panel.js';
import __data from '../data.js';
import __id from '../id.js';

/* global document, wp, __cometi18n */

const __create = function( tabs, data ){

	const _d = document;

	const __core = {

		data: {
			controls: {
				all: {},
				toggle: {},
			},

		},

		classes: {
			active: 'comet-active',
			hide: 'comet-hide',
			tab: 'comet-tab'

		},

		actions: {

			tab: function( ev, ui, contentNode ){
				ev.preventDefault();
				node( ui.parentNode.children ).removeClass( __core.classes.active );
				node( contentNode.parentNode.children ).removeClass( __core.classes.active );
				node( contentNode ).addClass( __core.classes.active );
				node( ui ).addClass( __core.classes.active );

			},

			section: function( ev, ui, contentNode ){
				ev.preventDefault();
				node( contentNode ).toggleClass( __core.classes.active );

			},

			item: {

				add: function( ev, ui, itemsNode ){
					const target_ = __target();
					var pid, id;

					ev.preventDefault();

					if( !node( itemsNode ).isNode() || !( pid = target_.id() ) ){
						return;

					}

					if( target_.type() === null || !( id = __data().create( 'items', pid, 'last' ) ) ){
						return;

					}

					itemsNode.appendChild( __core.create.item( id ) );

				},

				edit: function( ev, ui, args ){
					const target_ = __target();
					const data_ = __data();
					var id, tabs1, tid, element, edata;

					ev.preventDefault();

					if( !( id = parse.id( args.id ) ) || !( tid = target_.id() ) ){
						return;

					}

					if( !utils.isObject( element = data_.get( tid, 'elements' ) ) || !utils.isObject( edata = utils.getElement( element._type ) ) ){
						return;

					}

					if( !utils.isObject( edata.tabs ) || !utils.isObject( edata.tabs.items ) || !utils.isObject( edata.tabs.items.tabs ) ){
						return;

					}
					tabs1 = __create( edata.tabs.items.tabs, data_.get( id, 'items' ) );
					target_.set( { state: 'items', item: id } );

					panel({
						title: __cometi18n.ui.editItem,
						tabs: tabs1.tabs,
						content: tabs1.content,
						close: {
							inner: '<span class="cico cico-arrow-left-alt"></span>',
							title: __cometi18n.ui.back,
							do: function(){

								if( !tid ){
									return false;

								}
								const tabs2 = __create( edata.tabs, element );
								target_.set( { state: null, item: null } );

								panel({
									title: __cometi18n.options.element.edit,
									tabs: tabs2.tabs,
									content: tabs2.content,
									close: {
										do: function(){
											target_.reset();

										}

									}

								});

							}
						}
					});

				},

				delete: function( ev, ui, args ){
					const data_ = __data();
					const target_ = __target();
					var element_id, item_id, elementNode;
					var _t, lyt;

					ev.preventDefault();

					if( !( ( _t = node( args.target ) ).isNode() ) || !( item_id = parse.id( args.id ) ) ){
						return;

					}

					if( !data_.remove( item_id, 'items', ( element_id = target_.id() ) ) ){
						return;

					}
					_t.remove();

					if( ( elementNode = target_.node() ) && ( lyt = layout( data_.getData() ).element( element_id, true ) ) ){
						elementNode.parentNode.replaceChild( lyt, elementNode );

					}

				},

				sort: function( id ){

					return {
						connectWith: '.comet-items-sortable',
						items: '.comet-item-sortable',
						placeholder: 'comet-item comet-ui comet-ui-placeholder',
						cursor: 'cpb-elementCursor',
						bodyClass: '',

						start: function( ev, ui ){

							if( ui.parentNode === null ){
								return;

							}

							ui.parentNode.style.visibility = 'hidden';
							return ui.parentNode;

						},
						stop: function( e, ui, item ){
							const target_ = __target();
							const id_ = __id(); 
							var pid, t, re, _closest, closest, tnode;

							item.removeAttribute( 'style' );

							if( !( pid = target_.id() ) ){
								return;

							}
							closest = node( ui ).next( '.comet-item-sortable' );
							_closest = node( closest );
							t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

							id_.remove( id, 'items', pid );
							id_.insert( id, 'items', pid, t );
							ui.parentNode.replaceChild( item , ui );

							if( !( tnode = target_.node() ) || tnode === null || !( re = layout( __data().getData() ).element( pid, true ) ) ){
								return;

							}
							tnode.parentNode.replaceChild( re, tnode );

						}
					};

				}
			},

			update: function( _node ){

				node( _node ).on( 'input', function( ev, ui ){
					update( ui );

				});

			},

			switch: function( _node, fieldData ){
				const sdata = fieldData.switch;
				var a, b, slug, len;

				for( a in sdata ){

					if( !utils.isArray( sdata[a] ) ){
						continue;

					}

					for( b = 0; b < sdata[a].length; b++ ){

						if( !( ( slug = sdata[a][b] ) in __core.data.controls.toggle ) || !utils.isObject( __core.data.controls.toggle[slug] ) ){
							__core.data.controls.toggle[slug] = {};

						}

						if( !utils.isArray( __core.data.controls.toggle[slug].values ) ){
							__core.data.controls.toggle[slug].values = [];

						}
						len = __core.data.controls.toggle[slug].values.length;
						__core.data.controls.toggle[slug].values[len] = a;
						__core.data.controls.toggle[slug].node = _node;

					}

				}

				node( _node ).on( 'input', function( ev, ui ){
					const value = ui.value;
					const isCheckbox = ( ui.nodeName === 'INPUT' && ui.type === 'checkbox' );
					const isChecked = ( isCheckbox && ui.checked );
					var isValue = false;

					for( a in sdata ){
						isValue = ( value === a );

						if( !utils.isArray( sdata[a] ) ){
							continue;

						}

						for( b = 0; b < sdata[a].length; b++ ){

							if( !( ( slug = sdata[a][b] ) in __core.data.controls.all ) ){
								continue;

							}

							if( ( !isCheckbox && isValue ) || isChecked ){
								node( __core.data.controls.all[slug].target ).removeClass( __core.classes.hide );
								continue;

							}
							node( __core.data.controls.all[slug].target ).addClass( __core.classes.hide );

						}

					}

				});

			},

			initControlsState: function(){
				var a, _node, checkbox, checked;

				if( !utils.isObject( __core.data.controls.toggle ) || !utils.isObject( __core.data.controls.all ) ){
					return false;

				}

				for( a in __core.data.controls.toggle ){

					if( !utils.isObject( __core.data.controls.toggle[a] ) ){
						continue;

					}
					_node = __core.data.controls.toggle[a].node;
					checkbox = ( _node.nodeName === 'INPUT' && _node.type === 'checkbox' );
					checked = ( checkbox && _node.checked );

					if( ( !checkbox && __core.data.controls.toggle[a].values.indexOf( _node.value ) > -1 ) || checked ){
						node( __core.data.controls.all[a].target ).removeClass( __core.classes.hide );
						continue;

					}
					node( __core.data.controls.all[a].target ).addClass( __core.classes.hide );

				}

			}
		},

		create: {

			tabs: function(){
				const oTabs = _d.createDocumentFragment();
				const oContent = _d.createDocumentFragment();
				var count = 1;
				var a, isItems, t, tab, content;

				if( utils.isObject( tabs ) ){

					for( a in tabs ){
						isItems = ( a === 'items' );

						if( !utils.isObject( t = tabs[a] ) || !utils.isString( t.name ) || ( !isItems && !utils.isObject( t.sections ) ) || ( isItems && !utils.isObject( t.tabs ) ) ){
							continue;

						}
						tab = _d.createElement( 'button' );
						tab.className = __core.classes.tab + ( count === 1 ? ' ' + __core.classes.active : '' );
						tab.innerHTML = t.name;
						oTabs.appendChild( tab );

						content = _d.createElement( 'div' );
						content.className = __core.classes.tab + ( count === 1 ? ' ' + __core.classes.active : '' );
						content.appendChild( __core.create.tab( ( isItems ? t.tabs : t.sections ), isItems ) );
						oContent.appendChild( content );

						node( tab ).on( 'click', __core.actions.tab, content );
						count++;

					}
					__core.actions.initControlsState();

				}

				return {
					tabs: oTabs,
					content: oContent
				};

			},

			tab: function( sections, isItems ){
				const oTab = _d.createDocumentFragment();
				var section, a, s, dataItem, ids, id;

				if( utils.isBool( isItems ) && isItems ){

					section = _d.createElement( 'div' );
					section.className = 'comet-section comet-items comet-ui';
					section.innerHTML = '<div class="comet-items comet-items-sortable"></div><div class="comet-buttonset"><button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.addItem + '"><span class="cico cico-plus"></span><span class="comet-title">' + __cometi18n.ui.addItem + '</span></button></div>';
					oTab.appendChild( section );

					if( utils.isObject( data ) && !utils.isStringEmpty( data._items ) && utils.isArray( ( ids = parse.ids( data._items, 'array' ) ), 1 ) ){

						for( a = 0; a < ids.length; a++ ){

							if( !( id = parse.id( ids[a] ) ) || !( dataItem = __data().get( id, 'items' ) ) ){
								continue;

							}
							section.firstChild.appendChild( __core.create.item( id, dataItem.title ) );

						}
					}

					node( section.lastChild.firstChild ).on( 'click', __core.actions.item.add, section.firstChild );

					return oTab;

				}

				if( utils.isObject( sections ) ){ 

					for( a in sections ){

						if( !utils.isObject( s = sections[a] ) || !utils.isString( s.name ) || !utils.isObject( s.fields ) ){
							continue;

						}
						section = _d.createElement( 'div' );
						section.className = 'comet-section comet-ui';
						section.innerHTML = '<h4 class="comet-header comet-title">' + s.name + '</h4><div class="comet-body"></div>';
						oTab.appendChild( section );

						section.lastChild.appendChild( __core.create.fields( s.fields ) );

						node( section.firstChild ).on( 'click', __core.actions.section, section.lastChild );
					}
				}
				return oTab;

			},

			item: function( id ){
				const item = _d.createElement( 'div' );
				var inner, dren, args;

				item.className = 'comet-item comet-item-sortable';
				item.dataset.id = id;

				inner = '<button class="comet-button" aria-label="' + __cometi18n.ui.sort + '"><span class="cico cico-move"></span><span class="comet-title">' + __cometi18n.ui.sort + '</span></button>';
				inner += '<span>' + id + '</span>';
				inner += '<button class="comet-button comet-first" aria-label="' + __cometi18n.ui.edit + '"><span class="cico cico-edit"></span><span class="comet-title">' + __cometi18n.ui.edit + '</span></button>';
				inner += '<button class="comet-button comet-last" aria-label="' + __cometi18n.ui.delete + '"><span class="cico cico-trash"></span><span class="comet-title">' + __cometi18n.ui.delete + '</span></button>';

				item.innerHTML = inner;
				dren = item.children;

				args = {
					id: id,
					target: item 

				};

				node( dren[0] ).sort( __core.actions.item.sort( id ) );
				node( dren[2] ).on( 'click', __core.actions.item.edit, args );
				node( dren[3] ).on( 'click', __core.actions.item.delete, args );

				return item;

			},

			fields: function( fields ){
				const oFields = _d.createDocumentFragment();
				var f, a, field, meta, oField;

				if( utils.isObject( fields ) ){

					for( a in fields ){

						if( !utils.isObject( f = fields[a] ) || !utils.isString( f.type ) || !utils.isString( f.label ) ){
							continue;

						}
						if( !( oField = __core.create.field( a, f ) ) ){
							continue;

						}
						f.type = utils.trim( utils.stripTags( f.type.toLowerCase() ) );
						field = _d.createElement( 'div' );
						field.className = 'comet-control comet-control-' + f.type;
						field.innerHTML = '<div class="comet-meta"></div><div class="comet-field-wrap"></div>';
						oFields.appendChild( field );

						meta = '<label>' + utils.trim( utils.stripTags( f.label ) ) + '</label>';

						if( !utils.isStringEmpty( f.desc ) ){
							meta += '<span class="comet-tooltip">';
							meta += '<span class="comet-icon">?</span>';
							meta += '<span class="comet-description comet-inner">' + utils.stripTags( f.desc, '<b><strong><i><a><span><sub><sup><ins>' ) + '</span>';
							meta += '</span>';

						}
						field.firstChild.innerHTML = meta;
						field.lastChild.appendChild( oField );

						if( !utils.isObject( __core.data.controls.all[a] ) ){
							__core.data.controls.all[a] = {};

						}
						__core.data.controls.all[a].target = field;

					}

				}
				return oFields;
			},

			field: function( slug, field ){

				var fieldClass = 'comet-field';

				var value = '';

				const isSwitch = ( 'switch' in field && utils.isObject( field.switch ) );

				const fields = {

					text: function(){

						const _node = _d.createElement( 'input' );
						_node.type = 'text';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = value;
						__core.actions.update( _node );

						return _node;

					},

					textarea: function(){

						const _node = _d.createElement( 'textarea' );
						_node.name = slug;
						_node.className = fieldClass;
						_node.innerHTML = value;
						__core.actions.update( _node );

						return _node;

					},

					select: function(){

						var v, values, _option;

						const _node = _d.createElement( 'select' );
						_node.name = slug;
						_node.className = fieldClass;

						if( utils.isObject( values = field.values ) ){

							for( v in values ){

								if( !utils.isString( values[v] ) && !utils.isNumber( values[v] ) ){
									continue;

								}
								_option = _d.createElement( 'option' );
								_option.value = v;
								_option.innerHTML = utils.stripTags( values[v].toString() );

								if( v === value ){
									_option.selected = true;

								}
								_node.appendChild( _option );

							}

						}
						__core.actions.update( _node );

						if( isSwitch ){
							__core.actions.switch( _node, field );

						}
						return _node;

					},

					checkbox: function(){

						const _node = _d.createElement( 'input' );
						_node.type = 'checkbox';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = 'true';

						if( value === 'true' ){
							_node.checked = true;

						}
						__core.actions.update( _node );

						if( isSwitch ){
							__core.actions.switch( _node, field );

						}
						return _node;

					},

					radio: function(){

						const onradio = function( ev, ui ){
							const parentNode = ui.parentNode;
							var dren;

							if( parentNode === null || ( dren = parentNode.children ).length < 1 ){
								return;

							}
							node( dren ).removeClass( __core.classes.active );
							node( ui ).addClass( __core.classes.active );
							update( ui.firstElementChild );

							if( isSwitch ){
								__core.actions.switch( ui.firstElementChild, field );

							}

						};

						const fragment = _d.createDocumentFragment();

						var _radio, values, v, inner;

						if( utils.isObject( values = field.values ) ){

							for( v in values ){

								if( !utils.isObject( values[v] ) || !utils.isString( values[v].title ) || !utils.isString( values[v].icon ) ){
									continue;

								}
								_radio = _d.createElement( 'label' );
								_radio.className = 'comet-label comet-ui' + ( v === value ? ' ' + __core.classes.active : '' );
								fragment.appendChild( _radio );
								inner = '<input type="radio" class="' + fieldClass + '" name="' + slug + '"value="' + v + '" />';
								inner += '<span class="comet-icon ' + utils.trim( utils.stripTags( values[v].icon ) ) + '"></span>';
								inner += '<span class="comet-title">' + utils.trim( utils.stripTags( values[v].title, '<b><strong><i><span><u><ins>' ) ) + '</span>';
								_radio.innerHTML = inner;

								if( v === value ){
									_radio.firstChild.checked = true;

								}
								node( _radio ).on( 'click', onradio );

							}

						}

						return fragment;

					},

					range: function(){

						const onchange = function( ev, ui, e ){
							var dren, val, tmp, x;

							if( ( val = sanitize.number( e.source.value ) ) === null || ( tmp = e.source.parentNode ) === null ){
								return;

							}

							if( ( dren = tmp.getElementsByClassName( 'comet-value' ) ).length < 1 ){
								return;

							}

							for( x = 0; x < dren.length; x++ ){

								if( !node( dren[x] ).isNode() ){
									continue;

								}
								dren[x].innerHTML = val;

							}
							update( e.source );

						};

						const fragment = _d.createDocumentFragment();

						const _unit = _d.createElement( 'span' );

						const _node = _d.createElement( 'input' );
						_node.type = 'hidden';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = value;
						_node.min = sanitize.number({ value: field.min, min: 0 });
						_node.max = sanitize.number({ value: field.max, min: _node.min });
						_node.step = sanitize.number({ value: field.step, min: 0.01 });

						_unit.className = 'comet-unit';
						_unit.innerHTML = '<span class="comet-value">' + value + '</span>' + ( utils.isString( field.unit ) ? utils.stripTags( field.unit ) : '' );

						fragment.appendChild( _node );
						fragment.appendChild( _unit );

						f_range( _node, { 
							buttons: true,
							change: onchange
						} );

						return fragment;

					},

					number: function(){

						var unit, _unit;

						const fragment = _d.createDocumentFragment();

						const _node = _d.createElement( 'input' );
						_node.type = 'number';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = value;

						fragment.appendChild( _node );

						if( utils.isString( unit = field.unit ) ){
							_unit = _d.createElement( 'span' );
							_unit.className = 'comet-unit';
							_unit.innerHTML = utils.stripTags( unit );
							fragment.appendChild( _unit );

						}
						__core.actions.update( _node );

						return fragment;

					},

					numbers: function(){

						return f_numbers( slug, field, data );

					},

					color: function(){

						const fragment = _d.createDocumentFragment();
						const _node = _d.createElement( 'input' );
						_node.type = 'text';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = value;

						fragment.appendChild( _node );

						f_color( _node, {
							opacity: true,
							input: true,
							clear: true,
							onchange: function( ui, source ){
								update( source );

							}

						});

						return fragment;

					},

					editor: function(){
						var op;

						const _node = _d.createElement( 'textarea' );
						_node.name = slug;
						_node.className = fieldClass + ( !utils.isStringEmpty( op = field.option ) && [ 'advanced', 'force_tag' ].indexOf( op = utils.trim( op ) ) > -1 ? ( op === 'advanced' ? ' comet-fieldEditorAdvanced' : ' comet-fieldEditorForceTag' ) : '' );
						_node.innerHTML = value;
						__core.actions.update( _node );

						return _node;

					},

					gradient: function(){

						const fragment = _d.createDocumentFragment();
						const _node = _d.createElement( 'input' );
						_node.type = 'hidden';
						_node.name = slug;
						_node.className = fieldClass;
						_node.value = value;
						fragment.appendChild( _node );

						f_gradient( _node, {
							size: 20,
							onchange: function( ui ){
								update( ui );

							}
						} );

						return fragment;

					},

					icon: function(){

						return f_icon( slug, field, data );

					},

					image: function(){

						var input = null;

						var _value = utils.isString( value ) ? utils.trim( utils.stripTags( value ) ) : '';

						const wrapper = _d.createElement( 'div' );

						const __img = {

							open: function( ev ){
								var args, media;

								ev.preventDefault();
								ev.stopPropagation();

								if( media ){
									media.open();
									return;
								}

								args = {
									frame: 'select',
									title: __cometi18n.ui.selImage,
									library: {
										type: 'image'
									},
									button: {
										text: __cometi18n.ui.select,
									},
									multiple: false,
									editing:    true,
									filterable: true,
									searchable: true,
									sortable: true

								};

								media = wp.media( args );

								media.on( 'select', function(){
									const att = media.state().get('selection').first().toJSON();
									_value = utils.isString( _value = att.url ) ? ( ( _value = utils.trim( utils.stripTags( _value ) ) ) !== '' ? _value : '' ) : '';

									input.value = _value;
									__img.create();
									update( input );

								});
								media.open();

							},

							delete: function( ev ){
								ev.preventDefault();
								ev.stopPropagation();
								_value = '';
								input.value = _value;
								__img.create();
								update( input );

							},

							create: function(){

								const browse = __cometi18n.ui.browse;
								const remove = __cometi18n.ui.remove;
								const buttonClass = 'comet-button';
								const wcn = wrapper.childNodes;
								const button = _d.createElement( 'button' );
								var n = 0;

								while( n < wcn.length ){

									if( wcn[n] !== input ){
										wrapper.removeChild( wcn[n] );

									}
									n++;

								}

								if( _value === '' ){
									button.className = buttonClass + ' comet-buttonPrimary comet-upload';
									button.innerHTML = browse;
									wrapper.appendChild( button );
									node( button ).on( 'click', __img.open );
									return;

								}
								const oh = _d.createElement( 'div' );
								wrapper.appendChild( oh );
								oh.className = 'comet-media comet-wrapper comet-image';
								oh.title = browse;
								oh.innerHTML = '<img src="' + _value + '"/>';
								node( oh ).on( 'click', __img.open );

								button.className = buttonClass + ' comet-remove';
								button.title = remove;
								button.innerHTML = '<span class="cico cico-x"></span>';
								oh.appendChild( button );
								node( button ).on( 'click', __img.delete );
							}

						};

						wrapper.className = 'comet-uploader comet-image comet-wrapper';
						wrapper.innerHTML = '<input type="hidden" name="' + slug + '" class="' + fieldClass + '" value="' + _value + '" />';
						input = wrapper.firstChild;
						__img.create();

						return wrapper;

					}

				};

				if( 'std' in field ){
					value = field.std;

				}

				if( slug in data ){
					value = data[slug];

				}

				if( !utils.isObject( __core.data.controls.all[slug] ) ){
					__core.data.controls.all[slug] = {};

				}
				__core.data.controls.all[slug].value = value;

				return ( utils.isFunction( fields[field.type] ) ? fields[field.type]() : false );

			}

		},

	};
	data = utils.isObject( data ) ? data : {};

	return __core.create.tabs();

};

export default __create;