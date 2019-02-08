import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import __menu from '../menu/menu.js';
import __data from '../data.js';
import __id from '../id.js';

const obj = {
	handle: '.comet-mcItemMoveColumn',
	connectWith : '.cpb-rowContent',
	items: '.cpb-column',
	placeholder: 'cpb-edSortPlaceholder',
	cursor: 'cpb-elementCursor',
	containment: '#cpb-content',
	start: function( e, ui ){
		const button = __menu.getActive();
		var column, p, tmp;

		__menu.close();

		if( !node( button ).isNode() || !node( button.parentNode ).isNode() ){
			return;

		}
		p = button.parentNode;

		if( node( p ).hasClass( 'cpb-column' ) ){
			column = p;

		}else if(  node( p ).hasClass( 'cpb-element' ) ){
			column = p.parentNode.parentNode;

		}else{
			return;

		}

		if( !node( column ).isNode() || !( tmp = parse.dataset( column, 'id' ) ) || !( parse.id( tmp ) ) ){
			return;

		}
		column.style.visibility = 'hidden';
		return column;

	},
	stop: function( e, ui, col ){
		const id_ = __id();
		var _ui, id, ref, nref, rid, nrid, t, closest, _closest;

		if( !node( col ).isNode() || !( id = parse.dataset( col, 'id' ) ) || !( id = parse.id( id ) ) ){
			return;

		}

		if( !node( ( ref = col.parentNode ) ).isNode() || !node( ref.parentNode ).isNode() ){
			return;

		}

		if( !( rid = parse.dataset( ref.parentNode, 'id' ) ) || !( rid = parse.id( rid ) ) ){
			return;

		}

		if( !__data().get( rid, 'rows' ) || !node( ( nref = ui.parentNode ) ).isNode() || !node( nref.parentNode ).isNode() ){
			return;

		}

		if( !( nrid = parse.dataset( nref.parentNode, 'id' ) ) || !( nrid = parse.id( nrid ) ) ){
			return;

		}
		closest = node( ui ).next( '.cpb-column' );
		_closest = node( closest );
		t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

		col.removeAttribute( 'style' );
		id_.remove( id, 'columns', rid );
		id_.insert( id, 'columns', nrid, t );
		ui.parentNode.replaceChild( col , ui );
		
		if( rid !== nrid ){
			comet.redefineColumns( ref );
			comet.redefineColumns( nref );
		}
	}
};

export default obj;