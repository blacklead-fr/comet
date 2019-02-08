import __global from './global.js';
import utils from './utils.js';

export default function(){
	const _g = __global();

	const id = '_queue';

	const prop = {

		get: function( target ){
			const _q = _g.get( id );

			return ( utils.isObject( _q ) && !utils.isStringEmpty( target ) && ( target = utils.trim( target ) ) in _q ? _q[target] : false ); 

		},

		set: function( target, data ){
			var _q = _g.get( id );

			if( !utils.isObject( _q ) ){
				_q = prop.reset();

			}

			if( utils.isStringEmpty( target ) ){
				return false;

			}
			target = utils.trim( target );
			_q[target] = utils.isSet( data ) ? data : '';

			return _g.set( id, _q );

		},

		reset: function(){
			return _g.set( id, {}, true );

		},

		remove: function( target ){
			var _q = _g.get( id );

			if( !utils.isObject( _q ) || utils.isStringEmpty( target ) || !( ( target = utils.trim( target ) ) in _q ) ){
				return false;

			}
			delete _q[target];

			return _g.set( id, _q );

		},

	};

	if( !_g.get( id ) ){
		prop.reset();

	}
	return prop;

}