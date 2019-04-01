import __global from './global.js';
import parse from './parse.js';

/* global window */

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

utils.toObject = function( entry ){
	const obj = {};
	var i = 0;

	if( !utils.isArray( entry, 1 ) ){
		return obj;

	}

	for( i; i < entry.length; i++ ){
		obj[i] = entry[i];

	}
	return obj;

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
	
	if ( url.indexOf( 'mailto:' ) !== 0 ) {
		strip = [ '%0d', '%0a', '%0D', '%0A' ];
		url = _deepReplace( strip, url);
		
	}
	url = url.replace( '&', '&#038;' ).replace( '\'', '&#039;' );

	return encodeURI( url );

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

utils.encode_chars = function( str ){
	const __core = {

		map: {
			'\\': '&#92;',
			"'": '&#39;',
			'"': '&#34;',
		},

		callback: function( m ){
			return __core.map[m];

		}

	};

	if( !utils.isString( str ) ){
		return str;

	}
	return str.replace(/[\\'"]/g, __core.callback );

};

utils.getVideo = function( url, media ){
	const origin = url;
	var regex, tmp;

	switch( media ){
		case 'vimeo':
		case 'VIMEO':
		regex = /(https?)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:|\/\?)/;
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
			tmp = url[2].split(/[^0-9a-z\-_]/i);

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
	const sets = __global().get( 'svgSets' );

	return !utils.isObject( sets ) ? {} : sets;

};

utils.getPost = function(){
	const post = __global().get( 'post' );

	return !utils.isObject( post ) ? {} : post;

};

utils.getPostMeta = function(){
	const post = utils.getPost();

	return !utils.isObject( post.meta ) ? {} : post.meta;

};

utils.getSettings = function(){
	const settings = __global().get( 'settings' );

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
	const g_ = __global();
	const types = [ 'editor', 'frame', 'cockpit', 'sidebar', 'panel', 'generalSettings' ];

	return !utils.isStringEmpty( slug ) && types.indexOf( slug = utils.trim( slug ) ) > -1 ? g_.get( slug ) : false;

};

utils.foreachItem = function( data, onitem ){
	var o = '';
	var ids, i;

	if( !utils.isObject( data ) || !utils.isObject( data.el ) || !utils.isObject( data.items ) || !utils.isFunction( onitem ) ){
		return false;

	}

	if( utils.isStringEmpty( data.el._items ) || !utils.isArray( ( ids = parse.ids( data.el._items, 'array' ) ), 1 ) ){
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
	var key, value, n, _url, kv, ex, e, _ex, _e, __e, h, ioHash, ioQ;

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

export default utils;