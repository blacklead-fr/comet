import _global from '../../utils/global.js';

const __global = _global();

function get( slug ){
	const _get = __global.get( slug );

	return typeof _get === 'object' ? _get : false;

}

function frameset(){

	return get( 'frameset' );
	
}

function frame(){

	return get( 'frame' );
	
}

function cockpit(){

	return get( 'cockpit' );
	
}

function panel(){

	return get( 'panel' );
	
}

function generalSettings(){

	return get( 'generalSettings' );
	
}

function notifications(){

	return get( 'notifications' );

}

export { frameset, frame, cockpit, panel, generalSettings, notifications };
