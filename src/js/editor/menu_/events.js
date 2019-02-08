import __editor from '../panel/parts/editor.js';
import parts from '../panel/parts/parts.js';
import layout from '../../utils/layout.js';
import utils from '../../utils/utils.js';
import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import load from '../../utils/load.js';
import __tabs from '../panel/tabs.js';
import redefine from '../redefine.js';
import __target from '../target.js';
import init from '../panel/init.js';
import __data from '../data.js';
import panel from '../panel.js';
import __menu from './menu.js';

export default function( state ){
	const prop = {};
	const data_ = __data();
	const target_ = __target();

	prop.open = function( ev, ui ){
		ev.preventDefault();

		const options = {};
		const enabled = 'cpb-active';
		const active = __menu.getActive();
		const priv = {};
		var _column = false;
		var _element = false;
		var _p, _pnode, _tmp, role, action, get;

		priv.section = function(){
			const args = {};
			const type = 'sections';
			const sdata = utils.getSettingsFrom( 'section' );
			var _section, id, nid;


			if( !( ( _tmp = node( _column.prop().parentNode ) ).isNode() ) || !( ( _tmp = node( _tmp.prop().parentNode ) ).isNode() ) ){
				return false;

			}

			if( !( ( _tmp = node( _tmp.prop().parentNode ) ).isNode() ) || !( ( _section = node( _tmp.prop().parentNode ) ).isNode() ) ){
				return false;

			}

			if( !( id = parse.dataset( _section.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
				return false;

			}

			if( role === 'edit' ){

				target_.set({
					id: id,
					type: type,
					node: _section.prop()
				});

				args.title = __cometi18n.options.section.edit;
				args.tabs = __tabs( sdata, data_.get( id, type ) );
				return args;

			}else if( role === 'del' ){

				if( !node( _section.prop().parentNode ).isNode() ){
					return false;

				}
				data_.remove( id, type );
				_section.prop().parentNode.removeChild( _section.prop() );

			}else if( role === 'dup' ){

				if( !( nid = data_.clone( id, type ) ) || !( ret = layout( data_.getData() ).section( nid ) ) ){
					return false;

				}
				_section.after( ret );

			}
			return true;

		};

		priv.row = function(){
			const args = {};
			const type = 'rows';
			const rdata = utils.getSettingsFrom( 'row' );
			var _row, _section, id, pid, nid;


			if( !( ( _tmp = node( _column.prop().parentNode ) ).isNode() ) || !( ( _row = node( _tmp.prop().parentNode ) ).isNode() ) ){
				return false;

			}

			if( !( id = parse.dataset( _row.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
				return false;

			}

			if( role === 'edit' ){

				target_.set({
					id: id,
					type: type,
					node: _row.prop()
				});

				args.title = __cometi18n.options.row.edit;
				args.tabs = __tabs( rdata, data_.get( id, type ) );
				return args;

			}else if( role === 'del' ){

				if( !node( _row.prop().parentNode ).isNode() ){
					return false;

				}
				data_.remove( id, type );
				_row.prop().parentNode.removeChild( _row.prop() );

			}else if( role === 'dup' ){

				if( !( ( _tmp = node( _row.prop().parentNode ) ).isNode() ) || !( ( _section = node( _tmp.prop().parentNode ) ).isNode() ) ){
					return false;

				}

				if( !( pid = parse.dataset( _section.prop(), 'id' ) ) || !( pid = parse.id( pid ) ) ){
					return false;

				}

				if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).row( nid ) ) ){
					return false;

				}
				_row.after( ret );

			}
			return true;

		};

		priv.column = function(){
			const args = {};
			const type = 'columns';
			const cdata = utils.getSettingsFrom( 'column' );
			var _row, id, pid, nid;

			if( !( id = parse.dataset( _column.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
				return false;

			}

			if( role === 'edit' ){

				target_.set({
					id: id,
					type: type,
					node: _column.prop()
				});

				args.title = __cometi18n.options.column.edit;
				args.tabs = __tabs( cdata, data_.get( id, type ) );
				return args;

			}else if( role === 'del' ){

				if( !( ( _tmp = node( _column.prop().parentNode ) ).isNode() ) ){
					return false;

				}
				data_.remove( id, type );
				_tmp.prop().removeChild( _column.prop() );
				redefine.columns( _tmp.prop() );

			}else if( role === 'dup' ){

				if( !( ( _tmp = node( _column.prop().parentNode ) ).isNode() ) || !( ( _row = node( _tmp.prop().parentNode ) ).isNode() ) ){
					return false;

				}

				if( !( pid = parse.dataset( _row.prop(), 'id' ) ) || !( pid = parse.id( pid ) ) ){
					return false;

				}

				if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).column( nid ) ) ){
					return false;

				}
				_column.after( ret );
				redefine.columns( _tmp.prop() );

			}
			return true;

		};

		priv.element = function(){
			const args = {};
			const type = 'elements';
			var _row, id, pid, nid, _type, tmp, x, dren, _child, edata;

			if( !( id = parse.dataset( _element.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
				return false;

			}

			if( role === 'edit' ){

				if( !utils.isObject( tmp = data_.get( id, type ) ) || utils.isStringEmpty( _type = tmp._type ) ){
					return false;

				}

				if( !utils.isObject( edata = utils.getElement( _type ) ) || !utils.isObject( edata.tabs ) ){
					return false;

				}

				target_.set({
					id: id,
					type: type,
					node: _element.prop()
				});

				args.title = __cometi18n.options.element.edit;
				args.tabs = __tabs( edata.tabs, tmp );
				return args;

			}else if( role === 'del' ){

				if( !( ( _tmp = node( _element.prop().parentNode ) ).isNode() ) ){
					return false;

				}
				data_.remove( id, type );
				_tmp.prop().removeChild( _element.prop() );

			}else if( role === 'dup' ){

				if( !( pid = parse.dataset( _column.prop(), 'id' ) ) || !( pid = parse.id( pid ) ) ){
					return false;

				}

				if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).element( nid ) ) ){
					return false;

				}
				_element.after( ret );
				load.icons();
				load.images();

			}
			return true;

		};

		__menu.close();

		if( !active || !( role = parse.dataset( ui, 'role' ) ) || !( ( _pnode = node( active.parentNode ) ).isNode() ) ){
			return;

		}

		if( !( ( _p = node( ui.parentNode ) ).isNode() ) || !( action = parse.dataset( _p.prop(), 'action' ) ) || !( action in priv ) ){
			return;

		}
		_column = _pnode;

		if( _pnode.hasClass( 'cpb-element' ) ){
			_element = _pnode;

			if( !( ( _tmp = node( _element.prop().parentNode ) ).isNode() ) || !( ( _column = node( _tmp.prop().parentNode ) ).isNode() ) ){
				return;

			}

		}

		if( !utils.isObject( get = priv[action]() ) || !( 'tabs' in get ) || !( 'title' in  get ) ){
			return;

		}

		options.id = false;
		options.title = get.title;
		options.content = 'content' in get.tabs ? get.tabs.content : '';
		options.tabs = 'tabs' in get.tabs ? get.tabs.tabs : '';
		options.close = {
			inner: '<span class="cico cico-x"></span>',
			title: __cometi18n.ui.close,
			do: function( e, ui ){
				target_.reset();
				redefine.workflow();
				__editor( true );
			},
		};

		panel( options );
		init();
		
	};

	prop.button = function( ev, ui ){
		ev.preventDefault();

		const _ui = node( ui );
		const open = _ui.hasClass( __menu.component.classes.active );
		var items, item, button;
		var _p, isElement, rec, x, x1, menu, type, type1, cl1, cl2;

		__menu.close();

		if( open || !( ( _p = node( ui.parentNode ) ).isNode() ) || !utils.isObject( __cometi18n.options ) ){
			return;

		}
		isElement = _p.hasClass( 'cpb-element' );
		rec = ui.getBoundingClientRect();

		_ui.addClass( __menu.component.classes.active );

		menu = document.createElement( 'div' );
		menu.id = __menu.component.id;
		menu.className = 'comet-menuComponentOptions';
		menu.style.top = ( rec.top + rec.height ) + 'px';
		menu.style.left = rec.left + 'px';

		for( x in __cometi18n.options ){

			if( utils.isStringEmpty( x ) || ( type === 'element' && !isElement ) ){
				continue;

			}
			cl1 = 'comet-mcList comet-mcList' + utils.capitalize( type = utils.trim( x ) );
			items = document.createElement( 'div' );
			items.className = cl1;
			items.innerHTML = '<div class="comet-mcListTitle">' + utils.capitalize( type.substring( 0, 1 ) ) + '</div>';

			item = document.createElement( 'div' );
			item.className = cl1;
			item.dataset.action = type;

			items.appendChild( item );

			for( x1 in __cometi18n.options[type] ){

				if( utils.isStringEmpty( x1 ) ){
					continue;

				}
				cl2 = 'comet-mcItem';
				cl2 += ' comet-mcItem' + utils.capitalize( type1 = utils.trim( x1 ) );
				cl2 += ' comet-mcItem' + utils.capitalize( type1 ) + utils.capitalize( type );

				button = document.createElement( 'button' );
				button.className = cl2;
				button.dataset.role = type1;
				button.innerHTML = __cometi18n.options[type][type1];
				item.appendChild( button );
				node( button ).on( 'click', prop.open );

			}
			menu.appendChild( items );

		}
		document.body.appendChild( menu );

	};

	prop.elcol = function( ev, ui ){
		ev.stopPropagation();

		const buttons = document.getElementsByClassName( __menu.component.classes.button );
		var _ui, x, _button, _p, d, col;

		if( buttons.length > 0 ){

			for( x in buttons ){

				if( ( ( _button = node( buttons[x] ) ).hasClass( __menu.component.classes.active ) ) || !( ( _p = node( _button.prop().parentNode ) ).isNode() ) ){
					continue;

				}
				_p.prop().removeChild( _button.prop() );

			}
		}


		if( ev.type === 'mouseleave' || ( !( col = ( ( _ui = node( ui ) ).hasClass( 'cpb-column' ) ) ) && !_ui.hasClass( 'cpb-element' ) ) ){
			return;

		}

		if( ( col && ui.getElementsByClassName( 'cpb-element' ).length > 0 ) || ui.querySelectorAll( '.' + __menu.component.classes.active + '.' + __menu.component.classes.button ).length > 0 ){
			return;

		}
		d = document.createElement( 'button' );
		d.className = __menu.component.classes.button + ' comet-button';
		d.innerHTML = '<span class="cico cico-more"></span>';
		ui.appendChild( d );
		node( d ).on( 'click', prop.button );

	};

	node( '.cpb-column, .cpb-element' ).on( 'mouseenter mouseleave', prop.elcol );

	node( '#cpb-content' ).on( 'scroll', __menu.setPosition );

	node( window ).on( 'resize', __menu.setPosition );

}