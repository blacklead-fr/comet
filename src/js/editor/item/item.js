import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import initPanel from '../panel/init.js';
import node from '../../utils/node.js';
import redefine from '../redefine.js';
import __tabs from '../panel/tabs.js';
import __target from '../target.js';
import __data from '../data.js';
import panel from '../panel.js';
import kit from './kit.js';

export default function (){

	const prop = {

		add: function(){

			node( '.comet-edModalItemAdd' ).on( 'click', function( ev, ui ){
				ev.preventDefault();
				const target_ = __target();
				var p, dren, pid, id, c, _child;

				if( ui.parentNode === null || ( p = ui.parentNode.parentNode ) === null ){
					return;

				}

				if( ( dren = p.children ).length < 1 || !( pid = target_.id() ) || target_.type() === null ){
					return;

				}

				if( !( id = __data().create( 'items', pid, 'last' ) ) || !node( o = kit( id ) ).isNode() ){
					return;

				}

				for( c = 0; c < dren.length; c++ ){

					if( !( ( _child = node( dren[c] ) ).isNode() ) || !_child.hasClass( 'comet-edModalItems' ) ){
						continue;

					}
					dren[c].appendChild( o );

				}
				prop.open();
				prop.remove();

			});


		},

		open: function(){

			node( '.comet-edModalItemEdit' ).on( 'click', function( ev, ui ){
				ev.preventDefault();
				const target_ = __target();
				const data_ = __data();
				const args1 = {};
				var _p, id, tabs1, tid, element, edata;

				if( !( ( _p = node( ui.parentNode ) ).isNode() ) || !( id = parse.dataset( _p.prop(), 'id' ) ) || !( id = parse.id( id ) ) || !( tid = target_.id() ) ){
					return;

				}

				if( !utils.isObject( element = data_.get( tid, 'elements' ) ) || !utils.isObject( edata = utils.getElement( element._type ) ) ){
					return;

				}

				if( !utils.isObject( edata.tabs ) || !utils.isObject( edata.tabs.items ) || !utils.isObject( edata.tabs.items.tabs ) ){
					return;

				}
				tabs1 = __tabs( edata.tabs.items.tabs, data_.get( id, 'items' ) );
				target_.set( { state: 'items', item: id } );

				args1.id = false;
				args1.title = __cometi18n.ui.editItem;
				args1.tabs = 'tabs' in tabs1 ? tabs1.tabs : '';
				args1.content = 'content' in tabs1 ? tabs1.content : '';
				args1.close = {
					inner: '<span class="cico cico-arrow-left-alt"></span>',
					title: __cometi18n.ui.back,
					do: function( e, ui ){
						const args2 = {};
						var tabs2;

						if( !tid ){
							return false;

						}
						tabs2 = __tabs( edata.tabs, element );
						target_.set( { state: null, item: null } );

						args2.id = false;
						args2.title = __cometi18n.options.element.edit;
						args2.tabs = 'tabs' in tabs2 ? tabs2.tabs : '';
						args2.content = 'content' in tabs2 ? tabs2.content : '';
						args2.close = {
							inner: '<span class="cico cico-x"></span>',
							title: __cometi18n.ui.close,
							do: function( e, ui ){
								target_.reset();
								redefine.workflow();
							}
						};

						panel( args2 );
						initPanel();

					}
				};

				panel( args1 );
				initPanel();

			});


		},

		remove: function(){

			node( '.comet-edModalItemDelete' ).on( 'click', function( ev, ui ){
				ev.preventDefault();
				var _p, id;

				if( !( ( _p = node( ui.parentNode ) ).isNode() ) || !( id = parse.dataset( _p.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
					return;

				}

				if( _p.remove() ){
					__data().remove( id, 'items', __target().id() );

				}

			});


		}


	};

	function init(){
		var x;

		for( x in prop ){
			prop[x]();

		}
	}

	init();
	
}