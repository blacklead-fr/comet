import sanitize from '../utils/sanitize.js';
import utils from '../utils/utils.js';

/* global document */

export default function( entry ){

	var fragment = null;
	var current = false;
	var div, tmp1;

	const _d = document;
	const tags = [ 'img', 'video', 'audio', 'p', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'ul', 'ol' ];
	const allowed = '<span><br><del><u><strike><i><em><b><strong><ins><a><code><var><samp><kbd>';
	const data = [];

	const _priv = {

		img: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				img: ( utils.isString( tmp = current.src ) ? utils.trim( utils.stripTags( tmp ) ) : '' ),
				alt: ( utils.isString( tmp = current.alt ) ? utils.trim( utils.stripTags( tmp ) ) : '' ),
				cap: ( utils.isString( tmp = current.title ) ? utils.trim( utils.stripTags( tmp ) ) : '' ),
				_type: 'image'

			};

		},

		ul: function( isOl ){
			const items = [];
			var tmp, i, citems;

			if( !current || ( citems = current.children ).length < 1 ){
				return false;

			}

			for( i = 0; i < citems; i++ ){

				if( !utils.isString( tmp = citems[i].nodeName ) || ( utils.trim( tmp ) ).toLowerCase() !== 'li' ){
					continue;

				}
				items[items.length] = {
					ctnt: ( utils.isString( tmp = citems[i].innerHTML ) ? utils.trim( utils.stripTags( tmp, allowed ) ) : '' )

				};

			}
			isOl = utils.isBool( isOl ) ? isOl : false;

			return {
				sty: isOl ? 'decimal' : 'disc',
				_items: items,
				_type: 'listItems'
			
			};

		},

		default: function( tag ){
			var tmp;

			if( !current || [ 'p', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre' ].indexOf( tag ) < 0 ){
				return false;

			}

			return {
				tag: tag,
				content: ( utils.isString( tmp = current.innerHTML ) ? utils.trim( utils.stripTags( tmp, allowed ) ) : '' ),
				_type: 'text'

			};

		},

		video: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				type: 'c',
				url: ( utils.isString( tmp = current.src ) ? utils.trim( utils.stripTags( tmp ) ) : '' ),
				he: sanitize.number({ value: current.getAttribute( 'height' ) } ),
				wi: sanitize.number({ value: current.getAttribute( 'width' ) } ),
				_type: 'video'

			};

		},

		audio: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				url: ( utils.isString( tmp = current.src ) ? utils.trim( utils.stripTags( tmp ) ) : '' ),
				_type: 'audio'

			};

		}

	};

	if( utils.isStringEmpty( entry ) ){
		return false;

	}
	fragment = _d.createDocumentFragment();
	div = _d.createElement( 'div' );
	div.innerHTML = entry;
	fragment.appendChild( div );

	tags.forEach(function( tag ){
		const get = div.getElementsByTagName( tag );
		var i = 0;
		var nname;

		if( get.length < 1 ){
			return;

		}

		for( i; i < get.length; i++ ){
			current = get[i];
			nname = ( utils.trim( current.nodeName ) ).toLowerCase();

			if( nname === 'ol' ){
				tmp1 = _priv.ul( true );

			}else if( nname in _priv ){
				tmp1 = _priv[nname]();

			}else{
				tmp1 = _priv.default( nname );

			}

			if( !tmp1 ){
				continue;

			}
			data[data.length] = tmp1;

		}

	});
	return data;

}
