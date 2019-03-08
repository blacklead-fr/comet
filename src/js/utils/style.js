import parse from './parse.js';
import utils from './utils.js';
import node from './node.js';

/* global document */

export default function( id, type ){

	const _d = document;

	const _priv = {

		id: function(){
			var s_id;

			if( !( id = parse.id( id ) ) || !( type = parse.type( type ) ) ){
				return false;

			}
			s_id = 'cpb-style';
			s_id += utils.capitalize( type );
			s_id += id;

			return utils.trim( s_id );

		},

		node: function( s_id ){
			const s = !utils.isStringEmpty( s_id ) ? _d.getElementById( utils.trim( s_id ) ) : false;

			return ( s && node( s ).isNode() && s.nodeName.toLowerCase() === 'style' ? s : false );


		},

		add: function( css, onold ){
			const _style = prop.create( css );
			var old = false;

			if( !_style ){
				return false;

			}

			if( !( old = _priv.node( _style.id ) ) ){
				_d.head.appendChild( _style );
				return true;
			}

			if( utils.isFunction( onold ) ){
				return onold( _style, old );

			}
			return false;

		}

	};

	const prop = {

		create: function( css ){
			const s_id = _priv.id();
			var _style = null;
			//var classes;

			css = utils.isString( css ) ? utils.trim( utils.stripTags( css ) ) : null;

			if( !s_id || css === null ){
				//return '';
				return false;

			}
			//classes = 'cpb-style ' + s_id;
			//return '<style id="' + s_id + '" class="' + classes + '">' + utils.trim( utils.stripTags( css ) ) + '</style>';
			_style = _d.createElement( 'style' );
			_style.id = s_id;
			_style.className = 'cpb-style ' + s_id;
			_style.innerHTML = css;

			return _style;

		},

		add: function( css ){
			/*var _css, p, nhtml;

			function cur( ar ){
				var a, ara;

				for( a in ar ){
					if( !( ara = node( ar[a] ) ) || !ara.isNode() || ara.prop().nodeName.toLowerCase() !== 'style' ){
						continue;

					}

					if( ( p = parse.style( ara.prop().id ) ) ){
						node( p ).remove();

					}
					document.head.appendChild( ara.prop() );

				}

			}

			if( utils.isString( css ) ){
				nhtml = parse.html( css );

				if( utils.isObject( nhtml ) ){
					cur( nhtml );
					return true;

				}
				return false;

			}

			if( ( ( _css = node( css ) ).isNode() ) && _css.prop().nodeName.toLowerCase() === 'style' ){

				if( ( p = parse.style( _css.prop().id ) ) ){
					node( p ).remove();

				}
				document.head.appendChild( _css.prop() );
				return true;

			}

			if( utils.isObject( _css ) && _css.length > 0 ){
				cur( _css );
				return true;

			}
			return false;*/

			return _priv.add( css );


		},

		insert: function( css ){
			/*const s_id = createId( id, type );
	var s;

	if( !s_id || utils.isStringEmpty( css ) ){
		return false;

	}
	css = utils.stripTags( css );

	if( ( s = parse.style( s_id ) ) ){
		s.innerHTML = css;
		return;

	}
	s = document.createElement( 'style' );
	s.id = s_id;
	s.className = 'cpb-style ' + s_id;
	s.innerHTML = css;*/


			return _priv.add( css, function( _style, old ){

				if( old.parentNode !== null ){
					old.parentNode.replaceChild( _style, old );
					return true;
				}
				return false;

			});
	
},

get: function(){
	const s_id = _priv.id( id, type );
	return _priv.node( s_id );

},

remove: function(){
	const s = prop.get( id, type );

	if( !s || s.parentNode === null ){
		return false;

	}
	s.parentNode.removeChild( s );
	return true;

}

};

return prop;
}