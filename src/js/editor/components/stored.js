import { isString } from '../../utils/is.js';
import _global from '../../utils/global.js';

const __global = _global();

function get( slug ){
	const _get = __global.get( slug );

	return typeof _get === 'object' ? _get : false;

}

export function frameset(){

	return get( 'frameset' );
	
}

export function frame(){

	return get( 'frame' );
	
}

export function cockpit(){

	return get( 'cockpit' );
	
}

export function panel(){

	return get( 'panel' );
	
}

export function generalSettings(){

	return get( 'generalSettings' );
	
}

export function notifications(){

	return get( 'notifications' );

}

export function deviceType(){
	var device = __global.get( 'deviceType' );
	const devices = [ 'tablet', 'mobile' ];

	return isString( device ) && devices.indexOf( device = ( device.trim() ).toLowerCase() ) > -1 ? device : 'desktop';

}
