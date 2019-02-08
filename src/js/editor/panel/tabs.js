import f_gradient from '../../utils/ui/gradient.js';
import f_color from '../../utils/ui/color-picker.js';
import sanitize from '../../utils/sanitize.js';
import f_range from '../../utils/ui/range.js';
import f_numbers from './fields/numbers.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import f_icon from './fields/icon.js';
import update from '../update.js';
//import __tab from './tab.js';

const __create = function( tabs, data ){

	const _d = document;

	const classes = {
		active: 'comet-active',
		tab: 'comet-tab',

	};

	const __events = {

		tab: function( ev, ui, contentNode ){
			ev.preventDefault();
			node( ui.parentNode.children ).removeClass( classes.active );
			node( contentNode.parentNode.children ).removeClass( classes.active );
			node( contentNode ).addClass( classes.active );
			node( ui ).addClass( classes.active );

		},

		section: function( ev, ui, contentNode ){
			ev.preventDefault();
			node( contentNode ).toggleClass( classes.active );

		},

		item: {

			add: function( ev, ui, itemsNode ){
				ev.preventDefault();
				const target_ = __target();
				var pid, id;

				if( !node( itemsNode ).isNode() || !( pid = target_.id() ) ){
					return;

				}

				if( target_.type() === null || !( id = __data().create( 'items', pid, 'last' ) ) ){
					return;

				}

				itemsNode.appendChild( __core.item( id ) );

			},

			edit: function( ev, ui, args ){
				ev.preventDefault();
				const target_ = __target();
				const data_ = __data();
				var id, tabs1, tid, element, edata;

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
										redefine.workflow();

									}

								}

							});
							initPanel();

						}
					}
				});
				initPanel();

			},

			delete: function( ev, ui, args ){
				ev.preventDefault();
				var id;

				if( !( ( _t = node( args.target ) ).isNode() ) || !( id = parse.id( args.id ) ) ){
					return;

				}

				if( _t.remove() ){
					__data().remove( id, 'items', __target().id() );

				}

			}
		},

	};

	const __core = {

		tabs: function(){
			const oTabs = _d.createDocumentFragment();
			const oContent = _d.createDocumentFragment();
			var count = 1;
			var a, isItems, t, tab, tid, content;

			if( utils.isObject( tabs ) ){

				for( a in tabs ){
					isItems = ( a === 'items' );

					if( !utils.isObject( t = tabs[a] ) || !utils.isString( t.name ) || ( !isItems && !utils.isObject( t.sections ) ) || ( isItems && !utils.isObject( t.tabs ) ) ){
						continue;

					}
					tab = _d.createElement( 'button' );
					tab.className = classes.tab + ( count === 1 ? ' ' + classes.active : '' );
					tab.innerHTML = t.name;
					oTabs.appendChild( tab );

					content = _d.createElement( 'div' );
					content.className = classes.tab + ( count === 1 ? ' ' + classes.active : '' );
					content.appendChild( __core.tab( ( isItems ? t.tabs : t.sections ), isItems ) );
					oContent.appendChild( content );

					node( tab ).on( 'click', __events.tab, content );
					count++;

				}
			}

			return {
				tabs: oTabs,
				content: oContent
			};

		},

		tab: function( sections, isItems ){
			const oTab = _d.createDocumentFragment();
			var section, a, s, dataItem;

			if( utils.isBool( isItems ) && isItems ){

				section = _d.createElement( 'div' );
				section.className = 'comet-section comet-items comet-ui';
				section.innerHTML = '<div class="comet-items"></div><div class="comet-buttonset"><button class="comet-button comet-buttonPrimary"><span class="cico cico-plus"></span></button></div>';
				oTab.appendChild( section );

				if( utils.isObject( data ) && !utils.isStringEmpty( data._items ) && utils.isArray( ( ids = parse.ids( data._items, 'array' ) ), 1 ) ){

					for( a = 0; a < ids.length; a++ ){

						if( !( id = parse.id( ids[a] ) ) || !( dataItem = __data().get( id, 'items' ) ) ){
							continue;

						}
						section.firstChild.appendChild( __core.item( id, dataItem.title ) );

					}
				}

				node( section.lastChild.firstChild ).on( 'click', __events.item.add, section.firstChild );

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

					section.lastChild.appendChild( __core.fields( s.fields ) );

					node( section.firstChild ).on( 'click', __events.section, section.lastChild );
				}
			}
			return oTab;

		},

		item: function( id, title ){
			const item = _d.createElement( 'div' );
			var inner, dren, args;

			//item.dataset.id = id;
			item.className = 'comet-item';

			inner = '<span><span>#' + id + '</span>' + ( !utils.isStringEmpty( title ) ? utils.trim( title ) : '' ) + '</span>';
			inner += '<button class="comet-button comet-first" title="' + __cometi18n.ui.edit + '"><span class="cico cico-edit"></span></button>';
			inner += '<button class="comet-button comet-last" title="' + __cometi18n.ui.delete + '"><span class="cico cico-trash"></span></button>';

			item.innerHTML = inner;
			dren = item.children;

			args = {
				id: id,
				target: item 

			};

			node( dren[1] ).on( 'click', __events.item.edit, args );
			node( dren[2] ).on( 'click', __events.item.delete, args );

			return item;

		},

		fields: function( fields ){
			const oFields = _d.createDocumentFragment();
			var f, a, field, type, meta;

			if( utils.isObject( fields ) ){

				for( a in fields ){

					if( !utils.isObject( f = fields[a] ) || !utils.isString( f.type ) || !utils.isString( f.label ) ){
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
					field.lastChild.appendChild( __core.field( a, f ) );
				}

			}
			return oFields;
		},

		field: function( slug, field ){

			var fieldClass = 'comet-field';

			var value = '';

			const fields = {

				text: function(){

					const _node = _d.createElement( 'input' );
					_node.type = 'text';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;
					__core.update( _node );
					return _node;

				},

				textarea: function(){

					const _node = _d.createElement( 'textarea' );
					_node.name = slug;
					_node.className = fieldClass;
					_node.innerHTML = value;
					__core.update( _node );

					return _node;
					
				},

				select: function(){

					var v, values, _option;

					const _node = _d.createElement( 'select' );
					_node.name = slug;
					_node.className = fieldClass;

					if( utils.isObject( values = field.values ) ){

						for( v in values ){

							if( !utils.isString( values[v] ) ){
								continue;

							}
							_option = _d.createElement( 'option' );
							_option.value = v;
							_option.innerHTML = utils.stripTags( values[v] );

							if( v === value ){
								_option.selected = true;

							}
							_node.appendChild( _option );

						}

					}
					__core.update( _node );
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
					__core.update( _node );
					return _node;
					
				},

				radio: function(){

					const onradio = function( ev, ui ){
						ev.preventDefault();
						const parentNode = ui.parentNode;
						var dren;

						if( parentNode === null || ( dren = parentNode.children ).length < 1 ){
							return;

						}
						node( dren ).removeClass( classes.active );
						node( ui ).addClass( classes.active );

					};

					const fragment = _d.createDocumentFragment();

					var _radio, values, v, inner;

					if( utils.isObject( values = field.values ) ){

						for( v in values ){

							if( !utils.isObject( values[v] ) || !utils.isString( values[v].title ) || !utils.isString( values[v].icon ) ){
								continue;

							}
							_radio = _d.createElement( 'label' );
							fragment.appendChild( _radio );
							inner = '<input type="radio" class="' + fieldClass + '" name="' + slug + '"value="' + v + '" />';
							inner += '<span class="comet-icon ' + utils.trim( utils.stripTags( values[v].icon ) ) + '"></span>';
							inner += '<span class="comet-title">' + utils.trim( utils.stripTags( values[v].title, '<b><strong><i><span><u><ins>' ) ) + '</span>';
							_radio.innerHTML = inner;

							if( v === value ){
								_radio.className = classes.active;
								_radio.firstChild.checked = true;

							}
							__core.update( _radio.firstChild );
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
					__core.update( _node );
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
						onchange: function( ui, source, color ){
							update( source );

						}

					});

					return fragment;

				},

				editor: function(){

					const _node = _d.createElement( 'textarea' );
					_node.name = slug;
					_node.className = fieldClass + ( !utils.isStringEmpty( op = field.option ) && [ 'advanced', 'force_tag' ].indexOf( op = utils.trim( op ) ) > -1 ? ( op === 'advanced' ? ' comet-fieldEditorAdvanced' : ' comet-fieldEditorForceTag' ) : '' );
					_node.innerHTML = value;
					__core.update( _node );

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
						onchange: function( ui, gdt ){
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

						open: function( ev, ui ){
							ev.preventDefault();
							ev.stopPropagation();
							var args, media;

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

						delete: function( ev, ui ){
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

							button.className = classes.button + ' comet-remove';
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
			return ( utils.isFunction( fields[field.type] ) ? fields[field.type]() : false );

		},

		update: function( _node ){

			node( _node ).on( 'input', function( ev, ui ){
				update( ui );

			});

		}

	};
	data = utils.isObject( data ) ? data : {};

	return __core.tabs();

}

export default __create;/*
	const obj = {};
	var oTabs, oContent, a, _a, isItems, t, tab, tid;

	if( !utils.isObject( tabs ) ){
		return obj;

	}
	oTabs = '';
	oContent = '';

	for( a in tabs ){
		t = tabs[a];
		_a = utils.trim( a.toString() );
		isItems = ( _a === 'items' );

		if( !utils.isString( t.name ) || ( !isItems && !utils.isObject( t.sections ) ) || ( isItems && !utils.isObject( t.tabs ) ) ){
			continue;

		}
		tid = 'comet-modalTab' + _a;
		tab = __tab( ( isItems ? t.tabs : t.sections ), data, isItems );

		oTabs += '<a class="comet-modalTabRef" href="#' + tid + '">';
		oTabs += utils.trim( t.name );
		oTabs += '</a>';

		oContent += '<div id="' + tid + '" class="comet-modalTab">';
		oContent += utils.isString( tab ) ? utils.stripOnly( tab, '<script><meta><link>' ) : __cometi18n.messages.error.unreach;
		oContent += '</div>';

	}
	obj.tabs = oTabs;
	obj.content = oContent;

	return obj;

}*/