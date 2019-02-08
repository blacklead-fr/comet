/* Comet - Copyright (c) 2018 Blacklead   */

(function(cometAdmin) {
  // The global jQuery object is passed as a parameter
  cometAdmin(window.jQuery, window, document);

}(function($, window, document) {
  'use strict';
  var utils, comet;

  utils = {
    addQueryArgs: function( args, url ){
      var key, value, n, cut, _url, nkv, kv, ex, e, _ex, _e, __e, __ex, _args, h, ioHash, ioQ;

      if( typeof args !== 'object' ){
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
      if( typeof cut === 'number' && !isNaN( cut ) ){
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
    },
    isEmpty: function( str ){
      if( typeof str !== 'string' || str.length < 1 ){
        return true;
      }
      return false;
    },
    load: function( data ){
      var r;

      if( typeof data !== 'object' ){
        return false;
      }

      data.action = 'comet_ajax';
      data.nonce = cometdata.nonce;

      r = $.ajax({
        method: "POST",
        url: cometdata.ajax_url,
        data: data
      });
      return r;
    }
  };

  comet = {
    dialog: function( options ){
      var d, o, to;

      if( typeof options !== 'object' ){
        options = {};
      }

      if( !( 'id' in options ) || utils.isEmpty( options.id ) ){
        return false;
      }

      options.id = options.id.trim();
      d = document.getElementById( options.id );

      options.header = options.header || false;
      options.content = options.content || false;

      options.close = options.close || {};
      options.close.title = options.close.title || cometdata.ui.close;
      options.close.icon = options.close.icon || '<span class="cico cico-x"></span>';

      options.done = options.done || {};
      options.done.target = options.done.target || false;
      options.done.do = options.done.do || false;

      options.done.target = !utils.isEmpty( options.done.target ) ? options.done.target.trim() : false;

      if( d && d !== null && typeof d === 'object' ){
        d.remove();
      }

      d = document.createElement( 'div' );
      d.id = options.id;
      d.className = 'comet-dialog comet-dialogGlobal';

      o = '<div class="comet-dialogbox">';
      o += '<div class="comet-dialogHeader">';
      o += '<button class="comet-dialogCloseButton" title="' + options.close.title + '">' + options.close.icon + '</button>';
      if( options.header !== false ){
        o += options.header;
      }
      o += '</div>';

      o += '<div class="comet-dialogContent">';
      if( options.content !== false ){
        o += options.content;
      }else{
        o += cometdata.messages.unreach;
      }
      o += '</div>';
      o += '</div>';

      d.innerHTML = o;

      document.body.appendChild( d );

      to = '.comet-dialogCloseButton';
      if( options.done.target !== false && !utils.isEmpty( options.done.target ) ){
        to += ',' + options.done.target;
      }

      $( d ).on( 'click', to, { opts: options } , function(e){
        e.preventDefault();
        var self = this,
            options = e.data.opts,
            vr;

        if( $( self ).hasClass( 'comet-dialogCloseButton' ) ){
          d.remove();
          return true;
        }

        if( options.done.hasOwnProperty( 'do' ) && typeof options.done.do === 'function' ){
          vr = options.done.do( e, self );
          if( vr === 1 ){
            return false;
          }
          d.remove();
        }
      });
    },
    events: function( events ){
      var e;
      if( typeof events !== 'object' || !( 'length' in events ) || events.length < 1 ){
        return false;
      }

      for( e = 0; e < events.length; e++ ){
        (function() {
          var event = events[e];
          if( !( 'on' in event ) || !( 'trigger' in event ) || typeof event.do !== 'function' ){
            return false;
          }
          $(document).on( event.on, event.trigger, function( evt ){ event.do( evt, this ); });
        })(e);
      }
    },
    dashboard: {
      slider: function(){
        return {
          on: 'click',
          trigger: '.comet-dashboardSlideButton',
          do: function( event, ui ){
            event.preventDefault();
            var slide = ui.parentNode.parentNode,
                $ui = $( ui ),
                sc = 'comet-dashboardSlide',
                sibling = null,
                c, ch, a;
            if( $ui.hasClass( 'comet-next' ) && typeof slide.nextSibling === 'object' ){
              sibling = slide.nextSibling;
            }else if( $ui.hasClass( 'comet-prev' ) && typeof slide.previousSibling === 'object' ){
              sibling = slide.previousSibling;
            }else{
              return false;
            }
            ch = slide.parentNode.children;

            if( !sibling
              || sibling == null
              || typeof sibling !== 'object'
              || typeof ch !== 'object'
              || !( 'length' in ch )
              || ch.length < 1 ){
              return false;
            }

            for( a = 0; a < ch.length; a++ ){
              c = ch[a];
              if( $( c ).hasClass( sc ) ){
                c.style.display = 'none';
              }
            }
            sibling.style.display = 'block';
          }
        };
      },
      sidebar: {
        open: function(){
          return {
            on: 'click',
            trigger: '#comet-doSidebarOpen',
            do: function( event, ui ){
              event.preventDefault();
              var sidebar = document.getElementById( 'comet-dashboardSidebar' );

              if( !sidebar || sidebar == null || typeof sidebar !== 'object' ){
                return false;
              }

              sidebar.style.display = 'block';
            }
          };
        },
        close: function(){
          return {
            on: 'click',
            trigger: '#comet-doSidebarClose',
            do: function( event, ui ){
              event.preventDefault();
              var sidebar = document.getElementById( 'comet-dashboardSidebar' );

              if( !sidebar || sidebar == null || typeof sidebar !== 'object' ){
                return false;
              }

              sidebar.style.display = 'none';
            }
          };
        }
      },
      help: function(){
        return {
          on: 'click',
          trigger: '.comet-tooltip',
          do: function( event, ui ){
            event.preventDefault();
            var $ui = $( ui ),
                c = 'comet-active';
            
            if( $ui.hasClass( c ) ){
              $ui.removeClass( c );
              return;
            }
            $ui.addClass( c );
          }
        };
      },
      init: function(){
        var evts = [];
        evts[evts.length] = this.sidebar.open();
        evts[evts.length] = this.sidebar.close();
        evts[evts.length] = this.slider();
        evts[evts.length] = this.help();

        comet.events( evts );

      }
    },
    myTemplates: {
      new: {
        open: function(){
          return {
            on: 'click',
            trigger: '#comet-newTemplate',
            do: function( event, ui ){
              event.preventDefault();
              var c;
              c = '<div id="comet-newTemplateDialogContent">';
              c += '<input type="text" id="comet-newTemplateName" value=""/>';
              c += '<button id="comet-saveNewTemplate" title="' + cometdata.ui.save + '"><span class="cico cico-arrow-right-alt"></span></button>';
              c += '</div>';
              comet.dialog({
                id: 'comet-newTemplateDialog',
                header: '<h4>' + cometdata.titles.newTemp + '</h4>',
                content: c,
              });
            }
          };
        },
        save: function(){
          return {
            on: 'click',
            trigger: '#comet-saveNewTemplate',
            do: function( event, ui ){
              event.preventDefault();
              var input = document.getElementById( 'comet-newTemplateName' ),
                  msg = '', d,
                  div, name, aj, o;

              if( !input || input === null || typeof input !== 'object' ){
                msg = cometdata.messages.error;
              }else if( utils.isEmpty( ( name = ( 'value' in input ? input.value.trim() : '' ) ) ) ){
                msg = cometdata.messages.noTitle;
              }
              d = ui.parentNode.parentNode;

              if( typeof msg === 'string' && msg.length > 0 ){
                div = document.createElement( 'div' );
                div.setAttribute( 'class', 'comet-message comet-messageError' );
                div.innerHTML = msg;
                d.appendChild( div );
                return false;
              }

              o = '<div><span class="comet-dialogIconState comet-waitWhileIcon cico cico-spin"></span></div>';
              o += '<div class="comet-message">' + cometdata.messages.wait + '</div>';

              d.innerHTML = o;

              aj = utils.load({
                do: 'save',
                data: {
                  title: name,
                  post_type: 'comet_mytemplates',
                  content: '',
                  style: {},
                  meta: {},
                  status: 'publish'
                }
              }).done( function( r ){
                var url;

                if( typeof ( r = parseInt( r ) ) !== 'number' || isNaN( r ) || r <= 0 ){
                  o = '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                  o += '<div class="comet-message comet-messageError">' + cometdata.messages.error + '</div>';
                  d.innerHTML = o;
                  return;
                }
                url = utils.addQueryArgs( { post: r, action: 'edit', comet: 'template'  }, cometdata.edit_url );

                window.open( url, '_self' );
                o = '<div><span class="comet-dialogIconState cico cico-check"></span></div>';
                o += '<div class="comet-message comet-messageSuccess">' + cometdata.messages.stNew + '<br>' + cometdata.messages.redirect;
                o += ' <a href="' + encodeURI( url ) + '">' + cometdata.messages.gtep + '</a>.';
                o += '</div>';
                d.innerHTML = o;
              });
            }
          };
        },
      },
      export: {
        open: function(){
          return {
            on: 'click',
            trigger: '.comet-templateExport',
            do: function( event, ui ){
              event.preventDefault();
              var id, c;
              if(   typeof ui.dataset !== 'object'
                 || !( 'id' in ui.dataset )
                 || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                 || isNaN( id ) ){
                return false;
              }
              c = '<div id="comet-exportTemplateDialogContent">';
              c += '<input type="text" id="comet-exportNewTemplateName" value=""/>';
              c += '<button id="comet-exportNewTemplate" title="' + cometdata.ui.save + '" data-id="' + id + '"><span class="cico cico-arrow-right-alt"></span></button>';
              c += '</div>';
              comet.dialog({
                id: 'comet-exportTemplateDialog',
                header: '<h4>' + cometdata.titles.expTemp + '</h4>',
                content: c,
              });
            }
          };
        },
        save: function(){
          return {
            on: 'click',
            trigger: '#comet-exportNewTemplate',
            do: function( event, ui ){
              event.preventDefault();
              var input = document.getElementById( 'comet-exportNewTemplateName' ),
                  msg = '', d,
                  div, name, aj, o, id;

              if( !input
                || input === null
                || typeof input !== 'object'
                || typeof ui.dataset !== 'object'
                || !( 'id' in ui.dataset )
                || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                || isNaN( id ) ){
                msg = cometdata.messages.error;
              }else if( utils.isEmpty( ( name = ( 'value' in input ? input.value.trim() : '' ) ) ) ){
                msg = cometdata.messages.noTitle;
              }
              d = ui.parentNode.parentNode;

              if( typeof msg === 'string' && msg.length > 0 ){
                div = document.createElement( 'div' );
                div.setAttribute( 'class', 'comet-message comet-messageError' );
                div.innerHTML = msg;
                d.appendChild( div );
                return false;
              }

              o = '<div><span class="comet-dialogIconState comet-waitWhileIcon cico cico-spin"></span></div>';
              o += '<div class="comet-message">' + cometdata.messages.wait + '</div>';

              d.innerHTML = o;

              aj = utils.load({
                do: 'get',
                id: id,
              }).done( function( r ){
                var data, str, uri, obj, a;
                
                if( r == '0' || typeof ( data = $.parseJSON( r ) ) !== 'object' || !( 'post_content' in data ) ){
                  o = '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                  o += '<div class="comet-message comet-messageError">' + cometdata.messages.error + '</div>';
                  d.innerHTML = o;
                  return;
                }

                obj = {
                  title: name,
                  content: data.post_content,
                  meta: typeof data.meta === 'object' ? data.meta : {},
                  style: typeof data.style === 'object' ? data.style : {}
                };

                str = JSON.stringify( obj );
                uri = 'data:application/json;charset=utf-8,' + encodeURIComponent( str );

                a = document.createElement( 'a' );
                a.setAttribute( 'href', uri );
                a.setAttribute( 'class', 'comet-button comet-buttonPrimary' );
                //a.setAttribute( 'id', 'comet-downloadTemplate' );
                a.setAttribute( 'download', encodeURI( name ) + '.json' );
                a.innerHTML = cometdata.ui.download;

                o = '<div><span class="comet-dialogIconState cico cico-check"></span></div>';
                o += '<div class="comet-message comet-messageSuccess">'+ cometdata.messages.stNew;
                o += '</div>';
                d.innerHTML = o;
                d.appendChild( a );
              });
            }
          };
        },
      },
      import: {
        open: function(){
          return {
            on: 'click',
            trigger: '#comet-importTemplateBtn',
            do: function( event, ui ){
              var input = document.getElementById( 'comet-importTemplateFile' ), c;

              if( input && input !== null && typeof input === 'object' ){
                c = '<div id="comet-importTemplateDialogContent">';
                c += cometdata.messages.file;
                c += '</div>';
                comet.dialog({
                  id: 'comet-importTemplateDialog',
                  header: '<h4>' + cometdata.titles.impTemp + '</h4>',
                  content: c,
                });
                input.click();
              }
              return;
            }
          };
        },
        save: function(){
          return {
            on: 'change',
            trigger: '#comet-importTemplateFile',
            do: function( event, ui ){
              var files = ui.files,
                  file, f, reader, d, o, id, n;

              if( typeof files !== 'object' || !( 'length' in files ) || files.length < 1 ){
                return false;
              }
              d = document.getElementById( 'comet-importTemplateDialogContent' );
              o = '<ul class="comet-importTemplateItems">';
              n = 1;

              for( f = 0; f < files.length; f++ ){
                file = files[f];
                if( !file.type.match( 'json' ) ){
                  continue;
                }
                reader = new FileReader();
                id = 'comet-importTemplateId' + n;
                o += '<li id="' + id + '" class="comet-importTemplateItem">' + escape( file.name ) + '<div class="comet-waitWhileIcon cico cico-spin"></div></li>';

                reader.onload = (function(theFile, _id ){
                  return function(e){
                    var r = e.target.result,
                        data = JSON.parse( r ),
                        aj;

                    if( typeof data !== 'object' || !( 'title' in data ) || typeof data.meta !== 'object' || !( 'content' in data ) ){
                      return false;
                    }
                    data.post_type = 'comet_mytemplates';
                    aj = utils.load({
                      do: 'save',
                      data: JSON.stringify( data ),
                    }).done( function( r ){
                      var a, w;
                      $( document.getElementById( _id ) ).children( '.comet-waitWhileIcon' ).attr( 'class', 'cico cico-check' );
                      w = $( document.getElementsByClassName( 'comet-importTemplateItem' ) ).children( '.comet-waitWhileIcon' );
                      if( !w || typeof w !== 'object' || w.length < 1 ){
                        a = document.createElement( 'a' );
                        a.href = encodeURI( cometdata.myTemplates );
                        a.setAttribute( 'class', 'comet-button comet-buttonPrimary' );
                        a.innerHTML = cometdata.ui.done;
                        d.appendChild( a );
                      }
                    });
                  };
                })(file, id);
                reader.readAsText( file );
                n++;
              }
              o += '</ul>';

              d.innerHTML = o;
            }
          }
        }
      },
      preview: {
        open: function(){
          return {
            on: 'click',
            trigger: '.comet-templatePreview',
            do: function( event, ui ){
              event.preventDefault();
              var id, c, url;

              c = '<div id="comet-previewTemplateDialogContent">';

              if(    typeof ui.dataset !== 'object'
                  || typeof ui.dataset.id !== 'string'
                  || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                  || isNaN( id ) ){
                    c += '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                    c += '<div class="comet-message comet-messageError">' + cometdata.messages.unreach + '</div>';

              }else{
                url = utils.addQueryArgs( { comet: 'mytemplates', action: 'preview', id: id  }, cometdata.admin_url );
                c += '<iframe src="' + encodeURI( url ) + '"></iframe>';
              }
              c += '</div>';
              
              comet.dialog({
                id: 'comet-previewTemplateDialog',
                header: '<h4>' + cometdata.titles.ptemp + '</h4>',
                content: c
              });
            }
          };
        },
      },
      delete: {
        open: function(){
          return {
            on: 'click',
            trigger: '.comet-templateDelete',
            do: function( event, ui ){
              event.preventDefault();
              var c, id;

              if(  ui == null
                || !ui
                || typeof ui !== 'object'
                || typeof ui.dataset !== 'object'
                || typeof ui.dataset.id !== 'string'
                || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                || isNaN( id ) ){

                  comet.myTemplates.delete.id = false;
                  comet.myTemplates.delete.context = false;
              }else{
                comet.myTemplates.delete.id = id;
                comet.myTemplates.delete.context = ui;
              }

              c = '<div id="comet-deleteTemplateDialogContent">';
              if( comet.myTemplates.delete.id ){
                c += cometdata.messages.delete;
              }else{
                c += cometdata.messages.notDel;
              }
              c += '<div class="comet-buttonset">';
              c += '<button id="comet-doTemplateDelCan" class="comet-button comet-buttonCancel">' + cometdata.ui.cancel + '</button>';
              if( comet.myTemplates.delete.id ){
                c += '<button id="comet-doTemplateDelete" class="comet-button comet-buttonPrimary">' + cometdata.ui.delete + '</button>';
              }
              c += '</div>';
              c += '</div>';
              comet.dialog({
                id: 'comet-deleteTemplateDialog',
                header: '<h4>' + cometdata.titles.delTemp + '</h4>',
                content: c,
                done: {
                  target: '#comet-doTemplateDelCan',
                  do: function( e, ui ){
                    e.preventDefault();
                    return true;
                  }
                }
              });
            }
          };
        },
        save: function(){
          return {
            on: 'click',
            trigger: '#comet-doTemplateDelete',
            do: function( event, ui ){
              event.preventDefault();
              var id, c, m;

              c = document.getElementById( 'comet-deleteTemplateDialogContent' );

              if( !c || c == null || typeof c !== 'object' ){
                return false;
              }

              m = '<div><span class="comet-dialogIconState comet-waitWhileIcon cico cico-spin"></span></div>';
              m += cometdata.messages.wait;

              if(    !comet.myTemplates.delete.id
                  || typeof ( id = parseInt( comet.myTemplates.delete.id ) ) !== 'number'
                  || isNaN( id ) ){
                    m = '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                    m += '<div class="comet-message comet-messageError">' + cometdata.messages.notDel + '</div>';

              }

              c.innerHTML = m;
              
              utils.load({
                do: 'dtemplate',
                id: id,
              }).done( function( r ){
                var div = document.getElementById( 'comet-deleteTemplateDialogContent' ), o;

                o = '<div><span class="comet-dialogIconState cico cico-check"></span></div>';
                o += '<div class="comet-message comet-messageSuccess">' + cometdata.messages.stDel + '</div>';
                

                if( r == 'false' ){
                  o = '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                  o += '<div class="comet-message comet-messageError">' + cometdata.messages.notDel + '</div>';
                }else{
                  comet.myTemplates.delete.context.parentNode.parentNode.remove();
                }
                div.innerHTML = o;
              });
            }
          };
        }
      },
      init: function(){
        var evts = [];
        evts[evts.length] = this.new.open();
        evts[evts.length] = this.new.save();
        evts[evts.length] = this.export.open();
        evts[evts.length] = this.export.save();
        evts[evts.length] = this.import.open();
        evts[evts.length] = this.import.save();
        evts[evts.length] = this.preview.open();
        evts[evts.length] = this.delete.open();
        evts[evts.length] = this.delete.save();

        comet.events( evts );
      }
    },
    fonts: {
      add: {
        open: function(){
          return {
            on: 'click',
            trigger: '#comet-addFont',
            do: function( event, ui ){
              event.preventDefault();
              var i = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + cometdata.apikey,
                  c, h, collection = [], a, f, ol = '', li;

              if(  ui == null
                || !ui
                || typeof ui !== 'object' ){
                  return false;
              }

              if( typeof cometdata.fonts === 'object' && 'length' in cometdata.fonts && cometdata.fonts.length > 0 ){
                collection = cometdata.fonts;

                ol = '<ul>';

                for( a = 0; a < collection.length; a++ ){
                  f = collection[a];
                  li = comet.fonts.add.kit.collectItem( f );
                  ol += li.outerHTML;
                }
                ol += '</ul>';
              }else{
                ol = cometdata.messages.selFonts;
              }
              comet.fonts.add.collection = collection;

              h = '<div class="comet-row col3">';
              h += '<div class="comet-column col1 text-left">';
              h += '<input type="text" id="comet-addFontsSearch" placeholder="' + cometdata.ui.search + '"/>';
              h += '</div>';

              h += '<div class="comet-column col2 text-center">';
              h += '<h4>' + cometdata.titles.selFonts + '</h4>';
              h += '</div>';

              h += '<div class="comet-column col3 text-right">';

              h += '<div id="comet-addFontsCollection">';
              h += '<header id="comet-addFontsCollectionHeader">';
              h += '<span id="comet-addFontsCollectionCount">' + collection.length + '</span>' + cometdata.titles.fonts;
              h += '</header>';
              h += '<main id="comet-addFontsCollectionContent">';
              h += '<div id="comet-addFontsCollectionList" class="comet-row text-center">';
              h += ol;
              h += '</div>';
              h += '<div class="comet-row text-center">';
              h += '<button id="comet-addFontsFromCollection" class="comet-button comet-buttonPrimary">' + cometdata.ui.import + '</button>';
              h += '</div>';
              h += '</main>';
              h += '</div>';
              h += '</div>';
              h += '</div>';

              c = '<div id="comet-addFontDialogContent">';
              c += '<div><span class="comet-dialogIconState comet-waitWhileIcon cico cico-spin"></span></div>';
              c += cometdata.messages.wait;
              c += '</div>';
              comet.dialog({
                id: 'comet-addFontDialog',
                header: h,
                content: c,

              });

              var failed = function(){
                var w = document.getElementById( 'comet-addFontDialogContent' ),
                    o;
                o = '<div><span class="comet-dialogIconState cico cico-exclamation"></span></div>';
                o += '<div class="comet-message comet-messageError">' + cometdata.messages.unreach + '</div>';
                w.innerHTML = o;
              }

              $.get( i, function( r ) {

                if( typeof r !== 'object'
                || 'error' in r
                || typeof r.items !== 'object'
                || !( 'length' in  r.items )
                || r.items.length < 1 ){
                  failed();
                  return false;
                }

                comet.fonts.add.fonts = r.items;
                comet.fonts.add.map();
          
                $( '.comet-dialogContent' ).on( 'scroll', function( e ){
                  var h = this.clientHeight,
                      de = document.getElementsByClassName( 'comet-defer' ),
                      a, d, $d, r, f, ff;

                    if( !de || typeof de !== 'object' || de.length < 1 ){
                      return;
                    }
                      
                    if( typeof comet.fonts.add._loaded !== 'object' ){
                      comet.fonts.add._loaded = {};
                    } 

                    for( a = 0; a < de.length; a++ ){
                      d = de[a];
                      if( typeof d !== 'object' || typeof d.dataset !== 'object' || typeof ( f = d.dataset.font ) !== 'string' || f.length < 1 ){
                        continue;
                      }
                      r = d.getBoundingClientRect();

                      if( ( r.top <= h ) && ( ( r.top + r.height ) >= 0 ) ){
                        $d = $( d );
                        ff = $d.children( 'h4.comet-listFontTitle' ).text();
                        comet.fonts.add._loaded[ff] = ff;
                        comet.fonts.add.style( f.trim() );
                        $d.removeClass( 'comet-defer' );
                      }
                    }
                });
              }).fail( function(){
                failed();
              });
            } 
          };
        },
        style: function( fs ){
          var dl = document.createElement( 'link' );
          dl.href = 'https://fonts.googleapis.com/css?family=' + fs;
          dl.rel = 'stylesheet';
          document.head.appendChild( dl );
        },
        map: function(){
          var offset, fonts, font, a, l, ll, ia, ib, o, cl, b, v, vo, n, i, _loaded;

          if( !( 'fonts' in comet.fonts.add ) ){
            return false;
          }
          
          _loaded = typeof comet.fonts.add._loaded === 'object' ? comet.fonts.add._loaded : {};
          fonts = comet.fonts.add.fonts;
          o = '';
          ll = '';
          ia = 0;
        
          for( a = 0; a < fonts.length; a++ ){
            font = fonts[a];
            if( typeof font !== 'object' || !( 'family' in font ) ){
              continue;
            }
            l = font.family;
            vo = '';
            if( typeof font.variants === 'object' && font.variants.length > 0 ){
              ib = 0;
              vo += '<select class="comet-listFontWeight">';
              for( b = 0; b < font.variants.length; b++ ){
                v = font.variants[b];
                switch( v ){
                  case '100':
                    n = 'Thin';
                    i = 100;
                    break;
                  case '200':
                    n = 'Extra-Light';
                    i = 200;
                    break;
                  case '300':
                    n = 'Light';
                    i = 300;
                    break;
                  case 'regular':
                  case '400':
                    n = 'Regular';
                    i = 400;
                    break;
                  case '500':
                    n = 'Medium';
                    i = 500;
                    break;
                  case '600':
                    n = 'Semi-Bold';
                    i = 600;
                    break;
                  case '700':
                    n = 'Bold';
                    i = 700;
                    break;
                  case '800':
                    n = 'Extra-Bold';
                    i = 800;
                    break;
                  case '900':
                    n = 'Heavy';
                    i = 900;
                    break;
                  default:
                    n = null;
                    i = null;
                }
                
                if( n === null || i === null ){
                  continue;
                }
                if( ib === 0 ){
                  l += ':';
                }else{
                  l += ',';
                }
                l += i;
                vo += '<option value="' + i + '">' + n + ' ' + i + '</option>';
                ib++;
              }
              vo += '<select>';
            }
            /*if( ia !== 0 ){
              l += '|';
            }*/
            //l += font.family;
            cl = 'comet-listFont';

            if( !_loaded.hasOwnProperty( font.family ) ){
              
              if( ia < 100 ){
                if( ia !== 0 ){
                  ll += '|';
                }
                _loaded[font.family] = font.family;
                ll += l;
                ia++;
              }else{
                cl += ' comet-defer';
              }
            }
        
            o += '<div class="' + cl + '" data-font="' + l + '">';
            o += '<h4 class="comet-listFontTitle">' + font.family + '</h4>';
            o += '<div class="comet-listFontControls">';
            o += vo;
            o += '<button class="comet-listFontSelect comet-button comet-buttonPrimary" title="' + cometdata.ui.select + '">+</button>';
            o += '</div>';
            o += '<div class="comet-listFontPreview" style="font-family:' + "'" + font.family + "'" + ';">';
            o += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus maximus nunc eget fermentum.';
            o += '</div>';
            o += '</div>';
          }
          if( ll.length > 0 ){
            comet.fonts.add.style( ll );
          }
          comet.fonts.add._loaded = _loaded;
          
          document.getElementById('comet-addFontDialogContent').innerHTML = o;
        },
        change: function(){
          return {
            on: 'change',
            trigger: '.comet-listFontWeight',
            do: function( event, ui ){
              event.preventDefault();
              var v = parseInt( ui.value ),
                  pp, ch, c, a;
              switch( v ){
                case 100:
                case 200:
                case 300:
                case 400:
                case 500:
                case 600:
                case 700:
                case 800:
                case 900:
                  pp = ui.parentNode.parentNode;
                  ch = pp.children;

                  if( typeof ch !== 'object' || ch.length < 1 ){
                    return;
                  }
                  for( a = 0; a < ch.length; a++ ){
                    c = ch[a];
                    if( !c || typeof c !== 'object' || !$( c ).hasClass( 'comet-listFontPreview' ) ){
                      continue;
                    }
                    c.style.fontWeight = v;
                  }

                  break;
                default:
                  return false;
              }
            } 
          };
        },
        search: function(){
          return {
            on: 'input propertychange',
            trigger: '#comet-addFontsSearch',
            do: function( event, ui ){
              event.preventDefault();
              var titles = document.getElementsByClassName( 'comet-listFontTitle' ),
                  v = ui.value.toLowerCase().trim(), a, title, text;

              if( !titles
                || typeof titles !== 'object'
                || !( 'length' in titles )
                || titles.length < 1 ){
                  return false;
              }

              for( a = 0; a < titles.length; a++ ){
                title = titles[a];
                text = title.textContent.toLowerCase().trim();
                if( v !== '' && text !== '' && text.search( v ) == -1 ){
                  title.parentNode.style.display = 'none';
                  continue;
                }
                title.parentNode.style.display = 'inline-block';
              }
            }
          };
        },
        kit: {
          collectItem: function( title ){
            var o, li;
            
            o = '<span>' + title + '</span>';
            o += '<button class="comet-aFCLItemDelete comet-button cico cico-x"></button>';
            li = document.createElement( 'li' );
            li.innerHTML = o;

            return li;

          }
        },
        select: function(){
          return {
            on: 'click',
            trigger: '.comet-listFontSelect',
            do: function( event, ui ){
              event.preventDefault();
              var p, a, c, co, o, pl, ul, li, title, weight, collection = [], get, has = false;
              p = ui.parentNode;
              
              if( typeof comet.fonts.add.collection === 'object' ){
                collection = comet.fonts.add.collection;
              }

              get = function( pa, cl ){
                var ch = pa.children;
                var a, c;

                for( a = 0; a < ch.length; a++ ){
                  c = ch[a];

                  if( !c || typeof c !== 'object' || !$( c ).hasClass( cl ) ){
                    continue;
                  }
                  return c;
                }

              }
              
              title = get( p.parentNode, 'comet-listFontTitle' ).textContent.trim();
              weight = get( p, 'comet-listFontWeight' ).value.trim();
              co = title + ':' + weight;

              for( a = 0; a < collection.length; a++ ){
                c = collection[a]; 
                if( co === c ){
                  has = true;
                  break;
                }
              }
              if( has ){
                return;
              }
              pl = document.getElementById( 'comet-addFontsCollectionList' );
              if( !pl || typeof pl !== 'object' ){
                return;
              }

              if( typeof pl.children === 'object' && 'length' in pl.children && pl.children.length > 0 ){
                
                for( a = 0; a < pl.children.length; a++ ){
                  c = pl.children[a]; 
                  if( c.nodeName.toLowerCase() === 'ul' ){
                    ul = c;
                    break;
                  }
                }
              }

              li = comet.fonts.add.kit.collectItem( co );

              if( typeof ul !== 'object' ){
                pl.innerHTML = '<ul>' + li.outerHTML + '</ul>';
              }else{
                ul.appendChild( li );
              }

              collection.push( co );
              comet.fonts.add.collection = collection;

              document.getElementById( 'comet-addFontsCollectionCount' ).innerHTML = collection.length;


            } 
          };
        },
        delete: function(){
          return {
            on: 'click',
            trigger: '.comet-aFCLItemDelete',
            do: function( event, ui ){
              event.preventDefault();
              var p = ui.parentNode,
                  div = p.parentNode.parentNode,
                  si, collection, c, a;
              
              if( !p
                || typeof p !== 'object'
                || typeof ( collection = comet.fonts.add.collection ) !== 'object'
                || !( 'length' in collection )
                || collection.length < 1 ){
                return;
              }

              if( typeof ui.previousSibling === 'object' && ui.previousSibling.nodeName.toLowerCase() === 'span' ){
                si = ui.previousSibling;
              }else if( typeof ui.nextSibling === 'object' && ui.nextSibling.nodeName.toLowerCase() === 'span' ){
                si = ui.nextSibling;
              }else{
                return;
              }
              si = si.textContent;

              for( a = 0; a < collection.length; a++ ){
                c = collection[a];
                if( si.toLowerCase() === c.toLowerCase() ){
                  collection.splice( a, 1 );
                  break;
                }
              }
              p.parentNode.removeChild( p );
              comet.fonts.add.collection = collection;
              document.getElementById( 'comet-addFontsCollectionCount' ).innerHTML = collection.length;
              if( collection.length <= 0 ){
                div.innerHTML = cometdata.messages.selFonts;

              }
            }
          }
        },
        toggle: function(){
          return {
            on: 'click',
            trigger: '#comet-addFontsCollectionHeader',
            do: function( event, ui ){
              event.preventDefault();
              var p = ui.parentNode,
                  cn = p.className,
                  tog = 'comet-active',
                  has = false,
                  cl, c, a, ncl;
              if( typeof cn === 'string' && ( cn = cn.trim() ) && cn.length > 0 ){
                cl = cn.split( ' ' );
                if( cl.length > 0 ){
                  ncl = [];
                  for( a = 0; a < cl.length; a++ ){
                    c = cl[a];
                    if( c === tog ){
                      has = true;
                      continue;
                    }
                    ncl.push( c );
                  }
                  if( !has ){
                    ncl.push( tog );
                  }
                  p.setAttribute( 'class', ncl.join( ' ' ) );
                  return;
                }
              }
              p.setAttribute( 'class', tog );
            }
          }
        },
        import: function(){
          return {
            on: 'click',
            trigger: '#comet-addFontsFromCollection',
            do: function( event, ui ){
              event.preventDefault();
              var $ui = $( ui ), 
                  ac = 'comet-active',
                  collection;

              if( $ui.hasClass( ac )
              || typeof ( collection = comet.fonts.add.collection ) !== 'object'
              || !( 'length' in collection )
              || collection.length < 1 ){
                return false;
              }

              $ui.addClass( ac );
              ui.innerHTML = '<span class="comet-waitWhileIcon cico cico-spin"></span>';

              utils.load({
                do: 'sfonts',
                data: collection
              }).done( function( r ){
                var map = document.getElementById( 'comet-mapFonts' ),
                a, font, f, i, o;

                r = parseInt( r );

                if( !isNaN( r ) && r === 1 && map && map != null && typeof map === 'object' ){

                  o = '';

                  for( a = 0; a < collection.length; a++ ){
                    font = collection[a];
                    f = font.split( ':' );
                    if( typeof f[0] !== 'string' || typeof ( i = parseInt( f[1] ) ) !== 'number' || isNaN( i ) ){
                      continue;
                    }
                    
                    switch( i ){
                      case 100:
                      case 200:
                      case 300:
                      case 400:
                      case 500:
                      case 600:
                      case 700:
                      case 800:
                      case 900:
                        break;
                      default: 
                        continue;
                    }
                    o += '<li><h4>' + f[0] + ' ' + i +'</h4>';
                    o += '<p style="font-family:' + f[0] + ';font-weight:' + i + ';">';
                    o += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
                    o += '</p>';
                    o += '</li>';
                  }
                  map.innerHTML = o;
                }
                $ui.removeClass( ac );
                ui.innerHTML = cometdata.ui.import;
              });
            }
          }
        },
      },
      init: function(){
        var evts = [];
        evts[evts.length] = this.add.open();
        evts[evts.length] = this.add.change();
        evts[evts.length] = this.add.search();
        evts[evts.length] = this.add.select();
        evts[evts.length] = this.add.delete();
        evts[evts.length] = this.add.toggle();
        evts[evts.length] = this.add.import();

        comet.events( evts );

      }
    },
  };


  $(function() {
    comet.dashboard.init();
    comet.myTemplates.init();
    comet.fonts.init();
  });
}));
