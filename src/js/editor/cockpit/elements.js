import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import sort from '../../utils/sort.js';
import __tabs from '../panel/tabs.js';
import __target from '../target.js';
import __data from '../data.js';
import panel from '../panel.js';

export default function( parentNode ){

	const _d = document;

	const className = 'comet-cockpit__elements__list';

	const __classes = {
		main: className,
		button: className + '__element',
		icon: className + '__element__icon',
		title: className + '__element__title'

	};

	const __elements = [];

	const __initialize = {

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

	if( !node( parentNode ).isNode() ){
		return false;

	}

	(function(){
		const elements = utils.getElements();
		var btn, e, element;

		if( !utils.isObject( elements ) ){
			return;

		}

		function create( id, name, icon ){
			const tmp = _d.createElement( 'button' );
			tmp.className = __classes.button;
			tmp.setAttribute( 'aria-label', name );
			tmp.dataset.id = id;
			tmp.innerHTML = '<span class="' + __classes.icon + ' cico ' + icon + '"></span><span class="' + __classes.title + '"><span>' + name + '</span></span>';
			parentNode.appendChild( tmp );
			__elements[__elements.length] = tmp;
			return tmp;

		}

		btn = create( 'layout', __cometi18n.ui.layout, 'cico-layout' );
		__initialize.layout( btn );

		for( e in elements ){

			if( !utils.isObject( element = elements[e] ) || utils.isStringEmpty( element.name ) || utils.isStringEmpty( e ) ){
				continue;

			}
			btn = create( e, utils.trim( element.name ), utils.trim( element.icon ) );
			__initialize.element( btn );

		}

	})();

	return __elements;

}