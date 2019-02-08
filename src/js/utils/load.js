import layout from './layout.js';
import parse from './parse.js';
import utils from './utils.js';
import ajax from './ajax.js';

const load = {

	comet: function( data, from, empty ){
		const frame = utils.getNode( 'frame' );

		if( !frame || frame === null ){
			return;

		}
		empty  = utils.isBool( empty ) ? empty : false;

		if( empty ){
			frame.innerHTML = '';

		}
		layout( data ).init( frame, from );

	}

};

export default load;