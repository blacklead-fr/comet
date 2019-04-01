import sanitize from '../utils/sanitize.js';
import layout from '../utils/layout.js';
import parse from '../utils/parse.js';
import utils from '../utils/utils.js';
import node from '../utils/node.js';
import __target from './target.js';
import __data from './data.js';

/* global document */

export default function( ui ){

	var uidata = false;

	var _id, _i_id, index, _type, re, slug, cvalue;

	const _d = document;

	const data = {};

	const data_ = __data();

	const target_ = __target();

	const targetNode = target_.node();

	const nodeNames = [ 'select', 'textarea', 'input' ];

	const __core = {

		is_true: function( value ){
			const true_ = [ 'true', 'TRUE', true ];

			return ( true_.indexOf( value ) > -1 );

		},

		background: function( content ){

			const _content = node( content );
			var inner, dren, background;

			if( !_content.isNode() ){
				return;

			}

			if( ( dren = _content.children( 'cpb-backgroundComponents' ) ).length > 0 ){
				node( dren ).remove();

			}
			background = _d.createElement( 'div' );
			background.className = 'cpb-backgroundComponents';
			content.appendChild( background );
			inner = '';

			if( 'vid' in uidata && __core.is_true( uidata.vid ) && utils.isString( uidata.vurl ) ){
				inner += '<video class="cpb-backgroundVideo" src="' + utils.trim( utils.stripTags( uidata.vurl ) ) + '" loop autoplay muted preload="auto"></video>';

			}

			if( 'ov' in uidata && __core.is_true( uidata.ov ) && utils.isString( uidata.ovc ) ){
				inner += '<div class="cpb-backgroundOverlay"></div>';

			}
			background.innerHTML = inner;

		},

		resizeColumns: function(){

			var sw, sibling, c, dren, width, delta, __id, get, siblingWidth, targetWidth;

			var value = data[slug];

			const parentNode = targetNode.parentNode;

			const className = 'cpb-column';

			const __priv = {

				isSibling: function( column ){
					var id;
					return ( !node( column ).hasClass( className ) || !( id = parse.dataset( column, 'id' ) ) || !( id = parse.id( id ) ) ? false : id );

				},

				getNextSibling: function( column ){
					var sib, id, sibdata;

					if( column === null || ( sib = column.nextSibling ) === null ){
						return false;

					}

					if( !( id = __priv.isSibling( sib ) ) || !( sibdata = data_.get( id, _type ) ) ){
						return __priv.getNextSibling( sib );

					}
					return {
						id: id,
						node: sib,
						width: sibdata.wsize

					};

				},

				getPrevSibling: function( column ){
					var sib, id, sibdata;

					if( column === null || ( sib = column.previousSibling ) === null ){
						return false;

					}

					if( !( id = __priv.isSibling( sib ) ) || !( sibdata = data_.get( id, _type ) ) ){
						return __priv.getPrevSibling( sib );

					}
					return {
						id: id,
						node: sib,
						width: sibdata.wsize

					};

				},

				getSibling: function(){
					var tmp;

					if( ( tmp = __priv.getNextSibling( targetNode ) ) ){
						return tmp;

					}

					if( ( tmp = __priv.getPrevSibling( targetNode ) ) ){
						return tmp;

					}
					return false;

				},

			};

			if( parentNode === null || slug !== 'wsize' ){
				return value;

			}

			if( !( sibling = __priv.getSibling() ) ){
				ui.value = 100;
				return 100;

			}
			dren = parentNode.children;
			width = 0;
			siblingWidth = 0;
			targetWidth = 0;

			for( c = 0; c < dren.length; c++ ){

				if( !( __id = __priv.isSibling( dren[c] ) ) || !utils.isObject( get = data_.get( __id, _type ) ) ){
					continue;

				}
				sw = sanitize.number( { value: get.wsize, min: 10, default: 10 } );

				if( dren[c] === targetNode ){
					targetWidth = sw;
					continue;

				}

				if( dren[c] === sibling.node ){
					siblingWidth = sw;
					continue;

				}
				width = width + sw;

			}
			value = sanitize.number( { value: parseFloat( value ), min: 10, default: 10 } );
			delta = targetWidth - value;
			siblingWidth = sanitize.number( { value: ( siblingWidth + delta ), min: 10, default: 10 } );
			width = width + value + siblingWidth;

			if( width > 100 ){
				delta = width - 100;
				width = width - siblingWidth;
				siblingWidth = sanitize.number( { value: ( siblingWidth - delta ), min: 10, default: 10 } );
				width = width + siblingWidth;

				if( width > 100 ){
					delta = width - 100;
					width = width - value;
					value = sanitize.number( { value: ( value - delta ), min: 10, default: 10 } );

				}


			}else if( width < 100 ){
				delta = 100 - width;
				value = value + delta;

			}
			data_.set( sibling.id, _type, { wsize: siblingWidth } );
			layout( data_.getData(), 'css' ).column( sibling.id );
			ui.value = value;
			return value;

		}



	};

	if( !node( ui ).isNode() || !( _id = parse.id( target_.id() ) ) || !( _type = parse.type( target_.type() ) ) || !targetNode ){
		return false;

	}

	if( ( index = nodeNames.indexOf( ui.nodeName.toLowerCase() ) ) < 0 ){
		return false;

	}

	if( !utils.isString( ui.name ) || utils.isStringEmpty( slug = utils.trim( utils.stripTags( ui.name ) ) ) ){
		return false;

	}
	uidata = utils.isObject( uidata = data_.get( _id, _type ) ) ? uidata : {};
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

	switch( _type ){

		case 'sections':
		data_.set( _id, 'sections', data );
		__core.background( node( targetNode ).child( 'cpb-sectionContent' ) );
		layout( data_.getData(), 'css' ).section( _id );
		return;

		case 'rows':
		data_.set( _id, 'rows', data );
		__core.background( node( targetNode ).child( 'cpb-rowContent' ) );
		layout( data_.getData(), 'css' ).row( _id );
		return;

		case 'columns':

		if( !( cvalue = __core.resizeColumns() ) ){
			return;

		}
		data[slug] = cvalue;
		data_.set( _id, 'columns', data );
		__core.background( node( targetNode ).child( 'cpb-columnContent' ) );
		layout( data_.getData(), 'css' ).column( _id );
		return;

		case 'elements':

		if( [ 'ITEMS', 'items' ].indexOf( target_.state() ) > -1 && ( _i_id = parse.id( target_.item() ) ) ){
			data_.set( _i_id, 'items', data );

		}else{
			data_.set( _id, 'elements', data );

		}

		if( !( re = layout( data_.getData() ).element( _id, true ) ) ){
			return false;

		}
		targetNode.parentNode.replaceChild( re, targetNode );
		return true;

		default:
		return false;

	}
	
}