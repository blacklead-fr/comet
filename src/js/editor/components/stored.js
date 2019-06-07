import { isObject, isString } from '../../utils/is.js';
import GLOBAL from '../../utils/global.js';

const Global = GLOBAL();

function get( slug ){
	const GET = Global.get( slug );

	return isObject( GET ) ? GET : false;

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

export function shortcut(){

	return get( 'shortcut' );
	
}

export function generalSettings(){

	return get( 'generalSettings' );
	
}

export function notifications(){

	return get( 'notifications' );

}

export function deviceType(){
	var device = Global.get( 'deviceType' );
	const devices = [ 'tablet', 'mobile' ];

	return isString( device ) && devices.indexOf( device = ( device.trim() ).toLowerCase() ) > -1 ? device : 'desktop';

}
