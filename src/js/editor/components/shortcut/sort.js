import { isNode, isFunction } from '../../../utils/is.js';
import { shortcut as getShortcut } from '../stored.js';
import parse from '../../../utils/parse.js';
import node from '../../../dom/element.js';
import { CORE } from './core.js';
import __id from '../../id.js';

const TYPES = {

	section: function( targetNode ){

		return {

			connectWith: [ {
				selector: '.comet-frame--main',
				items: '.cpb-section'
			} ],
			containment: '.comet-frame--main',

			start: function(){
				const sectionNode = CORE.getParent( targetNode, classes.section );
				var id;

				if( !isNode( sectionNode ) || !( id = parse.dataset( sectionNode, 'id' ) ) || !parse.id( id ) ){
					return;

				}
				getShortcut().destroy();
				sectionNode.style.visibility = 'hidden';
				return sectionNode;

			},

			stop: function( e, ui, sectionNode ){
				const id_ = __id();
				var id, t, closest;

				sectionNode.removeAttribute( 'style' );

				if( !( id = parse.dataset( sectionNode, 'id' ) ) || !( id = parse.id( id ) ) ){
					return;

				}
				t = 'last';
				closest = node( ui ).next( '.cpb-section' );
				t = isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

				id_.remove( id, 'sections', id );
				id_.insert( id, 'sections', id, t );
				ui.parentNode.replaceChild( sectionNode , ui );

			}
		};

	},

	row: function( targetNode ){

		return {

			connectWith: [ {
				selector: '.cpb-rows',
				items: '.cpb-row'
			} ],
			containment: '.comet-frame--main',

			start: function(){
				const rowNode = CORE.getParent( targetNode, classes.row );
				var id;

				if( !isNode( rowNode ) || !( id = parse.dataset( rowNode, 'id' ) ) || !parse.id( id ) ){
					return;

				}
				getShortcut().destroy();
				rowNode.style.visibility = 'hidden';
				return rowNode;

			},
			stop: function( e, ui, rowNode ){
				const id_ = __id();
				var id, sid, nsid, t, closest;

				if( !isNode( rowNode ) || !( id = parse.dataset( rowNode, 'id' ) ) || !( id = parse.id( id ) ) ){
					return;

				}
				if( !( sid = parse.dataset( CORE.getParent( rowNode, classes.section ), 'id' ) ) || !( sid = parse.id( sid ) ) ){
					return;

				}

				if( !( nsid = parse.dataset( CORE.getParent( ui, classes.section ), 'id' ) ) || !( nsid = parse.id( nsid ) ) ){
					return;

				}
				closest = node( ui ).next( '.cpb-row' );
				t = isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

				rowNode.removeAttribute( 'style' );
				id_.remove( id, 'rows', sid );
				id_.insert( id, 'rows', nsid, t );
				ui.parentNode.replaceChild( rowNode , ui );

			}

		};

	},

	column: function( targetNode ){
		
		return {

			connectWith: [ {
				selector: '.cpb-rowContent',
				items: '.cpb-column'
			} ],
			containment: '.comet-frame--main',

			start: function(){
				const columnNode = CORE.getParent( targetNode, classes.column );
				var id;

				if( !isNode( columnNode ) || !( id = parse.dataset( columnNode, 'id' ) ) || !( parse.id( id ) ) ){
					return;

				}
				getShortcut().destroy();
				columnNode.style.visibility = 'hidden';
				return columnNode;

			},
			stop: function( e, ui, columnNode ){
				const id_ = __id();
				var containerNode, uiContainerNode, id, rid, nrid, t, closest;

				if( !isNode( columnNode ) || !( id = parse.dataset( columnNode, 'id' ) ) || !( id = parse.id( id ) ) ){
					return;

				}

				if( ( containerNode = columnNode.parentNode ) === null || !( rid = parse.dataset( containerNode.parentNode, 'id' ) ) || !( rid = parse.id( rid ) ) ){
					return;

				}

				if( !__data().get( rid, 'rows' ) || ( uiContainerNode = ui.parentNode ) === null || !( nrid = parse.dataset( uiContainerNode.parentNode, 'id' ) ) || !( nrid = parse.id( nrid ) ) ){
					return;

				}
				closest = node( ui ).next( '.cpb-column' );
				t = isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

				columnNode.removeAttribute( 'style' );
				id_.remove( id, 'columns', rid );
				id_.insert( id, 'columns', nrid, t );
				uiContainerNode.replaceChild( columnNode , ui );

				if( rid !== nrid ){
					redefine.columns( containerNode );
					redefine.columns( uiContainerNode );

				}
			}

		};

	},

	element: function( targetNode ){
		
		return {

			connectWith: [ {
				selector: '.cpb-columnContent',
				items: '.cpb-element'
			} ],
			containment: '.comet-frame--main',

			start: function(){
				const elementNode = CORE.getParent( targetNode, classes.element );
				var id;

				if( !isNode( elementNode ) || !( id = parse.dataset( elementNode, 'id' ) ) || !parse.id( id ) ){
					return;

				}
				getShortcut().destroy();
				elementNode.style.visibility = 'hidden';
				return elementNode;

			},
			stop: function( e, ui, elementNode ){
				const id_ = __id();
				var id, cid, ncid, t, closest;

				if( !isNode( elementNode ) || !( id = parse.dataset( elementNode, 'id' ) ) || !( id = parse.id( id ) ) ){
					return;

				}

				if( !( cid = parse.dataset( CORE.getParent( elementNode, classes.column ), 'id' ) ) || !( cid = parse.id( cid ) ) ){
					return;

				}

				if( !__data().get( cid, 'columns' ) || !( ncid = parse.dataset( CORE.getParent( ui, classes.column ), 'id' ) ) || !( ncid = parse.id( ncid ) ) ){
					return;

				}
				closest = node( ui ).next( '.cpb-element' );
				t = isNode( closest ) && ( t = parse.dataset( closest, 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

				elementNode.removeAttribute( 'style' );
				id_.remove( id, 'elements', cid );
				id_.insert( id, 'elements', ncid, t );
				ui.parentNode.replaceChild( elementNode , ui );

			}

		};

	}

};

export function getSortParameters( targetNode, type ){

	return isFunction( TYPES[type] ) ? TYPES[type]( targetNode ) : false;

}