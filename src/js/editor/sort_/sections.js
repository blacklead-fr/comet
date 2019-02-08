import parse from '../../utils/parse.js';
import node from '../../utils/node.js';
import __menu from '../menu/menu.js';
import __id from '../id.js';

const obj = {
	handle: '.comet-mcItemMoveSection',
	connectWith : '#cpb-content',
	items: '.cpb-section',
	placeholder: 'cpb-edSortPlaceholder',
	cursor: 'cpb-elementCursor',
	containment: '#cpb-content',
	start: function( e, ui ){
		const button = __menu.getActive();
		var column, _p, p, _tmp, tmp;

		__menu.close();

		if( !node( button ).isNode() || !( ( _p = node( button.parentNode ) ).isNode() ) || !( p = _p.prop() ) ){
			return;

		}

		if( _p.hasClass( 'cpb-column' ) ){
			column = p;

		}else if( _p.hasClass( 'cpb-element' ) ){
			column = p.parentNode.parentNode;

		}else{
			return;

		}

		if( !( ( _tmp = node( column.parentNode ) ).isNode() ) || !( ( _tmp = node( _tmp.prop.parentNode ) ).isNode() ) ){
			return;

		}

		if( !( ( _tmp = node( _tmp.prop.parentNode ) ).isNode() ) || !( ( _tmp = node( _tmp.prop.parentNode ) ).isNode() ) ){
			return;

		}

		if( !_tmp.hasClass( 'cpb-section' ) || !( tmp = parse.dataset( _tmp.prop(), 'id' ) ) || !parse.id( tmp ) ){
			return;

		}
		_tmp.prop().style.visibility = 'hidden';
		return _tmp.prop();

	},
	stop: function( e, ui, section ){
		const id_ = __id();
		var id, t, _closest, closest;

		section.removeAttribute( 'style' );

		if( !( id = parse.dataset( section, 'id' ) ) || !( id = parse.id( id ) ) ){
			return;

		}
		t = 'last';
		closest = node( ui ).next( '.cpb-section' );
		_closest = node( closest );
		t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

		id_.remove( id, 'sections', id );
		id_.insert( id, 'sections', id, t );
		ui.parentNode.replaceChild( section , ui );

	}
};

export default obj;