/* Comet - Copyright (c) 2018 Blacklead   */

(function(cometEditor) {
  // The global jQuery object is passed as a parameter
  cometEditor(window.jQuery, window, document);

}(function($, window, document) {
  'use strict';
  var $doc = $( document ),
      $win = $( window ),
      editor = document.getElementById( 'comet-editor' ),
      $editor = $( editor ),
      winWidth = $win.outerWidth( true ),
      frame = document.getElementById( 'cpb-content' ),
      $frame = $( frame ),
      metaData = {},
      post = null,
      html = '',
      css = '',
      target = {
        id: null,
        type: null,
        node: null,
        state: null,
      },
      selection = {
        range: null,
        clicked: false,
      },
      comet = {
        getElement: function( name, type ){
          if( type === 'id' ){
            return document.getElementById( name );
          }
          return document.getElementsByClassName( name );
        },
        _get: function() {
          var oParametre = {},
              aItKey, nKeyId, aCouples;
          if (window.location.search.length > 1) {
            for ( aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
              aItKey = aCouples[nKeyId].split("=");
              oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
            }
          }
          return oParametre;
        },
        modal: function( options ){
          var obj = {};

          if( typeof options !== 'object' ){
            options = {};
          }

          options.id = options.id || 'comet-modal';
          options.title = options.title || 'Comet';
          options.position = options.position || 'auto';
          options.tabs = options.tabs || false;
          options.content = options.content || false;

          options.close = options.close || {};
          options.close.title = options.close.title || cometdata.ui.cancel;
          options.close.inner = options.close.inner || '<';
          options.close.do = options.close.do || false;

          options.done = options.done || {};
          options.done.title = options.done.title || false;
          options.done.inner = options.done.inner || false;
          options.done.do = options.done.do || false;

          obj.create = function(){
            var o, title, s = '';

            if( options.position !== 'auto' ){
              s = 'style="left:' + options.position + 'px"';
            }

            o = '<div id="' + options.id + '" class="comet-modalUi ' + options.id + '" ' + s + '>';
            o += '<div class="comet-modalInner">';
            o += '<div class="comet-modalHeader">';
            o += '<div class="comet-modalRow">';

            o += '<div class="comet-modalCol comet-modalTL">';
            o += '<button class="comet-button comet-modalClose" title="' + options.close.title + '">' + options.close.inner + '</button>';
            o += '</div>';
            o += '<div class="comet-modalCol comet-modalTL">';
            o += '<span>' + options.title + '</span>';
            o += '</div>';
            o += '<div class="comet-modalCol comet-modalTR">';
            if( typeof options.done.inner === 'string' && options.done.inner.length > 0 ){
              title = typeof options.done.title === 'string' && options.done.title.length > 0 ? 'title="' + options.done.title + '"' : '';
              o += '<button class="comet-button comet-buttonPrimary comet-modalDone" ' + title + '>' + options.done.inner + '</button>';
            }
            o += '</div>';

            o += '</div>'; // Row

            if( options.tabs !== false ){
              o += '<ul class="comet-modalRow comet-modalTabs">';
              o += options.tabs;
              o += '</ul>'; // Row
            }

            o += '</div>'; // Header

            o += '<div class="comet-modalContent">';
            if( options.content !== false ){
              o += options.content;
            }else{
              o += cometdata.messages.unreach;
            }
            o += '</div>';
            o += '</div>';
            o += '</div>';

            $editor.append( o );
          };

          obj.destroy = function(){
            var m = document.getElementById( options.id );
            if( m ){
              $( m ).remove();
            }
          };

          obj.init = function(){
            obj.destroy();
            obj.create();
            $( '#' + options.id.trim() ).on( 'click', '.comet-modalClose, .comet-modalDone', { opts: options } , function(e){
              var self = this,
                  options = e.data.opts;
              e.preventDefault();
              obj.destroy();
              if( $( self ).hasClass( 'comet-modalDone' ) ){
                if( options.done.hasOwnProperty( 'do' ) && typeof options.done.do === 'function' ){
                  options.done.do( e, self );
                }
                return;
              }
              if( options.close.hasOwnProperty( 'do' ) && typeof options.close.do === 'function' ){
                options.close.do( e, self );
              }
            });
          }

          obj.init();

        },
        dialog: {
          _context: false,
          init: function( options ){
            var d, o, to;

            if( typeof options !== 'object' ){
              options = {};
            }

            if( !( 'id' in options ) || cometUtils.eval.empty( options.id ) ){
              return false;
            }
            options.id = options.id.trim();
            d = document.getElementById( options.id );

            options.header = options.header || false;
            options.content = options.content || false;

            options.close = options.close || {};
            options.close.title = options.close.title || cometdata.ui.cancel;
            options.close.icon = options.close.icon || '<span class="cico cico-x"></span>';

            options.done = options.done || {};
            options.done.target = options.done.target || false;
            options.done.do = options.done.do || false;

            options.done.target = !cometUtils.eval.empty( options.done.target ) ? options.done.target.trim() : false;

            if( d && d !== null && typeof d === 'object' ){
              d.remove();
            }

            d = document.createElement( 'div' );
            d.id = options.id;
            d.className = 'comet-dialog comet-dialogGlobal';

            o = '<div class="comet-dialogbox">';
            o += '<div class="comet-dialogHeader">';
            o += '<button class="comet-button comet-dialogCloseButton" title="' + options.close.title + '">' + options.close.icon + '</button>';
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
            if( options.done.target !== false && !cometUtils.eval.empty( options.done.target ) ){
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
                vr = options.done.do( e, self, comet.dialog._context );
                if( vr === 1 ){
                  return false;
                }
                d.remove();
              }
            });
          }
        },
        node: function( node ){
          var func = {};

          func.isNode = function(){
            if( !node || node.nodeType !== Node.ELEMENT_NODE ){
              return false;
            
            }
            return true;
          };

          func.classList = function(){
            var cl;

            if( this.isNode() && 'className' in node && typeof ( cl = node.className.split( ' ' ) ) === 'object' ){
                return cl;
            }
            return [];
          };

          func.hasClass = function( classe ){
            var classes, a;
            if( ( classes = this.classList() ).length < 1 ){
              return false;
            }
            for( a = 0; a < classes.length; a++ ){
              if( classes[a] == classe ){
                return true;
              }
            }
            return false;
          };

          func.removeClass = function( classe ){
            var classes, a, j = [];
            if( ( classes = this.classList() ).length < 1 ){
              return;
            }
            for( a = 0; a < classes.length; a++ ){
              if( classes[a] == classe ){
                continue;
              }
              j[j.length] = classes[a];
            }
            node.className = j.join( ' ' );
          };

          func.addClass = function( classe ){
            var classes = this.classList();
            if( !this.isNode() ){
              return node;
            }
            classes[classes.length] = classe;
            node.className = classes.join( ' ' );
          };

          func.closest = function( className ){
            var next, prev, cur;
            if( !this.isNode() ){
              return node;
            }

            cur = function( n, sib ){

              var sibling = sib === 'previous' ? n.previousSibling : n.nextSibling;

              if( !comet.node( sibling ).isNode() ){
                return false;
              }

              if( comet.node( sibling ).hasClass( className ) ){
                return sibling;
              }
              return cur( sibling, sib );
            }
            
            next = cur( node, 'next' );

            if( comet.node( next ).isNode() ){
              return next;
            }
            
            prev = cur( node, 'previous' );

            if( comet.node( prev ).isNode() ){
              return prev;
            }
            return false;
          };

          func.children = function( className ){
            var a, ch, n, ns, nds = [], r;

            if( !this.isNode() || typeof node.children !== 'object' || node.children.length < 1 ){
              return false;
            }
            ch = node.children;

            for( a = 0; a < ch.length; a++ ){
              n = ch[a];
              ns = comet.node( n );

              if( !ns.isNode() || !ns.hasClass( className ) ){
                continue;
              }
              nds[nds.length] = n;
              if( 1 in arguments && typeof arguments[1] === 'function' ){
                r = arguments[1]( n, a, ch );
                if( r === 0 ){
                  break;
                }
              }
            }
            return nds;

          };

          func.child = function( className ){
            var c = this.children( className, function(){ return 0; } );

            if( typeof c === 'object' && 0 in c && comet.node( c[0] ).isNode() ){
              return c[0];
            }
            return false;
          }

          return func;
        },
        get: {
          activeMenuButton: function(){
            var buttons = document.getElementsByClassName( 'comet-menuComponentButton' ),
                button, b;
            if( !buttons || typeof buttons !== 'object' || !( 'length' in buttons ) || buttons.length < 1 ){
              return false;
            }

            for( b = 0; b < buttons.length; b++ ){
              button = buttons[b];
              if( comet.node( button ).hasClass( 'cpb-active' ) ){
                return button;
              }
            }
            return false;
          },
          node: {
            style: function( id, type ){
              var s;
              
              if( typeof ( id = parseInt( id ) ) !== 'number'
              || isNaN( id )
              || ( type !== 'sections' && type !== 'rows' && type !== 'columns' && type !== 'elements' ) ){
                return false;
              }
              s = document.getElementById( 'cpb-style' + cometUtils.generate.capitalize( type ) + id );

              if( !s || s == null || typeof s !== 'object' || s.nodeName.toLowerCase() !== 'style' ){
                return false;
              }
              return s;
            },
            child: function( ns, className ){
              var a, ch, n;
              if( !ns || typeof ns !== 'object' || typeof ns.children !== 'object' || ns.children.length < 1 ){
                return false;
              }
              ch = ns.children;
  
              for( a = 0; a < ch.length; a++ ){
                n = ch[a];

                if( !n || typeof n !== 'object' || !comet.node( n ).hasClass( className ) ){
                  continue;
                }
                return n;
              }
              return false;
            },
            children: function( ns, className ){
              var a, ch, n, nds = [];
              if( !ns || typeof ns !== 'object' || typeof ns.children !== 'object' || ns.children.length < 1 ){
                return false;
              }
              ch = ns.children;
  
              for( a = 0; a < ch.length; a++ ){
                n = ch[a];

                if( !n || typeof n !== 'object' || !comet.node( n ).hasClass( className ) ){
                  continue;
                }
                nds[nds.length] = n;
              }
              return nds;
            }
          },
          content: function(){
            var o = '',
                elements = document.getElementsByClassName( 'cpb-elementContent' ),
                element;

            if( elements && typeof elements === 'object' && elements.length > 0 ){
              for( var a  = 0; a < elements.length; a++ ){
                element = elements[a];
                if( !element || typeof element !== 'object' ){
                  continue;
                }
                o += element.innerHTML;
              }
            }

            return o;
          }
          /*css: function(){
            var all = document.getElementsByClassName( 'cpb-style' ),
                o = {},
                css, a, id;
            
            if( !all || all == null || typeof all !== 'object' || all.length < 1 ){
              return '';
            }

            for( a = 0; a < all.length; a++ ){
              css = all[a];
              if( !css || typeof css !== 'object' || css.nodeName.toLowerCase() !== 'style' ){
                continue;
              }
              id = css.id.replace( /cpb\-style/gi, '' );
              o[id] = css.innerHTML;
            }
            return o;
          },
          html: function(){
            var html = document.createElement( 'div' ),
                els, el, a;

            html.innerHTML = frame.innerHTML;

            els = html.querySelectorAll( '.comet-js' );

            if( els.length > 0 ){
              for( a = 0; a < els.length; a++ ){
                el = els[a];
                $( el ).children( '.cpb-elementContent' ).html( '' );
              }
            }
            
            return html.innerHTML;

          }*/
        },
        insert: {
          html: function( node, obj ){
            var _in;
            if( typeof obj !== 'object' || !( 'html' in obj ) ){
              return false;
            }
            _in = node.innerHTML;
            if( 2 in arguments && arguments[2] === 'before' ){
              node.innerHTML = obj.html + _in;
              return true;
            }
            node.innerHTML = _in + obj.html;
            return true;
          },
          css: function( id, type, obj ){
            var c = false, cs;
            
            if( typeof obj !== 'object' || !( 'css' in obj ) ){
              return false;
            }
            c = comet.get.node.style( id, type );
            
            if( c !== false ){
              c.parentNode.removeChild( c );
            }

            $( 'head' ).append( obj.css );
            
            return true;
          }
        },
        generateTabMenu: function( id, name ){
          var o = '<li class="comet-modalTab"><a class="comet-modalTabRef" href="#' + id + '">' + name + '</a></li>';
          return o;
        },
        generateTabContent: function( id, inner ){
          var o = '<div id="' + id + '" class="comet-modalTab">';
          if( typeof inner === 'string' ){
            o += inner;
          }else{
            o += cometdata.messages.unreach;
          }
          o += '</div>';
          return o;
        },
        buildTabs: function( tabs, data ){
          var o, c, a, t, ts, p, inner, tid, sec, r = {};

          if( typeof tabs !== 'object' ){
            return false;
          }
          ts = '';
          p = '';
          for( a in tabs ){
            t = tabs[a];
            if( !t.hasOwnProperty( 'name' ) || ( a !== 'items' && ( !t.hasOwnProperty( 'sections' ) || typeof t.sections !== 'object' ) ) || ( a === 'items' && ( !t.hasOwnProperty( 'tabs' ) || typeof t.tabs !== 'object' ) ) ){
              continue;
            }
            tid = 'comet-modalTab' + a;
            sec = a === 'items' ? t.tabs : t.sections;
            ts += comet.generateTabMenu( tid, t.name );
            inner = comet.buildTab( sec, data, a );
            p += comet.generateTabContent( tid, inner );
          }

          r['tabs'] = ts;
          r['content'] = p;

          return r;

        },
        buildTab: function( sections, data ){
          var o, a, s, ids, i, id, it;
          if( typeof sections !== 'object' ){
            return '';
          }
          o = '';
          if( arguments && arguments[2] && arguments[2] === 'items' ){
            o += '<div class="comet-editorModalItems">';
            o += '<ul class="comet-edModalItems">';
            if( typeof data._items === 'string' && data._items.length > 0 && typeof metaData.items === 'object' ){
              ids = cometUtils.parse.ids( data._items, 'array' );
              for( i = 0; i < ids.length; i++ ){
                id = parseInt( ids[i] );
                if( typeof id !== 'number' || isNaN( id ) || !( id in metaData.items ) ){
                  continue;
                }
                o += comet.kit.item( id, ( 'title' in metaData.items[id] ? metaData.items[id].title.trim() : '' ) );
              }
            }
            o += '</ul>';
            o += '<div class="comet-edMIAdd"><button class="comet-button comet-buttonPrimary comet-edModalItemAdd"><span class="cico cico-plus"></span></button></div>';
            o += '</div>';
            return o;
          }

          for( a in sections ){
            s = sections[a];
            if( !( 'name' in s ) || typeof s.fields !== 'object' ){
              continue;
            }
            o += '<div class="comet-editorModalSection">';
            o += '<h4 class="comet-editorModalSectionHeader">' + s.name + '</h4>';
            o += '<div class="comet-editorModalSectionBody">';
            o += comet.buildFields( s.fields, data );
            o += '</div>';
            o += '</div>';
          }

          return o;
        },
        buildFields: function( fields, data ){
          var o, a, f, show, classes;

          if( typeof fields !== 'object' ){
            return '';
          }

          show = function( key, values ){
            var _show = true,
                check;

            if( 'check' in values ){
              check = values.check.split( ':' );
              if( typeof check === 'object' && check.length === 2 ){

                if( check[0] in data && data[check[0]] != check[1] ){
                  return false;
                }

              }

            }
            return _show;
          };

          o = '';
          for( a in fields ){
            f = fields[a];
            classes = 'comet-modalControlWrap';
            if( !show( a, f ) ){
              classes += ' comet-modalControlHide';
            }

            o += '<div class="' + classes + '">';
            if( 'label' in f ){
              o += '<div class="comet-modalControlLabel">';
              o += '<label for="comet-modalField' + a + '">';
              o += f.label;
              if( typeof f.desc === 'string' && f.desc.length > 0 ){
                o += '<span class="comet-modalTooltip">';
                o += '<span class="comet-modalTooltipIcon">?</span>';
                o += '<span class="comet-modalTooltipText">' + f.desc + '</span>';
                o += '</span>';
              }
              o += '</label>';
              o += '</div>';
            }
            o += comet.buildField( a, f, data );
            o += '</div>';
          }
          return o;
        },
        buildField: function( id, field, data ){
          var o, type, ctype, val, classes, adr, cs, c, cc, d, dt, cid, ccid, i, cval, cadr, on,
              checked, mms, generate, is_res, gradient, colors, color, stop, item, n, delta, angle;

          if( typeof field !== 'object' || typeof field.type !== 'string' ){
            return '';
          }

          type = field.type.trim();
          classes = 'comet-field comet-rendField';
          adr = 'comet-modalField' + id;
          ctype = 'comet-modalControl comet-modalControl' + cometUtils.generate.capitalize( type );
          is_res = field.responsive === 'true' ? true : false;

          dt = 'data-type="' + type + '"';

          if( type === 'color' ){
            classes += ' comet-fieldColor';
          }

          if( field.switch == 'true' ){
            classes += ' comet-fieldSwitch';
          }

          val = comet.getValue( id, field, data );
          o = '<div class="' + ctype + '">';
          switch( type ){
            case 'editor':
            case 'textarea':
              if( type === 'editor' ){
                classes += ' comet-fieldEditor';
                if( 'option' in field ){

                  switch( field.option ){
                    case 'advanced':
                      classes += ' comet-fieldEditorAdvanced';
                      break;
                    case 'force_tag':
                      classes += ' comet-fieldEditorForceTag';
                      break;
                  }
                }
              }
              o += '<textarea id="' + adr + '" name="' + id +'" class="' + classes + '" ' + dt + '>' + val + '</textarea>';
              break;
            case 'range':
              mms = '';
              if( 'min' in field ){
                mms += ' min="' + field.min + '"';
              }
              if( 'max' in field ){
                mms += ' max="' + field.max + '"';
              }
              if( 'step' in field ){
                mms += ' step="' + field.step + '"';
              }
              o += '<div class="comet-editRange">';
              o += '<button class="comet-eRDecrease comet-button">-</button>';
              o += '<div class="comet-eRange">';
              o += '<div class="comet-eRLine"></div>';
              o += '<div class="comet-eRDragger"></div>';
              o += '</div>';
              o += '<button class="comet-eRIncrease comet-button">+</button>';
              //o += '<input type="number" name="' + id +'" class="' + classes + '" value="' + val + '" ' + mms + ' ' + dt + '/>';
              o += '<input type="hidden" name="' + id +'" class="' + classes + '" value="' + val + '" ' + mms + ' ' + dt + '/>';
              o += '<div class="comet-eRValueUnit"><span class="comet-eRValue">' + val + '</span>' + ( 'unit' in field ? field.unit : '' ) + '</div>';
              /*if( field.hasOwnProperty( 'unit' ) ){
                o += '<span class="comet-modalFieldUnit">' + field.unit + '</span>';
              }*/
              o += '</div>';
              break;
            case 'number':
              o += '<input type="number" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
              if( 'unit' in field ){
                o += '<span class="comet-modalFieldUnit">' + field.unit + '</span>';
              }
              break;
            case 'numbers':

              if( typeof ( cs = field.values ) !== 'object' ){
                return '';
              }
              generate = function( id, val, label, device, classes){
                var o = '',
                    adr = 'comet-modalField' + id,
                    active = 'cpb-active';
                if( device !== 'd' ){
                  active = '';
                }
                o += '<div class="comet-modalFieldWrap ' + active + '" data-device="' + device + '">';
                o += '<input id="' + adr + '" type="number" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
                o += '<label for="' + adr + '">' + label + '</label>';
                o += '</div>';
                return o;
              };

              o += '<button class="comet-button comet-edControlInline comet-editorLock" title="' + cometdata.ui.unlocked + '"><span class="cico cico-unlock"></span></button>';
              if( is_res ){
                o += '<div class="comet-button comet-edControlInline comet-editorSwitchDevice">';
                o += '<span class="cico cico-desktop"></span>';
                o += '<div class="comet-edSDevices">';
                o += '<button class="comet-edSDevice" data-device="d"><span class="cico cico-desktop"></span><span class="comet-edSDTitle">' + cometdata.ui.desktop + '</span></button>';
                o += '<button class="comet-edSDevice" data-device="t"><span class="cico cico-tablet"></span><span class="comet-edSDTitle">' + cometdata.ui.tablet + '</span></button>';
                o += '<button class="comet-edSDevice" data-device="m"><span class="cico cico-mobile"></span><span class="comet-edSDTitle">' + cometdata.ui.mobile + '</span></button>';
                o += '</div>';
                o += '</div>';
              }
              o += '<div class="comet-modalControlBunch">';
              for( c in cs ){
                cid = id + c;
                cval = comet.getValue( cid, cs[c], data );

                o += generate( cid, cval, cs[c].label, 'd', classes );
                if( is_res ){
                  for( d = 1; d < 3; d++ ){
                    i = d === 1 ? 't' : 'm';
                    ccid = cid + i;
                    cval = comet.getValue( ccid, cs[c], data );
                    o += generate( ccid, cval, cs[c].label, i, classes );
                  }
                }
              }
              o += '</div>';

              break;
            case 'radio':

              if( typeof ( cs = field.values ) !== 'object' ){
                return '';
              }
              
              o += '<div class="comet-modalControlRadioWrap">';
              for( c in cs ){
                if( !( 'title' in cs[c] ) ){
                  continue;
                }
                cid = id + c;
                cadr = 'comet-modalField' + cid;
                cc = 'comet-modalFieldRadioWrap';
                checked = '';
                if( val === c ){
                  checked = 'checked="checked"';
                  cc += ' cpb-active';
                }
                o += '<label for="' + cadr + '" class="' + cc + '">';
                cc = 'comet-modalFieldRadioLabel';
                if( 'icon' in cs[c] ){
                  o += '<span class="comet-modalFieldRadioIcon ' + cs[c].icon + '"></span>';
                  cc += ' comet-tooltip';
                }
                o += '<span class="' + cc + '">' + cs[c].title + '</span>';
                o += '<input id="' + cadr + '" type="radio" name="' + id +'" class="' + classes + '" value="' + c + '" ' + checked + ' ' + dt + '/>';
                o += '</label>';

              }
              o += '</div>';
              break;
            case 'select':

              if( typeof ( cs = field.values ) !== 'object' ){
                return '';
              }

              if( 'switch' in field && field.switch == 'true' && typeof field.to === 'object' ){
                dt += ' data-switch="' + encodeURI( JSON.stringify( field.to ) ) + '"';

              }

              o += '<select id="' + adr + '" name="' + id + '" class="' + classes + '" ' + dt + '>';
              for( c in cs ){
                checked = c === val ? 'selected="selected"' : '';
                o += '<option value="' + c + '" ' + checked + '>' + cs[c] + '</option>';

              }
              o += '</select>';
              break;
            case 'image':
              o += '<div class="comet-editorImage">';
              o += comet.kit.image( val );
              o += '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
              o += '</div>';
              break;
            case 'icon':
              o += '<div class="comet-editorIcon">';
              o += comet.kit.icon( val );
              o += '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
              o += '</div>';
              break;
            case 'gradient':

              gradient = cometUtils.decode.gradient( val );

              if( !gradient || typeof gradient !== 'object' ){
                gradient = [];
              }

              gradient.length = gradient.length || 0;
              n = [];
              delta = 2 - gradient.length;
              for( c = 0; c < delta; c++ ){
                stop = c === 1 ? 100 : 0;
                n[c] = {
                  stop: stop,
                  color: '#FFF'
                };
              }
              colors = gradient.concat( n );

              o += '<div class="comet-editGradient">';
              o += '<div class="comet-eGColors">';
              o += '<div class="comet-eGLine"></div>';
              for( c = 0; c < colors.length; c++ ){
                item = colors[c];
                if( typeof item !== 'object' || !( 'color' in item ) || !cometUtils.eval.color( item.color ) ){
                  continue;
                }
                stop = item.stop || 0;
                stop = parseInt( item.stop );
                color = item.color;
                if( stop < 0 ){
                  stop = 0;
                }
                if( stop > 100 ){
                  stop = 100;
                }
                o += '<div class="comet-eGColor" style="left:' + stop + '%;"><input type="text" class="comet-eGColorPicker comet-fieldColor" value="' + color + '"/></div>';
              }
              o += '</div>';
              o += '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
              o += '</div>';
              break;
            case 'checkbox':
              checked = val == 'true' ? 'checked="checked"' : '';
              o += '<input type="checkbox" id="' + adr + '" name="' + id +'" class="' + classes + '" value="true" ' + dt + ' ' + checked +'/>';
              break;
            default:
              if( type === 'color' ){
                o += '<button class="comet-button comet-modalControlClearColor">Clear</button>';
              }
              o += '<input type="text" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
          }
          o += '</div>';
          return o;
        },
        getValue: function( id, field, data ){
          var value = '';
          if( 'std' in field ){
            value = field.std;
          }
          if( typeof data === 'object' && id in data ){
            value = data[id];
          }
          return value;
        },
        insertDataTo: function( obj ){
          var id, pid, parent, _parent, pchild, child, str, tp, a, b, index;
          if(   typeof obj !== 'object'
             || !( 'id' in obj )
             || !( 'in' in obj )
             || !( 'pid' in obj )
             || !( 'index' in obj )
             || typeof ( id = parseInt( obj.id ) ) !== 'number'
             || isNaN( id )
             || typeof ( pid = parseInt( obj.pid ) ) !== 'number'
             || isNaN( pid )
             || typeof obj.data !== 'object'
             || typeof obj.to !== 'object' ){
            return false;
          }

          switch( obj.in ){
            case 'sections':
              parent = 'sections';
              child = 'rows';
              break;
            case 'rows':
              parent = 'sections';
              child = 'columns';
              break;
            case 'columns':
              parent = 'rows';
              child = 'elements';
              break;
            case 'elements':
              parent = 'columns';
              child = 'items';
              break;
            case 'items':
              parent = 'elements';
              child = false;
              break;
            default:
              return false;
          }

          if( obj.in !== 'sections' ){
            if( typeof obj.to[parent] !== 'object' ){
              return false;
            }
            if( typeof obj.to[parent][pid] !== 'object' ){
              obj.to[parent][pid] = {};
            }
          }

          if( typeof obj.to[obj.in] !== 'object' ){
            obj.to[obj.in] = {};
          }

          if( typeof obj.to[obj.in][obj.id] !== 'object' ){
            obj.to[obj.in][obj.id] = {};
            //return false;
          }
          obj.to[obj.in][obj.id] = $.extend( true, {}, obj.data );

          _parent = '_' + parent;

          if( obj.in === 'sections' ){
            str = typeof obj.to[_parent] === 'string' ? obj.to[_parent] : '';
          }else{
            pchild = '_' + obj.in;
            str = typeof obj.to[parent][pid][pchild] === 'string' ? obj.to[parent][pid][pchild] : '';
          }

          str = str.trim();
          // HERE
          if( str.length < 1 ){
            str = /*'' +*/ id.toString();
          }else{
            switch( obj.index ){
              case 'last':
                if( str.substr( -1, 1 ) != ',' ){
                  str += ',';
                }
                str += /*'' +*/ id.toString();
                break;
              case 'first':
                if( str.substr( 0, 1 ) != ','  ){
                  str = ',' + str;
                }
                str = '' + id + str;
                break;
              default:
                if( typeof ( index = parseInt( obj.index ) ) === 'number' || isNaN( index ) || ( tp = str.indexOf( index, 0 ) ) === -1 ){
                  return false;
                }
                b = str.slice( 0, tp );
                a = str.slice( tp );
                str = b + id + ',' + a;
            }
          }

          if( obj.in === 'sections' ){
            obj.to[_parent] = str;
            return obj.to;
          }
          obj.to[parent][pid][pchild] = str;

          return obj.to;

        },
        addMetaData: function( id, data, type ){
          if( typeof metaData !== 'object' ){
            metaData = {};
          }
          if( !metaData.hasOwnProperty( type ) || typeof metaData[type] !== 'object' ){
            metaData[type] = {};
          }

          if( !metaData[type].hasOwnProperty( id ) || typeof metaData[type][id] !== 'object' ){
            metaData[type][id] = $.extend( true, {}, data );
            return true;
          }
          return false;
        },
        insertMetaData: function( id, data, type ){
          var r = comet.addMetaData( id, data, type );
          if( !r ){
            metaData[type][id] = $.extend( true, {}, data );
            return true;
          }
          return true;
        },
        updateMetaData: function( id, type ){
          var fields = document.getElementsByClassName( 'comet-field' ),
              data = {},
              f, fid, field, $field, t, val;

          id = parseInt( id );
          if(  target['item'] && target['item'] !== null && type === 'elements' && target['state'] && target.state === 'items' ){
            type = target.state;
            id = parseInt( target.item );
          }
          if( typeof id !== 'number' || isNaN( id ) || !fields.length ){
            return false;
          }

          if( typeof metaData !== 'object' || typeof metaData[type] !== 'object' || !metaData[type].hasOwnProperty( id ) ){
            return false;
          }

          if( typeof metaData[type][id] !== 'object' ){
            metaData[type][id] = {};
          }
          data = metaData[type][id];

          for( f in fields ){
            field = fields[f];
            if( typeof field !== 'object' || typeof field.dataset !== 'object' || typeof field.dataset.type === 'undefined' ){
              continue;
            }
            t = field.dataset.type.trim();
            fid = field.name;
            val = field.value;
            if( t === 'radio' ){
              if( $( field ).is( ':checked' ) ){
                data[fid] = val;
              }
              continue;
            }
            if( t === 'checkbox' ){
              if( $( field ).is( ':checked' ) ){
                data[fid] = val;
                continue;
              }
              data[fid] = 'false';
              continue;
            }
            data[fid] = val;
          }
          return data;
        },
        generateId: function( type ){
          var max = 0;

          if( typeof metaData !== 'object' ){
            metaData = {};
          }

          if( typeof metaData[type] !== 'object' ){
            metaData[type] = {};
          }

          max =  '_max' in metaData[type] ?  parseInt( metaData[type]._max ) : 0;

          if( typeof max !== 'number' || isNaN( max ) ){
            max = 0;
          }

          max = max + 1;

          metaData[type]._max = max;
          metaData[type][max] = {};

          return max;

        },
        init: function(){
          var get = comet._get(),
              $body = $( 'body' ),
              o, id1, id2, sid, rid, cid, eid, data;

          window.onbeforeunload = function(){
            return 'Do you really want to leave?';
          };

          if( !( 'post' in get )
            || !( 'action' in get )
            || !( 'comet' in get )
            || typeof ( id1 = parseInt( get.post ) ) !== 'number'
            || isNaN( id1 )
            || get.action !== 'edit'
            || typeof cometdata !== 'object'
            || typeof cometUtils !== 'object'
            || typeof cometdata.post !== 'object'
            || !( 'ID' in cometdata.post )
            || typeof ( id2 = parseInt( cometdata.post.ID ) ) !== 'number'
            || isNaN( id2 )
            || id1 !== id2
            || !( 'meta' in cometdata.post ) ){
            alert( cometdata.messages.unreach );
            return false;
          }
          $body.addClass( 'comet-globalLevel' );
          post = cometdata.post;
          metaData = post.meta;

          if( typeof metaData !== 'object'
            || typeof metaData._sections !== 'string'
            || metaData._sections.length < 1 ){
            sid = comet.generateId( 'sections' ),
            rid = comet.generateId( 'rows' ),
            cid = comet.generateId( 'columns' ),
            eid = comet.generateId( 'elements' );
              
            data = {
              tag: 'div',
              content: post.post_content,
              _type: 'text'
            };
              
            comet.insertId( sid, 'sections', 0, 'last' );
            comet.setDefaultData( sid, 'sections' );
            comet.insertId( rid, 'rows', sid, 'last' );
            comet.setDefaultData( rid, 'rows' );
            comet.insertId( cid, 'columns', rid, 'last' );
            comet.setDefaultData( cid, 'columns' );
            comet.insertId( eid, 'elements', cid, 'last' );
            comet.insertMetaData( eid, data, 'elements' );
          }

          cometUtils.init.comet( metaData );
          comet.handleSize();
          comet.events();

        },
        setDefaultData: function( id, type ){
          var data, a, t, b, s, c, f, d, v, dd, ft, ddid, val, st;
          switch( type ){
            case 'rows':
              data = cometdata.row;
              break;
            case 'sections':
              data = cometdata.section;
              break;
            case 'columns':
              data = cometdata.column;
              break;
            case 'items':
              if( typeof target.id === 'undefined' || target.id === null ){
                return false;
              }
              st = metaData.elements[target.id]._type;
              if( !cometdata.elements.hasOwnProperty( st ) ){
                return false;
              }
              data = cometdata.elements[st].tabs.items;
              break;
            default:
              if( !cometdata.elements.hasOwnProperty( type ) ){
                return false;
              }
              st = type;
              data = cometdata.elements[st];
              type = 'elements';
          }

          if( typeof data !== 'object' ){
            return false;
          }
          dd = {};
          if( type === 'elements' ){
            dd._type = st;
          }
          for( a in data ){
            t = data[a];
            if( typeof t !== 'object' || a === 'items' || !t.hasOwnProperty( 'sections' ) ){
              continue;
            }
            for( b in t.sections ){
              s = t.sections[b];
              if( typeof s !== 'object' || !s.hasOwnProperty( 'fields' ) ){
                continue;
              }
              for( c in s.fields ){
                f = s.fields[c];
                if( typeof f !== 'object' || !f.hasOwnProperty( 'type' ) || ( f.hasOwnProperty( 'protect' ) && f.protect === 'true' ) ){
                  continue;
                }
                ft = f.type;
                val = f.hasOwnProperty( 'std' ) ? f.std : '';
                if( ft === 'numbers' && f.hasOwnProperty( 'values' ) && typeof f.values === 'object' ){
                  for( d in f.values ){
                    v = f.values[d];
                    ddid = c + d;
                    if( typeof v === 'object' && v.hasOwnProperty( 'std' ) ){
                      dd[ddid] = v.std;
                      continue;
                    }
                    dd[ddid] = val;
                  }
                  continue;
                }
                dd[c] = val;
              }
            }
          }
          return comet.insertMetaData( id, dd, type );
        },
        insertId: function( id, type, catId, index ){
          var _in = null,
              cat, str, tp, a, b, r;

          id = parseInt( id );
          catId = parseInt( catId );
          if(   typeof id !== 'number'
             || isNaN( id )
             || typeof metaData !== 'object'
             || typeof metaData[type] !== 'object'
             || !( id in metaData[type] )
             || typeof catId !== 'number'
             || isNaN( catId ) ){
            return false;
          }

          switch( type ){
            case 'sections':
              cat = type;
              break;
            case 'rows':
              cat = 'sections';
              break;
            case 'columns':
              cat = 'rows';
              break;
            case 'elements':
              cat = 'columns';
              break;
            case 'items':
              cat = 'elements';
              break;
            default:
              return false;
          }
          _in = '_' + type;
          if( type === 'sections' ){
            str = typeof metaData[_in] === 'string' ? metaData[_in] : '';
          }else{
            if( typeof metaData[cat] !== 'object' || typeof metaData[cat][catId] !== 'object' ){
              return false;
            }
            str = typeof metaData[cat][catId][_in] === 'string' ? metaData[cat][catId][_in] : '';
          }
          str = str.trim();

          if( str.length < 1 ){
            str = id.toString();
          }else{
            switch( index ){
              case 'last':
                if( str.substr( -1, 1 ) != ',' ){
                  str += ',';
                }
                str += id.toString();
                break;
              case 'first':
                if( str.substr( 0, 1 ) != ',' ){
                  str = ',' + str;
                }
                str = id.toString() + str;
              default:
                if( typeof ( index = parseInt( index ) ) !== 'number' || isNaN( index ) || ( tp = str.indexOf( index, 0 ) ) === -1 ){
                  return false;
                }
                b = str.slice( 0, tp );
                a = str.slice( tp );
                str = b + id.toString() + ',' + a;
            }
          }

          if( type === 'sections' ){
            metaData[_in] = str;
            return true;
          }
          metaData[cat][catId][_in] = str;

          return true;
        },
        replaceId: function( id, nid, type, catId ){
          var _in = null,
              cat, str;

          switch( type ){
            case 'sections':
              cat = type;
              break;
            case 'sidebars':
              cat = 'sections';
              break;
            case 'rows':
              cat = 'sections';
              break;
            case 'columns':
              cat = 'rows';
              break;
            case 'elements':
              cat = 'columns';
              break;
            case 'items':
              cat = 'elements';
              break;
            default:
              return false;
          }
          _in = '_' + type;

          if( type === 'sections' ){
            str = metaData.hasOwnProperty( _in ) ? metaData[_in] : '';
          }else{
            if( typeof metaData[cat] !== 'object' || typeof metaData[cat][catId] !== 'object' ){
              return false;
            }
            str = metaData[cat][catId].hasOwnProperty( _in ) ? metaData[cat][catId][_in] : '';
          }
          str = str.trim();
          id = parseInt( id );
          nid = parseInt( nid );

          if( typeof id !== 'number' || isNaN( id ) || typeof nid !== 'number' || isNaN( nid ) ){
            return false;
          }

          str = str.replace( id, nid );

          if( type === 'sections' ){
            metaData[_in] = str;
          }else{
            metaData[cat][catId][_in] = str;
          }
          return true;
        },
        removeId: function( id, type, catId ){
          var _in = null,
              cat, str, ids, nids, cid, a, n, r;
          id = parseInt( id );
          catId = parseInt( catId );
          if(   typeof id !== 'number'
             || isNaN( id )
             || typeof metaData !== 'object'
             || typeof metaData[type] !== 'object'
             || !( id in metaData[type] )
             || typeof catId !== 'number'
             || isNaN( catId ) ){
            return false;
          }

          switch( type ){
            case 'sections':
              cat = type;
              break;
            case 'rows':
              cat = 'sections';
              break;
            case 'columns':
              cat = 'rows';
              break;
            case 'elements':
              cat = 'columns';
              break;
            case 'items':
              cat = 'elements';
              break;
            default:
              return false;
          }
          _in = '_' + type;

          if( type === 'sections' ){
            str = typeof metaData[_in] === 'string' ? metaData[_in] : '';
          }else{
            if( typeof metaData[cat] !== 'object' || typeof metaData[cat][catId] !== 'object' ){
              return false;
            }
            str = typeof metaData[cat][catId][_in] === 'string' ? metaData[cat][catId][_in] : '';
          }
          str = str.trim();
          ids = cometUtils.parse.ids( str, 'array' );
          if( typeof ids !== 'object' || !( 'length' in ids ) || ids.length < 1 ){
            return false;
          }
          nids = [];
          n = 0;
          for( a = 0; a < ids.length; a++ ){
            cid = parseInt( ids[a] );
            if( typeof cid !== 'number' || isNaN( cid ) || cid === id  ){
              continue;
            }
            nids[n] = cid;
            n++;
          }

          r = nids.join( ',' );

          if( type === 'sections' ){
            metaData[_in] = r;
          }else{
            metaData[cat][catId][_in] = r;
          }
          return true;
        },
        getSanitizedNodes: function( array, id, type ){
          var children = null,
              _children = null,
              isSidebar = false,
              nodes, node, nid, ids, a, n;

          if( typeof array !== 'object' || !array.length ){
            return false;
          }

          switch( type ){
            case 'sections':
              children = 'rows';
              break;
            case 'sidebars':
              isSidebar = true;
              type = 'sections';
              children = 'columns';
              break;
            case 'rows':
              children = 'columns';
              break;
            case 'columns':
              children = 'elements';
              break;
            case 'elements':
              children = 'items';
              break;
            default:
              children = null;
          }
          if( typeof metaData[type] !== 'object' || typeof metaData[type][id] !== 'object' ){
            return false;
          }
          _children = '_' + children;
          if( isSidebar ){
            _children = '_sidebars';
          }
          if( !metaData[type][id].hasOwnProperty( _children ) ){
            return false;
          }
          ids = cometUtils.parse.ids( metaData[type][id][_children], 'object' );

          if( !ids ){
            return false;
          }

          nodes = {};
          n = 0;
          for( a = 0; a < array.length; a++ ){
            node = array[a];
            if( typeof node.dataset === 'undefined' || typeof node.dataset.id === 'undefined' ){
              continue;
            }
            nid = parseInt( node.dataset.id );
            if( typeof nid !== 'number' || isNaN( nid ) ){
              continue;
            }
            if( !comet.hasId( nid, ids ) ){
              $( node ).remove();
              continue;
            }
            nodes[nid] = node;
            n++;
            nodes.length = n;
          }

          if( !nodes.length ){
            return false;
          }
          return nodes;

        },
        hasId: function( id, obj ){
          if( typeof obj !== 'object' ){
            return false;
          }
          if( obj.hasOwnProperty( id ) ){
            return true;
          }
          return false;
        },
        getId: function( id, obj ){
          if( comet.hasId( id, obj ) ){
            id = parseInt( id );
            if( typeof id === 'number' && !isNaN( id ) ){
              return id;
            }
          }
          return false;
        },
        removeMetaData: function( id, type ){
          var children = null,
              _children = null,
              isSidebar = false,
              cid, ids, a;

          switch( type ){
            case 'sections':
              children = 'rows';
              break;
            case 'sidebars':
              isSidebar = true;
              type = 'sections';
              children = 'columns';
              break;
            case 'rows':
              children = 'columns';
              break;
            case 'columns':
              children = 'elements';
              break;
            case 'elements':
              children = 'items';
              break;
            default:
              children = null;
          }
          if( typeof metaData[type] !== 'object' || typeof metaData[type][id] !== 'object' ){
            return false;
          }
          _children = '_' + children;
          if( isSidebar ){
            _children = '_sidebars';
          }
          if( children !== null && metaData[type][id].hasOwnProperty( _children ) && typeof metaData[children] === 'object' ){
            ids = cometUtils.parse.ids( metaData[type][id][_children], 'array' );
            if( ids.length ){
              for( a = 0; a < ids.length; a++ ){
                cid = parseInt( ids[a] );
                if( typeof cid !== 'number' || isNaN( cid ) || typeof metaData[children][cid] !== 'object' ){
                  continue;
                }
                comet.removeMetaData( cid, children );
                delete metaData[children][cid];
              }
            }
          }


          if( !isSidebar && type === 'sections' &&  metaData.hasOwnProperty( '_sections' ) ){
            comet.removeId( id, 'sections', 0 );
          }
          delete metaData[type][id];
          return true;
        },
        cloneMetaData: function( id, type, newId ){
          var children = null,
              _children = null,
              isSidebar = false,
              cid, ids, a, nid, r, n;

          switch( type ){
            case 'sections':
              children = 'rows';
              break;
            case 'sidebars':
              isSidebar = true;
              type = 'sections';
              children = 'columns';
              break;
            case 'rows':
              children = 'columns';
              break;
            case 'columns':
              children = 'elements';
              break;
            case 'elements':
              children = 'items';
              break;
            default:
              children = null;
          }
          if( typeof metaData[type] !== 'object' || typeof metaData[type][id] !== 'object' ){
            return false;
          }
          _children = '_' + children;
          if( isSidebar ){
            _children = '_sidebars';
          }

          if( children !== null && metaData[type][id].hasOwnProperty( _children ) && typeof metaData[children] === 'object' ){

            ids = cometUtils.parse.ids( metaData[type][id][_children], 'array' );
            if( ids.length ){
              n = 0;
              for( a = 0; a < ids.length; a++ ){
                cid = parseInt( ids[a] );
                if( typeof cid !== 'number' || isNaN( cid ) || typeof metaData[children][cid] !== 'object' ){
                  continue;
                }
                nid = comet.generateId( children );
                r = comet.insertMetaData( nid, metaData[children][cid], children );
                ids[a] = nid;
                metaData[type][newId][_children] = ids.join( ',' );
                comet.cloneMetaData( cid, children, nid );
                n++;
              }
            }
          }
        },
        initCloneMetaData: function( id, type, inId ){
          var nid, r;

          nid = comet.generateId( type );
          r = comet.insertMetaData( nid, metaData[type][id], type );
          if( !r ){
            return;
          }
          comet.insertId( nid, type, inId, 'last' );
          comet.cloneMetaData( id, type, nid );
          return nid;
        },
        moveNodeFromTo: function( mixed ){
          var type, ids, html;
          mixed = {
            from: {
              id: mixed.from.id || null,
              node: mixed.from.node || null,
              type: mixed.from.type || null,
            },
            node: {
              id: mixed.node.id || null,
              node: mixed.node.node || null,
              type: mixed.node.type || null,
            },
            to: {
              id: mixed.to.id || null,
              node: mixed.to.node || null,
              type: mixed.to.type || null,
            }
          };

          type = '_' + mixed.node.type;
          comet.removeId( mixed.node.id, mixed.node.type, mixed.from.id );
          comet.insertId( mixed.node.id, mixed.node.type, mixed.to.id, 'last' );

          html = mixed.node.node.outerHTML;
          $( mixed.node.node ).remove();
          $( mixed.to.node ).append( html );
        },
        getOffset: function( offset, nodes, os, n ){
          var id, node, max, to;
          if( typeof nodes !== 'object' ){
            return false;
          }

          if( typeof n !== 'number' || isNaN( n ) || n < 0 ){
            n = 0;
          }

          max = comet.getMax( nodes );
					if( !max ){
						return false;
					}
          os[max] = nodes[max];
          delete nodes[max];
          n = n + 1;
          os.length = n;
          offset = offset - 1;
          if( offset > 0 ){
            os = comet.getOffset( offset, nodes, os, n );
            return os;
          }

          to = comet.getMax( nodes );
          if( !to ){
            return false;
          }

          os['_to'] = {
            id: to,
            node: nodes[to],
          };

          return os;
        },
        getMax: function( obj ){
          var id, max, n;
          if( typeof obj !== 'object' ){
            return false;
          }
          max = 0;
          for( id in obj ){
            id = parseInt( id );
            if( typeof id !== 'number' || isNaN( id ) ){
              continue;
            }
            if( max <= id ){
              max = id;
            }
          }
          return max;
        },
        kit: {
          image: function( img ){
            var classes = {
                  remove: 'comet-edImageRemove',
                  upload: 'comet-edImageUpload'

                },
                browse = cometdata.ui.browse,
                remove = cometdata.ui.remove;
            if( typeof img !== 'string' || img.length <= 0 || !cometUtils.eval.image( img ) ){
              return '<button class="comet-button comet-buttonPrimary ' + classes.upload + '">' + browse + '</button>';
            }
            return '<div class="' + classes.upload + ' comet-edImage" title="' + browse + '"><img src="' + img + '"/><button class="comet-button comet-buttonPrimary ' + classes.remove + '" title="' + remove + '"><span class="cico cico-x"></span></button></div>';
          },
          icon: function( icon ){
            var classes = {
                  remove: 'comet-edIconRemove',
                  upload: 'comet-edIconUpload'

                },
                browse = cometdata.ui.browse,
                remove = cometdata.ui.remove;
            if( cometUtils.eval.empty( icon ) ){
              return '<button class="comet-button comet-buttonPrimary ' + classes.upload + '">' + browse + '</button>';
            }
            return '<div class="' + classes.upload + ' comet-edIcon" title="' + browse + '">' + cometUtils.generate.icon( icon ) + '</span><button class="comet-button comet-buttonPrimary ' + classes.remove + '" title="' + remove + '"><span class="cico cico-x"></span></button></div>';
          },
          item: function( id, title ){
            var o;
            o = '<li data-id="' + id + '" class="comet-edModalItem">';
            o += '<span><span>#' + id + '</span>';
            if( !cometUtils.eval.empty( title ) ){
              o += title;
            }
            o += '</span>';
            o += '<button class="comet-edModalItemEdit comet-button comet-buttonPrimary" title="' + cometdata.ui.edit + '"><span class="cico cico-edit"></span></button>';
            o += '<button class="comet-edModalItemDelete comet-button comet-buttonPrimary" title="' + cometdata.ui.delete + '"><span class="cico cico-trash"></span></button>';
            o += '</li>';
            return o;
          }
        },
        load: {
          set: function( set ){
            var sets = cometdata.svgSets,
                r = document.getElementById( 'comet-mipResult' ),
                div;

            if( !( set in  sets ) || !( 'set' in sets[set] ) || !r || r == null || typeof r !== 'object' ){
              return false;
            }
            div = document.createElement( 'div' );

            $( div ).load( sets[set].set, function( response, status, xhr ){
              var nodes = div.childNodes,
                  node, n, syms, sym, s, o, t, $t, vb;

              if( !nodes || typeof nodes !== 'object' || nodes.length < 1 ){
                return false;
              }

              o = '';
              for( n = 0; n < nodes.length; n++ ){
                node = nodes[n];
                if( !node || typeof node !== 'object' || node.nodeName.toLowerCase() !== 'svg' || !node.childNodes || typeof node.childNodes !== 'object' || node.childNodes.length < 0 ){
                  continue;
                }
                syms = node.childNodes;
                for( s = 0; s < syms.length; s++ ){
                  sym = syms[s];
                  if( typeof sym !== 'object' || sym.nodeName.toLowerCase() !== 'symbol' || !( 'id' in sym ) ){
                    continue;
                  }
                  vb = sym.getAttribute( 'viewBox' );
                  $t = $( sym ).children( 'title' );
                  t = $t.text();
                  $t.remove();
                  o += '<div class="comet-mipCollectionScope" data-id="' + set + ':' + sym.id.trim() + '">';
                  o += '<div class="comet-mipSvgIcon">';
                  o += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '">' + sym.innerHTML + '</svg>';
                  o += '</div>';
                  if( !cometUtils.eval.empty( t ) ){
                    o += '<span class="comet-mipSvgIconLabel">' + t + '</span>';
                  }
                  o += '</div>';
                }
              }
              r.innerHTML = o;
            });
          },
          temp: function( set ){
            var r = document.getElementById( 'comet-tempResult' ),
                l;
            if( !r || r == null || typeof r !== 'object' ){
              return false;
            }

            r.innerHTML = '<span class="comet-waitWhileIcon cico cico-spin"></span>';

            l = cometUtils.load({
              do: 'templates',
              data: set
            });
            if( !l ){
              return false;
            }

            l.done(function( re ){
              r.innerHTML = re;
            });
          }
        },
        toggle: {
          tabs: function( st ){
            var a = 'comet-modalTabRef',
                ac = 'cpb-active',
                ts = 'comet-modalTabs',
                tw = 'comet-modalContent',
                t = 'comet-modalTab',
                _ts, tsa, tsat, tst, tsb, tsbt, $tsbt, tsc, tsct, toggle;

            toggle = function( tab ){
              var ref = false,
                  li = tab.parentNode,
                  ul = li.parentNode,
                  lis = $( ul ).children( '.' + t ),
                  w = ul.parentNode.parentNode.children,
                  open = false,
                  co, coa, cot, cota, $cota, cob;

              if( !w.length || w.length <= 0 || !tab.attributes['href'] || !tab.attributes.href['value'] || typeof tab.attributes.href.value !== 'string' ){
                return;
              }
              ref = tab.attributes.href.value;

              for( coa = 0; coa < w.length; coa++ ){
                co = w[coa];
                if( !co || typeof co === 'undefined' || !$( co ).hasClass( tw ) ){
                  continue;
                }
                if( !co.children || co.children.length <= 0 ){
                  continue;
                }
                cot = co.children;

                for( cob = 0; cob < cot.length; cob++ ){
                  cota = cot[cob];
                  $cota = $( cota );
                  if( !cota || !$cota.hasClass( t ) ){
                    continue;
                  }
                  $cota.removeClass( ac ).hide();
                  if( cota.id === ref.substr( 1 ) ){
                    $cota.addClass( ac ).show();
                    open = true;
                  }
                }
              }
              if( open ){
                lis.removeClass( ac );
                $( li ).addClass( ac );
              }
            };

            if( st === 'init' ){
              _ts = document.getElementsByClassName( ts );
              if( !_ts || _ts.length <= 0 ){
                return;
              }

              for( tsa = 0; tsa < _ts.length; tsa++ ){
                tsat = _ts[tsa];
                if( typeof tsat === 'undefined' ){
                  continue;
                }
                tst = tsat.children;

                if( tst.length <= 0 ){
                  continue;
                }

                for( tsb = 0; tsb < tst.length; tsb++ ){
                  tsbt = tst[tsb];
                  $tsbt = $( tsbt );
                  if( typeof tsbt === 'undefined' || !$tsbt.hasClass( t ) ){
                    continue;
                  }
                  if( tsb !== 0 || tsbt.children.length <= 0 ){
                    continue;
                  }
                  for( tsc = 0; tsc < tsbt.children.length; tsc++ ){
                    tsct = tsbt.children[tsc];
                    if( $( tsct ).hasClass( a ) ){
                      toggle( tsct );
                    }
                  }
                }
              }
              return;
            }
            toggle( st );
          },
          accordion: function( st ){
            var state = 0,
                ca = 'cpb-active',
                ch = 'comet-editorModalSectionHeader',
                cbo = 'comet-editorModalSectionBody',
                hs, h, a, $s, tab;

            if( typeof st === 'object' && st.parentNode !== null && st.parentNode.parentNode !== null ){
              $s = $( st.parentNode );
              if( !$s.hasClass( ca ) ){
                state = 1;
              }
              tab = st.parentNode.parentNode;
              hs = tab.getElementsByClassName( ch );
            }else{
              hs = document.getElementsByClassName( ch );
            }

            if( typeof hs === 'object' && hs.length > 0 ){
              for( a = 0; a < hs.length; a++ ){
                h = hs[a];
                if( typeof h !== 'object' || h.parentNode === null ){
                  continue;
                }
                $( h.parentNode ).removeClass( ca ).children( '.' + cbo ).slideUp();

              }
            }

            if( st !== 'init' && state === 1 && typeof $s === 'object' ){
              $s.addClass( ca ).children( '.' + cbo ).slideDown();
              return true;
            }
          },
          editor: function(){
            var editors = document.getElementsByClassName( 'comet-fieldEditor' ),
                has = false,
                ed, e, n, na, state, x, o, b, btns, btn, cbtn, $tar;

            x = {
              toolbar: 'comet-editorToolbar',
              editor: 'comet-editorContentBody',
            };

            n = {
              toolbar: document.getElementById( x.toolbar ),
              editors: document.getElementsByClassName( x.editor )
            };

            state = ( '0' in arguments || arguments.hasOwnProperty('0') ) && arguments[0].toLowerCase() === 'close' ? 'close' : 'open';

            if( n.toolbar ){
              $( n.toolbar ).remove();
            }

            if( n.editors && n.editors.length > 0 ){
              $( n.editors ).removeAttr( 'contenteditable' );
            }
            cometUtils._editor = false;

            if( state === 'close' || !editors || editors.length < 1 ){
              $frame.css({ top: '0', height:'100%'});
              comet.handleSize();
              return true;
            }

            cometUtils._editor = target.id;
            $tar = $( target.node );
            if( 'item' in target && typeof target.item === 'number' ){
            cometUtils._editor = target.item;
              $tar = $tar.find( '.cpb-elementItem' + target.item );
            }

            for( e = 0; e < editors.length; e++ ){
              ed = editors[e];
              if( typeof ed !== 'object' || !ed.hasAttribute( 'name' ) ){
                continue;
              }
              na = ed.name.trim();
              $tar.find( '.comet-editorContentBody[data-match=' + na + ']' ).attr( 'contenteditable', 'true' );
              has = true;
            }

            if( !has ){
              cometUtils._editor = false;
              return false;
            }
            btns = [];

            btns[btns.length] = {
              command: 'bold',
              icon: 'cico cico-bold',
              title: cometdata.ui.bold
            };

            btns[btns.length] = {
              command: 'italic',
              icon: 'cico cico-italic',
              title: cometdata.ui.italic
            };

            btns[btns.length] = {
              command: 'underline',
              icon: 'cico cico-underline',
              title: cometdata.ui.underline
            };

            btns[btns.length] = {
              command: 'strikeThrough',
              icon: 'cico cico-strikethrough',
              title: cometdata.ui.st
            };

            btns[btns.length] = {
              command: 'link',
              icon: 'cico cico-link',
              title: cometdata.ui.ilink
            };

            o =  '<div id="' + x.toolbar +'">';
            for( b = 0; b < btns.length; b++ ){
              btn = btns[b];
              o += '<button class="comet-button comet-editorToolbarTool" data-command="' + btn.command + '">';
              cbtn = 'comet-editorTbTitle';
              if( btn.hasOwnProperty( 'icon' ) ){
                o += '<span class="comet-editorTbIcon ' + btn.icon + '"></span>';
                cbtn += ' comet-tooltip';
              }
              if( btn.hasOwnProperty( 'title' ) ){
                o += '<span class="' + cbtn + '">' + btn.title + '</span>';
              }
              o += '</button>';
            }
            o += '</div>';

            $frame.before( o );
            comet.handleSize();
          },
          menuComponent: function( state ){
            var button = comet.get.activeMenuButton(),
                active = 'cpb-active',
                menu = document.getElementById( 'comet-menuComponent' ),
                doc, t, l;

            if( !comet.node( button ).isNode() || !comet.node( menu ).isNode() ){
              return false;
            }

            switch( state ){
              case 'close':
                comet.node( button ).removeClass( active );
                menu.parentNode.removeChild( menu );
                break;
              case 'resize':
                doc = button.getBoundingClientRect();
                t = doc.top + doc.height;
                l = doc.left;
                menu.style.top = t + 'px';
                menu.style.left = l + 'px';
                break;
              default:
                return false;
            }
          }
        },
        initModalParts: function(){
          comet.toggle.editor();
          comet.handleSize();
          comet.toggle.tabs( 'init' );
          comet.toggle.accordion('init');
          comet.initSpectrum();
          cometUtils.init.icons();
        },
        handleSize: function(){
          var s = document.getElementById( 'comet-editorSidebar' ),
              m = document.getElementById( 'comet-modal' ),
              t = document.getElementById( 'comet-editorToolbar' ),
              rtl = 'rtl' in cometdata && cometdata.rtl == 'true' ? 'right' : 'left',
              sw = 0, mw = 0, th = 0, w, $t, css = {};
          if( s ){
            sw = $( s ).outerWidth( true );
          }
          if( m ){
            mw = $( m ).css( rtl /*'left'*/, sw + 'px' ).outerWidth( true );
          }
          w = winWidth - sw - mw;
          frame.style[rtl]/*.left*/ = ( sw + mw ) + 'px';
          if( t ){
            $t = $( t );
            $t.css( css );
            th = $t.outerHeight( true );
            frame.style.top = th + 'px';
            frame.style.height = 'calc(100% - ' + th + 'px)';
          }
          frame.className = 'cpb-desktopMode';
          frame.style.maxWidth = w + 'px';

          comet.closeOptions();

        },
        initSpectrum: function(){
          $( '.comet-fieldColor' ).spectrum({
            preferredFormat: 'hex',
            showButtons: false,
            showAlpha: true,
            showInput: true,
            //appendTo: 'parent',
            show: function(){
              var self = this,
                  p = self.parentNode,
                  o;
              if( $( self ).hasClass( 'comet-eGColorPicker' ) ){
                o = p.offsetLeft;
                if( o <= 0 ){
                  o = 0;
                }else{
                  o = '-' + o + 'px';
                }
                $( p ).children( '.sp-container' ).css( 'left', o );
              }
            },
            move: function( color ){
              var $self = $( this );
              $self.val( color.toString() );
              if( $self.hasClass( 'comet-eGColorPicker' ) ){
                comet.updateGradient( this.parentNode );
              }
              comet.updateComponent( this );
            }
          });
        },
        updateGradient: function( self ){
          var p = self.parentNode,
              colors = $( p ).children( '.comet-eGColor' ),
              o = [],
              count = 0,
              c, item, color, stop, g, e;

          if( !colors.length ){
            return;
          }

          for( c = 0; c < colors.length; c++ ){
            item = colors[c];
            color = $( item ).children( '.comet-fieldColor' ).val();
            if( !cometUtils.eval.color( color ) ){
              continue;
            }
            stop = parseInt( item.style.left );
            if( typeof stop !== 'number' || isNaN( stop ) ){
              stop = 0;
            }
            if( stop < 0 ){
              stop = 0;
            }
            if( stop > 100 ){
              stop = 100;
            }
            o[count] = {
              stop: stop,
              color: color
            };
            count++;
          }
          g = p.parentNode;
          e = cometUtils.encode.gradient( o );
          $( g ).children( '.comet-field' ).val( e );
        },
        range: function(){
          var current = null,
              pw = null,
              px = null,
              min = 0,
              max = 1,
              step = 1,
              a, prop;

          prop = {
            move: {
              on: 'mousemove',
              trigger: 'html',
              do: function( e, ui ){
                // e.preventDefault();
                var x, delta, offset, r, per, v, ch, a, c, $c;

                if( current === null || px === null || pw === null ){
                  return;
                }
                ch = current.parentNode.parentNode.children;

                if( !ch || ch == null | typeof ch !== 'object' || !( 'length' in ch ) || ch.length < 1  ){
                  return;
                }
                x = e.pageX;
                delta = parseInt( x - px );

                if( typeof delta !== 'number' || isNaN( delta ) ){
                  delta = 0;
                }

                if( delta >= pw ){
                  delta = pw;
                }

                if( delta <= 0 ){
                  delta = 0;
                }
                offset = Number( (( delta / pw ) * 100 ).toFixed(2) );
                current.style.left = offset + '%';
                per = ( ( delta ) / ( pw || 1 ) );
                v = step * Math.round( per * ( max - min ) / step ) + min;
                v = Number( (v).toFixed(2) );

                for( a = 0; a < ch.length; a++ ){
                  c = ch[a];
                  $c = $( c );

                  if( $c.hasClass( 'comet-field' ) ){
                    r = c;
                    $c.val( v );
                    continue;
                  }

                  if( $c.hasClass( 'comet-eRValueUnit' ) ){
                    $c.children( '.comet-eRValue' ).html( v );
                  }

                }

                if( !r || typeof r !== 'object' ){
                  return;
                }
                comet.updateComponent( r );
              }
            },
            start: {
              on: 'mousedown',
              trigger: '.comet-eRDragger',
              do: function( e, ui ){
                var p, r, it;
                e.preventDefault();
                current = ui;
                p = current.parentNode;
                r = p.getBoundingClientRect();
                pw = $( p ).outerWidth();
                px = r.left;

                it = $( p.parentNode ).children( '.comet-field' );
                min = parseFloat( it.attr( 'min' ) ) || 0;
                max = parseFloat( it.attr( 'max' ) ) || 360;
                step = parseFloat( it.attr( 'step' ) ) || 1;
              }
            },
            stop: {
              on: 'mouseup',
              trigger: 'html',
              do: function( e, ui ){
                e.preventDefault();
                current = null;
                pw = null;
                px = null;
                min = 0;
                max = 1;
                step = 1;
              }
            },
            ui: {
              on: 'click',
              trigger: '.comet-eRDecrease, .comet-eRIncrease',
              do: function( e, ui ){
                e.preventDefault();
                var $ui = $( ui ),
                    p = ui.parentNode,
                    ch = p.children,
                    vu, r, f, v, c, $c, a, offset, _min, _max, _step;

                if( !ch || ch == null || typeof ch !== 'object' || !( 'length' in ch ) || ch.length < 1 ){
                  return;
                }

                for( a = 0; a < ch.length; a++ ){
                  c = ch[a];
                  $c = $( c );

                  if( $c.hasClass( 'comet-field' ) ){
                    f = c;
                    continue;
                  }

                  if( $c.hasClass( 'comet-eRValueUnit' ) ){
                    vu = $c.children( '.comet-eRValue' );
                    continue;
                  }
                  if( $c.hasClass( 'comet-eRange' ) ){
                    r = c;
                  }
                }

                if( typeof f !== 'object' || typeof vu !== 'object' || typeof r !== 'object' ){
                  return;

                }

                v = parseFloat( f.value );
                _min = parseFloat( f.getAttribute( 'min' ) ) || 0;
                _max = parseFloat( f.getAttribute( 'max' ) ) || 360;
                _step = parseFloat( f.getAttribute( 'step' ) ) || 1;

                if( typeof v !== 'number' || isNaN( v ) ){
                  v = _min;
                }

                if( $ui.hasClass( 'comet-eRDecrease' ) ){
                  v = v - _step;
                }else if( $ui.hasClass( 'comet-eRIncrease' ) ){
                  v = v + _step;
                }

                if( v < _min ){
                  v = _min;
                }else if( v > _max ){
                  v = _max;
                }

                offset = Number( ( ( ( v - _min ) / ( step * ( ( _max - _min ) / step ) ) ) * 100 ).toFixed(2) );
                v = Number( ( v ).toFixed( 2 ) );
                f.value = v;
                vu.html( v );
                
                $( r ).children( '.comet-eRDragger' ).css( { left: offset + '%' } );
                comet.updateComponent( f );
              }
            }
          };

          for( a in prop ){
            (function() {
              var cur = prop[a];
              $doc.on( cur.on, cur.trigger, function( event ){ cur.do( event, this ); });
            })(a);
          }
        },
        gradient: function(){
          var current = null,
              pw = null,
              px = null,
              $del = null,
              mouseDown = false,
              a, prop, state;

          prop = {
            move: {
              on: 'mousemove',
              trigger: 'html',
              do: function( e, ui ){
                var x, delta, offset, p, stop, count, c, color, colors, o, g, angle, item, e;

                if( current === null || px === null || pw === null ){
                  return;
                }
                x = e.pageX;
                delta = parseInt( x - px );

                if( typeof delta !== 'number' || isNaN( delta ) ){
                  delta = 0;
                }

                if( delta >= pw ){
                  delta = pw;
                }

                if( delta <= 0 ){
                  delta = 0;
                }
                offset = parseInt( ( delta / pw ) * 100 );
                current.style.left = offset + '%';

                comet.updateGradient( current );
                comet.updateComponent( current );

              }
            },
            start: {
              on: 'mousedown',
              trigger: '.comet-eGColor',
              do: function( e, ui ){
                var p, r, g, $g;

                state = setInterval( function(){
                  $( '.comet-fieldColor' ).spectrum( 'hide' );
                  current = ui;
                  p = ui.parentNode;
                  r = p.getBoundingClientRect();
                  pw = $( p ).outerWidth();
                  px = r.left;
                  g = p.parentNode;
                  $g = $( g );
                  $del = $g.children( '.comet-eGDelete' );
                  mouseDown = true;
                  if( $del.length && !$del.is(':visible') ){
                    $del.show();
                    return;
                  }

                  if( !$del.length ){
                    $g.append( '<button class="comet-eGDelete comet-button" title="' + cometdata.ui.delete + '"><span class="cico cico-trash"></span> ' + cometdata.ui.delete + '</button>' );
                    $del = $g.children( '.comet-eGDelete' );
                  }
                }, 500 );
              }
            },
            stop: {
              on: 'mouseup',
              trigger: 'html',
              do: function( e, ui ){
                e.preventDefault();
                var $t =  $( e.target ),
                    c;
                clearInterval( state );

                if( !mouseDown ){
                  return;
                }

                  //$( '.comet-fieldColor' ).spectrum("hide");
                if( current !== null ){
                  //$( '.comet-fieldColor' ).spectrum("hide");
                  //$( current ).spectrum("hide");
                  if( $t.hasClass( 'comet-eGDelete' ) ){
                    c = $( current.parentNode ).children( '.comet-eGColor' );
                    if( c.length > 2 ){
                      current.remove();
                    }
                  }
                }
                if( $del !== null ){
                  $del.remove();
                  $del = null;
                }
                current = null;
                pw = null;
                px = null;
                mouseDown = false;
              }
            },
            add: {
              on: 'click',
              trigger: '.comet-eGLine',
              do: function( e, ui ){
                e.preventDefault();
                var p = ui.parentNode,
                    $p = $( p ), c;
                if( !$p ){
                  return;
                }
                c = $p.children( '.comet-eGColor' );
                if( !c || c.length < 5 ){
                  $p.append( '<div class="comet-eGColor" style="left:50%"><input class="comet-eGColorPicker comet-fieldColor" value="#FFF" type="text"/></div>');
                  comet.initSpectrum();
                }
              }
            }
          };

          for( a in prop ){
            (function() {
              var cur = prop[a];
              $doc.on( cur.on, cur.trigger, function( event ){ cur.do( event, this ); });
            })(a);
          }
        },
        updateComponent: function( self ){
          var id, type, data, _type, r, opa, re, s, f, fs, a, i, ii, ss,
              dtype, p, pp, val, chd, $node, cm, bg, ne, pe, pw, nw, ow, doing;

          if( typeof target !== 'object'
            || !( 'id' in target )
            || !( 'node' in target )
            || typeof ( id = parseInt( target.id ) ) !== 'number'
            || isNaN( id )
            || typeof ( type = target.type ) !== 'string'
            || [ 'sections', 'rows', 'columns', 'elements', 'items' ].indexOf( type ) === -1
            || typeof metaData[type] !== 'object' ){
            return;
          }

          if( typeof self.dataset === 'object' && typeof ( dtype = self.dataset.type ) === 'string' && dtype === 'numbers' ){
            p = self.parentNode;
            if( typeof ( val = parseFloat( self.value ) ) === 'number' && !isNaN( val ) && $( p ).hasClass( 'comet-modalFieldLocked' ) ){
              pp = p.parentNode;
              $( pp ).children( '.comet-modalFieldWrap.cpb-active.comet-modalFieldLocked' ).children( '.comet-field' ).val( val );
            }
          }

          if( typeof self.dataset === 'object' && typeof ( dtype = self.dataset.type ) === 'string' && dtype === 'select' && 'switch' in self.dataset ){
            s = JSON.parse( decodeURI( self.dataset.switch ) );
            fs = document.getElementsByClassName( 'comet-field' );

            for( a =  0; a < fs.length; a++ ){
              f = fs[a];

              if( typeof f !== 'object' || !( 'name' in f ) ){
                continue;
              }

              for( i in  s ){
                ss = s[i];

                if( typeof ss !== 'object' ){
                  continue;
                }

                for( ii in ss ){

                  if( self.value == i && f.name == ss[ii] ){
                    $(f).closest( '.comet-modalControlWrap' ).removeClass( 'comet-modalControlHide' );
                    continue;
                  }
                  if( f.name == ss[ii] ){
                    $(f).closest( '.comet-modalControlWrap' ).addClass( 'comet-modalControlHide' );
                  }
                }
              }
            }
          }
          
          if( type === 'columns' && self.name === 'wsize' ){
            p = target.node.parentNode;
            val = typeof ( val = parseFloat( self.value ) ) === 'number' && !isNaN( val ) ? val.toFixed( 2 ) : 10;
            chd = $( p ).children( '.cpb-column' );
            if( chd.length ){
              if( chd.length === 1 ){
                self.value = 100;
              }else{
                pw = $( p ).width();
                nw = ((target.node.offsetWidth/pw)*100);
                $node = $( target.node );
                ne = $node.next( '.cpb-column[data-id]' );
                doing = function( np ){
                  var npid = parseInt( np.dataset.id ),
                      rest = 0,
                      delta, ofw, rep;
                  ofw = nw - val;

                  if( ofw < 0 ){
                    ofw = 0 - ofw;
                  }
                  if( val < nw ){
                    rest = ow + ofw;
                  }
                  if( val > nw ){
                    rest = ow - ofw;
                  }
                  if( val == nw ){
                    rest = ow;
                  }

                  if( rest < 10 ){
                    delta = 10 - rest;
                    if( delta < 0 ){
                      delta = 0 - delta;
                    }
                    rest = 10;
                    val = val - delta;
                  }
                  
                  if( val < 10 ){
                    delta = 10 - val;
                    if( delta < 0 ){
                      delta = 0 - delta;
                    }
                    rest = rest - delta;
                    val = 10;
                  }
                  
                  rest = parseFloat(rest).toFixed(2);
                  val = parseFloat(val).toFixed(2);
                  if( typeof metaData[type][npid] !== 'object' ){
                    metaData[type][npid] = {};
                  }
                  metaData[type][npid].wsize = rest;
                  $( self ).val( val );

                  rep = cometUtils.layout( metaData, true ).column( npid );

                  if( 'css' in rep ){
                    comet.insert.css( npid, 'columns', rep );
                  }
                
                };
                
                if( ne && ne.length && ne.length > 0 && typeof ne[0] === 'object' ){
                  ow = ((ne[0].offsetWidth/pw)*100);
                  doing( ne[0] );
                }else{
                  pe = $node.prev( '.cpb-column[data-id]' );
                  if( pe && pe.length && pe.length > 0 && typeof pe[0] === 'object' ){
                    ow = ((pe[0].offsetWidth/pw)*100);
                    doing( pe[0] );
                  }
                }
              }
            }
          }

          r = comet.updateMetaData( id, type );

          if( !r ){
            return;
          }

          var node = target.node;

          var bgcomponents = function( content ){
            var cp, video, overlay;

            if( !content || typeof content !== 'object' ){
              return;
            }
            cp = comet.get.node.child( content, 'cpb-backgroundComponents' );
            if( !cp ){
              cp = document.createElement( 'div' );
              cp.className = 'cpb-backgroundComponents';
              content.appendChild( cp );
            }
            cp.innerHTML = '';
            if( 'vid' in r && r.vid == 'true' && 'vurl' in r && cometUtils.eval.video( r.vurl ) ){
              video = document.createElement( 'video' );
              video.src = r.vurl;
              video.className = 'cpb-backgroundVideo';
              video.setAttribute( 'loop', '' );
              video.setAttribute( 'autoplay', '' );
              video.setAttribute( 'muted', '' );
              video.setAttribute( 'preload', 'auto' );
              cp.appendChild( video );
            }
            if( 'ov' in r && r.ov == 'true' && 'ovc' in r && cometUtils.eval.color( r.ovc ) ){
              overlay = document.createElement( 'div' );
              overlay.className = 'cpb-backgroundOverlay';
              cp.appendChild( overlay );
            }
          };

          switch( type ){
            case 'sections':
              cm = comet.get.node.child( node, 'cpb-sectionContent' );
              bgcomponents( cm );
              re = cometUtils.layout( metaData, true ).section( id );
              break;
            case 'rows':
              cm = comet.get.node.child( node, 'cpb-rowContent' );
              bgcomponents( cm );
              re = cometUtils.layout( metaData, true ).row( id );
              break;
            case 'columns':
              cm = comet.get.node.child( node, 'cpb-columnContent' );
              bgcomponents( cm );
              re = cometUtils.layout( metaData, true ).column( id );
              break;
            case 'elements':
              re = cometUtils.layout( metaData ).iElement( id );
              break;
            default:
              return;
          }

          if( typeof re !== 'object' ){
            return;
          }

          if( 'css' in re ){
            comet.insert.css( id, type, re );
          }

          if( 'html' in re && type === 'elements' ){
            target.node.innerHTML = re.html;
            cometUtils.init.icons();
            cometUtils.init.images();
            cometNopriv.init();
          }
        },
        redefineColumns: function( row ){
          var columns = comet.get.node.children( row, 'cpb-column' ),
              column, a, w, cid, re, nb;

          if( !columns
            || typeof columns !== 'object'
            || !( 'length' in columns ) ){
            return;
          }
          nb = columns.length;
          row.dataset.ncol = nb;

          if( nb < 1 ){
            return;
          }

          w = Number( 100 / nb ).toFixed( 2 );
          for( a = 0; a < nb; a++ ){
            column = columns[a];
            if( !column
              || typeof column.dataset !== 'object'
              || !( 'id' in column.dataset )
              || typeof ( cid = parseInt( column.dataset.id ) ) !== 'number'
              || isNaN( cid ) ){
                continue;
            }
            if( typeof metaData.columns[cid] !== 'object' ){
              metaData.columns[cid] = {};
            }
            metaData.columns[cid].wsize = w;
            re = cometUtils.layout( metaData, true ).column( cid );
            if( typeof re === 'object' && 'css' in re ){
              comet.insert.css( cid, 'columns', re );
            }
          }
        },
        closeOptions: function(){
          var btns = document.getElementsByClassName( 'comet-menuComponentButton' ),
              menu = document.getElementById( 'comet-menuComponent' ),
              active = 'cpb-active',
              btn, a;
              
          if( btns && typeof btns === 'object' && btns.length > 0 ){
            for( a = 0; a < btns.length; a++ ){
              btn = btns[a];
              comet.node( btn ).removeClass( active );
            }
          }
          
          if( menu && typeof menu === 'object' && menu.parentNode && typeof menu.parentNode === 'object' ){
            menu.parentNode.removeChild( menu );
          }
        },
        events: function(){
          var e = [], a;

          e[e.length] = {
            on: 'click',
            trigger: '.comet-tempItemInsert',
            do: function( event, ui  ){
              event.preventDefault();
              var id;
              if(   typeof ui.dataset !== 'object'
                 || typeof ui.dataset.id === 'undefined'
                 || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                 || isNaN( id ) ){
                return;
              }

              cometUtils.load({
                id: id,
                do: 'meta'
              }).done( function( r ){
                var from = false,
                    data, _data, _rdata, fc, re,
                    ids_a, ids_b, ids_c, ids_d, ids_e,
                    a, b, c, d, e,
                    id_a, id_b, id_c, id_d, id_e,
                    nid_a, nid_b, nid_c, nid_d, nid_e;

                if(  r == '0'
                  || typeof ( data = cometUtils.parse.json( r ) ) !== 'object'
                  || !( '_sections' in data )
                  || cometUtils.eval.empty( data._sections )
                  || typeof data.sections !== 'object' ){
                  return false;
                }

                ids_a = cometUtils.parse.ids( data._sections, 'array' );

                if( typeof ids_a !== 'object' || ids_a.length < 1 ){
                  return false;
                }

                fc = 0;
                for( a = 0; a < ids_a.length; a++ ){
                  id_a = ids_a[a];
                  if( typeof data.sections[id_a] !== 'object' ){
                    continue;
                  }
                  nid_a = comet.generateId( 'sections' );
                  _data = $.extend( true, {}, data.sections[id_a] );
                  _data._rows = '';
                  _rdata = comet.insertDataTo({
                    id: nid_a,
                    in: 'sections',
                    pid: 0,
                    index:'last',
                    data: _data,
                    to: metaData,
                  });
                  if( typeof _rdata === 'object' ){
                    metaData = _rdata;
                    if( fc === 0 ){
                      from = nid_a;
                      fc++;
                    }
                  }
                  if( !( '_rows' in data.sections[id_a] ) || typeof data.sections[id_a]._rows !== 'string' ){
                    continue;
                  }
                  ids_b = cometUtils.parse.ids( data.sections[id_a]._rows, 'array' ); // ROWS
                  if( typeof ids_b !== 'object' || ids_b.length < 1 ){
                    continue;
                  }
                  for( b = 0; b < ids_b.length; b++ ){
                    id_b = ids_b[b];
                    if( typeof data.rows[id_b] !== 'object' ){
                      continue;
                    }
                    nid_b = comet.generateId( 'rows' );
                    _data = $.extend( true, {}, data.rows[id_b] );
                    _data._columns = '';
                    _rdata = comet.insertDataTo({
                      id: nid_b,
                      in: 'rows',
                      pid: nid_a,
                      index:'last',
                      data: _data,
                      to: metaData,
                    });
                    if( typeof _rdata === 'object' ){
                      metaData = _rdata;
                    }
                    if( !( '_columns' in data.rows[id_b] ) || typeof data.rows[id_b]._columns !== 'string' ){
                      continue;
                    }
                    ids_c = cometUtils.parse.ids( data.rows[id_b]._columns, 'array' ); // COLUMNS
                    if( typeof ids_c !== 'object' || ids_c.length < 1 ){
                      continue;
                    }
                    for( c = 0; c < ids_c.length; c++ ){
                      id_c = ids_c[c];
                      if( typeof data.columns[id_c] !== 'object' ){
                        continue;
                      }
                      nid_c = comet.generateId( 'columns' );
                      _data = $.extend( true, {}, data.columns[id_c] );
                      _data._elements = '';
                      _rdata = comet.insertDataTo({
                        id: nid_c,
                        in: 'columns',
                        pid: nid_b,
                        index:'last',
                        data: _data,
                        to: metaData,
                      });
                      if( typeof _rdata === 'object' ){
                        metaData = _rdata;
                      }
                      if( !( '_elements' in data.columns[id_c] ) || typeof data.columns[id_c]._elements !== 'string' ){
                        continue;
                      }
                      ids_d = cometUtils.parse.ids( data.columns[id_c]._elements, 'array' ); // ELEMENTS
                      if( typeof ids_d !== 'object' || ids_d.length < 1 ){
                        continue;
                      }
                      for( d = 0; d < ids_d.length; d++ ){
                        id_d = ids_d[d];
                        if( typeof data.elements[id_d] !== 'object' ){
                          continue;
                        }
                        nid_d = comet.generateId( 'elements' );
                        _data = $.extend( true, {}, data.elements[id_d] );
                        _data._items = '';
                        _rdata = comet.insertDataTo({
                          id: nid_d,
                          in: 'elements',
                          pid: nid_c,
                          index:'last',
                          data: _data,
                          to: metaData,
                        });
                        if( typeof _rdata === 'object' ){
                          metaData = _rdata;
                        }
                        if( !( '_items' in data.elements[id_d] ) || typeof data.elements[id_d]._items !== 'string' ){
                          continue;
                        }
                        ids_e = cometUtils.parse.ids( data.elements[id_d]._items, 'array' ); // ITEMS
                        if( typeof ids_e !== 'object' || ids_e.length < 1 ){
                          continue;
                        }
                        for( e = 0; e < ids_e.length; e++ ){
                          id_e = ids_e[e];
                          if( typeof data.items[id_e] !== 'object' ){
                            continue;
                          }
                          nid_e = comet.generateId( 'items' );
                          _data = $.extend( true, {}, data.items[id_e] )
                          _rdata = comet.insertDataTo({
                            id: nid_e,
                            in: 'items',
                            pid: nid_d,
                            index:'last',
                            data: _data,
                            to: metaData,
                          });
                          if( typeof _rdata === 'object' ){
                            metaData = _rdata;
                          }
                        }
                      }
                    }
                  }
                }
                re = cometUtils.layout( metaData ).init( from );

                if( typeof re !== 'object' ){
                   return;
                }
                if( 'html' in re ){
                  $frame.append( re.html );
                }
                if( 'css' in re ){
                  $('head').append( re.css );
                }
                cometUtils.init.images();
                cometUtils.init.icons();
                cometNopriv.init();
              });
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-tempItemPreview',
            do: function( event, ui  ){
              event.preventDefault();
              var id, url;
              if(   typeof ui.dataset !== 'object'
                 || typeof ui.dataset.id === 'undefined'
                 || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                 || isNaN( id ) ){
                return;
              }

              url = cometdata.admin_url + '?comet=mytemplates&action=preview&id=' + id;

              comet.dialog.init({
                id: 'comet-modalPreviewTemplate',
                header: '<h4>' + cometdata.titles.ptemp + ' (' + id + ')</h4>',
                content: '<iframe src="' + cometUtils.esc.url( url ) + '"></iframe>'
              });
            }
          };

          e[e.length] = {
            on: 'mouseenter mouseleave',
            trigger: '.cpb-column,.cpb-element',
            do: function( event, ui  ){
              event.stopPropagation();
              var open = false,
                  c = 'comet-menuComponentButton',
                  w = document.getElementsByClassName( c ),
                  active = 'cpb-active',
                  $ui, d, i, col, el, a;

              if( w && typeof w === 'object' && w.length > 0 ){
                for( a = 0; a < w.length; a++ ){
                  if( comet.node( w[a] ).hasClass( active ) ){
                    continue;
                  }
                  w[a].parentNode.removeChild( w[a] );
                }
              }

              if( event.type === 'mouseleave' ){
                return;
              }
              $ui = $( ui );

              if( ( col = $ui.hasClass( 'cpb-column' ) ) ||  ( el = $ui.hasClass( 'cpb-element' ) ) ){
                if( ( col && $ui.find( '.cpb-element' ).length > 0 ) || $ui.find( '.cpb-active.' + c ).length > 0 ){
                  return;
                }
                d = document.createElement( 'button' );
                d.className = c + ' comet-button';
                d.innerHTML = '<span class="cico cico-more"></span>';
                ui.appendChild( d );
              }
            }
          };

          e[e.length] = { //TODO
            on: 'click',
            trigger: '.comet-eventToggle',
            do: function( event, ui ){
              event.preventDefault();
              var e, d;

              e = {
                'to_cockpit': 'comet-cockpit',
                'to_settings': 'comet-generalSettings'
              };

              if( !( 'name' in ui ) || !( ui.name in e ) ){
                return false;
              }
              d = document.getElementById( e[ui.name] );
              if( !d || d == null || typeof d !== 'object' ){
                return false;
              }
              $( d ).toggleClass( 'is_toggled' );
            }
          };

          e[e.length] = {//TODO
            on: 'mouseenter mouseleave',
            trigger: '[aria-label]',
            do: function( event, ui ){
              event.preventDefault();
              var tip = comet.node( ui ).child( 'comet-tooltip' ),
                  t, h, w, x, y, rec, classes;

              if( event.type === 'mouseleave' || event.type === 'mouseout' || tip ){
                ui.removeChild( tip );
                return;
              }
              /*rec = ui.getBoundingClientRect();
              x = rec.left;
              y = rec.top;

              h = window.innerHeight;
              w = window.innerWidth;*/

              t = ui.getAttribute( 'aria-label' );
              classes = 'comet-tooltip comet-active';


              tip = document.createElement( 'div' );
              tip.innerHTML = '<span>' + t + '</span>';


              //console.log( x, y, h, w );


              tip.className = classes;

              ui.appendChild( tip );

            }
          };

          e[e.length] = {//TODO
            on: 'click',
            trigger: '#comet-clearNotifications, .comet-closeNote',
            do: function( event, ui ){
              event.preventDefault();
              var d = document.getElementById( 'comet-notifications' );
              if( !d || d == null || typeof d !== 'object' ){
                return false;
              }
              if( ui.id === 'comet-clearNotifications' ){
                d.innerHTML = '';
                return true;
              }
              d.removeChild( ui.parentNode );
              
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edSDevice',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var ds = ui.parentNode,
                  eds = ds.parentNode,
                  ns = eds.parentNode,
                  nsc = ns.children,
                  device = ui.dataset.device,
                  active = 'cpb-active',
                  $eds, c, a, b, bunch, fields, field, $field, classes, is, w;

              switch( device ){
                case 'd':
                  c = 'cico-desktop';
                  comet.handleSize();
                  break;
                case 't':
                  //w = $frame.outerWidth();
                  //w = document.body.offsetWidth;
                  c = 'cico-tablet';
                  //if( w > 800 ){
                    frame.className = 'cpb-tabletMode';
                    frame.style.maxWidth = 800 + 'px';
                    //$frame.css( 'max-width', 800 + 'px' );
                  //}
                  break;
                case 'm':
                  //w = $frame.outerWidth();
                  //w = document.body.offsetWidth;
                  c = 'cico-mobile';
                  //if( w > 400 ){
                    frame.className = 'cpb-mobileMode';
                    frame.style.maxWidth = 400 + 'px';
                    //$frame.outerWidth( 400 );
                  //}
                  break;
                default:
                  return;
              }
              $eds = $( eds );
              $eds.removeClass( active );
              $eds.children( '.cico' ).replaceWith( '<span class="cico ' + c + '"></span>' );

              for( a = 0; a < nsc.length; a++ ){
                bunch = nsc[a];
                if( !bunch || typeof bunch === 'undefined' || !$( bunch ).hasClass( 'comet-modalControlBunch' ) ){
                  continue;
                }
                fields = bunch.children;
                if( !fields || fields.length <= 0 ){
                  continue;
                }
                is = false;
                if( $( ns ).children( '.comet-editorLock.cpb-active' ).length > 0 ){
                  is = true;
                }
                for( b = 0; b < fields.length; b++ ){
                  field = fields[b];
                  $field = $( field );
                  if( !field || typeof field === 'undefined' || !$field.hasClass( 'comet-modalFieldWrap' ) ){
                    continue;
                  }

                  if( typeof field.dataset !== 'object' || !field.dataset.hasOwnProperty( 'device' ) ){
                    continue;
                  }
                  classes = active + ' comet-modalFieldLocked';

                  $field.removeClass( classes ).hide();

                  if( field.dataset.device === device ){
                    classes = active;
                    if( is ){
                      classes += ' comet-modalFieldLocked';
                    }
                    $field.addClass( classes ).show();
                  }
                }
              }
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-modalControlClearColor',
            do: function( event, ui  ){
              event.preventDefault();
              var f = $( ui.parentNode ).children( '.comet-field' ).val( '' );
              comet.updateComponent( f[0] );
            }
          };

          document.addEventListener('scroll', function (e) {
            if( $( e.target ).hasClass( 'comet-modalContent' ) ){
              $( '.comet-fieldColor' ).spectrum('hide');
            }
          }, true );

          e[e.length] = {
            on: 'input propertychange click',
            trigger: '.comet-editorContentBody',
            do: function( event, ui  ){
              var parent, trigger, browser, btns;

              if( event.type !== 'click' ){
                if( typeof ui.dataset !== 'object' || !ui.dataset.hasOwnProperty( 'match' ) || typeof ui.dataset.match === 'undefined' ){
                  return;
                }
                var id = ui.dataset.match;
                var content = ui.innerHTML;
                var editors = document.getElementsByClassName( 'comet-fieldEditor' );
                var e, ed, tag;

                if( !editors || editors.length < 1 ){
                  return;
                }
                for( e = 0; e < editors.length; e++ ){
                  ed = editors[e];
                  if( typeof ed !== 'object' || ed.name != id ){
                    continue;
                  }
                  ed.value = content;
                }
                comet.updateMetaData( target.id, target.type );
                return;
              }

              if( typeof browser === 'undefined' ){
                browser = window.getSelection && window.getSelection().modify ? 'xul' : document.selection ? 'msie' : 'unknown';
              }

              if( browser === 'unknown'){
                return false;
              }
              switch( browser ){
                case 'xul':
                  var sel = window.getSelection();
                  selection.range = sel.getRangeAt(0);
                  selection.clicked = true;
                  break;
                case 'msie':
                  selection = document.selection;
                  break;
                default:
                  selection = null;
              }

              trigger = event.target;

              parent = function( node ){
                var p = node.parentNode,
                    command, btn, $btn, b;

                if( $( node ).hasClass( 'comet-editorContentBody' ) ){
                  return;
                }
                switch( node.nodeName.toLowerCase() ){
                  case 'strong':
                  case 'b':
                    command = 'bold';
                    break;
                  case 'i':
                  case 'em':
                    command = 'italic';
                    break;
                  case 'u':
                  case 'ins':
                    command = 'underline';
                    break;
                  case 'del':
                  case 'strike':
                    command = 'strikeThrough';
                    break;
                  case 'a':
                    command = 'link';
                    break;
                  default:
                    return;
                }

                if( btns && btns.length > 0 ){
                  for( b = 0; b < btns.length; b++ ){
                    btn = btns[b];
                    if( typeof btn !== 'object' || typeof btn.dataset !== 'object' || btn.dataset.command !== command){
                      continue;
                    }
                    $btn = $( btn );
                    $btn.addClass( 'cpb-active' );
                    if( btn.dataset.command === 'a' ){
                      $btn.attr( 'data-url', node.href );
                    }
                  }
                }
                if( !p ){
                  return;
                }
                parent( p );
              };
              btns = $( '.comet-editorToolbarTool' )
              btns.removeClass( 'cpb-active' );
              parent( trigger );

            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-editorToolbarTool',
            do: function( event, ui  ){
              var $ui = $( ui ),
                  manageNode = function( command, attr ){
                    var sel, browser, range, stored, newNode;
                    if( typeof browser === 'undefined' ){
                      browser = window.getSelection && window.getSelection().modify ? 'xul' : document.selection ? 'msie' : 'unknown';
                    }

                    if( browser === 'unknown' || selection === null ){
                      return false;
                    }

                    if( browser === 'xul' ){

                      sel = window.getSelection();
                      if( selection.clicked ){
                        sel.removeAllRanges();
                        sel.addRange( selection.range );
                      }
                      if( sel.type === 'Caret' ){
                        sel.modify('move', 'backward', 'word');
                        sel.modify('extend', 'forward', 'word');
                      }
                      range = sel.getRangeAt(0);
                      //console.log( sel, range );
                      document.execCommand( command, false, attr );
                      selection.clicked = false;
                      /*return;
                      console.log( range.commonAncestorContainer );

                      attr = typeof attr === 'object' ? attr : {};
                      newNode = document.createElement( node, attr );
                      newNode.appendChild( range.extractContents() );

                      var tryChildren = function( nnode, nodeName ){
                        var a, n, i;
                        if( nnode.childNodes.length > 0 ){
                          for( a = 0; a < nnode.childNodes.length; a++ ){
                            n = nnode.childNodes[a];
                            if( n.nodeName.toLowerCase() === nodeName.toLowerCase() ){
                              i = n.innerHTML;
                              n.outerHTML = i;
                            }
                            tryChildren( n, nodeName );
                          }
                        }
                      };
                      var tryParent = function( nnode, nodeName ){
                        if( $( nnode ).hasClass( 'comet-editorContentBody' ) ){
                          return;
                        }
                        if( nnode.nodeName.toLowerCase() === nodeName.toLowerCase() ){
                          console.log( nnode, range.toString() );
                          var thisText = $(nnode).text();
                          var selectedText = range.toString();
                          var start = thisText.indexOf(selectedText);
                          var end = start + selectedText.length;
                          console.log("start: " + start);
                          console.log("end: " + end);
                          var nrange = document.createRange();
                          nrange.setStart(nnode,0);
                          nrange.setEnd(nnode,start-1);

                          var nNode = document.createElement( nodeName );
                          nNode.appendChild( nrange.extractContents() );
                          console.log( nrange.toString() );
                          nrange.insertNode( nNode );

                          var nnrange = document.createRange();
                          //nnrange.setStart(nnode,end);
                          //nnrange.setEnd(nnode,selectedText.length - 1);
                          console.log( range, nrange, nnrange );
                          var nnNode = document.createElement( nodeName );
                          nnNode.appendChild( nnrange.extractContents() );
                          nnrange.insertNode( nnNode );
                          $( nnode ).before( nnode.innerHTML ).remove();
                          //newNode.before( '</' + nodeName.toLowerCase() + '>' ).after( '<' + nodeName.toLowerCase() + '>' );
                          //$( newNode ).before( '</' + nodeName.toLowerCase() + '>' + newNode.innerHTML + '<' + nodeName.toLowerCase() + '>' ).remove();
                        }
                        if( nnode.parentNode === null ){
                          return;
                        }
                        tryParent( nnode.parentNode, nodeName );
                      };
                      tryChildren( newNode, node );
                      //tryParent( range.commonAncestorContainer, node );
                      range.insertNode( newNode );
                      tryParent( range.commonAncestorContainer, node );
                      if( type === 'remove' ){
                        $( newNode ).before( newNode.innerHTML ).remove();
                      }
                      return true;*/
                    }

                    if( browser === 'msie' ){
                      //sel = document.selection;
                      range = sel.createRange();
                      if( !range.text ){
                        range.expand( 'word' );
                      }
                      // Remove trailing spaces
                      while( /\s$/.test( range.text ) ){
                        range.moveEnd( 'character', -1 );
                      }
                      if( range.text.length < 1 ){
                        return false;
                      }
                      stored = range.text;
                      newNode = document.createElement( node );
                      newNode.appendChild( document.createTextNode( stored ) );
                      range.insertNode( newNode );
                      return true;
                    }
                  },
                  attr = {},
                  type = 'add',
                  node, command;

              if( 'dataset' in ui === false || 'command' in ui.dataset === false ){
                return false;
              }
              command = ui.dataset.command;
              attr = null;

              switch( command ){
                case 'bold':
                case 'italic':
                case 'underline':
                case 'justifyLeft':
                case 'justifyRight':
                case 'strikeThrough':
                case 'justifyCenter':
                  break;
                case 'link':
                  var href = $ui.attr( 'data-url' );
                  var l;
                  href = typeof href === 'string' && href.length > 0 ? href : 'http://';
                  l = '<div class="comet-editorToolbarToolInline">';
                  l += '<button class="comet-button comet-editorToolbarTool" data-command="unlink"><span class="cico cico-unlink"></span></button>';
                  l += '<input type="text" class="comet-rendField" value="'+href+'"/>';
                  l += '<button class="comet-button comet-editorToolbarTool" data-command="createLink"><span class="cico cico-break"></span></button>';
                  l += '</div>';
                  $ui.before( l ).remove();
                  return
                  break;
                case 'createLink':
                case 'unlink':
                  attr = $( ui.parentNode ).children( 'input' ).val();
                  var c = 'comet-button comet-editorToolbarTool',
                      url = '';
                  if( command === 'createLink' ){
                    c += ' cpb-active';
                    url = 'data-url="' + attr + '"';
                  }
                  $( ui.parentNode ).before( '<button class="' + c + '" data-command="link" ' + url + '><span class="cico cico-link"></span></button>' ).remove();
                  break;
                default:
                  return false;
              }

              if( $ui.hasClass( 'cpb-active' ) ){
                type = 'remove';
                $ui.removeClass( 'cpb-active' );
              }else{
                $ui.addClass( 'cpb-active' );
              }
              manageNode( command, attr );
            }
          };



           e[e.length] = {
            on: 'click',
            trigger: '.comet-edControlInline',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var $ui = $( ui ),
                  isL = $ui.hasClass( 'comet-editorLock' ) ? true : false,
                  active = false,
                  s, a, b, bunch, field, fields, $field, nsc;


              if( $ui.hasClass( 'cpb-active' ) ){
                $ui.removeClass( 'cpb-active' );
                s = 'cico-unlock';
                active = false;
              }else{
                $ui.addClass( 'cpb-active' );
                s = 'cico-lock';
                active = true;
              }

              if( isL ){
                $ui.children( '.cico' ).replaceWith( '<span class="cico ' + s + '"></span>' );
                nsc = ui.parentNode.children;
                for( a = 0; a < nsc.length; a++ ){
                  bunch = nsc[a];
                  if( !bunch || typeof bunch === 'undefined' || !$( bunch ).hasClass( 'comet-modalControlBunch' ) ){
                    continue;
                  }
                  fields = bunch.children;
                  if( !fields || fields.length <= 0 ){
                    continue;
                  }
                  for( b = 0; b < fields.length; b++ ){
                    field = fields[b];
                    $field = $( field );
                    if( !field || typeof field === 'undefined' || !$field.hasClass( 'comet-modalFieldWrap' ) || !$field.hasClass( 'cpb-active' ) ){
                      continue;
                    }

                    $field.removeClass( 'comet-modalFieldLocked' )
                    if( active ){
                      $field.addClass( 'comet-modalFieldLocked' );
                    }
                  }
                }
              }
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edModalItemAdd',
            do: function( event, ui  ){
              event.preventDefault();
              var self = ui,
                  pp = self.parentNode.parentNode,
                  $ul = $( pp ).children( '.comet-edModalItems' ),
                  id = 0,
                  type, r, o;

              if( !$ul || $ul.length <= 0 || target.id === null || target.type === null ){
                return;
              }

              type = 'items';
              id = comet.generateId( type );
              r = comet.setDefaultData( id, type );
              if( !r ){
                return;
              }
              comet.insertId( id, type, target.id, 'last' );

              o = comet.kit.item( id, '' );

              //o = '<li data-id="' + id + '" class="comet-edModalItem"><span><span>#' + id + '</span></span><button class="comet-edModalItemEdit">e</button><button class="comet-edModalItemDelete">s</button></li>';
              $ul.append( o );

            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '#comet-editorSaveTemplate',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var set = ui.value, id, o, h, c;

              h = '<h4>' + cometdata.titles.santemp + '</h4>';


              c = '<div id="comet-saveTempWin">';
              c += '<p>' + cometdata.messages.santemp + ' <a href="' + cometUtils.esc.url( 'https://blacklead.fr/support/docs/comet/my-templates/' ) + '" target="_blank">' + cometdata.messages.rmtemp + '</a>.</p>';
              c += '<div id="comet-saveTempForm">';
              c += '<input id="comet-saveTempInput" class="comet-rendField" value="" placeholder="' + cometdata.ui.tempname + '"/>';
              c += '<button class="comet-saveTempButton comet-button comet-buttonPrimary" title="' + cometdata.ui.save + '"><span class="cico cico-export"></span></button>';
              c += '</div>';
              c += '</div>';

              comet.dialog.init({
                id: 'comet-modalSaveTemplate',
                header: h,
                content: c,
                done: {
                  target: '.comet-saveTempButton',
                  do: function( e, self ){
                    var input = document.getElementById( 'comet-saveTempInput' ),
                        v, div, s, l , args, m = '';

                    if( !input || input === null || typeof input !== 'object' ){
                      m = cometdata.messages.notSaved + '<br>';
                    }

                    if( !metaData || !( '_sections' in metaData ) || metaData._sections.length < 1 ){
                      m = cometdata.messages.empty + '<br>';
                    }

                    if( typeof input.value !== 'string' || cometUtils.eval.empty( v = input.value.trim() ) ){
                      m += cometdata.messages.noTitle;
                    }

                    if( m.length > 0 ){
                      div = document.createElement( 'div' );
                      div.setAttribute( 'class', 'comet-saveTempErr' );
                      div.innerHTML = m;
                      self.parentNode.parentNode.appendChild( div );
                      return 1;
                    }

                    args = {
                      title: v,
                      meta: metaData,
                      content: comet.get.content(),
                      post_type: 'comet_mytemplates'
                    }

                    l = cometUtils.load({
                      do: 'save',
                      data: JSON.stringify( args )
                    });
                    /*if( !l ){
                      return false;
                    }

                    l.done(function( r ) {
                    });*/
                  }
                }
              });
            }
          };


          e[e.length] = {
            on: 'click',
            trigger: '#comet-editorSaveButton',
            do: function( event, ui  ){
              event.preventDefault();
              var id = parseInt( post.ID ),
                  disabled = 'cpb-disabled',
                  wait = 'comet-waitWhileIcon',
                  $ui = $( ui ), l, args;

              if( typeof id !== 'number' || isNaN( id ) || $ui.hasClass( disabled ) ){
                return false;
              }
              $ui.addClass( disabled ).children( '.cico' ).toggleClass( wait );

              //console.log( $( document.getElementById( 'comet-postSettings' ) ).serialize() );

              //return;

              args = {
                id: id,
                meta: metaData,
                content: comet.get.content(),
                _post: $( document.getElementById( 'comet-postSettings' ) ).serialize()
              };

              l = cometUtils.load({
                do: 'save',
                data: JSON.stringify( args )
              });

              if( !l ){
                return false;
              }

              l.always(function( r, a, b ){
                var msg;

                r = parseInt( r );
                switch( r ){
                  case 0:
                  case 400:
                    msg = cometdata.messages.error.savePost;
                    break;
                  default:
                    msg = cometdata.messages.success.savePost;
                }
                comet.notification( msg, r );
                $ui.removeClass( disabled ).children( '.cico' ).removeClass( wait );
              });
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '#comet-editorTemplates',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var id, o, h, c;

              h = '<div id="comet-tempSearch">';
              h += '<select id="comet-tempFieldSwitch" class="comet-tempField comet-rendField">';
              h += '<option value="cus">' + cometdata.titles.mytemp + '</option>';
              //h += '<option value="pre">Predefined</option>'; // TRANSLATION
              h += '</select>';
              h += '<input id="comet-tempFieldSearch" class="comet-tempField comet-rendField" value="" placeholder="Search a template..." />';
              h += '</div>';

              c = '<div id="comet-tempResult"></div>';

              comet.dialog.init({
                id: 'comet-modalTemplatesLibrary',
                header: h,
                content: c,
                done: {
                  target: '.comet-tempItemInsert',
                  do: function( e, self ){
                    var v, node, f;

                    if( typeof self.dataset !== 'object' || cometUtils.eval.empty( self.dataset.id ) ){
                      return false;
                    }
                  }
                }
              });
              comet.load.temp( 'cus');//'pre' );
            }
          };


          e[e.length] = {
            on: 'change',
            trigger: '#comet-tempFieldSwitch',
            do: function( event, ui  ){
              var set = ui.value;
              comet.load.temp( set );
            }
          };

          e[e.length] = {
            on: 'input propertychange',
            trigger: '#comet-tempFieldSearch',
            do: function( event, ui ){
              var r = document.getElementById( 'comet-tempResult' ),
                  temps = r.getElementsByClassName( 'comet-tempCollectionScope' ),
                  v = ui.value, regex, temp, i;

              if( !temps || typeof temps !== 'object' || temps.length < 1 ){
                return false;
              }

              v = !cometUtils.eval.empty( v ) ? v.trim() : '';

              regex = new RegExp( v, 'i' );

              for( i = 0; i < temps.length; i++ ){
                temp = temps[i];
                if( typeof temp.dataset !== 'object' || typeof temp.dataset.title === 'undefined' ){
                  continue;
                }
                if( v !== '' && temp.dataset.title.search( regex ) === -1 ){
                  temp.style.display = 'none';
                  continue;
                }
                temp.style.display = 'inline-block';
              }
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edIconUpload',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var sets = cometdata.svgSets,
                  id, o, h, c;

              h = '<div id="comet-mipSearch">';
              h += '<select id="comet-mipFieldSwitchSet" class="comet-mipField comet-rendField">';
              for( id in sets ){
                h += '<option value="' + id +'">' + sets[id].name + '</option>';
              }
              h += '</select>';
              h += '<input id="comet-mipFieldSearchIcon" class="comet-mipField comet-rendField" value="" placeholder="Search an icon..." />';
              h += '</div>';

              c = '<div id="comet-mipResult"></div>';

              comet.dialog.init({
                id: 'comet-modalIconPicker',
                header: h,
                content: c,
                done: {
                  target: '.comet-mipCollectionScope',
                  do: function( e, self ){
                    var v, node, f;

                    if( typeof self.dataset !== 'object' || cometUtils.eval.empty( self.dataset.id ) ){
                      return false;
                    }
                    v = self.dataset.id.trim();
                    node = comet.kit.icon( v );
                    f = $( ui.parentNode ).children( '.comet-field' );
                    f.val( v );
                    $( ui ).replaceWith( node );
                    comet.updateComponent( f[0] );
                  }
                }
              });
              comet.load.set( 'fas' );
            }
          };

          e[e.length] = {
            on: 'change',
            trigger: '#comet-mipFieldSwitchSet',
            do: function( event, ui  ){
              var set = ui.value;
              comet.load.set( set );
            }
          };

          e[e.length] = {
            on: 'input propertychange',
            trigger: '#comet-mipFieldSearchIcon',
            do: function( event, ui ){
              var r = document.getElementById( 'comet-mipResult' ),
                  icons = r.getElementsByClassName( 'comet-mipCollectionScope' ),
                  v = ui.value, regex, icon, i;

              if( !icons || typeof icons !== 'object' || icons.length < 1 ){
                return false;
              }

              v = !cometUtils.eval.empty( v ) ? v.trim() : '';

              regex = new RegExp( v, 'i' );

              for( i = 0; i < icons.length; i++ ){
                icon = icons[i];
                if( typeof icon.dataset !== 'object' || typeof icon.dataset.id === 'undefined' ){
                  continue;
                }
                if( v !== '' && icon.dataset.id.search( regex ) === -1 ){
                  icon.style.display = 'none';
                  continue;
                }
                icon.style.display = 'inline-block';
              }

            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edImageUpload',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var media;

              if ( media ) {
                media.open();
                return;
              }

              media = wp.media({
                frame: 'select',
                title: cometdata.titles.selimg,
                library: {
                  type: 'image' // limits the frame to show only images
                },
                button: {
                  text: cometdata.ui.select,
                },
                multiple: false,
                editing:    true,
                filterable: true,
                searchable: true,
                sortable: true
              }).on( 'select', function() {
                var p = ui.parentNode,
                    node, att, img, r;
                att = media.state().get('selection').first().toJSON();
                img = att.url;
                node = comet.kit.image( img );
                r = $( p ).children( '.comet-field' );
                r.val( img );
                $( ui ).replaceWith( node );
                comet.updateComponent( r[0] );
					    }).open();
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edImageRemove, .comet-edIconRemove',
            do: function( event, ui  ){
              event.preventDefault();
              event.stopPropagation();
              var p = ui.parentNode,
                  pp = p.parentNode,
                  v = '',
                  node, r;
              if( $( ui ).hasClass( 'comet-edImageRemove' ) ){
                node = comet.kit.image( v );
              }else{
                node = comet.kit.icon( v );
              }
              r = $( pp ).children( '.comet-field' );
              r.val( v );
              $( p ).replaceWith( node );
              comet.updateComponent( r[0] );
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edModalItemDelete',
            do: function( event, ui  ){
              event.preventDefault();
              var p = ui.parentNode,
                  id = parseInt( p.dataset.id );

              comet.removeId( id, 'items', target.id );
              comet.removeMetaData( id, 'items' );
              $( p ).remove();
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-edModalItemEdit',
            do: function( event, ui  ){
              event.preventDefault();
              var p = ui.parentNode,
                  id = parseInt( p.dataset.id ),
                  element = metaData.elements[target.id]._type,
                  r, title, opts;

              r = comet.buildTabs( cometdata.elements[element].tabs.items.tabs, metaData.items[id] );
              title = cometdata.titles.editItem;
              target.state = 'items';
              target.item = id;
              opts = {
                id: false,
                title: title,
                close: {
                  inner: '<span class="cico cico-arrow-left-alt"></span>',
                  title: cometdata.ui.back,
                  do: function( e, ui ){
                    var r = comet.buildTabs( cometdata.elements[element].tabs, metaData.elements[target.id] ),
                        title = cometdata.options.element.edit;

                    target.item = null;
                    target.state = null;

                    opts = {
                      id: false,
                      title: title,
                      close: {
                        inner: '<span class="cico cico-x"></span>',
                        title: cometdata.ui.close,
                        do: function( e, ui ){
                          target.id = null;
                          target.node = null;
                          target.state = null;
                          target.type = null;
                          target.item = null;
                          comet.handleSize();
                        }
                      },
                      content: r.content,
                      tabs: r.tabs
                    };
                    comet.modal( opts );
                    comet.initModalParts();
                  }
                },
                content: r.content,
                tabs: r.tabs
              };

              comet.modal( opts );
              comet.initModalParts();
            }
          };


          e[e.length] = {
            on: 'click',
            trigger: '.comet-editorModalSectionHeader',
            do: function( event, ui  ){
              event.preventDefault();
              comet.toggle.accordion( ui );
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-modalTabRef',
            do: function( event, ui  ){
              event.preventDefault();
              comet.toggle.tabs( ui );
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-editorActConfirm, #comet-editorExit',
            do: function( event, ui ){
              event.preventDefault();
              var id = ui.id,
                  data;

              if( id === 'comet-editorClear' ){
                data = {
                  message: cometdata.messages.clear,
                  redirect: '#',
                  onDone: function(){
                    $frame.html( '' );
                    metaData = {};
                  }
                };
                comet.confirm( data );
                return;
              }
              if( id === 'comet-editorExit' ){
                data = {
                  message: cometdata.messages.leave,
                  redirect: cometdata.purl
                };
                comet.confirm( data );
              }
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-mcItem',
            do: function( event, ui ){
              event.preventDefault();
              var active = 'cpb-active',
                  option = ui.parentNode,
                  btn = comet.get.activeMenuButton(),
                  pnode, action, role, section, row, rows, column, title, opts, crow,
                  element, eid, neid, cid, ncid, rid, nrid, sid, nsid, sbid, r, re, m, t, o;

              comet.toggle.menuComponent( 'close' );

              if( !comet.node( btn ).isNode()
                || typeof ( pnode = btn.parentNode ) !== 'object'
                || typeof option.dataset !== 'object'
                || typeof ( action = option.dataset.action ) === 'undefined'
                || typeof metaData !== 'object'
                || typeof ui.dataset !== 'object'
                || typeof ( role = ui.dataset.role ) === 'undefined' ){
                return;
              }

              column = pnode;

              if( comet.node( pnode ).hasClass( 'cpb-element' ) ){
                element = pnode;
                column = element.parentNode.parentNode;
              }
              crow = column.parentNode;
              row = crow.parentNode;
              rows = row.parentNode;
              section = rows.parentNode;

              switch( action ){
                case 'section':

                  if( typeof section.dataset !== 'object'
                     || typeof section.dataset.id === 'undefined'
                     || typeof ( sid = parseInt( section.dataset.id ) ) !== 'number'
                     || isNaN( sid )
                     || typeof metaData.sections !== 'object'
                     || !( sid in metaData.sections ) ){
                    return;
                  }

                  if( role === 'edit' ){
                    title = cometdata.options.section.edit;
                    target.id = sid;
                    target.type = 'sections';
                    target.node = section;
                    r = comet.buildTabs( cometdata.section, metaData.sections[sid] );
                    break;

                  }else if( role === 'del' ){
                    comet.removeMetaData( sid, 'sections' );
                    section.parentNode.removeChild( section );
                    //$( section ).remove();

                  }else if( role === 'dup' ){
                    nsid = comet.initCloneMetaData( sid, 'sections', 0 );
                    re = cometUtils.layout( metaData ).section( nsid );
                    if( typeof re !== 'object' || !( 'html' in re ) || !( 'css' in re ) ){
                      return;
                    }
                    comet.insert.html( frame, re );
                    comet.insert.css( nsid, 'sections', re );
                    //$frame.append( re.html );
                    //$( 'head' ).append( re.css );
                  }
                  return;

                case 'row':

                  if( typeof row.dataset !== 'object'
                     || typeof row.dataset.id === 'undefined'
                     || typeof ( rid = parseInt( row.dataset.id ) ) !== 'number'
                     || isNaN( rid )
                     || typeof metaData.rows !== 'object'
                     || !( rid in metaData.rows ) ){
                    return;
                  }

                  if( role === 'edit' ){
                    title = cometdata.options.row.edit;
                    target.id = rid;
                    target.type = 'rows';
                    target.node = row;
                    r = comet.buildTabs( cometdata.row, metaData.rows[rid] );
                    break;

                  }else if( role === 'del' ){
                    comet.removeMetaData( rid, 'rows' );
                    row.parentNode.removeChild( row );
                    //$( row ).remove();

                  }else if( role === 'dup' ){
                    if(   typeof section.dataset !== 'object'
                       || typeof section.dataset.id === 'undefined'
                       || typeof ( sid = parseInt( section.dataset.id ) ) !== 'number'
                       || isNaN( sid ) ){
                      return;
                    }
                    nrid = comet.initCloneMetaData( rid, 'rows', sid );
                    re = cometUtils.layout( metaData ).row( nrid );
                    if( typeof re !== 'object' || !( 'html' in re ) || !( 'css' in re ) ){
                      return;
                    }
                    comet.insert.html( rows, re );
                    comet.insert.css( nrid, 'rows', re );
                    //$( rows ).append( re.html );
                    //$( 'head' ).append( re.css );
                  }
                  return;

                case 'column':

                  if( typeof column.dataset !== 'object'
                     || typeof column.dataset.id === 'undefined'
                     || typeof ( cid = parseInt( column.dataset.id ) ) !== 'number'
                     || isNaN( cid )
                     || typeof metaData.columns !== 'object'
                     || !( cid in metaData.columns ) ){
                    return;
                  }

                  if( role === 'edit' ){
                    title = cometdata.options.column.edit;
                    target.id = cid;
                    target.type = 'columns';
                    target.node = column;
                    r = comet.buildTabs( cometdata.column, metaData.columns[cid] );
                    break;

                  }else if( role === 'del' ){

                    comet.removeMetaData( cid, 'columns' );
                    crow.removeChild( column );
                    comet.redefineColumns( crow );

                  }else if( role === 'dup' ){
                    if(   typeof row.dataset !== 'object'
                       || typeof row.dataset.id === 'undefined'
                       || typeof ( rid = parseInt( row.dataset.id ) ) !== 'number'
                       || isNaN( rid ) ){
                      return;
                    }
                    ncid = comet.initCloneMetaData( cid, 'columns', rid );
                    re = cometUtils.layout( metaData ).column( ncid );
                    if( typeof re !== 'object' ){
                      return;
                    }
                    if( 'html' in re ){
                      comet.insert.html( crow, re );
                    }
                    if( 'css' in re ){
                      comet.insert.css( ncid, 'columns', re );
                    }
                    comet.redefineColumns( crow );
                  }
                  return;

                case 'element':

                  if( typeof element.dataset !== 'object'
                     || typeof element.dataset.id === 'undefined'
                     || typeof ( eid = parseInt( element.dataset.id ) ) !== 'number'
                     || isNaN( eid )
                     || typeof metaData.elements !== 'object'
                     || !( eid in metaData.elements ) ){
                    return;
                  }

                  if( role === 'edit' ){
                    if( !( '_type' in metaData.elements[eid] )
                       || typeof ( t = metaData.elements[eid]._type ) === 'undefined'
                       || typeof cometdata.elements[t] !== 'object'
                       || typeof cometdata.elements[t].tabs !== 'object' ){
                      return;
                    }
                    title = cometdata.options.element.edit;
                    target.id = eid;
                    target.type = 'elements';
                    target.node = element;
                    r = comet.buildTabs( cometdata.elements[t].tabs, metaData.elements[eid] );
                    break;

                  }else if( role === 'del' ){
                    comet.removeMetaData( eid, 'elements' );
                    $( element ).remove();

                  }else if( role === 'dup' ){
                    if(   typeof column.dataset !== 'object'
                       || typeof column.dataset.id === 'undefined'
                       || typeof ( cid = parseInt( column.dataset.id ) ) !== 'number'
                       || isNaN( cid ) ){
                      return;
                    }
                    neid = comet.initCloneMetaData( eid, 'elements', cid );
                    re = cometUtils.layout( metaData ).element( neid );
                    if( typeof re !== 'object' || !( 'html' in re ) || !( 'css' in re ) ){
                      return;
                    }
                    $( column ).children( '.cpb-columnContent' ).append( re.html );
                    comet.insert.css( neid, 'elements', re );
                    cometUtils.init.icons();
                    cometUtils.init.images();

                  }
                  return;

                default:
                  return;
              }

              if( typeof r !== 'object' || !( 'tabs' in r ) || !( 'content' in  r ) ){
                return;
              }

              opts = {
                id: false,
                title: title,
                close: {
                  inner: '<span class="cico cico-x"></span>',
                  title: cometdata.ui.close,
                  do: function( e, ui ){
                    target.id = null;
                    target.node = null;
                    target.state = null;
                    target.type = null;
                    comet.toggle.editor( 'close' );
                    comet.handleSize();
                  },
                },
                content: r.content,
                tabs: r.tabs
              };

              comet.modal( opts );
              comet.initModalParts();
            }
          };

          e[e.length] = {
            on: 'input propertychange',
            trigger: '.comet-field',
            do: function( event, ui ){
              comet.updateComponent( ui );
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '.comet-menuComponentButton',
            do: function( event, ui ){
              event.preventDefault();
              var active = 'cpb-active',
                  i = '',
                  open = comet.node( ui ).hasClass( active ),
                  isElement, doc, a, opt, cl1, cl2, r, t, l, menu;

              comet.closeOptions();

              if( open || typeof cometdata.options !== 'object' ){
                return;
              }
              isElement = comet.node( ui.parentNode ).hasClass( 'cpb-element' );
              comet.node( ui ).addClass( active );
              doc = ui.getBoundingClientRect();
              t = doc.top + doc.height;
              l = doc.left;

              menu = document.createElement( 'div' );
              menu.id = 'comet-menuComponent';
              menu.className = 'comet-menuComponentOptions';
              menu.style.top = t + 'px';
              menu.style.left = l + 'px';
              
              for( a in cometdata.options ){
                if( a === 'element' && !isElement ){
                  continue;
                }
                opt = cometdata.options[a];
                cl1 = 'comet-mcList';
                cl1 += ' comet-mcList' + cometUtils.generate.capitalize( a );
                i += '<div class="' + cl1 + '">';
                i += '<div class="comet-mcListTitle">' + cometUtils.generate.capitalize( a.substr( 0, 1 ) ) + '</div>';
                i += '<div class="' + cl1 + '" data-action="' + a.trim() + '">';
                for( r in opt ){
                  cl2 = 'comet-mcItem';
                  cl2 += ' comet-mcItem' + cometUtils.generate.capitalize( r );
                  cl2 += ' comet-mcItem' + cometUtils.generate.capitalize( r ) + cometUtils.generate.capitalize( a );
                  i += '<button class="' + cl2 + '" data-role="' + r.trim() + '">' + opt[r] +'</button>';
                }
                i += '</div>';
                i += '</div>';
              }
              menu.innerHTML = i;
              document.body.appendChild( menu );
            }
          };

          var sort = function( options ){
            var current = null,
                cursor = null,
                ct = 'cpb-transientPlaceholder',
                mouseDown = false,
                idCursor = 'comet-uiCursor',
                $win, state, placeholder, cursorHTML, prop, _cursor, interval, explode;

            options.handle = options.handle || '';
            options.connectWith = options.connectWith || 'ul';
            options.items = options.items || 'li';
            options.placeholder = options.placeholder || 'cpb-placeholderUi';
            options.cursor = options.cursor || null;
            options.containment = options.containment || 'body';
            options.bodyClass = options.bodyClass || 'cpb-sorting';


            placeholder = '<div class="' + options.placeholder + '"></div>';
            cursorHTML = '<div id="' + idCursor + '" class="' + options.cursor + '"><span class="cico cico-move"></span></div>';
            $win = $( options.containment );

            _cursor = function( event ){
              var cc;

              if( event === 'destroy' && cursor !== null ){
                $( cursor ).remove();
                cursor = null;
                return;
              }

              if( typeof event !== 'object' ){
                return;
              }

              if( cursor === null ){
                $( 'body' ).append( cursorHTML );
                cursor = document.getElementById( idCursor );
              }

              if( cursor !== null ){
                event.preventDefault();
                $( cursor ).css({left: (event.pageX ) + 'px', top: (event.pageY ) + 'px'});
              }
            };

            explode = function( str ){
              var ex = str.split( ',' ),
                  a, i, type, inc, nstr, o, c;

              if( typeof ex !== 'object' || !ex.length || ex.length < 1 ){
                return false;
              }

              o = [];
              c = 0;
              for( a = 0; a < ex.length; a++ ){
                i = ex[a];
                if( typeof i !== 'string' || i.length < 1 ){
                  continue;
                }
                i = i.trim();
                inc = i.substr( 0, 1 );
                switch( inc){
                  case '.':
                    type = 'class';
                    break;
                  case '#':
                    type = 'id';
                    break;
                  default:
                    continue;
                }
                nstr = i.substr( 1 );
                o[c] = {};
                o[c]['type'] = type;
                o[c]['str'] = nstr;
                c++;
              }
              return o;
            };

            prop = {
              move: {
                on: 'mousemove',
                trigger: document,
                do: function( e, ui ){
                  //e.preventDefault();
                  //e.stopPropagation();
                  var cw, items, item, $items, a, tcw, type, str, $ui, h, my, y, w, x, mx, ph, pf;

                  if( cursor === null || current === null ){
                    return;
                  }

                  cw = explode( options.connectWith );
                  items = explode( options.items );

                  pf = function(){
                    var y = e.pageY,
                        top, height;

                    if( !$win || !$win.length || $win.length < 1 ){
                      $win = $( options.containment );
                      if( !$win || !$win.length || $win.length < 1 ){
                        return;
                      }
                    }

                    clearInterval( interval );

                    top = $win.scrollTop();
                    height = $win.outerHeight();

                    if( isNaN( top ) || isNaN( height ) || isNaN( y ) ){
                      return;
                    }

                    if( top > 0 && y < 10 ){
                      $win.scrollTop( top - 1 );
                      interval = setInterval( pf, 1 );
                      return;
                    }
                    if( ( y + 5 ) > height ){
                      $win.scrollTop( top + 1 );
                      interval = setInterval( pf, 1 );
                    }
                  };
                  pf();
                  _cursor( e );

                  if( typeof cw !== 'object' || !cw.length || cw.length < 1 ){
                    return;
                  }

                  for( a = 0; a < cw.length; a++ ){
                    tcw = cw[a];
                    if( typeof tcw !== 'object' || !tcw.hasOwnProperty( 'type' ) || !tcw.hasOwnProperty( 'str' ) ){
                      continue;
                    }
                    type = tcw['type'];
                    str = tcw['str'];
                    if( ( type === 'class' && $( e.target ).hasClass( str ) ) || ( type === 'id' && e.target.id === str ) ){
                      $ui = $( e.target );
                      $items = $ui.children( options.items );

                      if( typeof $items === 'object' && $items.length > 0 ){
                        continue;
                      }

                      ph = document.getElementsByClassName( options.placeholder );

                      if( ph && ph.length && ph.length > 0 ){
                        $( ph ).remove();
                      }
                      $ui.prepend( placeholder );
                      return;
                    }
                  }

                  if( typeof items !== 'object' || !items.length || items.length < 1 ){
                    return;
                  }

                  for( a = 0; a < items.length; a++ ){
                    item = items[a];
                    if( typeof item !== 'object' || !item.hasOwnProperty( 'type' ) || !item.hasOwnProperty( 'str' ) ){
                      continue;
                    }
                    type = item['type'];
                    str = item['str'];
                    if( ( type === 'class' && $( e.target ).hasClass( str ) ) || ( type === 'id' && e.target.id === str ) ){
                      $ui = $( e.target );
                      h = $ui.outerHeight();
                      my = h / 2;
                      y = e.pageY - $ui.offset().top;

                      w = $ui.outerWidth();
                      mx = w / 4;
                      x = e.pageX - $ui.offset().left;

                      $( '.' + options.placeholder ).remove();

                      if( x <= mx || ( y <= my && ( x >= mx && x <= ( w - mx ) ) ) ){
                        $ui.before( placeholder );
                        return;
                      }

                      if( x >= ( w - mx ) || ( y <= h && y > my ) ){
                        $ui.after( placeholder );
                      }
                    }
                  }
                }
              },
              start: {
                on: 'mousedown',
                trigger: options.handle,
                do: function( e, ui ){
                  var r;
                  e.preventDefault();
                  state = setInterval( function(){
                    current = ui;
                    _cursor( e );
                    if( options.bodyClass.trim().length > 0 ){
                      $( 'body' ).addClass( options.bodyClass );
                    }

                    if( typeof options.start === 'function' ){
                      $(ui).closest( options.items ).after( placeholder );
                      r = options.start( e, ui );
                      if( typeof r === 'object' ){
                        current = r;
                      }
                    }
                    mouseDown = true;
                    clearInterval( state );
                  }, 500 );
                }
              },
              stop: {
                on: 'mouseup',
                trigger: 'html',
                do: function( e, ui ){
                  var nui;
                  e.preventDefault();
                  clearInterval( state );
                  clearInterval( interval );
                  if( !mouseDown ){
                    return;
                  }
                  if( options.bodyClass.trim().length > 0 ){
                    $( 'body' ).removeClass( options.bodyClass );
                  }
                  if( typeof options.stop === 'function' && current !== null ){
                    nui = document.getElementsByClassName( options.placeholder );
                    $( nui ).removeClass( options.placeholder ).addClass( ct );
                    nui = document.getElementsByClassName( ct );
                    if( nui.length > 0 ){
                      options.stop( e, nui[0], current );
                    }
                  }
                  if( nui.length > 0 ){
                    $(nui).remove();
                  }
                  current = null;
                  _cursor( 'destroy' );
                  mouseDown = false;
                }
              }
            };

            for( a in prop ){
              (function() {
                var cur = prop[a];
                $doc.on( cur.on, cur.trigger, function( event ){ cur.do( event, this ); });
              })(a);
            }

          };

          sort(
            {
              handle: '.comet-editorElement',
              connectWith : '.cpb-columnContent',
              items: '.cpb-element',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function(){
                comet.closeOptions();
              },
              stop: function( e, ui, current ){
                var $ui, $next, id, name, colId, r, t, re;

                if( typeof current !== 'object' || typeof current.dataset !== 'object' || typeof current.dataset.id === 'undefined' ){
                  return;
                }
                name = current.dataset.id;

                if( typeof ui.parentNode.parentNode.dataset === 'undefined' || typeof ui.parentNode.parentNode.dataset.id === 'undefined' ){
                  return;
                }
                colId = parseInt( ui.parentNode.parentNode.dataset.id );

                if( typeof colId !== 'number' || typeof metaData.columns !== 'object' || typeof metaData.columns[colId] !== 'object' ){
                  return;
                }

                id = comet.generateId( 'elements' );
                r = comet.setDefaultData( id, name );
                if( !r ){
                  return;
                }
                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.cpb-element' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }
                comet.insertId( id, 'elements', colId, t );
                re = cometUtils.layout( metaData ).element( id );

                if( typeof re !== 'object' || !( 'html' in re ) || !( 'css' in re ) ){
                  return;
                }
                $ui.parent().children( '.comet-editorMenuOptions' ).remove();
                $ui.replaceWith( re.html );
                cometUtils.init.icons();
                cometUtils.init.images();
              }
            }
          );

          sort(
            {
              handle: '#comet-editorAdd',
              connectWith : '.cpb-rows, .cpb-rowContent, #cpb-content',
              items: '.cpb-row, .cpb-column, .cpb-section',
              placeholder: 'cpb-edPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function( e, ui, current ){
                comet.closeOptions();
              },
              stop: function( e, ui, current ){
                var sid = false,
                    rid = false,
                    cid = false,
                    columns, column, sibid, nb,
                    $ui, p, $p, pp, r, type, next, re, a, w;

                p = ui.parentNode;
                $p = $( p );
                $ui = $( ui );

                next = function( items ){
                  var $next = $ui.next( items ),
                      t = 'last';

                  if( $next.length > 0 ){
                    t = parseInt( $next.attr( 'data-id' ) );
                    if( typeof t !== 'number' || isNaN( t ) ){
                      t = 'last';
                    }
                  }
                  return t;
                }

                if( p.id === 'cpb-content' ){
                  type = 'sections';
                  sid = comet.generateId( type );
                  r = comet.setDefaultData( sid, type );
                  if( !r ){
                    return;
                  }
                  comet.insertId( sid, type, 0, next( '.cpb-section' ) );

                  type = 'rows';
                  rid = comet.generateId( type );
                  r = comet.setDefaultData( rid, type );
                  if( !r ){
                    return;
                  }

                  comet.insertId( rid, type, sid, 'last' );

                  type = 'columns';
                  cid = comet.generateId( type );
                  r = comet.setDefaultData( cid, type );
                  if( !r ){
                    return;
                  }
                  comet.insertId( cid, type, rid, 'last' );
                  re = cometUtils.layout( metaData ).section( sid );

                }else if( comet.node( p ).hasClass( 'cpb-rows' )
                  && typeof ( sid = parseInt( p.parentNode.dataset.id ) ) === 'number'
                  && !isNaN( sid ) ){
                  type = 'rows';
                  rid = comet.generateId( type );
                  r = comet.setDefaultData( rid, type );
                  if( !r ){
                    return;
                  }

                  comet.insertId( rid, type, sid, next( '.cpb-row' ) );

                  type = 'columns';
                  cid = comet.generateId( type );
                  r = comet.setDefaultData( cid, type );
                  if( !r ){
                    return;
                  }
                  comet.insertId( cid, type, rid, 'last' );
                  re = cometUtils.layout( metaData ).row( rid );

                }else if( comet.node( p ).hasClass( 'cpb-rowContent' )
                  && typeof ( rid = parseInt( p.parentNode.dataset.id ) ) === 'number'
                  && !isNaN( rid ) ){

                  type = 'columns';
                  cid = comet.generateId( type );
                  r = comet.setDefaultData( cid, type );
                  if( !r ){
                    return false;
                  }
                  columns = comet.get.node.children( p, 'cpb-column' );
                  w = 100;
                  nb = 1;

                  if( columns && typeof columns === 'object' && 'length' in columns && columns.length > 0 ){
                    nb = columns.length + 1;
                    w =  Number( 100 / nb ).toFixed( 2 );

                    for( a = 0; a < columns.length; a++ ){
                      column = columns[a];
                      if( !column
                        || typeof column.dataset !== 'object'
                        || !( 'id' in column.dataset )
                        || typeof ( sibid = parseInt( column.dataset.id ) ) !== 'number'
                        || isNaN( sibid ) ){
                          continue;
                      }

                      metaData[type][sibid]['wsize'] = w;
  
                      re = cometUtils.layout( metaData, true ).column( sibid );
    
                      if( 'css' in re ){
                        comet.insert.css( sibid, 'columns', re );
                      }
                    }
                  }
                  metaData[type][cid]['wsize'] = w;
                  comet.insertId( cid, type, rid, next( '.cpb-column' ) );
                  re = cometUtils.layout( metaData ).column( cid );
                  p.dataset.ncol = nb;
                }else{
                  return false;
                }

                if( typeof re !== 'object' ){
                  return;
                }
                if('html' in re ){
                  $ui.replaceWith( re.html );
                }
                if( 'css' in re ){
                  comet.insert.css( cid, 'columns', re );
                }
              }
            }
          );

          /* SORT ITEMS */
          sort(
            {
              handle: '.comet-edModalItem',
              connectWith : '.comet-edModalItems',
              items: '.comet-edModalItem',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '.comet-modalContent',
              bodyClass: 'cpb-sortingItem',
              start: function( e, ui ){
                var id;

                if( !comet.node( ui ).isNode()
                  || typeof ui.dataset !== 'object'
                  || !( 'id' in ui.dataset )
                  || typeof ( id = parseInt( ui.dataset.id ) ) !== 'number'
                  || isNaN( id ) ){
                    return;
                }
                ui.style.visibility = 'hidden';
                return ui;
              },
              stop: function( e, ui, item ){
                var $ui, id, pid, t, $next;

                item.removeAttribute( 'style' );

                if( !comet.node( item ).isNode()
                  || typeof item.dataset !== 'object'
                  || !( 'id' in item.dataset )
                  || typeof ( id = parseInt( item.dataset.id ) ) !== 'number'
                  || isNaN( id )
                  || !( 'id' in target )
                  || typeof ( pid = parseInt( target.id ) ) !== 'number'
                  || isNaN( pid )
                  || typeof metaData.elements !== 'object'
                  || typeof metaData.elements[pid] !== 'object' ){
                    return;
                }
                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.comet-edModalItem' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }

                comet.removeId( id, 'items', pid );
                comet.insertId( id, 'items', pid, t );
                ui.parentNode.replaceChild( item , ui );
                
                var re = cometUtils.layout( metaData ).iElement( pid );
                if( typeof re === 'object' && 'html' in re ){
                  target.node.innerHTML = re.html;
                }
              }
            }
          );

          /* SORT ELEMENTS */
          sort(
            {
              handle: '.comet-mcItemMoveElement',
              connectWith : '.cpb-columnContent',
              items: '.cpb-element',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function( e, ui ){
                var button = comet.get.activeMenuButton(),
                    element, p, eid;

                comet.closeOptions();

                if( !comet.node( button ).isNode()
                  || !comet.node( button.parentNode ).hasClass( 'cpb-element' )
                  || typeof ( element = button.parentNode ).dataset !== 'object'
                  || !( 'id' in element.dataset )
                  || typeof ( eid = parseInt( element.dataset.id ) ) !== 'number'
                  || isNaN( eid ) ){
                  return;
                }
                element.style.visibility = 'hidden';
                return element;
              },
              stop: function( e, ui, el ){
                var $ui, id, column, cid, ncolumn, ncid, t, p, $next;

                if( !comet.node( el ).isNode()
                  || typeof el.dataset !== 'object'
                  || !( 'id' in el.dataset )
                  || typeof ( id = parseInt( el.dataset.id ) ) !== 'number'
                  || isNaN( id )
                  || !comet.node( el.parentNode ).isNode()
                  || !comet.node( el.parentNode.parentNode ).hasClass( 'cpb-column' )
                  || typeof ( column = el.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in column.dataset )
                  || typeof ( cid = parseInt( column.dataset.id ) ) !== 'number'
                  || isNaN( cid )
                  || typeof metaData.columns !== 'object'
                  || typeof metaData.columns[cid] !== 'object'
                  || !comet.node( ui.parentNode ).isNode()
                  || !comet.node( ui.parentNode.parentNode ).hasClass( 'cpb-column' )
                  || typeof ( ncolumn = ui.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in ncolumn.dataset )
                  || typeof ( ncid = parseInt( ncolumn.dataset.id ) ) !== 'number'
                  || isNaN( ncid ) ){
                    return;
                }

                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.cpb-element' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }
                el.removeAttribute( 'style' );
                comet.removeId( id, 'elements', cid );
                comet.insertId( id, 'elements', ncid, t );
                ui.parentNode.replaceChild( el , ui );
              }
            }
          );

          /* SORT COLUMNS */
          sort(
            {
              handle: '.comet-mcItemMoveColumn',
              connectWith : '.cpb-rowContent',
              items: '.cpb-column',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function( e, ui ){
                var button = comet.get.activeMenuButton(),
                    column, p, cid;
                    
                comet.closeOptions();

                if( !comet.node( button ).isNode() || !comet.node( button.parentNode ).isNode() ){
                  return;
                }
                p = button.parentNode;
                
                if( comet.node( p ).hasClass( 'cpb-column' ) ){
                  column = p;
                }else if(  comet.node( p ).hasClass( 'cpb-element' ) ){
                  column = p.parentNode.parentNode;
                }else{
                  return;
                }

                if( !comet.node( column ).isNode()
                  || typeof column.dataset !== 'object'
                  || !( 'id' in column.dataset )
                  || typeof ( cid = parseInt( column.dataset.id ) ) !== 'number'
                  || isNaN( cid ) ){
                    return;
                }
                column.style.visibility = 'hidden';
                return column;
              },
              stop: function( e, ui, col ){
                var $ui, id, row, ref, nref, rid, nrid, nrow, t, $next;

                if( !comet.node( col ).isNode()
                  || typeof col.dataset !== 'object'
                  || !( 'id' in col.dataset )
                  || typeof ( id = parseInt( col.dataset.id ) ) !== 'number'
                  || isNaN( id )
                  || !comet.node( ( ref = col.parentNode ) ).isNode()
                  || !comet.node( ref.parentNode ).isNode()
                  || typeof ( row = ref.parentNode ).dataset !== 'object'
                  || !( 'id' in row.dataset )
                  || typeof ( rid = parseInt( row.dataset.id ) ) !== 'number'
                  || isNaN( rid )
                  || typeof metaData.rows !== 'object'
                  || typeof metaData.rows[rid] !== 'object'
                  || !comet.node( ( nref = ui.parentNode ) ).isNode()
                  || !comet.node( nref.parentNode ).isNode()
                  || typeof ( nrow = nref.parentNode ).dataset !== 'object'
                  || !( 'id' in nrow.dataset )
                  || typeof ( nrid = parseInt( nrow.dataset.id ) ) !== 'number'
                  || isNaN( nrid ) ){
                  return;
                }
                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.cpb-column' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }
                col.removeAttribute( 'style' );
                comet.removeId( id, 'columns', rid );
                comet.insertId( id, 'columns', nrid, t );
                ui.parentNode.replaceChild( col , ui );
                if( rid !== nrid ){
                  comet.redefineColumns( ref );
                  comet.redefineColumns( nref );
                }
              }
            }
          );

          /* SORT ROWS */
          sort(
            {
              handle: '.comet-mcItemMoveRow',
              connectWith : '.cpb-rows',
              items: '.cpb-row',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function( e, ui ){
                var button = comet.get.activeMenuButton(),
                    column, row, p, rid;

                comet.closeOptions();

                if( !comet.node( button ).isNode() || !comet.node( button.parentNode ).isNode() ){
                  return;
                }
                p = button.parentNode;
                
                if( comet.node( p ).hasClass( 'cpb-column' ) ){
                  column = p;
                }else if(  comet.node( p ).hasClass( 'cpb-element' ) ){
                  column = p.parentNode.parentNode;
                }else{
                  return;
                }
                
                if( !comet.node( column.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode ).hasClass( 'cpb-row' )
                  || typeof ( row = column.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in row.dataset )
                  || typeof ( rid = parseInt( row.dataset.id ) ) !== 'number'
                  || isNaN( rid ) ){
                    return;
                }
                row.style.visibility = 'hidden';

                return row;
              },
              stop: function( e, ui, row ){
                var rowo = row.outerHTML,
                    $ui, id, section, sid, nsection, nsid, t, $next;

                if( !comet.node( row ).isNode()
                  || typeof row.dataset !== 'object'
                  || !( 'id' in row.dataset )
                  || typeof ( id = parseInt( row.dataset.id ) ) !== 'number'
                  || isNaN( id )
                  || !comet.node( row.parentNode ).isNode()
                  || !comet.node( row.parentNode.parentNode ).isNode()
                  || typeof ( section = row.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in section.dataset )
                  || typeof ( sid = parseInt( section.dataset.id ) ) !== 'number'
                  || isNaN( sid )
                  || typeof metaData.sections !== 'object'
                  || typeof metaData.sections[sid] !== 'object'
                  || !comet.node( ui.parentNode ).isNode()
                  || !comet.node( ui.parentNode.parentNode ).isNode()
                  || typeof ( nsection = ui.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in nsection.dataset )
                  || typeof ( nsid = parseInt( nsection.dataset.id ) ) !== 'number'
                  || isNaN( nsid ) ){
                  return;
                }
                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.cpb-row' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }
                row.removeAttribute( 'style' );
                comet.removeId( id, 'rows', sid );
                comet.insertId( id, 'rows', nsid, t );
                ui.parentNode.replaceChild( row , ui );
              }
            }
          );

          /* SORT SECTIONS */
          sort(
            {
              handle: '.comet-mcItemMoveSection',
              connectWith : '#cpb-content',
              items: '.cpb-section',
              placeholder: 'cpb-edSortPlaceholder',
              cursor: 'cpb-elementCursor',
              containment: '#cpb-content',
              start: function( e, ui ){
                var button = comet.get.activeMenuButton(),
                    column, p, section, sid;
                
                comet.closeOptions();

                if( !comet.node( button ).isNode() || !comet.node( button.parentNode ).isNode() ){
                  return;
                }
                p = button.parentNode;
                
                if( comet.node( p ).hasClass( 'cpb-column' ) ){
                  column = p;
                }else if(  comet.node( p ).hasClass( 'cpb-element' ) ){
                  column = p.parentNode.parentNode;
                }else{
                  return;
                }
                
                if( !comet.node( column.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode.parentNode.parentNode ).isNode()
                  || !comet.node( column.parentNode.parentNode.parentNode.parentNode ).hasClass( 'cpb-section' )
                  || typeof ( section = column.parentNode.parentNode.parentNode.parentNode ).dataset !== 'object'
                  || !( 'id' in section.dataset )
                  || typeof ( sid = parseInt( section.dataset.id ) ) !== 'number'
                  || isNaN( sid ) ){
                    return;
                }
                section.style.visibility = 'hidden';

                return section;
              },
              stop: function( e, ui, section ){
                var $ui, id, t, $next;
                section.removeAttribute( 'style' );

                if( !comet.node( section ).isNode()
                  || typeof section.dataset !== 'object'
                  || !( 'id' in section.dataset )
                  || typeof ( id = parseInt( section.dataset.id ) ) !== 'number'
                  || isNaN( id )
                  || typeof metaData.sections !== 'object' ){
                    return;
                }

                t = 'last';
                $ui = $( ui );
                $next = $ui.next( '.cpb-section' );

                if( $next.length > 0 ){
                  t = parseInt( $next.attr( 'data-id' ) );
                  if( typeof t !== 'number' || isNaN( t ) ){
                    t = 'last';
                  }
                }
                comet.removeId( id, 'sections', id );
                comet.insertId( id, 'sections', id, t );
                ui.parentNode.replaceChild( section , ui );
              }
            }
          );


          e[e.length] = {
            on: 'click',
            trigger: '.comet-modalFieldRadioWrap',
            do: function( event, ui ){
              var p = ui.parentNode,
                  chn, ch, $ch, c;

              if( !p || !p.children || typeof p.children !== 'object' || p.children.length < 1){
                return false;
              }

              chn = p.children;
              for( c = 0; c < chn.length; c++ ){
                ch = chn[c];
                if( typeof ch !== 'object' ){
                  continue;
                }
                $ch = $( ch );
                if( !$ch.hasClass( 'comet-modalFieldRadioWrap' ) ){
                  continue;
                }
                $ch.removeClass( 'cpb-active' );
              }
              $( ui ).addClass( 'cpb-active' );
            }
          };

          e[e.length] = {
            on: 'click',
            trigger: '#comet-editorSidebarToggle',
            do: function( event, ui ){
              event.preventDefault();
              var p = ui.parentNode.parentNode,
                  $p = $( p ),
                  open = 'cpb-active',
                  search = '#comet-elementPickerSearch',
                  els, o;

              if( $p.hasClass( open ) ){
                $p.removeClass( open ).find( search ).remove();
                els = document.getElementsByClassName( 'comet-editorElement' );
                if( els.length ){
                  $( els ).show();
                }
                comet.handleSize();
                return;
              }
              $p.addClass( open );
              o = '<div id="comet-elementPickerSearch"><input id="comet-elementPickerSearchInput" type="text" class="comet-rendField" value="" placeholder="' + cometdata.ui.search + '"/><span class="cico cico-search"></span></div>';
              $( ui ).after( o );
              comet.handleSize();
            }
          };

          e[e.length] = {
            on: 'input propertychange',
            trigger: '#comet-elementPickerSearchInput',
            do: function( event, ui ){
              event.preventDefault();
              var val = ui.value,
                  els = document.getElementsByClassName( 'comet-editorElement' ),
                  el, a, t, regex;

              if( !els.length ){
                return;
              }
              val = val.trim();
              regex = new RegExp( val, 'i' );

              for( a = 0; a < els.length; a++ ){
                el = els[a];
                if( typeof el.title === 'undefined' || typeof el.dataset === 'undefined' || typeof el.dataset.id === 'undefined' ){
                  continue;
                }
                t = el.title;
                if( !cometUtils.eval.empty( val ) && t.search( regex ) === -1 ){
                  el.style.display = 'none';
                  continue;
                }
                el.style.display = 'inline-block';
              }
            }
          };

          comet.gradient();
          comet.range();

          var redefineOptsPos = function(){
                var active = 'cpb-active',
                    btns = document.getElementsByClassName( 'comet-menuComponentButton' ),
                    menu = document.getElementById( 'comet-menuComponent' ),
                    btn, a, th, doc, t, l;

                if( !btns
                  || typeof btns !== 'object'
                  || !( 'length' in btns )
                  || btns.length < 1
                  || !comet.node( menu ).isNode() ){
                  return;
                }
                
                for( a = 0; a < btns.length; a++ ){
                  btn = btns[a];
                  if( !comet.node( btn ).isNode() || !comet.node( btn ).hasClass( active ) ){
                    continue;
                  }
                  th = btn;
                }

                if( !comet.node( th ).isNode() ){
                  comet.closeOptions();
                  return;
                }
                doc = th.getBoundingClientRect();
                t = doc.top + doc.height;
                l = doc.left;
                menu.style.top = t + 'px';
                menu.style.left = l + 'px';

          };

          $frame.scroll(redefineOptsPos);
          $( window ).resize(redefineOptsPos);

          for( a = 0; a < e.length; a++ ){
            (function() {
              var cur = e[a];
              $doc.on( cur.on, cur.trigger, function( event ){ cur.do( event, this ); });
            })(a);
          }

        },
        confirm: function( data ){
          var $confirm = $( '#comet-alertConfirm' ),
              o;

          if( $confirm && $confirm.length > 0 ){
            $confirm.remove();
          }

          o = '<div id="comet-alertConfirm">';
          o += '<div id="comet-alertConfirmModal">';
          o += '<p>' + data.message + '</p>';
          o += '<div id="comet-alertConfirmButtonset">';
          o += '<button class="comet-alertConfirmButton comet-button cancel">' + cometdata.ui.cancel + '</button>';
          o += '<a class="comet-alertConfirmButton comet-button comet-buttonPrimary done" href="' + data.redirect + '">' + cometdata.ui.done + '</a>';
          o += '</div>';
          o += '</div>';
          o += '</div>';

          $( 'body' ).append( o );

          $doc.on( 'click', '.comet-alertConfirmButton', function( e ){
            var $self = $( this );

            if( $self.hasClass( 'cancel' ) ){
              e.preventDefault();
            }else if( $self.hasClass( 'done' ) ){
              if( data.hasOwnProperty( 'onDone' ) && typeof data.onDone === 'function' ){
                e.preventDefault();
                data.onDone();
              }
            }

            $( '#comet-alertConfirm' ).remove();

          });
        },
        notification: function( note, status ){
          var c = document.getElementById( 'comet-cockpit' ),
              n = document.getElementById( 'comet-notifications' ),
              o = document.createElement( 'div' );

          if( n == null || typeof n !== 'object' || c == null || typeof c !== 'object' ){
            return false;
          }
          status = parseInt( status );
          switch( status ){
            case 0:
            case 400:
              status = 'error';
              break;
            default:
              status = 'success';
          }
          c.className = 'cpb-active';
          o.className = 'comet-notification ' + status;
          o.innerHTML = '<button class="comet-button comet-close comet-closeNote"><span class="cico cico-x"></span></button><p>' + note + '</p>';

          n.appendChild( o );

        }
      };

  $(function() {
    comet.init();
  });
}));