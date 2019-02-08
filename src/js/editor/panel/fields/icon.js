import utils from '../../../utils/utils.js';
import parse from '../../../utils/parse.js';
import modal from '../../../utils/modal.js';
import _icon from '../../../utils/icon.js';
import node from '../../../utils/node.js';
import update from '../../update.js';

export default function( slug, field, data ){

	var input = null;

	var value = '';

	var result = null;

	var _modal = false;

	const _d = document;

	const wrapper = _d.createElement( 'div' );

	const __core = {

		load: function( set_id ){
			const fragment = _d.createDocumentFragment();
			const set = _icon.get_set( set_id );
			var icon_id, scope, svg, encoded;

			for( icon_id in set ){

				if( utils.isStringEmpty( svg = _icon.get_svg_from_data( set[icon_id] ) ) ){
					continue;

				}
				encoded = _icon.encode( set_id, icon_id );
				scope = _d.createElement( 'div' );
				scope.className = 'comet-mipCollectionScope';
				scope.innerHTML = svg;
				fragment.appendChild( scope );

				node( scope ).on( 'click', function( ev, ui ){
					value = encoded;
					input.value = encoded;
					__core.create();
					update( input );
					_modal.destroy();

				});


			}
			result.innerHTML = '';
			result.appendChild( fragment );



		/*
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
				const scope = _d.createElement( 'div' );
				const val = svgSet.encode( icon.id );
				scope.className = 'comet-mipCollectionScope';
				scope.appendChild( svg );
				result.appendChild( scope );

				node( svg ).on( 'click', function( ev, ui ){
					value = val;
					input.value = val;
					__core.create();
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

			});*/

		},

		switch: function( ev, ui ){
			__core.load( utils.isString( ui.value ) ? utils.trim( ui.value ) : '' );

		},

		search: function( ev, ui ){

			const val = utils.isString( ui.value ) || utils.isNumber( ui.value ) ? utils.trim( ui.value.toString() ) : '';
			var icons, icon, i, id, regex;

			if( result === null || ( icons = result.getElementsByClassName( 'comet-mipCollectionScope' ) ).length < 1 ){
				return;

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

		},

		open: function( ev, ui ){

			ev.preventDefault();
			ev.stopPropagation();

			const sets = utils.getSvgSets();
			var option = '';
			var id, header, select, sinput;

			if( !utils.isObject( sets ) ){
				return;

			}

			console.log( sets );

			for( id in sets ){

				if( !utils.isObject( sets[id] ) || !utils.isString( sets[id].name ) ){
					continue;

				}
				option += '<option value="' + id +'">' + utils.trim( sets[id].name ) + '</option>';

			}
			result = _d.createElement( 'div' );
			result.id = 'comet-mipResult';

			header = _d.createElement( 'div' );
			header.id = 'comet-mipSearch';

			select = _d.createElement( 'select' );
			select.id = 'comet-mipFieldSwitchSet';
			select.className = 'comet-mipField comet-rendField';
			select.innerHTML = option;
			header.appendChild( select );

			sinput = _d.createElement( 'input' );
			sinput.id = 'comet-mipFieldSearchIcon';
			sinput.className = 'comet-mipField comet-rendField';
			sinput.placeholder = __cometi18n.ui.sIcon;
			header.appendChild( sinput );

			_modal = modal({
				id: 'comet-modalIconPicker',
				header: header,
				content: result
			});
			__core.load( 'fas' );

			node( select ).on( 'change', __core.switch );
			node( sinput ).on( 'input', __core.search );
		},

		delete: function( ev, ui ){
			ev.preventDefault();
			ev.stopPropagation();
			value = '';
			input.value = value;
			__core.create();
			update( input );

		},

		create: function(){

			const browse = __cometi18n.ui.browse;
			const remove = __cometi18n.ui.remove;
			const buttonClass = 'comet-button';
			const wcn = wrapper.childNodes;
			const button = _d.createElement( 'button' );
			const decoded = _icon.decode( value );
			const icon = ( !decoded ? false : _icon.get_icon( decoded.set_id, decoded.icon_id ) );
			var n = 0;

			while( n < wcn.length ){

				if( wcn[n] !== input ){
					wrapper.removeChild( wcn[n] );

				}
				n++;
			}

			if( !icon ){
				button.className = buttonClass + ' comet-buttonPrimary comet-upload';
				button.innerHTML = browse;
				wrapper.appendChild( button );
				node( button ).on( 'click', __core.open );
				return;

			}
			const oh = _d.createElement( 'div' );
			wrapper.appendChild( oh );
			oh.className = 'comet-media comet-wrapper comet-icon';
			oh.title = browse;
			oh.innerHTML = _icon.get_svg_from_data( icon );
			node( oh ).on( 'click', __core.open );

			button.className = buttonClass + ' comet-remove';
			button.title = remove;
			button.innerHTML = '<span class="cico cico-x"></span>';
			oh.appendChild( button );
			node( button ).on( 'click', __core.delete );

		}


	};

	data = utils.isObject( data ) ? data : {};

	if( 'std' in field ){
		value = field.std;

	}

	if( slug in data ){
		value = data[slug];

	}
	value = utils.isString( value ) ? utils.trim( utils.stripTags( value ) ) : '';

	wrapper.className = 'comet-uploader comet-image comet-wrapper';
	wrapper.innerHTML = '<input type="hidden" name="' + slug + '" class="comet-field" value="' + value + '" />';
	input = wrapper.firstChild;
	__core.create();

	return wrapper;

	/*const prop = {

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
						const scope = _d.createElement( 'div' );
						const val = svgSet.encode( icon.id );
						scope.className = 'comet-mipCollectionScope';
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

	})();*/

}