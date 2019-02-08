import _queue from './queue.js';
import utils from './utils.js';
import node from './node.js';

const prop = {

	set: function( set ){
		set = utils.isStringEmpty( set ) ? false : utils.trim( set );
		const sets = utils.getSvgSets();
		const priv = {

			isSet: function(){
				return ( utils.isObject( priv.data() ) );

			},

			data: function(){
				return ( !sets || !set || !utils.isObject( sets[set] ) ? false : sets[set] );

			},

			url: function(){
				const tmp = priv.data();
				return ( !sets || !tmp || utils.isStringEmpty( tmp.set ) ? false : utils.trim( tmp.set ) );

			},

			name: function(){
				const tmp = priv.data();
				return ( !sets || !tmp || utils.isStringEmpty( tmp.name ) ? false : utils.trim( tmp.name ) );

			},

			encode: function( id ){

				return ( !set || !sets || utils.isStringEmpty( id ) ? '' : set + ':' + utils.trim( id ) );

			},

			decode: function( entry ){

				if( !sets || utils.isStringEmpty( entry ) || !utils.isArray( ( entry = ( utils.trim( entry ) ).split( ':' ) ), 2 ) ){
					return false;

				}

				if( !utils.isString( entry[0] ) || !utils.isObject( sets[( entry[0] = utils.trim( entry[0] ) )] ) || utils.isStringEmpty( entry[1] ) ){
					return false;

				}

				return {
					set: utils.trim( entry[0] ),
					id: utils.trim( entry[1] )

				};

			},

			load: function( onicon, icon ){
				const div = document.createElement( 'div' );
				const url =  priv.url();

				if( !url ){
					return false;

				}

				node( div ).load( url, function( response, status ){
					const syms = div.getElementsByTagName( 'symbol' );
					var sym, s;

					if( syms.length < 1 ){
						return false;
					}

					for( s = 0; s < syms.length; s++ ){

						if( !node( sym = syms[s] ).isNode() || utils.isStringEmpty( sym.id ) ){
							continue;

						}
						if( utils.isFunction( onicon ) ){
							onicon( sym, icon );

						}
					}

				});
				return div;

			}

		};
		return priv;

	},

	svg: function( vb, inner ){
		const _svg = document.createElement( 'div' );
		_svg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + utils.trim( vb ) + '">' + inner + '</svg>';

		return _svg.firstChild;


	},

	queue: function(){

		const _q = _queue();

		const id = 'svgsets';

		const priv = {

			sets: function(){

				const setsprop = {

					get: function(){
						const sets = _q.get( id );

						return ( utils.isObject( sets ) ? sets : false );

					},

					add: function( set_id, set ){
						var sets;

						if( !utils.isObject( set ) || utils.isStringEmpty( set_id ) ){
							return false;

						}
						set_id = utils.trim( set_id );
						sets = setsprop.get();
						sets[set_id] = set;
						return _q.set( id, sets );

					},

					remove: function( set_id ){
						const sets = setsprop.get();

						if( !sets || utils.isStringEmpty( set_id ) || !( ( set_id = utils.trim( set_id ) ) in sets ) ){
							return false;

						}
						delete sets[set_id];
						return utils.isObject( _q.set( id, sets ) );

					},

					reset : function(){
						return _q.set( id, {} );

					}

				};

				if( !setsprop.get() ){
					setsprop.reset();

				}
				return setsprop;

			},

			set: function( target ){
				target = !utils.isStringEmpty( target ) ? utils.trim( target ) : null;

				const setprop = {

					add: function( icon_id, svg, force ){
						var set;
						force = utils.isBool( force ) ? force : false;

						if( !utils.isSet( svg ) || !node( svg ).isNode() || utils.isStringEmpty( icon_id ) ){
							return false;

						}
						icon_id = utils.trim( icon_id );
						set = utils.isObject( set = setprop.set() ) ? set : {};

						if( force || !setprop.icon( icon_id ) ){
							set[icon_id] = svg;

						}
						return ( priv.sets().add( target, set ) ?  set[icon_id] : false );

					},

					remove: function( icon_id ){
						var set = setprop.set();

						if( !set || utils.isStringEmpty( icon_id ) || !( ( icon_id = utils.trim( icon_id ) ) in set ) ){
							return false;

						}
						delete set[icon_id];
						return utils.isObject( priv.sets().add( target, set ) );

					},

					icon: function( icon_id ){
						const set = setprop.set();
						return ( utils.isObject( set ) && !utils.isStringEmpty( icon_id ) && ( icon_id = utils.trim( icon_id ) ) in set && node( set[icon_id] ).isNode() ? set[icon_id] : false );


					},

					set: function(){
						const sets = priv.sets();
						return ( utils.isObject( sets ) && target !== null && utils.isObject( sets[target] ) ? sets[target] : false );


					},

					reset: function(){
						return priv.sets().add( target, {} );

					}

				};
				return setprop;

			},

			reset: function(){
				return _q.set( id, {} );

			}

		};

		if( !_q.get( id ) ){
			priv.reset();

		}
		return priv;

	}
	
}

export default prop;