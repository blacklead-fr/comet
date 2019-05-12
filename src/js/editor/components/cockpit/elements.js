import { isNode, isObject, isString, isEmpty } from '../../../utils/is.js';
import layout from '../../../utils/layout.js';
import parse from '../../../utils/parse.js';
import utils from '../../../utils/utils.js';
import node from '../../../dom/element.js';
import sort from '../../../utils/sort.js';
import __tabs from '../panel/tabs.js';
import __target from '../../target.js';
import panel from '../panel/index.js';
import __data from '../../data.js';

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
				connectWith: '.comet-frame--main, .cpb-sectionContent, .cpb-rowContent',
				items: '.cpb-row, .cpb-column, .cpb-section',
				placeholder: 'cpb-edPlaceholder',
				cursor: 'cpb-elementCursor',
				containment: '.comet-frame--main',
				stop: function( e, ui ){
					const data_ = __data();
					var sid, rid, cid, columns, _ui, sibid, nb, _p, p, re, a, w, tmp, position;

					if( !( _ui = node( ui ) ) || !( _p = node( ui.parentNode ) ) ){
						return;

					}

					function next( items ){
						const closest = _ui.next( { selector: items } );
						var t;

						return ( isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last' );

					}
					re = {};

					if( p.id === 'comet-frame--main' ){
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
						columns = _p.children( { selector: '.cpb-column' } );
						w = 100;
						nb = 1;

						if( columns.length > -1 ){
							nb = columns.length + 1;
							w =  Number( 100 / nb ).toFixed( 2 );

							for( a in columns ){

								if( !isNode( columns[a] ) || !( sibid = parse.dataset( columns[a], 'id' ) ) || !( sibid = parse.id( sibid ) ) ){
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
				containment: '.comet-frame--main',
				stop: function( ev, ui, current ){
					const data_ = __data();
					const target_ = __target();
					var preload, closest, id, t, pid, defname, lyt, element, tabs, edata;

					if( !isString( defname = parse.dataset( current, 'id' ) ) || isEmpty( defname = defname.trim() ) ){
						return;

					}

					if( !( pid = parse.dataset( ui.parentNode.parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) || !data_.get( pid, 'columns' ) ){
						return;

					}
					closest = node( ui ).next( { selector: '.cpb-element' } );
					t = isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

					if( !( id = data_.create( defname, pid, t ) ) || !( lyt = layout( data_.getData() ).element( id ) ) ){
						return;

					}
					preload = _d.createElement( 'div' );
					preload.appendChild( lyt );
					element = preload.firstChild;

					ui.parentNode.replaceChild( element, ui );

					if( !isObject( edata = utils.getElement( defname ) ) || !isObject( edata.tabs ) ){
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

	if( !isNode( parentNode ) ){
		return false;

	}

	(function(){
		const elements = utils.getElements();
		var btn, e, element;

		if( !isObject( elements ) ){
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

			if( isEmpty( e ) || !isObject( element = elements[e] ) || !isString( element.name ) || isEmpty( element.name ) ){
				continue;

			}
			btn = create( e, element.name.trim(), element.icon.trim() );
			__initialize.element( btn );

		}

	})();

	return __elements;

}