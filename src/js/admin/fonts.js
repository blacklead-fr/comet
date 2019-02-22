import viewport from '../utils/ui/viewport.js';
import modal from '../utils/modal.js';
import utils from '../utils/utils.js';
import parse from '../utils/parse.js';
import ajax from '../utils/ajax.js';
import node from '../utils/node.js';

export default function(){

	const _d = document;

	const open = _d.getElementById( 'comet-addFont' );

	const appData = {
		style: null,
		collection: [],
		fonts: [],

	};

	const _wfs = {

		get: function( onrequest ){
			const request = new XMLHttpRequest();
			request.open( 'GET', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + cometdata.apikey, true );

			request.onload = function(){
				const data = parse.json( this.response );
				var status = 0;

				if( request.status >= 200 && request.status < 400 && utils.isObject( data ) && utils.isArray( data.items ) ){
					appData.fonts = data.items;

				}else{
					status = 1;
					console.log( 'Error' );

				}
				onrequest( status );

			};
			request.send();

		},

		load: function( param ){
			const s = utils.isString( param.s ) ? utils.trim( param.s ) : '';
			const items = [];
			var fragment = null;
			var i, item, o, font, ch, select, a, b, v, button, weight;

			if( !node( param.body ).isNode() || !utils.isArray( appData.fonts, 1 ) ){
				return;

			}
			fragment = _d.createDocumentFragment();

			for( i = 0; i < appData.fonts.length; i++ ){

				if( !utils.isObject( font = appData.fonts[i] ) || !( 'family' in font ) ){
					continue;

				}

				if( s !== '' && ( font.family.toLowerCase() ).search( s ) === -1 ){
					continue;

				}
				item = _d.createElement( 'div' );
				item.className = 'comet-font comet-item';

				fragment.appendChild( item );

				o = '<h4 class="comet-title">' + font.family + '</h4>';
				o += '<div class="comet-controls">';
				o += '<select class="comet-input">';
				a = 0;
				weight = 400;

				if( utils.isArray( font.variants ) ){

					for( b = 0; b < font.variants.length; b++ ){

						if( !( v = kit.sanitize_variant( font.variants[b] ) ) ){
							continue;

						}

						if( a === 0 ){
							weight = v.weight;

						}
						o += '<option value="' + v.weight + '">' + v.name + ' ' + v.weight + '</option>';
						a++;

					}

				}else{
					o += '<option value="400">Regular 400</option>';

				}
				o += '</select>';
				o += '<button class="comet-button comet-buttonPrimary" title="' + __cometi18n.ui.select + '">+</button>';
				o += '</div>';
				o += '<div class="comet-preview" style="font-family:' + "'" + font.family + "', " + font.category + ';font-weight:' + weight + ';">';
				o += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
				o += '</div>';

				item.dataset.id = i;
				item.innerHTML = o;
				ch = item.children;
				select = ch[1].firstChild;
				button = ch[1].lastChild;

				node( button ).on( 'click', prop.add, { select: select, font: font, list: param.list, count: param.count });
				node( select ).on( 'change', prop.weight, { preview: item.lastChild, font: font });

				items[items.length] = item;

			}

			if( items.length < 1 && s !== '' ){
				param.body.innerHTML = 'No fonts found.';
				return;

			}
			param.body.appendChild( fragment );
			viewport( param.body.parentNode, items, prop.lazy );

		},

		file: function( font, s_variant ){
			var s, a;

			if( !utils.isObject( font ) || !utils.isObject( s_variant ) ){
				return false;

			}

			if( !utils.isArray( s_variant.variants ) ){
				return false;

			}

			for( a = 0; a < s_variant.variants.length; a++ ){

				if( !( ( s = s_variant.variants[a] ) in font.files ) ){
					continue;

				}
				return font.files[s];

			}
			return false;

		},


		push: function( font, variant ){
			var o, st, file;

			if( !( variant = kit.sanitize_variant( variant ) ) ){
				return false;

			}

			if( !utils.isArray( font._cometVarLoaded ) ){
				font._cometVarLoaded = [];

			}

			if( font._cometVarLoaded.indexOf( variant.weight ) > -1 || !( file = _wfs.file( font, variant ) ) ){
				return true;

			}
			font._cometVarLoaded[font._cometVarLoaded.length] = variant.weight;
			st = _d.createElement( 'style' );
			o = '@font-face{';
			o += "font-family:'" + font.family + "';";
			o += 'font-style:normal;';
			o += 'font-weight:' + variant.weight + ';';
			o += "src: url('" + file + "') format('truetype');";
			o += '}';
			st.innerHTML = o;
			_d.head.appendChild( st );
			return true;

		}

	};

	const kit = {

		weight: [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],

		item: function( id, count ){
			var li, o;

			o = '<span>' + id + '</span>';
			o += '<button class="comet-button cico cico-x"></button>';

			li = _d.createElement( 'div' );
			li.dataset.id = utils.trim( id );
			li.innerHTML = o;

			node( li.lastChild ).on( 'click', prop.remove, count );

			return li;

		},

		sanitize_variant: function( variant ){

			if( !utils.isSet( variant ) ){
				return false;

			}

			switch( utils.trim( variant.toString() ) ){

				case 100:
				case '100':
				case 'thin':
				case 'Thin':
				case 'THIN':
				return {
					name: 'Thin',
					weight: 100,
					variants: [ 100, '100', 'thin', 'Thin', 'THIN' ],
				};

				case 200:
				case '200':
				case 'extra-light':
				case 'Extra-Light':
				case 'EXTRA-LIGHT':
				return {
					name: 'Extra-Light',
					weight: 200,
					variants: [ 200, '200', 'extra-light', 'Extra-Light', 'EXTRA-LIGHT' ],
				};

				case 300:
				case '300':
				case 'light':
				case 'Light':
				case 'LIGHT':
				return {
					name: 'Light',
					weight: 300,
					variants: [ 300, '300', 'light', 'Light', 'LIGHT' ],
				};

				case 400:
				case '400':
				case 'regular':
				case 'Regular':
				case 'REGULAR':
				return {
					name: 'Regular',
					weight: 400,
					variants: [ 400, '400', 'regular', 'Regular', 'REGULAR' ],
				};

				case 500:
				case '500':
				case 'medium':
				case 'Medium':
				case 'MEDIUM':
				return {
					name: 'Medium',
					weight: 500,
					variants: [ 500, '500', 'medium', 'Medium', 'MEDIUM' ],
				};

				case 600:
				case '600':
				case 'semi-bold':
				case 'Semi-Bold':
				case 'SEMI-BOLD':
				return {
					name: 'Semi-Bold',
					weight: 600,
					variants: [ 600, '600', 'semi-bold', 'Semi-Bold', 'SEMI-BOLD' ],
				};

				case 700:
				case '700':
				case 'bold':
				case 'Bold':
				case 'BOLD':
				return {
					name: 'Bold',
					weight: 700,
					variants: [ 700, '700', 'bold', 'Bold', 'BOLD' ],
				};

				case 800:
				case '800':
				case 'extra-bold':
				case 'Extra-Bold':
				case 'EXTRA-BOLD':
				return {
					name: 'Extra-Bold',
					weight: 800,
					variants: [ 800, '800', 'extra-bold', 'Extra-Bold', 'EXTRA-BOLD' ],
				};

				case 900:
				case '900':
				case 'heavy':
				case 'Heavy':
				case 'HEAVY':
				return {
					name: 'Heavy',
					weight: 900,
					variants: [ 900, '900', 'heavy', 'Heavy', 'HEAVY' ],
				};

				default:
				return false;
			}
			return false;

		},


	};

	const prop = {

		lazy: function( check, ui ){
			var id, font;


			if( !check || !ui ){
				return false;

			}

			if( !( id = parse.dataset( ui, 'id' ) ) || !( id = parse.id( id ) ) || !utils.isObject( font = appData.fonts[id] ) ){
				return false;

			}
			_wfs.push( font, ui.lastChild.style.fontWeight );		

		},

		add: function( ev, ui, data ){
			var weight, id;

			ev.preventDefault();

			if( !node( data.select ).isNode() || !utils.isObject( data.font ) || !( 'family' in data.font ) ){
				return;

			}

			if( kit.weight.indexOf( weight = parseInt( data.select.value ) ) < 0 ){
				return;

			}

			if( appData.collection.indexOf( id = ( utils.trim( data.font.family ) + ':' + weight ) ) > -1 ){
				return;

			}
			appData.collection[appData.collection.length] = id;
			data.count.innerHTML = appData.collection.length;
			data.list.appendChild( kit.item( id, data.count ) );


		},

		remove: function( ev, ui, count ){
			var id, index;

			ev.preventDefault();

			if( ui.parentNode === null || ui.parentNode.parentNode === null ){
				return;

			}

			if( !utils.isString( id = parse.dataset( ui.parentNode, 'id' ) ) || ( index = appData.collection.indexOf( id = utils.trim( id ) ) ) < 0 ){
				return;

			}
			appData.collection.splice( index, 1 );
			count.innerHTML = appData.collection.length;
			ui.parentNode.parentNode.removeChild( ui.parentNode );


		},

		search: function( ev, ui, data ){
			var val;

			ev.preventDefault();

			if( !utils.isArray( appData.fonts ) || !utils.isString( val = ui.value ) ){
				data.body.innerHTML = 'No font found.';
				return;

			}
			data.s = utils.trim( val.toLowerCase() );
			data.body.innerHTML = '';
			_wfs.load( data );

		},

		import: function( ev, ui ){
			ev.preventDefault();

			if( !utils.isArray( appData.collection ) || prop._isImporting ){
				return;

			}
			prop._isImporting = true;
			ui.innerHTML = '<span class="comet-waitWhileIcon cico cico-spin"></span>';

			ajax({
				action: 'comet_ajAdmin',
				do: 'sfonts',
				data: collection

			}).done(function( r ){
				var o = '';
				var map, a, font, f, i, o;

				r = parseInt( r );
				ui.innerHTML = __cometi18n.ui.import;

				if( r !== 1 || !( map = _d.getElementById( 'comet-mapFonts' ) ) || map === null ){
					return;

				}

				prop._modal.destroy();

				for( a = 0; a < appData.collection.length; a++ ){

					if( !utils.isString( font = appData.collection[a] ) || !utils.isArray( ( f = ( utils.trim( font ) ).split(':') ), 2 ) || kit.weight.indexOf( i = parseInt( f[1] ) ) < 0 ){
						continue;

					}
					o += '<li><h4>' + f[0] + ' ' + i +'</h4>';
					o += '<p style="font-family:' + f[0] + ';font-weight:' + i + ';">';
					o += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
					o += '</p>';
					o += '</li>';

				}
				map.innerHTML = o;

			});

		},

		weight: function( ev, ui, data ){
			const weight = parseInt( ui.value );

			ev.preventDefault();

			if( !node( data.preview ).isNode() || [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].indexOf( weight ) < 0 ){
				return;

			}
			data.preview.style.fontWeight = weight;
		} 

	};

	node( open ).on( 'click', function( ev, ui ){
		const i = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + cometdata.apikey;
		const h_fragment = _d.createDocumentFragment();
		const c_fragment = _d.createDocumentFragment();
		const h_wrapper = _d.createElement( 'div' );
		const c_wrapper = _d.createElement( 'div' );
		var a, header, basket, list, count;

		ev.preventDefault();

		h_fragment.appendChild( h_wrapper );
		c_fragment.appendChild( c_wrapper );

		header = '<div class="comet-column col1">';
		header += '<input type="text" class="comet-input" placeholder="' + __cometi18n.ui.search + '"/>';
		header += '</div>';

		header += '<div class="comet-column col2">';
		header += '<h4>' + __cometi18n.messages.selFonts + '</h4>';
		header += '</div>';

		header += '<div class="comet-column col3">';

		header += '<div id="comet-addFontsCollection" class="comet-fontsBasket">';

		header += '<header id="comet-addFontsCollectionHeader" class="comet-header">';
		header += '<span class="comet-count"></span>' + __cometi18n.ui.fonts;
		header += '</header>';

		header += '<div>';
		header += '<div class="comet-fontsList text-center">';
		//header += ol;
		header += '</div>';

		header += '<div class="text-center">';
		header += '<button class="comet-button comet-buttonPrimary">' + __cometi18n.ui.import + '</button>';
		header += '</div>';
		header += '</div>';

		header += '</div>';

		header += '</div>';

		h_wrapper.innerHTML = header;
		basket = h_wrapper.lastChild.firstChild;
		count = basket.firstChild.firstChild;
		list = basket.lastChild.firstChild;

		node( basket.lastChild.lastChild.firstChild ).on( 'click', prop.import );
		node( h_wrapper.firstChild.firstChild ).on( 'input', prop.search, {
			body: c_wrapper,
			list: list,
			count: count
		});

		appData.collection = utils.isArray( cometdata.fonts ) ? cometdata.fonts : [];

		if( appData.collection.length > 0 ){

			for( a = 0; a < appData.collection.length; a++ ){
				list.appendChild( kit.item( appData.collection[a], count ) );

			}

		}else{
			list.innerHTML = __cometi18n.messages.selFonts;

		}
		count.innerHTML = appData.collection.length;
		c_wrapper.innerHTML = '<div><span class="comet-waitWhileIcon cico cico-spin"></span>' + __cometi18n.messages.warning.wait + '</div>';
		
		prop._modal = modal({
			classes: 'comet-fontsbox',
			header: h_fragment,
			content: c_fragment,

		});

		_wfs.get(function(r){

			if( r === 1 ){
				c_wrapper.innerHTML = '<div><span class="cico cico-exclamation"></span>' + __cometi18n.messages.error.failedFonts + '</div>';
				return;

			}
			c_wrapper.innerHTML = '';
			_wfs.load({
				body: c_wrapper,
				list: list,
				count: count

			});

		});

	});

}