import utils from './utils.js';
import node from './node.js';

/* global document, __cometi18n */

export default function( options ){
	const _d = document;
	const id = 'comet-confirm-box';
	var fragment = false;
	var confirm, inner, buttonset;

	if( !utils.isObject( options ) ){
		options = {};

	}
	
	if( !utils.isObject( options.ui ) ){
		options.ui = {};

	}

	if( node( confirm = _d.getElementById( id ) ).isNode() && confirm.parentNode !== null ){
		confirm.parentNode.removeChild( confirm );

	}
	options.ui.cancel = utils.isStringEmpty( options.ui.cancel ) ? __cometi18n.ui.cancel : utils.trim( options.ui.cancel );
	options.ui.done = utils.isStringEmpty( options.ui.done ) ? __cometi18n.ui.done : utils.trim( options.ui.done );
	options.message = utils.isString( options.message ) ? utils.trim( utils.stripTags( options.message, '<strong><i><b><a><ins><u><sup><sub>' ) ) : '';
	fragment = _d.createDocumentFragment();
	confirm = _d.createElement( 'div' );
	fragment.appendChild( confirm );
	confirm.id = id;
	confirm.className = 'comet-dialog comet-wrapper comet-alertbox';

	inner = '<div class="comet-inner">';
	inner += '<div class="comet-textbox"><p>' + options.message + '</p></div>';
	inner += '<div class="comet-buttonset">';

	if( options.hasCancel !== false ){
		inner += '<button class="comet-button comet-cancel">' + options.ui.cancel + '</button>';
		
	}
	inner += '<button class="comet-button comet-buttonPrimary comet-done">' + options.ui.done + '</button>';
	inner += '</div>';
	inner += '</div>';
	confirm.innerHTML = inner;

	buttonset = confirm.firstChild.lastChild;

	node( buttonset.firstChild ).on( 'click', function( ev, ui ){
		ev.preventDefault();

		if( utils.isFunction( options.cancel ) ){
			options.cancel( ev, ui );

		}
		node( confirm ).remove();

	});

	if( utils.isFunction( options.confirm ) ){

		options.data = utils.isObject( options.data ) ? options.data : { value: options.data };
		options.data.dialog = {
			buttonset: {
				cancel: buttonset.firstChild,
				done: buttonset.lastChild
			},
			textbox: confirm.firstChild.firstChild,
			target: confirm,
			destroy: function(){
				node( confirm ).remove();

			}
		};

		node( buttonset.lastChild ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			options.confirm( ev, ui, options.data );

		});

	}
	_d.body.appendChild( fragment );

	return {
		buttonset: {
			cancel: buttonset.firstChild,
			done: buttonset.lastChild
		},
		textbox: confirm.firstChild.firstChild,
		target: confirm,
		destroy: function(){
			node( confirm ).remove();

		}

	};

}