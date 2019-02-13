import sanitize from './sanitize.js';
import utils from './utils.js';
import parse from './parse.js';
import _html from './html.js';
import node from './node.js';
import _css from './css.js';

export default function( _slug, _id, _data ){

	const element = utils.getElement( _slug );

	const _u = {

		toObject: function( initial, need ){
			const obj = {};
			var i;

			if( !utils.isObject( initial ) || !utils.isArray( need, 1 ) ){
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
			_d.sanitize = _u.toObject( sanitize, sn );
			_d.utils = _u.toObject( utils, un );

			switch( type ){

				case 'css':
				_d.css = _css;
				break;

				case 'html':
				_d.html = _html;
				break;

				default:
				break;

			}
			return _d;

		}

	};

	if( !( _id = parse.id( _id ) ) || _id < 0 || !element ){
		return false;

	}
	_data = utils.isObject( _data ) ? _data : {};

	return {

		force_js: ( [ 'true', 'TRUE', '1', 1, true ].indexOf( element.force_js ) > -1 ),

		view: function( _ui ){
			
			if( !utils.isString( element.render.view ) || !node( _ui ).isNode() ){
				return false;

			}
			return Function('"use strict";return (function( id, data, ui, toolkit ){ ' + element.render.view + '})')()( _id, _data, _ui, _u.toolkit( 'html' ) );

		},

		css: function(){
			
			if( !utils.isString( element.render.css ) ){
				return false;

			}
			return Function('"use strict";return (function( id, data, toolkit ){ ' + element.render.css + '})')()( _id, _data, _u.toolkit( 'css' ) );

		}
	};

}