import { isString, isNode, isObject, isEmpty } from '../../utils/is.js';
import createBackground from './background.js';
import layout from '../../utils/layout.js';
import resizeColumns from './columns.js';
import parse from '../../utils/parse.js';
import utils from '../../utils/utils.js';
import node from '../../dom/element.js';
import { isNodeName } from './fill.js';
import { TARGET } from '../target.js';
import { DATA } from '../data.js';

export default function( ui ){

	var uidata = false;

	var _i_id, index, re, slug, cvalue;

	const data = {};

	const CURRENT_ID = parse.id( TARGET.id() );

	const CURRENT_TYPE = parse.type( TARGET.type() );

	const CURRENT_NODE = TARGET.node();

	if( !isNode( ui ) || !isNode( CURRENT_NODE ) || !CURRENT_ID || !CURRENT_TYPE ){
		return false;

	}

	if( ( index = isNodeName( [ 'select', 'textarea', 'input' ], ui.nodeName, true ) ) < 0 ){
		return false;

	}

	if( !isString( ui.name ) || isEmpty( slug = ( utils.stripTags( ui.name ) ).trim() ) ){
		return false;

	}
	uidata = isObject( uidata = DATA.get( CURRENT_ID, CURRENT_TYPE ) ) ? uidata : {};
	data[slug] = utils.encode_chars( utils.stripOnly( ui.value, '<script><link><body><html><meta>' ) );

	if( index === 2 && ui.type ){

		switch( ui.type.toLowerCase() ){

			case 'checkbox':
			data[slug] = ui.checked ? 'true' : 'false';
			break;

			case 'number':
			data[slug] = parseFloat( data[slug] );
			break;

			default:
			break;

		}
		
	}

	switch( CURRENT_TYPE ){

		case 'sections':
		DATA.set( CURRENT_ID, 'sections', data );
		createBackground( node( CURRENT_NODE ).child( 'cpb-sectionContent' ) );
		layout( DATA.getData(), 'css' ).section( CURRENT_ID );
		return;

		case 'rows':
		DATA.set( CURRENT_ID, 'rows', data );
		createBackground( node( CURRENT_NODE ).child( 'cpb-rowContent' ) );
		layout( DATA.getData(), 'css' ).row( CURRENT_ID );
		return;

		case 'columns':

		if( !( cvalue = resizeColumns( { target: CURRENT_NODE, value: data[slug], slug } ) ) ){
			return;

		}
		data[slug] = cvalue;
		ui.value = cvalue;
		DATA.set( CURRENT_ID, 'columns', data );
		createBackground( node( CURRENT_NODE ).child( 'cpb-columnContent' ) );
		layout( DATA.getData(), 'css' ).column( CURRENT_ID );
		return;

		case 'elements':

		if( [ 'ITEMS', 'items' ].indexOf( TARGET.state() ) > -1 && ( _i_id = parse.id( TARGET.item() ) ) ){
			DATA.set( _i_id, 'items', data );

		}else{
			DATA.set( CURRENT_ID, 'elements', data );

		}

		if( !( re = layout( DATA.getData() ).element( CURRENT_ID, true ) ) ){
			return false;

		}
		CURRENT_NODE.parentNode.replaceChild( re, CURRENT_NODE );
		return true;

		default:
		return false;

	}
	
}