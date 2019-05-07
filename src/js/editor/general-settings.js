import _global from '../utils/global.js';
import utils from '../utils/utils.js';
import node from '../utils/node.js';

export default function(){

	const _d = document;

	const slug = 'generalSettings';

	const editor = utils.getNode( 'editor' );

	const __global = _global();

	const __classes = {
		main: 'comet-general-settings',
		form: 'comet-general-settings__form',
		close: 'comet-general-settings__close',
		open: 'comet-general-settings--open'

	};

	const __data = {

		target: null,

		form: null,

		open: false,

		toggle: function( ev ){

			var n_target;

			if( utils.isObject( ev ) ){
				ev.preventDefault();

			}

			if( __data.target === null || !( ( n_target = node( __data.target ) ).isNode() ) ){
				return;

			}

			if( n_target.hasClass( __classes.open ) && __data.open ){
				n_target.removeClass( __classes.open );
				__data.open = false;
				return;

			}
			n_target.addClass( __classes.open );
			__data.open = true;

		},

		destroy: function(){

			if( __data.target === null || __data.target.parentNode === null ){
				return false;

			}
			__data.target.parentNode.removeChild( __data.target );
			__global.unset( slug );

		},

		getFormData: function(){
			const n_names = [ 'input', 'select', 'textarea' ];
			const i_types = [ 'text', 'number', 'range', 'hidden', 'date', 'color', 'checkbox', 'radio', 'email', 'image', 'file', 'month', 'password', 'search', 'tel', 'time', 'url', 'week' ];
			const f_data = {};
			var fields, field, a, index;

			if( __data.form === null || ( fields = __data.form.elements ).length < 1 ){
				return f_data;

			}

			for( a = 0; a < fields.length; a++ ){

				if( !node( field = fields[a] ).isNode() || ( index = n_names.indexOf( field.nodeName.toLowerCase() ) ) < 0 ){
					continue;

				}

				if( utils.isStringEmpty( field.name ) ){
					continue;

				}

				if( index === 0 && i_types.indexOf( field.type.toLowerCase() ) < 0 ){
					continue;

				}
				f_data[field.name] = utils.encode_chars( field.value );

			}
			return f_data;

		}

	};

	var target, form;

	if( !editor || ( target = editor.getElementsByClassName( __classes.main ) ).length < 1 ){
		return;

	}
	target = target[0];
	__data.target = target;

	if( ( form = target.getElementsByClassName( __classes.form ) ).length < 1 ){
		return;

	}
	form = form[0];
	__data.form = form;
	node( target.getElementsByClassName( __classes.close ) ).on( 'click', __data.toggle );
	__global.set( slug, __data, true );

	return __data;
	
}