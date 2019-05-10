
function decodeSelector( selector ){
	var clIndex, idIndex;

	const __core = {

		getStop: function( str ){

			const index = str.search( /[^a-z0-9\-_.]/gi );

			return index > -1 ? index : str.length;

		},

		get: function( index, isId ){
			const str = selector.slice( index + 1 );
			const end = __core.getStop( str );
			const array = ( str.slice( 0, end ) ).split( '.' );
			const classes = [];
			var id = null;
			var a;

			isId = typeof isId === 'boolean' && isId;

			if( !array || array.length < 1 ){
				return false;

			}

			for( a = 0; a < array.length; a++ ){

				if( array[a].length < 1 ){
					continue;

				}

				if( a === 0 && isId ){
					id = array[a];
					continue;
				}
				classes[classes.length] = array[a];

			}

			return {
				classList: classes,
				id: id
			};


		}

	};

	if( typeof selector !== 'string' || selector.length < 1 ){
		return false;

	}
	clIndex = selector.indexOf( '.' );
	idIndex = selector.indexOf( '#' );

	if( clIndex < 0 && idIndex < 0 ){

		return {
			tagName: selector,
			classList: [],
			id: null

		};

	}

	if( idIndex > -1 ){

		if( selector.length -1 > idIndex ){
			return __core.get( idIndex, true );

		}

	}

	if( clIndex > -1 ){

		if( selector.length -1 > clIndex ){
			return __core.get( clIndex );

		}

	}
	return false;

}

function decodeSelectors( selectors ){
	const _selectors = [];
	var s, a, decoded;

	if( typeof selectors !== 'string' || ( s = selectors.split( ' ' ) ).length < 1 ){
		return false;

	}

	for( a = 0; a < s.length; a++ ){

		if( s[a].length < 1 || !( decoded = decodeSelector( s[a] ) ) ){
			continue;

		}
		_selectors[_selectors.length] = decoded;

	}
	return _selectors;

}

function getSize( object, type, depth ){
	var isWidth;

	if( type !== 'string' || type.length < 1 || [ 'width', 'height' ].indexOf( type = type.toLowerCase() ) < 0 ){
		return false;

	}
	isWidth = ( type === 'width' );

	switch( depth ){
		case -2:
		case '-2':
		case 'real':
		case 'REAL':
		depth = -2;
		break;
		case -1:
		case '-1':
		case 'padding':
		case 'PADDING':
		depth = -1;
		break;
		case 1:
		case '1':
		case true:
		case 'true':
		case 'margin':
		case 'MARGIN':
		depth = 1;
		break;
		default:
		depth = 0;

	}

	if( isWindow( object ) ){

		if( depth === 0 ){
			return isWidth ? object.outerWidth : object.outerHeight;

		}
		return isWidth ? object.innerWidth : object.innerHeight;

	}

	if( isNode( object ) ){

		if( depth === 0 ){
			return isWidth ? object.offsetWidth : object.offsetHeight;

		}
		return isWidth ? object.clientWidth : object.clientHeight;

	}
	return false;

}

function insertTo( object, position, entry ){

	const positions = [ 'beforebegin', 'afterbegin', 'beforeend', 'afterend' ];

	if( !isNode( object ) || typeof position !== 'string' || positions.indexOf( position = position.toLowerCase() ) < 0 ){
		return;

	}

	if( typeof entry === 'string' ){
		node.insertAdjacentHTML( position, entry );
		return;

	}
	object.insertAdjacentElement( position, entry );

}

export function isNode( object ){

	return typeof object === 'object' && 'nodeType' in object && ( object.nodeType === Node.ELEMENT_NODE || object.nodeType === 1 );

}

export function isDocument( object ){

	return object ==== document;

}

export function isWindow( object ){

	return object === window;

}

export function classList( object ){

	return isNode( object ) && typeof object.className === 'string' ? object.className.split( ' ' ) : [];

}

export function hasClass( object, classe ){
	const classes = classList( object );

	return classes.length > 0 && typeof classe === 'string' && classes.indexOf( classes ) > -1;

}

export function hasClasses( object, classes ){
	const _classList = classList( object );
	var c;

	if( _classList.length < 1 || typeof classes !== 'object' || !( 'length' in classes ) || classes.length < 1 ){
		return false;

	}

	for( c = 0; c < classes.length; c++ ){

		if( typeof classes[c] !== 'string' ){
			continue;

		}

		if( _classList.indexOf( classes[c] ) < 0 ){
			return false;

		}

	}
	return true;

}

export function removeClass( object, classe ){
	const newClasses = [];
	var classes, a;

	if( !isNode( object ) || typeof classe !== 'string' || !hasClass( object, classe ) ){
		return;

	}
	classes = classList( object );

	for( a = 0; a < classes.length; a++ ){

		if( classes[a] === classe ){
			continue;

		}
		newClasses[newClasses.length] = classes[a];

	}
	object.className = newClasses.join( ' ' );

}

export function addClass( object, classe ){

	if( isNode( object ) || typeof classe !== 'string' || hasClass( object, classe ) ){
		return;

	}
	object.className = object.className + ' ' + classe;
}

export function toggleClass( object, classe ){

	if( !isNode( object ) || typeof classe !== 'string' ){
		return;

	}

	if( hasClass( object, classe ) ){
		removeClass( object, classe );
		return;

	}
	addClass( object, classe );

}

export function before( object, entry ){
	return insertTo( object, 'beforebegin', entry );

}

export function after( object, entry ){
	return insertTo( object, 'afterend', entry );

}

export function append( object, entry ){
	return insertTo( object, 'beforeend', entry );

}

export function prepend( object, entry ){
	return insertTo( object, 'afterbegin', entry );

}

export function height( object, depth ){
	return getSize( object, 'height', depth );

}

export function width( object, depth ){
	return getSize( object, 'width', depth );

}

export function offset( object ){
	var rect, win;

	if( !isNode( object ) ){
		return false;

	}
	rect = object.getBoundingClientRect();
	win = object.ownerDocument.defaultView;

	return {
		top: rect.top + win.pageYOffset,
		left: rect.left + win.pageXOffset
	};

}

export function next( object, target ){
	const dtarget = decodeSelector( target );
	var nextSibling = null;
	var isId = false;

	if( !isNode( object ) || ( nextSibling = object.nextSibling ) === null ){
		return false;

	}

	if( !dtarget || ( dtarget.id === null && dtarget.classList.length < 1 ) ){
		return nextSibling;

	}
	isId = dtarget.id !== null;

	while( nextSibling !== null ){

		if( ( isId && nextSibling.id === dtarget.id ) || hasClasses( nextSibling, dtarget.classList ) ){
			return nextSibling;

		}
		nextSibling = nextSibling.nextSibling;

	}
	return false;

}

export function prev( object, target ){
	const dtarget = decodeSelector( target );
	var previousSibling = null;
	var isId = false;

	if( !isNode( object ) || ( previousSibling = object.previousSibling ) === null ){
		return false;

	}

	if( !dtarget || ( dtarget.id === null && dtarget.classList.length < 1 ) ){
		return previousSibling;

	}
	isId = dtarget.id !== null;

	while( previousSibling !== null ){

		if( ( isId && previousSibling.id === dtarget.id ) || hasClasses( previousSibling, dtarget.classList ) ){
			return previousSibling;

		}
		previousSibling = previousSibling.previousSibling;

	}
	return false;

}

export function closest( object, target ){
	var tmp;

	if( !isNode( object ) ){
		return false;

	}

	if( ( tmp = next( object, target ) ) ){
		return tmp;

	}

	if( ( tmp = prev( object, target ) ) ){
		return tmp;

	}
	return false;

}

/*export function toggle( duration ){

	if( node.style.display !== 'none' ){
		prop.slideUp( duration );
		return;

	}
	prop.slideDown( duration );

};

export function slideUp( object, duration ){
	var tmp, height, counter, timer;

	if( !isNode( object) || object.style.display === 'none' ){
		return;

	}
	object.style.overflow = 'hidden';
	duration = duration <= 0 ? 500 : duration;
	height = height( object );
	counter = height;
	tmp = height / 10;

	timer = setInterval( function(){
		counter -= tmp;

		if( counter > 0 ){
			object.style.height = counter + 'px';

		}else{
			clearInterval(timer);

		}
	}, duration);

};

export function slideDown( duration ){
	var tmp, height, counter, timer;


	if( !isNode( object) || object.style.display === 'none' ){
		return;

	}
	object.style.overflow = 'hidden';
	object.style.height = '0px';
	duration = duration <= 0 ? 500 : duration;
	height = height( object );
	counter = height;
	tmp = height / 10;

	timer = setInterval( function (){
		counter += tmp;

		if( counter < height ){
			node.style.height = counter + 'px';

		}else{
			node.style.removeProperty( 'overflow' );
			node.style.removeProperty( 'height' );
			clearInterval(timer);

		}

	}, duration);

}

export function trigger( eventName ){

	var or = node;
	var n, ns, nn;

	function fire(){
		const ev = _d.createEvent( 'HTMLEvents' );
		ev.initEvent( eventName, false, true );
		node.dispatchEvent( ev );

	}

	if( prop.isNode() || prop.isView() ){
		fire();
		return;

	}

	if( !utils.isObject( node ) && !utils.isArray( node ) ){
		return false;

	}
	ns = node;

	for( n in ns ){
		nn = ns[n];
		node = nn;

		if( !prop.isNode() && !prop.isView() ){
			node = or;
			continue;

		}
		fire();
		node = or;

	}

}*/

export function on( object, types, listener, data ){
	var e = 0;
	var events;

	if( !isNode( object ) && !isDocument( object ) && !isWindow( object ) ){
		return;

	}

	if( typeof types !== 'string' || typeof listener !== 'function' || ( events = types.split( ' ' ) ).length < 1 ){
		return;

	}

	while( e < events.length ){

		if( events[e].length < 1 ){
			e++;
			continue;

		}
		object.addEventListener( events[e], function( event ){
			listener( event, this, data );

		});
		e++;

	}

}

export function load( object, url, callback ){
	var request;

	if( typeof url !== 'string' || url.length < 1 || !isNode( object ) ){
		return false;

	}
	request = new XMLHttpRequest();
	request.open( 'GET', url, true );
	request.onload = function() {
		var response = '';

		if( request.status >= 200 && request.status < 400 ){
			response = request.responseText;
			object.innerHTML = response;

		}

		if( typeof callback === 'function' ){
			callback( response, request.status );

		}

	};
	request.send();

}