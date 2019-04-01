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

			css = utils.isString( css ) ? utils.trim( utils.stripTags( css ) ) : null;

			if( !s_id || css === null ){
				return false;

			}
			_style = _d.createElement( 'style' );
			_style.id = s_id;
			_style.className = 'cpb-style ' + s_id;
			_style.innerHTML = css;

			return _style;

		},

		add: function( css ){

			return _priv.add( css );

		},

		insert: function( css ){

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