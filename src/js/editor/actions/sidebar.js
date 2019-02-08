import sanitize from '../../utils/sanitize.js';
import notification from '../notification.js';
import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import sort from '../../utils/sort.js';
import redefine from '../redefine.js';
//import menu from '../menu/events.js';
//import __menu from '../menu/menu.js';
import __data from '../data.js';

const sidebar = {

	toggle: function( _n ){

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const enabled = 'cpb-active';
			var _tmp, tmp, _p, field, elements, x, _element, search;

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

			node( search ).on( 'keyup change', function( ev1, ui1 ){
				ev1.preventDefault();
				const val = utils.isString( ui1.value ) ? utils.trim( ui1.value ) : '';
				const isEmpty = ( val.length < 1 );
				var elements1, _element1, x1, regex, title;

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

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const disabled = 'cpb-disabled';
			const wait = 'comet-waitWhileIcon';
			var hasChildren = false;
			var id, _ui, dren;

			if( !( id = parse.id( cometdata.post_id ) ) || !( ( _ui = node( ui ) ).hasClass( disabled ) ) ){
				return;

			}

			function toggle( state ){
				var c, _child;


				if( state ){
					_ui.addClass( disabled );

				}else{
					_ui.removeClass( disabled );

				}

				if( !hasChildren ){
					return false;

				}

				for( c in dren ){

					if( !( ( _child = node( dren[c] ) ).isNode() ) || !_child.hasClass( 'cico' ) ){
						continue;

					}

					if( !state || ( state && _child.hasClass( wait ) ) ){
						_child.removeClass( wait );
						continue;

					}
					_child.addClass( wait );

				}

			}

			hasChildren = ( ( dren = ui.children ).length > 0 );
			toggle( true );

			ajax({
				action: 'comet_ajAdmin',
				do: 'save',
				data: JSON.stringify({
					id: id,
					meta: __data.getData(),
					content: sanitize.content(),
					_post: node( document.getElementById( 'comet-postSettings' ) ).serialize()

				})
			}).done(function( r, a, b ){
				var msg;

				switch( ( r = parseInt( r ) ) ){
					case 0:
					case 400:
					msg = __cometi18n.messages.error.savePost;
					break;
					default:
					msg = __cometi18n.messages.success.savePost;
				}
				notification( msg, r );
				toggle( false );

			});

		});

	},

	layout: function( _n ){

		sort({
			handle: _n,
			connectWith: '#cpb-content, .cpb-sectionContent, .cpb-rowContent',
			items: '.cpb-row, .cpb-column, .cpb-section',
			placeholder: 'cpb-edPlaceholder',
			cursor: 'cpb-elementCursor',
			containment: '#cpb-content',
			/*start: function( e, ui, current ){
				__menu.close();

			},*/
			stop: function( e, ui, current ){
				const data_ = __data();
				const _ui = node( ui );
				var sid, rid, cid, columns, _column, sibid, nb, _p, p, r, re, a, w, tmp, position;

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
				//menu();

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
			/*start: function(){
				__menu.close();

			},*/
			stop: function( e, ui, current ){
				const data_ = __data();
				var _ui, closest, _closest, id, t, pid, defname, position, ret, ch;

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

				if( !( id = data_.create( defname, pid, t ) ) || !( ret = layout( data_.getData() ).element( id ) ) ){
					return;

				}
				ch = node( ui.parentNode ).children( 'comet-editorMenuOptions' );
				node( ch ).remove();
				ui.parentNode.replaceChild( ret, ui );
				//menu();

			}

		});
		
	}

};

export default sidebar;
