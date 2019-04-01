import sanitize from './sanitize.js';
import utils from './utils.js';
import sort from './sort.js';

/* global document, window, Node, setInterval, clearInterval, XMLHttpRequest */

export default function ( node ){
	const _d = document;
	const origin = node;
	const prop = {};
	const priv = {};

	priv.decode = function( entry ){
		var f, r;

		if( !utils.isString( entry ) || utils.isStringEmpty( ( entry = utils.trim( entry ) ) ) ){
			return false;

		}
		f = entry.charAt( 0 );
		r = utils.trim( entry.substring( 1 ) );
		return ( f === '.' ? { type: 'class', str: r } : ( f === '#' ? { type: 'id', str: r } : false ) );

	};


	priv.insert = function( position, entry ){
		const positions = [ 'beforebegin', 'afterbegin', 'beforeend', 'afterend' ];
		const or = node;

		if( !prop.isNode() || prop.isView() || !utils.isString( position ) ){
			return false;

		}

		if( positions.indexOf( position = utils.trim( position.toLowerCase() ) ) < 0 ){
			return false;

		}

		if( utils.isString( entry ) ){
			node.insertAdjacentHTML( position, entry );
			return true;

		}
		node = entry;

		if( utils.isObject( entry ) && !prop.isView() ){
			node = or;
			node.insertAdjacentElement( position, entry );
			return true;

		}
		node = or;
		return false;

	};

	priv.size = function( type, depth ){
		var size, tmp1, tmp2, style, isWidth;

		if( utils.isStringEmpty( type ) || [ 'width', 'height' ].indexOf( type = ( utils.trim( type ) ).toLowerCase() ) < 0 ){
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

		if( prop.isWindow() ){

			if( depth === 1 ){
				return isWidth ? node.outerWidth : node.outerHeight;

			}
			return isWidth ? node.innerWidth : node.innerHeight;

		}

		if( !prop.isNode() ){
			return false;

		}
		size = isWidth ? node.offsetWidth : node.offsetHeight;

		if( depth === 0 ){
			return size;

		}
		style = node.style;

		if( depth === -2 || depth === -1 ){
			tmp1 = sanitize.number( { value: ( isWidth ? style.borderLeft : style.borderTop ), min: 0, default: 0 } );
			tmp2 = sanitize.number( { value: ( isWidth ? style.borderRight : style.borderBottom ), min: 0, default: 0 } );
			size = size - ( tmp1 + tmp2 );

			if( depth === -2 ){
				tmp1 = sanitize.number( { value: ( isWidth ? style.paddingLeft : style.paddingTop ), min: 0, default: 0 } );
				tmp2 = sanitize.number( { value: ( isWidth ? style.paddingRight : style.paddingBottom ), min: 0, default: 0 } );
				size = size - ( tmp1 + tmp2 );

			}
			return size;

		}
		tmp1 = sanitize.number( { value: ( isWidth ? style.marginLeft : style.marginTop ), min: 0, default: 0 } );
		tmp2 = sanitize.number( { value: ( isWidth ? style.marginRight : style.marginBottom ), min: 0, default: 0 } );
		return size + tmp1 + tmp2;

	};

	priv.set = function(){
		var id, tmp;

		if( prop.isNode() || prop.isView() ){
			return node;

		}

		if( utils.isArray( node ) || utils.isObject( node ) ){
			return node;

		}

		if( utils.isStringEmpty( node ) ){
			return false;
			
		}

		if( ( node = utils.trim( node ) ).indexOf( ',' ) > -1 ){
			node = _d.querySelectorAll( node );
			return node;

		}
		id = node.charAt( 0 );
		tmp = node.substring( 1 );

		if( id === '#' ){
			node = _d.getElementById( tmp );
			return node;

		}

		if( id === '.' ){
			node = _d.getElementsByClassName( tmp );
			return node;

		}
		node = _d.querySelectorAll( node );
		return node;

	};

	prop.remove = function(){
		const or = node;
		var a;

		if( prop.isNode() ){

			if( node.parentNode === null ){
				return false;

			}
			node.parentNode.removeChild( node );
			return true;

		}

		if( prop.isView() || or.length < 1 ){
			return false;

		}

		for( a = 0; a < or.length; a++ ){
			node = or[a];

			if( !prop.isNode() || node.parentNode === null ){
				node = or;
				continue;

			}
			node.parentNode.removeChild( node );
			node = or;

		}
		return true;

	};

	prop.isNode = function(){
		return ( node && node.nodeType === Node.ELEMENT_NODE );

	};

	prop.isDocument = function(){
		return ( node === _d );

	};

	prop.isWindow = function(){
		return ( node === window );

	};

	prop.isView = function(){
		return ( prop.isDocument() || prop.isWindow() );

	};

	prop.isHidden = function(){
		return ( !prop.isNode() || node.offsetParent === null );

	};

	prop.classList = function(){
		var cl;

		return ( prop.isNode() && !utils.isStringEmpty( node.className ) && utils.isArray( cl = ( utils.trim( node.className ) ).split( ' ' ), 1 ) ? cl : [] );

	};

	prop.hasClass = function( classe ){
		const classes = prop.classList();
		var a;

		if( classes.length < 1 || utils.isStringEmpty( classe ) ){
			return false;

		}
		classe = utils.trim( classe );

		for( a in classes ){

			if( utils.isStringEmpty( classes[a] ) || utils.trim( classes[a] ) !== classe ){
				continue;

			}
			return true;

		}
		return false;

	};

	prop.removeClass = function( classe ){
		const or = node;
		var ns, nn, n;

		if( prop.isView() || utils.isStringEmpty( classe ) ){
			return false;

		}
		classe = utils.trim( classe );

		function remove(){
			const classes = prop.classList();
			const j = [];
			var a, cl;

			if( classes.length < 1 ){
				return false;

			}

			for( a in classes ){

				if( utils.isStringEmpty( classes[a] ) || ( cl = utils.trim( classes[a] ) ) === classe ){
					continue;

				}
				j[j.length] = cl;

			}
			node.className = j.join( ' ' );

		}

		if( prop.isNode() ){
			remove();
			return true;

		}

		if( !utils.isObject( node ) && !utils.isArray( node ) ){
			return false;

		}
		ns = node;

		for( n in ns ){
			nn = ns[n];
			node = nn;

			if( !prop.isNode() ){
				node = or;
				continue;

			}
			remove();
			node = or;

		}

	};

	prop.addClass = function( classe ){
		const or = node;
		var ns, nn, n;

		if( prop.isView() || utils.isStringEmpty( classe = utils.toClass( classe ) ) ){
			return false;

		}

		function add(){
			const classes = prop.classList();
			const j = [];
			var a, cl;

			for( a in classes ){

				if( utils.isStringEmpty( classes[a] ) || ( cl = utils.trim( classes[a] ) ) === classe ){
					continue;

				}
				j[j.length] = cl;

			}
			j[j.length] = classe;
			node.className = j.join( ' ' );
			return true;

		}

		if( prop.isNode() ){
			add();
			return true;

		}

		if( !utils.isObject( node ) && !utils.isArray( node ) ){
			return false;

		}
		ns = node;

		for( n in ns ){
			nn = ns[n];
			node = nn;
			if( !prop.isNode() ){
				node = or;
				continue;

			}
			add();
			node = or;

		}
	};

	prop.toggleClass = function( className ){

		if( prop.hasClass( className ) ){
			prop.removeClass( className );
			return;

		}
		prop.addClass( className );

	};

	prop.closest = function( className ){
		const or = node;
		var next, prev;

		if( !prop.isNode() || utils.isStringEmpty( className ) ){
			return false;

		}
		className = utils.trim( className );

		function cur( n, sib ){
			var sibling = sib === 'previous' ? n.previousSibling : n.nextSibling;

			node = sibling;

			if( !prop.isNode() ){
				node = or;
				return false;
			}

			if( prop.hasClass( className ) ){
				node = or;
				return sibling;
			}
			return cur( sibling, sib );

		}
		next = cur( node, 'next' );
		node = next;

		if( prop.isNode() ){
			node = or;
			return next;

		}
		prev = cur( node, 'previous' );
		node = prev;

		if( prop.isNode() ){
			node = or;
			return prev;

		}
		node = or;
		return false;

	};

	prop.children = function( className, callback ){
		const nds = [];
		const isCallbackAfunction = utils.isFunction( callback );
		var a, ch, n;

		if( !prop.isNode() || utils.isStringEmpty( className ) ||node.children.length < 1 ){
			return false;

		}
		className = utils.trim( className );
		ch = node.children;

		for( a in ch ){
			n = ch[a];
			node = n;

			if( !prop.isNode() || !prop.hasClass( className ) ){
				node = origin;
				continue;

			}
			nds[nds.length] = n;
			node = origin;

			if( isCallbackAfunction ){

				if( callback( n, a, ch ) === 0 ){
					break;

				}
			}
		}
		node = origin;
		return nds;

	};

	prop.child = function( className ){
		const c = prop.children( className, function(){ return 0; } );

		node = c;

		if( prop.isNode() ){
			node = origin;
			return c;

		}

		if( utils.isArray( c, 1 ) ){
			node = c[0];

			if( prop.isNode() ){
				node = origin;
				return c[0];

			}
		}
		node = origin;
		return false;

	};

	prop.before = function( entry ){
		return priv.insert( 'beforebegin', entry );

	};

	prop.after = function( entry ){
		return priv.insert( 'afterend', entry );

	};

	prop.append = function( entry ){
		return priv.insert( 'beforeend', entry );

	};

	prop.prepend = function( entry ){
		return priv.insert( 'afterbegin', entry );

	};

	prop.height = function( depth ){
		return priv.size( 'height', depth );

	};

	prop.width = function( depth ){
		return priv.size( 'width', depth );

	};

	prop.offset = function(){
		var rect, win;

		if( !prop.isNode() ){
			return false;

		}
		rect = node.getBoundingClientRect();
		win = node.ownerDocument.defaultView;

		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};

	};

	prop.prop = function(){
		return ( prop.isNode() || prop.isView() ? node : false );

	};

	prop.get = function(){
		return node;

	};

	prop.next = function( target ){
		const or = node;
		var el, tri, isId;

		if( !prop.isNode() ){
			return false;

		}
		el = node.nextSibling;

		if( utils.isStringEmpty( target ) || !utils.isObject( tri = priv.decode( target ) ) ){
			return el;

		}
		isId = ( tri.type === 'id' );

		while( el ){
			node = el;

			if( ( isId && utils.trim( el.id ) === tri.str ) || prop.hasClass( tri.str ) ){
				node = or;
				return el;

			}
			el = el.nextSibling;
			node = or;

		}

	};

	prop.prev = function( target ){
		const or = node;
		var el, tri, isId;

		if( !prop.isNode() ){
			return false;

		}
		el = node.previousSibling;

		if( utils.isStringEmpty( target ) || !utils.isObject( tri = priv.decode( target ) ) ){
			return el;

		}
		isId = ( tri.type === 'id' );

		while( el ){
			node = el;

			if( ( isId && utils.trim( el.id ) === tri.str ) || prop.hasClass( tri.str ) ){
				node = or;
				return el;

			}
			el = el.previousSibling;
			node = or;

		}

	};

	prop.toggle = function( duration ){

		if( node.style.display !== 'none' ){
			prop.slideUp( duration );
			return;

		}
		prop.slideDown( duration );

	};

	prop.slideUp = function( duration ){
		var tmp, height, counter, timer;

		duration = sanitize.number( { value: duration, min: 0, default: 500, float: true } );

		if( node.style.display === 'none' ){
			return;

		}
		height = prop.height(0);
		counter = height;
		tmp = height / 10;
		node.style.overflow = 'hidden';

		timer = setInterval( function (){
			counter -= tmp;

			if( counter > 0 ){
				node.style.height = counter + 'px';

			}else{
				node.style.display = 'none';
				node.style.removeProperty( 'height' );
				clearInterval(timer);

			}
		}, duration);

	};

	prop.slideDown = function( duration ){
		var tmp, height, counter, timer;

		duration = sanitize.number( { value: duration, min: 0, default: 500, float: true } );

		if( node.style.display !== 'none' ){
			return;

		}
		node.style.display = 'block';
		node.style.overflow = 'hidden';
		height = prop.height(0);
		node.style.height = '0px';
		counter = height;
		tmp = height / 10;

		timer = setInterval( function (){
			counter += tmp;

			if( counter < height ){
				node.style.height = counter + 'px';

			}else{
				node.style.removeProperty( 'overflow' );
				node.style.removeProperty( 'display' );
				node.style.removeProperty( 'height' );
				clearInterval(timer);

			}

		}, duration);

	};

	prop.trigger = function( eventName ){
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
	};

	prop.on = function( on, event, data ){
		var or = node;
		var e, types;

		data = utils.isSet( data ) ? data : false;

		if( utils.isStringEmpty( on ) || !utils.isFunction( event ) ){
			return false;

		}

		if( ( types = ( on = utils.trim( on ) ).split( ' ' ) ).length < 1 ){
			return false;

		}

		function _listener( eType ){

			node.addEventListener( eType, function( ev ){
				event( ev, this, data );
			});

		}

		function _event( eType ){
			var s, selectors;

			if( prop.isNode() || prop.isView() ){
				_listener( eType );
				return;

			}

			if( !utils.isObject( node ) && !utils.isArray( node, 1 ) ){
				return false;

			}
			selectors = node;

			for( s in selectors ){
				node = selectors[s];

				if( prop.isNode() || prop.isView() ){
					_listener( eType );

				}
				node = or;

			}

		}

		for( e in types ){

			if( utils.isStringEmpty( types[e] ) ){
				continue;

			}
			_event( utils.trim( types[e] ) );

		}

	};

	prop.off = function( on, event, data ){
		const isEventAfunction = utils.isFunction( event );
		var or = node;
		var e, types;


		data = utils.isSet( data ) ? data : false;

		if( utils.isStringEmpty( on ) ){
			return false;

		}

		if( ( types = ( on = utils.trim( on ) ).split( ' ' ) ).length < 1 ){
			return false;

		}

		function _listener( eType ){

			if( isEventAfunction ){
				node.removeEventListener( eType, function( ev ){
					event( ev, this, data );

				});
				return;

			}
			node.removeEventListener( eType );

		}

		function _event( eType ){
			var s, selectors;

			if( prop.isNode() || prop.isView() ){
				_listener( eType );
				return;

			}

			if( !utils.isObject( node ) || !utils.isArray( node, 1 ) ){
				return false;

			}
			selectors = node;

			for( s in selectors ){
				node = selectors[s];

				if( prop.isNode() || prop.isView() ){
					_listener( eType );

				}
				node = or;

			}

		}

		for( e in types ){

			if( utils.isStringEmpty( types[e] ) ){
				continue;

			}
			_event( types[e] );

		}

	};

	prop.load = function( url, callback ){
		var request;

		if( utils.isStringEmpty( url ) || !prop.isNode() ){
			return false;

		}
		request = new XMLHttpRequest();
		request.open( 'GET', url, true );

		request.onload = function() {
			var response = '';

			if (request.status >= 200 && request.status < 400) {
				response = request.responseText;
				node.innerHTML = response;

			}

			if( utils.isFunction( callback ) ){
				callback( response, request.status );

			}

		};
		request.send();

	};

	prop.serialize = function(){
		const s = [];
		const exc = [ 'button', 'submit', 'reset', 'file', 'hidden' ];
		var field, f, fields, opts, o, type;

		if( prop.isNode() && node.nodeName.toLowerCase() === 'form' && ( fields = node.elements ).length > 0 ){

			for( f in fields ){
				field = fields[f];
				type = utils.isString( field.type ) ? utils.trim( field.type.toLowerCase() ) : '';

				if( utils.isStringEmpty( field.name ) || field.disabled || exc.indexOf( type ) > -1 ){
					continue;

				}

				if( type === 'select-multiple' && ( opts = field.options ).length > 0 ){

					for( o in opts ){

						if( opts[o].selected ){
							s[s.length] = encodeURIComponent( field.name ) + '=' + encodeURIComponent( opts[o].value );

						}

					}

				}else if( ( type !== 'checkbox' && type !== 'radio' ) || field.checked ){
					s[s.length] = encodeURIComponent( field.name ) + '=' + encodeURIComponent( field.value );

				}
			}
		}
		return s.join('&').replace(/%20/g, '+');

	};

	prop.sort = function( options ){

		options = options || {};

		options.handle = node;

		sort( options );

	};

	priv.set();

	return prop;
	
}