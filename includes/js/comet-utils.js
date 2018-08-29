/* Comet - Copyright (c) 2018 Blacklead   */

(function( $, global ){
  var content = document.getElementById( 'cpb-content' ),
      u = {};

  /* Decode */

  u.decode = {
    gradient: function( str ){
      var d1 = '+',
          d2 = 'z',
          o, a, depth1, depth2, crt, c, p, count;
      if( typeof str !== 'string' || str.length < 1 ){
        return false;
      }
      depth1 = str.split( d1 );

      if( !depth1.length ){
        return false;
      }
      o = [];
      count = 0;
      for( a = 0; a < depth1.length; a++ ){
        crt = depth1[a];
        depth2 = crt.split( d2 );
        if( !depth2.length || !depth2.hasOwnProperty( '0' ) || !depth2.hasOwnProperty( '1' ) ){
          continue;
        }
        c = u.sanitize.color( depth2[1] );
      
        if( c === '' ){
          continue;
        }
        p = parseInt( depth2[0] );
        if( typeof p !== 'number' || isNaN( p ) || p < 0 ){
          p = 0;
        }
        o[count] = {
          stop: p,
          color: c
        };
        count++;
      }
      return o;
    },
    base64: function( str ){
      return decodeURIComponent( escape( window.atob( str ) ) );
    },
    icon: function( icon ){
      var sets = cometdata.svgSets, d, a, i, o;
      if( u.eval.empty( icon ) ){
        return false;
      }
      icon = icon.trim();

      d = icon.split( ':' );

      if( !d.length ){
        return false;
      }

      o = {};
      for( a = 0; a < d.length; a++ ){
        i = d[a];
        if( u.eval.empty( i ) ){
          continue;
        }
        if( i in sets ){
          o.set = i;
          continue;
        }
        o.id = i;
      }
      if( 'set' in o && 'id' in o ){
        return o;
      }
      return false;
    }
  };

  /* Encode */

  u.encode = {
    gradient: function( colors ){
      var color, a, c, o, p;
      if( typeof colors !== 'object' || !colors.length || colors.length < 2 ){
        return '';
      }

      o = '';

      for( a = 0; a < colors.length; a++ ){
        color = colors[a];
        if( typeof color !== 'object' || !color.hasOwnProperty( 'color' ) || !u.eval.color( color.color ) ){
          continue;
        }
        c = color.color;
        p = 0;
        if( color.hasOwnProperty( 'stop' ) ){
          p = parseInt( color.stop );
          if( typeof p !== 'number' || isNaN( p ) ){
            p = 0;
          }
          if( p < 0 ){
            p = 0;
          }
          if( p > 100 ){
            p = 100;
          }
        }
        if( o.length > 0 ){
          o += '+';
        }
        o += p + 'z' + c;
      }
      return o;
    },
    base64: function( str ){
      return window.btoa( unescape( encodeURIComponent( str ) ) );
    }
  };

  /* Generate */

  u.generate = {
    gradient: function( style, angle, colors ){
      var c, color, g;
      if( typeof colors !== 'string' || colors.length < 1 ){
        return '';
      }

      colors = u.decode.gradient( colors );

      if( typeof colors !== 'object' || !colors.length || colors.length < 2 ){
        return '';
      }

      if( style === 'radial' ){
        g = 'radial-gradient( farthest-' + angle;
      }else{
        g = 'linear-gradient(';
        angle = parseInt( angle );
        if( typeof angle === 'number' && !isNaN( angle ) ){
          if( angle <= 0 || angle >= 360 ){
            g += 'to top';
          }else{
            switch( angle ){
              case 180:
                g += 'to bottom';
                break;
              case 270:
                g += 'to left';
                break;
              case 90:
                g += 'to right';
                break;
              case 45:
                g += 'to top right';
                break;
              case 135:
                g += 'to bottom right';
                break;
              case 225:
                g += 'to bottom left';
                break;
              case 315:
                g += 'to top left';
                break;
              default:
                g += angle + 'deg';
            }
          }
        }else{
          g += 'to top';
        }
      }
      colors.sort(function (a, b){ return a.stop - b.stop; });
      for( c = 0; c < colors.length; c++ ){
        color = colors[c];
        if( !color.hasOwnProperty( 'color' ) || !color.hasOwnProperty( 'stop' ) || isNaN( color.stop ) ){
          continue;
        }
        g += ',' + color.color + ' ' + color.stop + '%';
      }
      g += ')';
      return g;
    },
    mu: function( top, right, bottom, left, vunit, hunit ){
      var x = null, y = null, o;
      top = u.sanitize.number( top );
      right = right === 'auto' ? 'auto' : u.sanitize.number( right );
      bottom = u.sanitize.number( bottom );
      left = left === 'auto' ? 'auto' : u.sanitize.number( left );
      vunit = u.sanitize.length( vunit );
      hunit = u.sanitize.length( hunit );

      if( top === bottom ){
        y = top;
      }
      if( left === right ){
        x = left;
      }

      if( y !== null && x !== null ){
        if( y === x ){
          if( y === 0 ){
            return 0;
          }
          if( vunit === hunit ){
            return u.generate.valueUnit( y, vunit );
          }
        }
        return u.generate.valueUnit( y, vunit ) + ' ' + u.generate.valueUnit( x, hunit );
      }
      o = u.generate.valueUnit( top, vunit );
      o += ' ' + u.generate.valueUnit( right, hunit );
      o += ' ' + u.generate.valueUnit( bottom, vunit );
      if( x === null ){
        o += ' ' + u.generate.valueUnit( left, hunit );
      }
      return o;
    },
    valueUnit: function( value, unit ){
      if( value === 0 || value === 'auto' ){
        return value;
      }
      return value + unit;
    },
    border: function( bs, color ){
      var o, w, t, r, b, l;
      if( arguments.length > 0 ){
        bs = u.sanitize.borderStyle( bs );
        color = u.sanitize.color( color );
        t = arguments[2] || 0;
        r = arguments[3] || 0;
        b = arguments[4] || 0;
        l = arguments[5] || 0;
        w = u.generate.mu( t, r, b, l, 'px', 'px' );
        if( w !== 0 && bs !== 'none' && color !== '' ){
          o = 'border-width:' + w + ';';
          o += 'border-style:' + bs + ';';
          o += 'border-color:' + color + ';';
          return o;
        }
      }
      return '';
    },
    content: function( content, id, ed_id, tag ){
      var editor = '',
          data = '',
          o, ctag;
      content = typeof content === 'string' && content.length > 0 ? content.trim() : '';
      if( typeof id === 'string' ){
        id = id.trim();
        if( id.length > 0 ){
          ctag = 'comet-editorContentBody';
          if( 4 in arguments && !u.eval.empty( arguments[4] ) ){
          ctag += ' ' + arguments[4].trim();
          }
          data = ' class="' + ctag + '" data-match="' + id + '"';
          if( u.editor( ed_id ) ){
            data += ' contenteditable="true"';
          }
        }
      }

      switch( tag ){
        case 'p':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'li':
        case 'span':
        case 'code':
        case 'blockquote':
          content = u.sanitize.html( content );
          break;
        default:
          tag = 'div';
          break;
      }
      return '<' + tag + data + '>' + content + '</' + tag + '>';
    },
    item: function( options ){
      var o, id, c, t;
      if( typeof options !== 'object' || !options.hasOwnProperty( 'id' ) ){
        return false;
      }
      id = parseInt( options.id );
      if( typeof id !== 'number' || isNaN( id ) ){
        return false;
      }

      t = 'tag' in options && typeof options.tag === 'string' ? options.tag.trim() : 'div';
      c = 'cpb-elementItem';
      c += ' cpb-elementItem' + id;
      c += 'class' in options && typeof options.class === 'string' ? ' ' + options.class.trim() : '';

      o = '<' + t + ' class="' + c + '">';
      if( ( '1' in arguments || arguments.hasOwnProperty( 1 ) ) && typeof arguments[1] === 'function' ){
        o += arguments[1]();
      }
      o += '</' + t + '>';
      return o;
    },
    element: function( opts ){
      var id = 'id' in opts ? parseInt( opts.id ) : false,
          name = 'functionName' in opts && typeof opts.functionName === 'string' ? opts.functionName : false,
          data = 'data' in opts && typeof opts.data === 'object' ? opts.data : false,
          func, l;

      if( !name || typeof id !== 'number' || isNaN( id ) ){
        return false;
      }

      l = u.load({
        do: 'element',
        element: name,
        id: id,
        data: data
      });

      if( !l ){
        return false;
      }

      l.done(function( r ){
        var elements = document.getElementsByClassName( 'cpb-elementNode' + id ),
            element, _element, e, _id;

        if( typeof elements !== 'object'  || elements.length < 1  ){
          return false;
        }
        element = false;

        for( e = 0; e < elements.length; e++ ){
          _element = elements[e];
          if( typeof _element !== 'object' || typeof _element.dataset !== 'object' || !_element.dataset.hasOwnProperty( 'id' ) ){
            continue;
          }
          _id = parseInt( _element.dataset.id );
          if( typeof _id !== 'number' || isNaN( _id ) || id !== _id ){
            continue;
          }
          element = _element;
          break;
        }

        if( typeof element !== 'object' ){
          return false;
        }
        $( element ).children( '.cpb-elementContent' ).html( r );
      });

      return '<span class="cometPending">...</span>';
    },
    classe: {
      alignment: function( alg ){
        var c = 'cpb-align';
        switch( alg ){
          case 'l':
            c += 'Left';
            break;
          case 'r':
            c += 'Right';
            break;
          case 'j':
            c += 'Justify';
            break;
          case 'm':
            c += 'Middle';
            break;
          case 't':
            c += 'Top';
            break;
          case 'b':
            c += 'Bottom';
            break;
          default:
            c += 'Center';
            break;
        }
        return c;
      },
    },
    responsive: function( device, css ){
      var width = device === 'm' ? 400 : 800,
          o = '';
      if( typeof css === 'string' && css.length > 0 ){
        o += '@media only screen and (max-width:' + width + 'px){';
        o += css;
        o += '}';
      }
      return o;
    },
    css: function( style, value ){
      return style + ':' + value + ';';
    },
    image: function( url, classes, alt ){
      var cimg = 'cpb-imgloader' + ( !u.eval.empty( classes ) ? ' ' + classes : '' );

      return '<img class="' + cimg + '" src="' + u.esc.url( url ) + '" alt="' + alt + '"/>';

    },
    icon: function( icon ){

      if( u.eval.empty( icon ) ){
        return '';
      }

      return '<span class="cpb-iconloader" data-cpbicon="' + icon.trim() + '"></span>';

    },
    capitalize: function( str ){
      if( u.eval.empty( str ) ){
        return str;
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    data: function( data, id ){
      var d = {},
          ids, idsa, a;

      id = parseInt( id );

      if( typeof data !== 'object'
        || !( 'elements' in data )
        || typeof id !== 'number'
        || isNaN( id )
        || !( id in data.elements )
        || typeof data.elements[id] !== 'object' ){
        return {};
      }

      d.el = data.elements[id];

      if( '_items' in d.el && !u.eval.empty( d.el._items ) && 'items' in data && typeof data.items === 'object' ){
        ids = u.parse.ids( d.el._items, 'array' );
        if( typeof ids === 'object' && ids.length > 0 ){
          d.items = {};
          for( a = 0; a < ids.length; a++ ){
            idsa = parseInt( ids[a] );
            if( typeof idsa !== 'number' || isNaN( idsa ) || !( idsa in data.items ) || typeof data.items[idsa] !== 'object' ){
              continue;
            }
            d.items[idsa] = data.items[idsa];
          }
        }
      }
      return d;
    },
    placeholder: function(){
      var t = 0 in arguments && typeof arguments[0] === 'string' ? arguments[0] : 'default',
          c = 'cpb-elementPlaceholder',
          i;
      switch( t ){
        case 'button':
          c += ' cpb-eptButton';
          i = '<div><div></div></div>';
          break;
        case 'text':
          c += ' cpb-eptText';
          i = '<div></div><div></div><div></div><div></div><div></div>';
          break;
        case 'title':
          c += ' cpb-eptTitle';
          i = '<div></div><div></div>';
          break;
        case 'image':
          c += ' cpb-eptImage';
          i = '<div></div><div></div>';
          break;
        default:
          c += ' cpb-eptDefault';
          i = '<div></div>';
      }
      return '<div class="' + c + '">' + i + '</div>';
    }
  };

  /* Layout */

  u.layout = function( data ){
    var self = this,
        func = {},
        utils = {},
        catchUiCss = 1 in arguments && arguments[1] === true ? true : false;

    utils = {
      hasConnection: function( connection ){
        if( typeof data === 'object' && connection in data && typeof data[connection] === 'object' ){
          return true;
        }
        return false;
      },
      isValidId: function( id ){
        if( typeof id === 'number' && !isNaN( id ) ){
          return true;
        }
        return false;
      },
      generate: {
        styleTag: function( id, type, css ){
          var o, sid;
          if( typeof css !== 'string' || css.trim().length < 1 ){
            return '';
          }
          sid = 'cpb-style' + u.generate.capitalize( type ) + id;
  
          o = '<style id="' + sid + '" class="cpb-style' /* + u.generate.classe.style( id, type )*/ + '">';
          o += css;
          o += '</style>';
          return o;
        },
        backgroundTags: function( dt ){
          var o = '<div class="cpb-backgroundComponents">';

          if( 'vid' in dt && dt.vid == 'true' && 'vurl' in dt && u.eval.video( dt.vurl ) ){
            o += '<video class="cpb-backgroundVideo" src="' + dt.vurl + '" muted loop autoplay preload="auto"></video>';
          }

          if( 'ov' in dt && dt.ov == 'true' && 'ovc' in dt && u.eval.color( dt.ovc ) ){
            o += '<div class="cpb-backgroundOverlay"></div>';
          }

          o += '</div>';

          return o;

        }
      }
    };

    func.css = function( id, type ){
      var bg = '', o = '',
          dt, classe, c, br, bo, bgg, bgi, pd, t, r, b, l, n, rcss, el,
          bgt, mt, pos, rep, w, pad, mar, att, size, wsize, alg, a, ids, idsa;

      id = parseInt( id );

      if(   !utils.hasConnection( type )
        || !utils.isValidId( id )
        || !( id in data[type] )
        || typeof data[type][id] !== 'object' ){
        return '';
      }

      classe = '.cpb-';

      switch( type ){
        case 'sections':
          classe += 'section-' + id + '.cpb-section > .cpb-sectionContent';
          break;
        case 'rows':
          classe += 'row-' + id + '.cpb-row';
          break;
        case 'columns':
          classe += 'column-' + id + '.cpb-column';
          break;
        case 'elements':

          if( typeof data.elements[id] !== 'object' || !( '_type' in data.elements[id] ) || typeof ( t = data.elements[id]._type ) === 'undefined' ){
            return '';

          }
          el = cometElements.instance( t, id, u.generate.data( data, id ) );

          if( !( 'css' in el ) ){
            return '';

          }
          return utils.generate.styleTag( id, type, el.css() );
        default:
          return '';
      }

      dt = data[type][id];

      bgt = 'bgt' in dt && [ 'color', 'gradient' ].indexOf( dt.bgt ) !== -1 ? dt.bgt : 'none';
      mt = 'media' in dt &&  [ 'img', 'vid' ].indexOf( dt.media ) !== -1 ? dt.media : 'none';

      if( bgt !== 'none' || mt === 'img' ){
        bg = bgg = bgi = '';
        if( bgt === 'color' && 'bgc' in dt && u.eval.color( dt.bgc ) ){
          bg = 'background-color:' + dt.bgc + ';';
        }else if( bgt === 'gradient' && 'gradient' in dt ){
          t = 'bgor' in dt && dt.bgor === 'radial' ? 'radial' : 'linear';
          n = 'angle' in dt ? parseInt( dt.angle ) : 0;
          pd = typeof n === 'number' && !isNaN( n ) ? n : 0;
          if( t === 'radial' ){
            pd = 'shape' in dt && dt.shape === 'side' ? 'side' : 'corner';
          }
          bgg = u.generate.gradient( t, pd, dt.gradient );
        }
        if( mt === 'img' && 'image' in dt && u.eval.image( dt.image ) ){
          bgi = 'url(' + dt.image + ')';
        }

        if( bgg.length > 0 || bgi.length > 0 ){
          if( bgi.length > 0 && bgg.length > 0 ){
            bgi = bgi + ', ';
          }
          if( bgg.length > 0 || ( bgi.length > 0 && bg.length < 1 ) ){
            bg += 'background-color:transparent;';
          }
          if( bgi.length > 0 ){
            pos = 'pos' in dt ? u.sanitize.position( dt.pos ) : 'left top';
            rep = 'repeat' in dt ? u.sanitize.repeat( dt.repeat ) : 'repeat';
            att = 'att' in dt ? u.sanitize.attachment( dt.att ) : 'scroll';
            size = 'size' in dt ? u.sanitize.backgroundSize( dt.size ) : 'auto';
            bg += 'background-repeat:' + rep + ';';
            bg += 'background-position:' + pos + ';';
            bg += 'background-attachment:' + att + ';';
            bg += 'background-size:' + size + ';';
          }
          bg += 'background-image:' + bgi + bgg + ';';
        }
      }

      bo = '';
      if( 'bs' in dt && 'bc' in dt ){
        t = dt.bwt || 0;
        r = dt.bwr || 0;
        b = dt.bwb || 0;
        l = dt.bwl || 0;
        bo = u.generate.border( dt.bs, dt.bc, t, r, b, l );
      }

      t = dt.bradt || 0;
      r = dt.bradr || 0;
      b = dt.bradb || 0;
      l = dt.bradl || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      br = '';
      if( w !== '' ){
        br = 'border-radius:' + w + ';';
        br += '-moz-border-radius:' + w + ';';
        br += '-webkit-border-radius:' + w + ';';
      }

      t = dt.padt || 0;
      r = dt.padr || 0;
      b = dt.padb || 0;
      l = dt.padl || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      pad = '';
      if( w !== '' ){
        pad = 'padding:' + w + ';';
      }

      t = dt.mart || 0;
      r = dt.marr || 0;
      b = dt.marb || 0;
      l = dt.marl || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      mar = '';
      if( w !== '' ){
        mar = 'margin:' + w + ';';
      }

      switch( type ){
        case 'rows':
          w = null;
          alg = null;
          o = '';
          if( 'width' in dt && dt.width === 'cust' ){
            wsize = 'wsize' in dt && typeof ( wsize = parseInt( dt.wsize ) ) === 'number' && !isNaN( wsize ) ? wsize : 1000;
            wsize = wsize < 300 ? 300 : wsize;
            w = 'max-width:' + wsize + 'px;';
          }
          if( 'alg' in dt ){
            switch( dt.alg ){
              case 't':
                alg = 'flex-start';
                break;
              case 'b':
                alg = 'flex-end';
                break;
              case 'c':
                alg = 'center';
                break;
              default:
                alg = null;
            }
          }
          alg = alg != null ? 'align-items:' + alg + ';' : '';
          if( w != null ){
            o += classe + '{' + w + '}';
          }

          classe += ' .cpb-rowContent';
          o += classe + '{' + bg + bo + pad + br + mar + alg + '}';
          break;
        case 'columns':
          w = null;
          wsize = 'wsize' in dt && typeof ( wsize = parseInt( dt.wsize ) ) === 'number' && !isNaN( wsize ) && wsize < 100 ? wsize : 100;
          wsize = wsize < 10 ? 10 : wsize;
          w = 'width:' + wsize + '%;';
          o = '';
          if( w != null ){
            o += classe + '{' + w + '}';
          }
          classe += ' .cpb-columnContent';
          o += classe + '{' + bg + bo + pad + br + mar + '}';
          break;
        default:
          o = classe + '{' + bg + bo + mar + pad + br + '}';
      }

      if( 'ov' in dt && dt.ov == 'true' && 'ovc' in dt && u.eval.color( dt.ovc ) ){
        o += classe + ' > .cpb-backgroundComponents > .cpb-backgroundOverlay{background:' + dt.ovc + ';}';
        if( br !== '' ){
          o += classe + ' > .cpb-backgroundComponents{' + br + '}';
        }
      }

      t = dt.padtt || 0;
      r = dt.padrt || 0;
      b = dt.padbt || 0;
      l = dt.padlt || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      pad = '';
      if( w !== '' ){
        pad = 'padding:' + w + ';';
      }

      t = dt.martt || 0;
      r = dt.marrt || 0;
      b = dt.marbt || 0;
      l = dt.marlt || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      mar = '';
      if( w !== '' ){
        mar = 'margin:' + w + ';';
      }

      o += '.cpb-tabletMode ' + classe + '{' + pad + mar + '}';

      rcss = classe + '{' + pad + mar + '}'; 

      o += u.generate.responsive( 't', rcss );

      t = dt.padtm || 0;
      r = dt.padrm || 0;
      b = dt.padbm || 0;
      l = dt.padlm || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      pad = '';
      if( w !== '' ){
        pad = 'padding:' + w + ';';
      }

      t = dt.martm || 0;
      r = dt.marrm || 0;
      b = dt.marbm || 0;
      l = dt.marlm || 0;
      w = u.generate.mu( t, r, b, l, 'px', 'px' );
      mar = '';
      if( w !== '' ){
        mar = 'margin:' + w + ';';
      }

      o += '.cpb-mobileMode ' + classe + '{' + pad + mar + '}';

      rcss = classe + '{' + pad + mar + '}'; 

      o += u.generate.responsive( 'm', rcss );

      return utils.generate.styleTag( id, type, o );
    };

    func.init = function(){
      var from, hasFrom, _do, ids, s, sid, o, html, css, re;
      if(  typeof data !== 'object'
        || !( '_sections' in data )
        || self.eval.empty( data._sections )
        || !utils.hasConnection( 'sections' ) ){
        return '';
      }

      ids = self.parse.ids( data._sections, 'array' );
      if( typeof ids !== 'object' || ids.length < 1 ){
        return '';
      }
      _do = 0;
      hasFrom = 0 in arguments ? true : false;
      from = hasFrom && typeof ( from = parseInt( arguments[0] ) ) === 'number' && !isNaN( from ) ? from : false;
      html = '';
      css = '';
      for( s = 0; s < ids.length; s++ ){
        sid = ids[s];
        if( _do !== 1 && hasFrom && from !== sid ){
          continue;
        }
        re = this.section( sid );
        if( typeof re !== 'object' ){
          continue;
        }
        if( 'html' in re ){
          html += re.html;
        }
        if( 'css' in re ){
          css += re.css;
        }
        _do = 1;
      }

      o = {
        html: html,
        css: css
      };

      return o;

    };

    func.section = function( id ){
      var o, html, css, sid, cl, r, re, ids;

      id = parseInt( id );

      if(   !utils.hasConnection( 'sections' )
        || !utils.isValidId( id )
        || !( id in data.sections )
        || typeof data.sections[id] !== 'object' ){
        return '';
      }

      sid = 'cpb-section-' + id;
      cl = sid;
      cl += ' cpb-section';

      css = this.css( id, 'sections' );

      if( catchUiCss ){
        return { css: css };
      }

      html = '<div id="' + sid + '" class="' + cl +'" data-id="' + id + '">';
      html += '<div class="cpb-rows cpb-sectionContent">';
      if( typeof data.sections[id]._rows === 'string' && data.sections[id]._rows.length > 0 && utils.hasConnection( 'rows' ) ){
        ids = self.parse.ids( data.sections[id]._rows, 'array' );
        if( typeof ids === 'object' && ids.length > 0 ){
          for( r = 0; r < ids.length; r++ ){
            re = this.row( ids[r] );
            if( typeof re !== 'object' ){
              continue;
            }
            if( 'html' in re ){
              html += re['html'];
            }
            if( 'css' in re ){
              css += re['css'];
            }
          }
        }
      }
      html += utils.generate.backgroundTags( data.sections[id] );
      html += '</div>';
      html += '</div>';

      o = {
        html: html,
        css: css
      }

      return o;
    };

    func.row = function( id ){
      var o, c, html, css, re, ids, cl, nb;

      id = parseInt( id );

      if(   !utils.hasConnection( 'rows' )
        || !utils.isValidId( id )
        || !( id in data.rows )
        || typeof data.rows[id] !== 'object' ){
        return '';
      }

      cl = 'cpb-row';
      cl += ' cpb-row-' + id;

      css = this.css( id, 'rows' );

      if( catchUiCss ){
        return { css: css };
      }
      nb = 0;
      o = '';
      if( typeof data.rows[id]._columns === 'string' && data.rows[id]._columns.length > 0 && utils.hasConnection( 'columns' ) ){
        ids = self.parse.ids( data.rows[id]._columns, 'array' );
        if( typeof ids === 'object' && ( nb = ids.length ) > 0 ){
          for( c = 0; c < nb; c++ ){
            re = this.column( ids[c] );
            if( typeof re !== 'object' ){
              continue;
            }
            if( 'html' in re ){
              o += re['html'];
            }
            if( 'css' in re ){
              css += re['css'];
            }
          }
        }
      }

      html = '<div class="' + cl + '" data-id="' + id + '">';
      html += '<div class="cpb-rowContent" data-ncol="' + nb + '">';
      html += o;
      html += utils.generate.backgroundTags( data.rows[id] );
      html += '</div>';
      html += '</div>';
      

      return {
        html: html,
        css: css
      };
    };

    func.column = function( id ){
      var o, e, html, css, re, ids, cl;

      id = parseInt( id );

      if( !utils.hasConnection( 'columns' )
        || !utils.isValidId( id )
        || !( id in data.columns )
        || typeof data.columns[id] !== 'object' ){
        return '';
      }

      cl = 'cpb-column';
      cl += ' cpb-column-' + id;

      css = this.css( id, 'columns' );

      if( catchUiCss ){
        return { css: css };
      }

      html = '<div class="' + cl + '" data-id="' + id + '">';
      html += '<div class="cpb-columnContent">';
      if( typeof data.columns[id]._elements === 'string' && data.columns[id]._elements.length > 0 && utils.hasConnection( 'elements' ) ){
        ids = self.parse.ids( data.columns[id]._elements, 'array' );
        if( typeof ids === 'object' && ids.length > 0 ){
          for( e = 0; e < ids.length; e++ ){
            re = this.element( ids[e] );
            if( typeof re !== 'object' ){
              continue;
            }
            if( 'html' in re ){
              html += re.html;
            }
            if( 'css' in re ){
              css += re.css;
            }
          }
        }
      }
      html += utils.generate.backgroundTags( data.columns[id] );
      html += '</div>';
      html += '</div>';

      o = {
        html: html,
        css: css
      }

      return o;
    };

    func.element = function( id ){
      var t, cl, css, html, re, o;

      id = parseInt( id );

      if(   !utils.hasConnection( 'elements' )
        || !utils.isValidId( id )
        || !( id in data.elements )
        || typeof data.elements[id] !== 'object'
        || typeof ( t = data.elements[id]._type ) !== 'string' ){
        return '';
      }

      cl = 'cpb-element';
      cl += ' cpb-element' + u.generate.capitalize( t );
      cl += ' cpb-elementNode' + id;

      html = '<div class="' + cl + '" data-id="' + id + '">';
      re = this.iElement( id );
      if( typeof re === 'object' ){
        if( 'html' in re ){
          html += re.html;
        }
        if( 'css' in re ){
          css = re.css;
        }
      }
      html += '</div>';

      o = {
        html: html,
        css: css
      }
      return o;
    };

    func.iElement = function( id ){
      var t, o, el, ids, a, idsa, html, css;

      id = parseInt( id );

      if( !utils.hasConnection( 'elements' )
        || !utils.isValidId( id )
        || !( id in data.elements )
        || typeof data.elements[id] !== 'object'
        || typeof ( t = data.elements[id]._type ) !== 'string' ){
        return '';
      }
      
      el = cometElements.instance( t, id, u.generate.data( data, id ) );

      if( !el || !( 'html' in el ) ){
        return '';
      }

      html = '<div class="cpb-elementContent">';
      html += el.html();
      html += '</div>';

      css = 'css' in el ? utils.generate.styleTag( id, 'elements', el.css() ) : '';

      o = {
        html: html,
        css: css
      }
      return o;
    };
    return func;
  };

  /* Sanitize */

  u.sanitize = {
    borderStyle: function( bs ){
      switch( bs ){
        case 'solid':
          return 'solid';
        case 'dotted':
          return 'dotted';
        case 'dashed':
          return 'dashed';
        case 'double':
          return 'double';
        case 'inset':
          return 'inset';
        case 'outset':
          return 'outset';
        default:
          return 'none';
      }
    },
    length: function( length ){
      switch( length ){
        case '%':
          return length;
        case 'em':
          return length;
        case 'rem':
          return length;
        case 'ex':
          return length;
        case 'lin':
          return length;
        case 'pt':
          return length;
        case 'mm':
          return length;
        case 'cm':
          return length;
        case 'in':
          return length;
        case 'pc':
          return length;
        case 'q':
          return length;
        default:
          return 'px';
      }
    },
    number: function( num ){
      num = u.eval.number( num );
      if( !num ){
        return 0;
      }
      return num;
    },
    color: function( str ){
      if( u.eval.color( str ) ){
        return str.trim();
      }
      return '';
    },
    image: function( str ){
      if( u.eval.image( str ) ){
        return str.trim();
      }
      return '';
    },
    position: function( pos ){
      pos = typeof pos === 'string' ? pos.trim() : '';
      switch( pos ){
        case 'lt':
          return 'left top';
        case 'lc':
          return 'left center';
        case 'lb':
          return 'left bottom';
        case 'rt':
          return 'right top';
        case 'rc':
          return 'right center';
        case 'rb':
          return 'right bottom';
        case 'ct':
          return 'center top';
        case 'cb':
          return 'center bottom';
        default:
          return 'center center';
      }
    },
    repeat: function( rep ){
      rep = typeof rep === 'string' ? rep.trim() : '';
      switch( rep ){
        case 'no':
          return 'no-repeat';
        case 'x':
          return 'repeat-x';
        case 'y':
          return 'repeat-y';
        case 's':
          return 'space';
        case 'rd':
          return 'round';
        default:
          return 'repeat';
      }
    },
    backgroundSize: function( size ){
      size = typeof size === 'string' ? size.trim() : '';
      switch( size ){
        case 'con':
          return 'contain';
        case 'cov':
          return 'cover';
        default:
          return 'auto';
      }
    },
    attachment: function( att ){
      att = typeof att === 'string' ? att.trim() : '';

      switch( att ){
        case 'fixed':
          return 'fixed';
        default:
          return 'scroll';
      }
    },
    html: function( str ){
      var o, n, b;
      var k = { br:'', strong:'', i:'', span:'', em:'', strike:'', del:'', ins:'', b:'', a:'', u:'' };
      var san = function( node ){
        var a, nnode, i;
        if( node.children.length > 0 ){
          for( a = 0; a < node.children.length; a++ ){
            nnode = node.children[a];
            san( nnode );
            if( !k.hasOwnProperty( nnode.nodeName.toLowerCase() ) ){
              i = nnode.innerHTML;
              nnode.outerHTML = i;
            }
          }
        }
      };

      if( typeof arguments[1] === 'object' ){
        for( b in arguments[1] ){
          k[b] = '';
        }
      }

      n = document.createElement( 'p' );
      n.innerHTML = str;
      san( n );

      return n.innerHTML;
    }
  };

  /* Eval */

  u.eval = {
    number: function( num ){
      num = parseInt( num );
      if( typeof num !== 'number' || isNaN( num ) ){
        return false;
      }
      return num;
    },
    color: function( str ){
      var regex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i;
      if( typeof str !== 'string' ){
        return false;
      }
      str = str.trim();
      if( str.length < 1 ){
        return false;
      }
      if( regex.test( str ) ){
        return true;
      }
      return false;
    },
    image: function( str ){
      var regex = /^(((http|ftp)s?\:\/\/)?(w{3}\.)?\S+\.(jpe?g|svg|png|bmp|gif|ico))$/gi;
      if( typeof str !== 'string' ){
        return false;
      }
      str = str.trim();
      if( str.length < 1 ){
        return false;
      }
      if( str.search( regex ) !== -1 ){
        return true;
      }
      return false;
    },
    video: function( str ){
      var regex = /^(((http|ftp)s?\:\/\/)?(w{3}\.)?\S+\.(mp4|webm|ogg))$/gi;
      if( typeof str !== 'string' ){
        return false;
      }
      str = str.trim();
      if( str.length < 1 ){
        return false;
      }
      if( str.search( regex ) !== -1 ){
        return true;
      }
      return false;
    },
    empty: function( str ){
      if( typeof str === 'string' && str.length > 0 ){
        return false;
      }
      return true;
    }
  };

  u.editor = function( id ){
    var c;

    if( typeof u === 'object' && '_editor' in u ){
      c = parseInt( u._editor );
      id = parseInt( id );

      if( typeof c === 'number' && !isNaN( c ) && typeof id === 'number' && !isNaN( id ) && c === id ){
        return true;
      }
    }
    return false;
  };

  /* Parse */

  u.parse = {
    ids: function( str, type ){
      var ids, a, id, nids, n;
      if( typeof str !== 'string' || !str.length ){
        return false;
      }

      ids = str.split( ',' );

      if( !ids.length ){
        return false;
      }
      nids = type === 'array' ? [] : {};
      n = 0;
      for( a = 0; a < ids.length; a++ ){
        id = parseInt( ids[a] );
        if( typeof id !== 'number' || isNaN( id ) ){
          continue;
        }
        if( type === 'array' ){
          nids.push( id );
          continue;
        }
        nids[id] = id;
        n++;
        nids.length = n;
      }
      if( !nids.length ){
        return false;
      }
      return nids;
    },
    json: function( str ){
      var j;
      try {
        j = JSON.parse( str );
      } catch( e ){
        return false;
      }
      return j;
    },
    vimeo: function( url ){
      var regex = /(https?)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;

      return regex.exec( url )[5];

    },
    youtube: function( url ){
      var ID = '';
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    
      if( url[2] !== undefined ){
        ID = url[2].split(/[^0-9a-z_\-]/i);
        return ID[0];
      } 
      return url;
    }

  };

  /* Esc */

  u.esc = {
    url: function( url ){
      url = typeof url === 'string' ? url.trim() : '';
      if( url.length > 0 ){
        return encodeURI( url );
      }
      return '';
    }

  };

  /* Init */

  u.init = {
    images: function(){
      var loader = 'cpb-imgloader',
          imgs = document.getElementsByClassName( loader ),
          img, i;

      if( !imgs || imgs === null || typeof imgs !== 'object' || imgs.length < 1 ){
        return false;
      }

      function loadImage( ic ){
        return function(){
          ic.setAttribute( 'width', ic.naturalWidth );
          ic.setAttribute( 'height', ic.naturalHeight );
          $( ic ).removeClass( loader );
        };
      }

      for( i = 0; i < imgs.length; i++ ){
        img = imgs[i];
        if( typeof img !== 'object' ){
          continue;
        }
        img.onload = loadImage( img );
      }
    },
    icons: function(){
      var icons = document.getElementsByClassName( 'cpb-iconloader' ),
          sets = cometdata.svgSets, // TODO
          i, icon, ex;

      function loadIcon( ic, id ){
        return function(){
          var syms, sym, s, vb;
            syms = ic.childNodes;
            for( s = 0; s < syms.length; s++ ){
              sym = syms[s];
              if( typeof sym !== 'object' || sym.nodeName.toLowerCase() !== 'symbol' || !( 'id' in sym ) || sym.id !== id ){
                continue;
              }

              vb = sym.getAttribute( 'viewBox' );
              $( ic ).replaceWith( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '">' + sym.innerHTML + '</svg>' );
            }
        };
      }

      if( !icons || icons === null || typeof icons !== 'object' || icons.length < 1 ){
        return false;
      }

      for( i = 0; i < icons.length; i++ ){
        icon = icons[i];
        if( typeof icon !== 'object' || typeof icon.dataset !== 'object' || typeof icon.dataset.cpbicon === 'undefined' ){
          continue;
        }
        ex = u.decode.icon( icon.dataset.cpbicon );
        if( !ex ){
          continue;
        }
        $( icon ).load( sets[ex.set].set + ' #' + ex.id, loadIcon( icon, ex.id ) );
      }
    },
    comet: function( data ){
      var content = document.getElementById( 'cpb-content' ),
          re, div;

      if( typeof data !== 'object' ){
        return false;
      }
      re = u.layout( data ).init();
    
      if( typeof re === 'object' ){
        if( 'html' in re ){
          content.innerHTML = re.html;
        }
        if( 'css' in re ){
          div = document.createElement( 'div' );
          document.head.appendChild( div );
          div.outerHTML = re.css;
          //$( 'head' ).append( re.css );
        }
      }
      u.init.images();
      u.init.icons();
      cometNopriv.init();
      return true;
    }
  };

  /* load */

  u.load = function( data ){
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
  };

  window.cometUtils = u;

  if( !content
    || typeof content !== 'object'
    || !$( content ).hasClass( 'cpb-frontendMode' )
    || typeof cometdata !== 'object'
    || typeof cometdata.post !== 'object'
    || typeof cometdata.post.meta !== 'object' ){
    return;
  }
  u.init.comet( cometdata.post.meta );

})( jQuery, window);
