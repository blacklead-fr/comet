import { isArray, isObject, isString, isNumber, isBool, isNode } from './is.js';
import { inArray } from './fill.js';
import sanitize from './sanitize.js';
import utils from './utils.js';
import parse from './parse.js';
import _html from './html.js';
import _css from './css.js';

const CORE = {

	toObject: function( initial, need ){
		const obj = {};
		var i;

		if( !isObject( initial ) || !isArray( need ) || need.length < 1 ){
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
		_d.sanitize = CORE.toObject( sanitize, sn );
		_d.utils = CORE.toObject( utils, un );

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

	},

	boolForceJs: function( value ){

		if( isString( value ) || isBool( value ) || isNumber( value ) ){
			value = ( ( value.toString() ).toLowerCase() ).trim();

		}

		return inArray( [ 'true', 'yes', '1' ], value );

	}

};

export default function( slug, id, data ){

	const element = utils.getElement( slug );

	if( !( id = parse.id( id ) ) || id < 0 || !element ){
		return false;

	}

	if( !isObject( data ) ){
		data = {};

	}

	return {

		force_js: CORE.boolForceJs( element.force_js ),

		view: function( ui ){
			
			if( !isString( element.render.view ) || !isNode( ui ) ){
				return false;

			}
			return Function('"use strict";return (function( id, data, ui, toolkit ){ ' + element.render.view + '})')()( id, data, ui, CORE.toolkit( 'html' ) );

		},

		css: function(){
			
			if( !isString( element.render.css ) ){
				return false;

			}
			return Function('"use strict";return (function( id, data, toolkit ){ ' + element.render.css + '})')()( id, data, CORE.toolkit( 'css' ) );

		}
	};

}