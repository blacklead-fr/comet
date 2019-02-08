/* Comet - Copyright (c) 2019 Blacklead */
/* Last edit: Jan, 25 2019 */

import __global from './global.js';
import parse from './parse.js';
import utils from './utils.js';
import ajax from './ajax.js';
import layout from './layout.js';

(function( cometView ) {

	cometView( window, document );

}(function( _w, _d ){
	'use strict';

	const g_ = __global();

	const capture = function( className ){

		return _d.getElementsByClassName( className );

	};

	const parser = function( nodes, type ){
		const is_element = ( type === 'element' );
		var i, id, a;

		if( !nodes || !nodes.length || nodes.length < 1 ){
			return;

		}

		for( i = 0; i < nodes.length; i++ ){

			if( !( id = parse.dataset( nodes[i], 'id' ) ) || !( id = parse.id( id ) ) ){
				continue;

			}
			a = _layout[type]( id );

			if( is_element && a ){
				nodes[i].parentNode.replaceChild( a, nodes[i] );

			}

		}

	};

	var _id = null;

	var _layout = null;

	if( !utils.isObject( __cometdata ) || !( _id = parse.id( __cometdata.id ) ) ){
		return false;

	}
	_w.Comet = Comet || {};

	ajax( {
		do: 'data',
		id: _id,
		public: true

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
		_layout = layout( metadata, true );
		parser( capture( 'cpb-section' ), 'section' );
		parser( capture( 'cpb-row' ), 'row' );
		parser( capture( 'cpb-column' ), 'column' );
		_layout = layout( metadata, false );
		parser( capture( 'cpb-element' ), 'element' );

	});


}));