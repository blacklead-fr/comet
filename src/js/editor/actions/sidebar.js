import sanitize from '../../utils/sanitize.js';
import notification from '../notification.js';
import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import sort from '../../utils/sort.js';
import ajax from '../../utils/ajax.js';
import redefine from '../redefine.js';
import __tabs from '../panel/tabs.js';
import __target from '../target.js';
import __data from '../data.js';
import panel from '../panel.js';

/* global document, __cometi18n, __cometdata */

const sidebar = {

	toggle: function( _n ){

		node( _n ).on( 'click', function( ev, ui ){
			const enabled = 'cpb-active';
			var _tmp, tmp, _p, elements, x, _element, search;

			ev.preventDefault();

			if( !( ( _tmp = node( ui.parentNode ) ).isNode() ) || !( ( _p = node( ( tmp = _tmp.prop() ).parentNode ) ).isNode() ) ){
				return;

			}

			if( _p.hasClass( enabled ) ){
				_p.removeClass( enabled );
				node( tmp.getElementsByClassName( 'comet-searchbar' ) ).remove();
				ui.innerHTML = '<span class="cico cico-elements"></span>';

				if( ( elements = document.getElementsByClassName( 'comet-listElement' ) ).length > 0 ){

					for( x in elements ){

						if( !( ( _element = node( elements[x] ) ).isNode() ) ){
							continue;

						}
						_element.prop().style.display = 'block';

					}

				}
				redefine.workflow();
				return;
			}
			_p.addClass( enabled );
			ui.innerHTML = '<span class="cico cico-x"></span>';

			search = document.createElement( 'input' );
			search.type = 'text';
			search.className = 'comet-searchbar';
			search.placeholder = __cometi18n.ui.sElement;
			tmp.appendChild( search );

			redefine.workflow();

			node( search ).on( 'input', function( ev1, ui1 ){
				const val = utils.isString( ui1.value ) ? utils.trim( ui1.value ) : '';
				const isEmpty = ( val.length < 1 );
				var elements1, _element1, x1, regex, title;
				
				ev1.preventDefault();

				if( ( elements1 = document.getElementsByClassName( 'comet-listElement' ) ).length < 1 ){
					return;

				}
				regex = new RegExp( val, 'i' );

				for( x1 in elements1 ){

					if( !( ( _element1 = node( elements1[x1] ) ).isNode() ) || utils.isStringEmpty( title = _element1.prop().getAttribute( 'aria-label' ) ) ){
						continue;

					}

					if( !isEmpty && title.search( regex ) === -1 ){
						_element1.prop().style.display = 'none';
						continue;

					}
					_element1.prop().style.display = 'inline-block';

				}
			});

		});

	},

	save: function( _n ){

		var is_saving = false;

		const _d = document;

		const __core = {

			toggle: function( button, state ){
				const waitwhile = 'comet-waitwhile';
				const _button = node( button );

				if( !_button.isNode() ){
					return;

				}

				if( utils.isBool( state ) && state ){
					_button.addClass( waitwhile );
					return;

				}
				_button.removeClass( waitwhile );

			},

			catch_data: function(){
				const form = _d.getElementById( 'comet-postSettings' );
				const n_names = [ 'input', 'select', 'textarea' ];
				const i_types = [ 'text', 'number', 'range', 'hidden', 'date', 'color', 'checkbox', 'radio', 'email', 'image', 'file', 'month', 'password', 'search', 'tel', 'time', 'url', 'week' ];
				const f_data = {};
				var fields, field, a, index;

				if( !node( form ).isNode() || form.nodeName.toLowerCase() !== 'form' || ( fields = form.elements ).length < 1 ){
					return f_data;

				}

				for( a = 0; a < fields.length; a++ ){

					if( !node( field = fields[a] ).isNode() || ( index = n_names.indexOf( field.nodeName.toLowerCase() ) ) < 0 ){
						continue;

					}

					if( utils.isStringEmpty( field.name ) ){
						continue;

					}

					if( index === 0 && i_types.indexOf( field.type.toLowerCase() ) < 0 ){
						continue;

					}
					f_data[field.name] = utils.encode_chars( field.value );

				}

				return f_data;

			},

			save: function( ev, ui ){
				var id, e_data;

				ev.preventDefault();

				if( !( id = parse.id( __cometdata.post_id ) ) || is_saving ){
					return;

				}
				is_saving = true;
				__core.toggle( ui, true );
				e_data = __core.catch_data();
				e_data.meta = __data().getData();
				e_data.post_content = sanitize.content();

				ajax({
					do: 'save',
					id: id,
					data: utils.json_encode( e_data )

				}).done(function( r ){
					var code = 400;
					var msg = __cometi18n.messages.error.savePost;

					if( parseInt( r ) > 0 ){
						msg = __cometi18n.messages.success.savePost;
						code = 200;

					}
					notification( msg, code );
					is_saving = false;
					__core.toggle( ui, false );

				});

			}

		};

		node( _n ).on( 'click', __core.save );

	},

	layout: function( _n ){

		sort({
			handle: _n,
			connectWith: '#cpb-content, .cpb-sectionContent, .cpb-rowContent',
			items: '.cpb-row, .cpb-column, .cpb-section',
			placeholder: 'cpb-edPlaceholder',
			cursor: 'cpb-elementCursor',
			containment: '#cpb-content',
			stop: function( e, ui ){
				const data_ = __data();
				const _ui = node( ui );
				var sid, rid, cid, columns, _column, sibid, nb, _p, p, re, a, w, tmp, position;

				if( !( _p = node( ui.parentNode ) ).isNode() || !_ui.isNode() || !( p = _p.prop() ) ){
					return;

				}

				function next( items ){
					const closest = _ui.next( items );
					const _closest = node( closest );
					var t;

					return ( _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last' );

				}
				re = {};

				if( p.id === 'cpb-content' ){
					position = next( '.cpb-section' );
					sid = data_.create( 'sections', 0, position );

					if( sid ){
						tmp = data_.create( 'rows', sid, 'last' );

						if( tmp ){
							tmp = data_.create( 'columns', tmp, 'last' );
						}
						re = layout( data_.getData() ).section( sid );

					}

				}else if( _p.hasClass( 'cpb-rows' ) && ( sid = parse.dataset( p.parentNode, 'id' ) ) && ( sid = parse.id( sid ) ) ){
					
					position = next( '.cpb-row' );
					rid = data_.create( 'rows', sid, position );

					if( rid ){
						tmp = data_.create( 'columns', rid, 'last' );
						re = layout( data_.getData() ).row( rid );

					}

				}else if( _p.hasClass( 'cpb-rowContent' ) && ( rid = parse.dataset( p.parentNode, 'id' ) ) && ( rid = parse.id( rid ) ) ){
					
					position = next( '.cpb-column' );
					cid = data_.create( 'columns', rid, position );
					columns = _p.children( 'cpb-column' );
					w = 100;
					nb = 1;

					if( columns.length > -1 ){
						nb = columns.length + 1;
						w =  Number( 100 / nb ).toFixed( 2 );

						for( a in columns ){

							if( !( ( _column = node( columns[a] ) ).isNode() ) || !( sibid = parse.dataset( _column.prop(), 'id' ) ) || !( sibid = parse.id( sibid ) ) ){
								continue;

							}
							data_.set( sibid, 'columns', { wsize: w } );
							layout( data_.getData(), 'css' ).column( sibid );

						}
					}
					data_.set( cid, 'columns', { wsize: w } );
					p.dataset.ncol = nb;
					re = layout( data_.getData() ).column( cid );

				}

				if( !re ){
					return;

				}
				ui.parentNode.replaceChild( re, ui );

			}

		});
		
	},

	element: function( _n ){

		sort({
			handle: _n,
			connectWith: '.cpb-columnContent',
			items: '.cpb-element',
			placeholder: 'cpb-edSortPlaceholder',
			cursor: 'cpb-elementCursor',
			containment: '#cpb-content',
			stop: function( ev, ui, current ){
				const data_ = __data();
				const target_ = __target();
				var preload, _ui, closest, _closest, id, t, pid, defname, lyt, element, tabs, edata;

				if( !( defname = parse.dataset( current, 'id' ) ) || utils.isStringEmpty( defname ) ){
					return;

				}
				defname = utils.trim( defname );

				if( !( pid = parse.dataset( ui.parentNode.parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) || !data_.get( pid, 'columns' ) ){
					return;

				}
				_ui = node( ui );
				closest = _ui.next( '.cpb-element' );
				_closest = node( closest );
				t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

				if( !( id = data_.create( defname, pid, t ) ) || !( lyt = layout( data_.getData() ).element( id ) ) ){
					return;

				}
				preload = document.createElement( 'div' );
				preload.appendChild( lyt );
				element = preload.firstChild;

				ui.parentNode.replaceChild( element, ui );

				if( !utils.isObject( edata = utils.getElement( defname ) ) || !utils.isObject( edata.tabs ) ){
					return;

				}
				tabs = __tabs( edata.tabs, data_.get( id, defname ) );
				target_.reset();

				target_.set({
					id: id,
					type: 'elements',
					node: element
				});

				panel({
					title: __cometi18n.options.element.edit,
					content: 'content' in tabs ? tabs.content : '',
					tabs: 'tabs' in tabs ? tabs.tabs : '',
					close: {
						do: function(){
							target_.reset();
						}
					}

				});

			}

		});
		
	}

};

export default sidebar;
