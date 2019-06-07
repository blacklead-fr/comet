import { isNode, isObject, isString, isEmpty,isFunction } from '../../../utils/is.js';
import { shortcut as getShortcut } from '../stored.js';
import utils from '../../../utils/utils.js';
import parse from '../../../utils/parse.js';
import node from '../../../dom/element.js';
import panel from '../panel/index.js';
import TARGET from '../../target.js';
import DATA from '../../data.js';
import { CORE } from './core.js';

const TYPES = {

	section: function( data ){
		const type = 'sections';
		const targetNode = CORE.getParent( data.target, 'cpb-section' );
		const Data = DATA();
		var id, nid, sdata, ret;

		if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
			return false;

		}

		switch( data.role ){

			case 'edit':

			sdata = utils.getSettingsFrom( 'section' );

			TARGET().set({
				id: id,
				type: type,
				node: targetNode
			});

			return {
				title: __cometi18n.options.section.edit,
				data: {
					tabs: sdata,
					current: Data.get( id, type )
				}

			};

			case 'del':

			Data.remove( id, type );
			node( targetNode ).remove();
			return true;

			case 'dup':

			if( !( nid = Data.clone( id, type ) ) || !( ret = layout( Data.getData() ).section( nid ) ) ){
				return false;

			}
			node( targetNode ).after( ret.querySelectorAll( '.cpb-section' ) );
			return true;

			default:
			return false;

		}

	},

	row: function( data ){
		const type = 'rows';
		const targetNode = CORE.getParent( data.target, 'cpb-row' );
		const Data = DATA();
		var id, parentNode, pid, nid, rdata, ret;

		if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
			return false;

		}

		switch( data.role ){

			case 'edit':

			rdata = utils.getSettingsFrom( 'row' );

			TARGET().set({
				id: id,
				type: type,
				node: targetNode
			});

			return {
				title: __cometi18n.options.row.edit,
				data: {
					tabs: rdata,
					current: Data.get( id, type )
				}
			};

			case 'del':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-section' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}
			Data.remove( id, type, pid );
			node( targetNode ).remove();
			return true;

			case 'dup':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-section' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}

			if( !( nid = Data.clone( id, type, pid ) ) || !( ret = layout( Data.getData() ).row( nid ) ) ){
				return false;

			}
			node( targetNode ).after( ret.querySelectorAll( '.cpb-row' ) );
			return true;

			default:
			return false;

		}

	},

	column: function( data ){
		const type = 'columns';
		const targetNode = CORE.getParent( data.target, 'cpb-column' );
		const Data = DATA();
		var id, parentNode, pid, nid, cdata, ret;

		if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
			return false;

		}

		switch( data.role ){

			case 'edit':

			cdata = utils.getSettingsFrom( 'column' );

			TARGET().set({
				id: id,
				type: type,
				node: targetNode
			});

			return {
				title: __cometi18n.options.column.edit,
				data: {
					tabs: cdata,
					current: Data.get( id, type ) 
				}
			};

			case 'del':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-row' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}
			parentNode = targetNode.parentNode;
			Data.remove( id, type, pid );
			node( targetNode ).remove();
			redefine.columns( parentNode );
			return true;

			case 'dup':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-row' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}

			if( !( nid = Data.clone( id, type, pid ) ) || !( ret = layout( Data.getData() ).column( nid ) ) ){
				return false;

			}
			node( targetNode ).after( ret.querySelectorAll( '.cpb-column' ) );
			redefine.columns( targetNode.parentNode );
			return true;

			default:
			return false;

		}

	},

	element: function( data ){
		const type = 'elements';
		const targetNode = CORE.getParent( data.target, 'cpb-element' );
		const Data = DATA();
		var id, parentNode, pid, nid, _type, tmp, edata, ret;

		if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
			return false;

		}

		switch( data.role ){

			case 'edit':

			if( !isObject( tmp = Data.get( id, type ) ) || !isString( _type = tmp._type ) || isEmpty( _type ) ){
				return false;

			}

			if( !isObject( edata = utils.getElement( _type ) ) || !isObject( edata.tabs ) ){
				return false;

			}

			TARGET().set({
				id: id,
				type: type,
				node: targetNode
			});

			return {
				title: __cometi18n.options.element.edit,
				data: { 
					tabs: edata.tabs,
					current: tmp
				}
			};

			case 'del':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-column' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}
			Data.remove( id, type, pid );
			node( targetNode ).remove();
			return true;

			case 'dup':

			if( !( parentNode = CORE.getParent( targetNode, 'cpb-column' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
				return false;

			}

			if( !( nid = Data.clone( id, type, pid ) ) || !( ret = layout( Data.getData() ).element( nid ) ) ){
				console.log( ret );
				return false;

			}
			node( targetNode ).after( ret.querySelectorAll( '.cpb-element' ) );
			return true;

			default:
			return false;

		}

	}

};

export function onButtonsClick( event, ui, data ){

	const SHORTCUT = getShortcut();

	event.preventDefault();

	if( !isFunction( TYPES[data.type] ) || !CORE.isRoleDefined( data.role ) ){

		if( SHORTCUT ){
			SHORTCUT.destroy();

		}
		return;

	}

	if( !isObject( get = TYPES[data.type]( data ) ) || !isObject( get.data ) || !isString( get.title ) ){

		if( SHORTCUT ){
			SHORTCUT.destroy();
			
		}
		return;

	}

	panel({
		title: get.title,
		data: get.data,
		close: {
			do: function(){
				TARGET().reset();
			}
		}

	});
}