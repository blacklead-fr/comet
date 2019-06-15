import { frameset as getFrameset } from '../stored.js';
import Global from '../../../utils/global.js';
import node from '../../../dom/element.js';
import { setFrameset } from './framset.js';

const SLUG = 'frame';

const DOCUMENT = document;

export function Frame(){

	const FRAME = DOCUMENT.createElement( 'div' );

	const DATA = {

		target: FRAME,

		targetNode: node( FRAME ),

		append: function( child ){
			FRAME.appendChild( child );

		},

		remove: function( child ){
			FRAME.removeChild( child );

		},

		empty: function(){
			FRAME.innerHTML = '';

		},

		addClass: function( className ){
			node( FRAME ).addClass( className );

		},

		removeClass: function( className ){
			node( FRAME ).removeClass( className );

		},

		hasClass: function( className ){
			return node( FRAME ).hasClass( className );

		},

		destroy: function(){
			node( FRAME ).remove();
			Global().unset( SLUG );
			return true;

		}

	};

	var frameset = getFrameset();

	if( !frameset ){
		frameset = setFrameset();

	}
	FRAME.className = 'comet-frame comet-frame--main';
	frameset.append( FRAME );

	return Global().set( SLUG, DATA, true );

}
