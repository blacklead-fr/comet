import utils from '../../../utils/utils.js';
import node from '../../../utils/node.js';
import update from '../../update.js';

export default function( source ){

	const prop = {

		open: function( ev, ui, input ){
			ev.preventDefault();
			ev.stopPropagation();
			var args, media;

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
				var url = utils.isString( url = att.url ) ? ( ( url = utils.trim( utils.stripTags( url ) ) ) !== '' ? url : null ) : null;

				input.value = url;
				kit( url, input );
				update( input );

			});
			media.open();

		},

		remove: function( ev, ui, input ){
			ev.preventDefault();
			ev.stopPropagation();

			input.value = '';
			kit( null, input );
			update( input );

		}

	};

	function kit( img, input ){
		const browse = __cometi18n.ui.browse;
		const remove = __cometi18n.ui.remove;
		const classes = {
			button: 'comet-button',
		};
		const wrapper = input.parentNode;
		const wcn = wrapper.childNodes;
		const button = document.createElement( 'button' );
		var n = 0;

		while( n < wcn.length ){

			if( wcn[n] !== input ){
				wrapper.removeChild( wcn[n] );

			}
			n++;
		}

		if( img === null ){
			button.className = classes.button + ' comet-buttonPrimary comet-upload';
			button.innerHTML = browse;
			wrapper.appendChild( button );
			node( button ).on( 'click', prop.open, input );
			return;

		}
		const oh = document.createElement( 'div' );
		wrapper.appendChild( oh );
		oh.className = 'comet-media comet-wrapper comet-image';
		oh.title = browse;
		oh.innerHTML = '<img src="' + utils.trim( img ) + '"/>';
		node( oh ).on( 'click', prop.open, input );

		button.className = classes.button + ' comet-remove';
		button.title = remove;
		button.innerHTML = '<span class="cico cico-x"></span>';
		oh.appendChild( button );
		node( button ).on( 'click', prop.remove, input );

	}

	function create( ui ){
		var val = utils.isString( ui.value ) ? ( ( val = utils.trim( utils.stripTags( ui.value ) ) ) !== '' ? val : null ) : null;
		kit( val, ui );

	}

	(function(){
		var x, _source, tmp;

		if( ( ( _source = node( source ) ).isNode() ) ){

			create( source );

		}else if( ( utils.isObject( tmp = _source.get() ) || utils.isArray( tmp, 1 ) ) && !_source.isView() ){

			for( x in source ){

				if( !node( source[x] ).isNode() ){
					continue;

				}
				create( source[x] );
			}

		}

	})();
	
}