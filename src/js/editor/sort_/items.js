import layout from '../../utils/layout.js';
import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import __target from '../target.js';
import __data from '../data.js';
import __id from '../id.js';

const obj = {
	handle: '.comet-edModalItem',
	connectWith : '.comet-edModalItems',
	items: '.comet-edModalItem',
	placeholder: 'cpb-edSortPlaceholder',
	cursor: 'cpb-elementCursor',
	containment: '.comet-modalContent',
	bodyClass: 'cpb-sortingItem',
	start: function( e, ui ){
		var tmp;

		if( !( tmp = parse.dataset( ui, 'id' ) ) || !parse.id( tmp ) ){
			return;

		}
		ui.style.visibility = 'hidden';
		return ui;

	},
	stop: function( e, ui, item ){
		const target_ = __target();
		const id_ = __id(); 
		var id, pid, t, re, _closest, closest, tnode;

		item.removeAttribute( 'style' );

		if( !( id = parse.dataset( item, 'id' ) ) || !( id = parse.id( id ) ) || !( pid = target_.id() ) ){
			return;

		}
		closest = node( ui ).next( '.comet-edModalItem' );
		_closest = node( closest );
		t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

		id_.remove( id, 'items', pid );
		id_.insert( id, 'items', pid, t );
		ui.parentNode.replaceChild( item , ui );

		if( !( re = layout( __data().getData() ).element( pid ) ) || !( tnode = target_.node() ) || tnode === null ){
			return;

		}
		tnode.replaceChild( re.firstChild, tnode.firstChild );

	}
};

export default obj;