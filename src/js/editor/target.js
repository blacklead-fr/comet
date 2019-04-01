import __global from '../utils/global.js';
import parse from '../utils/parse.js';
import utils from '../utils/utils.js';

export default function(){
	const global_ = __global();

	const prop = {

		set: function( data ){
			var target;

			if( !utils.isObject( data ) ){
				return false;

			}
			if( !utils.isObject( target = prop.get() ) ){
				target = {};

			}

			if( 'id' in data ){
				target.id = data.id;

			}

			if( 'type' in data ){
				target.type = data.type;
				
			}

			if( 'item' in data ){
				target.item = data.item;
				
			}

			if( 'node' in data ){
				target.node = data.node;
				
			}

			if( 'state' in data ){
				target.state = data.state;
				
			}
			return global_.set( 'target', target );

		},

		get: function(){
			return global_.get( 'target' );

		},

		reset: function(){

			return prop.set({
				id: null,
				type: null,
				item: null,
				node: null,
				state: null
			});

		},

		id: function(){
			const target = prop.get();
			var id;

			return ( !utils.isObject( target ) || !( id = parse.id( target.id ) ) || id < 0 ? false : id );

		},

		node: function(){
			const target = prop.get();

			return ( !utils.isObject( target ) || !utils.isObject( target.node ) ? false : target.node );


		},

		type: function(){
			const target = prop.get();

			return ( !utils.isObject( target ) || target.type === null || utils.isStringEmpty( target.type ) ? false : utils.trim( target.type ) );

		},

		item: function(){
			const target = prop.get();
			var id;

			return ( !utils.isObject( target ) || !( id = parse.id( target.item ) ) || id < 0 ? false : id );

		},

		state: function(){
			const target = prop.get();
			return ( !utils.isObject( target ) || target.state === null || utils.isStringEmpty( target.state ) ? false : utils.trim( target.state ) );

		}

	};

	function isTarget(){
		const target = prop.get();

		return ( utils.isObject( target ) && 'id' in target && 'type' in target && 'node' in target && 'state' in target && 'item' in target );

	}

	if( !isTarget() ){
		prop.reset();

	}
	return prop;

}