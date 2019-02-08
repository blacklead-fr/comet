/* Comet - Copyright (c) 2018 Blacklead   */

(function( global ) {
	'use strict';

	var c = function( tar ){
		var func = {},
			ar = arguments;

		func.type = function(){
			var f;
			if( typeof tar === 'object' ){
				return 'node';
			}
			f = ( this.trim() ).substr( 0, 1 );

			switch( f ){
				case '.':
					return 'class';
				case '#':
					return 'id';
				default:
					return 'tag';
			}
			
		};

		func.trim = function(){
			if ( typeof tar === 'string' ){
				return tar.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			}
		};

		func.get = function(){
			var f = this.type(),
				v;

			if( f === 'node' ){
				return tar;
			}
				
			v = tar.substr( 1 );

			switch( f ){
				case 'class':
					if( 1 in ar && typeof ar[1] === 'object' ){
						return ar[1].getElementsByClassName( v );
					}
					return document.getElementsByClassName( v );
				case 'id':
					return document.getElementById( v );
				case 'tag':
					if( 1 in ar && typeof ar[1] === 'object' ){
						return ar[1].getElementsByTagName( v );
					}
					return document.getElementsByTagName( v );
				default:
					return false;
			}
		};


		func.first = function( get ){ 
			return this.children( get, true );
		};
		
		func.children = function( get ){
			var ns = this.get(),
				t = c( get ).type(),
				v = get.substr( 1 ),
				a, ch, n, nds = [];

			if( !ns || typeof ns !== 'object' || typeof ns.children !== 'object' || ns.children.length < 1 || t === 'node' ){
				return false;
			}
			ch = ns.children;

			for( a = 0; a < ch.length; a++ ){
				n = ch[a];
				
				if( !n || typeof n !== 'object' ){
					continue;
				}
				
				switch( t ){
					case 'id':
						if( n.id !== v ){
							continue;
						}
						break;
					case 'class':
						if( !c( n ).hasClass( v ) ){
							continue;
						}
						break;
					case 'tag':
						if( n.nodeName.toLowerCase() !== get.toLowerCase() ){
							continue;
						}
						break;
					default:
						continue;
				}
				if( 1 in arguments && arguments[1] === true ){
					return n;
				}
				nds[nds.length] = n;
			}
			return nds;
		};

		func.remove = function(){
			var g = this.get(), a;

			if( g && typeof g !== 'object' ){
				return;
			}

			if( 'length' in g && g.length > 0 ){
				for( a = 0; a < g.length; a++ ){
					if( typeof g[a] !== 'object' || typeof g[a].parentNode !== 'object' ){
						continue;
					}
					g[a].parentNode.removeChild( g[a] );
				}
				return;
			}

			if( typeof g.parentNode !== 'object' ){
				return;
			}
			g.parentNode.removeChild( g );
		};

		func.classList = function(){
			var node = this.get(), cl;
				 
			if( node
				&& typeof node === 'object'
				&& typeof node.className === 'string'
				&& typeof ( cl = node.className.split( ' ' ) ) === 'object' ){
				return cl;
			}
			return [];
		};

		func.hasClass = function( classe ){
			var classes, a;
			if( ( classes = this.classList() ).length < 1 ){
				return false;
			}
			for( a = 0; a < classes.length; a++ ){
				if( classes[a] == classe ){
					return true;
				}
			}
			return false;
		};

		func.removeClass = function( classe ){
			var node = this.get(), b;

			var rc = function( n ){
				var classes, a, j = [];
				
				if( ( classes = c( n ).classList() ).length < 1 ){
					return;
				}
			
				for( a = 0; a < classes.length; a++ ){
					if( classes[a] == classe ){
						continue;
					}
					j[j.length] = classes[a];
				}
				n.className = j.join( ' ' );

			};
			
			if( 'length' in node && node.length > 0 ){
				for( b = 0; b < node.length; b++ ){
					rc( node[b] );
				}
				return;
			}
			rc( node );
		};

		func.addClass = function( classe ){
			var node = this.get(), b;

			var ac = function( n ){
				var classes = c( n ).classList(), a;

				if( typeof n !== 'object' ){
					return n;
				}
				if( classes.length >  0 ){
					for( a = 0; a < classes.length; a++ ){
						if( classes[a] == classe ){
							return true;
						}
					}
				}
				classes[classes.length] = classe;
				n.className = classes.join( ' ' );
			};
			
			if( 'length' in node && node.length > 0 ){
				for( b = 0; b < node.length; b++ ){
					ac( node[b] );
				}
				return;
			}
			ac( node );
		};

		func.next = function( sib ){
			var node = this.get(),
				t = c( sib ).type(),
				s = ( c( sib ).trim() ).substr( 1 );

			var cur = function( n ){
				var ns;
				if( !n || typeof n !== 'object' || !( ns = n.nextElementSibling ) || typeof ns !== 'object' ){
					return false;
				}
	
				switch( t ){
					case 'class':
						if( c( ns ).hasClass( s ) ){
							return ns;
						}
						break;
					case 'id':
						if( ns.id === s ){
							return ns;
						}
						break;
					case 'tag':
						if( ns.nodeName.toLowerCase() === sib ){
							return ns;
						}
						break;
					default:
						return false;
				}
				return cur( ns );
			};

			return cur( node );

		};

		func.prev = function( sib ){
			var node = this.get(),
				t = c( sib ).type(),
				s = ( c( sib ).trim() ).substr( 1 );

			var cur = function( n ){
				var ns;
				if( !n || typeof n !== 'object' || !( ns = node.previousElementSibling ) || typeof ns !== 'object' ){
					return false;
				}
	
				switch( t ){
					case 'class':
						if( c( ns ).hasClass( s ) ){
							return ns;
						}
						break;
					case 'id':
						if( ns.id === s ){
							return ns;
						}
						break;
					case 'tag':
						if( ns.nodeName.toLowerCase() === sib ){
							return ns;
						}
						break;
					default:
						return false;
				}
				return cur( ns );
			};

			return cur( node );

		};

		return func;

	};

	global.jComet = c;

})( window );



(function( $, c, global ) {
	'use strict';
	
	var ui = {},
		$doc = $( document );

	ui.lightbox = function ( target, options ){
		var func = {},
			items, g, current, bundle;
		
		if( typeof options !== 'object' || typeof target !== 'string' ){
			return;
		}

		switch( typeof options.gallery ){
			case 'string':
				g = c( options.gallery ).get();

				if( !g || typeof g !== 'object' || 'length' in g || g.length > 0 ){
					return;
				}
				items = c( target, g ).get();
				break;
			case 'object':
				g = c( options.gallery ).type();
				if( g === 'node' ){
					items = c( target, g ).get();
				}
				break;
			default:
				options.gallery = 'body';
				items = c( target ).get();
		}

		if( typeof items !== 'object' ){
			return;
		}

		if( typeof options.prev !== 'string' ){
			options.prev = 'Previous';
		}

		if( typeof options.next !== 'string' ){
			options.next = 'Next';
		}

		if( typeof options.zoom !== 'boolean' ){
			options.zoom = false;
		}

		if( typeof options.once !== 'boolean' ){
			options.once = false;
		}

		func.lightbox = function( data ){
			var lbc = 'cpb-lightbox',
				lbcf = '.' + lbc,
				lb = c( lbcf ).get(),
				o, co, a;

			if( typeof lb === 'object' ){
				if( 'length' in lb || !data ){
					c( lbcf ).remove();
					lb = false;
				}
			}

			if( !data || typeof data !== 'object' ){
				return;
			}

			if( typeof lb !== 'object' ){
				lb = document.createElement( 'div' );
				lb.className = lbc;
				document.body.appendChild( lb );
			}

			o = '<div class="cpb-lbTopbar">';
			o += '<button class="cpb-lbButton cpb-lbClose" title="Close"></button>';
			o += '</div>';

			if( !options.once ){
				o += '<button class="cpb-lbButton cpb-lbPrev" title="' + options.prev + '"></button>';
				o += '<button class="cpb-lbButton cpb-lbNext" title="' + options.next + '"></button>';
			}

			o += '<div class="cpb-lbContent">';
			o += data.innerHTML;
			o += '</div>';
			if( 'caption' in data || 'author' in data ){
				o += '<div class="cpb-lbBottombar">';
				o += '<div class="cpb-lbCaption">';
				if( 'caption' in data && typeof data.caption === 'string' ){
					o += '<h5>' + data.caption + '</h5>';
				}
				if( 'author' in data && typeof data.author === 'string' ){
					o += '<span>&copy; ' + data.author + '</span>';
				}
				o += '</div>';
				o += '</div>';
			}

			lb.innerHTML = o;

		};
		
		func.actions = function(){
			var e = [], a;
			
			e[e.length] = {
				on: 'click',
				trigger: '.cpb-lbClose',
				do: function( event, ui  ){
					event.preventDefault();

					func.lightbox( false );

				}
			};
			
			e[e.length] = {
				on: 'click',
				trigger: target + ', .cpb-lbPrev, .cpb-lbNext',
				do: function( event, ui  ){
					event.preventDefault();
					var n = c( ui ),
						k = 0,
						sib = false,
						src = false,
						w, h, m , t, el, data, cp, s;

					if( n.hasClass( 'cpb-lbNext' ) ){
						if( ( k = current + 1 ) in bundle && typeof bundle[k] === 'object' && c( bundle[k] ).hasClass( 'cpb-galleryItem' ) ){
							sib = bundle[k];
						}else if( ( k = 0 ) in bundle && typeof bundle[k] === 'object' && c( bundle[k] ).hasClass( 'cpb-galleryItem' ) ){
							sib = bundle[k];
						}

					}else if( n.hasClass( 'cpb-lbPrev' ) ){
						if( ( k = current - 1 ) in bundle && typeof bundle[k] === 'object' && c( bundle[k] ).hasClass( 'cpb-galleryItem' ) ){
							sib = bundle[k];
						}else if( ( k = bundle.length - 1 ) in bundle && typeof bundle[k] === 'object' && c( bundle[k] ).hasClass( 'cpb-galleryItem' ) ){
							sib = bundle[k];
						}

					}else{
						sib = ui;
						k = ui._cpbuid;
					}

					if( typeof sib !== 'object' || typeof sib.dataset !== 'object' || !( 'media' in sib.dataset ) ){
						return;
					}
					m = c( sib.dataset.media ).trim();
				
					switch( m ){
						case 'image':
						case 'iframe':
						case 'video':
						case 'object':
							t = m === 'image' ? 'img' : m;

							if( typeof sib.href === 'string' ){
								src = sib.href;
								break;
							}
							if( typeof sib.src === 'string' ){
								src = sib.src;
								break;
							}
						default:
							return;
					}

					if( 'size' in sib.dataset ){
						s = ( ( sib.dataset.size ).toLowerCase() ).split( 'x' );
						w = s[0];
						h = s[1];
					}

					current = k;
					el = document.createElement( t );
					el.className = 'cpb-lbMedia';
					el.src = src;

					if( t === 'video' ){
						el.setAttribute( 'autoplay' , 'true' );
					}

					if( t === 'iframe' ){
						el.setAttribute( 'frameborder' , '0' );
						el.setAttribute( 'webkitallowfullscreen' , 'true' );
						el.setAttribute( 'mozallowfullscreen' , 'true' );
						el.setAttribute( 'allowfullscreen' , 'true' );
					}
				
					if( !isNaN( w ) && !isNaN( h ) ){
						el.width = w;
						el.height = h;
					}
					data = {};
					data.innerHTML = el.outerHTML;

					if( typeof sib.dataset === 'object' && 'author' in sib.dataset ){
						data.author = sib.dataset.author;
					}

					cp = c( sib ).first( '.cpb-itemCaption' );

					if( cp && typeof cp === 'object' ){
						data.caption = cp.textContent;
					}
					
					func.lightbox( data );
				}
			};

			for( a = 0; a < e.length; a++ ){
			  (function() {
				var cur = e[a];
				$doc.on( cur.on, cur.trigger, function( event ){ cur.do( event, this ); });
			  })(a);
			}
		};

		func.init = function(){
			var a, item;
			
			if( typeof items !== 'object' || !( 'length' in items ) || items.length < 1 ){
				return;
			}

			for( a = 0; a < items.length; a++ ){
				item = items[a];
				if( !c( item ).hasClass( 'cpb-galleryItem' ) ){
					c( item ).addClass( 'cpb-galleryItem' );
					item._cpbuid = a;
				}
			}
			bundle = items;
			func.actions();
		};

		func.init();
	};

	global.cometUi = ui;

})( jQuery, jComet, window);



(function( ui, c, global ) {
	'use strict';
	var init = {},
		manager = {};
		
	manager.add = function( id, callback ){

		if( typeof init !== 'object' ){
			init = {};
		}
		
		if( id in init && typeof init[id] === 'function' ){
			return true;
		}
		
		if( typeof callback !== 'function' ){
			return false;
		}
		init[id] = callback;
		return true;
	};
	
	manager.init = function(){
		var id;

		if( 0 in arguments
			&& typeof ( id = arguments[0] ) === 'string'
			&& id in init
			&& typeof init[id] === 'function' ){
				init[id]();
				return true;
		}

		for( id in init ){
			if( typeof init[id] !== 'function' ){
				continue;
			}
			init[id]();
		}

	};

	manager.add( 'lightbox', function(){
		var lbs = document.getElementsByClassName( 'cpb-lbGallery' ), l, lb;
		ui.lightbox( '.cpb-videoPoster', { once: true } );

		if( lbs && typeof lbs === 'object' && 'length' in lbs && lbs.length > 0 ){

		console.log( 'cc', lbs.length );
			for( l = 0; l < lbs.length; l++ ){
				lb = lbs[l];
				ui.lightbox( '.cpb-lbGalleryItem', { gallery: lb } );

			}
		}
	});

	manager.init();
		
	global.cometNopriv = manager;
	
})( cometUi, jComet, window );
