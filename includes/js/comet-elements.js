/* Comet - Copyright (c) 2018 Blacklead   */

(function( $, global ) {
  'use strict';
  var elements = {},
      manager = {};
    
  manager.add = function( name, callback ){

    if( name in elements && typeof elements[name] === 'function' ){
      return true;
    }

    if( typeof callback !== 'function' ){
      return false;
    }

    elements[name] = callback;
    return true;
  };
  
  manager.instance = function( name, id, data ){
    
    if( !( name in elements ) && typeof elements[name] !== 'function' ){
      return false;
    }

    return elements[name]( id, data );
  };

  function initDefault(){
    
    /* Text */
    manager.add(
      'text',
      function( id, data ){
        var el = {};

        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }

        var r = {
          html: function(){
            var o, tag, content, cdiv;
            tag = 'tag' in el ? el.tag : 'p';
            content = 'content' in el && !cometUtils.eval.empty( el.content ) ? el.content : 'Write something here...'; // Translation
            cdiv = 'cpb-textW';
            cdiv += ' ' + cometUtils.generate.classe.alignment( ( 'alg' in el ? el.alg : 'l' ) );
            o = '<div class="' + cdiv + '">';
            o += cometUtils.generate.content( content, 'content', id, tag );
            o += '</div>';
            return o;
          },
          css: function(){
            var o, fs, fw, fo, lh, ls, bg, tc, bc, tsc, tsb, tsh, tsv, br, pd, rd, mr, rcss;
            o = '.cpb-elementNode' + id + ' .cpb-textW * {';
            if( 'fs' in el && typeof ( fs = parseInt( el.fs ) ) === 'number' && !isNaN( fs ) ){
              o += cometUtils.generate.css( 'font-size', fs + 'px' );
            }
            if( 'lh' in el && typeof ( lh = parseFloat( el.lh ) ) === 'number' && !isNaN( lh ) ){
              o += cometUtils.generate.css( 'line-height', lh );
            }
            if( 'ls' in el && typeof ( ls = parseInt( el.ls ) ) === 'number' && !isNaN( ls ) ){
              o += cometUtils.generate.css( 'letter-spacing', ls + 'px' );
            }
            if( 'tc' in el && ( tc = cometUtils.sanitize.color( el.tc ) ) !== '' ){
              o += cometUtils.generate.css( 'color', tc );
            }
            if( 'fw' in el && typeof ( fw = parseInt( el.fw ) ) === 'number' && fw > 99 && fw < 901 ){
              o += cometUtils.generate.css( 'font-weight', fw );
            }
            if( 'fo' in el && el.fo !== '' && el.fo !== '0' ){
              o += cometUtils.generate.css( 'font-family', el.fo );
            }
            if( 'tsc' in el
              && ( tsc = cometUtils.sanitize.color( el.tsc ) ) !== ''
              && 'tsb' in el
              && typeof ( tsb = parseInt( el.tsb ) ) === 'number'
              && !isNaN( tsb )
              && 'tsh' in el
              && typeof ( tsh = parseInt( el.tsh ) ) === 'number'
              && !isNaN( tsh )
              && 'tsv' in el
              && typeof ( tsv = parseInt( el.tsv ) ) === 'number'
              && !isNaN( tsv ) ){
                o += cometUtils.generate.css( 'text-shadow', tsh + 'px ' + tsv + 'px ' + tsb + 'px ' + tsc );
            }
            o += '}';
    
            bg = 'bg' in el ? cometUtils.sanitize.color( el.bg ) : '';
            bc = 'bc' in el ? cometUtils.sanitize.color( el.bc ) : '';
            br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
            pd = cometUtils.generate.mu( ( 'pdt' in el ? el.pdt : 0 ), ( 'pdr' in el ? el.pdr : 0 ), ( 'pdb' in el ? el.pdb : 0 ), ( 'pdl' in el ? el.pdl : 0 ), 'px', 'px' );
            rd = cometUtils.generate.mu( ( 'rdt' in el ? el.rdt : 0 ), ( 'rdr' in el ? el.rdr : 0 ), ( 'rdb' in el ? el.rdb : 0 ), ( 'rdl' in el ? el.rdl : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );

            o += '.cpb-elementNode' + id + ' .cpb-textW{';
            if( bg !== '' ){
              o += cometUtils.generate.css( 'background', bg );
            }
            if( bc !== '' && br !== 0 ){
              o += cometUtils.generate.css( 'border-width', br );
              o += cometUtils.generate.css( 'border-style', 'solid' );
              o += cometUtils.generate.css( 'border-color', bc );
            }
            if( pd !== 0 ){
              o += cometUtils.generate.css( 'padding', pd );
            }
            if( rd !== 0 ){
              o += cometUtils.generate.css( 'border-radius', rd );
            }
            if( mr !== 0 ){
              o += cometUtils.generate.css( 'margin', mr );
            }
            o += '}';

            pd = cometUtils.generate.mu( ( 'pdtt' in el ? el.pdtt : 0 ), ( 'pdrt' in el ? el.pdrt : 0 ), ( 'pdbt' in el ? el.pdbt : 0 ), ( 'pdlt' in el ? el.pdlt : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-textW{';
            o += cometUtils.generate.css( 'margin', mr );
            o += cometUtils.generate.css( 'padding', pd );
            o += '}';

            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-textW{';
            rcss += cometUtils.generate.css( 'margin', mr );
            rcss += cometUtils.generate.css( 'padding', pd );
            rcss += '}';
            o += cometUtils.generate.responsive( 't', rcss );

            pd = cometUtils.generate.mu( ( 'pdtm' in el ? el.pdtm : 0 ), ( 'pdrm' in el ? el.pdrm : 0 ), ( 'pdbm' in el ? el.pdbm : 0 ), ( 'pdlm' in el ? el.pdlm : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );


            o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-textW{';
            o += cometUtils.generate.css( 'margin', mr );
            o += cometUtils.generate.css( 'padding', pd );
            o += '}';

            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-textW{';
            rcss += cometUtils.generate.css( 'margin', mr );
            rcss += cometUtils.generate.css( 'padding', pd );
            rcss += '}';
            o += cometUtils.generate.responsive( 'm', rcss );
            return o;
          }
        };
        return r;
      }
    );

    /* Button */
    manager.add(
      'button',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var text = 'text' in el && !cometUtils.eval.empty( el.text ) ? el.text : '',
                icon = typeof el.icon === 'string' && el.icon.length > 0 ? '<span class="cpb-buttonIcon">' + cometUtils.generate.icon( el.icon ) + '</span>' : '',
                o, cdiv, ca, dir, tar;

            if( text == '' && icon == '' ){
              return cometUtils.generate.placeholder( 'button' );
            }
        
            cdiv = 'cpb-buttonW';
            cdiv += ' ' + cometUtils.generate.classe.alignment( ( 'alg' in el && ( el.alg === 'l' || el.alg === 'r' || el.alg === 'j' ) ? el.alg : 'c' ) );
        
            o = '<div class="' + cdiv + '">';
            ca = 'cpb-theButton';
            if( 'ani' in el && el.ani !== 'none' ){
        
              if( el.ani === 'pulse' || el.ani === 'tada' ){
                  ca += ' cpb-animated cpb-efInfinite';
              }
        
              switch( el.ani ){
                case 'stt':
                case 'stl':
                case 'stb':
                case 'str':
                  ca += ' cpb-hvrbt cpb-hvrbt-' + el.ani;
                  break;
                default:
                  ca += ' cpb-ef-' + el.ani;
                  break;
              }
            }
        
            tar = 'tar' in el && el.tar === 'true' ? 'target="_blank"' : '';
            dir = 'ipos' in el && el.ipos === 'r' ? el.ipos : 'l';
        
            o += '<a class="' + ca + '" href="' + cometUtils.esc.url( ( 'link' in el && !cometUtils.eval.empty( el.link ) ? el.link : '#' ) ) + '" ' + tar + '>';
            if( dir === 'l' ){
              o += icon;
            }

            o += '<span class="cpb-buttonText">' + text + '</span>';
            
            if( dir === 'r' ){
              o += icon;
            }
            o += '</a>';
            o += '</div>';
        
            return o;
          },
          css: function(){
            var o = '',
                sty, bg, abg, tc, atc, bc, abc, bs,
                br, rd, mr, ang, fs, hsp, vsp, isp, rcss,
                sin, ssp, sy, sx, sbl, shc, is;
        
            sty = 'sty' in el && el.sty === 'g' ? 'g' : 'f';
        
            if( sty === 'g' ){
              ang = 'ang' in el ? parseInt( el.ang ) : 0;
              ang = typeof ang !== 'number' || isNaN( ang ) ? 0 : ang;
              if( ang < 0 ){
                ang = 0;
              }else if( ang > 360 ){
                ang = 360;
              }
              bg = 'gbg' in el ? cometUtils.generate.gradient( 'linear', ang , el.gbg ) : 'none';
              abg = 'ghbg' in el ? cometUtils.generate.gradient( 'linear', ang , el.ghbg ) : 'none';
            }else{
              bg = 'bg' in el && ( bg = cometUtils.sanitize.color( el.bg ) ) != '' ? bg : 'none';
              abg = 'hbg' in el && ( abg = cometUtils.sanitize.color( el.hbg ) ) != '' ? abg : 'none';
            }
        
            tc = 'tc' in el ? cometUtils.sanitize.color( el.tc ) : '';
            atc = 'htc' in el ? cometUtils.sanitize.color( el.htc ) : '';
        
            fs = 'fs' in el ? parseInt( el.fs ) : 20;
            fs = typeof fs !== 'number' || isNaN( fs ) ? 20 : fs;
            if( fs < 10 ){
              fs = 10;
            }else if( fs > 70 ){
              fs = 70;
            }
            is = 'is' in el ? parseInt( el.is ) : 20;
            is = typeof is !== 'number' || isNaN( is ) ? 20 : is;
            if( is < 10 ){
              is = 10;
            }else if( fs > 70 ){
              is = 70;
            }
            vsp = 'vsp' in el ? parseInt( el.vsp ) : 0;
            vsp = typeof vsp !== 'number' || isNaN( vsp ) ? 0 : vsp;
            if( vsp < 0 ){
              vsp = 0;
            }else if( vsp > 70 ){
              vsp = 70;
            }
            hsp = 'hsp' in el ? parseInt( el.hsp ) : 0;
            hsp = typeof hsp !== 'number' || isNaN( hsp ) ? 0 : hsp;
            if( hsp < 0 ){
              hsp = 0;
            }else if( hsp > 100 ){
              hsp = 100;
            }
        
            bc = 'bc' in el ? cometUtils.sanitize.color( el.bc ) : '';
            abc = 'hbc' in el ? cometUtils.sanitize.color( el.hbc ) : '';
            br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
            rd = cometUtils.generate.mu( ( 'rdt' in el ? el.rdt : 0 ), ( 'rdr' in el ? el.rdr : 0 ), ( 'rdb' in el ? el.rdb : 0 ), ( 'rdl' in el ? el.rdl : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
  
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-buttonW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
        
            o += '.cpb-elementNode' + id + ' .cpb-theButton{';
            o += cometUtils.generate.css( 'padding', cometUtils.generate.mu( vsp, hsp, vsp, hsp, 'px', 'px' ) );
            if( bg !== '' ){
              o += cometUtils.generate.css( 'background', bg );
            }
            if( tc !== '' ){
              o += cometUtils.generate.css( 'color', tc );
            }
            if( br !== 0 && bc !== '' ){
              bs = 'bs' in el ? cometUtils.sanitize.borderStyle( el.bs ) : 'solid';
              o += cometUtils.generate.css( 'border-width', br );
              o += cometUtils.generate.css( 'border-style', bs );
              o += cometUtils.generate.css( 'border-color', bc );
            }
            if( rd !== 0 ){
              o += cometUtils.generate.css( 'border-radius', rd );
            }

            if( 'sha' in el && el.sha === 'c' ){
              shc = 'shc' in el ? cometUtils.sanitize.color( el.shc ) : '';
              sbl = 'sbl' in el ? parseInt( el.sbl ) : 0;
              ssp = 'ssp' in el ? parseInt( el.ssp ) : 0;
              sx = 'sx' in el ? parseInt( el.sx ) : 0;
              sy = 'sy' in el ? parseInt( el.sy ) : 0;
              sin = 'sin' in el && el.sin === 'true' ? ' inset ' : ' ';


              sbl = sbl > 0 ? sbl + 'px ' : 0;
              ssp = ssp > 0 ? ssp + 'px' : 0;
              sx = sx > 0 ? sx + 'px ' : 0;
              sy = sy > 0 ? sy + 'px ' : 0;

              if( shc !== '' && ( sx !== 0 || sy !== 0 || sbl !== 0 || ssp !== 0 ) ){
                o += cometUtils.generate.css( 'box-shadow', sx + sy + sbl + ssp + sin + shc );
                o += cometUtils.generate.css( '-moz-box-shadow', sx + sy + sbl + ssp + sin + shc );
                o += cometUtils.generate.css( '-webkit-box-shadow', sx + sy + sbl + ssp + sin + shc );
              }

            }
            o += '}';

            o += '.cpb-elementNode' + id + ' .cpb-buttonIcon{';
            o += cometUtils.generate.css( 'width', is + 'px' );
            o += '}';
        
            o += '.cpb-elementNode' + id + ' .cpb-theButton > span {';
            o += cometUtils.generate.css( 'font-size', fs + 'px' );
            if( tc !== '' ){
              o += cometUtils.generate.css( 'color', tc );
            }
            o += '}';
        
            /* Hover */
            if( ( br !== 0 && abc !== '' ) || abg !== '' || atc !== '' ){
              o += '.cpb-elementNode' + id + ' .cpb-theButton:hover,.cpb-elementNode' + id + ' .cpb-theButton:active{';
              if( abg !== '' ){
                o += cometUtils.generate.css( 'background', abg );
              }
              if( atc !== '' ){
                o += cometUtils.generate.css( 'color', atc );
              }
              if( br !== 0 && abc !== '' ){
                o += cometUtils.generate.css( 'border-color', abc );
              }
              o += '}';
            }
        
            if( atc !== '' ){
              o += '.cpb-elementNode' + id + ' .cpb-theButton:hover > span,.cpb-elementNode' + id + ' .cpb-theButton:active > span {';
              o += cometUtils.generate.css( 'color', atc );
              o += '}';
            }
        
        
            isp = 'isp' in el ? parseInt( el.isp ) : 0;
            isp = typeof isp !== 'number' || isNaN( isp ) ? 0 : isp;
            if( isp < 0 ){
              isp = 0;
            }else if( isp > 100 ){
              isp = 100;
            }
        
            if( isp > 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-theButton .cpb-buttonIcon{';
              if( 'ipos' in el && el.ipos === 'r' ){
                o += cometUtils.generate.css( 'margin-left', isp + 'px' );
              }else{
                o += cometUtils.generate.css( 'margin-right', isp + 'px' );
              }
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-buttonW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-buttonW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-buttonW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-buttonW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }

            return o;
          }
        }
        return r;
        
      } 
    );

    /* Image */
    manager.add(
      'image',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var image = 'img' in el ? cometUtils.sanitize.image( el.img ) : '',
                o, s, cdiv;

            if( image == '' ){
              return cometUtils.generate.placeholder( 'image' );
            }
        
            cdiv = 'cpb-imageW';
            cdiv += ' ' + cometUtils.generate.classe.alignment( ( 'alg' in el && ( el.alg === 'l' || el.alg === 'r' ) ? el.alg : 'c' ) );
            image = cometUtils.generate.image( image, '', ( 'alt' in el && !cometUtils.eval.empty( el.alt ) ? el.alt : 'Undefined image' ) );
        
            o = '<div class="' + cdiv + '">';
            o += '<div class="cpb-imageWi">';
            if( 'link' in el && !cometUtils.eval.empty( el.link ) ){
              o += '<a href="' + cometUtils.esc.url( el.link ) + '"' + ( 'tar' in el && el.tar === 'true' ? ' target="_blank"' : '' ) + '>';
              o += image;
              o += '</a>';
            }else{
              o += image;
            }
            o += '</div>';
            if( 'cap' in el && !cometUtils.eval.empty( el.cap ) ){
              o += '<span class="cpb-imageCaption">' + el.cap + '</span>';
            }
            o += '</div>';
        
            return o;
          },
          css: function(){
            var o, br, rd, bc, tc, tsi, rcss, mr;
            
            o = '.cpb-elementNode' + id + ' .cpb-elementContent{';
            o += cometUtils.generate.css( 'margin', cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' ) );
            o += cometUtils.generate.css( 'padding', cometUtils.generate.mu( ( 'pdt' in el ? el.pdt : 0 ), ( 'pdr' in el ? el.pdr : 0 ), ( 'pdb' in el ? el.pdb : 0 ), ( 'pdl' in el ? el.pdl : 0 ), 'px', 'px' ) );
            o += '}';
        
            tsi = 12;
            if( 'tsi' in el && !cometUtils.eval.empty( el.tsi ) ){
              tsi = parseInt( el.tsi );
              if( typeof tsi !== 'number' || isNaN( tsi ) ){
                tsi = 12;
              }
            }
            if( tsi < 11 ){
              tsi = 11;
            }
            if( tsi > 50 ){
              tsi = 50;
            }
            tc = 'tc' in el ? cometUtils.sanitize.color( el.tc ) : '';
        
            if( tc !== '' || tsi !== 12 ){
              o += '.cpb-elementNode' + id + ' .cpb-imageCaption{';
              if( tc !== '' ){
                o += cometUtils.generate.css( 'color', tc );
              }
              if( tsi !== 12 ){
                o += cometUtils.generate.css( 'font-size', tsi + 'px' );
              }
              o += '}';
            }
            bc = 'bc' in el ? cometUtils.sanitize.color( el.bc ) : '';
            br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
            rd = cometUtils.generate.mu( ( 'rdt' in el ? el.rdt : 0 ), ( 'rdr' in el ? el.rdr : 0 ), ( 'rdb' in el ? el.rdb : 0 ), ( 'rdl' in el ? el.rdl : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-imageW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }

            if( ( br !== 0 && bc !== '' ) || rd !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-imageW img{';
              if( br !== 0 && bc !== '' ){
                o += cometUtils.generate.css( 'border-width', br );
                o += cometUtils.generate.css( 'border-style', 'solid' );
                o += cometUtils.generate.css( 'border-color', bc );
              }
              if( rd !== 0 ){
                o += cometUtils.generate.css( 'border-radius', rd );
              }
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-imageW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-imageW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-imageW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-imageW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
        
            return o;
          }
        };
        return r;
      } 
    );

    /* List */
    manager.add(
      'list',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var ids, o, cul, cil, item, items, i, content, iid, d;
        
            if( !( 'items' in data ) || typeof ( items = data.items ) !== 'object' || !( '_items' in el ) ){
              return cometUtils.generate.placeholder( 'text' );
            }
        
            cul = 'cpb-listW';
            cul += ' cpb-list' + ( 'sty' in el && !cometUtils.eval.empty( el.sty ) ? el.sty.trim() : 'none' );

            o = '<ul class="' + cul + '">';

            ids = cometUtils.parse.ids( el._items, 'array' );
            if( typeof ids === 'object' && 'length' in ids && ids.length > 0 ){
              for( i = 0; i < ids.length; i++ ){
                iid = parseInt( ids[i] );
                if( typeof iid !== 'number' || isNaN( iid ) || !( iid in items ) ){
                  continue;
                }
                item = items[iid];
                content = 'ctnt' in item && !cometUtils.eval.empty( item.ctnt ) ? item.ctnt.trim() : 'Write something here...';
                cil = 'cpb-elementItem cpb-listItem';
                cil += ' cpb-elementItem' + iid;
                cil += ' ' + cometUtils.generate.classe.alignment( ( 'alg' in item && ( item.alg === 'b' || item.alg === 'm' ) ? item.alg : 't' ) );
                o += cometUtils.generate.content( content, 'ctnt', iid, 'li', cil );
              }
            }
            o += '</ul>';
        
            return o;
          },
          css: function(){
            var o = '',
                item, items, i, ids, iid, spa, ti, sty, fs, tc, mr, rcss;
                
            sty = 'sty' in el && !cometUtils.eval.empty( el.sty ) ? el.sty.trim() : 'none';
            tc = 'tc' in el ? cometUtils.sanitize.color( el.tc ) : '';
        
            spa = 0;
            if( 'spa' in el ){
              spa = parseInt( el.spa );
              if( typeof spa !== 'number' || isNaN( spa ) ){
                spa = 0;
              }
            }
            if( spa < 0 ){
              spa = 0;
            }
            if( spa > 200 ){
              spa = 200;
            }
        
            ti = 0;
            if( 'ti' in el ){
              ti = parseInt( el.ti );
              if( typeof ti !== 'number' || isNaN( ti ) ){
                ti = 0;
              }
            }
            if( ti < 0 ){
              ti = 0;
            }
            if( ti > 200 ){
              ti = 200;
            }
        
            fs = 15;
            if( 'fs' in el ){
              fs = parseInt( el.fs );
              if( typeof fs !== 'number' || isNaN( fs ) ){
                fs = 15;
              }
            }
            if( fs < 10 ){
              fs = 10;
            }
            if( fs > 100 ){
              fs = 100;
            }
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-listW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            o += '.cpb-elementNode' + id + ' .cpb-listW .cpb-listItem{';
            o += cometUtils.generate.css( 'font-size', fs + 'px' );
            if( tc !== '' ){
              o += cometUtils.generate.css( 'color', tc );
            }
            if( spa > 0 || ti > 0 ){
              o += cometUtils.generate.css( 'padding', cometUtils.generate.mu( spa, 0, spa, ti, 'px', 'px' ) );
            }
            o += '}';
        
            if( 'items' in data && typeof ( items = data.items ) === 'object' && '_items' in el ){
              ids = cometUtils.parse.ids( el._items, 'array' );
              if( typeof ids === 'object' && 'length' in ids && ids.length > 0 ){
                for( i = 0; i < ids.length; i++ ){
                  iid = parseInt( ids[i] );
                  if( typeof iid !== 'number' || isNaN( iid ) || !( iid in items ) ){
                    continue;
                  }
                  item = items[iid];
                  if( sty === 'img' && 'ico' in item && cometUtils.eval.image( item.ico ) ){
                    o += '.cpb-elementNode' + id + ' .cpb-listW .cpb-elementItem' + iid +'{';
                    o += cometUtils.generate.css( 'background-image', 'url(' + cometUtils.esc.url( item.ico ) + ')' );
                    o += '}';
                  }
                }
              }
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-listW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-listW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-listW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-listW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Icon */
    manager.add(
      'icon',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var icon = 'icon' in el ? cometUtils.generate.icon( el.icon ) : '',
                tag = 'div', o, dt, cdiv;

            if( icon == '' ){
              return cometUtils.generate.placeholder();
            }
        
            dt = ' class="cpb-iconWi"';
            
            if( 'url' in el && !cometUtils.eval.empty( el.url ) ){
              tag = 'a';
              dt += ' href="' + el.url.trim() + '"';
              if( 'tar' in el && el.tar === 'true' ){
                dt += ' target="_blank"';
              }
            }
        
            cdiv = 'cpb-iconW';
            cdiv += ' ' + cometUtils.generate.classe.alignment( 'alg' in el &&  ( el.alg === 'l' || el.alg === 'r' ) ? el.alg : 'c');
        
            o = '<div class="' + cdiv + '">';
            o += '<' + tag + dt + '>' + icon + '</' + tag + '>';
            o += '</div>';
        
            return o;
          },
          css: function(){
            var o = '', bgc, ic, rd, pd, mr, isi, bs, br, bc, bg, rcss;
        
            bg = 'bgc' in el ? cometUtils.sanitize.color( el.bgc ) : '';
            bc = 'bc' in el ? cometUtils.sanitize.color( el.bc ) : '';
            ic = 'ic' in el ? cometUtils.sanitize.color( el.ic ) : '';
        
            isi = 'isi' in el ? parseInt( el.isi ) : 0;
            isi = typeof isi !== 'number' || isNaN( isi ) ? 0 : isi;
            if( isi < 20 ){
              isi = 20;
            }else if( isi > 200 ){
              isi = 200;
            }
        
            pd = 'pd' in el ? parseInt( el.pd ) : 0;
            pd = typeof pd !== 'number' || isNaN( pd ) ? 0 : pd;
            if( pd < 0 ){
              pd = 0;
            }else if( pd > 100 ){
              pd = 100;
            }
        
            br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
            rd = cometUtils.generate.mu( ( 'rdt' in el ? el.rdt : 0 ), ( 'rdr' in el ? el.rdr : 0 ), ( 'rdb' in el ? el.rdb : 0 ), ( 'rdl' in el ? el.rdl : 0 ), 'px', 'px' );
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            bs = 'bs' in el ? cometUtils.sanitize.borderStyle( el.bs ) : 'solid';
        
            o = '.cpb-elementNode' + id + ' .cpb-iconW .cpb-iconWi{';
            //o += cometUtils.generate.css( 'width', isi + 'px' );
            if( bg !== '' ){
              o += cometUtils.generate.css( 'background', bg );
            }
            if( ic !== '' ){
              o += cometUtils.generate.css( 'color', ic );
            }
            if( bc !== '' && br !== 0 ){
              o += cometUtils.generate.css( 'border-color', bc );
              o += cometUtils.generate.css( 'border-width', br );
              o += cometUtils.generate.css( 'border-style', bs );
            }
            if( rd !== 0 ){
              o += cometUtils.generate.css( 'border-radius', rd );
            }
            if( pd !== 0 ){
              o += cometUtils.generate.css( 'padding', pd + 'px' );
            }
            o += '}';
        
            o += '.cpb-elementNode' + id + ' .cpb-iconW .cpb-iconWi svg{';
            o += cometUtils.generate.css( 'width', isi + 'px' );
            o += '}';
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-iconW {';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-iconW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-iconW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-iconW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-iconW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Gallery */
    manager.add(
      'gallery',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var o, img, items, item, ids, i, iid, d, cdiv, cn, st;
            
        
            if( !( 'items' in data ) || typeof ( items = data.items ) !== 'object' || !( '_items' in el ) ){
              return cometUtils.generate.placeholder();
            }
            cn = typeof ( cn = parseInt( el.col ) ) === 'number' && !isNaN( cn ) && cn > 0 && cn < 6 ? cn : 3;
            st = 'cp' in el && ( el.cp === 'h' || el.cp === 'b' || el.cp === 'u' ) ? el.cp : 'c';
        
            cdiv = 'cpb-lbGallery';
            cdiv += ' cpb-colSize' + cn;
            cdiv += ' cpb-lbGalleryDescap' + st;
        
            o = '<div class="' + cdiv + '">';
            ids = cometUtils.parse.ids( el._items, 'array' );
            if( typeof ids === 'object' && 'length' in ids && ids.length > 0 ){
              for( i = 0; i < ids.length; i++ ){
                iid = parseInt( ids[i] );
                if( typeof iid !== 'number'
                  || isNaN( iid )
                  || typeof ( item = items[iid] ) !== 'object'
                  || !( 'img' in item )
                  || typeof ( img = cometUtils.sanitize.image( item.img ) ) === '' ){
                  continue;
                }
        
                d = 'data-media="image"';
                if( typeof item.ath === 'string' && !cometUtils.eval.empty( item.ath ) ){
                  d += ' data-author="' + item.ath + '"';
                }
        
                o += '<div class="cpb-lbColumn">';
                o += '<a class="cpb-lbGalleryItem" href="' + img + '" ' + d + '>';
                o += '<figure class="cpb-lbGalleryWimg">';
                o += cometUtils.generate.image( img, 'cpb-lbGalleryImg', ( 'alt' in item && !cometUtils.eval.empty( item.alt ) ? item.alt : 'Undefined image' ) );
                o += '</figure>';
                if( typeof item.cap === 'string' && !cometUtils.eval.empty( item.cap ) ){
                  o += '<aside class="cpb-itemCaption"><span>' + item.cap + '</span></aside>';
                }
                o += '</a>';
                o += '</div>';
              }
            }
            o += '</div>';
        
            return o;
          },
          css: function(){
            var o, h, pd, rd, br, bs, bc, mr, tc, cps, rcss;
        
            h = typeof ( h = parseInt( el.hei ) ) === 'number' && !isNaN( h ) && h > 199 && h < 600 ? h : 200;
            pd = 'pd' in el && typeof ( pd = parseInt( el.pd ) ) === 'number' && !isNaN( pd ) && pd < 201 ? pd : 200;
            rd = cometUtils.generate.mu( ( 'rdt' in el ? el.rdt : 0 ), ( 'rdr' in el ? el.rdr : 0 ), ( 'rdb' in el ? el.rdb : 0 ), ( 'rdl' in el ? el.rdl : 0 ), 'px', 'px' );
            br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
            bs = 'bs' in el ? cometUtils.sanitize.borderStyle( el.bs ) : 'solid';
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            o = '.cpb-elementNode' + id + ' .cpb-lbGallery .cpb-lbGalleryImg{';
        
            if( 'she' in el && el.she !== 'd' ){
              o += cometUtils.generate.css( 'height', h + 'px ' );
            }
            if( rd !== 0 ){
              o += cometUtils.generate.css( 'border-radius', rd );
            }
            o += '}';


            o += '.cpb-elementNode' + id + ' .cpb-lbGallery .cpb-lbGalleryWimg{';
            if( rd !== 0 ){
              o += cometUtils.generate.css( 'border-radius', rd );
            }
            if( 'bc' in el && ( bc = cometUtils.sanitize.color( el.bc ) ) && bc !== '' && br !== 0 ){
              o += cometUtils.generate.css( 'border-color', bc );
              o += cometUtils.generate.css( 'border-width', br );
              o += cometUtils.generate.css( 'border-style', bs );
            }
            o += '}';

            if( pd > 0 ){
              o += '.cpb-elementGallery.cpb-elementNode' + id + ' .cpb-lbGalleryItem{';
              o += cometUtils.generate.css( 'margin', pd + '%' );
              o += '}';
            }
            
            o += '.cpb-elementNode' + id + ' .cpb-lbGalleryItem .cpb-itemCaption{';
            if( 'tc' in el && ( tc = cometUtils.sanitize.color( el.tc ) ) && tc !== '' && 'cp' in el &&  el.cp === 'u' ){
              o += cometUtils.generate.css( 'color', tc );
            }
            if( 'cps' in el && typeof ( cps = parseInt( el.cps ) ) === 'number' && !isNaN( cps ) && cps >= 10 && cps <= 50 ){
              o += cometUtils.generate.css( 'font-size', cps + 'px' );
            }
            o += '}';
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-lbGallery {';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-lbGallery{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-lbGallery{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-lbGallery{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-lbGallery{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Google map */
    manager.add(
      'map',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var o = '',
                key = cometdata.apikey,
                src, size, zoom, mt;
        
            src = 'https://www.google.com/maps/embed/v1/place?key=' + key;
            src += '&q=' + ( 'q' in el && !cometUtils.eval.empty( el.q ) ? el.q : 'Eiffel Tower, Paris France' );
            if(  'zoom' in el ){
              zoom = parseInt( el.zoom );
              if( typeof zoom === 'number' && !isNaN( zoom ) ){
                if( zoom < 0 ){
                  zoom = 0;
                }
                if( zoom > 21 ){
                  zoom = 21;
                }
                src += '&zoom=' + zoom;
              }
            }
        
            if( 'mt' in el ){
              mt = el.mt.trim() === 'satellite' ? 'satellite' : 'roadmap';
              src += '&maptype=' + mt ;
            }
        
            size = 200;
            if( 'size' in el ){
              size = parseInt( el.size );
              if( typeof size !== 'number' || isNaN( size ) ){
                size = 200;
              }
              if( size < 200 ){
                size = 200;
              }
              if( size > 2000 ){
                size = 2000;
              }
            }
            o = '<iframe class="cpb-mapW" width="600" scrolling="no" height="' + size + '" frameborder="0" src="' + cometUtils.esc.url( src ) + '" allowfullscreen></iframe>';
        
            return o;
          },
          css: function(){
            var o = '', mr, rcss;
            
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-mapW {';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-mapW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-mapW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-mapW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-mapW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Shortcode */
    manager.add(
      'shortcode',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var o;
            o = '<div class="cpb-shortcodeW">';
            o += cometUtils.generate.element({
              id: id,
              functionName: 'comet_shortcode',
              data: data,
            });
            o += '</div>';
            return o;
          },
          css: function(){
            var o = '', mr, rcss;
            
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-shortcodeW {';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-shortcodeW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-shortcodeW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-shortcodeW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-shortcodeW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Audio */
    manager.add(
      'audio',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var o, d, url;
        
            url = 'url' in el && !cometUtils.eval.empty( el.url ) ? el.url.trim() : '';
        
            d = 'controls preload="metadata"';
            d += 'aut' in el && el.aut === 'true' ? ' autoplay="true"' : '';
            d += 'loop' in el && el.loop === 'true' ? ' loop="true"' : '';
        
            o = '<audio class="cpb-audioW" src="' + cometUtils.esc.url( url ) + '" ' + d + '>';
            o += 'Your browser does not support the audio';
            o += '</audio>';
        
            return o;
          },
          css: function(){
            var o = '', mr, rcss;
            
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-audioW {';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-audioW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-audioW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-audioW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-audioW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            return o;
          }
        };
        return r;
      } 
    );

    /* Video */
    manager.add(
      'video',
      function( id, data ){
        var el = {};
        
        if( 'el' in data && typeof data.el === 'object' ){
          el = data.el;
        }
        
        var r = {
          html: function(){
            var ov, o, t, aut, inf, pos, h, m, w, d, url;
        
            t = 'type' in el && ( el.type === 'c' || el.type === 'v' ) ? el.type : 'y';
            ov = 'ov' in el && el.ov === 'p' && ( pos = cometUtils.sanitize.image( el.pos ) ) !== '' ? true : false;
            aut = 'aut' in el && el.aut == 'true' ? true : false;
            inf = 'inf' in el && el.inf == 'true' ? true : false;
        
            w = 'wid' in el ? parseInt( el.wid ) : 200;
            h = 'hei' in el ? parseInt( el.hei ) : 200;
        
            w = typeof w !== 'number' || isNaN( w ) || w < 200 ? 200 : w;
            h = typeof h !== 'number' || isNaN( h ) || h < 200 ? 200 : h;
        
            url = 'url' in el && !cometUtils.eval.empty( el.url ) ? el.url.trim() : ''; //TODO
        
            switch( t ){
              case 'c':
                m = 'video';
                d = 'preload="metadata"';
                d += aut ? ' autoplay' : '';
                o = '<video class="cpb-videoW" src="' + cometUtils.esc.url( url ) + '" height="' + h + '" width="' + w + '" ' + d + '>';
                o += 'Your browser does not support the video.'; // Translation
                o += '</video>';
                break;
              case 'v':
                m = 'iframe';
                url = 'https://player.vimeo.com/video/' + cometUtils.parse.vimeo( url );
                url += ov || aut ? '?autoplay=1' : '?autoplay=0';
                url += !inf ? '&title=0&portrait=0&byline=0' : '';
                o = '<iframe class="cpb-videoW" src="' + cometUtils.esc.url( url ) + '" width="' + w + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                break;
              default:
                m = 'iframe';
                url = 'https://www.youtube.com/embed/' + cometUtils.parse.youtube( url );
                url += '?rel=0';
                url += ov || aut ? '&autoplay=1' : '';
                url += !inf ? '&showinfo=0' : '';
                o = '<iframe class="cpb-videoW" width="' + w + '" height="' + h + '" src="' + cometUtils.esc.url( url ) + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                break;
            }
        
            if( ov ){
              o = '<div class="cpb-videoPlayer">';
              o += '<a class="cpb-videoPoster" href="' + cometUtils.esc.url( url ) + '" data-size="' + w + 'x' + h + '" data-media="' + m + '">';
              o += cometUtils.generate.image( pos, '', 'Video poster' );
              o += '<div class="cpb-videoPlayButton"><span></span></div>';
              o += '</a>';
              o += '</div>';
            }
        
            return o;
          },
          css: function(){
            var o = '', mr, br, bw, ic, bc, bgc, rcss;
            
            mr = cometUtils.generate.mu( ( 'mrt' in el ? el.mrt : 0 ), ( 'mrr' in el ? el.mrr : 0 ), ( 'mrb' in el ? el.mrb : 0 ), ( 'mrl' in el ? el.mrl : 0 ), 'px', 'px' );
        
            if( 'ov' in el && el.ov === 'p' ){
              br = cometUtils.generate.mu( ( 'brt' in el ? el.brt : 0 ), ( 'brr' in el ? el.brr : 0 ), ( 'brb' in el ? el.brb : 0 ), ( 'brl' in el ? el.brl : 0 ), 'px', 'px' );
              bc = 'bc' in el ? cometUtils.sanitize.color( el.bc ) : '';
        
              o += '.cpb-elementNode' + id + ' .cpb-videoPlayButton {';
              if( 'bgc' in el && ( bgc = cometUtils.sanitize.color( el.bgc ) ) !== '' ){
                o += cometUtils.generate.css( 'background', bgc );
              }
              if( 'bw' in el && typeof ( bw = parseInt( el.bw ) ) === 'number' && !isNaN( bw ) && bw > 0 && bw < 6 && bc !== '' ){
                o += cometUtils.generate.css( 'border', bw + 'px solid ' + bc );
              }
              if( br !== 0 ){
                o += cometUtils.generate.css( 'border-radius', br );
              }
              o += '}';
        
              if( 'ic' in el && ( ic = cometUtils.sanitize.color( el.ic ) ) !== '' ){
                o += '.cpb-elementNode' + id + ' .cpb-videoPlayButton span {';
                o += cometUtils.generate.css( 'border-left', '15px solid ' + ic );
                o += '}';
              }
            }
        
            if( mr !== 0 ){
              o += '.cpb-elementNode' + id + ' .cpb-videoW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            }
            
            mr = cometUtils.generate.mu( ( 'mrtt' in el ? el.mrtt : 0 ), ( 'mrrt' in el ? el.mrrt : 0 ), ( 'mrbt' in el ? el.mrbt : 0 ), ( 'mrlt' in el ? el.mrlt : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-videoW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
            
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-videoW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 't', rcss );
            }
            
            mr = cometUtils.generate.mu( ( 'mrtm' in el ? el.mrtm : 0 ), ( 'mrrm' in el ? el.mrrm : 0 ), ( 'mrbm' in el ? el.mrbm : 0 ), ( 'mrlm' in el ? el.mrlm : 0 ), 'px', 'px' );

            if( mr !== 0 ){
              o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-videoW{';
              o += cometUtils.generate.css( 'margin', mr );
              o += '}';
              rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-videoW{';
              rcss += cometUtils.generate.css( 'margin', mr );
              rcss += '}';
              o += cometUtils.generate.responsive( 'm', rcss );
            }
            
            return o;
          }
        };
        return r;
      } 
    );

  }

  initDefault();

  global.cometElements = manager;

})( jQuery, window );
