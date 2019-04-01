/* Comet - Copyright (c) 2019 Blacklead */

import __global from './global.js';
import parse from './parse.js';
import utils from './utils.js';
import ajax from './ajax.js';
import layout from './layout.js';

/* global document, window, Comet, __cometdata */

'use strict';

(function( cometView ) {

	cometView( window, document );

}(function( _w, _d ){

	const g_ = __global();

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
			_layout = layout( data, false );

		}else{
			_layout = layout( data, true );

		}

		for( i = 0; i < nodes.length; i++ ){

			if( !( id = parse.dataset( nodes[i], 'id' ) ) || !( id = parse.id( id ) ) ){
				continue;

			}

			if( is_element ){
				a = _layout.element( id, 'view' );

				if( !utils.isBool( a ) ){
					nodes[i].parentNode.replaceChild( a, nodes[i] );

				}
				continue;

			}
			a = _layout[type]( id );

		}

	};

	var _id = null;

	if( !utils.isObject( __cometdata ) || !( _id = parse.id( __cometdata.id ) ) ){
		return false;

	}
	_w.Comet = Comet || {};

	ajax( {
		do: 'data',
		id: _id,
		public: 'true'

	} ).done(function( response ){
		const _default = [ 'post', 'settings', 'svgSets' ];
		const data = parse.json( response );
		var n = 0;
		var i, slug, post, metadata;

		if( !data || !utils.isObject( data ) ){
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
		metadata = utils.isObject( post ) && utils.isObject( post.meta ) ? post.meta : {};
		parser( metadata, capture( 'cpb-section' ), 'section' );
		parser( metadata, capture( 'cpb-row' ), 'row' );
		parser( metadata, capture( 'cpb-column' ), 'column' );
		parser( metadata, capture( 'cpb-element' ), 'element' );

	});


}));