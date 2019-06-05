import { isNode, isObject, isString, isEmpty } from '../../../utils/is.js';
import { ClassName } from '../../../utils/className.js';
import layout from '../../../utils/layout.js';
import parse from '../../../utils/parse.js';
import utils from '../../../utils/utils.js';
import node from '../../../dom/element.js';
import __target from '../../target.js';
import panel from '../panel/index.js';
import __data from '../../data.js';

const DOCUMENT = document;

const ROOT = ClassName( 'comet-cockpit' ).element( 'elements__list' );

const CLASSNAME = ClassName( ROOT );

const CORE = {

	classes: {
		button: CLASSNAME.element( 'element' ),
		icon: CLASSNAME.element( 'element__icon' ),
		title: CLASSNAME.element( 'element__title' )

	},

	layout: {
		handle: _n,
		connectWith: [ {
			selector: '.comet-frame--main',
			items: '.cpb-section'
		},
		{
			selector: '.cpb-sectionContent',
			items: '.cpb-row'
		},
		{
			selector: '.cpb-rowContent',
			items: '.cpb-column'
		} ],
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

			if( _p.hasClass( 'comet-frame--main' ) ){
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

	},

	element: {
		connectWith: [ {
			selector: '.cpb-columnContent',
			items: '.cpb-element'
		} ],
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
			preload = DOCUMENT.createElement( 'div' );
			preload.appendChild( lyt );
			element = preload.firstChild;

			ui.parentNode.replaceChild( element, ui );

			if( !isObject( edata = utils.getElement( defname ) ) || !isObject( edata.tabs ) ){
				return;

			}
			target_.reset();

			target_.set({
				id: id,
				type: 'elements',
				node: element
			});

			panel({
				title: __cometi18n.options.element.edit,
				data: {
					tabs: edata.tabs,
					current: data_.get( id, defname )
				},
				close: {
					do: function(){
						target_.reset();
					}
				}

			});

		}

	},

	createElement: function( data ){
		const element = DOCUMENT.createElement( 'button' );
		var inner = '<span class="' + ClassName( CORE.classes.icon ).combineWith( [ 'cico', data.icon ] ) + '"></span>';

		inner += '<span class="' + CORE.classes.title + '"><span>' + data.name + '</span></span>';

		element.className = CORE.classes.button;
		element.setAttribute( 'aria-label', data.name );
		element.dataset.id = data.id;
		element.innerHTML = inner;

		data.parentNode.appendChild( element );
		data.elements[data.elements.length] = element;

		node( element ).sort( data.id === 'layout' ? CORE.layout : CORE.element );

		return element;

	}

};

export default function( parentNode ){

	const elements = utils.getElements();

	const __elements = [];

	var e, element;

	if( !isNode( parentNode ) || !isObject( elements ) ){
		return false;

	}
	CORE.createElement( {
		id: 'layout',
		name: __cometi18n.ui.layout,
		icon: 'cico-layout',
		parentNode,
		elements: __elements
	} );

	for( e in elements ){

		if( isEmpty( e ) || !isObject( element = elements[e] ) || !isString( element.name ) || isEmpty( element.name ) ){
			continue;

		}
		CORE.createElement( {
			id: e,
			name: element.name.trim(),
			icon: element.icon.trim(),
			parentNode,
			elements: __elements
		} );

	}

	return __elements;

}