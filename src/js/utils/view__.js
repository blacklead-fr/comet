/* Comet - Copyright (c) 2018 Blacklead   */

import __global from './global.js';
import parse from './parse.js';
//import __data from '../data.js';
import utils from './utils.js';
import ajax from './ajax.js';
import node from './node.js';
import layout from './layout.js';

(function( cometView ) {

	cometView( window, document );

}(function( _w, _d ){
	'use strict';

	const g_ = __global();

	const frame = _d.getElementById( 'cpb-content' );

	var id = null;

	if( !node( frame ).isNode() || !utils.isObject( cometdata ) || !( id = parse.id( cometdata.post_id ) ) ){
		return false;

	}
	_w.Comet = Comet || {};

	ajax( {
		action: cometdata.admin === 'true' ? 'comet_ajAdmin' : 'comet_ajPublic',
		do: 'data',
		id: cometdata.post_id

	} ).done(function( response ){
		const _default = [ 'post', 'settings', 'lib', 'svgSets' ];
		const data = parse.json( response );
		var n = 0;
		var i, slug, post, metaData;

		if( !data || !utils.isObject( data ) ){
			alert( cometdata.error );
			throw new Error( cometdata.error );

		}

		for( i in _default ){

			if( !( ( slug = _default[i] ) in data ) ){
				continue;

			}
			g_.set( slug, data[slug], true );
			n++;

		}

		if( n < 4 ){
			throw new Error( cometdata.error );

		}
		post = g_.get( 'post' );
		metaData = utils.isObject( post ) && utils.isObject( post.meta ) ? post.meta : {};
		frame.innerHTML = '';
		layout( metaData ).init( frame );

	});


}));