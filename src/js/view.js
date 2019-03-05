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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

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
		return ( _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ? data : prop.setData( {} ) );

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
		metaData[type][id] = _utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend( {}, dd );
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

	/*prop.catchAndSet = function( id, type ){
		const metaData = prop.getData();
		const fields = document.getElementsByClassName( 'comet-field' );
		const data = {};
		var tmp, f, fid, ftype, _field, field, val;

		if( ( tmp = target_.item() ) && ( tmp = parse.id( tmp ) ) && target_.state() === 'items' && type === 'elements' ){
			type = 'items';
			id = tmp;

		}

		if( !( id = parse.id( id ) ) || !( type = this.hasType( type ) ) || fields.length < 1 ){
			return false;

		}

		if( !utils.isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}

		for( f in fields ){

			if( !( ( _field = node( fields[f] ) ).isNode() ) || !( ftype = parse.dataset( ( field = _field.prop() ), 'type' ) ) || utils.isStringEmpty( fid = field.name ) ){
				continue;

			}
			fid = utils.trim( fid );
			val = !utils.isNumber( val = field.value ) && !utils.isString( val ) ? '' : val.toString();

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

	};*/

	return prop;

});;


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

			return ( !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target ) || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( target.node )/*!( _t = node( target.node ) ).isNode()*/ ? false : target.node/*_t.prop()*/ );


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
	const devices = [ 'mobile', 'm', 'M', 'tablet', 't', 'T', 'TABLET' ];
	var index;

	if( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isStringEmpty( css ) || ( index = devices.indexOf( device ) ) < 0 ){
		return '';

	}
	return '@media only screen and (max-width:' + ( index <= 2 ? 400 : 800 ) + 'px){' + css + '}';

};

css.element = function( id, target, css, device ){
	const devices = [ 'mobile', 'm', 'M', 'tablet', 't', 'T', 'TABLET' ];
	const index = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( device ) ? devices.indexOf( device ) : -1;
	var targetClass;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNumber( id ) || !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( css ) ){
		return '';

	}
	targetClass = ( index > -1 ? ( '.cpb-devicetype-' + ( index <= 2 ? 'mobile' : 'tablet' ) + ' ' ) : '' );
	targetClass += '.cpb-element.cpb-elementNode' + id;
	targetClass += _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( target ) ? ' ' + _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( target ) : '';

	return targetClass + '{' + _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( css ) + '}';

};

/* harmony default export */ __webpack_exports__["default"] = (css);

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

		force_js: ( [ 'true', 'TRUE', '1', 1, true ].indexOf( element.force_js ) > -1 ),

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
/* harmony import */ var _ui_editor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/editor.js */ "./src/js/utils/ui/editor.js");









const html = {

    editor: _ui_editor_js__WEBPACK_IMPORTED_MODULE_6__["default"],
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
        const allowed = '<span><br><ins><u><i><em><strong><b><strike><del><a><abbr><address><code><hr><mark><sup><sub><s>';
        var attr = '';
        var editable, content, tag, med_id, classes, o;

        if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( entry ) ){
            return '';

        }
        tag = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.tag ) ? ( tags.indexOf( tag = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( entry.tag.toLowerCase() ) ) > -1 ? tag : 'p' ) : 'p';
        editable = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBool( entry.editable ) ? entry.editable : false;
        content = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString( entry.inner ) ? _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].stripTags( entry.inner, allowed ) : '';
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
            do: 'element',
            element: _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trim( opts.element ),
            id: id,
            data: _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].json_encode( _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( opts.data ) ? opts.data : {} )

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

		element: function( id, state ){
			var cl, element, fragment, el;

			if( !_priv.hasConnection( 'elements' ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_4__["default"].id( id ) ) || !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data.elements[id] ) || _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( data.elements[id]._type ) ){
				return false;

			}

			if( !( el = Object(_element_js__WEBPACK_IMPORTED_MODULE_2__["default"])( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.elements[id]._type ), id, _sanitize_js__WEBPACK_IMPORTED_MODULE_1__["default"].data( data, id ) ) ) ){
				return false;

			}
			Object(_style_js__WEBPACK_IMPORTED_MODULE_5__["default"])( id, 'elements' ).insert( el.css() );

			if( g_css || ( [ 'view', 'VIEW' ].indexOf( state ) > -1 && !el.force_js ) ){
				return true;
				
			}
			fragment = _d.createDocumentFragment();
			element = _d.createElement( 'div' );
			fragment.appendChild( element );

			cl = 'cpb-element';
			cl += ' cpb-element' + _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].capitalize( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( data.elements[id]._type ) );
			cl += ' cpb-elementNode' + id;

			console.time('element');
			element.className = cl;
			element.dataset.id = id;
			element.innerHTML = '<div class="cpb-elementContent"></div>';
			el.view( element );
			console.timeEnd('element');

			if( [ 'update', 'UPDATE', 'updating', 'UPDATING', true, 1 ].indexOf( state ) > -1 ){
				Object(_editor_target_js__WEBPACK_IMPORTED_MODULE_0__["default"])().set({node: element });

			}
			return fragment;

		},

	};
	g_css = ( ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( g_css ) && g_css ) || ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( g_css ) && 'css' === _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( g_css.toLowerCase() ) ) );
	prop.css = g_css;

	return prop;

});;


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

/***/ "./src/js/utils/ui/editor.js":
/*!***********************************!*\
  !*** ./src/js/utils/ui/editor.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../editor/data.js */ "./src/js/editor/data.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global.js */ "./src/js/utils/global.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node.js */ "./src/js/utils/node.js");






/**
 * 
 * @param {Object}		source			Node to replace by the editor
 * @param {Object}		options			Inline editor options
 * @param {String}		options.type	advanced/basic
 * @param {Integer}		options.id		Element id
 * @param {String}		options.slug	Matching setting slug
 * @param {String}		options.content	Content inner the HTML tag
 * @param {String}		options.tag		HTML tag wrapping the content
 *
 */
 /* harmony default export */ __webpack_exports__["default"] = (function( source, options ){

 	const _d = document;

 	const _w =  window;

 	const __core = {

 		selection: {
 			range: false,
 			clicked: false

 		},

 		classes: {
 			active: 'comet-active',
 			hide: 'comet-hide',

 		},

 		element: {

 			id: false,

 			slug: false,

 			data: false,

 			build_meta: function(){
 				var data;

 				__core.element.id = _parse_js__WEBPACK_IMPORTED_MODULE_2__["default"].id( options.id );
 				__core.element.slug = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( options.slug ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( options.slug ) : false;
 				__core.element.data = ( data = Object(_editor_data_js__WEBPACK_IMPORTED_MODULE_0__["default"])().get( __core.element.id, 'elements' ) ) ? data : false;


 			}

 		},

 		get: {

 			tags: function( oArray ){
 				const tags = [ 'span', 'br', 'ins', 'u', 'i', 'em', 'strong', 'b', 'strike', 'del', 'a', 'abbr', 'code', 'hr', 'mark', 'sup', 'sub', 's', 'small', 'cite', 'time', 'q' ];
 				var output = '';
 				var i = 0;

 				if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isBool( oArray ) && oArray ){
 					return tags;

 				}

 				for( i; i < tags.length; i++ ){
 					output += '<' + _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( tags[i] ) + '>';

 				}
 				return output;

 			},

 			textarea: function(){
 				const panel = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'panel' );
 				var textarea, t;

 				if( !panel || ( textarea = _d.getElementsByTagName( 'textarea' ) ).length < 1 ){
 					return false;

 				}

 				for( t = 0; t < textarea.length; t++ ){

 					if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( textarea[t].name ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( textarea[t].name ) === meta_element.slug ){
 						return textarea[t];

 					}

 				}
 				return false;

 			}

 		},

 		toolbar: {

 			slug: 'editorToolbar',

 			get: function(){
 				const meta = Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["default"])().get( __core.toolbar.slug );

 				if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( meta ) || !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( meta.node ).isNode() || meta.buttons.length < 1 ){
 					return __core.toolbar.create();


 				}
 				return meta;

 			},

 			close: function( ev, ui ){
 				const meta = __core.toolbar.get();

 				if( !meta ){
 					return;

 				}
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( meta.node ).addClass( __core.classes.hide );

 			},

 			buttons: function(){

 				const onbutton = {

 					default: function( command, val ){
 						var sel, range;

 						val = !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStringEmpty( val ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( val ) : null;

 						if( !_w.getSelection || !_w.getSelection().modify || __core.selection.range === null ){
 							return;

 						}
 						sel = _w.getSelection();

 						if( __core.selection.clicked ){
 							sel.removeAllRanges();
 							sel.addRange( __core.selection.range );

 						}

 						if( sel.type === 'Caret' ){
 							sel.modify('move', 'backward', 'word');
 							sel.modify('extend', 'forward', 'word');

 						}
 						range = sel.getRangeAt(0);
 						_d.execCommand( command, false, val );
 						__core.selection.clicked = false;

 					},

 					toggle: function( ui ){
 						const _ui = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( ui );

 						if( _ui.hasClass( __core.classes.active ) ){
 							_ui.removeClass( __core.classes.active );
 							return false;

 						}
 						_ui.addClass( __core.classes.active );
 						return true;

 					}


 				};

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
 						var inner, input, createLink;
 						const inline = _d.createElement( 'div' );

 						inner = '<div class="comet-absui comet-tooltip">';
 						inner += '<input type="text" class="comet-input value="" />';
 						inner += '<button class="comet-button comet-done">';
 						inner += '<span class="comet-icon cico cico-break"></span><span class="comet-title comet-tooltip">' + __cometi18n.ui.ilink + '</span>';
 						inner += '</button>';
 						inner += '</div>';

 						inline.className = 'comet-inline';
 						inline.innerHTML = inner;
 						inline.appendChild( button );

 						input = inline.firstChild.firstChild;
 						createLink = inline.firstChild.lastChild;

 						Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( createLink ).on( 'click', function( ev, ui ){
 							const val = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( input.value ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( input.value ) ) : '';
 							const state = val === '' ? 'unlink' : 'createLink';

 							ev.preventDefault();

 							onbutton.default( state, val );

 						});

 						return inline;

 					},
 					do: function( ev, ui ){
 						const _p = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( ui.parentNode );

 						ev.preventDefault();

 						if( onbutton.toggle( ui ) ){
 							_p.addClass( __core.classes.active );
 							return;

 						}
 						_p.removeClass( __core.classes.active );

 					}
 				}];

 			},

 			create: function(){
 				var button, oButton, inner, oInner, bClasses, b;
 				const fragment = _d.createDocumentFragment();
 				const oToolbar = _d.createElement( 'div' );
 				const buttons = __core.toolbar.buttons();
 				const meta = {
 					node: oToolbar,
 					buttons: []
 				};

 				oToolbar.className = 'comet-toolbar comet-ui comet-inline comet-float';

 				oInner = '<div class="comet-header">';
 				oInner += '<button class="comet-dragger comet-ui"><span class="cico cico-more"></span></button>';
 				oInner += '<button class="comet-close" title="' + __cometi18n.ui.close + '"><span class="cico cico-x"></span></button>';
 				oInner += '</div>';
 				oInner += '<div class="comet-body comet-buttonset"></div>';
 				oToolbar.innerHTML = oInner;

 				fragment.appendChild( oToolbar );

 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oToolbar.firstChild.lastChild ).on( 'click', __core.toolbar.close );
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oToolbar.firstChild.firstChild ).on( 'mousedown', __core.toolbar.drag.dragstart );

 				for( b = 0; b < buttons.length; b++ ){
 					button = buttons[b];
 					oButton = _d.createElement( 'button' );
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

 					if( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction( button.render ) ){
 						oToolbar.lastChild.appendChild( button.render( oButton ) );

 					}else{
 						oToolbar.lastChild.appendChild( oButton );

 					}
 					Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oButton ).on( 'click', button.do );
 					meta.buttons[meta.buttons.length] = oButton;

 				}
 				_d.body.appendChild( fragment );
 				return Object(_global_js__WEBPACK_IMPORTED_MODULE_1__["default"])().set( __core.toolbar.slug, meta, true );

 			},

 			set_position: function( data ){
 				var offsetTop, offsetLeft, min_top, min_left, max_top, max_left, top, left;

 				if( !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( data ) || !( 'toolbar' in data ) || !( 'document' in data ) || !( 'frame' in data ) ){
 					return false;

 				}
 				offsetTop = data.frame.target.offsetTop;
 				offsetLeft = data.frame.target.offsetLeft;

 				if( !( 'pageY' in data ) || !( 'pageX' in data ) ){
 					top = offsetTop + 20;
 					left = offsetLeft + 20;

 				}else{

 				min_top = offsetTop;
 				min_left = offsetLeft;

 				max_left = ( data.frame.width + offsetLeft ) - data.toolbar.width;
 				max_top = ( data.frame.height + offsetTop ) - data.toolbar.height;

 				top = data.pageY <= min_top ? min_top : ( data.pageY >= max_top ? max_top : data.pageY );
 				left = data.pageX <= min_left ? min_left : ( data.pageX >= max_left ? max_left : data.pageX );
 			}

 					data.toolbar.target.style.top = top + 'px';
 					data.toolbar.target.style.left = left + 'px';

 				return true;

 			},

 			get_ui: function(){
 				const oDoc = _d.documentElement;
 				const _oDoc = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oDoc );
 				const frame = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].getNode( 'frame' );
 				const _frame = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( frame );
 				const toolbar = __core.toolbar.get().node;
 				const _toolbar = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( toolbar );

 				return {
 					toolbar: {
 						target: toolbar,
 						node: _toolbar,
 						width: _toolbar.width(),
 						height: _toolbar.height()
 					},
 					document: {
 						target: oDoc,
 						node: _oDoc,
 						width: _oDoc.width(),
 						height: _oDoc.height(),
 					},
 					frame: {
 						target: frame,
 						node: _frame,
 						width: _frame.width(),
 						height: _frame.height(),

 					}
 				};

 			},



 			drag: {

 				is_dragging: false,

 				dragstart: function( ev, ui ){
 					const __object = __core.toolbar.get_ui();

 					ev.preventDefault();

 					__core.toolbar.drag.is_dragging = true;

 					__object.document.node.on( 'mouseup', __core.toolbar.drag.dragstop );
 					__object.document.node.on( 'mousemove', __core.toolbar.drag.dragging, __object );


 				},

 				dragstop: function( ev, ui ){
 					__core.toolbar.drag.is_dragging = false;

 				},

 				dragging: function( ev, ui, __object ){

 					if( !__core.toolbar.drag.is_dragging ){
 						return;

 					}
 					__object.pageY = ev.pageY;
 					__object.pageX = ev.pageX;
 					__core.toolbar.set_position( __object );

 				}

 			}


 		},

 		editor: {

 			create: function(){
 				const tags = [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'div', 'aside', 'pre', 'blockquote', 'article', 'section' ];
 				const tag = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( options.tag ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( options.tag.toLowerCase() ) : 'p';
 				const oObject = _d.createElement( tags.indexOf( tag ) < 0 ? 'p' : tag );

 				oObject.className = 'comet-editable comet-ui';
 				oObject.innerHTML = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( options.content ) ? _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( options.content, __core.get.tags( false ) ) : 'Write something here...';
 				oObject.setAttribute( 'contenteditable', 'true' );

 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oObject ).on( 'click', __core.editor.focus );
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oObject ).on( 'input', __core.editor.change );
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( oObject ).on( 'keypress', __core.editor.keypress );

 				return oObject;

 			},

 			keypress: function( ev, ui ){

 				if( ev.keyCode === 13 ){
 					ev.preventDefault();
 					_d.execCommand( 'insertHTML', false, '<br><br>' );
 					return false;

 				}

 			},

 			focus: function( ev, ui ){
 				const meta = __core.toolbar.get();
 				var buttons, _selection;

 				ev.preventDefault();
 				ev.stopPropagation();

 				if( !meta || !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( ev.target ).isNode() || ( buttons = meta.buttons ).length < 1 ){
 					return;

 				}
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( meta.node ).removeClass( __core.classes.hide );

 				if( _w.getSelection && ( _selection = _w.getSelection() ).modify ){
 					__core.selection.range = _selection.getRangeAt(0);
 					__core.selection.clicked = true;

 				}
 				_d.execCommand( 'insertBrOnReturn', false, true );
 				_d.execCommand( 'defaultParagraphSeparator', false, 'br' );

 				function isCommand( button, command ){
 					const cmd = _parse_js__WEBPACK_IMPORTED_MODULE_2__["default"].dataset( button, 'command' );

 					return ( _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isString( cmd ) && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].trim( cmd ) === command );

 				}

 				function parent( comp ){
 					var command, command1, _button, b;

 					if( Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( comp ).hasClass( __core.classes.editor ) || comp.parentNode === null ){
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

 						if( !( ( _button = Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( buttons[b] ) ).isNode() ) || !isCommand( buttons[b], command ) ){
 							continue;

 						}
 						_button.addClass( __core.classes.active );

 					}
 					parent( comp.parentNode );

 				}
 				Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( buttons ).removeClass( __core.classes.active );
 				parent( ev.target );

 			},

 			change: function( ev, ui ){
 				const sanitized_content = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].stripTags( ui.innerHTML, __core.get.tags( false ) );
 				const data = {};
 				var textarea;

 				data[meta_element.slug] = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].encode_chars( sanitized_content );
 				Object(_editor_data_js__WEBPACK_IMPORTED_MODULE_0__["default"])().set( meta_element.id, 'elements', data );

 				if( !( textarea = __core.get.textarea() ) ){
 					return;

 				}
 				textarea.value = sanitized_content;

 			}

 		}

 	};

 	var editor, meta_element;

 	options = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isObject( options ) ? options : {};
 	meta_element = __core.element;
 	meta_element.build_meta();

 	if( !Object(_node_js__WEBPACK_IMPORTED_MODULE_4__["default"])( source ).isNode() || source.parentNode === null || !meta_element.id || !meta_element.slug || !meta_element.data ){
 		return false;

 	}
 	editor = __core.editor.create();
 	source.parentNode.replaceChild( editor, source );

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

	url = url.replace( '&', '&#038;' ).replace( '\'', '&#039;' );

	return encodeURI( url );

};

utils.encode_chars = function( str ){
	const __core = {

		map: {
			'&': '&amp;',
			'(': '&#40;',
			')': '&#41;',
			',': '&#44;',
			//'/': '&#47;',
			':': '&#58;',
			';': '&#59;',
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
	return str.replace(/[&\/,\[\]\\`{}\(\):;|~«»]/g, __core.callback );

};

/*utils.decode_chars = function( str ){

};*/

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

/***/ "./src/js/utils/view.js":
/*!******************************!*\
  !*** ./src/js/utils/view.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "./src/js/utils/global.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./src/js/utils/parse.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _ajax_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ajax.js */ "./src/js/utils/ajax.js");
/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout.js */ "./src/js/utils/layout.js");
/* Comet - Copyright (c) 2019 Blacklead */
/* Last edit: Jan, 25 2019 */







'use strict';

(function( cometView ) {

	cometView( window, document );

}(function( _w, _d ){

	const g_ = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

	const capture = function( className ){

		return _d.getElementsByClassName( className );

	};

	const parser = function( data, nodes, type ){
		const is_element = ( type === 'element' );
		var i, id, a, _layout;

		if( !nodes || !nodes.length || nodes.length < 1 ){
			return;

		}

		if( is_element ){
			_layout = Object(_layout_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data, false );

		}else{
			_layout = Object(_layout_js__WEBPACK_IMPORTED_MODULE_4__["default"])( data, true );

		}

		for( i = 0; i < nodes.length; i++ ){

			if( !( id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].dataset( nodes[i], 'id' ) ) || !( id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( id ) ) ){
				continue;

			}

			if( is_element ){
				a = _layout.element( id, 'view' );

				if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBool( a ) ){
					nodes[i].parentNode.replaceChild( a, nodes[i] );

				}
				continue;

			}
			a = _layout[type]( id );

		}

	};

	var _id = null;

	if( !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( __cometdata ) || !( _id = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].id( __cometdata.id ) ) ){
		return false;

	}
	_w.Comet = Comet || {};

	Object(_ajax_js__WEBPACK_IMPORTED_MODULE_3__["default"])( {
		do: 'data',
		id: _id,
		public: true

	} ).done(function( response ){
		const _default = [ 'post', 'settings', 'svgSets' ];
		const data = _parse_js__WEBPACK_IMPORTED_MODULE_1__["default"].json( response );
		var n = 0;
		var i, slug, post, metadata;

		if( !data || !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( data ) ){
			return;

		}

		for( i in _default ){

			if( !( ( slug = _default[i] ) in data ) ){
				continue;

			}
			g_.set( slug, data[slug], true );
			n++;

		}

		if( n < 3 ){
			return;

		}
		post = g_.get( 'post' );
		metadata = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( post ) && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isObject( post.meta ) ? post.meta : {};
		parser( metadata, capture( 'cpb-section' ), 'section' );
		parser( metadata, capture( 'cpb-row' ), 'row' );
		parser( metadata, capture( 'cpb-column' ), 'column' );
		parser( metadata, capture( 'cpb-element' ), 'element' );

	});


}));

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./src/js/utils/view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/Wordpress/wp-content/plugins/comet/src/js/utils/view.js */"./src/js/utils/view.js");


/***/ })

/******/ });
//# sourceMappingURL=view.js.map