import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import __menu from '../menu/menu.js';
import __id from '../id.js';

const obj = {
	handle: '.comet-mcItemMoveRow',
	connectWith : '.cpb-rows',
	items: '.cpb-row',
	placeholder: 'cpb-edSortPlaceholder',
	cursor: 'cpb-elementCursor',
	containment: '#cpb-content',
	start: function( e, ui ){
		const button = __menu.getActive();
		var column, _tmp, tmp, _p, p;

		__menu.close();

		if( !node( button ).isNode() || !( ( _p = node( button.parentNode ) ).isNode() ) || !( p = _p.prop() ) ){
			return;

		}

		if( _p.hasClass( 'cpb-column' ) ){
			column = p;

		}else if(  _p.hasClass( 'cpb-element' ) ){
			column = p.parentNode.parentNode;

		}else{
			return;

		}

		if( !node( column.parentNode ).isNode() || !( _tmp = node( column.parentNode.parentNode ) ).isNode() || !_tmp.hasClass( 'cpb-row' ) ){
			return;

		}

		if( !( tmp = parse.dataset( _tmp.prop(), 'id' ) ) || !parse.id( tmp ) ){
			return;

		}
		_tmp.prop().style.visibility = 'hidden';
		return _tmp.prop();

	},
	stop: function( e, ui, row ){
		const id_ = __id();
		var id, _section, sid, _nsection, nsid, t, closest, _closest;

		if( !( id = parse.dataset( row, 'id' ) ) || !( id = parse.id( id ) ) ){
			return;

		}

		if( !node( row.parentNode ).isNode() || !( ( _section = node( row.parentNode.parentNode ) ).isNode() ) ){
			return;

		}

		if( !( sid = parse.dataset( _section.prop(), 'id' ) ) || !( sid = parse.id( sid ) ) ){
			return;

		}

		if( !node( ui.parentNode ).isNode() || !( ( _nsection = node( ui.parentNode.parentNode ) ).isNode() ) ){
			return;

		}

		if( !( nsid = parse.dataset( _nsection.prop(), 'id' ) ) || !( nsid = parse.id( nsid ) ) ){
			return;

		}
		closest = node( ui ).next( '.cpb-row' );
		_closest = node( closest );
		t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

		row.removeAttribute( 'style' );
		id_.remove( id, 'rows', sid );
		id_.insert( id, 'rows', nsid, t );
		ui.parentNode.replaceChild( row , ui );

	}
};

export default obj;