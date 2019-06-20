import { isString, isNode } from '../../utils/is.js';
import { ClassName } from '../../utils/className.js';
import update from '../../editor/control/update.js';
import { stripTags } from '../../utils/fill.js';
import node from '../../dom/element.js';

/* global document, __cometi18n */

/**
 * @TODO Rewrite and optimize the function
 *
 */
 
 const DOCUMENT = document;

 const I_CLASSNAME = ClassName( 'comet-media-uploader' );

 const CORE = {

 	classes: {
 		main: I_CLASSNAME.modifier( 'image' ),
 		button: I_CLASSNAME.element( 'button' ),
 		browse: I_CLASSNAME.element( 'browse' ),
 		remove: I_CLASSNAME.element( 'remove' ),
 		media: I_CLASSNAME.element( 'media' ),
 		image: I_CLASSNAME.element( 'media--image' )

 	},

 	onSelect: function( media, extData ){
 		const ATT = media.state().get( 'selection' ).first().toJSON();
 		var url;

 		extData.source.value = isString( url = ATT.url ) ? ( ( url = ( stripTags( url ) ).trim() ).length > 0 ? url : '' ) : '';

 		CORE.create( extData );
 		update( extData.source );

 	},

 	open: function( ev, ui, extData ){
 		var args, media;

 		ev.preventDefault();

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
 			CORE.onSelect( media, extData );

 		});
 		media.open();

 	},

 	remove: function( ev, ui, extData ){
 		ev.preventDefault();

 		extData.source.value = '';
 		CORE.create( extData );
 		update( extData.source );

 	},

 	create: function( extData ){
 		const VALUE = extData.source.value;
 		var inner;

 		extData.wrapper.innerHTML = '';

 		if( !isString( VALUE ) || VALUE.length < 1 ){
 			extData.wrapper.innerHTML = '<button class="' + CORE.classes.button + '">' + __cometi18n.ui.browse + '</button>';
 			node( extData.wrapper.firstChild ).on( 'click', CORE.open, extData );
 			return;

 		}
 		inner = '<img class="' + ClassName( CORE.classes.media ).combineWith( [ CORE.classes.image ] ) + '" src="' + VALUE + '" title="' + __cometi18n.ui.browse + '" />';
 		inner += '<button class="' + CORE.classes.remove + '" title="' + __cometi18n.ui.remove + '">';
 		inner += '<span class="cico cico-x"></span>';
 		inner += '</button>';

 		extData.wrapper.innerHTML = inner;

 		node( extData.wrapper.firstChild ).on( 'click', CORE.open, extData );
 		node( extData.wrapper.lastChild ).on( 'click', CORE.remove, extData );

 	}

 };

 export default function( source, data ){

 	const FRAGMENT = DOCUMENT.createDocumentFragment();

 	const WRAPPER = DOCUMENT.createElement( 'div' );

 	if( !isNode( source ) ){
 		return false;

 	}
 	FRAGMENT.appendChild( WRAPPER );
 	WRAPPER.className = I_CLASSNAME.combineWith( [ CORE.classes.main ] );
 	CORE.create( { source, wrapper: WRAPPER, data } );
 	source.appendChild( FRAGMENT );

 }

/*export default function( source, data ){

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
	source.parentNode.appendChild( wrapper );

	return wrapper;
}*/