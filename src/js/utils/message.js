import utils from './utils.js';
import node from './node.js';

/* global document */

export default function( message, status ){

	const _d = document;

	const _classes = {
		default: 'comet-message',
		error: 'comet-error',
		warning: 'comet-warning',
		success: 'comet-success',
		note: 'comet-note'

	};

	const __core = {

		create: function(){
			const allowed = '<br><strong><u><i><em><strike><del><ins><a><b><code><ul><li><ol><s><sub><sup><small><span><mark>';
			const _message = _d.createElement( 'div' );

			message = utils.isString( message ) ? utils.stripTags( message, allowed ) : '';


			_message.className = __core.get_classes();
			_message.innerHTML = '<p>' + message + '</p>';

			return _message;

		},

		get_status: function(){

			switch( status ){

				case 100:
				case '100':
				case 'note':
				case 'NOTE':
					return 100;

				case 200:
				case '200':
				case 'success':
				case 'SUCCESS':
					return 200;

				case 300:
				case '300':
				case 'warning':
				case 'WARNING':
					return 300;

				default:
					return 400;

			}

		},

		get_classes: function(){
			const _status = __core.get_status();
			var classes = _classes.default + ' ';

			switch( _status ){

				case 100:
					classes += _classes.note;
					break;

				case 200:
					classes += _classes.success;
					break;

				case 300:
					classes += _classes.warning;
					break;

				default:
					classes += _classes.error;
					break;

			}
			return classes;

		},

		get_messages: function( from ){
			var _from;

			if( ( _from = node( from ) ).isNode() ){
				return _from.children( _classes.default );

			}

			if( from === _d ){
				return from.getElementsByClassName( _classes.default );

			}
			return [];

		}

	};

	const prop = {

		replace: function( old ){

			if( !node( old ).isNode() || old.parentNode === null ){
				return false;

			}
			old.parentNode.replaceChild( node_m, old );
			return true;

		},

		appendTo: function( to ){

			if( !node( to ).isNode() ){
				return false;

			}
			to.appendChild( node_m );
			return true;

		},

		set: function( nod_e ){

			if( !node( nod_e ).isNode() ){
				return false;

			}
			nod_e.innerHTML = '';
			nod_e.appendChild( node_m );
			return true;

		},

		get: function(){

			return node_m;

		},

		remove_existing: function( from ){
			var messages;

			if( ( messages = __core.get_messages( from ) ).length < 1 ){
				return false;

			}
			return node( messages ).remove();

		}

	};

	const node_m = __core.create();

	return prop;
	
}