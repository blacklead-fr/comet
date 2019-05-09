/* Comet - Copyright (c) 2019 Blacklead */

import { frameset as _f } from './components/stored.js';
import { components } from './components/index.js';
import __global from '../utils/global.js';
import layout from '../utils/layout.js';
import parse from '../utils/parse.js';
import utils from '../utils/utils.js';
import post_elements from './post.js';
import ajax from '../utils/ajax.js';
import node from '../utils/node.js';
import __data from './data.js';

/* global document, window, Comet, alert, __cometi18n, __cometdata, setInterval, clearInterval */

'use strict';

(function( cometEditor ) {

    cometEditor( window, document);

}(function( _w, _d ){

    var get, id1, id2;

    const g_ = __global();

    const data_ = __data();

    const __core = {

        stopPreload: function(){
            const preload = _d.getElementById( 'comet-preloader' );
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

        set: {

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

                if( !( elements = post_elements( content ) ) || !utils.isArray( elements, 1) ){
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

                    if( !tmpe || !utils.isArray( items, 1 ) ){
                        continue;

                    }

                    for( x = 0; x < items.length; x++ ){
                        data_.create( 'items', tmpe, 'last', items[x] );

                    }

                }
                return true;

            },

            frame: function(){

                const slug = 'frame';

                const frame = _d.createElement( 'div' );

                const _frame = node( frame );

                const __frame = {

                    target: frame,

                    targetNode: _frame,

                    append: function( child ){

                        frame.appendChild( child );

                    },

                    remove: function( child ){

                        frame.removeChild( child );

                    },

                    empty: function(){
                        frame.innerHTML = '';

                    },

                    addClass: function( className ){

                        _frame.addClass( className );

                    },

                    removeClass: function( className ){

                        _frame.removeClass( className );

                    },

                    hasClass: function( className ){

                        return _frame.hasClass( className );

                    },

                    destroy: function(){

                        if( frame.parentNode === null ){
                            return false;

                        }

                        frame.parentNode.removeChild( frame );
                        g_.unset( slug );
                        return true;
                    }

                };

                var frameset;

                if( !( frameset = _f() ) ){
                    frameset = __core.set.frameset();

                }
                //frame.id = 'cpb-content';
                //frame.className = 'cpb cpb-content cpb-editArea cpb-backendMode';
                frame.className = 'comet-frame comet-frame--main';
                frameset.append( frame );

                return g_.set( slug, __frame, true );

            },

            frameset: function(){

                const slug = 'frameset';

                const frameset = __core.get.frameset();

                const _frameset = node( frameset );

                const __frameset = {

                    target: frameset,

                    targetNode: _frameset,

                    append: function( child ){

                        frameset.appendChild( child );

                    },

                    remove: function( child ){

                        frameset.removeChild( child );

                    },

                    addClass: function( className ){

                        _frameset.addClass( className );

                    },

                    removeClass: function( className ){

                        _frameset.removeClass( className );

                    },

                    hasClass: function( className ){

                        return _frameset.hasClass( className );

                    },

                    destroy: function(){

                        if( frameset.parentNode === null ){
                            return false;

                        }
                        frameset.parentNode.removeChild( frameset );
                        g_.unset( slug );
                        return true;

                    }

                };

                if( frameset === null ){
                    return;

                }
                return g_.set( slug, __frameset, true );

            }

        },

        get: {

            frameset: function(){
                var _tmp, a;

                if( _d.body.children.length < 1 ){
                    return null;

                }

                for( a = 0; a < _d.body.children.length; a++ ){

                    if( !( ( _tmp = node( _d.body.children[a] ) ).isNode() ) || !_tmp.hasClass( 'comet-frameset' ) ){
                        continue;

                    }
                    return _d.body.children[a];

                }
                return null;

            }
        },

        initialize: function( response ){

            const _default = [ 'post', 'settings', 'svgSets' ];
            const data = parse.json( response );
            var n = 0;
            var i, slug, tmp, post, metaData, frame;

            if( !data || !utils.isObject( data ) ){
                alert( __cometi18n.messages.error.failed );
                throw new Error( __cometi18n.messages.error.failed );

            }

            for( i in _default ){

                if( !( ( slug = _default[i] ) in data ) ){
                    continue;

                }
                tmp = g_.set( slug, data[slug], true );

                if( slug === 'post' ){
                    post = tmp;

                }
                n++;

            }

            if( n < 3 ){
                alert( __cometi18n.messages.error.failed );
                throw new Error( __cometi18n.messages.error.failed );

            }
            metaData = data_.setData( utils.isObject( post ) ? ( utils.isObject( post.meta ) && !Array.isArray( post.meta ) ? post.meta : {} ) : {} );
            frame = __core.set.frame();

            if( utils.isStringEmpty( metaData._sections ) ){
                __core.set.post( post.post_content );

            }
            layout( data_.getData() ).init( frame.target, null );
            components.initialize();
            __core.stopPreload();

        }

    };

    window.Comet = Comet || {};

    if( !( get = utils.getParameters() ) || !( 'post' in get ) || !( 'action' in get ) || !( 'comet' in get ) ){
        alert( __cometi18n.messages.error.failed );
        return false;

    }

    if( get.action !== 'edit' || !utils.isObject( __cometdata ) || !( 'post_id' in __cometdata ) ){
        alert( __cometi18n.messages.error.failed );
        return false;

    }

    if( !( id1 = parse.id( get.post ) ) || !( id2 = parse.id( __cometdata.post_id ) ) || id1 !== id2 ){
        alert( __cometi18n.messages.error.failed );
        return false;

    }

    ajax( {
        do: 'data',
        id: __cometdata.post_id,
        public: false,

    } ).done( __core.initialize );

}));