import __global from '../../utils/global.js';
import dialog from '../../utils/dialog.js';
import modal from '../../utils/modal.js';
import utils from '../../utils/utils.js';
import node from '../../utils/node.js';
import ajax from '../../utils/ajax.js';
import template from './template.js';
import __data from '../data.js';

const cockpit = {

	toggle: function( _n ){

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const pit = utils.getNode( 'cockpit' );
			const toggled = 'is_toggled';
			var _pit;

			if( !pit || !( ( _pit = node( pit ) ).isNode() ) ){
				return false;

			}

			if( _pit.hasClass( toggled ) ){
				_pit.removeClass( toggled );
				return;

			}
			_pit.addClass( toggled );

		});

	},

	settings: function( _n ){

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const pit = utils.getNode( 'generalSettings' );
			const toggled = 'is_toggled';
			var _pit;

			if( !pit || !( ( _pit = node( pit ) ).isNode() ) ){
				return false;

			}

			if( _pit.hasClass( toggled ) ){
				_pit.removeClass( toggled );
				return;

			}
			_pit.addClass( toggled );

		});

	},

	save: function( _n ){

		const _d = document;

		const onsave = function( ev, ui, edata ){
			ev.preventDefault();

			const metaData = __data().getData();
			var m = '';
			var hasError = false;
			var val, div, pp, x, dren;

			if( !utils.isObject( edata ) ){
				return;

			}

			if( !node( edata.input ).isNode() ){
				m = __cometi18n.messages.error.savePost + '<br>';

			}

			if( !utils.isObject( metaData ) || utils.isStringEmpty( metaData._sections ) ){
				m = __cometi18n.messages.error.noContent + '<br>';

			}

			if( !utils.isString( val = input.value ) || ( val = utils.trim( utils.stripTags( val ) ) ).length < 1 ){
				m += __cometi18n.messages.error.title;

			}

			if( m.length > 0 ){

				if( ui.parentNode !== null && ( pp = ui.parentNode.parentNode ) !== null && ( dren = pp.children ).length > 0 ){

					for( x = 0; x < dren.length; x++ ){

						if( node( dren[x] ).hasClass( 'comet-saveTempErr' ) ){
							hasError = true;
							dren[x].innerHTML = m;

						}

					}

				}

				if( !hasError ){
					div = _d.createElement( 'div' );
					div.className = 'comet-saveTempErr';
					div.innerHTML = m;
					pp.appendChild( div );

				}
				return;

			}

			ajax({
				do: 'save',
				data: JSON.stringify({
					title: val,
					meta: metaData,
					content: sanitize.content(),
					post_type: 'comet_mytemplates'

				})

			});
			edata.modal.destroy();

		};

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();

			const args = {};
			var mod = false;
			var id, content, inner, div, input, button, form;

			content = _d.createElement( 'div' );
			content.className = 'comet-savebox comet-wrapper';
			content.id = 'comet-saveTempWin';

			inner = '<p>' + __cometi18n.messages.stemplate + ' <a href="' + utils.escUrl( 'https://blacklead.fr/support/docs/comet/my-templates/' ) + '" target="_blank">' + __cometi18n.messages.rmtemplate + '</a>.</p>';
			inner += '<div class="comet-saveform">';
			inner += '<input type="text" class="comet-input comet-ui" placeholder="' + __cometi18n.ui.tempname + '" />';
			inner += '<button class="comet-button comet-buttonPrimary" title="' + __cometi18n.ui.save + '" aria-label="' + __cometi18n.ui.save + '"><span class="cico cico-export"></span></button>';
			inner += '</div>';

			/*div = document.createElement( 'div' );
			div.id = 'comet-saveTempForm';
			content.appendChild( div );

			input = document.createElement( 'input' );
			input.id = 'comet-saveTempInput';
			input.className = 'comet-rendField';
			input.placeholder = __cometi18n.ui.tempname;
			div.appendChild( input );

			button = document.createElement( 'button' );
			button.className = 'comet-saveTempButton comet-button comet-buttonPrimary';
			button.title = __cometi18n.ui.save;
			button.innerHTML = '<span class="cico cico-export"></span>';
			div.appendChild( button );*/

			content.innerHTML = inner;


			mod = modal({
				header: '<h4>' + __cometi18n.ui.saveTemplate + '</h4>',
				content: content

			});

			form = content.lastChild;

			node( form.lastChild ).on( 'click', onsave, { input: form.firstChild, modal: mod } );

		});

	},

	lib: template/*function( _n ){

	}*/,

	exit: function( _n ){

		node( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();

			dialog({

				message: __cometi18n.messages.warning.exit,

				confirm: function( ev, ui ){

					window.location.replace( __cometdata.dashboard_url );

				}

			});
		} );

	},

}

export default cockpit;
