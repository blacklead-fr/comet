/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/admin/admin.js":
/*!*******************************!*\
  !*** ./src/js/admin/admin.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.js */ "./src/js/admin/dashboard.js");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates.js */ "./src/js/admin/templates.js");
/* harmony import */ var _fonts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fonts.js */ "./src/js/admin/fonts.js");




'use strict';

(function( cometAdmin ){

  cometAdmin( window, document);

}(function( win, doc ){

  Object(_dashboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_templates_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_fonts_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

}));


/***/ }),

/***/ "./src/js/admin/dashboard.js":
/*!***********************************!*\
  !*** ./src/js/admin/dashboard.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");


/* harmony default export */ __webpack_exports__["default"] = (function(){

	const _d = document;

	const __ = {

		sidebar: function(){

			const sidebar = _d.getElementById( 'comet-dashboardSidebar' );

			const open = _d.getElementById( 'comet-doSidebarOpen' );

			const close = _d.getElementById( 'comet-doSidebarClose' );

			const prop = {

				open: function( ev, ui ){
					ev.preventDefault();
					sidebar.style.display = 'block';

				},

				close: function( ev, ui ){
					ev.preventDefault();
					sidebar.style.display = 'none';

				}

			};

			if( !sidebar || sidebar === null ){
				return;

			}

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( open ).on( 'click', prop.open );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( close ).on( 'click', prop.close );
		},

		help: function(){

			const tooltip = _d.getElementsByClassName( 'comet-tooltip' );

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( tooltip ).on( 'click', function( ev, ui ){

				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( ui ).toggleClass( 'comet-active' );

			});
		},

		slider: function(){
			const buttons = _d.getElementsByClassName( 'comet-dashboardSlideButton' );

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( buttons ).on( 'click', function( ev, ui ){
				const slide = ui.parentNode.parentNode;
				const _ui = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( ui );
				const sc = 'comet-dashboardSlide';
				var sibling = null;
				var s, slides, slide_;

				ev.preventDefault();

                if( _ui.hasClass( 'comet-next' ) && ( sibling = slide.nextSibling ) === null ){
                	return;

                }

                if( _ui.hasClass( 'comet-prev' ) && ( sibling = slide.previousSibling ) === null ){
                	return;

                }

                if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( sibling ).isNode() || slide.parentNode === null || ( slides = slide.parentNode.children ).length < 1 ){
                	return;

                }

                for( s = 0; s < slides.length; s++ ){

                	if( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( slides[s] ).hasClass( sc ) ){
                		slides[s].style.display = 'none';

                	}

                }
                sibling.style.display = 'block';

			});

		}

	};
	__.sidebar();
	__.help();
	__.slider();
	
});

/***/ }),

/***/ "./src/js/admin/fonts.js":
/*!*******************************!*\
  !*** ./src/js/admin/fonts.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ui_viewport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ui/viewport.js */ "./src/js/utils/ui/viewport.js");
/* harmony import */ var _utils_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_ajax_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");







/* harmony default export */ __webpack_exports__["default"] = (function(){

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
				const data = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].json( this.response );
				var status = 0;

				if( request.status >= 200 && request.status < 400 && _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( data.items ) ){
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
			const s = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( param.s ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( param.s ) : '';
			const items = [];
			var fragment = null;
			var i, item, o, font, ch, select, a, b, v, button, weight;

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( param.body ).isNode() || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( appData.fonts, 1 ) ){
				return;

			}
			fragment = _d.createDocumentFragment();

			for( i = 0; i < appData.fonts.length; i++ ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( font = appData.fonts[i] ) || !( 'family' in font ) ){
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

				if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( font.variants ) ){

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

				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( button ).on( 'click', prop.add, { select: select, font: font, list: param.list, count: param.count });
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( select ).on( 'change', prop.weight, { preview: item.lastChild, font: font });

				items[items.length] = item;

			}

			if( items.length < 1 && s !== '' ){
				param.body.innerHTML = 'No fonts found.';
				return;

			}
			param.body.appendChild( fragment );
			Object(_utils_ui_viewport_js__WEBPACK_IMPORTED_MODULE_0__["default"])( param.body.parentNode, items, prop.lazy );

		},

		file: function( font, s_variant ){
			var s, a;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( font ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( s_variant ) ){
				return false;

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( s_variant.variants ) ){
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

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( font._cometVarLoaded ) ){
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
			li.dataset.id = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( id );
			li.innerHTML = o;

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( li.lastChild ).on( 'click', prop.remove, count );

			return li;

		},

		sanitize_variant: function( variant ){

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isSet( variant ) ){
				return false;

			}

			switch( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( variant.toString() ) ){

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

			if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( ui, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( font = appData.fonts[id] ) ){
				return false;

			}
			_wfs.push( font, ui.lastChild.style.fontWeight );		

		},

		add: function( ev, ui, data ){
			var weight, id;

			ev.preventDefault();

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( data.select ).isNode() || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.font ) || !( 'family' in data.font ) ){
				return;

			}

			if( kit.weight.indexOf( weight = parseInt( data.select.value ) ) < 0 ){
				return;

			}

			if( appData.collection.indexOf( id = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( data.font.family ) + ':' + weight ) ) > -1 ){
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

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( ui.parentNode, 'id' ) ) || ( index = appData.collection.indexOf( id = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( id ) ) ) < 0 ){
				return;

			}
			appData.collection.splice( index, 1 );
			count.innerHTML = appData.collection.length;
			ui.parentNode.parentNode.removeChild( ui.parentNode );


		},

		search: function( ev, ui, data ){
			var val;

			ev.preventDefault();

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( appData.fonts ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( val = ui.value ) ){
				data.body.innerHTML = 'No font found.';
				return;

			}
			data.s = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( val.toLowerCase() );
			data.body.innerHTML = '';
			_wfs.load( data );

		},

		import: function( ev, ui ){
			ev.preventDefault();

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( appData.collection ) || prop._isImporting ){
				return;

			}
			prop._isImporting = true;
			ui.innerHTML = '<span class="comet-waitWhileIcon cico cico-spin"></span>';

			Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
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

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( font = appData.collection[a] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( f = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( font ) ).split(':') ), 2 ) || kit.weight.indexOf( i = parseInt( f[1] ) ) < 0 ){
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

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( data.preview ).isNode() || [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ].indexOf( weight ) < 0 ){
				return;

			}
			data.preview.style.fontWeight = weight;
		} 

	};

	Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( open ).on( 'click', function( ev, ui ){
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

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( basket.lastChild.lastChild.firstChild ).on( 'click', prop.import );
		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( h_wrapper.firstChild.firstChild ).on( 'input', prop.search, {
			body: c_wrapper,
			list: list,
			count: count
		});

		appData.collection = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( cometdata.fonts ) ? cometdata.fonts : [];

		if( appData.collection.length > 0 ){

			for( a = 0; a < appData.collection.length; a++ ){
				list.appendChild( kit.item( appData.collection[a], count ) );

			}

		}else{
			list.innerHTML = __cometi18n.messages.selFonts;

		}
		count.innerHTML = appData.collection.length;
		c_wrapper.innerHTML = '<div><span class="comet-waitWhileIcon cico cico-spin"></span>' + __cometi18n.messages.warning.wait + '</div>';
		
		prop._modal = Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
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

});

/***/ }),

/***/ "./src/js/admin/templates.js":
/*!***********************************!*\
  !*** ./src/js/admin/templates.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/message.js */ "./src/js/utils/message.js");
/* harmony import */ var _utils_dialog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dialog.js */ "./src/js/utils/dialog.js");
/* harmony import */ var _utils_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _utils_ajax_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/ajax.js */ "./src/js/utils/ajax.js");








/* harmony default export */ __webpack_exports__["default"] = (function(){

	const _d = document;

	const _w = window;

	const __bun = {

		message: function( text, type ){
			const m = _d.createElement( 'p' );
			m.className = 'comet-message comet-' + type;
			m.innerHTML = text;
			return m;

		},

		icons: {
			wait: '<span class="comet-waitWhileIcon cico cico-spin"></span>',
			arrow: '<span class="cico cico-arrow-right-alt"></span>'

		},

		toggle: function( button, state ){
			const waitwhile = 'comet-waitwhile';
			const _button = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( button );

			if( !_button.isNode() ){
				return;

			}

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( state ) && state ){
				_button.addClass( waitwhile );
				button.innerHTML = '<span class="cico cico-spin"></span>';
				return;

			}
			_button.removeClass( waitwhile );
			button.innerHTML = state;

		}

	};

	const __ = {

		create: function(){

			var is_saving = false;

			const nt = _d.getElementById( 'comet-newTemplate' );

			const __core = {

				open: function( ev, ui ){
					const fragment = _d.createDocumentFragment();
					const wrapper = _d.createElement( 'div' );
					var inner;

					ev.preventDefault();

					wrapper.className = 'comet-savebox comet-wrapper';

					fragment.appendChild( wrapper );

					inner = '<div class="comet-saveform">';
					inner += '<input type="text" class="comet-input" value="" placeholder="' + __cometi18n.ui.name + '" />';
					inner += '<button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.create + '">' + __cometi18n.ui.create + '</button>';
					inner += '</div>';
					wrapper.innerHTML = inner;

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( wrapper.lastChild.lastChild ).on( 'click', __core.save, wrapper.lastChild.firstChild );

					Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
						classes: 'comet-newtemplatebox',
						header: '<h4>' + __cometi18n.ui.newTemplate + '</h4>',
						content: fragment

					});

				},

				save: function( ev, ui, input ){
					var name, _message, pp;

					ev.preventDefault();

					if( is_saving || !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( input ).isNode() || input.parentNode === null || ( pp = input.parentNode.parentNode ) === null ){
						return;

					}
					is_saving = true;
					__bun.toggle( ui, true );

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( name = input.value ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( name = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( name ) ) ) ){
						_message = Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.error.title, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );
						is_saving = false;
						__bun.toggle( ui, __cometi18n.ui.create );
						return;

					}

					Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
						do: 'save',
						data: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].json_encode({
							post_title: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].encode_chars( name ),
							post_type: 'comet_mytemplates',
							post_content: '',
							meta: {},
							post_status: 'publish'
						})

					}).done(function( r ){
						var url, msg;

						is_saving = false;
						__bun.toggle( ui, __cometi18n.ui.create );

						if( parseInt( r ) > 0 ){
							url = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].addQueryArgs( { post: r, action: 'edit', comet: 'template'  }, __cometdata.edit_url );
							msg = __cometi18n.messages.success.newTemplate + '<br>' + __cometi18n.messages.redirect;
							msg += ' <a href="' + encodeURI( url ) + '">' + __cometi18n.messages.editPage + '</a>.';
							Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( msg, 200 ).set( pp );
							_w.open( url, '_self' );
							return;

						}
						_message = Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.error.default, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );


					});

				}

			};

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( nt ).on( 'click', __core.open );

		},

		delete: function(){

			var isDeleting = false;

			const nt = _d.getElementsByClassName( 'comet-templateDelete' );

			const prop = {

				open: function( ev, ui ){
					var msg = false;
					var id;

					ev.preventDefault();

					if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].dataset( ui, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) ){
						msg = __cometi18n.messages.error.noTemplate;

					}
					Object(_utils_dialog_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
						message: ( !msg ? __cometi18n.messages.warning.delete : msg ),
						confirm: prop.delete,
						data: {
							id: id,
							node: ui.parentNode.parentNode,
							error: ( !msg ? false : true )
						}
					});

				},

				delete: function( ev, ui, data ){
					ev.preventDefault();

					if( isDeleting || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( data.error ) && data.error ) ){
						return;

					}
					isDeleting = true;
					data.dialog.destroy();

					Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
						do: 'dtemplate',
						id: data.id

					}).done(function( r ){
						isDeleting = false;

						if( [ 'false', 'FALSE', '0', 0 ].indexOf( r ) > -1 ){
							return;

						}
						_w.location.reload( true );

					});


				}

			};

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( nt ).on( 'click', prop.open );

		},

		import: function(){

			const nt = _d.getElementById( 'comet-importTemplateBtn' );

			const __core = {

				open: function( ev, ui ){
					const input = _d.getElementById( 'comet-importTemplateFile' );
					var wrapper;

					if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( input ).isNode() ){
						return;

					}
					wrapper = _d.createElement( 'div' );
					wrapper.className = 'comet-savebox comet-wrapper';
					wrapper.innerHTML = __cometi18n.messages.selFile;

					Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
						classes: 'comet-importbox',
						header: '<h4>' + __cometi18n.ui.impTemplate + '</h4>',
						content: wrapper,
					});
					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( input ).on( 'change', __core.import, wrapper );
					input.click();

				},

				import: function( ev, ui, wrapper ){
					const files = ui.files;
					var importing, file, f, reader, fragment, button, items, item, d, o, id, n;

					if( !files || files.length < 1 ){
						return;

					}
					importing = files.length;
					fragment = _d.createDocumentFragment();
					items = _d.createElement( 'ul' );
					items.className = 'comet-import comet-items';

					button = _d.createElement( 'button' );
					button.className = 'comet-button comet-buttonPrimary';
					button.innerHTML = __cometi18n.ui.finish;

					fragment.appendChild( Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.warning.import, 300 ).get() );
					fragment.appendChild( items );
					fragment.appendChild( button );

					for( f = 0; f < files.length; f++ ){

						if( !( file = files[f] ).type.match( 'json' ) ){
							continue;

						}
						reader = new FileReader();

						item = _d.createElement( 'li' );
						item.className = 'comet-item comet-waitwhile';
						item.innerHTML = file.name + '<span class="cico cico-spin"></span>';
						items.appendChild( item );

						reader.onload = function( e ){
							var data;

							if( !( data = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].json( e.target.result ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.meta ) ){
								return false;

							}

							Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
								do: 'save',
								data: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].json_encode({
									post_title: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( data.title ) ? data.title : _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( data.post_title ) ? data.post_title : 'Undefined',
									post_content: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( data.content ) ? data.content : _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( data.post_content ) ? data.post_content : '',
									meta: _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( data.meta ) ? {} : data.meta,
									post_type: 'comet_mytemplates',
									post_status: 'publish'

								})

							}).done(function( r ){
								const is_saved = ( parseInt( r ) > 0 );
								item.className = 'comet-item comet-' + ( is_saved ? 'success' : 'error' ); 
								item.lastChild.className = 'cico cico-' + ( is_saved ? 'check' : 'x' );
								importing--;

							});

						};
						reader.readAsText( file );

					}
					wrapper.innerHTML = '';
					wrapper.appendChild( fragment );

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( button ).on( 'click', function( ev, ui ){
						ev.preventDefault();

						if( importing !== 0 ){
							return;

						}
						_w.location.reload( true ); 

					});

				},

			};

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( nt ).on( 'click', __core.open );

		},

		export: function(){

			var is_saving = false;

			const nt = _d.getElementsByClassName( 'comet-templateExport' );

			const __core = {

				open: function( ev, ui ){
					var fragment = false;
					var wrapper, inner, id;

					ev.preventDefault();

					if(  !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].dataset( ui, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) ){
						return;

					}
					fragment = _d.createDocumentFragment();
					wrapper = _d.createElement( 'div' );
					wrapper.className = 'comet-savebox comet-wrapper';
					fragment.appendChild( wrapper );

					inner = '<div class="comet-saveform">';
					inner += '<input type="text" class="comet-input" value="" placeholder="' + __cometi18n.ui.name + '" />';
					inner += '<button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.export + '">' + __cometi18n.ui.export + '</button>';
					inner += '</div>';
					wrapper.innerHTML = inner;

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( wrapper.firstChild.lastChild ).on( 'click', __core.export, { id: id, input: wrapper.firstChild.firstChild } );

					Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
						classes: 'comet-exportbox',
						header: '<h4>' + __cometi18n.ui.expTemplate + '</h4>',
						content: fragment,
					});
				},

				export: function( ev, ui, edata ){
					var wrapper, name, pp, _message;

					ev.preventDefault();

					if( is_saving || !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( edata.input ).isNode() || edata.input.parentNode === null || ( pp = edata.input.parentNode.parentNode ) === null ){
						return;

					}
					is_saving = true;
					__bun.toggle( ui, true );

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( name = edata.input.value ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( name = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( name ) ) ) ){
						_message = Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.error.title, 400 );
						_message.remove_existing( pp );
						_message.appendTo( pp );
						is_saving = false;
						__bun.toggle( ui, __cometi18n.ui.export );
						return;

					}

					Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
						do: 'get',
						meta: true,
						id: edata.id,

					}).done(function( r ){
						var data, blob, msg, filename, json_data;

						is_saving = false;
						__bun.toggle( ui, __cometi18n.ui.export );

						if( !( data = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].json( r ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( data.post_content ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.meta ) ){
							_message = Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.error.export, 400 );
							_message.remove_existing( pp );
							_message.appendTo( pp );
							return;

						}
						filename = 'comet-mytemplate.json';
						json_data = {
							post_title: name,
							post_content: data.post_content,
							meta: data.meta
						};
						blob = new Blob( [ JSON.stringify( json_data ) ], { type: 'application/json' } );
						msg = __cometi18n.messages.success.export + '<br>';
						msg += '<a href="' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].escUrl( _w.URL.createObjectURL( blob ) ) + '" download="' + filename + '">' + __cometi18n.ui.download + '</a>';

						Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( msg, 200 ).set( pp );
						Object(_utils_message_js__WEBPACK_IMPORTED_MODULE_0__["default"])( __cometi18n.messages.warning.export, 300 ).appendTo( pp );

					});

				}

			};

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( nt ).on( 'click', __core.open );

		},

		preview: function(){

			const nt = _d.getElementsByClassName( 'comet-templatePreview' );

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( nt ).on( 'click', function( ev, ui ){
				const url = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( ui.href ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( ui.href ) ) : false;
				var inner = '<div>';
				
				ev.preventDefault();

				if( !url ){
					inner += '<div class="comet-msgbox">';
					inner += '<span class="cico cico-exclamation"></span>';
					inner += '<p>' + __cometi18n.messages.error.unreach + '</p>';
					inner += '</div>';

				}else{
					inner += '<iframe src="' + encodeURI( url ) + '"></iframe>';

				}
				inner += '</div>';

				Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
					classes: 'comet-previewbox',
					header: '<h4>' + __cometi18n.ui.pTemplate + '</h4>',
					content: inner
				});
			});

		}

	};
	__.create();
	__.delete();
	__.import();
	__.export();
	__.preview();

});

/***/ }),

/***/ "./src/js/utils/ajax.js":
/*!******************************!*\
  !*** ./src/js/utils/ajax.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");


/* harmony default export */ __webpack_exports__["default"] = (function( data ){
    const ret = {

        done: function( todo ){

            if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( todo ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( xhr ) ){
                return;

            }

            xhr.onload = function(){
                const response = xhr.status === 200 ? xhr.responseText : false;
                todo( response );

            };

        }

    };
    var xhr;

    if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data ) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( data.do ) ){
        return ret;

    }

    function encode( obj ){
        var _eStr = '';
        var prop;

        for( prop in obj ){

            if( !( prop in obj ) ){
                continue;

            }
            _eStr += ( _eStr.length > 0 ? '&' : '' ) + encodeURI( prop + '=' + obj[prop] );

        }
        return _eStr;

    }
    data.do = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( data.do );
    data.action = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( __cometdata.user ) || __cometdata.user !== 'true' ? 'cometnoprivactions' : 'cometprivactions';
    data.security = __cometdata.security;

    xhr = new XMLHttpRequest();
    xhr.open( 'POST' , __cometdata.ajax_url, true );
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

    xhr.send( encode( data ) );

    return ret;
});

/***/ }),

/***/ "./src/js/utils/dialog.js":
/*!********************************!*\
  !*** ./src/js/utils/dialog.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function( options ){
	const _d = document;
	const id = 'comet-confirm-box';
	var fragment = false;
	var confirm, inner, buttonset;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options ) ){
		options = {};

	}
	
	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options.ui ) ){
		options.ui = {};

	}

	if( Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( confirm = _d.getElementById( id ) ).isNode() && confirm.parentNode !== null ){
		confirm.parentNode.removeChild( confirm );

	}
	options.ui.cancel = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.ui.cancel ) ? __cometi18n.ui.cancel : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.ui.cancel );
	options.ui.done = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.ui.done ) ? __cometi18n.ui.done : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.ui.done );
	options.message = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.message ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( options.message, '<strong><i><b><a><ins><u><sup><sub>' ) ) : '';
	fragment = _d.createDocumentFragment();
	confirm = _d.createElement( 'div' );
	fragment.appendChild( confirm );
	confirm.id = id;
	confirm.className = 'comet-dialog comet-wrapper comet-alertbox';

	inner = '<div class="comet-inner">';
	inner += '<div class="comet-textbox"><p>' + options.message + '</p></div>';
	inner += '<div class="comet-buttonset">';
	inner += '<button class="comet-button comet-cancel">' + options.ui.cancel + '</button>';
	inner += '<button class="comet-button comet-buttonPrimary comet-done">' + options.ui.done + '</button>';
	inner += '</div>';
	inner += '</div>';
	confirm.innerHTML = inner;

	buttonset = confirm.firstChild.lastChild;

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( buttonset.firstChild ).on( 'click', function( ev, ui ){
		ev.preventDefault();

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.cancel ) ){
			options.cancel( ev, ui );

		}
		Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( confirm ).remove();

	});

	if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.confirm ) ){

		options.data = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options.data ) ? options.data : { value: options.data };
		options.data.dialog = {
			target: confirm,
			destroy: function(){
				Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( confirm ).remove();

			}
		};

		Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( buttonset.lastChild ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			options.confirm( ev, ui, options.data );

		});

	}
	_d.body.appendChild( fragment );

	return {
		target: confirm,
		destroy: function(){
			Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( confirm ).remove();

		}

	};

});

/***/ }),

/***/ "./src/js/utils/global.js":
/*!********************************!*\
  !*** ./src/js/utils/global.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");


/* harmony default export */ __webpack_exports__["default"] = (function (){

	window.Comet = typeof Comet !== 'object' ? {} : Comet;

	const prop = {

		get: function( from ){

			if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( from  ) || !( ( from = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( from ) ) in Comet ) ){
				return false;

			}

			return Comet[from];

		},

		set: function( to, data, forceErase ){

			if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( to ) ){
				return false;

			}
			to = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( to );
			forceErase = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBool( forceErase ) ? forceErase : false;

			if( ( to in Comet && forceErase ) || !( to in Comet ) ){
				Comet[to] = data;

			}
			return this.get( to );

		},

		isSet: function( to ){

			return ( !this.get( to ) ? false : true );

		}


	};

	return prop;
});;

/***/ }),

/***/ "./src/js/utils/message.js":
/*!*********************************!*\
  !*** ./src/js/utils/message.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function( message, status ){

	const _d = document;

	const _classes = {
		default: 'comet-message',
		error: 'comet-error',
		warning: 'comet-warning',
		success: 'comet-success',
		note: 'comet-note'

	};

	const __core = {

		create: function(){
			const allowed = '<br><strong><u><i><em><strike><del><ins><a><b><code><ul><li><ol><s><sub><sup><small><span><mark>';
			const _message = _d.createElement( 'div' );

			message = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( message ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( message, allowed ) : '';


			_message.className = __core.get_classes();
			_message.innerHTML = '<p>' + message + '</p>';

			return _message;

		},

		get_status: function(){

			switch( status ){

				case 100:
				case '100':
				case 'note':
				case 'NOTE':
					return 100;

				case 200:
				case '200':
				case 'success':
				case 'SUCCESS':
					return 200;

				case 300:
				case '300':
				case 'warning':
				case 'WARNING':
					return 300;

				default:
					return 400;

			}

		},

		get_classes: function(){
			const _status = __core.get_status();
			var classes = _classes.default + ' ';

			switch( _status ){

				case 100:
					classes += _classes.note;
					break;

				case 200:
					classes += _classes.success;
					break;

				case 300:
					classes += _classes.warning;
					break;

				default:
					classes += _classes.error;
					break;

			}
			return classes;

		},

		get_messages: function( from ){
			var _from;

			if( ( _from = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( from ) ).isNode() ){
				return _from.children( _classes.default );

			}

			if( from === _d ){
				return from.getElementsByClassName( _classes.default );

			}
			return [];

		}

	};

	const prop = {

		replace: function( old ){

			if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( old ).isNode() || old.parentNode === null ){
				return false;

			}
			old.parentNode.replaceChild( node_m, old );
			return true;

		},

		appendTo: function( to ){

			if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( to ).isNode() ){
				return false;

			}
			to.appendChild( node_m );
			return true;

		},

		set: function( nod_e ){

			if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( nod_e ).isNode() ){
				return false;

			}
			nod_e.innerHTML = '';
			nod_e.appendChild( node_m );
			return true;

		},

		get: function(){

			return node_m;

		},

		remove_existing: function( from ){
			var messages;

			if( ( messages = __core.get_messages( from ) ).length < 1 ){
				return false;

			}
			return Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( messages ).remove();

		}

	};

	const node_m = __core.create();

	return prop;
	
});

/***/ }),

/***/ "./src/js/utils/modal.js":
/*!*******************************!*\
  !*** ./src/js/utils/modal.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function ( options ){
	const _d = document;
	const fragment = _d.createDocumentFragment();
	var modal, inner, header, button, body;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options ) ){
		options = {};

	}
	options.close = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options.close ) ? options.close : {};
	options.close.title = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.close.title ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.close.title ) : __cometi18n.ui.close;
	options.close.icon = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.close.icon ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.close.icon ) : '<span class="cico cico-x"></span>';

	modal = _d.createElement( 'div' );
	//modal.className = 'comet-dialog comet-dialogGlobal';
	modal.className = 'comet-modal comet-ui' + ( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.classes ) ? ' ' + _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.classes ) : ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( options.classes ) ? ' ' + ( options.classes ).join( ' ' ) : '' ) );


	inner = '<div class="comet-inner">';
	inner += '<div class="comet-header"></div>';
	inner += '<div class="comet-body"></div>';
	inner += '</div>';
	modal.innerHTML = inner;
	fragment.appendChild( modal );

	header = modal.firstChild.firstChild;
	body = modal.firstChild.lastChild;

	if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.header ) ){
		header.innerHTML = options.header;

	}else{
		header.appendChild( options.header );

	}

	if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.content ) ){
		body.innerHTML = options.content;

	}else{
		body.appendChild( options.content );

	}
	button = _d.createElement( 'button' );
	button.className = 'comet-button comet-close';
	button.title = options.close.title;
	button.innerHTML = options.close.icon;
	modal.appendChild( button );
/*


	inner = document.createElement( 'div' );
	inner.className = 'comet-dialogbox';

	header = document.createElement( 'div' );
	header.className = 'comet-dialogHeader';

	if( !utils.isStringEmpty( options.header ) ){
		header.innerHTML = options.header;

	}else if( ( nh = node( options.header ) ).isNode() ){
		header.appendChild( nh.prop() );

	}

	button = document.createElement( 'button' );
	button.className = 'comet-button comet-dialogCloseButton';
	button.title = options.close.title;
	button.innerHTML = options.close.icon;

	content = document.createElement( 'div' );
	content.className = 'comet-dialogContent';

	if( !utils.isStringEmpty( options.content ) ){
		content.innerHTML = options.content;

	}else if( ( nh = node( options.content ) ).isNode() ){
		content.appendChild( nh.prop() );

	}else{
		content.innerHTML = i18n.messages.unreach;

	}
	header.appendChild( button );
	inner.appendChild( header );
	inner.appendChild( content );

	modal.appendChild( inner );

	document.body.appendChild( modal );*/

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( button ).on( 'click', function( ev, ui ){
		ev.preventDefault();

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.done ) ){

			if( options.done( ev, ui ) === 1 ){
				return false;

			}

		}

		if( modal && modal.parentNode !== null ){
			modal.parentNode.removeChild( modal );

		}

	});

	_d.body.appendChild( fragment );

	return {
		target: modal,
		modal: modal.firstChild,
		header: header,
		body: body,
		destroy: function(){

			if( modal && modal.parentNode !== null ){
				modal.parentNode.removeChild( modal );

			}

		}
	};
	
});

/***/ }),

/***/ "./src/js/utils/node.js":
/*!******************************!*\
  !*** ./src/js/utils/node.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sort.js */ "./src/js/utils/sort.js");




/* harmony default export */ __webpack_exports__["default"] = (function ( node ){
	const origin = node;
	const prop = {};
	const priv = {};

	priv.decode = function( entry ){
		var f, r;

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( entry ) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( ( entry = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( entry ) ) ) ){
			return false;

		}
		f = entry.charAt( 0 );
		r = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( entry.substring( 1 ) );
		return ( f === '.' ? { type: 'class', str: r } : ( f === '#' ? { type: 'id', str: r } : false ) );

	};

	priv.insert = function( position, entry ){
		const or = node;
		var ns, nn, n;

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( position ) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( ( position = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( position ) ) ) || prop.isView() ){
			return false;

		}

		if( [ 'beforebegin', 'afterbegin', 'beforeend', 'afterend' ].indexOf( position ) < 0 ){
			return false;

		}

		function doing(){

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( entry ) ){
				node.insertAdjacentHTML( position, _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( entry ) );
				return true;

			}
			node = entry;

			if( !prop.isNode() ){
				node = origin;
				return false;

			}
			node = or;
			node.insertAdjacentElement( position, entry );
			return true;

		};

		if( prop.isNode() ){
			return doing();

		}
		ns = node;

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( ns ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( ns ) ){
			return false;

		}

		for( n in ns ){
			nn = ns[n];
			node = nn;

			if( !prop.isNode() ){
				node = or;
				continue;

			}

			doing();
			node = or;

		}

	};

	priv.size = function( type, depth ){
		var size, tmp1, tmp2, style, isWidth;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( type ) || [ 'width', 'height' ].indexOf( type = ( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( type ) ).toLowerCase() ) < 0 ){
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
			tmp1 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.borderLeft : style.borderTop ), min: 0, default: 0 } );
			tmp2 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.borderRight : style.borderBottom ), min: 0, default: 0 } );
			size = size - ( tmp1 + tmp2 );

			if( depth === -2 ){
				tmp1 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.paddingLeft : style.paddingTop ), min: 0, default: 0 } );
				tmp2 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.paddingRight : style.paddingBottom ), min: 0, default: 0 } );
				size = size - ( tmp1 + tmp2 );

			}
			return size;

		}
		tmp1 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.marginLeft : style.marginTop ), min: 0, default: 0 } );
		tmp2 = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( isWidth ? style.marginRight : style.marginBottom ), min: 0, default: 0 } );
		return size + tmp1 + tmp2;

	};

	priv.set = function(){
		var id, tmp;

		if( prop.isNode() || prop.isView() ){
			return node;

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node ) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) ){
			return node;

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( node ) ){
			return false;
			
		}

		if( ( node = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( node ) ).indexOf( ',' ) > -1 ){
			node = document.querySelectorAll( node );
			return node;

		}
		id = node.charAt( 0 );
		tmp = node.substring( 1 );

		if( id === '#' ){
			node = document.getElementById( tmp );
			return node;

		}

		if( id === '.' ){
			node = document.getElementsByClassName( tmp );
			return node;

		}
		node = document.querySelectorAll( node );
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
		return ( node === document );

	};

	prop.isWindow = function(){
		return ( node === window );

	};

	prop.isView = function(){
		return ( prop.isDocument() || prop.isWindow() );

	};

	prop.isHidden = function(){
		return ( el.offsetParent === null );

	};

	prop.classList = function(){
		var cl;

		return ( prop.isNode() && !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( node.className ) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( cl = ( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( node.className ) ).split( ' ' ), 1 ) ? cl : [] );

	};

	prop.hasClass = function( classe ){
		const classes = prop.classList();
		var a, cl;

		if( classes.length < 1 || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classe ) ){
			return false;

		}
		classe = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( classe );

		for( a in classes ){

			if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classes[a] ) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( classes[a] ) !== classe ){
				continue;

			}
			return true;

		}
		return false;

	};

	prop.removeClass = function( classe ){
		const or = node;
		var ns, nn, n;

		if( prop.isView() || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classe ) ){
			return false;

		}
		classe = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( classe );

		function remove(){
			const classes = prop.classList();
			const j = [];
			var a, cl;

			if( classes.length < 1 ){
				return false;

			}

			for( a in classes ){

				if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classes[a] ) || ( cl = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( classes[a] ) ) === classe ){
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

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) && !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node ) ){
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

		if( prop.isView() || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classe = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toClass( classe ) ) ){
			return false;

		}

		function add(){
			const classes = prop.classList();
			const j = [];
			var exists = false;
			var a, cl;

			for( a in classes ){

				if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( classes[a] ) || ( cl = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( classes[a] ) ) === classe ){
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

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) && !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node ) ){
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

		if( !prop.isNode() || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( className ) ){
			return false;

		}
		className = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( className );

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
		const isCallbackAfunction = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( callback );
		var a, ch, n, ns, r;

		if( !prop.isNode() || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( className ) ||node.children.length < 1 ){
			return false;

		}
		className = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( className );
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

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( c, 1 ) ){
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

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( target ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( tri = priv.decode( target ) ) ){
			return el;

		}
		isId = ( tri.type === 'id' );

		while( el ){
			node = el;

			if( ( isId && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( el.id ) === tri.str ) || prop.hasClass( tri.str ) ){
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

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( target ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( tri = priv.decode( target ) ) ){
			return el;

		}
		isId = ( tri.type === 'id' );

		while( el ){
			node = el;

			if( ( isId && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( el.id ) === tri.str ) || prop.hasClass( tri.str ) ){
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

		duration = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: duration, min: 0, default: 500, float: true } );

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

		duration = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: duration, min: 0, default: 500, float: true } );

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
			const ev = document.createEvent( 'HTMLEvents' );
			ev.initEvent( eventName, false, true );
			node.dispatchEvent( ev );

		}

		if( prop.isNode() || prop.isView() ){
			fire();
			return;

		}

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) && !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node ) ){
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

		data = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isSet( data ) ? data : false;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( on ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( event ) ){
			return false;

		}

		if( ( types = ( on = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( on ) ).split( ' ' ) ).length < 1 ){
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

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) && !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node, 1 ) ){
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

			if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( types[e] ) ){
				continue;

			}
			_event( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( types[e] ) );

		}

	};

	prop.off = function( on, event, data ){
		const isEventAfunction = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( event );
		var or = node;
		var e, types;


		data = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isSet( data ) ? data : false;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( on ) ){
			return false;

		}

		if( ( types = ( on = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( on ) ).split( ' ' ) ).length < 1 ){
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

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( node ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( node, 1 ) ){
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

			if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( types[e] ) ){
				continue;

			}
			_event( types[e] );

		}

	};

	prop.load = function( url, callback ){
		var request;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( url ) || !prop.isNode() ){
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

			if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( callback ) ){
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
			return;

			for( f in fields ){
				field = fields[f];
				type = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( field.type ) ? _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( field.type.toLowerCase() ) : '';

				if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( field.name ) || field.disabled || exc.indexOf( type ) > -1 ){
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

		Object(_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"])( options );

	};

	priv.set();

	return prop;
	
});;

/***/ }),

/***/ "./src/js/utils/parse.js":
/*!*******************************!*\
  !*** ./src/js/utils/parse.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");



const parse = {

	dataset: function( ui, match ){
		var data = false;

		if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( ui ).isNode() || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( match ) ){
			return false;

		}

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( ui.dataset ) || !( ( match = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( match ) ) in ui.dataset ) ){
			return false;

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( ui.dataset[match] ) ){
			return ui.dataset[match];

		}

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( ui.dataset[match] ) ){
			return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( ui.dataset[match] );

		}
		return false;

	},

	type: function( type ){
		const types = [ 'sections', 'rows', 'columns', 'elements', 'items' ];
		return ( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( type ) && types.indexOf( type = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( type ) ) > -1 ? type : false );

	},

	id: function( id ){
		return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( id = parseInt( id ) ) && !isNaN( id ) ? id : false );

	},

	style: function( s_id ){
		const _d = document;
		const s = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( s_id ) ? _d.getElementById( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( s_id ) ) : false;
		var _s;

		return ( ( ( _s = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( s ) ).isNode() ) && _s.prop().nodeName.toLowerCase() === 'style' ? _s.prop() : false );

	},

	html: function( str ){
		var s;

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( str ) ){
			return false;

		}
		s = document.createElement( 'div' );
		s.innerHTML = str;

		return s.children;

	},

	ids: function( str, type ){
		var ids, a, id, nids, n;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( ids = str.split( ',' ) ), 1 ) ){
			return false;

		}
		nids = type === 'array' ? [] : {};
		n = 0;

		for( a = 0; a < ids.length; a++ ){

			if( !( id = parse.id( ids[a] ) ) ){
				continue;

			}

			if( type === 'array' ){
				nids.push( id );
				continue;

			}
			nids[id] = id;
			n++;
			nids.length = n;

		}
		return !nids.length ? false : nids;

	},

	json: function( str ){
		var j;

		try {
			j = JSON.parse( str );

		} catch( e ){
			return false;

		}
		return j;

	}

};

/* harmony default export */ __webpack_exports__["default"] = (parse);


/***/ }),

/***/ "./src/js/utils/sanitize.js":
/*!**********************************!*\
  !*** ./src/js/utils/sanitize.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");




const sanitize = {};

sanitize.number = function( entry ){
	var value;

	if( entry === null || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( entry ) ){
		entry = {
			value: entry
		};

	}

	if( entry.value !== null && ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( entry.value ) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( entry.value ) ) ){
		value = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBool( entry.float ) && entry.float ? parseFloat( entry.value ) : parseInt( entry.value );

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( entry.min ) && value < entry.min ){
			return entry.min;

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( entry.max ) && value > entry.max ){
			return entry.max;

		}

		if( !isNaN( value ) ){		
			return value;
		}

	}
	return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( entry.default ) ? parseFloat( entry.default ) : null );

};

sanitize.valueUnit = function( value, unit ){

	if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( value ) ){

		if( ( value = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( value ) ).toLowerCase() === 'auto' ){
			return 'auto';

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( value ) ){
			return '';

		}

	}
	unit = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( unit ) ? sanitize.unit( unit ) : '';
	value = sanitize.number( { value: value, float: ( unit !== 'px' ) } );

	return ( value === null ? '' : ( value === 0 ? value.toString() : value + unit ) );
};

sanitize.unit = function( unit ){

	unit = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( unit ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( unit.toLowerCase() ) : unit;

	switch( unit ){
		case 'px':
		case 'pixel':
		case 'pix':
		case 'pxl':
		case 'pixels':
		return 'px';

		case 'em':
		case 'mul':
		case 'mu':
		case '*':
		return 'em';

		case '%':
		case 'percent':
		case 100:
		case '100':
		return '%';

		case 'pt':
		case 'points':
		case 'point':
		case 'pts':
		return 'pt';

		case 'cm':
		case 'centimeter':
		case 'centimeters':
		return 'cm';

		case 'mm':
		case 'millimeter':
		case 'millimeters':
		return 'mm';

		case 'in':
		case 'inches':
		case 'inch':
		return 'in';
		
		default:
		return '';
	}

};

sanitize.value = function( entry, def ){
	const typeE = typeof entry;
	const typeD = typeof def;
	var output = '';

	if( typeE === 'number' ){
		output = sanitize.number( entry );

	}else if( typeE === 'string' ){
		output = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( entry );
	}

	if( output === '' && def !== null ){
		if( typeD === 'number' ){
			output = sanitize.number( def );

		}else if( typeD === 'string' ){
			output = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( def );
		}
	}

	return output;

};

sanitize.color = function( str ){
	const regex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) && regex.test( str = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( str ) ) ){
		return str;

	}
	
	return '';

};

sanitize.data = function( data, id ){
	const d = {};
	var ids, idsa, a;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data )  || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data.elements ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data.elements[id] ) ){
		return d;

	}
	d.el = data.elements[id];

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( d.el._items ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data.items ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].ids( d.el._items, 'array' ) ), 1 ) ){
		d.items = {};

		for( a = 0; a < ids.length; a++ ){

			if( !( idsa = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( ids[a] ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data.items[idsa] ) ){
				continue;

			}
			d.items[idsa] = data.items[idsa];

		}

	}
	return d;

};

sanitize.content = function(){
	const elements = document.getElementsByClassName( 'cpb-elementContent' );
	var o, e;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( elements ) ){
		return '';

	}
	o = '';

	for( e in elements ){

		if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( elements[e] ).isNode() ){
			continue;

		}
		o += _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( elements[e].innerHTML, '<br><img><p><a><u><strike><b><strong><i><ins><del><hr><caption><span><h1><h2><h3><h4><h5><h6><video><audio>' );

	}
	return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].encode_chars( o );

};

sanitize.post = function( str ){
	const allowed = '<br><img><p><a><u><strike><b><strong><i><ins><del><hr><caption><span><h1><h2><h3><h4><h5><h6><sub><sup><title>';

	return ( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].encode_chars( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( str, allowed ) ) : '' );

};

sanitize.class = function( str, prefix ){

	return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toClass( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( prefix ) ? prefix : '' ) + _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toClass( str ) );

};

sanitize.alignment = function( entry ){
	const c = 'cpb-align';
	entry = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( entry ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( entry.toLowerCase() ) : entry;

	switch( entry ){
		case 'l':
		case 'left':
		case '<':
		return c + 'left';

		case 'r':
		case 'right':
		case '>':
		return c + 'right';

		case 'j':
		case 'justify':
		case '=':
		return c + 'justify';

		case 'm':
		case 'middle':
		return c + 'middle';

		case 't':
		case 'top':
		case '^':
		return c + 'top';

		case 'b':
		case 'bottom':
		case 'v':
		return c + 'bottom';

		default:
		return c + 'center';
	}

};

/* harmony default export */ __webpack_exports__["default"] = (sanitize);

/***/ }),

/***/ "./src/js/utils/sort.js":
/*!******************************!*\
  !*** ./src/js/utils/sort.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function ( options ){
	const func = {};
	const ID = 'comet' + Math.random().toString(36).substr(2, 9);
	var current = null;
	var cursor = null;
	var mouseDown = false;
	var win, state, placeholder, interval;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options ) ){
		options = {};

	}
	options.connectWith = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.connectWith ) ? 'ul' : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.connectWith );
	options.items = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.items ) ? 'li' : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.items );

	if( !( 'handle' in options ) || options.items === '' || options.connectWith === '' ){
		return false;

	}

	options.placeholder = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.placeholder ) ? 'cpb-placeholderUi' : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.placeholder );

	options.cursor = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.cursor ) ? '' : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.cursor );

	options.containment = 'containment' in options ? options.containment : document.body;

	options.bodyClass = !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( options.bodyClass ) ? 'cpb-sorting' : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( options.bodyClass );

	placeholder = document.createElement( 'div' );
	placeholder.id = ID;
	placeholder.className = 'placeholder ' + options.placeholder;
	win = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( options.containment );

	if( !win.isNode() ){
		return false;

	}

	func.cursor = function( e ){
		const _cursor = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( cursor );
		const tcur = _cursor.isNode();

		if( e === 'destroy' && tcur ){
			_cursor.remove();
			cursor = null;
			return;
		}

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( e ) ){
			return;

		}

		if( !tcur ){
			cursor = document.createElement( 'div' );
			cursor.id = 'comet-uiCursor';

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.cursor ) ){
				cursor.className = options.cursor;

			}

			cursor.innerHTML = '<span class="cico cico-move"></span>';
			Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( document.body ).append( cursor );
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
		tui = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( ui );
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
		const _nd = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( nd );
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
		var ex, i, c, a;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( ex = ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( str ) ).split( ',' ) ), 1 ) ){
			return false;

		}

		for( a in ex ){

			if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( i = ex[a] ) ){
				continue;

			}
			i = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( i );

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

	};

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( document.documentElement ).on( 'mousemove', function( e, ui ){
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

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( options.handle ).on( 'mousedown', function( e, ui ){
		var r, nd, closest;
		e.preventDefault();
		state = setInterval( function(){
			current = ui;
			func.cursor( e );

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.bodyClass ) && !( nd = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( document.body ) ).hasClass( options.bodyClass ) ){
				nd.addClass( options.bodyClass );

			}

			if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.start ) ){
				closest = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( ui ).closest( options.connectWith );

				if( closest ){
					Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( closest ).after( placeholder );

				}
				r = options.start( e, ui );

				if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( r ) ){
					current = r;

				}
			}
			mouseDown = true;
			clearInterval( state );
			Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( options.connectWith ).on( 'mouseenter', func.onConnectWith );
			Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( options.items ).on( 'mouseenter', func.onItems );

		}, 500 );
	});

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( document.documentElement ).on( 'mouseup', function( e, ui ){
		const transient = 'cpb-transientPlaceholder';
		var po;
		var nui, nu, n;
		e.preventDefault();
		clearInterval( state );
		clearInterval( interval );

		if( !mouseDown ){
			return;

		}

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( options.bodyClass ) && ( ( nu = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( document.body ) ).hasClass( options.bodyClass ) ) ){
			nu.removeClass( options.bodyClass );

		}
		po = document.getElementById( ID );

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.stop ) && current !== null && po !== null ){
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

});;

/***/ }),

/***/ "./src/js/utils/ui/viewport.js":
/*!*************************************!*\
  !*** ./src/js/utils/ui/viewport.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function( viewport, target, view ){

	var width, height;

	const _viewport = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( viewport );

	const _target = Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( target );

	const triggers = [ 'scroll', 'load' ];

	const __ = {

		check: function( element ){
			const x = element.getBoundingClientRect();

			return ( x.top >= 0 && x.left >= 0 && x.right <= width && x.bottom <= height );

		},

		view: function( ev, ui ){
			var ctr, a;

			if( _target.isView() ){
				return;

			}

			if( _target.isNode() ){
				view( __.check( _target.prop() ), _target.prop() );
				return;

			}

			if( ( ctr = _target.get() ).length < 1 ){
				return;

			}

			for( a = 0; a < ctr.length; a++ ){

				if( Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( ctr[a] ).isNode() ){
					view( __.check( ctr[a] ), ctr[a] );

				}

			}


		}

	};

	if( ( !_viewport.isNode() && !_viewport.isView() ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( view ) ){
		return false;

	}
	width = _viewport.width();
	height = _viewport.height();

	triggers.forEach(function( trigger ){

		_viewport.on( trigger, __.view );

	});

	Object(_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( window ).on( 'resize', __.view );
	
});

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "./src/js/utils/global.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");




const utils = {};

utils.isString = function( entry ){
	return typeof entry === 'string';

};

utils.isObject = function( entry ){
	return typeof entry === 'object';

};

utils.isNumber = function( entry ){
	return typeof entry === 'number';

};

utils.isBool = function( entry ){
	return typeof entry === 'boolean';

};

utils.isFunction = function( entry ){
	return typeof entry === 'function';

};

utils.isSet = function( entry ){
	return typeof entry !== 'undefined';

};

utils.isArray = function( entry, length ){

	length = this.isSet( length ) ? ( this.isNumber( length = parseInt( length ) ) && !isNaN( length ) && length > 0 ? length : false ) : false;

	return Array.isArray( entry ) && ( ( length && entry.length >= length ) || !length );

};

utils.trim = function( entry ){
	const type = typeof entry;
	var s = '', c;

	if( type === 'string' ){
		return entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );

	}

	if( type === 'object' && 'str' in entry ){
		s = entry.str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );

		if( typeof entry.char === 'string' ){
			c = entry.char === ']' ? '\\]' : c;
			c = entry.char === '\\' ? '\\\\' : c;
			s.replace( new RegExp( '^[' + c + ']+|[' + c + ']+$', 'g' ), '');
		}

	}
	return s;

};

utils.isEmpty = function( entry ){

	switch( entry ){
		case '':
		case 'undefined':
		case 'null':
		case '0':
		case 0:
		case false:
		case null:
		case 0.0:
		return true;
		default:

		return ( !utils.isSet( entry ) && !utils.isArray( entry, 1 ) && isNaN( entry ) );
	}

};

utils.isStringEmpty = function( str ){
	const isStr = utils.isString( str );

	return ( !isStr || ( isStr && ( utils.trim( str ) ).length < 1 ) );

};

utils.capitalize = function( str ){

	return !utils.isStringEmpty( str ) ? ( utils.trim( str ) ).charAt(0).toUpperCase() + str.slice(1) : '';

};

utils.escUrl = function( url ){
	var strip;

	function _deepReplace( search, subject ){
		var s;
		if( typeof search === 'object' ){
			for( s in search ) {
				subject = subject.replace( search[s], '' );
			}
		}
		return subject;
	}
	
	if( this.isStringEmpty( url = this.trim( url.toString() ) ) ){
		return url;
	}
	
	if ( 0 !== url.indexOf( 'mailto:' ) ) {
		strip = [ '%0d', '%0a', '%0D', '%0A' ];
		url = _deepReplace( strip, url);
		
	}

	//url = url.replace( '&', '&#038;' ).replace( '\'', '&#039;' );
	return url;

	return encodeURI( url );

};

utils.encode_chars = function( str ){
	const __core = {

		map: {
			//'&': '&amp;',
			'(': '&#40;',
			')': '&#41;',
			',': '&#44;',
			//'/': '&#47;',
			':': '&#58;',
			//';': '&#59;',
			'[': '&#91;',
			'\\': '&#92;',
			']': '&#93;',
			'`': '&#96;',
			'{': '&#123;',
			'|': '&#124;',
			'}': '&#125;',
			'~': '&#126;',
			'«': '&laquo;',
			'»': '&raquo;',
		},

		callback: function( m ){
			return __core.map[m];

		}

	};

	if( !utils.isString( str ) ){
		return str;

	}
	return str.replace(/[,\[\]\\`{}\(\):|~«»]/g, __core.callback );

};

utils.decode_chars = function( str ){

};

utils.json_encode = function( obj, raw ){

	if( !utils.isObject( obj ) || utils.isArray( obj ) ){
		return '';

	}
	raw = utils.isBool( raw ) ? raw : true;

	if( raw ){
		return encodeURIComponent( JSON.stringify( obj ) );

	}
	return JSON.stringify( obj );

};


utils.getVideo = function( url, media ){
	const origin = url;
	var regex, tmp;

	switch( media ){
		case 'vimeo':
		case 'VIMEO':
		regex = /(https?)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
		tmp = regex.exec( url );

		if( utils.isString( tmp[5] ) ){
			return tmp[5];

		}
		break;

		case 'youtube':
		case 'YOUTUBE':
		regex = /(>|<)/gi;
		url = url.replace( /(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

		if( utils.isString( url[2] ) ){
			tmp = url[2].split(/[^0-9a-z_\-]/i);

			if( utils.isString( tmp[0] ) ){
				return tmp[0];

			}
		}
		break;

	}
	return origin;

};

utils.stripTags = function( str, allowed ){
	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	const mallowedTags = /<[a-z][a-z0-9]*>/g; 
	const commentsTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

	if( !utils.isString( str ) ){
		return '';

	}
	allowed = (((allowed || '') + '').toLowerCase().match( mallowedTags) || [] ).join('');

	return str.replace( commentsTags, '' ).replace( tags, function( $0, $1 ){
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});

};

utils.stripOnly = function( str, only ){
	const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	const onlyTags = /<[a-z][a-z0-9]*>/g;

	if( !utils.isString( str ) ){
		return '';

	}
	only = (((only || '') + '').toLowerCase().match( onlyTags) || [] ).join('');

	return str.replace( tags, function( $0, $1 ){
  		return only.indexOf('<' + $1.toLowerCase() + '>') > -1 ? '' : $0;// : '';
  	});

};

utils.toClass = function( entry ){
	var o = '';
	var e;

	if( utils.isString( entry ) ){
		return entry.replace( /^[^a-z\-_]*/gi, '' ).replace( /[^a-z0-9\-_]*/gi, '' );

	}

	if( utils.isArray( entry, 1 ) ){

		for( e in entry ){
			o += utils.toClass( entry[e] ) + ' ';

		}
		return utils.trim( o );

	}

	return '';

};

utils.extend = function( out ){
	const args = arguments;
	var i, obj, key;
	out = utils.isObject( out ) ? out : {};

	for( i = 1; i < args.length; i++ ){

		if( !( obj = args[i] ) ){
			continue;

		}

		for( key in obj ){

			if( !obj.hasOwnProperty(key) ){
				continue;

			}

			if( utils.isObject( obj[key] ) ){
				out[key] = utils.extend( out[key], obj[key] );
				continue;

			}
			out[key] = obj[key];

		}
		
	}
	return out;

};

utils.getParameters = function(){
	const oParametre = {};
	var aItKey, nKeyId, aCouples;

	if( window.location.search.length < 1 ){
		return {};

	}

	for( aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split('&'); nKeyId < aCouples.length; nKeyId++ ){
		aItKey = aCouples[nKeyId].split('=');
		oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : '';

	}
	return oParametre;

};

utils.getSvgSets = function(){
	const sets = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])().get( 'svgSets' );

	return !utils.isObject( sets ) ? {} : sets;

};

utils.getPost = function(){
	const post = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])().get( 'post' );

	return !utils.isObject( post ) ? {} : post;

};

utils.getPostMeta = function(){
	const post = utils.getPost();

	return !utils.isObject( post.meta ) ? {} : post.meta;

};

utils.getLib = function(){
	const lib = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])().get( 'lib' );

	return !utils.isObject( lib ) ? {} : lib;

};

utils.getSettings = function(){
	const settings = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])().get( 'settings' );

	return !utils.isObject( settings ) ? {} : settings;

};

utils.getSettingsFrom = function( slug ){
	const settings = utils.getSettings();
	const types = [ 'section', 'row', 'column', 'elements' ];

	return !utils.isStringEmpty( slug ) && types.indexOf( slug = utils.trim( slug ) ) > -1 && utils.isObject( settings[slug] ) ? settings[slug] : false;

};

utils.getElements = function(){

	return utils.getSettingsFrom( 'elements' );

};

utils.getElement = function( slug ){
	const elements = utils.getElements();

	return !utils.isStringEmpty( slug ) && utils.isObject( elements[( slug = utils.trim( slug ) )] ) ? elements[slug] : false;

};

utils.getNode = function( slug ){
	const g_ = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
	const types = [ 'editor', 'frame', 'cockpit', 'sidebar', 'panel', 'generalSettings' ];

	return !utils.isStringEmpty( slug ) && types.indexOf( slug = utils.trim( slug ) ) > -1 ? g_.get( slug ) : false;

};

utils.foreachItem = function( data, onitem ){
	var o = '';
	var ids, i;

	if( !utils.isObject( data ) || !utils.isObject( data.el ) || !utils.isObject( data.items ) || !utils.isFunction( onitem ) ){
		return false;

	}

	if( utils.isStringEmpty( data.el._items ) || !utils.isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].ids( data.el._items, 'array' ) ), 1 ) ){
		return false;

	}

	for( i = 0; i < ids.length; i++ ){

		if( !utils.isObject( data.items[ids[i]] ) ){
			continue;

		}
		o += onitem( ids[i], data.items[ids[i]] );

	}
	return o;

};

utils.getAllowedTags = function( tag ){
	const _a_ = [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'caption' ];
	const _b_ = [ 'code', 'pre', 'blockquote' ];
	const _c_ = [ 'legend', 'label' ];
	const tags = '<br><sub><sup><span><b><strong><i><em><u><ins><del><a><strike>';

	if( _a_.indexOf( tag ) > -1 ){
		return tags;

	}

	if( _b_.indexOf( tag ) > -1 ){
		return tags + '<p><h1><h2><h3><h4><h5><h6><code><pre>';

	}

	if( _c_.indexOf( tag ) > -1 ){
		return '';

	}
	return tags + '<div><article><section><caption><img><figure><aside><svg><g><symbol>';

};

utils.addQueryArgs = function( args, url ){
	var cut = null;
	var key, value, n, _url, nkv, kv, ex, e, _ex, _e, __e, __ex, _args, h, ioHash, ioQ;

	if( !utils.isString( url ) ){
		return '';

	}
	url = utils.trim( utils.stripTags( url ) );

	if( !utils.isObject( args ) ){
		return url;

	}
	ioQ = url.indexOf( '?' );
	ioHash = url.indexOf( '#' );

	if( ioQ > ioHash ){
		if( ioHash > -1 ){
			kv = url.substr( ioHash );
			cut = ioHash;
		}else if( ioQ > -1 ){
			kv = url.substr( ioQ );
			cut = ioQ;
		}
	}else if( ioQ < ioHash ){
		if( ioQ > -1 ){
			kv = url.substr( ioQ );
			cut = ioQ;
		}else if( ioHash > -1 ){
			kv = url.substr( ioHash );
			cut = ioHash;
		}
	}
	_url = url;
	if( cut !== null ){
		_url = url.substr( 0, cut );
		if( typeof kv === 'string' ){
			ex = kv.split( '?' );
			for( e = 0; e < ex.length; e++ ){
				if( ex[e].indexOf( '#' ) > -1 ){
					continue;
				}
				_ex = ex[e].split( '&' );
				if( typeof _ex !== 'object' || _ex.length < 1 ){
					continue;
				}
				for( _e = 0; _e < _ex.length; _e++ ){
					if( ( h = _ex[_e].indexOf( '=' ) ) < 0 ){
						continue;
					}
					__e = _ex[_e].substr( 0, h );
					args[__e] = _ex[_e].substr( ( h + 1 ) );
				}
			}
		}
	}
	n = 0;
	_url += '?';
	for( key in args ){
		value = args[key];
		if( n !== 0 ){
			_url += '&';
		}
		_url += encodeURI( key ) + '=' + encodeURI( value );
		n++;
	}
	return _url;

};

/* harmony default export */ __webpack_exports__["default"] = (utils);

/***/ }),

/***/ 2:
/*!*************************************!*\
  !*** multi ./src/js/admin/admin.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/Wordpress/wp-content/plugins/comet/src/js/admin/admin.js */"./src/js/admin/admin.js");


/***/ })

/******/ });
//# sourceMappingURL=admin.js.map