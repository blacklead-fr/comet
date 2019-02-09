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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/editor/actions/cockpit.js":
/*!******************************************!*\
  !*** ./src/js/editor/actions/cockpit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/global.js */ "./src/js/utils/global.js");
/* harmony import */ var _utils_dialog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/dialog.js */ "./src/js/utils/dialog.js");
/* harmony import */ var _utils_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _utils_ajax_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./template.js */ "./src/js/editor/actions/template.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../data.js */ "./src/js/editor/data.js");









const cockpit = {

	toggle: function( _n ){

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const pit = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'cockpit' );
			const toggled = 'is_toggled';
			var _pit;

			if( !pit || !( ( _pit = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( pit ) ).isNode() ) ){
				return false;

			}

			if( _pit.hasClass( toggled ) ){
				_pit.removeClass( toggled );
				return;

			}
			_pit.addClass( toggled );

		});

	},

	settings: function( _n ){

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const pit = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'generalSettings' );
			const toggled = 'is_toggled';
			var _pit;

			if( !pit || !( ( _pit = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( pit ) ).isNode() ) ){
				return false;

			}

			if( _pit.hasClass( toggled ) ){
				_pit.removeClass( toggled );
				return;

			}
			_pit.addClass( toggled );

		});

	},

	save: function( _n ){

		const _d = document;

		const onsave = function( ev, ui, edata ){
			ev.preventDefault();

			const metaData = Object(_data_js__WEBPACK_IMPORTED_MODULE_7__["default"])().getData();
			var m = '';
			var hasError = false;
			var val, div, pp, x, dren;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( edata ) ){
				return;

			}

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( edata.input ).isNode() ){
				m = __cometi18n.messages.error.savePost + '<br>';

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( metaData ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( metaData._sections ) ){
				m = __cometi18n.messages.error.noContent + '<br>';

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( val = input.value ) || ( val = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( val ) ) ).length < 1 ){
				m += __cometi18n.messages.error.title;

			}

			if( m.length > 0 ){

				if( ui.parentNode !== null && ( pp = ui.parentNode.parentNode ) !== null && ( dren = pp.children ).length > 0 ){

					for( x = 0; x < dren.length; x++ ){

						if( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( dren[x] ).hasClass( 'comet-saveTempErr' ) ){
							hasError = true;
							dren[x].innerHTML = m;

						}

					}

				}

				if( !hasError ){
					div = _d.createElement( 'div' );
					div.className = 'comet-saveTempErr';
					div.innerHTML = m;
					pp.appendChild( div );

				}
				return;

			}

			Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
				do: 'save',
				data: JSON.stringify({
					title: val,
					meta: metaData,
					content: sanitize.content(),
					post_type: 'comet_mytemplates'

				})

			});
			edata.modal.destroy();

		};

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();

			const args = {};
			var mod = false;
			var id, content, inner, div, input, button, form;

			content = _d.createElement( 'div' );
			content.className = 'comet-savebox comet-wrapper';
			content.id = 'comet-saveTempWin';

			inner = '<p>' + __cometi18n.messages.stemplate + ' <a href="' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].escUrl( 'https://blacklead.fr/support/docs/comet/my-templates/' ) + '" target="_blank">' + __cometi18n.messages.rmtemplate + '</a>.</p>';
			inner += '<div class="comet-saveform">';
			inner += '<input type="text" class="comet-input comet-ui" placeholder="' + __cometi18n.ui.tempname + '" />';
			inner += '<button class="comet-button comet-buttonPrimary" title="' + __cometi18n.ui.save + '" aria-label="' + __cometi18n.ui.save + '"><span class="cico cico-export"></span></button>';
			inner += '</div>';

			/*div = document.createElement( 'div' );
			div.id = 'comet-saveTempForm';
			content.appendChild( div );

			input = document.createElement( 'input' );
			input.id = 'comet-saveTempInput';
			input.className = 'comet-rendField';
			input.placeholder = __cometi18n.ui.tempname;
			div.appendChild( input );

			button = document.createElement( 'button' );
			button.className = 'comet-saveTempButton comet-button comet-buttonPrimary';
			button.title = __cometi18n.ui.save;
			button.innerHTML = '<span class="cico cico-export"></span>';
			div.appendChild( button );*/

			content.innerHTML = inner;


			mod = Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
				header: '<h4>' + __cometi18n.ui.saveTemplate + '</h4>',
				content: content

			});

			form = content.lastChild;

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( form.lastChild ).on( 'click', onsave, { input: form.firstChild, modal: mod } );

		});

	},

	lib: _template_js__WEBPACK_IMPORTED_MODULE_6__["default"]/*function( _n ){

	}*/,

	exit: function( _n ){

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();

			Object(_utils_dialog_js__WEBPACK_IMPORTED_MODULE_1__["default"])({

				message: __cometi18n.messages.warning.exit,

				confirm: function( ev, ui ){

					window.location.replace( __cometdata.dashboard_url );

				}

			});
		} );

	},

}

/* harmony default export */ __webpack_exports__["default"] = (cockpit);


/***/ }),

/***/ "./src/js/editor/actions/sidebar.js":
/*!******************************************!*\
  !*** ./src/js/editor/actions/sidebar.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _notification_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notification.js */ "./src/js/editor/notification.js");
/* harmony import */ var _utils_layout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _utils_sort_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/sort.js */ "./src/js/utils/sort.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../data.js */ "./src/js/editor/data.js");








//import menu from '../menu/events.js';
//import __menu from '../menu/menu.js';


const sidebar = {

	toggle: function( _n ){

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const enabled = 'cpb-active';
			var _tmp, tmp, _p, field, elements, x, _element, search;

			if( !( ( _tmp = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui.parentNode ) ).isNode() ) || !( ( _p = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ( tmp = _tmp.prop() ).parentNode ) ).isNode() ) ){
				return;

			}

			if( _p.hasClass( enabled ) ){
				_p.removeClass( enabled );
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( tmp.getElementsByClassName( 'comet-searchbar' ) ).remove();
				ui.innerHTML = '<span class="cico cico-elements"></span>';

				if( ( elements = document.getElementsByClassName( 'comet-listElement' ) ).length > 0 ){

					for( x in elements ){

						if( !( ( _element = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( elements[x] ) ).isNode() ) ){
							continue;

						}
						_element.prop().style.display = 'block';

					}

				}
				_redefine_js__WEBPACK_IMPORTED_MODULE_7__["default"].workflow();
				return;
			}
			_p.addClass( enabled );
			ui.innerHTML = '<span class="cico cico-x"></span>';

			search = document.createElement( 'input' );
			search.type = 'text';
			search.className = 'comet-searchbar';
			search.placeholder = __cometi18n.ui.sElement;
			tmp.appendChild( search );

			_redefine_js__WEBPACK_IMPORTED_MODULE_7__["default"].workflow();

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( search ).on( 'keyup change', function( ev1, ui1 ){
				ev1.preventDefault();
				const val = _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isString( ui1.value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].trim( ui1.value ) : '';
				const isEmpty = ( val.length < 1 );
				var elements1, _element1, x1, regex, title;

				if( ( elements1 = document.getElementsByClassName( 'comet-listElement' ) ).length < 1 ){
					return;

				}
				regex = new RegExp( val, 'i' );

				for( x1 in elements1 ){

					if( !( ( _element1 = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( elements1[x1] ) ).isNode() ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isStringEmpty( title = _element1.prop().getAttribute( 'aria-label' ) ) ){
						continue;

					}

					if( !isEmpty && title.search( regex ) === -1 ){
						_element1.prop().style.display = 'none';
						continue;

					}
					_element1.prop().style.display = 'inline-block';

				}
			});

		});

	},

	save: function( _n ){

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( _n ).on( 'click', function( ev, ui ){
			ev.preventDefault();
			const disabled = 'cpb-disabled';
			const wait = 'comet-waitWhileIcon';
			var hasChildren = false;
			var id, _ui, dren;

			if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( cometdata.post_id ) ) || !( ( _ui = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui ) ).hasClass( disabled ) ) ){
				return;

			}

			function toggle( state ){
				var c, _child;


				if( state ){
					_ui.addClass( disabled );

				}else{
					_ui.removeClass( disabled );

				}

				if( !hasChildren ){
					return false;

				}

				for( c in dren ){

					if( !( ( _child = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( dren[c] ) ).isNode() ) || !_child.hasClass( 'cico' ) ){
						continue;

					}

					if( !state || ( state && _child.hasClass( wait ) ) ){
						_child.removeClass( wait );
						continue;

					}
					_child.addClass( wait );

				}

			}

			hasChildren = ( ( dren = ui.children ).length > 0 );
			toggle( true );

			ajax({
				action: 'comet_ajAdmin',
				do: 'save',
				data: JSON.stringify({
					id: id,
					meta: _data_js__WEBPACK_IMPORTED_MODULE_8__["default"].getData(),
					content: _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].content(),
					_post: Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( document.getElementById( 'comet-postSettings' ) ).serialize()

				})
			}).done(function( r, a, b ){
				var msg;

				switch( ( r = parseInt( r ) ) ){
					case 0:
					case 400:
					msg = __cometi18n.messages.error.savePost;
					break;
					default:
					msg = __cometi18n.messages.success.savePost;
				}
				Object(_notification_js__WEBPACK_IMPORTED_MODULE_1__["default"])( msg, r );
				toggle( false );

			});

		});

	},

	layout: function( _n ){

		Object(_utils_sort_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
			handle: _n,
			connectWith: '#cpb-content, .cpb-sectionContent, .cpb-rowContent',
			items: '.cpb-row, .cpb-column, .cpb-section',
			placeholder: 'cpb-edPlaceholder',
			cursor: 'cpb-elementCursor',
			containment: '#cpb-content',
			/*start: function( e, ui, current ){
				__menu.close();

			},*/
			stop: function( e, ui, current ){
				const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
				const _ui = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui );
				var sid, rid, cid, columns, _column, sibid, nb, _p, p, r, re, a, w, tmp, position;

				if( !( _p = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui.parentNode ) ).isNode() || !_ui.isNode() || !( p = _p.prop() ) ){
					return;

				}

				function next( items ){
					const closest = _ui.next( items );
					const _closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( closest );
					var t;

					return ( _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last' );

				}
				re = {};

				if( p.id === 'cpb-content' ){
					position = next( '.cpb-section' );
					sid = data_.create( 'sections', 0, position );

					if( sid ){
						tmp = data_.create( 'rows', sid, 'last' );

						if( tmp ){
							tmp = data_.create( 'columns', tmp, 'last' );
						}
						re = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData() ).section( sid );

					}

				}else if( _p.hasClass( 'cpb-rows' ) && ( sid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( p.parentNode, 'id' ) ) && ( sid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( sid ) ) ){
					
					position = next( '.cpb-row' );
					rid = data_.create( 'rows', sid, position );

					if( rid ){
						tmp = data_.create( 'columns', rid, 'last' );
						re = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData() ).row( rid );

					}

				}else if( _p.hasClass( 'cpb-rowContent' ) && ( rid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( p.parentNode, 'id' ) ) && ( rid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( rid ) ) ){
					
					position = next( '.cpb-column' );
					cid = data_.create( 'columns', rid, position );
					columns = _p.children( 'cpb-column' );
					w = 100;
					nb = 1;

					if( columns.length > -1 ){
						nb = columns.length + 1;
						w =  Number( 100 / nb ).toFixed( 2 );

						for( a in columns ){

							if( !( ( _column = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( columns[a] ) ).isNode() ) || !( sibid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _column.prop(), 'id' ) ) || !( sibid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( sibid ) ) ){
								continue;

							}
							data_.set( sibid, 'columns', { wsize: w } );
							Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).column( sibid );

						}
					}
					data_.set( cid, 'columns', { wsize: w } );
					p.dataset.ncol = nb;
					re = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData() ).column( cid );

				}

				if( !re ){
					return;

				}
				ui.parentNode.replaceChild( re, ui );
				//menu();

			}

		});
		
	},

	element: function( _n ){

		Object(_utils_sort_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
			handle: _n,
			connectWith: '.cpb-columnContent',
			items: '.cpb-element',
			placeholder: 'cpb-edSortPlaceholder',
			cursor: 'cpb-elementCursor',
			containment: '#cpb-content',
			/*start: function(){
				__menu.close();

			},*/
			stop: function( e, ui, current ){
				const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
				var _ui, closest, _closest, id, t, pid, defname, position, ret, ch;

				if( !( defname = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( current, 'id' ) ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isStringEmpty( defname ) ){
					return;

				}
				defname = _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].trim( defname );

				if( !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( ui.parentNode.parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) || !data_.get( pid, 'columns' ) ){
					return;

				}
				_ui = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui );
				closest = _ui.next( '.cpb-element' );
				_closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( closest );
				t = _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last';

				if( !( id = data_.create( defname, pid, t ) ) || !( ret = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData() ).element( id ) ) ){
					return;

				}
				ch = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ui.parentNode ).children( 'comet-editorMenuOptions' );
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( ch ).remove();
				ui.parentNode.replaceChild( ret, ui );
				//menu();

			}

		});
		
	}

};

/* harmony default export */ __webpack_exports__["default"] = (sidebar);


/***/ }),

/***/ "./src/js/editor/actions/template.js":
/*!*******************************************!*\
  !*** ./src/js/editor/actions/template.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_load_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/load.js */ "./src/js/utils/load.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _utils_ajax_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data.js */ "./src/js/editor/data.js");








/* harmony default export */ __webpack_exports__["default"] = (function( _node ){

	var tm_modal = false;

	var loaded = [];

	const _d = document;

	const __core = {

		open: function( ev, ui){
			ev.preventDefault();
			const args = {};
			var header, body, temp, inner;

			header = _d.createElement( 'div' );
			header.className = 'comet-searchbox';

			inner = '<select class="comet-ui comet-select">';
			inner += '<option value="cus">' + __cometi18n.ui.mytemplates + '</option>';
			inner += '</select>';

			inner += '<input type="text" class="comet-ui comet-input" placeholder="' + __cometi18n.ui.sTemplate + '"/>';
			header.innerHTML = inner;

			body = _d.createElement( 'div' );
			body.className = 'comet-templates comet-wrapper comet-mytemplates';

			tm_modal = Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
				header: header,
				content: body
			});

			/* cus, pre */
			__core.load( 'cus' );

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( header.firstChild ).on( 'change', __core.switch );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( header.lastChild ).on( 'input', __core.search );

		},

		preview: function( e, ui, edata ){
			e.preventDefault();
			var id, url;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( edata ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( edata.id ) ) ){
				return;

			}
			url = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].addQueryArgs( { id: id }, __cometdata.preview_url );

			Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
				header: '<h4>' + edata.title + ' (' + edata.id + ')</h4>',
				content: '<iframe src="' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].escUrl( url ) + '"></iframe>'
			});

		},

		insert:  function( e, ui, id ){
			e.preventDefault();

			if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( id ) ) ){
				return;

			}

			Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
				id: id,
				meta: 'true',
				do: 'get'

			}).done( function( r ){
				var from = false;
				var data, re, tmp;
				var fa, fb, fc, fd, fe;
				var ids_a, ids_b, ids_c, ids_d, ids_e;
				var a, b, c, d, e;
				var id_a, id_b, id_c, id_d, id_e;

				if( r === '0' || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( tmp = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].json( r ) ) ){
					return false;

				}

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data = tmp['meta'] ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( data._sections ) ){
					return false;

				}

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.sections ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids_a = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( data._sections, 'array' ) ), 1 ) ){
					return false;

				}
				fc = 0;

				for( a in ids_a ){
					id_a = ids_a[a];

					if( !( id_a = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids_a[a] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.sections[id_a] ) ){
						continue;

					}

					if( !( tmp = _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].create( 'sections', '0', 'last', data.sections[id_a] ) ) ){
						continue;

					}

					if( fc === 0 ){
						from = tmp;
						_data_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeIds( tmp, 'sections' );

					}

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( data.sections[id_a]._rows ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids_b = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( data.sections[id_a]._rows, 'array' ) ), 1 ) ){
						continue;

					}

					for( b in ids_b ){

						if( !( id_b = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids_b[b] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.rows[id_b] ) ){
							continue;

						}

						if( !( tmp = _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].create( 'rows', tmp, 'last', data.rows[id_b] ) ) ){
							continue;

						}

						if( fc === 0 ){ 
							_data_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeIds( tmp, 'rows' );

						}

						if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( data.rows[id_b]._columns ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids_c = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( data.rows[id_b]._columns, 'array' ) ), 1 ) ){
							continue;

						}

						for( c in ids_c ){

							if( !( id_c = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids_c[c] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.columns[id_c] ) ){
								continue;

							}

							if( !( tmp = _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].create( 'columns', tmp, 'last', data.columns[id_c] ) ) ){
								continue;

							}

							if( fc === 0 ){ 
								_data_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeIds( tmp, 'columns' );

							}

							if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( data.columns[id_c]._elements ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids_d = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( data.columns[id_c]._elements, 'array' ) ), 1 ) ){
								continue;

							}

							for( d in ids_d ){

								if( !( id_d = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids_d[d] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.elements[id_d] ) ){
									continue;

								}

								if( !( tmp = _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].create( 'elements', tmp, 'last', data.elements[id_d] ) ) ){
									continue;

								}

								if( fc === 0 ){ 
									_data_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeIds( tmp, 'elements' );

								}

								if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( data.elements[id_d]._items ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids_e = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( data.elements[id_d]._items, 'array' ) ), 1 ) ){
									continue;

								}

								for( e in ids_e ){

									if( !( id_e = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids_e[e] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.items[id_e] ) ){
										continue;

									}

									if( !( tmp = _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].create( 'items', tmp, 'last', data.items[id_e] ) ) ){
										continue;

									}

									if( fc === 0 ){ 
										_data_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeIds( tmp, 'items' );

									}
								}
							}
						}
					}
					fc++;

				}
				_utils_load_js__WEBPACK_IMPORTED_MODULE_3__["default"].comet( _data_js__WEBPACK_IMPORTED_MODULE_6__["default"].getData(), from );

			} );

			tm_modal.destroy();

		},

		search: function( ev, ui ){
			const v = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( ui.value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( ui.value ) : '';
			var regex, i;

			if( loaded.length < 1 ){
				return false;

			}
			regex = new RegExp( v, 'i' );

			for( i = 0; i < loaded.length; i++ ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( loaded[i] ) ){
					continue;

				}

				if( v !== '' && loaded[i].title.search( regex ) === -1 ){
					loaded[i].node.style.display = 'none';
					continue;

				}
				loaded[i].node.style.display = 'block';

			}

		},

		switch: function( ev, ui ){
			var set;

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( set = ui.value ) || [ 'pre', 'cus' ].indexOf( set = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( set ) ) < 0 ){
				return;

			}
			__core.load( set );


		},

		load: function( set ){

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( set ) || [ 'cus', 'pre' ].indexOf( set = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( set ) ) < 0 ){
				return false;

			}

			Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
				do: 'templates',
				data: set

			}).done( function( templates ){
				const body = tm_modal.body.firstElementChild;
				const fragment = _d.createDocumentFragment();
				var t, template, id, title, buttonset, inner, scope;

				if( templates === '0' || body === null || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( templates = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].json( templates ) ), 1 ) ){
					return;

				}
				loaded = [];

				for( t = 0; t < templates.length; t++ ){
					template = templates[t];

					if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( template.ID ) ) ){
						continue;

					}
					title = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( template.post_title ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( template.post_title ) : '';

					scope = _d.createElement( 'div' );
					scope.className = 'comet-template comet-scope comet-collection';

					inner = '<figure class="comet-figure">';
					inner += '<span class="comet-id">' + id + '</span>';
					inner += '<div class="comet-inner comet-meta comet-abs comet-buttonset">';
					inner += '<button class="comet-button" title="' + __cometi18n.ui.insert + '" aria-label="' + __cometi18n.ui.insert + '"><span class="cico cico-dir-download"></span></button>';
					inner += '<button class="comet-button" title="' + __cometi18n.ui.preview + '" aria-label="' + __cometi18n.ui.preview + '"><span class="cico cico-eye"></span></button>';
					inner += '</div>';
					inner +='</figure>';
					inner += '<aside class="comet-aside">' + title + '</aside>';

					scope.innerHTML = inner;

					fragment.appendChild( scope );

					loaded[loaded.length] = {
						id: id,
						title: title,
						node: scope
					};

					buttonset = scope.firstChild.lastChild;

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( buttonset.firstChild ).on( 'click', __core.insert, id );
					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( buttonset.lastChild ).on( 'click', __core.preview, { id: id, title: title } );

				}
				body.innerHTML = '';
				body.appendChild( fragment );

			});

		}
	};

	if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _node ).isNode() ){
		return;

	}

	Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _node ).on( 'click', __core.open );

});;

/***/ }),

/***/ "./src/js/editor/contextualize.js":
/*!****************************************!*\
  !*** ./src/js/editor/contextualize.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panel_parts_editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel/parts/editor.js */ "./src/js/editor/panel/parts/editor.js");
/* harmony import */ var _utils_layout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _panel_tabs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panel/tabs.js */ "./src/js/editor/panel/tabs.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _target_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./target.js */ "./src/js/editor/target.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data.js */ "./src/js/editor/data.js");
/* harmony import */ var _panel_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./panel.js */ "./src/js/editor/panel.js");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./id.js */ "./src/js/editor/id.js");








//import init from './panel/init.js';




/* harmony default export */ __webpack_exports__["default"] = (function(){

    "use strict";

    const _d = document;

    const _w = window;

    const types = [ 'element', 'column', 'row', 'section' ];

    const roles = [ 'edit', 'move', 'dup', 'del' ];

    const classes = {
        menu: 'comet-contextmenu',
        section: 'cpb-section',
        row: 'cpb-row',
        column: 'cpb-column',
        element: 'cpb-element',

    };

    const __core = {

        getPosition: function( e ){

            var posx = 0;
            var posy = 0;

            if( !e ){
                e = _w.event;

            }

            if( e.pageX || e.pageY ){
                posx = e.pageX;
                posy = e.pageY;

            }else if( e.clientX || e.clientY ){
                posx = e.clientX + _d.body.scrollLeft + _d.documentElement.scrollLeft;
                posy = e.clientY + _d.body.scrollTop + _d.documentElement.scrollTop;

            }

            return {
                x: posx,
                y: posy
            }

        },

        getTarget: function( target ){
            const _target = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( target );

            if( !_target.isNode() ){
                return false;

            }

            if( _target.hasClass( classes.element ) ){
                return {
                    target: target,
                    type: 'element',

                };

            }

            if( _target.hasClass( classes.column ) ){
                return {
                    target: target,
                    type: 'column',

                };

            }

            if( _target.hasClass( classes.row ) ){
                return {
                    target: target,
                    type: 'row',

                };

            }

            if( _target.hasClass( classes.section ) ){
                return {
                    target: target,
                    type: 'section',

                };

            }
            return __core.getTarget( target.parentNode );

        },

        getParent: function( target, className ){
            const _target = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( target );

            return ( _target.isNode() ? ( _target.hasClass( className ) ? target : __core.getParent( target.parentNode, className ) ) : false );

        },

        preventType: function( type, checkType ){
            var _types;

            if( types.indexOf( checkType ) < 0 ){
                return true;

            }

            switch( type ){
                case 'section':
                _types = [ 'row', 'column', 'element' ];
                break;

                case 'row':
                _types = [ 'column', 'element' ];
                break;

                case 'column':
                _types = [ 'element' ];
                break;

                case 'element':
                _types = [];
                break;

                default:
                _types = types;

            }

            return ( _types.indexOf( checkType ) > -1 );

        },

    };

    const __menu = {


        isMenu: function( target ){

            return ( !__core.getParent( target, classes.menu ) ? false : true );

        },

        create: function( ev, ui ){
            var fragment, menuNode, target;

            if( !__menu.isMenu( ev.target ) ){
                __menu.destroy();

            }

            if( ev.type === 'click' || !( target = __core.getTarget( ev.target ) ) ){
                return;

            }
            ev.preventDefault();
            menuNode = _d.createElement( 'div' );
            fragment = _d.createDocumentFragment();
            fragment.appendChild( menuNode );

            menuNode.className = classes.menu;

            __menu.setPosition( ev, menuNode );
            __menu.setOptions( target.type, target.target, menuNode );

            _d.body.appendChild( fragment );

        },

        setOptions: function( type, target, menu ){
            const options = __cometi18n.options;
            var body, option, _option, item;

            if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( options ) || types.indexOf( type ) < 0 ){
                menu.innerHTML = __cometi18n.messages.error.noMenu;
                return;

            }

            function create_button( role, _type, name ){
                var button = _d.createElement( 'button' );
                button.className = 'comet-item';
                button.innerHTML = name;
                button.dataset.role = role;

                if( role === 'move' ){
                    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( button ).sort( __menu.onsort( target, _type ) );

                }else{
                    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( button ).on( 'click', __menu.onclick, { role: role, type: _type, target: target, targetType: type } );

                }
                return button;

            }

            for( option in options ){

                if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( item = options[option] ) || types.indexOf( option ) < 0 || __core.preventType( type, option ) ){
                    continue;

                }
                _option = _d.createElement( 'div' );
                _option.className = 'comet-option'; 
                _option.innerHTML = '<span>' + item.title + '</span><div class="comet-items"></div>';
                body = _option.lastChild;

                if( 'edit' in item ){
                    body.appendChild( create_button( 'edit', option, item.edit ) );

                }

                if( 'move' in item ){
                    body.appendChild( create_button( 'move', option, item.move ) );

                }

                if( 'dup' in item ){
                    body.appendChild( create_button( 'dup', option, item.dup ) );

                }

                if( 'del' in item ){
                    body.appendChild( create_button( 'del', option, item.del ) );

                }

                menu.appendChild( _option );

            }

        },

        destroy: function(){
            Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( '.' + classes.menu ).remove();

        },

        setPosition: function( e, menu ){

            var clickCoords = __core.getPosition(e);
            var clickCoordsX = clickCoords.x;
            var clickCoordsY = clickCoords.y;

            var menuWidth = menu.offsetWidth + 4;
            var menuHeight = menu.offsetHeight + 4;

            var windowWidth = _w.innerWidth;
            var windowHeight = _w.innerHeight;

            if( ( windowWidth - clickCoordsX ) < menuWidth ){
                menu.style.left = windowWidth - menuWidth + "px";

            }else{
                menu.style.left = clickCoordsX + "px";
            }

            if( ( windowHeight - clickCoordsY ) < menuHeight ){
                menu.style.top = windowHeight - menuHeight + "px";

            }else{
                menu.style.top = clickCoordsY + "px";

            }

        },

        onclick: function( ev, ui, e ){
            ev.preventDefault();

            var get;

            const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])();

            const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_7__["default"])();

            const priv = {

                section: function(){
                    const type = 'sections';
                    const targetNode = __core.getParent( e.target, 'cpb-section' );
                    var id, nid, sdata;

                    if( !targetNode || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( targetNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        sdata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSettingsFrom( 'section' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.section.edit,
                            tabs: Object(_panel_tabs_js__WEBPACK_IMPORTED_MODULE_4__["default"])( sdata, data_.get( id, type ) )

                        };

                        case 'del':

                        data_.remove( id, type );
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( nid = data_.clone( id, type ) ) || !( ret = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_1__["default"])( data_.getData() ).section( nid ) ) ){
                            return false;

                        }
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).after( ret );
                        return true;

                        default:
                        return false;

                    }

                },

                row: function(){
                    const type = 'rows';
                    const targetNode = __core.getParent( e.target, 'cpb-row' );
                    var id, parentNode, pid, nid, rdata;

                    if( !targetNode || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( targetNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        rdata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSettingsFrom( 'row' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.row.edit,
                            tabs: Object(_panel_tabs_js__WEBPACK_IMPORTED_MODULE_4__["default"])( rdata, data_.get( id, type ) )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-section' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }
                        data_.remove( id, type, pid );
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-section' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_1__["default"])( data_.getData() ).row( nid ) ) ){
                            return false;

                        }
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).after( ret );
                        return true;

                        default:
                        return false;

                    }

                },

                column: function(){
                    const type = 'columns';
                    const targetNode = __core.getParent( e.target, 'cpb-column' );
                    var id, parentNode, pid, nid, cdata;

                    if( !targetNode || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( targetNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        cdata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSettingsFrom( 'column' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.column.edit,
                            tabs: Object(_panel_tabs_js__WEBPACK_IMPORTED_MODULE_4__["default"])( cdata, data_.get( id, type ) )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-row' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }
                        parentNode = targetNode.parentNode;
                        data_.remove( id, type, pid );
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).remove();
                        _redefine_js__WEBPACK_IMPORTED_MODULE_5__["default"].columns( parentNode );
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-row' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_1__["default"])( data_.getData() ).column( nid ) ) ){
                            return false;

                        }
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).after( ret );
                        _redefine_js__WEBPACK_IMPORTED_MODULE_5__["default"].columns( targetNode.parentNode );
                        return true;

                        default:
                        return false;

                    }

                },

                element: function(){
                    const type = 'elements';
                    const targetNode = __core.getParent( e.target, 'cpb-element' );
                    var id, parentNode, pid, nid, _type, tmp, x, dren, _child, edata;

                    if( !targetNode || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( targetNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( tmp = data_.get( id, type ) ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( _type = tmp._type ) ){
                            return false;

                        }

                        if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( edata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getElement( _type ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( edata.tabs ) ){
                            return false;

                        }

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.element.edit,
                            tabs: Object(_panel_tabs_js__WEBPACK_IMPORTED_MODULE_4__["default"])( edata.tabs, tmp )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-column' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }
                        data_.remove( id, type, pid );
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-column' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( parentNode, 'id' ) ) || !( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_1__["default"])( data_.getData() ).element( nid ) ) ){
                            return false;

                        }
                        Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).after( ret );
                        return true;

                        default:
                        return false;

                    }

                }

            };

            if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction( priv[e.type] ) || roles.indexOf( e.role ) < 0 ){
                __menu.destroy();
                return;

            }

            if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( get = priv[e.type]() ) || !( 'tabs' in get ) || !( 'title' in  get ) ){
                __menu.destroy();
                return;

            }

            Object(_panel_js__WEBPACK_IMPORTED_MODULE_9__["default"])({
                id: false,
                title: get.title,
                content: 'content' in get.tabs ? get.tabs.content : '',
                tabs: 'tabs' in get.tabs ? get.tabs.tabs : '',
                close: {
                    inner: '<span class="cico cico-x"></span>',
                    title: __cometi18n.ui.close,
                    do: function( e, ui ){
                        target_.reset();
                        Object(_panel_parts_editor_js__WEBPACK_IMPORTED_MODULE_0__["default"])( true );
                    }
                }

            });

        },

        onsort: function( targetNode, type ){

            const priv = {

                section: {
                    //handle: '.comet-mcItemMoveSection',
                    connectWith : '#cpb-content',
                    items: '.cpb-section',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function( e, ui ){
                        const sectionNode = __core.getParent( targetNode, classes.section );
                        var id;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( sectionNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( sectionNode, 'id' ) ) || !_utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        sectionNode.style.visibility = 'hidden';
                        return sectionNode;

                    },
                    stop: function( e, ui, sectionNode ){
                        const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
                        var id, t, _closest, closest;

                        sectionNode.removeAttribute( 'style' );

                        if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( sectionNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                            return;

                        }
                        t = 'last';
                        closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( ui ).next( '.cpb-section' );
                        _closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( closest );
                        t = _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last';

                        id_.remove( id, 'sections', id );
                        id_.insert( id, 'sections', id, t );
                        ui.parentNode.replaceChild( sectionNode , ui );

                    }
                },

                row: {
                    handle: '.comet-mcItemMoveRow',
                    connectWith : '.cpb-rows',
                    items: '.cpb-row',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function( e, ui ){
                        const rowNode = __core.getParent( targetNode, classes.row );
                        var id;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( rowNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( rowNode, 'id' ) ) || !_utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        rowNode.style.visibility = 'hidden';
                        return rowNode;

                    },
                    stop: function( e, ui, rowNode ){
                        const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
                        var id, sid, nsid, t, closest, _closest;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( rowNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( rowNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                            return;

                        }
                        if( !( sid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( __core.getParent( rowNode, classes.section ), 'id' ) ) || !( sid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( sid ) ) ){
                            return;

                        }

                        if( !( nsid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( __core.getParent( ui, classes.section ), 'id' ) ) || !( nsid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( nsid ) ) ){
                            return;

                        }
                        closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( ui ).next( '.cpb-row' );
                        _closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( closest );
                        t = _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last';

                        rowNode.removeAttribute( 'style' );
                        id_.remove( id, 'rows', sid );
                        id_.insert( id, 'rows', nsid, t );
                        ui.parentNode.replaceChild( rowNode , ui );

                    }

                },

                column: {
                    //handle: '.comet-mcItemMoveColumn',
                    connectWith : '.cpb-rowContent',
                    items: '.cpb-column',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function( e, ui ){
                        const columnNode = __core.getParent( targetNode, classes.column );
                        var id;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( columnNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( columnNode, 'id' ) ) || !( _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                            return;

                        }
                        __menu.destroy();
                        columnNode.style.visibility = 'hidden';
                        return columnNode;

                    },
                    stop: function( e, ui, columnNode ){
                        const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
                        var containerNode, uiContainerNode, id, rid, nrid, t, closest, _closest;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( columnNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( columnNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                            return;

                        }

                        if( ( containerNode = columnNode.parentNode ) === null || !( rid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( containerNode.parentNode, 'id' ) ) || !( rid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( rid ) ) ){
                            return;

                        }

                        if( !Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])().get( rid, 'rows' ) || ( uiContainerNode = ui.parentNode ) === null || !( nrid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( uiContainerNode.parentNode, 'id' ) ) || !( nrid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( nrid ) ) ){
                            return;

                        }
                        closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( ui ).next( '.cpb-column' );
                        _closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( closest );
                        t = _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last';

                        columnNode.removeAttribute( 'style' );
                        id_.remove( id, 'columns', rid );
                        id_.insert( id, 'columns', nrid, t );
                        uiContainerNode.replaceChild( columnNode , ui );

                        if( rid !== nrid ){
                            _redefine_js__WEBPACK_IMPORTED_MODULE_5__["default"].columns( containerNode );
                            _redefine_js__WEBPACK_IMPORTED_MODULE_5__["default"].columns( uiContainerNode );

                        }
                    }

                },

                element: {
                    //handle: '.comet-mcItemMoveElement',
                    connectWith : '.cpb-columnContent',
                    items: '.cpb-element',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function( e, ui ){
                        const elementNode = __core.getParent( targetNode, classes.element );
                        var id;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( elementNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( elementNode, 'id' ) ) || !_utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        elementNode.style.visibility = 'hidden';
                        return elementNode;

                    },
                    stop: function( e, ui, elementNode ){
                        const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
                        var id, cid, ncid, t, p, closest;

                        if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( elementNode ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( elementNode, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ){
                            return;

                        }

                        if( !( cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( __core.getParent( elementNode, classes.column ), 'id' ) ) || !( cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( cid ) ) ){
                            return;

                        }

                        if( !Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])().get( cid, 'columns' ) || !( ncid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( __core.getParent( ui, classes.column ), 'id' ) ) || !( ncid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( ncid ) ) ){
                            return;

                        }
                        closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( ui ).next( '.cpb-element' );
                        _closest = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( closest );
                        t = _closest.isNode() && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( _closest.prop(), 'id' ) ) && ( t = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( t ) ) ? t : 'last';

                        elementNode.removeAttribute( 'style' );
                        id_.remove( id, 'elements', cid );
                        id_.insert( id, 'elements', ncid, t );
                        ui.parentNode.replaceChild( elementNode , ui );

                    }


                }

            };

            return ( type in priv ? priv[type] : {} );

        }


    };

    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( _d.documentElement ).on( 'contextmenu click', __menu.create );
    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( _w ).on( 'resize', __menu.destroy );

});

/***/ }),

/***/ "./src/js/editor/data.js":
/*!*******************************!*\
  !*** ./src/js/editor/data.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global.js */ "./src/js/utils/global.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _target_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./target.js */ "./src/js/editor/target.js");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./id.js */ "./src/js/editor/id.js");







/* harmony default export */ __webpack_exports__["default"] = (function (){
	const prop = {};
	const global_ = Object(_utils_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
	const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_4__["default"])();

	prop.getData = function(){
		var data = global_.get( 'data' );
		return ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ? data : prop.set( {} ) );

	};

	prop.setData = function( data ){

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ){
			return false;

		}
		return global_.set( 'data', data );

	};

	prop.hasType = function( type ){
		const metaData = prop.getData();

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData ) || !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].type( type ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type] ) ){
			return false;

		}
		return type;

	};

	prop.hasId = function( type, id ){
		const metaData = prop.getData();

		if( !( type = this.hasType( type ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !( id in metaData[type] ) ){
			return false;

		}
		return id;

	};

	prop.getParent = function( type ){
		type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].type( type );

		switch( type ){
			case 'rows':
			case 'sections':
			return 'sections';
			case 'columns':
			return 'rows';
			break;
			case 'elements':
			return 'columns';
			break;
			case 'items':
			return 'elements';
			default:
			return false;
		}

	};

	prop.getChild = function( type ){
		type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].type( type );

		switch( type ){
			case 'sections':
			return 'rows';
			case 'rows':
			return 'columns';
			case 'columns':
			return 'elements';
			break;
			case 'elements':
			return 'items';
			break;
			default:
			return false;
		}

	};

	prop.create = function( type, pid, index, dd ){
		const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
		var metaData = prop.getData();
		var data, id, st;

		if( ( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( pid ) ) === false || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( type ) ){
			return false;

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( dd ) ){
			dd = {};

		}

		switch( type ){

			case 'sections':
			//data = utils.getSettingsFrom( 'section' );
			//break;

			case 'rows':
			//data = utils.getSettingsFrom( 'row' );
			//break;

			case 'columns':
			//data = utils.getSettingsFrom( 'column' );
			break;

			case 'items':

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData.elements ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData.elements[pid] ) ){
				return false;

			}

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( st = metaData.elements[pid]._type ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( st = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getElement( st ) ) ){
				return false;

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( st.tabs ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( st.tabs.items ) ){
				return false;

			}
			//data = st.tabs.items;
			break;

			default:

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getElement( type ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data.tabs ) ){
				return false;

			}
			dd._type = type;
			//data = data.tabs;
			type = 'elements';
			break;

		}

		if( !( id = id_.create( type ) ) || !id_.insert( id, type, pid, index ) ){
			return false;

		}
		metaData = prop.getData();

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type] ) ){
			metaData[type] = {};

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}
		metaData[type][id] = dd;
		this.setData( metaData );
		return id;

	};

	prop.insert = function( id, type, data ){
		var metaData = prop.getData();

		if( !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].type( type ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) ){
			return false;

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData ) ){
			metaData = {};

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type] ) ){
			metaData[type] = {};

		}

		if( !( id in metaData[type] ) ){
			metaData[type][id] = {};

		}
		metaData[type][id] = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend( {}, data );
		this.setData( metaData );
		return metaData[type][id];

	};

	prop.set = function( id, type, data ){
		var metaData = prop.getData();
		var a;

		if( !( type = this.hasType( type ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ){
			return false;

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}

		for( a in data ){
			metaData[type][id][a] = data[a];

		}
		this.setData( metaData );
		return metaData[type][id];

	};

	prop.get = function( id, type ){
		const metaData = prop.getData();

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !( type = this.hasType( type ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
			return false;

		}
		return metaData[type][id];

	};

	prop.remove = function( id, type, pid ){
		const metaData = prop.getData();
		const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_5__["default"])();

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !( type = prop.hasType( type ) ) || !( id in metaData[type] ) ){
			return false;

		}

		function removeChildren(){
			const children = prop.getChild( type );
			var ids, _children, cid, a;

			if( children || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[children] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
				return;

			}

			if( !( ( _children = '_' + children ) in metaData[type][id] ) ){
				return;

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( ids = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].ids( metaData[type][id][_children], 'array' ) ), 1 ) ){
				return;

			}
			for( a in ids ){

				if( !( cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( ids[a] ) ) || !( cid in metaData[children] ) ){
					continue;

				}
				prop.remove( cid, children );
				delete metaData[children][cid];

			}

		}
		removeChildren();
		id_.remove( id, type, pid );

		/*if( type === 'sections' &&  '_sections' in metaData ){
			this.remove( id, 'sections' );
			
		}*/
		delete metaData[type][id];
		prop.setData( metaData );
		return true;

	};

	prop.removeIds = function( id, type ){
		const metaData = prop.getData();
		var children, _children;

		if( !( id = this.hasId( type, id ) ) || !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].type( type ) ) || !( children = this.getChild( type ) ) ){
			return false;

		}
		_children = '_' + children;
		metaData[type][id][_children] = '';
		this.setData( metaData );
		return true;

	};

	prop.clone = function( id, type, pid ){
		const metaData = prop.getData();
		const id_ = Object(_id_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
		var tmp = {};
		var children, _children, cid, ids, a, nid, nnid, r, n;

		pid = pid && ( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( pid ) ) ? pid : 0;

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !( type = this.hasType( type ) ) || !( id in metaData[type] ) ){
			return false;

		}

		if( !( nid = id_.create( type ) ) || !id_.insert( nid, type, pid, 'last' ) ){
			return false;

		}

		if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
			tmp = metaData[type][id];

		}

		if( !this.insert( nid, type, tmp ) ){
			return false;

		}


		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) || !( children = this.hasType( this.getChild( type ) ) ) ){
			return nid;

		}
		_children = '_' + children;
		
		if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( metaData[type][id][_children] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ids = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].ids( metaData[type][id][_children], 'array' ), 1 ) ){
			return nid;

		}

		for( i in ids ){

			if( !( cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( ids[i] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[children][cid] ) || !( nnid = this.clone( cid, children ) ) ){
				continue;

			}
			ids[i] = nnid;
			metaData[type][nid][_children] = ids.join( ',' );

		}
		this.setData( metaData );
		return nid;

	};

	prop.catchAndSet = function( id, type ){
		const metaData = prop.getData();
		const fields = document.getElementsByClassName( 'comet-field' );
		const data = {};
		var tmp, f, fid, ftype, _field, field, val;

		if( ( tmp = target_.item() ) && ( tmp = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( tmp ) ) && target_.state() === 'items' && type === 'elements' ){
			type = 'items';
			id = tmp;

		}

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) || !( type = this.hasType( type ) ) || fields.length < 1 ){
			return false;

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}

		for( f in fields ){

			if( !( ( _field = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( fields[f] ) ).isNode() ) || !( ftype = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].dataset( ( field = _field.prop() ), 'type' ) ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( fid = field.name ) ){
				continue;

			}
			fid = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( fid );
			val = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNumber( val = field.value ) && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( val ) ? '' : val.toString();

			switch( ftype ){
				case 'radio':

				if( field.checked ){
					data[fid] = val;

				}

				break;
				case 'checkbox':

				if( !field.checked ){
					val = 'false';

				}
				data[fid] = val;

				break;
				default:
				data[fid] = val;
				

			}

		}
		return this.set( id, type, data );

	};

	return prop;

});;


/***/ }),

/***/ "./src/js/editor/editor.js":
/*!*********************************!*\
  !*** ./src/js/editor/editor.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contextualize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contextualize.js */ "./src/js/editor/contextualize.js");
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/global.js */ "./src/js/utils/global.js");
/* harmony import */ var _utils_dialog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/dialog.js */ "./src/js/utils/dialog.js");
/* harmony import */ var _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/cockpit.js */ "./src/js/editor/actions/cockpit.js");
/* harmony import */ var _actions_sidebar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/sidebar.js */ "./src/js/editor/actions/sidebar.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _post_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post.js */ "./src/js/editor/post.js");
/* harmony import */ var _utils_ajax_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _utils_load_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/load.js */ "./src/js/utils/load.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data.js */ "./src/js/editor/data.js");
/* Comet - Copyright (c) 2019 Blacklead */
/* Last edit: Jan, 25 2019 */











//import menu from './menu/events.js';





(function( cometEditor ) {

  cometEditor( window, document);

}(function( _win, _doc ){

  'use strict';

  const g_ = Object(_utils_global_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const editor = _doc.getElementById( 'comet-editor' );
  const settings = _doc.getElementById( 'comet-generalSettings' );

  var post = {};
  var metaData = {};
  var get, id1, id2;

  const eb = {

    preload: function(){
      const preload = _doc.getElementById( 'comet-preloader' );
      var op = 1;
      var int = setInterval( function(){

        if( op <= 0 ){
          preload.parentNode.removeChild( preload );
          clearInterval( int );
          return;

        }
        op = Number( op - 0.1 ).toFixed( 1 );
        preload.style.opacity = op;

      }, 50 );

    },

    sidebar: function(){
      const elements = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].getElements();
      const sidebar = _doc.createElement( 'div' );
      const footer = _doc.createElement( 'div' );
      var tmp, e, element, inner;

      sidebar.id = 'comet-editorSidebar';
      sidebar.className = 'comet-sidebar';


      if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( elements ) ){

        const header = _doc.createElement( 'div' );
        header.className = 'comet-header';
        sidebar.appendChild( header );

        const sToggler = _doc.createElement( 'button' );
        sToggler.className = 'comet-btoggle';
        sToggler.setAttribute( 'aria-label', __cometi18n.ui.elements );
        sToggler.innerHTML = '<span class="cico cico-elements"></span>';
        header.appendChild( sToggler );
        _actions_sidebar_js__WEBPACK_IMPORTED_MODULE_5__["default"].toggle( sToggler );


        const sElements = _doc.createElement( 'div' );
        sElements.className = 'comet-listElements';
        sidebar.appendChild( sElements );

        tmp = _doc.createElement( 'button' );
        tmp.className = 'comet-listElement';
        tmp.setAttribute( 'aria-label', __cometi18n.ui.layout );
        tmp.innerHTML = '<span class="cico cico-layout"></span><span class="comet-uiTitle">' + __cometi18n.ui.layout + '</span>';
        sElements.appendChild( tmp );
        _actions_sidebar_js__WEBPACK_IMPORTED_MODULE_5__["default"].layout( tmp );

        for( e in elements ){

          if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( element = elements[e] ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( element.name ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( e ) ){
            continue;

          }

          tmp = _doc.createElement( 'button' );
          tmp.id = 'comet-listElement' + ( e = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( e ) );
          tmp.className = 'comet-listElement';
          tmp.setAttribute( 'aria-label', ( element.name = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( element.name ) ) );
          tmp.setAttribute( 'data-id', e );

          inner = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( element.icon ) ? '<span class="cico ' + element.icon + '"></span>' : '';
          inner += '<span class="comet-uiTitle">' + element.name + '</span>';
          tmp.innerHTML = inner;
          sElements.appendChild( tmp );
          _actions_sidebar_js__WEBPACK_IMPORTED_MODULE_5__["default"].element( tmp );

        }

      }
      footer.className = 'comet-footer comet-buttonset';
      sidebar.appendChild( footer );

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-save';
      tmp.innerHTML = '<span class="cico cico-update"></span><span class="comet-uiTitle">' + __cometi18n.ui.save + '</span>';
      footer.appendChild( tmp );
      _actions_sidebar_js__WEBPACK_IMPORTED_MODULE_5__["default"].save( tmp );

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-btoggle';
      tmp.innerHTML = '<span class="cico cico-more"></span><span class="comet-uiTitle">' + __cometi18n.cockpit.title + '</span>';
      footer.appendChild( tmp );
      _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"].toggle( tmp );

      editor.appendChild( sidebar );

      return g_.set( 'sidebar', sidebar, true );

    },

    cockpit: function(){
      const cockpit = _doc.createElement( 'div' );
      const inner = _doc.createElement( 'div' );
      const header = _doc.createElement( 'div' );
      const notes = _doc.createElement( 'div' );
      const footer = _doc.createElement( 'div' );
      const buttons = {
        settings: 'cico-cog',
        save: 'cico-dir-upload',
        lib: 'cico-directory',
        exit: 'cico-power',
      };
      var tmp, b, tmp1;

      cockpit.id = 'comet-cockpit';
      cockpit.className = 'comet-cockpit comet-fixfull';

      inner.className = 'comet-inner';
      cockpit.appendChild( inner );

      header.className = 'comet-header';
      inner.appendChild( header );

      header.innerHTML = '<h4>' + __cometi18n.cockpit.title + '</h4>';


      notes.id = 'comet-notifications';
      notes.className = 'comet-notifications';
      inner.appendChild( notes );

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-button comet-eventToggle';
      tmp.name = 'to_cockpit';
      tmp.setAttribute( 'aria-label', __cometi18n.ui.close );
      tmp.innerHTML = '<span class="cico cico-x"></span>';
      _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"].toggle( tmp );
      header.appendChild( tmp );

      tmp1 = _doc.createElement( 'p' );
      header.appendChild( tmp1 );

      tmp = _doc.createElement( 'button' );
      tmp.id = 'comet-clearNotifications';
      tmp.innerHTML = __cometi18n.cockpit.clearNx;
      tmp1.appendChild( tmp );

      Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_10__["default"])( tmp ).on( 'click', function( ev, ui ){
        ev.preventDefault();
        notes.innerHTML = '';
        
      });

      footer.className = 'comet-footer';
      inner.appendChild( footer );

      for( b in buttons ){

        if( !( b in __cometi18n.cockpit.options ) ){
          continue;

        }
        tmp = _doc.createElement( 'button' );
        tmp.className = 'comet-button comet-cockpitButton';
        tmp.setAttribute( 'aria-label', __cometi18n.cockpit.options[b] );
        tmp.innerHTML = '<span class="cico ' + buttons[b] + '"></span>';
        footer.appendChild( tmp );

        if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction( _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"][b] ) ){
          _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"][b]( tmp );

        }

      }

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-sideToggleButton comet-eventToggle';
      tmp.name = 'to_cockpit';
      _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"].toggle( tmp );
      cockpit.appendChild( tmp );

      editor.appendChild( cockpit );

      return g_.set( 'cockpit', cockpit, true );


    },

    frame: function(){
      const frame = _doc.createElement( 'div' );

      frame.id = 'cpb-content';
      frame.className = 'cpb cpb-editArea cpb-backendMode';
      frame.style.width = 'calc( 100% - 50px )';
      frame.style.left = '50px';
      editor.appendChild( frame );

      return g_.set( 'frame', frame, true );

    },

    post: function( content ){
      var tmp, tmpe, items, elements, i, x;

      if( !( tmp = data_.create( 'sections', 0, 'last' ) ) ){
        return false;

      }

      if( !( tmp = data_.create( 'rows', tmp, 'last' ) ) ){
        return false;

      }

      if( !( tmp = data_.create( 'columns', tmp, 'last' ) ) ){
        return false;

      }

      if( !( elements = Object(_post_js__WEBPACK_IMPORTED_MODULE_8__["default"])( content ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isArray( elements, 1) ){
        return false;

      }

      for( i = 0; i < elements.length; i++ ){

        if( !( '_type' in elements[i] ) ){
          continue;

        }
        items = false;

        if( '_items' in elements[i] ){
          items = elements[i]._items;
          delete elements[i]._items;

        }
        tmpe = data_.create( elements[i]._type, tmp, 'last', elements[i] );

        if( !tmpe || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isArray( items, 1 ) ){
          continue;

        }

        for( x = 0; x < items.length; x++ ){
          data_.create( 'items', tmpe, 'last', items[x] );

        }

      }
      return true;

    }

  };

  window.Comet = Comet || {};

  if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_10__["default"])( editor ).isNode() || !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_10__["default"])( settings ).isNode() ){
    alert( __cometi18n.messages.error.failed );
    return false;

  }

  if( !( get = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].getParameters() ) || !( 'post' in get ) || !( 'action' in get ) || !( 'comet' in get ) ){
    alert( __cometi18n.messages.error.failed );
    return false;

  }

  if( get.action !== 'edit' || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( __cometdata ) || !( 'post_id' in __cometdata ) ){
    alert( __cometi18n.messages.error.failed );
    return false;

  }

  if( !( id1 = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].id( get.post ) ) || !( id2 = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].id( __cometdata.post_id ) ) || id1 !== id2 ){
    alert( __cometi18n.messages.error.failed );
    return false;

  }

  Object(_utils_ajax_js__WEBPACK_IMPORTED_MODULE_9__["default"])( {
    do: 'data',
    id: __cometdata.post_id,
    public: false,

  } ).done(function( response ){
    const _default = [ 'post', 'settings', 'lib', 'svgSets' ];
    const data = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].json( response );
    var n = 0;
    var i, slug;

    if( !data || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( data ) ){
      alert( __cometi18n.messages.error.failed );
      throw new Error( __cometi18n.messages.error.failed );

    }

    for( i in _default ){

      if( !( ( slug = _default[i] ) in data ) ){
        continue;

      }
      g_.set( slug, data[slug], true );
      n++;

    }

    if( n < 4 ){
      alert( __cometi18n.messages.error.failed );
      throw new Error( __cometi18n.messages.error.failed );

    }
    post = g_.get( 'post' );
    metaData = data_.setData( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( post ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( post.meta ) ? post.meta : {} );

    window.onbeforeunload = function(){
      return __cometi18n.messages.warning.exit;

    };

    g_.set( 'editor', editor, true );
    g_.set( 'generalSettings', settings, true );

    eb.frame();
    eb.cockpit();

    if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( metaData._sections ) ){
      eb.post( post.post_content );
      
    }
    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_10__["default"])( _doc.body ).addClass( 'comet-globalLevel' );
    _utils_load_js__WEBPACK_IMPORTED_MODULE_11__["default"].comet( data_.getData(), null, true );
    _actions_cockpit_js__WEBPACK_IMPORTED_MODULE_4__["default"].settings( '#comet-closeGeneralSettings' );
    //menu();
    eb.sidebar();
    eb.preload();
    Object(_contextualize_js__WEBPACK_IMPORTED_MODULE_0__["default"])();


  });

}));

/***/ }),

/***/ "./src/js/editor/id.js":
/*!*****************************!*\
  !*** ./src/js/editor/id.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.js */ "./src/js/editor/data.js");




/* harmony default export */ __webpack_exports__["default"] = (function (){
	const prop = {};
	const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

	prop.create = function( type ){
		const metaData = data_.getData();
		var max = 0;

		if( !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].type( type ) ) ){
			return false;

		}

		if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( metaData[type] ) ){
			metaData[type] = {};

		}
		max = !( max = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( metaData[type]._max ) ) || max < 0 ? 0 : max;
		max = max + 1;

		metaData[type]._max = max;
		metaData[type][max] = {};
		data_.setData( metaData );

		return max;

	};

	prop.insert = function( id, type, catId, index ){
		const metaData = data_.getData();
		var _in, cat, ids, r;

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( id ) ) || ( catId = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( catId ) ) === false || !( type = data_.hasType( type ) ) ){
			return false;

		}

		if( !( id in metaData[type] ) || !( cat = data_.getParent( type ) ) ){
			return false;

		}

		function injectId( str, tid, position ){
			var tp, a, b;

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( str ) ){
				return tid.toString();

			}

			if( position === 'last' ){
				if( str.substring( -1, 1 ) !== ',' ){
					str += ',';

				}
				str += tid.toString();

			}else if( position === 'first' ){

				if( str.substring( 0, 1 ) !== ',' ){
					str = ',' + str;

				}
				str = tid.toString() + str;

			}else if( ( position = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( position ) ) !== false && ( tp = str.indexOf( position, 0 ) ) > -1 ){
				b = str.slice( 0, tp );
				a = str.slice( tp );
				str = b + id.toString() + ',' + a;

			}
			return str;

		}
		_in = '_' + type;

		if( type === 'sections' ){
			r = injectId( ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( ids = metaData[_in] ) ? ids : '' ), id, index );

			if( r !== ids ){
				metaData[_in] = r;
				data_.setData( metaData );
				return true;

			}

		}else if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( metaData[cat] ) ){

			if( !( catId in metaData[cat] ) ){
				return false;

			}

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( metaData[cat][catId] ) ){
				metaData[cat][catId] = {};

			}
			r = injectId( ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( ids = metaData[cat][catId][_in] ) ? ids : '' ), id, index );

			if( r !== ids ){
				metaData[cat][catId][_in] = r;
				data_.setData( metaData );
				return true;

			}
		}
		return false;

	};

	prop.remove = function( id, type, pid ){
		const metaData = data_.getData();
		var _in, parent, tmp; 

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( id ) ) || !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].type( type ) ) ){
			return false;

		}

		function remove( _id, str ){
			const nids = [];
			var a = 0;
			var cid, ids, a;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( ( ids = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].ids( str, 'array' ) ), 1 ) ){
				return false;

			}

			for( a; a < ids.length; a++ ){

				if( !( cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( ids[a] ) ) || cid === _id  ){
					continue;

				}
				nids[nids.length] = cid;

			}
			return nids.join( ',' );

		}
		parent = data_.getParent( type );
		_in = '_' + type;

		if( type === 'sections' && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( metaData[_in] ) ){

			if( !( tmp = remove( id, _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( metaData[_in], ',' ) ) ) ){
				return false;

			}
			metaData[_in] = tmp;
			data_.setData( metaData );
			return true;

		}else if( ( pid = data_.hasId( parent, pid ) ) && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( metaData[parent][pid][_in] ) ){

			if( !( tmp = remove( id, _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( metaData[parent][pid][_in], ',' ) ) ) ){
				return false;

			}
			metaData[parent][pid][_in] = tmp;
			data_.setData( metaData );
			return true;

		}
		return false;

	};

	prop.replace = function( id, nid, type, pid ){
		const metaData = data_.getData();
		var _in, parent, str;

		if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( id ) ) || !( nid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( nid ) ) || ( pid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( pid ) ) === false || !( type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].type( type ) ) ){
			return false;

		}
		parent = data_.getParent( type );
		_in = '_' + type;

		if( type === 'sections' ){
			str = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( metaData[_in] ) ? metaData[_in] : '';
			str = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( str, ',' ) ).replace( id, nid );
			metaData[_in] = str;
			data_.setData( metaData );
			return true;

		}else if( ( pid = data_.hasId( parent, pid ) ) ){
			str = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( metaData[cat][catId][_in] ) ? metaData[cat][catId][_in] : '';
			str = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( str, ',' ) ).replace( id, nid );
			metaData[cat][catId][_in] = str;
			data_.setData( metaData );
			return true;

		}
		return false;

	};

	return prop;

	
});;

/***/ }),

/***/ "./src/js/editor/notification.js":
/*!***************************************!*\
  !*** ./src/js/editor/notification.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");



/* harmony default export */ __webpack_exports__["default"] = (function ( str, status ){
    const cockpit = document.getElementById( 'comet-cockpit' );
    const notifications = document.getElementById( 'comet-notifications' );
    var o, button;

    if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( notifications ).isNode() || !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( cockpit ).isNode() ){
        return false;

    }
    status = parseInt( status );

    switch( status ){
        case 0:
        case 400:
        status = 'error';
        break;
        default:
        status = 'success';
    }
    cockpit.className = 'cpb-active';

    o = document.createElement( 'div' );
    o.className = 'comet-notification ' + status;
    o.innerHTML = '<p>' + ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( str ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( str ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( str.toString() ) : '' ) + '</p>';

    button = document.createElement( 'button' );
    button.className = 'comet-button comet-close comet-closeNote';
    button.innerHTML = '<span class="cico cico-x"></span>';

    o.appendChild( button );

    notifications.appendChild( o );

    Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( button ).on( 'click', function( e, ui ){
        e.preventDefault();
        var _note;

        if( ( ( _note = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( ui.parentNode ) ).isNode() ) ){
            _note.remove();

        }

    });

});

/***/ }),

/***/ "./src/js/editor/panel.js":
/*!********************************!*\
  !*** ./src/js/editor/panel.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");





/* harmony default export */ __webpack_exports__["default"] = (function( options ){
	const _d = document;
	const editor = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getNode( 'editor' );
	const id = 'comet-panel';
	const fragment = _d.createDocumentFragment();
	var panel, inner, body, header, button, buttons, title, tabs, content;

	options = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( options ) ? options : {};
	options.close = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( options.close ) ? options.close : {};
	options.close.title = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( options.close.title ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( options.close.title ) : __cometi18n.ui.close;
	options.close.inner = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( options.close.inner ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( options.close.inner ) : '<span class="cico cico-x"></span>';


	if( ( ( panel = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( _d.getElementById( id ) ) ).isNode() ) ){
		panel.remove();

	}
	panel = _d.createElement( 'div' );
	panel.id = id;
	panel.className = 'comet-panel comet-ui';
	panel.innerHTML = '<div class="comet-header"><div class="comet-top"></div></div><div class="comet-body"></div>';
	panel.style.left = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: options.position, default: 0, min: 0 });
	fragment.appendChild( panel );

	header = panel.firstChild;
	body = panel.lastChild;

	button = _d.createElement( 'button' );
	button.className = 'comet-button comet-close';

	if( options.close.title !== '' ){
		button.title = options.close.title;

	}
	button.innerHTML = options.close.inner;
	header.firstChild.appendChild( button );

	if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( options.title ) ){
		title = _d.createElement( 'span' );
		title.className = 'comet-title';
		title.innerHTML = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( options.title );
		header.firstChild.appendChild( title );

	}

	if( 'tabs' in options && options.tabs ){
		tabs = _d.createElement( 'div' );
		tabs.className = 'comet-tabs';
		tabs.appendChild( options.tabs );
		header.appendChild( tabs );

	}

	if( 'content' in options && options.content ){
		body.appendChild( options.content );

	}else{
		body.innerHTML = __cometi18n.messages.error.unreach;
	}
	editor.appendChild( fragment );
	_redefine_js__WEBPACK_IMPORTED_MODULE_2__["default"].workflow();

	Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( button ).on( 'click', function( ev, ui ){
		ev.preventDefault();
		var _exit;

		if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( options.close.do ) ){
			_exit = options.close.do( ev, ui );

		}

		if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isBool( _exit ) && !_exit ){
			return;

		}
		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( panel ).remove();
		_redefine_js__WEBPACK_IMPORTED_MODULE_2__["default"].workflow();

	});

	return {
		target: panel,
		destroy: function(){
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( panel ).remove();
			_redefine_js__WEBPACK_IMPORTED_MODULE_2__["default"].workflow();

		}

	};

});

/***/ }),

/***/ "./src/js/editor/panel/fields/icon.js":
/*!********************************************!*\
  !*** ./src/js/editor/panel/fields/icon.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modal.js */ "./src/js/utils/modal.js");
/* harmony import */ var _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/icon.js */ "./src/js/utils/icon.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../update.js */ "./src/js/editor/update.js");







/* harmony default export */ __webpack_exports__["default"] = (function( slug, field, data ){

	var input = null;

	var value = '';

	var loaded = [];

	var _modal = false;

	const _d = document;

	const wrapper = _d.createElement( 'div' );

	const __core = {

		load: function( set_id ){
			const fragment = _d.createDocumentFragment();
			const set = _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].get_set( set_id );
			var icon_id, scope, svg, encoded;

			loaded = [];

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( set ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( set.set ) ){

				for( icon_id in set.set ){

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( svg = _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].get_svg_from_data( set.set[icon_id] ) ) ){
						continue;

					}
					encoded = _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].encode( set_id, icon_id );
					scope = _d.createElement( 'div' );
					scope.className = 'comet-scope comet-icon comet-collection';
					scope.innerHTML = svg;
					fragment.appendChild( scope );

					loaded[loaded.length] = {
						id: icon_id,
						name: set.set[icon_id].name,
						svg: svg,
						node: scope

					};

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( scope ).on( 'click', __core.onclick, encoded );

				}

			}
			_modal.body.firstChild.innerHTML = '';
			_modal.body.firstChild.appendChild( fragment );

		},

		onclick: function( ev, ui, edata ){
			ev.preventDefault();
			console.log( edata );
			value = edata;
			input.value = edata;
			__core.create();
			Object(_update_js__WEBPACK_IMPORTED_MODULE_5__["default"])( input );
			_modal.destroy();

		},

		switch: function( ev, ui ){
			__core.load( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( ui.value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( ui.value ) : '' );

		},

		search: function( ev, ui ){

			const val = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( ui.value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( ui.value ) : '';
			var icon, i, regex;

			if( loaded.length < 1 ){
				return false;

			}
			regex = new RegExp( val, 'i' );

			for( i = 0; i < loaded.length; i++ ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( icon = loaded[i] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( icon.id ) ){
					continue;

				}

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( val ) && icon.id.search( regex ) === -1 ){
					icon.node.style.display = 'none';
					continue;

				}
				icon.node.style.display = 'block';

			}

		},

		open: function( ev, ui ){

			ev.preventDefault();
			ev.stopPropagation();

			const sets = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSvgSets();
			var first_id = false;
			var count = 1;
			var option = '';
			var id, header, inner, body;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets ) ){
				return;

			}

			header = _d.createElement( 'div' );
			header.className = 'comet-searchbox';

			inner = '<select class="comet-ui comet-select">';

			for( id in sets ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets[id] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( sets[id].name ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets[id].set ) ){
					continue;

				}

				if( count === 1 ){
					first_id = id;

				}
				inner += '<option value="' + id +'">' + sets[id].name + '</option>';
				count++;

			}
			inner += '</select>';
			inner += '<input type="text" class="comet-ui comet-input" placeholder="' + __cometi18n.ui.sIcon + '"/>';
			header.innerHTML = inner;

			body = _d.createElement( 'div' );
			body.className = 'comet-icons comet-set comet-wrapper';

			_modal = Object(_utils_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
				header: header,
				content: body
			});

			__core.load( first_id );

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( header.firstChild ).on( 'change', __core.switch );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( header.lastChild ).on( 'input', __core.search );
		},

		delete: function( ev, ui ){
			ev.preventDefault();
			ev.stopPropagation();
			value = '';
			input.value = value;
			__core.create();
			Object(_update_js__WEBPACK_IMPORTED_MODULE_5__["default"])( input );

		},

		create: function(){

			const browse = __cometi18n.ui.browse;
			const remove = __cometi18n.ui.remove;
			const buttonClass = 'comet-button';
			const wcn = wrapper.childNodes;
			const button = _d.createElement( 'button' );
			const decoded = _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].decode( value );
			const icon = ( !decoded ? false : _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].get_icon( decoded.set_id, decoded.icon_id ) );
			var n = 0;

			console.log( value, decoded, icon );

			while( n < wcn.length ){

				if( wcn[n] !== input ){
					wrapper.removeChild( wcn[n] );

				}
				n++;
			}

			if( !icon ){
				button.className = buttonClass + ' comet-buttonPrimary comet-upload';
				button.innerHTML = browse;
				wrapper.appendChild( button );
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( button ).on( 'click', __core.open );
				return;

			}
			const oh = _d.createElement( 'div' );
			wrapper.appendChild( oh );
			oh.className = 'comet-media comet-wrapper comet-icon';
			oh.title = browse;
			oh.innerHTML = _utils_icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].get_svg_from_data( icon );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oh ).on( 'click', __core.open );

			button.className = buttonClass + ' comet-remove';
			button.title = remove;
			button.innerHTML = '<span class="cico cico-x"></span>';
			oh.appendChild( button );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( button ).on( 'click', __core.delete );

		}


	};

	data = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data ) ? data : {};

	if( 'std' in field ){
		value = field.std;

	}

	if( slug in data ){
		value = data[slug];

	}
	value = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( value ) ) : '';

	wrapper.className = 'comet-uploader comet-image comet-wrapper';
	wrapper.innerHTML = '<input type="hidden" name="' + slug + '" class="comet-field" value="' + value + '" />';
	input = wrapper.firstChild;
	__core.create();

	return wrapper;

});

/***/ }),

/***/ "./src/js/editor/panel/fields/numbers.js":
/*!***********************************************!*\
  !*** ./src/js/editor/panel/fields/numbers.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../update.js */ "./src/js/editor/update.js");





/* harmony default export */ __webpack_exports__["default"] = (function( id, field, data ){

	var inner, _dd, v, values, _id, _responsive, tmp;

	var is_locked = false;

	var device = 'desktop';

	const _d = document;

	const is_responsive = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( field.responsive ) && [ 'true', 'yes' ].indexOf( ( field.responsive ).toLowerCase() ) > -1 );

	const devices = {
		tablet: [],
		mobile: [],
		desktop: []
	};

	const frame = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getNode( 'frame' );

	const classes = {
		active: 'comet-active',
		locked: 'comet-locked',
	};

	const __core = {

		devices: function( ev, ui, e ){
			ev.preventDefault();
			ev.stopPropagation();
			var _device, ico, d;

			switch( e.device ){
				case 'desktop':
				ico = 'cico-desktop';
				_redefine_js__WEBPACK_IMPORTED_MODULE_2__["default"].workflow();
				break;
				
				case 'tablet':
				ico = 'cico-tablet';
				frame.style.maxWidth = '800px';
				break;

				case 'mobile':
				ico = 'cico-mobile';
				frame.style.maxWidth = '400px';
				break;

				default:
				return;

			}
			device = e.device;
			e.icon.className = 'cico ' + ico;

			for( d in devices ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( devices[d] ) ){
					return;

				}
				_device = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( devices[d] );

				if( d === e.device ){
					_device.addClass( classes.active );

				}else{
					_device.removeClass( classes.active );

				}

				if( is_locked ){
					_device.addClass( classes.locked );
					continue;

				}
				_device.removeClass( classes.locked );

			}

		},

		vernum: function( ev, ui ){
			ev.preventDefault();
			var d, _device;
			is_locked = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBool( is_locked ) && is_locked ? false : true;

			if( is_locked ){
				ui.firstChild.className = 'cico cico-lock';
				ui.title = __cometi18n.ui.locked;

			}else{
				ui.firstChild.className = 'cico cico-unlock';
				ui.title = __cometi18n.ui.unlocked;

			}

			for( d in devices ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( devices[d] ) ){
					return;

				}
				_device = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( devices[d] );

				if( d === device  && is_locked ){
					_device.addClass( classes.locked );
					continue;

				}
				_device.removeClass( classes.locked );

			}

		},

		update: function( ev, ui, type ){
			ev.preventDefault();
			var num, input, d;

			if( !( type in devices ) ){
				return;

			}
			num = parseFloat( ui.value );

			if( is_locked ){

				for( d in devices[type] ){

					if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( devices[type][d] ).isNode() || !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( input = devices[type][d].firstChild ).hasClass( 'comet-field' ) || input === ui ){
						continue;

					}
					input.value = num;

				}

			}
			Object(_update_js__WEBPACK_IMPORTED_MODULE_3__["default"])( ui );

		},

		get_value: function( slug, _field ){
			var value = '';

			if( 'std' in _field ){
				value = _field.std;

			}

			if( slug in data ){
				value = data[slug];

			}
			return value;

		},

		number: function( type, e ){
			var className = 'comet-number comet-wrapper';
			var _node, len;

			if( !( type in devices ) ){
				return false;

			}

			if( is_locked ){
				className += ' ' + classes.locked;

			}

			if( type === 'desktop' ){
				className += ' ' + classes.active;

			}
			_node = _d.createElement( 'div' );
			_node.className = className;
			_node.innerHTML = '<input type="number" class="comet-field" name="' + e.name + '" value="' + e.value + '" /><label>' + e.label + '</label>';
			
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _node.firstChild ).on( 'input change', __core.update, type );
			
			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( devices[type] ) ){
				len = devices[type].length;
				devices[type][len] = _node;

			}else{
				devices[type] = [];
				devices[type][0] = _node;

			}

			return _node;

		}

	};

	const fragment = _d.createDocumentFragment();

	const _num = _d.createElement( 'div' );

	const _lock = _d.createElement( 'button' );

	data = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data ) ? data : {};

	_lock.className = 'comet-vernum comet-upper';
	_lock.title = __cometi18n.ui.unlocked;
	_lock.innerHTML = '<span class="cico cico-unlock"></span>';

	Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _lock ).on( 'click', __core.vernum );

	fragment.appendChild( _lock );

	if( is_responsive ){
		_responsive = _d.createElement( 'div' );
		_responsive.className = 'comet-switch comet-devices comet-dropdown comet-upper';

		inner = '<span class="cico cico-desktop"></span>';
		inner += '<div class="comet-items">';
		inner += '<button class="comet-device" data-device="d"><span class="cico cico-desktop"></span>' + __cometi18n.ui.desktop + '</button>';
		inner += '<button class="comet-device" data-device="t"><span class="cico cico-tablet"></span>' + __cometi18n.ui.tablet + '</button>';
		inner += '<button class="comet-device" data-device="m"><span class="cico cico-mobile"></span>' + __cometi18n.ui.mobile + '</button>';
		inner += '</div>';
		_responsive.innerHTML = inner;

		_dd = _responsive.lastChild.children;

		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _dd[0] ).on( 'click', __core.devices, { icon: _responsive.firstChild, device: 'desktop' } );
		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _dd[1] ).on( 'click', __core.devices, { icon: _responsive.firstChild, device: 'tablet' } );
		Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _dd[2] ).on( 'click', __core.devices, { icon: _responsive.firstChild, device: 'mobile' } );

		fragment.appendChild( _responsive );

	}
	_num.className = 'comet-wrapper comet-numbers';
	fragment.appendChild( _num );

	if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( values = field.values ) ){

		for( v in values ){

			tmp = __core.number( 'desktop', {
				label: _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( values[v].label ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( values[v].label ) ) : '',
				name: ( _id = id + v ),
				value: __core.get_value( _id, values[v] )

			} );

			if( !tmp ){
				continue;

			}
			_num.appendChild( tmp );

			if( !is_responsive ){
				continue;

			}

			tmp = __core.number( 'tablet', {
				label: _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( values[v].label ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( values[v].label ) ) : '',
				name: _id + 't',
				value: __core.get_value( _id + 't', values[v] )

			} );

			if( !tmp ){
				continue;

			}
			_num.appendChild( tmp );


			tmp = __core.number( 'mobile', {
				label: _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( values[v].label ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( values[v].label ) ) : '',
				name: _id + 'm',
				value: __core.get_value( _id + 'm', values[v] )

			} );

			if( !tmp ){
				continue;

			}
			_num.appendChild( tmp );


		}

	}

	return fragment;

});

/***/ }),

/***/ "./src/js/editor/panel/parts/editor.js":
/*!*********************************************!*\
  !*** ./src/js/editor/panel/parts/editor.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _target_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../target.js */ "./src/js/editor/target.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data.js */ "./src/js/editor/data.js");







/* harmony default export */ __webpack_exports__["default"] = (function( destroy ){
	const oTid = 'comet-editorToolbar';//'comet-toolbar';	
	const selection = {};
	const target = Object(_target_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
	const id = target.id();
	const item = target.item();
	const element = target.node();
	const type = target.type();
	const classes = {
		active: 'cpb-active',
		textarea: 'comet-fieldEditor',
		editor: 'cpb-editable'
	}
	const textarea = document.getElementsByClassName( classes.textarea );
	var neditor = 0;
	var oToolbar = document.getElementById( oTid );

	destroy = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBool( destroy ) ? destroy : false;

	function _destroy(){
		const editors = document.getElementsByClassName( classes.editor );
		var e, _editor;

		if( editors.length < 1 ){
			return;

		}

		for( e = 0; e < editors.length; e++ ){

			if( ( _editor = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( editors[e] ) ).isNode() ){
				editors[e].removeAttribute( 'contenteditable' );
				_editor.removeClass( classes.active );

			}

		}

	}

	function editor(){
		var editors, _editor, e;

		const prop = {

			triggered: function( tested ){
				const cid = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].dataset( tested, 'id' ) );
				var cm = prop.matched( tested );

				return ( ( cm && ( ( id === cid && !item ) || ( item && item === cid ) ) ) ? cm : false );

			},

			matched: function( tested ){
				const need = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].dataset( tested, 'match' );
				var t = 0;

				for( t; t < textarea.length; t++ ){

					if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( textarea[t] ).isNode() || _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( textarea[t].name ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( textarea[t].name ) !== need ){
						continue;

					}
					return textarea[t];

				}
				return false;

			},

			focus: function( ev, ui ){
				ev.preventDefault();
				var buttons, _target;

				if( window.getSelection && window.getSelection().modify ){
					selection.range = window.getSelection().getRangeAt(0);
					selection.clicked = true;

				}

				if( ( buttons = oToolbar.getElementsByClassName( 'comet-tbButton' ) ).length < 1 || !( ( _target = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ev.target ) ).isNode() ) ){
					return;

				}

				function isCommand( button, command ){
					const cmd = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].dataset( button, 'command' );

					return ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( cmd ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( cmd ) === command );

				}

				function parent( comp ){
					var command, command1, _button, b;

					if( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( comp ).hasClass( classes.editor ) || comp.parentNode === null ){
						return;

					}

					switch( comp.nodeName.toLowerCase() ){
						case 'b':
						case 'bold':
						case 'bolder':
						case 'strong':
						command = 'bold';
						break;
						case 'i':
						case 'em':
						case 'italic':
						command = 'italic';
						break;
						case 'u':
						case 'ins':
						case 'underline':
						command = 'underline';
						break;
						case 'del':
						case 'strike':
						case 'strikethrough':
						command = 'strikeThrough';
						break;
						case 'a':
						case 'link':
						command = 'link';
						break;
						default:
						return;
					}

					for( b = 0; b < buttons.length; b++ ){

						if( !( ( _button = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( buttons[b] ) ).isNode() ) || !isCommand( buttons[b], command ) ){
							continue;

						}
						_button.addClass( classes.active );

					}
					parent( comp.parentNode );

				}
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( buttons ).removeClass( classes.active );
				parent( _target.prop() );

			},

			change: function( ev, ui ){
				const ct = prop.matched( ui );

				if( !ct ){
					return;

				}
				ct.value = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( ui.innerHTML, '<p><strong><ins><del><sup><sub><b><i><span><u><em><strike><a><h1><h2><h3><h4><h5><h6><hr><br><img><caption>' );
				Object(_data_js__WEBPACK_IMPORTED_MODULE_5__["default"])().catchAndSet( id, type );

			}

		};

		if( destroy ){
			_destroy();
			return;

		}

		if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( element ).isNode() || ( editors = element.getElementsByClassName( classes.editor ) ).length < 1 || textarea.length < 1 ){
			return;

		}

		for( e = 0; e < editors.length; e++ ){

			if( !( ( _editor = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( editors[e] ) ).isNode() ) ){
				continue;

			}

			if( destroy || !prop.triggered( editors[e] ) ){
				editors[e].removeAttribute( 'contenteditable' );
				_editor.removeClass( classes.active );
				continue;

			}
			editors[e].setAttribute( 'contenteditable', 'true' );
			_editor.addClass( classes.active );
			_editor.on( 'click', prop.focus );
			_editor.on( 'input', prop.change );
			neditor++;

		}

	}

	function toolbar(){
		const frame = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getNode( 'frame' );
		var _oToolbar = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( oToolbar );
		const toolbarExists = ( _oToolbar.isNode() );

		const prop = {

			create: function(){
				const buttons = prop.buttons();
				var button, oButton, inner, bClasses, b;

				oToolbar = document.createElement( 'div' );
				oToolbar.id = oTid;

				for( b = 0; b < buttons.length; b++ ){
					button = buttons[b];
					oButton = document.createElement( 'button' );
					oButton.dataset.command = button.command;
					oButton.className = 'comet-button comet-tbButton';
					bClasses = 'comet-title';
					inner = '';

					if( 'icon' in button ){
						inner += '<span class="comet-icon ' + button.icon + '"></span>';
						bClasses += ' comet-tooltip';

					}

					if( 'title' in button ){
						inner += '<span class="' + bClasses + '">' + button.title + '</span>';

					}
					oButton.innerHTML = inner;

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( button.render ) ){
						oToolbar.appendChild( button.render( oButton ) );

					}else{
						oToolbar.appendChild( oButton );

					}
					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( oButton ).on( 'click', button.do );

				}
				frame.before( oToolbar );

			},

			buttons: function(){

				const onbutton = {

					default: function( command, val ){
						var sel, range;

						val = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( val ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( val ) : null;

						if( !window.getSelection || !window.getSelection().modify || selection.range === null ){
							return;

						}
						sel = window.getSelection();

						if( selection.clicked ){
							sel.removeAllRanges();
							sel.addRange( selection.range );

						}

						if( sel.type === 'Caret' ){
							sel.modify('move', 'backward', 'word');
							sel.modify('extend', 'forward', 'word');

						}
						range = sel.getRangeAt(0);
						document.execCommand( command, false, val );
						selection.clicked = false;

					},

					toggle: function( ui ){
						const _ui = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ui );

						if( _ui.hasClass( classes.active ) ){
							_ui.removeClass( classes.active );
							return false;

						}
						_ui.addClass( classes.active );
						return true;

					}


				}

				return [
				{
					command: 'bold',
					icon: 'cico cico-bold',
					title: __cometi18n.ui.bold,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'bold' );

					}
				},

				{
					command: 'italic',
					icon: 'cico cico-italic',
					title: __cometi18n.ui.italic,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'italic' );

					}
				},

				{
					command: 'underline',
					icon: 'cico cico-underline',
					title: __cometi18n.ui.underline,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'underline' );

					}
				},

				{
					command: 'strikeThrough',
					icon: 'cico cico-striketrough',
					title: __cometi18n.ui.st,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'strikeThrough' );

					}
				},

				{
					command: 'link',
					icon: 'cico cico-link',
					title: __cometi18n.ui.ilink,
					render: function( button ){
						const inline = document.createElement( 'div' );
						const input = document.createElement( 'input' );
						const createLink = document.createElement( 'button' );


						inline.className = 'comet-inline';

						createLink.className = 'comet-button comet-done';
						createLink.innerHTML = '<span class="comet-icon cico cico-break"></span><span class="comet-title comet-tooltip">' + __cometi18n.ui.ilink + '</span>';

						inline.appendChild( button );
						inline.appendChild( input );
						inline.appendChild( createLink );

						Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( createLink ).on( 'click', function( ev, ui ){
							ev.preventDefault();
							const val = _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( input.value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( input.value ) ) : '';
							const state = val === '' ? 'unlink' : 'createLink';
							onbutton.default( state, val );
						});

						return inline;

					},
					do: function( ev, ui ){
						ev.preventDefault();
						const _p = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ui.parentNode );

						if( onbutton.toggle( ui ) ){
							_p.addClass( classes.active );
							return;

						}
						_p.removeClass( classes.active );

					}
				}];

			}

		};

		if( destroy || neditor < 1 ){

			if( toolbarExists ){
				_oToolbar.remove();

			}
			frame.style.height = '';
			frame.style.top = '';
			return;

		}

		if( !toolbarExists ){
			prop.create();

		}

	}

	editor();
	toolbar();

});

/***/ }),

/***/ "./src/js/editor/panel/tabs.js":
/*!*************************************!*\
  !*** ./src/js/editor/panel/tabs.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ui_gradient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ui/gradient.js */ "./src/js/utils/ui/gradient.js");
/* harmony import */ var _utils_ui_color_picker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/ui/color-picker.js */ "./src/js/utils/ui/color-picker.js");
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_ui_range_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/ui/range.js */ "./src/js/utils/ui/range.js");
/* harmony import */ var _fields_numbers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fields/numbers.js */ "./src/js/editor/panel/fields/numbers.js");
/* harmony import */ var _utils_layout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _fields_icon_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fields/icon.js */ "./src/js/editor/panel/fields/icon.js");
/* harmony import */ var _target_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../target.js */ "./src/js/editor/target.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../update.js */ "./src/js/editor/update.js");
/* harmony import */ var _panel_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../panel.js */ "./src/js/editor/panel.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../data.js */ "./src/js/editor/data.js");














//import __tab from './tab.js';

const __create = function( tabs, data ){

	const _d = document;

	const classes = {
		active: 'comet-active',
		tab: 'comet-tab',

	};

	const __events = {

		tab: function( ev, ui, contentNode ){
			ev.preventDefault();
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( ui.parentNode.children ).removeClass( classes.active );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( contentNode.parentNode.children ).removeClass( classes.active );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( contentNode ).addClass( classes.active );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( ui ).addClass( classes.active );

		},

		section: function( ev, ui, contentNode ){
			ev.preventDefault();
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( contentNode ).toggleClass( classes.active );

		},

		item: {

			add: function( ev, ui, itemsNode ){
				ev.preventDefault();
				const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
				var pid, id;

				if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( itemsNode ).isNode() || !( pid = target_.id() ) ){
					return;

				}

				if( target_.type() === null || !( id = Object(_data_js__WEBPACK_IMPORTED_MODULE_13__["default"])().create( 'items', pid, 'last' ) ) ){
					return;

				}

				itemsNode.appendChild( __core.item( id ) );

			},

			edit: function( ev, ui, args ){
				ev.preventDefault();
				const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
				const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_13__["default"])();
				var id, tabs1, tid, element, edata;

				if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].id( args.id ) ) || !( tid = target_.id() ) ){
					return;

				}

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( element = data_.get( tid, 'elements' ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( edata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].getElement( element._type ) ) ){
					return;

				}

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( edata.tabs ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( edata.tabs.items ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( edata.tabs.items.tabs ) ){
					return;

				}
				tabs1 = __create( edata.tabs.items.tabs, data_.get( id, 'items' ) );
				target_.set( { state: 'items', item: id } );

				Object(_panel_js__WEBPACK_IMPORTED_MODULE_12__["default"])({
					title: __cometi18n.ui.editItem,
					tabs: tabs1.tabs,
					content: tabs1.content,
					close: {
						inner: '<span class="cico cico-arrow-left-alt"></span>',
						title: __cometi18n.ui.back,
						do: function(){

							if( !tid ){
								return false;

							}
							const tabs2 = __create( edata.tabs, element );
							target_.set( { state: null, item: null } );

							Object(_panel_js__WEBPACK_IMPORTED_MODULE_12__["default"])({
								title: __cometi18n.options.element.edit,
								tabs: tabs2.tabs,
								content: tabs2.content,
								close: {
									do: function(){
										target_.reset();

									}

								}

							});

						}
					}
				});

			},

			delete: function( ev, ui, args ){
				ev.preventDefault();
				const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_13__["default"])();
				const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_10__["default"])();
				var element_id, item_id, elementNode;
				var id, _t, lyt;

				if( !( ( _t = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( args.target ) ).isNode() ) || !( item_id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].id( args.id ) ) ){
					return;

				}

				if( !data_.remove( item_id, 'items', ( element_id = target_.id() ) ) ){
					return;

				}
				_t.remove();

				if( ( elementNode = target_.node() ) && ( lyt = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_5__["default"])( data_.getData() ).element( element_id, true ) ) ){
					elementNode.parentNode.replaceChild( lyt, elementNode );
					
				}

			}
		},

	};

	const __core = {

		tabs: function(){
			const oTabs = _d.createDocumentFragment();
			const oContent = _d.createDocumentFragment();
			var count = 1;
			var a, isItems, t, tab, tid, content;

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( tabs ) ){

				for( a in tabs ){
					isItems = ( a === 'items' );

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( t = tabs[a] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( t.name ) || ( !isItems && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( t.sections ) ) || ( isItems && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( t.tabs ) ) ){
						continue;

					}
					tab = _d.createElement( 'button' );
					tab.className = classes.tab + ( count === 1 ? ' ' + classes.active : '' );
					tab.innerHTML = t.name;
					oTabs.appendChild( tab );

					content = _d.createElement( 'div' );
					content.className = classes.tab + ( count === 1 ? ' ' + classes.active : '' );
					content.appendChild( __core.tab( ( isItems ? t.tabs : t.sections ), isItems ) );
					oContent.appendChild( content );

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( tab ).on( 'click', __events.tab, content );
					count++;

				}
			}

			return {
				tabs: oTabs,
				content: oContent
			};

		},

		tab: function( sections, isItems ){
			const oTab = _d.createDocumentFragment();
			var section, a, s, dataItem, ids, id;

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isBool( isItems ) && isItems ){

				section = _d.createElement( 'div' );
				section.className = 'comet-section comet-items comet-ui';
				section.innerHTML = '<div class="comet-items"></div><div class="comet-buttonset"><button class="comet-button comet-buttonPrimary" aria-label="' + __cometi18n.ui.addItem + '"><span class="cico cico-plus"></span><span class="comet-title">' + __cometi18n.ui.addItem + '</span></button></div>';
				oTab.appendChild( section );

				if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( data ) && !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( data._items ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isArray( ( ids = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].ids( data._items, 'array' ) ), 1 ) ){

					for( a = 0; a < ids.length; a++ ){

						if( !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_6__["default"].id( ids[a] ) ) || !( dataItem = Object(_data_js__WEBPACK_IMPORTED_MODULE_13__["default"])().get( id, 'items' ) ) ){
							continue;

						}
						section.firstChild.appendChild( __core.item( id, dataItem.title ) );

					}
				}

				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( section.lastChild.firstChild ).on( 'click', __events.item.add, section.firstChild );

				return oTab;

			}

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( sections ) ){ 

				for( a in sections ){

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( s = sections[a] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( s.name ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( s.fields ) ){
						continue;

					}
					section = _d.createElement( 'div' );
					section.className = 'comet-section comet-ui';
					section.innerHTML = '<h4 class="comet-header comet-title">' + s.name + '</h4><div class="comet-body"></div>';
					oTab.appendChild( section );

					section.lastChild.appendChild( __core.fields( s.fields ) );

					Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( section.firstChild ).on( 'click', __events.section, section.lastChild );
				}
			}
			return oTab;

		},

		item: function( id, title ){
			const item = _d.createElement( 'div' );
			var inner, dren, args;

			//item.dataset.id = id;
			item.className = 'comet-item';

			inner = '<span><span>#' + id + '</span>' + ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( title ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( title ) : '' ) + '</span>';
			inner += '<button class="comet-button comet-first" aria-label="' + __cometi18n.ui.edit + '"><span class="cico cico-edit"></span><span class="comet-title">' + __cometi18n.ui.edit + '</span></button>';
			inner += '<button class="comet-button comet-last" aria-label="' + __cometi18n.ui.delete + '"><span class="cico cico-trash"></span><span class="comet-title">' + __cometi18n.ui.delete + '</span></button>';

			item.innerHTML = inner;
			dren = item.children;

			args = {
				id: id,
				target: item 

			};

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( dren[1] ).on( 'click', __events.item.edit, args );
			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( dren[2] ).on( 'click', __events.item.delete, args );

			return item;

		},

		fields: function( fields ){
			const oFields = _d.createDocumentFragment();
			var f, a, field, type, meta;

			if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( fields ) ){

				for( a in fields ){

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( f = fields[a] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( f.type ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( f.label ) ){
						continue;

					}
					f.type = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( f.type.toLowerCase() ) );
					field = _d.createElement( 'div' );
					field.className = 'comet-control comet-control-' + f.type;
					field.innerHTML = '<div class="comet-meta"></div><div class="comet-field-wrap"></div>';
					oFields.appendChild( field );

					meta = '<label>' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( f.label ) ) + '</label>';

					if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( f.desc ) ){
						meta += '<span class="comet-tooltip">';
						meta += '<span class="comet-icon">?</span>';
						meta += '<span class="comet-description comet-inner">' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( f.desc, '<b><strong><i><a><span><sub><sup><ins>' ) + '</span>';
						meta += '</span>';

					}
					field.firstChild.innerHTML = meta;
					field.lastChild.appendChild( __core.field( a, f ) );
				}

			}
			return oFields;
		},

		field: function( slug, field ){

			var fieldClass = 'comet-field';

			var value = '';

			const fields = {

				text: function(){

					const _node = _d.createElement( 'input' );
					_node.type = 'text';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;
					__core.update( _node );
					return _node;

				},

				textarea: function(){

					const _node = _d.createElement( 'textarea' );
					_node.name = slug;
					_node.className = fieldClass;
					_node.innerHTML = value;
					__core.update( _node );

					return _node;
					
				},

				select: function(){

					var v, values, _option;

					const _node = _d.createElement( 'select' );
					_node.name = slug;
					_node.className = fieldClass;

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( values = field.values ) ){

						for( v in values ){

							if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( values[v] ) ){
								continue;

							}
							_option = _d.createElement( 'option' );
							_option.value = v;
							_option.innerHTML = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( values[v] );

							if( v === value ){
								_option.selected = true;

							}
							_node.appendChild( _option );

						}

					}
					__core.update( _node );
					return _node;
					
				},

				checkbox: function(){

					const _node = _d.createElement( 'input' );
					_node.type = 'checkbox';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = 'true';

					if( value === 'true' ){
						_node.checked = true;

					}
					__core.update( _node );
					return _node;
					
				},

				radio: function(){

					const onradio = function( ev, ui ){
						const parentNode = ui.parentNode;
						var dren;

						if( parentNode === null || ( dren = parentNode.children ).length < 1 ){
							return;

						}
						Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( dren ).removeClass( classes.active );
						Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( ui ).addClass( classes.active );
						Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( ui.firstElementChild );

					};

					const fragment = _d.createDocumentFragment();

					var _radio, values, v, inner;

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( values = field.values ) ){

						for( v in values ){

							if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( values[v] ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( values[v].title ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( values[v].icon ) ){
								continue;

							}
							_radio = _d.createElement( 'label' );
							_radio.className = 'comet-label comet-ui' + ( v === value ? ' ' + classes.active : '' );
							fragment.appendChild( _radio );
							inner = '<input type="radio" class="' + fieldClass + '" name="' + slug + '"value="' + v + '" />';
							inner += '<span class="comet-icon ' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( values[v].icon ) ) + '"></span>';
							inner += '<span class="comet-title">' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( values[v].title, '<b><strong><i><span><u><ins>' ) ) + '</span>';
							_radio.innerHTML = inner;

							if( v === value ){
								_radio.firstChild.checked = true;

							}
							Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( _radio ).on( 'click', onradio );

						}

					}

					return fragment;
					
				},

				range: function(){

					const onchange = function( ev, ui, e ){
						var dren, val, tmp, x;

						if( ( val = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_2__["default"].number( e.source.value ) ) === null || ( tmp = e.source.parentNode ) === null ){
							return;

						}

						if( ( dren = tmp.getElementsByClassName( 'comet-value' ) ).length < 1 ){
							return;

						}

						for( x = 0; x < dren.length; x++ ){

							if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( dren[x] ).isNode() ){
								continue;

							}
							dren[x].innerHTML = val;

						}
						Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( e.source );

					};

					const fragment = _d.createDocumentFragment();

					const _unit = _d.createElement( 'span' );

					const _node = _d.createElement( 'input' );
					_node.type = 'hidden';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;
					_node.min = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_2__["default"].number({ value: field.min, min: 0 });
					_node.max = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_2__["default"].number({ value: field.max, min: _node.min });
					_node.step = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_2__["default"].number({ value: field.step, min: 0.01 });

					_unit.className = 'comet-unit';
					_unit.innerHTML = '<span class="comet-value">' + value + '</span>' + ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( field.unit ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( field.unit ) : '' );

					fragment.appendChild( _node );
					fragment.appendChild( _unit );

					Object(_utils_ui_range_js__WEBPACK_IMPORTED_MODULE_3__["default"])( _node, { 
						buttons: true,
						change: onchange
					} );

					return fragment;
					
				},

				number: function(){

					var unit, _unit;

					const fragment = _d.createDocumentFragment();

					const _node = _d.createElement( 'input' );
					_node.type = 'number';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;

					fragment.appendChild( _node );

					if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( unit = field.unit ) ){
						_unit = _d.createElement( 'span' );
						_unit.className = 'comet-unit';
						_unit.innerHTML = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( unit );
						fragment.appendChild( _unit );

					}
					__core.update( _node );
					return fragment;
					
				},

				numbers: function(){

					return Object(_fields_numbers_js__WEBPACK_IMPORTED_MODULE_4__["default"])( slug, field, data );
					
				},

				color: function(){

					const fragment = _d.createDocumentFragment();
					const _node = _d.createElement( 'input' );
					_node.type = 'text';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;

					fragment.appendChild( _node );

					Object(_utils_ui_color_picker_js__WEBPACK_IMPORTED_MODULE_1__["default"])( _node, {
						opacity: true,
						input: true,
						clear: true,
						onchange: function( ui, source, color ){
							Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( source );

						}

					});

					return fragment;

				},

				editor: function(){
					var op;

					const _node = _d.createElement( 'textarea' );
					_node.name = slug;
					_node.className = fieldClass + ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isStringEmpty( op = field.option ) && [ 'advanced', 'force_tag' ].indexOf( op = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( op ) ) > -1 ? ( op === 'advanced' ? ' comet-fieldEditorAdvanced' : ' comet-fieldEditorForceTag' ) : '' );
					_node.innerHTML = value;
					__core.update( _node );

					return _node;
					
				},

				gradient: function(){

					const fragment = _d.createDocumentFragment();
					const _node = _d.createElement( 'input' );
					_node.type = 'hidden';
					_node.name = slug;
					_node.className = fieldClass;
					_node.value = value;
					fragment.appendChild( _node );

					Object(_utils_ui_gradient_js__WEBPACK_IMPORTED_MODULE_0__["default"])( _node, {
						size: 20,
						onchange: function( ui, gdt ){
							Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( ui );

						}
					} );

					return fragment;
					
				},

				icon: function(){

					return Object(_fields_icon_js__WEBPACK_IMPORTED_MODULE_9__["default"])( slug, field, data );
					
				},

				image: function(){

					var input = null;

					var _value = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( value ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( value ) ) : '';

					const wrapper = _d.createElement( 'div' );

					const __img = {

						open: function( ev, ui ){
							ev.preventDefault();
							ev.stopPropagation();
							var args, media;

							if( media ){
								media.open();
								return;
							}

							args = {
								frame: 'select',
								title: __cometi18n.ui.selImage,
								library: {
									type: 'image'
								},
								button: {
									text: __cometi18n.ui.select,
								},
								multiple: false,
								editing:    true,
								filterable: true,
								searchable: true,
								sortable: true

							};

							media = wp.media( args );

							media.on( 'select', function(){
								const att = media.state().get('selection').first().toJSON();
								_value = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isString( _value = att.url ) ? ( ( _value = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].stripTags( _value ) ) ) !== '' ? _value : '' ) : '';

								input.value = _value;
								__img.create();
								Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( input );

							});
							media.open();

						},

						delete: function( ev, ui ){
							ev.preventDefault();
							ev.stopPropagation();
							_value = '';
							input.value = _value;
							__img.create();
							Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( input );

						},

						create: function(){

							const browse = __cometi18n.ui.browse;
							const remove = __cometi18n.ui.remove;
							const buttonClass = 'comet-button';
							const wcn = wrapper.childNodes;
							const button = _d.createElement( 'button' );
							var n = 0;

							while( n < wcn.length ){

								if( wcn[n] !== input ){
									wrapper.removeChild( wcn[n] );

								}
								n++;

							}

							if( _value === '' ){
								button.className = buttonClass + ' comet-buttonPrimary comet-upload';
								button.innerHTML = browse;
								wrapper.appendChild( button );
								Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( button ).on( 'click', __img.open );
								return;

							}
							const oh = _d.createElement( 'div' );
							wrapper.appendChild( oh );
							oh.className = 'comet-media comet-wrapper comet-image';
							oh.title = browse;
							oh.innerHTML = '<img src="' + _value + '"/>';
							Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( oh ).on( 'click', __img.open );

							button.className = classes.button + ' comet-remove';
							button.title = remove;
							button.innerHTML = '<span class="cico cico-x"></span>';
							oh.appendChild( button );
							Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( button ).on( 'click', __img.delete );
						}

					};

					wrapper.className = 'comet-uploader comet-image comet-wrapper';
					wrapper.innerHTML = '<input type="hidden" name="' + slug + '" class="' + fieldClass + '" value="' + _value + '" />';
					input = wrapper.firstChild;
					__img.create();

					return wrapper;
					
				}

			};

			if( 'std' in field ){
				value = field.std;

			}

			if( slug in data ){
				value = data[slug];

			}
			return ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isFunction( fields[field.type] ) ? fields[field.type]() : false );

		},

		update: function( _node ){

			Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_8__["default"])( _node ).on( 'input', function( ev, ui ){
				Object(_update_js__WEBPACK_IMPORTED_MODULE_11__["default"])( ui );

			});

		}

	};
	data = _utils_utils_js__WEBPACK_IMPORTED_MODULE_7__["default"].isObject( data ) ? data : {};

	return __core.tabs();

}

/* harmony default export */ __webpack_exports__["default"] = (__create);/*
	const obj = {};
	var oTabs, oContent, a, _a, isItems, t, tab, tid;

	if( !utils.isObject( tabs ) ){
		return obj;

	}
	oTabs = '';
	oContent = '';

	for( a in tabs ){
		t = tabs[a];
		_a = utils.trim( a.toString() );
		isItems = ( _a === 'items' );

		if( !utils.isString( t.name ) || ( !isItems && !utils.isObject( t.sections ) ) || ( isItems && !utils.isObject( t.tabs ) ) ){
			continue;

		}
		tid = 'comet-modalTab' + _a;
		tab = __tab( ( isItems ? t.tabs : t.sections ), data, isItems );

		oTabs += '<a class="comet-modalTabRef" href="#' + tid + '">';
		oTabs += utils.trim( t.name );
		oTabs += '</a>';

		oContent += '<div id="' + tid + '" class="comet-modalTab">';
		oContent += utils.isString( tab ) ? utils.stripOnly( tab, '<script><meta><link>' ) : __cometi18n.messages.error.unreach;
		oContent += '</div>';

	}
	obj.tabs = oTabs;
	obj.content = oContent;

	return obj;

}*/

/***/ }),

/***/ "./src/js/editor/post.js":
/*!*******************************!*\
  !*** ./src/js/editor/post.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");



/* harmony default export */ __webpack_exports__["default"] = (function( entry ){

	var fragment = null;
	var current = false;
	var div, tmp1;

	const _d = document;
	const tags = [ 'img', 'video', 'audio', 'p', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'ul', 'ol' ];
	const allowed = '<span><br><del><u><strike><i><em><b><strong><ins><a><code><var><samp><kbd>';
	const data = [];

	const _priv = {

		img: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				img: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.src ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp ) ) : '' ),
				alt: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.alt ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp ) ) : '' ),
				cap: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.title ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp ) ) : '' ),
				_type: 'image'

			};

		},

		ul: function( isOl ){
			const items = [];
			var tmp, i;

			if( !current || ( citems = current.children ).length < 1 ){
				return false;

			}

			for( i = 0; i < citems; i++ ){

				if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = citems[i].nodeName ) || ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( tmp ) ).toLowerCase() !== 'li' ){
					continue;

				}
				items[items.length] = {
					ctnt: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = citems[i].innerHTML ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp, allowed ) ) : '' )

				};

			}
			isOl = _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isBool( isOl ) ? isOl : false;

			return {
				sty: isOl ? 'decimal' : 'disc',
				_items: items,
				_type: 'listItems'
			
			};

		},

		default: function( tag ){
			var tmp;

			if( !current || [ 'p', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre' ].indexOf( tag ) < 0 ){
				return false;

			}

			return {
				tag: tag,
				content: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.innerHTML ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp, allowed ) ) : '' ),
				_type: 'text'

			};

		},

		video: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				type: 'c',
				url: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.src ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp ) ) : '' ),
				he: _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: current.getAttribute( 'height' ) } ),
				wi: _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: current.getAttribute( 'width' ) } ),
				_type: 'video'

			};

		},

		audio: function(){
			var tmp;

			if( !current ){
				return false;

			}

			return {
				url: ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( tmp = current.src ) ? _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( tmp ) ) : '' ),
				_type: 'audio'

			};

		}

	};

	if( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( entry ) ){
		return false;

	}
	fragment = _d.createDocumentFragment();
	div = _d.createElement( 'div' );
	div.innerHTML = entry;
	fragment.appendChild( div );

	tags.forEach(function( tag ){
		const get = div.getElementsByTagName( tag );
		var i = 0;
		var nname;

		if( get.length < 1 ){
			return;

		}

		for( i; i < get.length; i++ ){
			current = get[i];
			nname = ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( current.nodeName ) ).toLowerCase();

			if( nname === 'ol' ){
				tmp1 = _priv.ul( true );

			}else if( nname in _priv ){
				tmp1 = _priv[nname]();

			}else{
				tmp1 = _priv.default( nname );

			}

			if( !tmp1 ){
				continue;

			}
			data[data.length] = tmp1;

		}

	});
	return data;

});


/***/ }),

/***/ "./src/js/editor/redefine.js":
/*!***********************************!*\
  !*** ./src/js/editor/redefine.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_gradient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/gradient.js */ "./src/js/utils/gradient.js");
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_layout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data.js */ "./src/js/editor/data.js");






//import menu from './menu/menu.js';


const redefine = {

	workflow: function(){
		const ww = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( window ).width();
		const frame = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'frame' );
		const sidebar = _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'sidebar' );
		const panel = document.getElementById( 'comet-panel' );
		const tools = document.getElementById( 'comet-editorToolbar' );
		const rtl = __cometdata.rtl === 'true' ? 'right' : 'left';
		var sw, mw, th, w, _panel, _tools, _frame;

		sw = mw = th = 0;

		if( !( ( _frame = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( frame ) ).isNode() ) ){
			return false;

		}

		if( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( sidebar ).isNode() ){
			sw = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( sidebar ).width();

		}

		if( ( _panel = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( panel ) ).isNode() ){
			panel.style[rtl] = sw + 'px';
			mw = _panel.width();

		}
		w = ww - sw - mw;
		frame.style[rtl] = ( sw + mw ) + 'px';

		if( ( ( _tools = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( tools ) ).isNode() ) ){
			th = _tools.height();
			frame.style.top = th + 'px';
			frame.style.height = 'calc(100% - ' + th + 'px)';

		}

		if( !_frame.hasClass( 'cpb-desktopMode' ) ){
			_frame.addClass( 'cpb-desktopMode' );

		}
		frame.style.maxWidth = w + 'px';
		//menu.close();

	},

	gradient: function( comp ){
		const o = [];
		var _p, colors, c, fields, f, _color, val, stop, encode;

		if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( comp ).isNode() || !( ( _p = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( comp.parentNode ) ).isNode() ) || ( colors = _p.prop().children ).length < 1 ){
			return false;

		}

		for( c in colors ){

			if( !( ( _color = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( colors[c] ) ).hasClass( 'comet-eGColor' ) ) || ( fields = _color.prop().children ).length < 1 ){
				continue;

			}

			for( f in fields ){

				if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( fields[f] ).hasClass( 'comet-fieldColor' ) || ( val = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].color( fields[f].value ) ) === '' ){
					continue;

				}
				stop = !_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isNumber( stop = parseInt( _color.prop().style.left ) ) || isNaN( stop ) ? 0 : stop;

				if( stop < 0 ){
					stop = 0;
				}
				if( stop > 100 ){
					stop = 100;
				}
				o[o.length] = {
					stop: stop,
					color: val
				};
			}
		}

		if( !( ( _g = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( _p.prop().parentNode ) ).isNode() ) || ( fields = _g.prop().children ).length < 1 ){
			return false;

		}
		encode = _utils_gradient_js__WEBPACK_IMPORTED_MODULE_0__["default"].encode( o );

		for( f in fields ){

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( fields[f] ).hasClass( 'comet-field' ) ){
				continue;

			}
			fields[f].value = encode;

		}

	},

	columns: function( row ){
		const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
		const _row = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( row );
		var dren, c, width, id;

		if( !_row.isNode() ){
			return false;

		}
		row.dataset.ncol = 0;

		if( ( dren = _row.children( 'cpb-column' ) ).length < 1 ){
			return false;

		}
		row.dataset.ncol = dren.length;
		width = Number( 100 / dren.length ).toFixed( 2 );

		for( c = 0; c < dren.length; c++ ){

			if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_5__["default"])( dren[c] ).isNode() || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].dataset( dren[c], 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) ){
				continue;

			}
			data_.set( id, 'columns', { wsize: width } );
			Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).column( id );

		}
	}

};

/* harmony default export */ __webpack_exports__["default"] = (redefine);

/***/ }),

/***/ "./src/js/editor/target.js":
/*!*********************************!*\
  !*** ./src/js/editor/target.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global.js */ "./src/js/utils/global.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");





/* harmony default export */ __webpack_exports__["default"] = (function(){
	const global_ = Object(_utils_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

	const prop = {

		set: function( data ){
			var target;

			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ){
				return false;

			}
			if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target = prop.get() ) ){
				target = {};

			}

			if( 'id' in data ){
				target.id = data.id;

			}

			if( 'type' in data ){
				target.type = data.type;
				
			}

			if( 'item' in data ){
				target.item = data.item;
				
			}

			if( 'node' in data ){
				target.node = data.node;
				
			}

			if( 'state' in data ){
				target.state = data.state;
				
			}
			return global_.set( 'target', target );

		},

		get: function(){
			return global_.get( 'target' );

		},

		reset: function(){

			return prop.set({
				id: null,
				type: null,
				item: null,
				node: null,
				state: null
			});

		},

		id: function(){
			const target = prop.get();
			var id;

			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( target.id ) ) || id < 0 ? false : id );

		},

		node: function(){
			const target = prop.get();
			var _t;

			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || target.node === null || !( _t = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_3__["default"])( target.node ) ).isNode() ? false : _t.prop() );


		},

		type: function(){
			const target = prop.get();

			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || target.type === null || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( target.type ) ? false : _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( target.type ) );

		},

		item: function(){
			const target = prop.get();
			var id;

			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( target.item ) ) || id < 0 ? false : id );

		},

		state: function(){
			const target = prop.get();
			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || target.state === null || _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( target.state ) ? false : _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( target.state ) );

		}

	};

	function isTarget(){
		const target = prop.get();

		return ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) && 'id' in target && 'type' in target && 'node' in target && 'state' in target && 'item' in target );

	}

	if( !isTarget() ){
		prop.reset();

	}
	return prop;

});

/***/ }),

/***/ "./src/js/editor/update.js":
/*!*********************************!*\
  !*** ./src/js/editor/update.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panel_parts_editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel/parts/editor.js */ "./src/js/editor/panel/parts/editor.js");
/* harmony import */ var _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_layout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _redefine_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./redefine.js */ "./src/js/editor/redefine.js");
/* harmony import */ var _utils_node_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/node.js */ "./src/js/utils/node.js");
/* harmony import */ var _target_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./target.js */ "./src/js/editor/target.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data.js */ "./src/js/editor/data.js");










/* harmony default export */ __webpack_exports__["default"] = (function( ui ){

	var uidata = false;

	var _id, index, _type, a, re, slug, cvalue;

	const _d = document;

	const data = {};

	const data_ = Object(_data_js__WEBPACK_IMPORTED_MODULE_8__["default"])();

	const target_ = Object(_target_js__WEBPACK_IMPORTED_MODULE_7__["default"])();

	const targetNode = target_.node();

	const nodeNames = [ 'select', 'textarea', 'input' ];

	const __core = {

		is_true: function( value ){
			const true_ = [ 'true', 'TRUE', true ];

			return ( true_.indexOf( value ) > -1 );

		},

		background: function( content ){

			const _content = Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( content );
			var inner, dren, background;

			if( !_content.isNode() ){
				return;

			}

			if( ( dren = _content.children( 'cpb-backgroundComponents' ) ).length > 0 ){
				Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( dren ).remove();

			}
			background = _d.createElement( 'div' );
			background.className = 'cpb-backgroundComponents';
			content.appendChild( background );
			inner = '';

			if( 'vid' in uidata && __core.is_true( uidata.vid ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isString( uidata.vurl ) ){
				inner += '<video class="cpb-backgroundVideo" src="' + _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].stripTags( uidata.vurl ) ) + '" loop autoplay muted preload="auto"></video>';

			}

			if( 'ov' in uidata && __core.is_true( uidata.ov ) && _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isString( uidata.ovc ) ){
				inner += '<div class="cpb-backgroundOverlay"></div>';

			}
			background.innerHTML = inner;

		},

		resizeColumns: function(){

			var sw, sibling, c, dren, width, delta, __id, get, siblingWidth, targetWidth;

			var value = data[slug];

			const parentNode = targetNode.parentNode;

			const className = 'cpb-column';

			const __priv = {

				isSibling: function( column ){
					var id;
					return ( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( column ).hasClass( className ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].dataset( column, 'id' ) ) || !( id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( id ) ) ? false : id );

				},

				getNextSibling: function( column ){
					var sib, id, sibdata;

					if( column === null || ( sib = column.nextSibling ) === null ){
						return false;

					}

					if( !( id = __priv.isSibling( sib ) ) || !( sibdata = data_.get( id, _type ) ) ){
						return __priv.getNextSibling( sib );

					}
					return {
						id: id,
						node: sib,
						width: sibdata.wsize

					};

				},

				getPrevSibling: function( column ){
					var sib, id, sibdata;

					if( column === null || ( sib = column.previousSibling ) === null ){
						return false;

					}

					if( !( id = __priv.isSibling( sib ) ) || !( sibdata = data_.get( id, _type ) ) ){
						return __priv.getPrevSibling( sib );

					}
					return {
						id: id,
						node: sib,
						width: sibdata.wsize

					};

				},

				getSibling: function(){
					var tmp;

					if( ( tmp = __priv.getNextSibling( targetNode ) ) ){
						return tmp;

					}

					if( ( tmp = __priv.getPrevSibling( targetNode ) ) ){
						return tmp;

					}
					return false;

				},

			};

			if( parentNode === null || slug !== 'wsize' ){
				return value;

			}

			if( !( sibling = __priv.getSibling() ) ){
				ui.value = 100;
				return 100;

			}
			dren = parentNode.children;
			width = 0;
			siblingWidth = 0;
			targetWidth = 0;

			for( c = 0; c < dren.length; c++ ){

				if( !( __id = __priv.isSibling( dren[c] ) ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isObject( get = data_.get( __id, _type ) ) ){
					continue;

				}
				sw = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: get.wsize, min: 10, default: 10 } );

				if( dren[c] === targetNode ){
					targetWidth = sw;
					continue;

				}

				if( dren[c] === sibling.node ){
					siblingWidth = sw;
					continue;

				}
				width = width + sw;

			}
			value = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: parseFloat( value ), min: 10, default: 10 } );
			delta = targetWidth - value;
			siblingWidth = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: ( siblingWidth + delta ), min: 10, default: 10 } );
			width = width + value + siblingWidth;

			if( width > 100 ){
				delta = width - 100;
				width = width - siblingWidth;
				siblingWidth = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: ( siblingWidth - delta ), min: 10, default: 10 } );
				width = width + siblingWidth;

				if( width > 100 ){
					delta = width - 100;
					width = width - value;
					value = _utils_sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: ( value - delta ), min: 10, default: 10 } );

				}


			}else if( width < 100 ){
				delta = 100 - width;
				value = value + delta;

			}
			data_.set( sibling.id, _type, { wsize: siblingWidth } );
			Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).column( sibling.id );
			ui.value = value;
			return value;

		}



	};

	if( !Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( ui ).isNode() || !( _id = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].id( target_.id() ) ) || !( _type = _utils_parse_js__WEBPACK_IMPORTED_MODULE_3__["default"].type( target_.type() ) ) || !targetNode ){
		return false;

	}

	if( ( index = nodeNames.indexOf( ui.nodeName.toLowerCase() ) ) < 0 ){
		return false;

	}


	if( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isString( ui.name ) || _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isStringEmpty( slug = _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].trim( _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].stripTags( ui.name ) ) ) ){
		return false;

	}
	uidata = _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isObject( uidata = data_.get( _id, _type ) ) ? uidata : {};
	data[slug] = _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].stripOnly( ui.value, '<script><link><body><html><meta>' );

	if( index === 2 && ui.type ){

		switch( ui.type.toLowerCase() ){

			case 'checkbox':
			data[slug] = ui.checked ? 'true' : 'false';
			break;

			case 'number':
			data[slug] = parseFloat( data[slug] );
			break;

			default:
			break;

		}
		
	}

	switch( _type ){

		case 'sections':
		data_.set( _id, 'sections', data );
		__core.background( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).child( 'cpb-sectionContent' ) );
		Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).section( _id );
		return;

		case 'rows':
		data_.set( _id, 'rows', data );
		__core.background( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).child( 'cpb-rowContent' ) );
		Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).row( _id );
		return;

		case 'columns':

		if( !( cvalue = __core.resizeColumns() ) ){
			return;

		}
		data[slug] = cvalue;
		data_.set( _id, 'columns', data );
		__core.background( Object(_utils_node_js__WEBPACK_IMPORTED_MODULE_6__["default"])( targetNode ).child( 'cpb-columnContent' ) );
		Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData(), 'css' ).column( _id );
		return;

		case 'elements':
		data_.set( _id, 'elements', data );

		if( !( re = Object(_utils_layout_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data_.getData() ).element( _id, true ) ) ){
			return false;

		}
		targetNode.parentNode.replaceChild( re, targetNode );
		Object(_panel_parts_editor_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
		return true;

		default:
		return false;

	}
	
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

            }

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

/***/ "./src/js/utils/css.js":
/*!*****************************!*\
  !*** ./src/js/utils/css.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _gradient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gradient.js */ "./src/js/utils/gradient.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");




const css = {};

function mu( top, right, bottom, left, vunit, hunit ){
	var x = null, y = null, o;

	function autoOrNumber( val ){

		if( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( val ) ){

			if( ( val = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( val.toLowerCase() ) ) === 'auto' ){
				return 'auto';

			}

		}
		return _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: val });

	}

	top = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( top );
	right = autoOrNumber( right );
	bottom = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( bottom );
	left = autoOrNumber( left );
	vunit = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].unit( vunit );
	hunit = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].unit( hunit );

	if( top === bottom ){
		y = top;
	}
	if( left === right ){
		x = left;
	}

	if( y !== null && x !== null ){
		if( y === x ){
			if( y === 0 ){
				return 0;
			}
			if( vunit === hunit ){
				return _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( y, vunit ) );
			}
		}
		return _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( y, vunit ) + ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( x, hunit ) );
	}
	o = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( top, vunit );
	o += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( right, hunit );
	o += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( bottom, vunit );
	if( x === null ){
		o += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( left, hunit );
	}
	return _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( o );


};

css.render = function( style, value ){

	if( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( style ) || ( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNumber( value ) && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( value ) ) ){
		return '';

	}
	style = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( style, ':' );

	return style + ':' + value + ';';
};

css.padding = function( top, right, bottom, left, vunit, hunit ){
	const _mu = mu( top, right, bottom, left, vunit, hunit );
	return ( _mu === '' ? '' : css.render( 'padding', _mu ) );
};

css.margin = function( top, right, bottom, left, vunit, hunit ){
	const _mu = mu( top, right, bottom, left, vunit, hunit );
	return ( _mu === '' ? '' : css.render( 'margin', _mu ) );
};

css.borderWidth = function( top, right, bottom, left ){
	const _mu = mu( top, right, bottom, left, 'px', 'px' );
	return ( _mu === '' ? '' : css.render( 'border-width', _mu ) );
};

css.borderRadius = function( top, right, bottom, left ){
	const _mu = mu( top, right, bottom, left, 'px', 'px' );
	var o;

	if( _mu !== '' ){
		o = css.render( 'border-radius', _mu );
		o += css.render( '-webkit-border-radius', _mu );
		o += css.render( '-moz-border-radius', _mu );
		return o;

	}
	return '';
	
};

css.border = function( entry ){
	const numb = { value: 0, min: 0, default: 0 };
	var t, r, b , l, x, y, o, w;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
		return '';

	}

	t = r = b = l = 0;
	x = y = null;

	switch( entry.style ){
		case 's':
		case 'sld':
		case 'solid':
		entry.style = 'solid';
		break;

		case 'dot':
		case 'dtd':
		case 'dotted':
		entry.style = 'dotted';
		break;

		case 'das':
		case 'dhd':
		case 'dashed':
		entry.style = 'dashed';
		break;

		case 'dbe':
		case 'dble':
		case 'double':
		entry.style = 'double';
		break;

		case 'in':
		case 'ins':
		case 'inner':
		case 'inset':
		entry.style = 'inset';
		break;

		case 'ou':
		case 'out':
		case 'outset':
		case 'outside':
		entry.style = 'outset';
		break;

		default:
		entry.style = 'none';

	}

	if( entry.style === 'none' || ( entry.color = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( entry.color ) ) === '' ){
		return '';

	}

	numb.value = entry.top;
	t = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( numb );

	numb.value = entry.right;
	r = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( numb );

	numb.value = entry.bottom;
	b = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( numb );

	numb.value = entry.left;
	l = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( numb );

	if( t === b ){
		y = t;

	}

	if( r === l ){
		x = r;

	}

	if( x !== null && y !== null ){

		if( x === y ){

			if( x === 0 ){
				return '';

			}
			o = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( y, 'px' );
			o += ' ' + entry.style;
			o += ' ' + entry.color;
			return css.render( 'border', o );

		}
		o = css.render( 'border-width', _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( y, 'px' ) + ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( x, 'px' ) );
		o += css.render( 'border-style', entry.style );
		o += css.render( 'border-color', entry.color );
		return o;

	}

	w = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( t, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( r, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( b, 'px' );

	if( x === null ){
		w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( l, 'px' );

	}

	o = css.render( 'border-width', w );
	o += css.render( 'border-style', entry.style );
	o += css.render( 'border-color', entry.color );
	return o;

};

css.textShadow = function( entry ){
	var w;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
		return '';
	}
	entry.blur = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.blur, default: 0, min: 0 } );
	entry.x = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.x, default: 0 } );
	entry.y = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 ) || ( entry.color = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( entry.color ) ) === '' ){
		return '';

	}
	w = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.x, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.y, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.blur, 'px' );
	w += ' ' + entry.color;

	return css.render( 'text-shadow', w );

};

css.boxShadow = function( entry ){
	var w, o;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
		return '';
	}
	function isInset(){
		const _in = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.inset ) || _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNumber( entry.inset ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( ( ( entry.inset ).toString() ).toLowerCase() ) : entry.inset;
		
		switch( _in ){
			case 'true':
			case true:
			case 'in':
			case 'inset':
			case '1':
				return true;
			default:
				return false;

		}

	}
	entry.blur = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.blur, default: 0, min: 0 } );
	entry.spread = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.spread, default: 0 } );
	entry.x = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.x, default: 0 } );
	entry.y = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 && entry.spread === 0 ) || ( entry.color = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( entry.color ) ) === '' ){
		return '';

	}
	w = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.x, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.y, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.blur, 'px' );
	w += ' ' + _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].valueUnit( entry.spread, 'px' );
	w += ' ' + entry.color;
	w += isInset() ? ' inset' : '';

	o = css.render( 'box-shadow', w );
	o += css.render( '-moz-box-shadow', w );
	o += css.render( '-webkit-box-shadow', w );

	return o;

};

css.background = function( entry ){
	const tools = {};
	var _grad, image, color, o, og, ou, tmp;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
		return '';

	}
	_grad = image = color = false;
	o = og = ou = '';
	color = ( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.type ) && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.type ).toLowerCase() === 'color' );

	tools.position = function( pos ){

		pos = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( pos ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( pos.toLowerCase() ) : '';

		switch( pos ){
			case 'lt':
			case 'leftop':
			case 'lefttop':
			case 'leftTop':
			return 'left top';

			case 'lc':
			case 'leftcenter':
			case 'leftCenter':
			return 'left center';

			case 'lb':
			case 'leftbottom':
			case 'leftBottom':
			return 'left bottom';

			case 'rt':
			case 'rightop':
			case 'righttop':
			case 'rightTop':
			return 'right top';

			case 'rc':
			case 'rightcenter':
			case 'rightCenter':
			return 'right center';

			case 'rb':
			case 'rightbottom':
			case 'rightBottom':
			return 'right bottom';

			case 'ct':
			case 'centertop':
			case 'centerTop':
			return 'center top';

			case 'cb':
			case 'centerbottom':
			case 'centerBottom':
			return 'center bottom';

			default:
			return 'center center';

		}

	};

	tools.repeat = function( rep ){

		rep = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( rep ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( rep.toLowerCase() ) : '';

		switch( rep ){
			case 'no':
			case 'nr':
			case 'no-repeat':
			case 'norepeat':
			case 'norep':
			return 'no-repeat';

			case 'x':
			case 'repeat-x':
			case 'repeatx':
			case 'repx':
			case 'rx':
			return 'repeat-x';

			case 'y':
			case 'repeat-y':
			case 'repeaty':
			case 'repy':
			case 'ry':
			return 'repeat-y';

			case 's':
			case 'space':
			case 'sp':
			return 'space';

			case 'rd':
			case 'round':
			return 'round';

			default:
			return 'repeat';
		}

	};

	tools.size = function( size ){

		size = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( size ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( size.toLowerCase() ) : '';

		switch( size ){

			case 'con':
			case 'contain':
			case 'container':
			return 'contain';

			case 'cov':
			case 'cover':
			return 'cover';

			default:
			return 'auto';

		}

	};

	tools.attachment = function( att ){

		att = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( att ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( att.toLowerCase() ) : '';

		switch( att ){
			case 'fix':
			case 'fixed':
			return 'fixed';

			default:
			return 'scroll';
		}

	};

	if( !color && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry.gradient ) && 'type' in entry.gradient && 'gradient' in entry.gradient && 'angle' in entry.gradient ){
		og = css.gradient( entry.gradient.type, entry.gradient.angle, entry.gradient.gradient );
		_grad = !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty( og );

	}

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( entry.color ) ) && color ){
		o += tmp;

	}


	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( entry.url ) ){
		image = true;
		ou = 'url(' + _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.url ) + ')';

	}

	if( _grad ){
		o += css.render( 'background-image', ou + ( image ? ', ' : ' ' ) + og );

	}else if( !_grad && image ){

		o += ' ' + ou;
	}

	if( 'repeat' in entry && image ){
		tmp = tools.repeat( entry.repeat );
		o += !_grad ? ' ' + tmp : css.render( 'background-repeat', tmp );

	}

	if( 'position' in entry && image ){
		tmp = tools.position( entry.position );
		o += !_grad ? ' ' + tmp : css.render( 'background-position', tmp );

	}

	if( !_grad ){
		o = css.render( 'background', _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( o ) );
	}

	if( 'att' in entry && image ){
		o += css.render( 'background-attachment', tools.attachment( entry.att ) );
	}

	if( 'size' in entry && image ){
		o += css.render( 'background-size', tools.size( entry.size ) );

	}

	return o;


};

css.gradient = function( style, angle, colors ){
	var c, color, g;

	if( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( colors ) || !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( ( colors = _gradient_js__WEBPACK_IMPORTED_MODULE_1__["default"].decode( colors ) ), 2 ) ){
		return '';

	}

	if( style === 'radial' ){
		angle = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( angle ) && [ 'side', 's', 'sd' ].indexOf( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( angle ) ) > -1 ? 'side' : 'corner';
		g = 'radial-gradient( farthest-' + angle;

	}else{
		g = 'linear-gradient(';
		angle = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: angle, min: 0, max: 360, default: 0 } );

		switch( angle ){
			case 0:
			case 360:
			g += 'to top';
			break;

			case 180:
			g += 'to bottom';
			break;

			case 270:
			g += 'to left';
			break;

			case 90:
			g += 'to right';
			break;

			case 45:
			g += 'to top right';
			break;

			case 135:
			g += 'to bottom right';
			break;

			case 225:
			g += 'to bottom left';
			break;

			case 315:
			g += 'to top left';
			break;
			
			default:
			g += angle + 'deg';

		}

	}
	colors.sort(function (a, b){ return a.stop - b.stop; });

	for( c = 0; c < colors.length; c++ ){
		color = colors[c];

		if( !( 'color' in color ) || !( 'stop' in color ) || isNaN( color.stop ) ){
			continue;

		}
		g += ',' + color.color + ' ' + color.stop + '%';

	}
	g += ')';
	return g;
	
};

css.responsive = function( device, css ){
	const width = device === 'm' ? 400 : 800;
	var o = '';

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( css ) ){
		o += '@media only screen and (max-width:' + width + 'px){';
		o += css;
		o += '}';
	}
	return o;

};

/* harmony default export */ __webpack_exports__["default"] = (css);

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

/***/ "./src/js/utils/element.js":
/*!*********************************!*\
  !*** ./src/js/utils/element.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html.js */ "./src/js/utils/html.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css.js */ "./src/js/utils/css.js");







/* harmony default export */ __webpack_exports__["default"] = (function( _slug, _id, _data ){

	const element = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getElement( _slug );

	const _u = {

		toObject: function( initial, need ){
			const obj = {};
			var i;

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( initial ) || !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray( need, 1 ) ){
				return {};

			}

			for( i in initial ){

				if( need.indexOf( i ) < 0 ){
					continue;

				}
				obj[i] = initial[i];

			}
			return obj;

		},

		toolkit: function( type ){
			const sn = [ 'unit', 'valueUnit', 'number', 'value', 'color', 'alignment', 'class' ];
			const un = [ 'toClass', 'getVideo','stripTags', 'escUrl', 'capitalize', 'isString', 'isStringEmpty', 'isNumber', 'isBool', 'isArray', 'isSet', 'trim', 'isObject', 'isFunction', 'foreachItem' ];
			const _d = {};
			_d.sanitize = _u.toObject( _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"], sn );
			_d.utils = _u.toObject( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"], un );

			switch( type ){

				case 'css':
				_d.css = _css_js__WEBPACK_IMPORTED_MODULE_5__["default"];
				break;

				case 'html':
				_d.html = _html_js__WEBPACK_IMPORTED_MODULE_3__["default"];
				break;

				default:
				break;

			}
			return _d;

		}

	};

	if( !( _id = _parse_js__WEBPACK_IMPORTED_MODULE_2__["default"].id( _id ) ) || _id < 0 || !element ){
		return false;

	}
	_data = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isObject( _data ) ? _data : {};

	return {

		view: function( _ui ){
			
			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( element.render.view ) || !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( _ui ).isNode() ){
				return false;

			}
			return Function('"use strict";return (function( id, data, ui, toolkit ){ ' + element.render.view + '})')()( _id, _data, _ui, _u.toolkit( 'html' ) );

		},

		css: function(){
			
			if( !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( element.render.css ) ){
				return false;

			}
			return Function('"use strict";return (function( id, data, toolkit ){ ' + element.render.css + '})')()( _id, _data, _u.toolkit( 'css' ) );

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

/***/ "./src/js/utils/gradient.js":
/*!**********************************!*\
  !*** ./src/js/utils/gradient.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");



const gradient = {};

gradient.encode = function( colors ){
	var color, a, c, o, p;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( colors, 2 ) ){
		return '';

	}
	o = '';

	for( a = 0; a < colors.length; a++ ){

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( color = colors[a] ) || !( 'color' in color ) || !( c  = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].color( color.color ) ) ){
			continue;

		}
		p = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: color.stop, min: 0, max: 100, default: 0, float: true } );
		o += ( o.length > 0 ? '+' : '' ) + p + 'z' + c;
		
	}
	return o;
	
};

gradient.decode = function( str ){
	const d1 = '+';
	const d2 = 'z';
	const o = [];
	var a, depth1, depth2, crt, c;

	if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( depth1 = ( str = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( str ) ).split( d1 ) ), 2 ) ){
		return false;

	}

	for( a = 0; a < depth1.length; a++ ){

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( crt = depth1[a] ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( depth2 = ( crt = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( crt ) ).split( d2 ) ), 2 ) || !( c = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].color( depth2[1] ) ) ){
			continue;

		}
		o[o.length] = {
			stop: _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number( { value: depth2[0], min: 0, max: 100, default: 0, float: true } ),
			color: c
		};

	}
	return o;
	
};

/* harmony default export */ __webpack_exports__["default"] = (gradient);


/***/ }),

/***/ "./src/js/utils/html.js":
/*!******************************!*\
  !*** ./src/js/utils/html.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _icon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon.js */ "./src/js/utils/icon.js");
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");







const html = {

    /* 
    type: default,
	inner: '',
	ed_id: 0,
	id: 0,
    match: 0,
	tag: div,
	classes: ''
	editable: false
    */
    
    content: function( entry ){
        const tags = [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'span', 'div', 'aside', 'code', 'pre', 'blockquote', 'article', 'section', 'main' ];
        var attr = '';
        var editable, content, tag, med_id, classes, o;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
            return '';

        }
        tag = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.tag ) ? ( tags.indexOf( tag = ( ( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.tag ) ).toLowerCase() ) ) > -1 ? tag : 'p' ) : 'p';
        editable = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBool( entry.editable ) ? entry.editable : false;
        content = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.inner ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].stripOnly( entry.inner, _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getAllowedTags( tag ) ) : '';
        classes = !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( entry.classes ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.classes ) : '';

        if( editable && !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( entry.match ) && ( entry.id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( entry.id ) ) ){
            classes += ' cpb-editable';
            attr = ' data-match="' + _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.match ) + '"';
            attr += ' data-id="' + entry.id + '"';

            if( content.length < 1 ){
                content = 'Write something here...';

            }

        } 
        o = '<' + tag;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( classes ) ){
            o += ' class="' + _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( classes ) + '"';

        }
        o += attr;
        o += '>';
        o += content;
        o += '</' + tag + '>';

        return o;

    },

    image: function( entry ){
        var classes, tmp, src, img;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) || _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( src = ( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.src ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].stripTags( entry.src ) ) : '' ) ) ){
            return false;

        }
        classes = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray( entry.classes ) ? entry.classes : [];
        classes[classes.length] = 'cpb-image';

        img = document.createElement( 'img' );
        img.className = classes.join( ' ' );
        img.src = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].escUrl( src );

        if( ( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: entry.width, min: 0 }) ) > 0 ){
            img.width = tmp;

        }

        if( ( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number({ value: entry.height, min: 0 }) ) > 0 ){
            img.height = tmp;

        }

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( tmp = ( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.alt ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].stripTags( entry.alt ) ) : '' ) ) ){
            img.alt = tmp;

        }

        if( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBool( entry.auto ) && entry.auto === true ){

            img.onload = function(){
                this.width = this.naturalWidth;
                this.height = this.naturalHeight;

            };

        }
        return img;

    },

    icon: function( entry ){
        const decoded = _icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].decode( entry );

        return ( !decoded ? '' : _icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].get_svg( decoded.set_id, decoded.icon_id ) );

    },

    element: function( opts, ondone ){
        var id;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( opts ) || !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction( ondone ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( opts.id ) ) ){
            return false;

        }

        Object(_ajax_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            action: ( cometdata.admin === 'true' ? 'comet_ajAdmin' : 'comet_ajPublic' ),
            do: 'element',
            element: _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( opts.element ),
            id: id,
            data: JSON.stringify( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( opts.data ) ? opts.data : {} )

        }).done( ondone );
        //return '<span class="cometPending">...</span>';

    },

    placeholder: function(){
        return '<div class="cpb-empty cpb-placeholder"><span>Placeholder</span></div>';

    }

};

/* harmony default export */ __webpack_exports__["default"] = (html);

/***/ }),

/***/ "./src/js/utils/icon.js":
/*!******************************!*\
  !*** ./src/js/utils/icon.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");


const __icon = {

	get_set: function( set_id ){
		const sets = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSvgSets();

		return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( set_id ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets[set_id] ) ? sets[set_id] : {} );

	},

	get_icon: function( set_id, icon_id ){
		var set;

		if( !__icon.icon_exists( set_id, icon_id ) ){
			return false;

		}
		set = __icon.get_set( set_id );

		return set.set[icon_id];

	},

	get_svg: function( set_id, icon_id ){
		const icon = __icon.get_icon( set_id, icon_id );

		return ( !icon ? '' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + icon.width + ' ' + icon.height + '">' + icon.path + '</svg>' );

	},

	get_svg_from_data: function( data ){

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( data ) && 'width' in data && 'height' in data && 'path' in data ){
			return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + data.width + ' ' + data.height + '">' + data.path + '</svg>';

		}
		return '';

	},

	set_exists: function( set_id ){
		const sets = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSvgSets();

		return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( set_id ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( sets[set_id] ) );

	},

	icon_exists: function( set_id, icon_id ){
		const set = __icon.get_set( set_id );

		return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( icon_id ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( set ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( set.set ) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( set.set[icon_id] ) );

	},

	decode: function( entry ){
		var sets;

		if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( entry ) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( ( entry = ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( entry ) ).split( ':' ) ), 2 ) ){
			return false;

		}

		return {
			set_id: entry[0],
			icon_id: entry[1]
		};

	},

	encode: function( set_id, icon_id ){

		return ( !__icon.icon_exists( set_id, icon_id ) ? false : set_id + ':' + icon_id );

	}
	
};

/* harmony default export */ __webpack_exports__["default"] = (__icon);

/***/ }),

/***/ "./src/js/utils/layout.js":
/*!********************************!*\
  !*** ./src/js/utils/layout.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_target_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../editor/target.js */ "./src/js/editor/target.js");
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element.js */ "./src/js/utils/element.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.js */ "./src/js/utils/style.js");
/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css.js */ "./src/js/utils/css.js");








/* harmony default export */ __webpack_exports__["default"] = (function ( data, g_css ){

	const _d = document;

	const _priv = {

		css: function( id, type, dt ){
			var o, tmp, classe, br, bo, bg, pad, mar;

			if( [ 'sections', 'rows', 'columns' ].indexOf( type ) < 0 || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( dt ) ){
				return '';

			}

			classe = '.cpb-';

			switch( type ){
				case 'sections':
				classe += 'section-' + id + '.cpb-section > .cpb-sectionContent';
				break;

				case 'rows':
				classe += 'row-' + id + '.cpb-row';
				break;

				case 'columns':
				classe += 'column-' + id + '.cpb-column';
				break;

				default:
				return '';

			}

			bg = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].background({
				type: dt.bgt,
				gradient: {
					type: dt.bgor,
					gradient: dt.gradient,
					angle: dt.bgor === 'radial' ? dt.shape : dt.angle

				},
				color: dt.bgc,
				url: dt.image,
				position: dt.pos,
				repeat: dt.repeat,
				size: dt.size,
				att: dt.att,

			});

			bo = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].border({
				color: dt.bc,
				style: dt.bs,
				top: dt.bwt,
				right: dt.bwr,
				bottom: dt.bwb,
				left: dt.bwl,
			});

			br = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].borderRadius( dt.bradt, dt.bradr, dt.bradb, dt.bradl );
			pad = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].padding( dt.padt, dt.padr, dt.padb, dt.padl, 'px', 'px' );
			mar = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].margin( dt.mart, dt.marr, dt.marb, dt.marl, 'px', 'px' );

			switch( type ){

				case 'sections':
				o = classe + '{' + bg + bo + mar + pad + br + '}';
				break;

				case 'rows':
				o = '';

				if( dt.width === 'cust' && ( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number({ value: dt.wsize, min: 300 }) ) !== null && tmp >= 300 ){
					o += classe + '{' + _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].render( 'max-width', tmp + 'px' ) + '}';

				}
				classe += ' .cpb-rowContent';
				o += classe + '{' + bg + bo + pad + br + mar;

				switch( dt.alg ){

					case 't':
					o += _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].render( 'align-items', 'flex-start' );
					break;

					case 'b':
					o += _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].render( 'align-items', 'flex-end' );
					break;

					case 'c':
					o += _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].render( 'align-items', 'center' );
					break;
				}
				o += '}';
				break;

				case 'columns':
				o = '';

				if( ( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].number({ value: dt.wsize, min: 10, max: 100 }) ) !== null ){
					o += classe + '{' + _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].render( 'width', tmp + '%' ) + '}';

				}
				classe += ' .cpb-columnContent';
				o += classe + '{' + bg + bo + pad + br + mar + '}';
				break;

				default:
				return '';
			}

			if( 'ov' in dt && 'ovc' in dt ){

				if( [ 'true', true ].indexOf( dt.ov ) > -1 && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isEmpty( tmp = _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].color( dt.ovc ) ) ){

					o += classe + ' > .cpb-backgroundComponents > .cpb-backgroundOverlay{background:' + tmp + ';}';

					if( br !== '' ){
						o += classe + ' > .cpb-backgroundComponents{' + br + '}';
					}
				}
			}
			pad = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].padding( dt.padtt, dt.padrt, dt.padbt, dt.padlt, 'px', 'px' );
			mar = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].margin( dt.martt, dt.marrt, dt.marbt, dt.marlt, 'px', 'px' );

			if( pad !== '' || mar !== '' ){
				o += '.cpb-tabletMode ' + classe + '{' + pad + mar + '}';
				o += _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].responsive( 't', classe + '{' + pad + mar + '}' );

			}
			pad = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].padding( dt.padtm, dt.padrm, dt.padbm, dt.padlm, 'px', 'px' );
			mar = _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].margin( dt.martm, dt.marrm, dt.marbm, dt.marlm, 'px', 'px' );

			if( pad !== '' || mar !== '' ){
				o += '.cpb-mobileMode ' + classe + '{' + pad + mar + '}';
				o += _css_js__WEBPACK_IMPORTED_MODULE_6__["default"].responsive( 'm', classe + '{' + pad + mar + '}' );

			}

			Object(_style_js__WEBPACK_IMPORTED_MODULE_5__["default"])( id, type ).insert( o );

		},

		hasConnection: function( connection ){
			return ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data[connection] ) );

		},

		backgroundTags: function( dt ){
			const url = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( dt.vurl ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( dt.vurl ) ) : '';
			var o = '<div class="cpb-backgroundComponents">';

			if( [ 'true', true ].indexOf( dt.vid ) > -1 && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isEmpty( url ) ){
				o += '<video class="cpb-backgroundVideo" src="' + _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].escUrl( url ) + '" muted loop autoplay preload="auto"></video>';

			}

			if( [ 'true', true ].indexOf( dt.ov ) > -1 && 'ovc' in dt ){
				o += '<div class="cpb-backgroundOverlay"></div>';

			}
			o += '</div>';

			return o;

		}

	};

	const prop = {

		css: false,

		init: function( parent, from ){
			var _do, ids, s, fragment, section;

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data._sections ) || !_priv.hasConnection( 'sections' ) ){
				return false;

			}

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].ids( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data._sections ), 'array' ) ), 1 ) ){
				return false;

			}
			_do = 0;
			from = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( from );
			fragment = _d.createDocumentFragment();

			for( s = 0; s < ids.length; s++ ){

				if( _do !== 1 && from !== false && from !== ids[s] ){
					continue;

				}

				if( !( section = prop.section( ids[s] ) ) ){
					continue;

				}
				fragment.appendChild( section );
				_do = 1;

			}
			parent.appendChild( fragment );
			return true;

		},

		section: function( id ){
			var html, section, cl, r, ids, fragment, row;

			if( !_priv.hasConnection( 'sections' ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.sections[id] ) ){
				return false;

			}
			_priv.css( id, 'sections', data.sections[id] );

			if( g_css ){
				return true;

			}
			cl = 'cpb-section-' + id;
			cl += ' cpb-section';

			html = '<div class="cpb-rows cpb-sectionContent">';
			html += _priv.backgroundTags( data.sections[id] );
			html += '</div>';

			section = _d.createElement( 'div' );
			section.className = cl;
			section.dataset.id = id;
			section.innerHTML = html;

			if( _priv.hasConnection( 'rows' ) && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data.sections[id]._rows ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].ids( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.sections[id]._rows ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( r = 0; r < ids.length; r++ ){

					if( !( row = prop.row( ids[r] ) ) ){
						continue;

					}
					fragment.appendChild( row );

				}
				section.firstChild.appendChild( fragment );

			}
			return section;

		},

		row: function( id ){
			var c, html, row, ids, cl, nb, fragment, column;

			if( !_priv.hasConnection( 'rows' ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.rows[id] ) ){
				return false;

			}
			_priv.css( id, 'rows', data.rows[id] );

			if( g_css ){
				return true;

			}

			cl = 'cpb-row';
			cl += ' cpb-row-' + id;

			html = '<div class="cpb-rowContent" data-ncol="0">';
			html += _priv.backgroundTags( data.rows[id] );
			html += '</div>';

			row = _d.createElement( 'div' );
			row.className = cl;
			row.dataset.id = id;
			row.innerHTML = html;

			nb = 0;

			if( _priv.hasConnection( 'columns' ) && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data.rows[id]._columns ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].ids( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.rows[id]._columns ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( c = 0; c < ids.length; c++ ){

					if( !( column = prop.column( ids[c] ) ) ){
						continue;

					}
					fragment.appendChild( column );
					nb++;
				}
				row.firstChild.appendChild( fragment );

			}
			row.firstChild.dataset.ncol = nb;
			return row;

		},

		column: function( id ){
			var e, html, column, ids, cl, tmp, fragment, element;

			if( !_priv.hasConnection( 'columns' ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.columns[id] ) ){
				return false;

			}
			_priv.css( id, 'columns', data.columns[id] );

			if( g_css ){
				return true;

			}

			cl = 'cpb-column';
			cl += ' cpb-column-' + id;

			html = '<div class="cpb-columnContent">';
			html += _priv.backgroundTags( data.columns[id] );
			html += '</div>';

			column = _d.createElement( 'div' );
			column.className = cl;
			column.dataset.id = id;
			column.innerHTML = html;

			if( _priv.hasConnection( 'elements' ) && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data.columns[id]._elements ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( ( ids = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].ids( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.columns[id]._elements ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( e = 0; e < ids.length; e++ ){

					 if( !( element = prop.element( ids[e] ) ) ){
					 	continue;

					 }
					 fragment.appendChild( element );
				}
				column.firstChild.appendChild( fragment );

			}
			return column;

		},

		element: function( id, updating ){
			var cl, element, fragment, el;

			if( !_priv.hasConnection( 'elements' ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.elements[id] ) || _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data.elements[id]._type ) ){
				return false;

			}

			if( !( el = Object(_element_js__WEBPACK_IMPORTED_MODULE_2__["default"])( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.elements[id]._type ), id, _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].data( data, id ) ) ) ){
				return false;

			}
			Object(_style_js__WEBPACK_IMPORTED_MODULE_5__["default"])( id, 'elements' ).insert( el.css() );

			if( g_css ){
				return true;
				
			}
			fragment = _d.createDocumentFragment();
			element = _d.createElement( 'div' );
			fragment.appendChild( element );

			cl = 'cpb-element';
			cl += ' cpb-element' + _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].capitalize( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.elements[id]._type ) );
			cl += ' cpb-elementNode' + id;

			console.time("element");
			element.className = cl;
			element.dataset.id = id;
			element.innerHTML = '<div class="cpb-elementContent"></div>';
			el.view( element );
			console.timeEnd("element");

			if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( updating ) && updating ){
				Object(_editor_target_js__WEBPACK_IMPORTED_MODULE_0__["default"])().set({node: element });

			}
			return fragment;

		},

	};
	g_css = ( ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( g_css ) && g_css === true ) || ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( g_css ) && 'css' === _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( g_css.toLowerCase() ) ) );
	prop.css = g_css;

	return prop;

});;


/***/ }),

/***/ "./src/js/utils/load.js":
/*!******************************!*\
  !*** ./src/js/utils/load.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.js */ "./src/js/utils/layout.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ajax.js */ "./src/js/utils/ajax.js");





const load = {

	comet: function( data, from, empty ){
		const frame = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getNode( 'frame' );

		if( !frame || frame === null ){
			return;

		}
		empty  = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBool( empty ) ? empty : false;

		if( empty ){
			frame.innerHTML = '';

		}
		Object(_layout_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data ).init( frame, from );

	}

};

/* harmony default export */ __webpack_exports__["default"] = (load);

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
		var field, f, fields, opts, o;

		if( prop.isNode() && node.nodeName.toLowerCase() === 'form' && ( fields = from.elements ).length > 0 ){

			for( f in fields ){
				field = fields[f];
				type = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( field.type ) ? _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( field.type.toLowerCase() ) : '';

				if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( field.name ) || field.disabled || exc.indexOf( type ) > -1 ){
					continue;

				}

				if( type === 'select-multiple' && ( opts = field.options ).length > 0 ){

					for( o in opts ){

						if( opts[o].selected ){
							s[s.length] = encodeURIComponent( field.name ) + "=" + encodeURIComponent( opts[o].value );

						}

					}

				}else if( ( type !== 'checkbox' && type !== 'radio' ) || field.checked ){
					s[s.length] = encodeURIComponent( field.name ) + "=" + encodeURIComponent( field.value );

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

	/*if( type === 'object' && 'value' in entry ){
		v = entry.value;
	}
	if( typeof v === 'string' ){
		v = parseFloat( v );
	}
	if( typeof v !== 'number' || isNaN( v ) ){
		if( type === 'object' && 'default' in entry ){
			return sanitize.number( { value: entry.default, default: 0 } );
		}
		return '';
	}
	return v;*/
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

	return ( value === 0 ? value.toString() : value + unit );
};

sanitize.unit = function( unit ){

	unit = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( unit );

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
	return o;

};

sanitize.post = function( str ){
	const allowed = '<br><img><p><a><u><strike><b><strong><i><ins><del><hr><caption><span><h1><h2><h3><h4><h5><h6><sub><sup><title>';

	return ( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStringEmpty( str ) ? _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].stripTags( str, allowed ) : '' );

}

sanitize.class = function( str, prefix ){

	return ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toClass( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( prefix ) ? prefix : '' ) + _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toClass( str ) );

}

sanitize.alignment = function( entry ){
	const c = 'cpb-align';
	entry = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( entry ) ? ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim( entry ) ).toLowerCase() : entry;

	switch( entry ){
		case 'l':
		case 'left':
		case '<':
		return c + 'Left';

		case 'r':
		case 'right':
		case '>':
		return c + 'Right';

		case 'j':
		case 'justify':
		case '=':
		return c + 'Justify';

		case 'm':
		case 'middle':
		return c + 'Middle';

		case 't':
		case 'top':
		case '^':
		return c + 'Top';

		case 'b':
		case 'bottom':
		case 'v':
		return c + 'Bottom';

		default:
		return c + 'Center';
	}

}

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

/***/ "./src/js/utils/style.js":
/*!*******************************!*\
  !*** ./src/js/utils/style.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node.js */ "./src/js/utils/node.js");




/* harmony default export */ __webpack_exports__["default"] = (function( id, type ){

	const _d = document;

	const _priv = {

		id: function(){
			var s_id;

			if( !( id = _parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].id( id ) ) || !( type = _parse_js__WEBPACK_IMPORTED_MODULE_0__["default"].type( type ) ) ){
				return false;

			}
			s_id = 'cpb-style';
			s_id += _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].capitalize( type );
			s_id += id;

			return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( s_id );

		},

		node: function( s_id ){
			const s = !_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStringEmpty( s_id ) ? _d.getElementById( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( s_id ) ) : false;

			return ( s && Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( s ).isNode() && s.nodeName.toLowerCase() === 'style' ? s : false );


		},

		add: function( css, onold ){
			const _style = prop.create( css );
			var old = false;

			if( !_style ){
				return false;

			}

			if( !( old = _priv.node( _style.id ) ) ){
				_d.head.appendChild( _style );
				return true;
			}

			if( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction( onold ) ){
				return onold( _style, old );

			}
			return false;

		}

	};

	const prop = {

		create: function( css ){
			const s_id = _priv.id();
			var _style = null;
			//var classes;

			css = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString( css ) ? _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].stripTags( css ) ) : null;

			if( !s_id || css === null ){
				//return '';
				return false;

			}
			//classes = 'cpb-style ' + s_id;
			//return '<style id="' + s_id + '" class="' + classes + '">' + utils.trim( utils.stripTags( css ) ) + '</style>';
			_style = _d.createElement( 'style' );
			_style.id = s_id;
			_style.className = 'cpb-style ' + s_id;
			_style.innerHTML = css;

			return _style;

		},

		add: function( css ){
			/*var _css, p, nhtml;

			function cur( ar ){
				var a, ara;

				for( a in ar ){
					if( !( ara = node( ar[a] ) ) || !ara.isNode() || ara.prop().nodeName.toLowerCase() !== 'style' ){
						continue;

					}

					if( ( p = parse.style( ara.prop().id ) ) ){
						node( p ).remove();

					}
					document.head.appendChild( ara.prop() );

				}

			}

			if( utils.isString( css ) ){
				nhtml = parse.html( css );

				if( utils.isObject( nhtml ) ){
					cur( nhtml );
					return true;

				}
				return false;

			}

			if( ( ( _css = node( css ) ).isNode() ) && _css.prop().nodeName.toLowerCase() === 'style' ){

				if( ( p = parse.style( _css.prop().id ) ) ){
					node( p ).remove();

				}
				document.head.appendChild( _css.prop() );
				return true;

			}

			if( utils.isObject( _css ) && _css.length > 0 ){
				cur( _css );
				return true;

			}
			return false;*/

			return _priv.add( css );


		},

		insert: function( css ){
			/*const s_id = createId( id, type );
	var s;

	if( !s_id || utils.isStringEmpty( css ) ){
		return false;

	}
	css = utils.stripTags( css );

	if( ( s = parse.style( s_id ) ) ){
		s.innerHTML = css;
		return;

	}
	s = document.createElement( 'style' );
	s.id = s_id;
	s.className = 'cpb-style ' + s_id;
	s.innerHTML = css;*/


			return _priv.add( css, function( _style, old ){

				if( old.parentNode !== null ){
					old.parentNode.replaceChild( _style, old );
					return true;
				}
				return false;

			});
	
},

get: function(){
	const s_id = _priv.id( id, type );
	return _priv.node( s_id );

},

remove: function(){
	const s = prop.get( id, type );

	if( !s || s.parentNode === null ){
		return false;

	}
	s.parentNode.removeChild( s );
	return true;

}

};

return prop;
});

/***/ }),

/***/ "./src/js/utils/ui/color-picker.js":
/*!*****************************************!*\
  !*** ./src/js/utils/ui/color-picker.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range.js */ "./src/js/utils/ui/range.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node.js */ "./src/js/utils/node.js");




/* harmony default export */ __webpack_exports__["default"] = (function( source, options ){

    if( !source ){
        return;

    }

    var dragging = false;

    const hsb_ = [];

    const dColor = {
        type: 'hex',
        value: '#FFFFFF',
        data: [ '#', 'FFFFFF' ],
        hsb: [ 0, 0, 1 ],
        alpha: 1
    };

    const parse = {

        value: function( x, min, max, dft, float ){

            if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( x ) ){
                x = float ? parseFloat( x ) : parseInt( x );

                if( x >= min && x <= max ){
                    return x;

                }

            }
            return dft;

        },

        color: function( x ){
            var tmp;

            if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isEmpty( x ) ){
                return null;

            }

            if( ( tmp = this.rgb_( x ) ) !== null ){
                return tmp;

            }

            if( ( tmp = this.hex( x ) ) !== null ){
                return tmp;

            }
            return null;

        },

        hex: function( x ){
            const regex = /([0-9a-f]{6}|[0-9a-f]{3})/i;
            var match, value, last, a;

            if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) ){

                if( ( match = x.match( regex ) ) !== null && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( match[1] ) ){
                    value = match[1];

                    if( value.length === 3 ){
                        last = value.charAt(2);

                        for( a = 0; a < 3; a++ ){
                            value += last;

                        }

                    }
                    return {
                        type: 'hex',
                        value: toSprint( 'hex', value ),
                        data: [ '#', value ],
                        hsb: convert.hexhsb( value ),
                        alpha: 1
                    };

                }
            }
            return null;

        },

        rgb_: function( x ){
            const regex = /(rgba?)\(\s*(\d{1,3})\s*\,\s*(\d{1,3})\s*\,\s*(\d{1,3})\s*(\,\s*([\d\.]+)\s*)?\)/i;
            var match, type, r, g, b, a;

            if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) ){

                if( ( match = x.match( regex ) ) !== null && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( match[1] ) && ( ( type = match[1].toLowerCase() ) === 'rgba' || type === 'rgb' ) ){

                    r = this.value( match[2], 0, 255, 0 );
                    g = this.value( match[3], 0, 255, 0 );
                    b = this.value( match[4], 0, 255, 0 );
                    a = this.value( match[6], 0, 1, 1, true );

                    return {
                        type: type,
                        value: toSprint( type, [ r, g, b, a ] ),
                        data: [ type, r, g, b, a ],
                        hsb: convert.rgbhsb( [ r, g, b ] ),
                        alpha: a

                    }

                }
            }
            return null;

        },

    };

    const convert = {

        hexrgb: function( x ){

            if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) || x.length !== 6 ){
                return null;

            }

            return [
            parseInt( x.substring( 0, 2 ), 16 ),
            parseInt( x.substring( 2, 4 ), 16 ),
            parseInt( x.substring( 4, 6 ), 16 )
            ];

        },

        rgbhex: function( x ){
            var s;

            if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( x, 3 ) ){
                return '';

            }
            s = +x[2] | ( +x[1] << 8 ) | ( +x[0] << 16 );
            s = '000000' + s.toString( 16 );
            return s.slice( -6 );

        },

        rgbhsb: function( x ){
            const r = +x[0];
            const g = +x[1];
            const b = +x[2];
            const max = Math.max( r, g, b );
            const min = Math.min( r, g, b );
            const d = max - min;
            const s = ( max === 0 ? 0 : d / max );
            const v = max / 255;
            var h;

            switch ( max ){
                case min:
                h = 0;
                break;

                case r:
                h = ( g - b ) + d * ( g < b ? 6 : 0 );
                h /= 6 * d;
                break;

                case g:
                h = ( b - r ) + d * 2;
                h /= 6 * d;
                break;

                case b:
                h = ( r - g ) + d * 4;
                h /= 6 * d;
                break;

            }
            return [h, s, v];

        },

        hsbrgb: function( x ){
            var r, g, b;
            const h = +x[0];
            const s = +x[1];
            const v = +x[2];
            var i = Math.floor( h * 6 );
            const f = h * 6 - i;
            const p = v * ( 1 - s );
            var q = v * ( 1 - f * s );
            var t = v * ( 1 - ( 1 - f ) * s );

            r = g = b = 0;

            i = i || 0;
            q = q || 0;
            t = t || 0;

            switch ( i % 6 ){
                case 0:
                r = v, g = t, b = p;
                break;

                case 1:
                r = q, g = v, b = p;
                break;

                case 2:
                r = p, g = v, b = t;
                break;

                case 3:
                r = p, g = q, b = v;
                break;

                case 4:
                r = t, g = p, b = v;
                break;

                case 5:
                r = v, g = p, b = q;
                break;

            }
            return [round(r * 255), round(g * 255), round(b * 255)];

        },

        hexhsb: function( x ){
            return this.rgbhsb( this.hexrgb( x ) );

        },

        hsbhex: function( x ){
            return this.rgbhex( this.hsbrgb( x ) );
            
        },

    };

    const on = {

        saturation: function( selector, data ){

            if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).isNode() ){
                return;

            }

            function saturation( ev, ui ){
                ev.preventDefault();
                ev.stopPropagation();
                const type = ev.type;
                var color = '';
                var dt, _sat, dx, dy, x, y, rec, width, height, dw, s, b, px, py, dw2;

                if( type === 'mousedown' && type !== 'click' ){
                    dragging = true;

                }

                if( ( type !== 'mousemove' || !dragging ) && type !== 'click' ){
                    return;

                }

                if( !( _sat = Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ui ) ) || !( width = _sat.width() ) || !( height = _sat.height() ) ){
                    return;

                }

                if( !( x = ( rec = ui.getBoundingClientRect() ).left ) || !( y = rec.top ) ){
                    return;

                }
                px = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( px = parseInt( ev.pageX - x ) ) && px > 0 ? px : 0;
                py = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber( py = parseInt( ev.pageY - y ) ) && py > 0 ? py : 0;
                dw = ( dw = Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( data.dragger ).width() ) > 0 ? dw : 0;
                dw2 = dw / 2;

                dx = px - dw2;
                dy = py - dw2;

                dx = dx > ( width - dw2 ) ? width - dw2 : ( dx < 0 ? -dw2 : dx );
                dy = dy > ( height - ( dw / 2 ) ) ? height - dw2 : ( dy < 0 ? -dw2 : dy );

                data.dragger.style.left = parseInt( dx ) + 'px';
                data.dragger.style.top = parseInt( dy ) + 'px';

                s = px / ( width - 1 );
                b = 1 - py / ( height - 1 );

                s = s < 0 ? 0 : ( s > 1 ? 1 : s );
                b = b < 0 ? 0 : ( b > 1 ? 1 : b );

                hsb_[1] = s;
                hsb_[2] = b;

                dt = {
                    render: data.render,
                    source: data.source
                };

                if( options.input ){
                    dt.input = data.input;

                }
                color = setComponents( dt );

                if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.onchange ) ){
                    options.onchange( selector, data.source, color );

                }

            }

            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).on( 'mousemove mousedown click', saturation );

        },

        click: function( ev, ui, data ){
            var color, rec, picker, sat, dragger, wrap, whue, hue, wopacity, opacity, winput, input;

            if( close() ){
                return;

            }
            color = ( color = parse.color( data.source.value ) ) === null ? dColor : color;
            hsb_[0] = color.hsb[0];
            hsb_[1] = color.hsb[1];
            hsb_[2] = color.hsb[2];
            hsb_[3] = color.alpha;

            rec = ui.getBoundingClientRect();
            picker = document.createElement( 'div' );
            picker.className = 'comet-colorPicker';
            picker.style.left = rec.left + 'px';
            picker.style.top = ( rec.top + Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ui ).height() ) + 'px';
            document.body.appendChild( picker );

            sat = document.createElement( 'div' );
            sat.className = 'comet-cpSat';
            picker.appendChild( sat );
            data.sat = sat;

            dragger = document.createElement( 'button' );
            dragger.className = 'comet-cpDragger';
            sat.appendChild( dragger );
            data.dragger = dragger;

            wrap = document.createElement( 'div' );
            wrap.className = 'comet-cpContent';
            picker.appendChild( wrap );

            whue = document.createElement( 'div' );
            whue.className = 'comet-cpwHue';
            wrap.appendChild( whue );

            hue = document.createElement( 'input' );
            hue.className = 'comet-cpHue';
            hue.type = 'hidden';
            hue.setAttribute( 'min', 0 );
            hue.setAttribute( 'max', 360 );
            hue.setAttribute( 'step', 1 );
            whue.appendChild( hue );
            data.hue = hue;

            if( options.opacity ){

                wopacity = document.createElement( 'div' );
                wopacity.className = 'comet-cpwOpacity';
                wrap.appendChild( wopacity );

                opacity = document.createElement( 'input' );
                opacity.className = 'comet-cpOpacity';
                opacity.type = 'hidden';
                opacity.setAttribute( 'min', 0 );
                opacity.setAttribute( 'max', 1 );
                opacity.setAttribute( 'step', 0.01 );
                wopacity.appendChild( opacity );
                data.opacity = opacity;

            }

            if( options.input ){

                winput = document.createElement( 'div' );
                winput.className = 'comet-cpwInput';
                wrap.appendChild( winput );

                input = document.createElement( 'input' );
                input.className = 'comet-cpInput';
                input.type = 'text';
                winput.appendChild( input );
                data.input = input;

            }

            setComponents( data );

            on.saturation( sat, data );

            on.hue( hue, data );

            on.opacity( opacity, data );

            on.input( input, data );

        },

        hue: function( selector, data ){

            if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).isNode( ) ){
                return;

            }

            Object(_range_js__WEBPACK_IMPORTED_MODULE_1__["default"])( selector, {
                change: function( ev, ui, dt ){
                    const vhue = dt.value / 360;
                    var color = '';
                    hsb_[0] = vhue;
                    data.hsb = hsb_;
                    data.sat.style.backgroundColor = toSprint( 'hex', convert.hsbhex( [ vhue, 1, 1 ] ) );
                    color = setComponents( { input: data.input, source: data.source, render: data.render } );

                    if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.onchange ) ){
                        options.onchange( selector, data.source, color );

                    }

                }
            });

        },

        opacity: function( selector, data ){

            if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).isNode( ) ){
                return;

            }

            Object(_range_js__WEBPACK_IMPORTED_MODULE_1__["default"])( selector, {
                change: function( ev, ui, dt ){
                    const alpha = parse.value( dt.value, 0, 1, 1, true );
                    var color = '';
                    hsb_[3] = alpha;
                    data.hsb = hsb_;
                    data.alpha = alpha;
                    color = setComponents( { source: data.source, input: data.input, render: data.render } );

                    if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.onchange ) ){
                        options.onchange( selector, data.source, color );

                    }

                }
            });

        },

        input: function( selector, data ){

            if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).isNode() ){
                return;

            }

            function input( ev, ui ){
                ev.preventDefault();
                const val = ev.type === 'paste' ? ( ev.clipboardData || window.clipboardData ).getData( 'text' ) : ui.value;
                const value = parse.color( val );
                var color = '';

                if( value === null ){
                    ui.value = '';
                    return;

                }
                hsb_[0] = value.hsb[0];
                hsb_[1] = value.hsb[1];
                hsb_[2] = value.hsb[2];
                hsb_[3] = value.alpha;
                color = setComponents( data );

                if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.onchange ) ){
                    options.onchange( selector, data.source, color );

                }

            }
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( selector ).on( 'change paste cut', input );

        },

        clear: function( ev, ui, data ){
            ev.preventDefault();

            data.source.value = '';
            data.render.style.backgroundColor = '';

            if( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction( options.onchange ) ){
                options.onchange( ui, data.source, '' );

            }

        }

    }

    function round( x ){

        return Math.round( x );

    }

    function toSprint( type, x ){

        switch( type ){
            case '#':
            case 'hex':
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString( x ) ? ( x.charAt(0) !== '#' ? '#' + x : x ) : '';

            case 'rgb':
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( x, 3 ) ? 'rgb(' + x[0] + ',' + x[1] + ',' + x[2] + ')' : '';

            case 'rgba':
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( x, 4 ) ? 'rgba(' + x[0] + ',' + x[1] + ',' + x[2] + ',' + x[3] + ')' : '';

            case 'hsl':
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( x, 3 ) ? 'hsl(' + x[0] + ',' + x[1] + ',' + x[2] + ')' : '';

            case 'hsla':
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( x, 4 ) ? 'hsla(' + x[0] + ',' + x[1] + ',' + x[2] + ',' + x[3] + ')' : '';

            default:
            return '';

        }

    }

    function toColor(){
        var alpha, x;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( hsb_, 3 ) ){
            return '';

        }
        alpha = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSet( hsb_[3] ) ? parse.value( hsb_[3], 0, 1, 1, true ) : 1;

        if( alpha === 1 ){
            x = convert.hsbhex( [ hsb_[0], hsb_[1], hsb_[2] ] );
            return toSprint( 'hex', x );

        }
        x = convert.hsbrgb( [ hsb_[0], hsb_[1], hsb_[2] ] );
        return toSprint( 'rgba', [ x[0], x[1], x[2], alpha ] );

    }

    function setComponents( components ){
        var color, _sat, width, height;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( components ) ){
            return;

        }
        color = toColor();

        if( components.dragger && components.sat ){

            components.sat.style.backgroundColor = toSprint( 'hex', convert.hsbhex( [ hsb_[0], 1, 1 ] ) );

            if( ( _sat = Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( components.sat ) ) && ( width = _sat.width() ) && ( height = _sat.height() ) ){
                components.dragger.style.left = ( hsb_[1] * ( width - 1 ) ) + 'px';
                components.dragger.style.top = -( ( hsb_[2] - 1 ) * ( height - 1 ) ) + 'px';
            }

        }

        if( components.opacity ){
            components.opacity.value = parse.value( ( hsb_[3] || 0 ), 0, 1, 1, true );
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( components.opacity ).trigger( 'setValue' );

        }

        if( components.hue ){
            components.hue.value = parse.value( ( hsb_[0] || 0 ) * 360, 0, 360 );
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( components.hue ).trigger( 'setValue' );

        }

        if( components.input ){
            components.input.value = color;

        }

        if( components.source ){
            components.source.value = color;

        }

        if( components.render ){
            components.render.style.backgroundColor = color;

        }
        return color;

    }

    function close(){
        const pickers = document.getElementsByClassName( 'comet-colorPicker' );

        if( pickers.length > 0 ){
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( pickers ).remove();
            return true;

        }
        return false;

    }

    function create( ui ){
        const data = {};
        var render, color, clear;

        if( !ui.parentNode ){
            return;

        }

        if( options.clear ){
            clear = document.createElement( 'button' );
            clear.className = 'comet-cpClear';
            ui.parentNode.appendChild( clear );
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( clear ).on( 'click', on.clear, data );

        }
        render = document.createElement( 'button' );
        render.className = 'comet-cpRender';
        ui.parentNode.appendChild( render );
        ui.type = 'hidden';
        color = ( color = parse.color( ui.value ) ) === null ? dColor : color;
        render.style.backgroundColor = color.value;

        data.source = ui;
        data.render = render;
        data.hsb = color.hsb;
        data.alpha = color.alpha;

        Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( render ).on( 'click', on.click, data );

        if( options.clear ){
            Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( clear ).on( 'click', on.clear, data );

        }

    }

    if( !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( options ) ){
        options = {};

    }

    (function(){
        var x, _source, tmp;


        if( ( ( _source = Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( source ) ).isNode() ) ){

            create( source );

        }else if( ( _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject( tmp = _source.get() ) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray( tmp, 1 ) ) && !_source.isView() ){

            for( x in source ){

                if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( source[x] ).isNode() ){
                    continue;

                }
                create( source[x] );
            }

        }else{
            return;

        }

        Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( document ).on( 'mouseup', function(){ dragging = false; });
        Object(_node_js__WEBPACK_IMPORTED_MODULE_2__["default"])( '.comet-modalContent' ).on( 'scroll', close );

    })();

});

/***/ }),

/***/ "./src/js/utils/ui/gradient.js":
/*!*************************************!*\
  !*** ./src/js/utils/ui/gradient.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sanitize.js */ "./src/js/utils/sanitize.js");
/* harmony import */ var _gradient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gradient.js */ "./src/js/utils/gradient.js");
/* harmony import */ var _color_picker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-picker.js */ "./src/js/utils/ui/color-picker.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node.js */ "./src/js/utils/node.js");






/* harmony default export */ __webpack_exports__["default"] = (function( source, options ){
	var dragging = false;
	var handler = false;
	var currentSource = false;
	var tmp;

	if( !source ){
		return;

	}

	if( typeof options !== 'object' ){
		options = {};

	}
	options.size = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isNumber( tmp = parseInt( options.size ) ) && !isNaN( tmp ) ? tmp : 10;

	function toggleDelete( data ){
		var ds, d;

		if( !dragging || !handler || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || !( 'range' in data ) || !( 'manager' in data ) ){
			ds = document.getElementsByClassName( 'comet-eGDelete' );

			for( d = 0; d < ds.length; d++ ){

				if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( ds[d] ).isNode() || ds[d].nodeName.toLowerCase() !== 'button' ){
					continue;

				}
				ds[d].name = 'add';
				ds[d].innerHTML = '<span class="cico cico-plus"></span>';
				ds[d].className = 'comet-eGManager comet-eGAdd';

			}
			return;

		}
		data.manager.name = 'delete';
		data.manager.innerHTML = '<span class="cico cico-trash"></span>';
		data.manager.className = 'comet-eGManager comet-eGDelete';

	}

	function setPosition( ui, position ){
		var tooltip = ui.getElementsByClassName( 'comet-ui-position' );
		position = parseInt( position );

		ui.style.left = 'calc( ' + position + '% - ' + ( options.size / 2 ) + 'px )';
		ui.setAttribute( 'aria-label', position + '%' );

		if( tooltip.length < 1 ){
			tooltip = document.createElement( 'span' );
			tooltip.className = 'comet-ui-position';
			tooltip.innerHTML = position + '%';
			ui.appendChild( tooltip );
			return;

		}
		tooltip[0].innerHTML = position + '%';

	}

	function onrange( ev, ui, data ){
		ev.preventDefault();
		ev.stopPropagation();
		var x, width, delta;

		if( ev.type !== 'mousemove' || !dragging || !handler ){
			dragging = false;
			handler = false;
			currentSource = false;
			return;

		}

		if( !( width = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data.range ).width() ) || !( x = data.range.getBoundingClientRect().left ) ){
			dragging = false;
			handler = false;
			currentSource = false;
			return;

		}
		//width = width - options.size;
		//delta = sanitize.number( { value: ( ( ev.pageX - x ) - ( options.size / 2 ) ), min: 0, max: width, default: 0 } );
		//handler.style.left = parseInt( ( ( parseFloat( ( delta / width ) * 100 ).toFixed( 2 ) ) * width ) / 100 ) + 'px';


		delta = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].number( { value: ( ev.pageX - x ), min: 0, max: width, default: 0 } );
		setPosition( handler, ( ( delta / width ) * 100 ) );

		if( typeof options.change === 'function' ){
			options.change( ev, ui, data );

		}

	}

	function onmanager( ev, ui, data ){
		ev.preventDefault();

		if( ev.type === 'mouseup' ){

			if( ui.name === 'delete' ){

				if( dragging && handler && handler.parentNode.getElementsByClassName( 'comet-eGDragger' ).length > 2 ){
					handler.parentNode.removeChild( handler );

				}
				ui.name = 'add';
				ui.innerHTML = '<span class="cico cico-plus"></span>';
				ui.className = 'comet-eGManager comet-eGAdd';
			}
			return;

		}
		const dgs = data.range.getElementsByClassName( 'comet-eGDragger' );
		const width = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data.range ).width() - options.size;
		const nb = dgs.length;
		const offset = parseInt( width / nb );
		var count = 0;
		var dragger, input, dg, d;

		if( nb > 5 ){
			return;

		}
		dragger = document.createElement( 'button' );
		dragger.className = 'comet-eGDragger';
		data.range.appendChild( dragger );
		dragger.style.left =  width + 'px';
		handler = false;
		dragging = false;
		input = document.createElement( 'input' );
		input.type = 'hidden';
		input.value = '#000000';
		dragger.appendChild( input );
		Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( dragger ).on( 'mousedown', onstart, data );
		initCP( input, data );

		if( typeof options.add === 'function' ){
			options.add( dragger, data );

		}

		for( d = 0; d < nb; d++ ){

			if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( dgs[d] ).isNode() ){
				continue;

			}
			if( count === 0 ){
				dgs[d].style.left = '0';

			}else{
				dgs[d].style.left = ( count * offset ) + 'px';
			}
			count++;

		}

	}

	function onstart( ev, ui, data ){
		ev.preventDefault();
		ev.stopPropagation();

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data.source ).isNode() || !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data.range ).isNode() ){
			return;

		}
		data.value = data.source.value;
		dragging = true;
		handler = ui;
		currentSource = data.source;
		toggleDelete( data );

		if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction( options.start ) ){
			options.start( ev, ui, data );

		}
		
	}

	function onstop( ev, ui ){
		ev.preventDefault();
		const colors = [];
		var range, width, draggers, dragger, _dragger, x, stop;

		if( !dragging ){
			return;

		}

		if( handler && currentSource && handler.parentNode !== null ){
			range = handler.parentNode;
			width = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( range ).width() - options.size;
			draggers = range.children;

			for( x in draggers ){

				if( !( ( _dragger = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( draggers[x] ) ).isNode() ) || !_dragger.hasClass( 'comet-eGDragger' ) ){
					continue;

				}
				//stop = sanitize.number( { value: draggers[x].style.left, min: 0, max: width, default: 0 } );
				colors[colors.length] = {
					stop: parseInt( draggers[x].getAttribute( 'aria-label' )/*( stop / width ) * 100*/ ),
					color: ( 0 in ( tmp = draggers[x].getElementsByTagName( 'input' ) ) ? _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( tmp[0].value ) : '' )
				};

			}
			currentSource.value = _gradient_js__WEBPACK_IMPORTED_MODULE_1__["default"].encode( colors );

		}

		if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction( options.onchange ) ){
			options.onchange( currentSource, currentSource.value );

		}

		toggleDelete();
		dragging = false;
		handler = false;
		currentSource = false;
		
	}

	function initCP( ui, data ){

		Object(_color_picker_js__WEBPACK_IMPORTED_MODULE_2__["default"])( ui, {
			opacity: true,
			input: true,
			clear: false,
			onchange: function( e, i, d ){
				const range = data.range;
				const width = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( range ).width() - options.size;
				const draggers = range.children;
				const colors = [];
				var x, stop, _dragger;

				for( x in draggers ){

					if( !( ( _dragger = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( draggers[x] ) ).isNode() ) || !_dragger.hasClass( 'comet-eGDragger' ) ){
						continue;

					}
					//stop = sanitize.number( { value: draggers[x].style.left, min: 0, max: width, default: 0 } );
					colors[colors.length] = {
						stop: parseInt( draggers[x].getAttribute( 'aria-label' ) ),//parseInt( ( stop / width ) * 100 ),
						color: ( 0 in ( tmp = draggers[x].getElementsByTagName( 'input' ) ) ? _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( tmp[0].value ) : '' )
					};

				}
				data.source.value = _gradient_js__WEBPACK_IMPORTED_MODULE_1__["default"].encode( colors );

				if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction( options.onchange ) ){
					options.onchange( data.source, data.source.value );

				}
			}
		});

	}

	function create( ui ){
		const wrap = ui.parentNode;
		const data = {};
		var colors = _gradient_js__WEBPACK_IMPORTED_MODULE_1__["default"].decode( ui.value );
		var range, dragger, input, manager, width, c, color, item, size;

		if( wrap === null ){
			return;

		}
		range = document.createElement( 'div' );
		range.className = 'comet-eGRange';

		manager = document.createElement( 'button' );
		manager.className = 'comet-eGManager comet-eGAdd';
		manager.name = 'add';
		manager.innerHTML = '<span class="cico cico-plus"></span>';

		wrap.appendChild( range );
		wrap.appendChild( manager );

		width = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( range ).width() - options.size;

		data.source = ui;
		data.range = range;
		data.value = ui.value;
		data.manager = manager;

		if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( colors, 2 ) ){
			colors = [];

		}

		if( !( 1 in colors ) ){
			colors[1] = {
				stop: 100,
				color: '#FFF'

			};

		}

		if( !( 0 in colors ) ){
			colors[0] = {
				stop: 0,
				color: '#000'

			};

		}

		for( c = 0; c < colors.length; c++ ){

			if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( item = colors[c] ) || !( color = _sanitize_js__WEBPACK_IMPORTED_MODULE_0__["default"].color( item.color ) ) ){
				continue;

			}
			dragger = document.createElement( 'button' );
			dragger.className = 'comet-eGDragger';
			/*size = sanitize.number( { value: item.stop ( ( item.stop * width ) / 100 ), min: 0, default: 0 } );*/
			//dragger.style.left =  'calc(' + item.stop + '% - ' + ( options.size / 2 ) + 'px )'/*size + 'px'*/;
			setPosition( dragger, item.stop );
			range.appendChild( dragger );
			input = document.createElement( 'input' );
			input.type = 'hidden';
			input.value = colors[c].color;
			dragger.appendChild( input );
			Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( dragger ).on( 'mousedown', onstart, data );
			initCP( input, data );

		}
		Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( range ).on( 'mousemove', onrange, data );
		Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( manager ).on( 'click mouseup', onmanager, data );

	}

	(function(){
		var x, _source, tmp;

		if( ( ( _source = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( source ) ).isNode() ) ){

			create( source );

		}else if( ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( tmp = _source.get() ) || _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray( tmp, 1 ) ) && !_source.isView() ){

			for( x in source ){

				if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( source[x] ).isNode() ){
					continue;

				}
				create( source[x] );
			}

		}else{
			return;

		}
		Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( document ).on( 'mouseup', onstop );

	})();

});

/***/ }),

/***/ "./src/js/utils/ui/range.js":
/*!**********************************!*\
  !*** ./src/js/utils/ui/range.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node.js */ "./src/js/utils/node.js");


/* harmony default export */ __webpack_exports__["default"] = (function( source, options ){
	var dragging = false;
	var x;

	if( !source ){
		return;

	}

	if( typeof options !== 'object' ){
		options = {};

	}

	function getValues( from ){
		var tmp, min, max;

		if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( from ).isNode() ){
			return {
				min: 0,
				max: 360,
				step: 1,
				value: 0
			};

		}

		return {
			min: ( min = sanitizeValue( from.getAttribute( 'min' ) ) ),
			max: ( max = ( tmp = sanitizeValue( from.getAttribute( 'max' ) ) ) <= min ? min + 10 : tmp ),
			step: ( tmp = sanitizeValue( from.getAttribute( 'step' ) ) ) <= 0 ? 0.1 : tmp,
			value: ( tmp = sanitizeValue( from.value ) ) >= min && tmp <= max ? tmp : min

		};

	}

	function sanitizeValue( value ){

		if( typeof value !== 'number' && typeof value !== 'string' ){
			return 0;

		}

		if( typeof ( value = parseFloat( value ) ) !== 'number' || isNaN( value ) ){
			return 0;

		}
		return value;

	}

	function initDragger( dragger, value, min, max, step ){
		var width, dwidth, r;

		if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( dragger ).isNode() || !( width = Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( dragger.parentNode ).width() ) ){
			return false;

		}
		width = dragger.parentNode.scrollWidth;
		dwidth = ( dwidth = sanitizeValue( Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( dragger ).width() ) ) > 0 ? dwidth : 0;
		width = width - dwidth;
		r = parseInt( ( value / ( step * ( ( max - min ) / step ) + min ) ) * width );
		dragger.style.left = r + 'px';
		return r;

	}

	function onDecInc( ev, ui, data, increase ){
		ev.preventDefault();
		var v, val;

		if( typeof data !== 'object' || !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.source ).isNode() || !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.dragger ).isNode() ){
			return false;

		}
		v = getValues( data.source );
		val = Number( ( increase ? v.value + v.step : v.value - v.step ).toFixed( 2 ) );
		val = val < v.min ? v.min : ( val > v.max ? v.max : val );
		data.source.value = val;
		data.value = val;

		initDragger( data.dragger, val, v.min, v.max, v.step );

		if( typeof options.change === 'function' ){
			options.change( ev, ui, data );

		}
		return true;

	}

	function onrange( ev, ui, data ){
		ev.preventDefault();
		ev.stopPropagation();
		var x, width, dwidth, val, delta, per, v;

		if( ( ev.type !== 'mousemove' || !dragging ) && ev.type !== 'click' ){
			return;

		}

		if( !( width = Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.range ).width() ) || !( x = data.range.getBoundingClientRect().left ) ){
			return;

		}
		v = getValues( data.source );
		dwidth = ( dwidth = sanitizeValue( Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.dragger ).width() ) ) > 0 ? dwidth : 0;

		if( typeof ( delta = parseInt( ev.pageX - x ) ) !== 'number' || isNaN( delta ) ){
			delta = 0;

		}
		delta = delta - ( dwidth / 2 );
		width = width - dwidth;

		if( delta > width ){
			delta = width;

		}

		if( delta < 0 ){
			delta = 0;

		}
		data.dragger.style.left = parseInt( delta ) + 'px';
		per = ( ( delta ) / ( width || 1 ) );
		val = v.step * Math.round( per * ( v.max - v.min ) / v.step ) + v.min;
		val = Number( (val).toFixed(2) );
		data.source.value = val;
		data.value = val;

		if( typeof options.change === 'function' ){
			options.change( ev, ui, data );

		}

	}

	function onstart( ev, ui, data ){
		ev.preventDefault();

		if( typeof data !== 'object' || !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.source ).isNode() || !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( data.range ).isNode() ){
			return;

		}

		if( typeof options.start === 'function' ){
			options.start( ev, ui, data );

		}
		data.value = sanitizeValue( data.source.value );
		dragging = true;
		
	}

	function onstop( ev, ui ){
		ev.preventDefault();

		if( typeof options.stop === 'function' ){
			options.stop( ev, ui );

		}
		dragging = false;
		
	}

	function onincrease( ev, ui, data ){
		const _on = onDecInc( ev, ui, data, true );

		if( !_on ){
			return;

		}

		if( typeof options.increase === 'function' ){
			options.increase( ev, ui, data );

		}

	}

	function ondecrease( ev, ui, data ){
		const _on = onDecInc( ev, ui, data, false );

		if( !_on ){
			return;

		}

		if( typeof options.decrease === 'function' ){
			options.decrease( ev, ui, data );

		}

	}

	function create( _ui ){
		const wrap = _ui.parentNode;
		const data = {};
		var range, dragger, dec, inc, v;

		if( !wrap ){
			return;

		}
		range = document.createElement( 'div' );
		range.className = 'comet-eRange';

		dragger = document.createElement( 'button' );
		dragger.className = 'comet-eRDragger';
		range.appendChild( dragger );

		data.source = _ui;
		data.range = range;
		data.dragger = dragger;

		if( options.buttons ){
			dec = document.createElement( 'button' );
			dec.className = 'comet-eRDecrease comet-button';
			dec.innerHTML = '-';

			inc = document.createElement( 'button' );
			inc.className = 'comet-eRIncrease comet-button';
			inc.innerHTML = '+';

			wrap.appendChild( dec );
			wrap.appendChild( range );
			wrap.appendChild( inc );
			data.decrease = dec;
			data.increase = inc;

			Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( dec ).on( 'click', ondecrease, data );
			Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( inc ).on( 'click', onincrease, data );

		}else{
			wrap.appendChild( range );

		}
		v = getValues( _ui );
		initDragger( data.dragger, v.value, v.min, v.max, v.step );
		Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( dragger ).on( 'mousedown', onstart, data );
		Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( range ).on( 'click mousemove', onrange, data );
		Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( _ui ).on( 'setValue', function( ev, ui ){
			const v = getValues( _ui );
			initDragger( data.dragger, v.value, v.min, v.max, v.step );

		});


	}

	if( Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( source ).isNode() ){
		
		create( source );

	}else if( source !== document && source !== window && typeof source === 'object' && source.length > 0 ){

		for( x in source ){

			if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( source[x] ).isNode() ){
				continue;

			}
			create( source[x] );
		}

	}else{
		return;

	}
	Object(_node_js__WEBPACK_IMPORTED_MODULE_0__["default"])( document.documentElement ).on( 'mouseup', onstop );

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
			c = entry.char === "]" ? "\\]" : c;
			c = entry.char === "\\" ? "\\\\" : c;
			s.replace( new RegExp( "^[" + c + "]+|[" + c + "]+$", "g" ), "");
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

	url = url.replace( '&', '&#038;' ).replace( "'", '&#039;' );

	return encodeURI( url );

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

	for( aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++ ){
		aItKey = aCouples[nKeyId].split("=");
		oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";

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
	const types = [ 'editor', 'frame', 'cockpit', 'sidebar', 'generalSettings' ];

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

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/js/editor/editor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/Wordpress/wp-content/plugins/comet/src/js/editor/editor.js */"./src/js/editor/editor.js");


/***/ })

/******/ });
//# sourceMappingURL=editor.js.map