import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import __menu from '../menu/menu.js';
import __data from '../data.js';
import __id from '../id.js';

const obj = {
	handle: '.comet-mcItemMoveElement',
	connectWith : '.cpb-columnContent',
	items: '.cpb-element',
	placeholder: 'cpb-edSortPlaceholder',
	cursor: 'cpb-elementCursor',
	containment: '#cpb-content',
	start: function( e, ui ){
		const button = __menu.getActive();
		var _el, el, tmp;

		__menu.close();

		if( !button || !node( button ).isNode() || !( _el = node( button.parentNode ) ).hasClass( 'cpb-element' ) ){
			return;
		}

		if( !( tmp = parse.dataset( el = _el.prop(), 'id' ) ) || !parse.id( tmp ) ){
			return;

		}
		el.style.visibility = 'hidden';
		return el;
		
	},
	stop: function( e, ui, el ){
		const id_ = __id();
		var id, cid, ncid, t, p, closest;

		if( !( _el = node( el ) ).isNode() || !( id = parse.dataset( el = _el.prop(), 'id' ) ) || !( id = parse.id( id ) ) ){
			return;

		}

		if( !node( el.parentNode ).isNode() || !node( el.parentNode.parentNode ).hasClass( 'cpb-column' ) ){
			return;

		}

		if( !( cid = parse.dataset( el.parentNode.parentNode, 'id' ) ) || !( cid = parse.id( cid ) ) ){
			return;

		}

		if( !__data().get( cid, 'columns' ) || !node( ui.parentNode ).isNode() || !node( ui.parentNode.parentNode ).hasClass( 'cpb-column' ) ){
			return;

		}

		if( !( ncid = parse.dataset( ui.parentNode.parentNode, 'id' ) ) || !( ncid = parse.id( ncid ) ) ){
			return;

		}
		closest = node( ui ).next( '.cpb-element' );
		_closest = node( closest );
		t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

		el.removeAttribute( 'style' );
		id_.remove( id, 'elements', cid );
		id_.insert( id, 'elements', ncid, t );
		ui.parentNode.replaceChild( el , ui );
		
	}
};

export default obj;