/* Comet - Copyright (c) 2019 Blacklead */

import contextualize from './contextualize.js';
import __global from '../utils/global.js';
import layout from '../utils/layout.js';
import c__ from './actions/cockpit.js';
import s__ from './actions/sidebar.js';
import parse from '../utils/parse.js';
import utils from '../utils/utils.js';
import post_elements from './post.js';
import ajax from '../utils/ajax.js';
import node from '../utils/node.js';
import cockpit from './cockpit.js';
import __data from './data.js';

/* global document, window, Comet, alert, __cometi18n, __cometdata, setInterval, clearInterval */

'use strict';

(function( cometEditor ) {

  cometEditor( window, document);

}(function( _win, _doc ){
  
  const g_ = __global();
  const data_ = __data();
  const editor = _doc.getElementById( 'comet-editor' );
  const settings = _doc.getElementById( 'comet-generalSettings' );

  var post = {};
  var metaData = {};
  var get, id1, id2;
  var frame = false;

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

    /*sidebar: function(){
      const elements = utils.getElements();
      const sidebar = _doc.createElement( 'div' );
      const footer = _doc.createElement( 'div' );
      var tmp, e, element, inner;

      sidebar.id = 'comet-editorSidebar';
      sidebar.className = 'comet-sidebar';


      if( utils.isObject( elements ) ){

        const header = _doc.createElement( 'div' );
        header.className = 'comet-header';
        sidebar.appendChild( header );

        const sToggler = _doc.createElement( 'button' );
        sToggler.className = 'comet-btoggle';
        sToggler.setAttribute( 'aria-label', __cometi18n.ui.elements );
        sToggler.innerHTML = '<span class="cico cico-elements"></span>';
        header.appendChild( sToggler );
        s__.toggle( sToggler );


        const sElements = _doc.createElement( 'div' );
        sElements.className = 'comet-listElements';
        sidebar.appendChild( sElements );

        tmp = _doc.createElement( 'button' );
        tmp.className = 'comet-listElement';
        tmp.setAttribute( 'aria-label', __cometi18n.ui.layout );
        tmp.innerHTML = '<span class="cico cico-layout"></span><span class="comet-uiTitle">' + __cometi18n.ui.layout + '</span>';
        sElements.appendChild( tmp );
        s__.layout( tmp );

        for( e in elements ){

          if( !utils.isObject( element = elements[e] ) || utils.isStringEmpty( element.name ) || utils.isStringEmpty( e ) ){
            continue;

          }

          tmp = _doc.createElement( 'button' );
          tmp.id = 'comet-listElement' + ( e = utils.trim( e ) );
          tmp.className = 'comet-listElement';
          tmp.setAttribute( 'aria-label', ( element.name = utils.trim( element.name ) ) );
          tmp.setAttribute( 'data-id', e );

          inner = !utils.isStringEmpty( element.icon ) ? '<span class="cico ' + element.icon + '"></span>' : '';
          inner += '<span class="comet-uiTitle">' + element.name + '</span>';
          tmp.innerHTML = inner;
          sElements.appendChild( tmp );
          s__.element( tmp );

        }

      }
      footer.className = 'comet-footer comet-buttonset';
      sidebar.appendChild( footer );

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-save';
      tmp.innerHTML = '<span class="cico cico-update"></span><span class="comet-uiTitle">' + __cometi18n.ui.save + '</span>';
      footer.appendChild( tmp );
      s__.save( tmp );

      tmp = _doc.createElement( 'button' );
      tmp.className = 'comet-btoggle';
      tmp.innerHTML = '<span class="cico cico-more"></span><span class="comet-uiTitle">' + __cometi18n.cockpit.title + '</span>';
      footer.appendChild( tmp );
      c__.toggle( tmp );

      editor.appendChild( sidebar );

      return g_.set( 'sidebar', sidebar, true );

    },

    cockpit: function(){
      const fragment = _doc.createDocumentFragment();
      const cockpit = _doc.createElement( 'div' );
      const buttons = {
        settings: 'cico-cog',
        save: 'cico-dir-upload',
        lib: 'cico-directory',
        exit: 'cico-power',
      };
      var wrap, inner, header, footer, tmp, b;

      fragment.appendChild( cockpit );

      cockpit.id = 'comet-cockpit';
      cockpit.className = 'comet-cockpit comet-fixfull';
      cockpit.innerHTML = '<div class="comet-inner"></div><div class="comet-sideToggleButton comet-eventToggle"></div>';

      inner = '<div class="comet-header">';
      inner += '<h4>' + __cometi18n.cockpit.title + '</h4>';
      inner += '<button class="comet-button comet-eventToggle" aria-label="' + __cometi18n.ui.close + '">';
      inner += '<span class="cico cico-x"></span>';
      inner += '</button>';
      inner += '<p>';
      inner += '<button class="comet-header__clear">' + __cometi18n.cockpit.clearNx + '</button>';
      inner += '</p>';
      inner += '</div>';
      inner += '<div id="comet-notifications" class="comet-notifications"></div>';
      inner += '<div class="comet-footer"></div>';

      wrap = cockpit.firstChild;
      wrap.innerHTML = inner;

      header = wrap.children[0];
      footer = wrap.children[2];

      c__.toggle( cockpit.lastChild );
      c__.toggle( header.children[1] );

      node( header.children[2].firstChild ).on( 'click', function( ev ){
        ev.preventDefault();
        wrap.children[1].innerHTML = '';
        
      });

      for( b in buttons ){

        if( !( b in __cometi18n.cockpit.options ) ){
          continue;

        }
        tmp = _doc.createElement( 'button' );
        tmp.className = 'comet-button comet-cockpitButton';
        tmp.setAttribute( 'aria-label', __cometi18n.cockpit.options[b] );
        tmp.innerHTML = '<span class="cico ' + buttons[b] + '"></span>';
        footer.appendChild( tmp );

        if( utils.isFunction( c__[b] ) ){
          c__[b]( tmp );

        }

      }
      editor.appendChild( fragment );

      return g_.set( 'cockpit', cockpit, true );


    },*/

    frame: function(){
      frame = _doc.createElement( 'div' );
      frame.id = 'cpb-content';
      frame.className = 'cpb cpb-content cpb-editArea cpb-backendMode';
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

    }

  };

  window.Comet = Comet || {};

  if( !node( editor ).isNode() || !node( settings ).isNode() ){
    alert( __cometi18n.messages.error.failed );
    return false;

  }

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

  } ).done(function( response ){
    const _default = [ 'post', 'settings', 'svgSets' ];
    const data = parse.json( response );
    var n = 0;
    var i, slug;

    if( !data || !utils.isObject( data ) ){
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

    if( n < 3 ){
      alert( __cometi18n.messages.error.failed );
      throw new Error( __cometi18n.messages.error.failed );

    }
    post = g_.get( 'post' );
    metaData = data_.setData( utils.isObject( post ) ? ( utils.isObject( post.meta ) && !Array.isArray( post.meta ) ? post.meta : {} ) : {} );

    /*window.onbeforeunload = function(){
      return __cometi18n.messages.warning.exit;

    };*/

    g_.set( 'editor', editor, true );
    g_.set( 'generalSettings', settings, true );

    eb.frame();
    cockpit();
    //eb.cockpit();

    if( utils.isStringEmpty( metaData._sections ) ){
      eb.post( post.post_content );
      
    }
    node( _doc.body ).addClass( 'comet-globalLevel' );
    layout( data_.getData() ).init( frame, null );
    //c__.settings( '#comet-closeGeneralSettings' );
    //eb.sidebar();
    eb.preload();
    contextualize();

  });

}));