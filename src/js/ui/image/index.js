import { isString, isNode } from '../../utils/is.js';
import update from '../../editor/control/update.js';
import { stripTags } from '../../utils/fill.js';
import node from '../../dom/element.js';

/* global document, __cometi18n */

/**
 * @TODO Rewrite and optimize the function
 *
 */
 
const DOCUMENT = document;

export default function( source, data ){

	const wrapper = DOCUMENT.createElement( 'div' );

	const __img = {

		open: function( ev ){
			var args, media;

			ev.preventDefault();
			ev.stopPropagation();

			if( media ){
				media.open();
				return;
			}

			args = {
				frame: 'select',
				title: __cometi18n.ui.selImage,
				library: {
					type: 'image'
				},
				button: {
					text: __cometi18n.ui.select,
				},
				multiple: false,
				editing:    true,
				filterable: true,
				searchable: true,
				sortable: true

			};

			media = wp.media( args );

			media.on( 'select', function(){
				const att = media.state().get('selection').first().toJSON();
				data.value = isString( data.value = att.url ) ? ( ( data.value = ( stripTags( data.value ) ).trim() ) !== '' ? data.value : '' ) : '';

				source.value = data.value;
				__img.create();
				update( source );

			});
			media.open();

		},

		delete: function( ev ){
			ev.preventDefault();
			ev.stopPropagation();
			data.value = '';
			source.value = '';
			__img.create();
			update( source );

		},

		create: function(){

			const browse = __cometi18n.ui.browse;
			const remove = __cometi18n.ui.remove;
			const buttonClass = 'comet-button';
			const wcn = wrapper.childNodes;
			const button = DOCUMENT.createElement( 'button' );
			var n = 0;

			while( n < wcn.length ){

				if( wcn[n] !== source ){
					wrapper.removeChild( wcn[n] );

				}
				n++;

			}

			if( data.value === '' ){
				button.className = buttonClass + ' comet-buttonPrimary comet-upload';
				button.innerHTML = browse;
				wrapper.appendChild( button );
				node( button ).on( 'click', __img.open );
				return;

			}
			const oh = DOCUMENT.createElement( 'div' );
			wrapper.appendChild( oh );
			oh.className = 'comet-media comet-wrapper comet-image';
			oh.title = browse;
			oh.innerHTML = '<img src="' + data.value + '"/>';
			node( oh ).on( 'click', __img.open );

			button.className = buttonClass + ' comet-remove';
			button.title = remove;
			button.innerHTML = '<span class="cico cico-x"></span>';
			oh.appendChild( button );
			node( button ).on( 'click', __img.delete );
		}

	};

	if( !isNode( source ) ){
		return false;

	}
	wrapper.className = 'comet-uploader comet-image comet-wrapper';
	__img.create();

	return wrapper;
}