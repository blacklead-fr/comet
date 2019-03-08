import utils from './utils.js';
import node from './node.js';

/* global document, setInterval, clearInterval */

export default function ( options ){
	const _d = document;
	const func = {};
	const ID = 'comet' + Math.random().toString(36).substr(2, 9);
	var current = null;
	var cursor = null;
	var mouseDown = false;
	var win, state, placeholder, interval;

	if( !utils.isObject( options ) ){
		options = {};

	}
	options.connectWith = !utils.isString( options.connectWith ) ? 'ul' : utils.trim( options.connectWith );
	options.items = !utils.isString( options.items ) ? 'li' : utils.trim( options.items );

	if( !( 'handle' in options ) || options.items === '' || options.connectWith === '' ){
		return false;

	}

	options.placeholder = !utils.isString( options.placeholder ) ? 'cpb-placeholderUi' : utils.trim( options.placeholder );

	options.cursor = !utils.isString( options.cursor ) ? '' : utils.trim( options.cursor );

	options.containment = 'containment' in options ? options.containment : _d.body;

	options.bodyClass = !utils.isString( options.bodyClass ) ? 'cpb-sorting' : utils.trim( options.bodyClass );

	placeholder = _d.createElement( 'div' );
	placeholder.id = ID;
	placeholder.className = 'placeholder ' + options.placeholder;
	win = node( options.containment );

	if( !win.isNode() ){
		return false;

	}

	func.cursor = function( e ){
		const _cursor = node( cursor );
		const tcur = _cursor.isNode();

		if( e === 'destroy' && tcur ){
			_cursor.remove();
			cursor = null;
			return;
		}

		if( !utils.isObject( e ) ){
			return;

		}

		if( !tcur ){
			cursor = _d.createElement( 'div' );
			cursor.id = 'comet-uiCursor';

			if( !utils.isStringEmpty( options.cursor ) ){
				cursor.className = options.cursor;

			}

			cursor.innerHTML = '<span class="cico cico-move"></span>';
			node( _d.body ).append( cursor );
		}

		if( tcur ){
			e.preventDefault();
			cursor.style.left = e.pageX + 'px';
			cursor.style.top = e.pageY + 'px';
		}
	};

	func.onConnectWith = function( e, ui ){
		const ch = ui.children;
		var c;

		if( !mouseDown ){
			return;

		}

		if( ch.length > 0 ){

			for( c = 0; c < ch.length; c++ ){

				if( nodeHasItems( ch[c] ) ){
					return;

				}
			}
		}
		ui.appendChild( placeholder );

	};

	func.onItems = function( e, ui ){
		var tui, h, my, offset, y, w, mx, x;

		if( !mouseDown ){
			return;

		}
		tui = node( ui );
		offset = tui.offset();
		h = tui.height( 0 );
		my = h / 2;
		y = e.pageY - offset.top;

		w = tui.width( 0 );
		mx = w / 4;
		x = e.pageX - offset.left;

		if( x <= mx || ( y <= my && ( x >= mx && x <= ( w - mx ) ) ) ){
			tui.before( placeholder );
			return;

		}

		if( x >= ( w - mx ) || ( y <= h && y > my ) ){
			tui.after( placeholder );

		}

	};

	function nodeHasItems( nd ){
		const ex = explode( options.items );
		const _nd = node( nd );
		var e;

		if( !_nd.isNode() ||ex.length < 1 ){
			return false;

		}

		for( e = 0; e < ex.length; e++ ){

			if( ex[e].type === 'class' && _nd.hasClass( ex[e].str ) ){
				return true;

			}

			if( ex[e].type === 'id' && nd.id === ex[e].str ){
				return true;

			}

			if( ex[e].type === 'tag' && nd.nodeName.toLowerCase() === ( ex[e].str ).toLowerCase() ){
				return true;

			}


		}
		return false;

	}

	function explode( str ){
		const o = [];
		var ex, i, a;

		if( utils.isStringEmpty( str ) || !utils.isArray( ( ex = ( utils.trim( str ) ).split( ',' ) ), 1 ) ){
			return false;

		}

		for( a in ex ){

			if( utils.isStringEmpty( i = ex[a] ) ){
				continue;

			}
			i = utils.trim( i );

			switch( i.charAt( 0 ) ){
				case '.':
				o[o.length] = {
					type: 'class',
					str: i.substring(1)
				};
				break;
				case '#':
				o[o.length] = {
					type: 'id',
					str: i.substring(1)
				};
				break;
				default:
				o[o.length] = {
					type: 'tag',
					str: i
				};
			}

		}
		return o;

	}

	node( _d.documentElement ).on( 'mousemove', function( e ){
		const y = e.pageY;
		var top, height;

		if( !mouseDown || cursor === null || current === null ){
			return;

		}

		function pointer(){

			clearInterval( interval );

			top = win.prop().scrollTop;
			height = win.height( 0 );

			if( isNaN( top ) || isNaN( height ) || isNaN( y ) ){
				return;
			}

			if( top > 0 && y < 10 ){
				win.prop().scrollTop = top - 1;
				interval = setInterval( pointer, 1 );
				return;

			}
			if( ( y + 5 ) > height ){
				win.prop().scrollTop = top + 1;
				interval = setInterval( pointer, 1 );
			}
		}

		pointer();
		func.cursor( e );

	});

	node( options.handle ).on( 'mousedown', function( e, ui ){
		var r, nd, closest;
		e.preventDefault();
		state = setInterval( function(){
			current = ui;
			func.cursor( e );

			if( !utils.isStringEmpty( options.bodyClass ) && !( nd = node( _d.body ) ).hasClass( options.bodyClass ) ){
				nd.addClass( options.bodyClass );

			}

			if( utils.isFunction( options.start ) ){
				closest = node( ui ).closest( options.connectWith );

				if( closest ){
					node( closest ).after( placeholder );

				}
				r = options.start( e, ui );

				if( utils.isObject( r ) ){
					current = r;

				}
			}
			mouseDown = true;
			clearInterval( state );
			node( options.connectWith ).on( 'mouseenter', func.onConnectWith );
			node( options.items ).on( 'mouseenter', func.onItems );

		}, 500 );
	});

	node( _d.documentElement ).on( 'mouseup', function( e ){
		var po, nu;
		e.preventDefault();
		clearInterval( state );
		clearInterval( interval );

		if( !mouseDown ){
			return;

		}

		if( !utils.isStringEmpty( options.bodyClass ) && ( ( nu = node( _d.body ) ).hasClass( options.bodyClass ) ) ){
			nu.removeClass( options.bodyClass );

		}
		po = _d.getElementById( ID );

		if( utils.isFunction( options.stop ) && current !== null && po !== null ){
			options.stop( e, po, current );
			if( po.parentNode !== null ){
				po.parentNode.removeChild( po );

			}/*
			nui = document.getElementsByClassName( options.placeholder );

			if( nui.length > 0 ){
				for( n in nui ){
					nu = node( nui[n] );

					if( !nu.isNode() || !nu.hasClass( options.placeholder ) ){
						continue;

					}
					nu.removeClass( options.placeholder );
					nu.addClass( transient );

				}

			}
			nui = document.getElementsByClassName( transient );

			if( utils.isObject( nui ) && 0 in nui ){
				options.stop( e, nui[0], current );

			}*/
		}
		//node( nui ).remove();
		current = null;
		func.cursor( 'destroy' );
		mouseDown = false;
		//node( options.connectWith ).on( 'mouseenter', func.doConnectWith );

	} );

}