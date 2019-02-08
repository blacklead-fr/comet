import utils from '../../../utils/utils.js';
import parse from '../../../utils/parse.js';
import modal from '../../../utils/modal.js';
import _icon from '../../../utils/icon.js';
import node from '../../../utils/node.js';
import update from '../../update.js';

export default function( source ){

	const prop = {

		open: function( e, self, input ){
			e.preventDefault();
			e.stopPropagation();

			var _modal = null;

			var result = null;

			const classes = {
				scope: 'comet-mipCollectionScope',
				result: 'comet-mipResult'

			};

			const priv = {

				load: function( set_id ){
					const svgSet = _icon.set( set_id );
					var queue, set, i;

					if( !svgSet.isSet() ){
						result.innerHTML = '<p>Set not found.</p>';
						return;

					}
					set_id = utils.trim( set_id );
					set = _icon.queue().set( set_id );
					result.innerHTML = '';

					function onicon( icon ){
						const svg = _icon.svg( icon.getAttribute( 'viewBox' ), icon.innerHTML );
						const scope = document.createElement( 'div' );
						const val = svgSet.encode( icon.id );
						scope.className = classes.scope;
						scope.appendChild( svg );
						result.appendChild( scope );

						node( svg ).on( 'click', function( ev, ui ){
							input.value = val;
							kit( ui, input );
							update( input );
							_modal.destroy();

						});
						return svg;

					}

					if( utils.isObject( queue = set.set() ) ){

						for( i in queue ){
							onicon( queue[i] );

						}
						return;

					}

					svgSet.load( function( icon ){
						const svg = onicon( icon );
						set.add( icon.id, svg, true );

					});



				},

				switch: function( ev, ui ){
					priv.load( utils.isString( ui.value ) ? utils.trim( ui.value ) : '' );

				},

				search: function( ev, ui ){
					const val = utils.isString( ui.value ) || utils.isNumber( ui.value ) ? utils.trim( ui.value.toString() ) : '';
					var icons, icon, i, id, regex;

					if( result === null || ( icons = result.getElementsByClassName( 'comet-mipCollectionScope' ) ).length < 1 ){
						return false;

					}
					regex = new RegExp( val, 'ig' );

					for( i = 0; i < icons.length; i++ ){
						icon = icons[i];

						if( !node( icon ).isNode() || ( !utils.isString( id = parse.dataset( icon, 'id' ) ) && !utils.isNumber( id ) ) ){
							continue;

						}
						if( !utils.isStringEmpty( val ) && ( id.toString() ).search( regex ) === -1 ){
							icon.style.display = 'none';
							continue;

						}
						icon.style.display = 'inline-block';

					}

				}

			};

			(function(){
				const sets = utils.getSvgSets();
				const args = {};
				var option = '';
				var id, header, select, sinput;

				if( !utils.isObject( sets ) ){
					return;

				}

				for( id in sets ){

					if( !utils.isObject( sets[id] ) || !utils.isString( sets[id].name ) ){
						continue;

					}
					option += '<option value="' + id +'">' + utils.trim( sets[id].name ) + '</option>';

				}
				result = document.createElement( 'div' );
				result.id = classes.result;

				header = document.createElement( 'div' );
				header.id = 'comet-mipSearch';

				select = document.createElement( 'select' );
				select.id = 'comet-mipFieldSwitchSet';
				select.className = 'comet-mipField comet-rendField';
				select.innerHTML = option;
				header.appendChild( select );

				sinput = document.createElement( 'input' );
				sinput.id = 'comet-mipFieldSearchIcon';
				sinput.className = 'comet-mipField comet-rendField';
				sinput.placeholder = __cometi18n.ui.sIcon;
				header.appendChild( sinput );

				_modal = modal({
					id: 'comet-modalIconPicker',
					header: header,
					content: result
				});
				priv.load( 'fas' );

				node( select ).on( 'change', priv.switch );
				node( sinput ).on( 'input', priv.search );

			})();

		},

		remove: function( ev, ui, input ){
			ev.preventDefault();
			ev.stopPropagation();
			input.value = '';
			kit( null, input );
			update( input );

		}

	};

	function kit( icon, input ){

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

		if( icon === null ){
			button.className = classes.button + ' comet-buttonPrimary comet-upload';
			button.innerHTML = browse;
			wrapper.appendChild( button );
			node( button ).on( 'click', prop.open, input );
			return;

		}
		const oh = document.createElement( 'div' );
		wrapper.appendChild( oh );
		oh.className = 'comet-media comet-wrapper comet-icon';
		oh.title = browse;
		oh.appendChild( icon );
		node( oh ).on( 'click', prop.open, input );

		button.className = classes.button + ' comet-remove';
		button.title = remove;
		button.innerHTML = '<span class="cico cico-x"></span>';
		oh.appendChild( button );
		node( button ).on( 'click', prop.remove, input );

	}

	function create( _ui ){
		const val = !utils.isStringEmpty( _ui.value ) ? utils.trim( _ui.value ) : false;
		const _q = _icon.queue();
		var decoded, _svg;

		if( !val || !( decoded = _icon.set().decode( val ) ) || !_icon.set( decoded.set ).isSet() ){
			kit( null, _ui );
			return;
		}

		if( !( _svg = _q.set( decoded.set ).icon( decoded.id ) ) ){

			_icon.set( decoded.set ).load( function( icon, current ){
				const svg = _icon.svg( icon.getAttribute( 'viewBox' ), icon.innerHTML );
				_q.set( decoded.set ).add( icon.id, svg, true );

				if( icon.id === decoded.id ){
					kit( svg, current );

				}

			}, _ui );
			return;

		}
		kit( _svg, _ui );

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