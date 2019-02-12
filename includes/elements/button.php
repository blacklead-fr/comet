<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-element.php';
use Comet\Library\Comet_Element;
use Comet\Library\Comet_Utils;

class button extends Comet_Element {

    public function __construct(){

        $this->set_element( 'button', __( 'Button', 'comet'), 'cico-click' );

    }

    public function render( $data ){

    	$edata = is_array( $data['el'] ) ? $data['el'] : [];
    	$text = isset( $edata['text'] ) && is_string( $edata['text'] ) ? trim( strip_tags( $edata['text'] ) ) : '';
    	$icon = isset( $edata['icon'] ) && is_string( $edata['icon'] ) ? comet_get_svgicon( $edata['icon'] ) : '';

        $classe = 'cpb-button cpb-wrapper ' . Comet_Utils::get_alignment( $edata['alg'] );

        $output = "<div class=\"{$classe}\">";
        $ca = 'cpb-link';

        if( isset( $edata['ani'] ) && is_string( $edata['ani'] ) ){

        	switch( $animation = strtolower( trim( $edata['ani'] ) ) ){
        		case 'none':
        		break;

                case 'stt':
                case 'stl':
                case 'stb':
                case 'str':
                $ca += " cpb-hvrbt cpb-hvrbt-{$animation}";
                break;

                default:

                if( in_array( $animation, [ 'pulse', 'tada' ] ) ){
                	$ca .= ' cpb-animated cpb-efInfinite';

                }
                $ca .= " cpb-ef-{$animation}";
                break;

            }

        }
        $url = isset( $edata['link'] ) && is_string( $edata['link'] ) ? esc_url( trim( strip_tags( $edata['link'] ) ) ) : '#';
        $tar = Comet_Utils::is_true( $edata['tar'] ) ? ' target="_blank"' : '';
        $dir = isset( $edata['ipos'] ) && is_string( $edata['ipos'] ) && $edata['ipos'] === 'r' ? 'r' : 'l';

        $output .= "<a class=\"{$ca}\" href=\"{$url}\"{$tar}>";

        if( $dir === 'l' && $icon !== '' ){
        	$output .= "<span class=\"cpb-icon\">{$icon}</span>";

        }
        $output .= "<span class=\"cpb-title\">{$text}</span>";

        if( $dir === 'r' && $icon !== '' ){
        	$output .= "<span class=\"cpb-icon\">{$icon}</span>";

        }
        $output .= '</a>';
        $output .= '</div>';

        return $output;

    }

    public function view(){

    	?>
    	
    	const content = ui.firstChild;
    	const text = toolkit.utils.isString( data.el.text ) ? toolkit.utils.trim( data.el.text ) : '';
    	const icon = toolkit.utils.isString( data.el.icon ) ? toolkit.utils.trim( data.el.icon ) : '';
        var o, classe, ca, dir, tar, url, b_icon;

        if( text === '' && icon === '' ){
        	content.innerHTML = toolkit.html.placeholder();
        	return;

        }
        classe = 'cpb-button cpb-wrapper ' + toolkit.sanitize.alignment( data.el.alg );

        o = '<div class="' + classe + '">';
        ca = 'cpb-link';

        if( !toolkit.utils.isStringEmpty( data.el.ani ) ){

        	switch( data.el.ani = ( toolkit.utils.trim( data.el.ani ) ).toLowerCase() ){
        		case 'none':
        		break;

                case 'stt':
                case 'stl':
                case 'stb':
                case 'str':
                ca += ' cpb-hvrbt cpb-hvrbt-' + data.el.ani;
                break;

                default:

                if( [ 'pulse', 'tada' ].indexOf( data.el.ani ) > -1 ){
                	ca += ' cpb-animated cpb-efInfinite';

                }
                ca += ' cpb-ef-' + data.el.ani;
                break;

            }

        }
        url = toolkit.utils.isString( data.el.link ) ? toolkit.utils.trim( toolkit.utils.stripTags( data.el.link ) ) : '#';
        tar = [ 'true', 1, true].indexOf( data.el.tar ) > -1 ? ' target="_blank"' : '';
        dir = data.el.ipos === 'r' ? 'r' : 'l';

        o += '<a class="' + ca + '" href="' + toolkit.utils.escUrl( url ) + '"' + tar + '>';

        if( dir === 'l' && icon !== '' ){
        	o += '<span class="cpb-icon"></span>';

        }
        o += '<span class="cpb-title">' + text + '</span>';

        if( dir === 'r' && icon !== '' ){
        	o += '<span class="cpb-icon"></span>';

        }
        o += '</a>';
        o += '</div>';
        content.innerHTML = o;

        if( icon !== '' ){
        	return;

        }

        b_icon = content.firstChild.firstChild;

        if( dir === 'l' ){
        	toolkit.html.icon( b_icon.firstChild, icon );

        }else if( dir === 'r' ){
        	toolkit.html.icon( b_icon.lastChild, icon );

        }

        <?php

    }

    public function css(){
    	?>
    	var o = '';
    	var bg, abg, hsp, vsp, rcss, tmp;

    	if( data.el.sty === 'g' ){
    		bg = toolkit.css.gradient( 'linear', data.el.ang , data.el.gbg );
    		abg = toolkit.css.gradient( 'linear', data.el.ang , data.el.ghbg );

    	}else{
    		bg = toolkit.sanitize.color( data.el.bg );
    		abg = toolkit.sanitize.color( data.el.hbg );

    	}
    	vsp = toolkit.sanitize.number({ value: data.el.vsp, min: 0, max: 70 });
    	hsp = toolkit.sanitize.number({ value: data.el.hsp, min: 0, max: 100 });

    	if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-elementNode' + id + ' .cpb-button.cpb-wrapper{' + tmp + '}';

    	}
    	o += '.cpb-elementNode' + id + ' .cpb-button.cpb-wrapper .cpb-link{';
    	o += toolkit.css.padding( vsp, hsp, vsp, hsp, 'px', 'px' );

    	if( ( tmp = toolkit.sanitize.number({ value: data.el.fs, min: 0 }) ) !== null ){
    		o += toolkit.css.render( 'font-size', tmp + 'px' );

    	}

    	if( bg !== '' ){
    		o += toolkit.css.render( 'background', bg );

    	}

    	if( ( tmp = toolkit.sanitize.color( data.el.tc ) ) !== '' ){
    		o += toolkit.css.render( 'color', tmp );

    	}

    	o += toolkit.css.border({
    		color: data.el.bc,
            style: data.el.bs,
            top: data.el.brt,
            right: data.el.brr,
            bottom: data.el.brb,
            left: data.el.brl
        });
        o += toolkit.css.borderRadius( data.el.rdt, data.el.rdr, data.el.rdb, data.el.rdl );
        o += toolkit.css.boxShadow({
            x: data.el.sx,
            y: data.el.sy,
            blur: data.el.sbl,
            spread: data.el.ssp,
            color: data.el.shc,
            inset: data.el.sin

        });
        o += '}';

        o += '.cpb-elementNode' + id + ' .cpb-button.cpb-wrapper .cpb-icon{';
        if( ( tmp = toolkit.sanitize.number({ value: data.el.is, min: 10, max: 70, default: 20 }) ) !== null ){
            o += toolkit.css.render( 'width', tmp + 'px' );
        }

        if( ( tmp = toolkit.sanitize.number({ value: data.el.isp, min: 0, max: 100 }) ) > 0 ){
        	if( data.el.ipos === 'r' ){
        		o += toolkit.css.render( 'margin-left', tmp + 'px' );

        	}else{
        		o += toolkit.css.render( 'margin-right', tmp + 'px' );

        	}

        }
        o += '}';

        /* Hover */

        o += '.cpb-elementNode' + id + ' .cpb-button.cpb-wrapper .cpb-link:hover,.cpb-elementNode' + id + ' .cpb-button.cpb-wrapper .cpb-link:active{';

        if( abg !== '' ){
        	o += toolkit.css.render( 'background', abg );

        }

        if( ( tmp = toolkit.sanitize.color( data.el.htc ) ) !== '' ){
        	o += toolkit.css.render( 'color', tmp );

        }

        if( ( tmp = toolkit.sanitize.color( data.el.hbc ) ) !== '' ){
        	o += toolkit.css.render( 'border-color', tmp );

        }
        o += '}';

        if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
        	o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-button{' + tmp + '}';
        	rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-button{' + tmp + '}';
        	o += toolkit.css.responsive( 't', rcss );

        }

        if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
        	o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-button{' + tmp + '}';
        	rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-button{' + tmp + '}';
        	o += toolkit.css.responsive( 'm', rcss );

        }
        return o;
        <?php

    }

	protected function _register_settings(){

		$tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

		$sid = $this->register_section( $tid, 'button', __( 'Button', 'comet' ) );

		$this->register_field( $tid, $sid, 'text', array(
			'label'  => __( 'Text', 'comet' ),
			'type'   => 'text',
			'std'    => __( 'Hello', 'comet' ),
		) );

		$this->register_field( $tid, $sid, 'link', array(
			'label'  => __( 'Link', 'comet' ),
			'type'   => 'text',
			'std'    => '#'
		) );

		$this->register_field( $tid, $sid, 'tar', array(
			'label'  => __( 'Target', 'comet' ),
			'type'   => 'checkbox',
			'std'    => 'true',
			'desc'   => __( 'Open the link in a new tab ?', 'comet' ),
		) );

		$this->register_field( $tid, $sid, 'alg', array(
			'label'  => __( 'Alignment', 'comet' ),
			'type'   => 'radio',
			'std'    => 'c',
			'values' => array(
				'l' => array(
					'title' => __( 'Left', 'comet' ),
					'icon'  => 'cico cico-align-left',
				),
				'c' => array(
					'title' => __( 'Center', 'comet' ),
					'icon'  => 'cico cico-align-center',
				),
				'r' => array(
					'title' => __( 'Right', 'comet' ),
					'icon'  => 'cico cico-align-right',
				),
				'j' => array(
					'title' => __( 'Justified', 'comet' ),
					'icon'  => 'cico cico-justify',
				),
			),
		) );

		$sid = $this->register_section( $tid, 'icon', __( 'Icon', 'comet' ) );

		$this->register_field( $tid, $sid, 'icon', array(
			'label'  => __( 'Icon', 'comet' ),
			'type'   => 'icon'
		) );

		$this->register_field( $tid, $sid, 'ipos', array(
			'label'  => __( 'Position', 'comet' ),
			'type'   => 'select',
			'std'    => 'l',
			'values' => array(
				'l' => __( 'Left', 'comet' ),
				'r' => __( 'Right', 'comet' )
			)
		) );

		$tid = $this->register_tab( 'design', __( 'Design', 'comet' ) );

		$sid = $this->register_section( $tid, 'background', __( 'Background', 'comet' ) );

		$this->register_field( $tid, $sid, 'sty', array(
			'label'  => __( 'Style', 'comet' ),
			'type'   => 'select',
			'std'    => 'f',
			'switch' => 'true',
			'to'     => array(
				'f' => array( 'bg', 'hbg' ),
				'g' => array( 'gbg', 'ghbg', 'ang' ),
			),
			'values' => array(
				'f' => __( 'Flat', 'comet' ),
				'g' => __( 'Gradient', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'bg', array(
			'label' => __( 'Color (inactive)', 'comet' ),
			'type'  => 'color',
			'check'    => 'sty:f',
		) );

		$this->register_field( $tid, $sid, 'hbg', array(
			'label' => __( 'Color (active)', 'comet' ),
			'type'  => 'color',
			'check'    => 'sty:f',
		) );

		$this->register_field( $tid, $sid, 'gbg', array(
			'label' => __( 'Gradient (inactive)', 'comet' ),
			'type'  => 'gradient',
			'check'    => 'sty:g',
		) );

		$this->register_field( $tid, $sid, 'ghbg', array(
			'label' => __( 'Gradient (active)', 'comet' ),
			'type'  => 'gradient',
			'check'    => 'sty:g',
		) );

		$this->register_field( $tid, $sid, 'ang', array(
			'label'  => __( 'Angle', 'comet' ),
			'type'   => 'range',
			'std'    => '0',
			'min'    => '0',
			'max'    => '360',
			'unit'   => __( 'deg', 'comet' ),
			'check'    => 'sty:g',
		) );

		$sid = $this->register_section( $tid, 'text', __( 'Text', 'comet' ) );

		$this->register_field( $tid, $sid, 'fs', array(
			'label'  => __( 'Size', 'comet' ),
			'type'   => 'range',
			'std'    => '20',
			'min'    => '10',
			'max'    => '70',
			'unit'   => 'px',
		) );

		$this->register_field( $tid, $sid, 'tc', array(
			'label' => __( 'Color (inactive)', 'comet' ),
			'type'  => 'color',
		) );

		$this->register_field( $tid, $sid, 'htc', array(
			'label' => __( 'Color (active)', 'comet' ),
			'type'  => 'color',
		) );

		$sid = $this->register_section( $tid, 'icon', __( 'Icon', 'comet' ) );

		$this->register_field( $tid, $sid, 'is', array(
			'label'  => __( 'Size', 'comet' ),
			'type'   => 'range',
			'std'    => '20',
			'min'    => '10',
			'max'    => '70',
			'unit'   => 'px',
		) );

		$sid = $this->register_section( $tid, 'border', __( 'Border', 'comet' ) );

		$this->register_field( $tid, $sid, 'br', Comet_Utils::numbers( __( 'Width', 'comet' ) ) );

		$this->register_field( $tid, $sid, 'bs', array(
			'label' => __( 'Type', 'comet' ),
			'type'  => 'select',
			'std'   => 'solid',
			'values' => Comet_Utils::borderStyle()
		) );

		$this->register_field( $tid, $sid, 'bc', array(
			'label' => __( 'Color (inactive)', 'comet' ),
			'type'  => 'color',
		) );

		$this->register_field( $tid, $sid, 'hbc', array(
			'label' => __( 'Color (active)', 'comet' ),
			'type'  => 'color',
		) );

		$this->register_field( $tid, $sid, 'rd', Comet_Utils::numbers( __( 'Radius', 'comet' ) ) );

		$sid = $this->register_section( $tid, 'shadow', __( 'Shadow', 'comet' ) );

		$this->register_field( $tid, $sid, 'sha', array(
			'label'  => __( 'Type', 'comet' ),
			'type'   => 'select',
			'std'    => 'n',
			'switch' => 'true',
			'to'     => array(
				'c' => array( 'shc', 'sx', 'sy', 'sbl', 'ssp', 'sin' ),
			),
			'values' => array(
				'n' => __( 'None', 'comet' ),
				'c' => __( 'Custom', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'shc', array(
			'label' => __( 'Color', 'comet' ),
			'type'  => 'color',
			'check' => 'sha:c',
		) );

		$this->register_field( $tid, $sid, 'sx', array(
			'label'  => __( 'Offset x', 'comet' ),
			'type'   => 'range',
			'std'    => '0',
			'min'    => '-70',
			'max'    => '70',
			'unit'   => 'px',
			'check'  => 'sha:c',
		) );

		$this->register_field( $tid, $sid, 'sy', array(
			'label'  => __( 'Offset y', 'comet' ),
			'type'   => 'range',
			'std'    => '0',
			'min'    => '-70',
			'max'    => '70',
			'unit'   => 'px',
			'check'  => 'sha:c',
		) );

		$this->register_field( $tid, $sid, 'sbl', array(
			'label'  => __( 'Blur', 'comet' ),
			'type'   => 'range',
			'std'    => '0',
			'min'    => '0',
			'max'    => '70',
			'unit'   => 'px',
			'check'  => 'sha:c',
		) );

		$this->register_field( $tid, $sid, 'ssp', array(
			'label'  => __( 'Spread', 'comet' ),
			'type'   => 'range',
			'std'    => '0',
			'min'    => '-70',
			'max'    => '70',
			'unit'   => 'px',
			'check'  => 'sha:c',
		) );

		$this->register_field( $tid, $sid, 'sin', array(
			'label'  => __( 'Inset', 'comet' ),
			'type'   => 'checkbox',
			'std'    => 'false',
			'desc'   => __( 'Enable to draw the shadow inside the border instead of outside.', 'comet' ),
			'check'  => 'sha:c',
		) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'vsp', array(
			'label'  => __( 'Vertical', 'comet' ),
			'type'   => 'range',
			'std'    => '10',
			'min'    => '0',
			'max'    => '70',
			'unit'   => 'px',
		) );

		$this->register_field( $tid, $sid, 'hsp', array(
			'label'  => __( 'Horizontal', 'comet' ),
			'type'   => 'range',
			'std'    => '25',
			'min'    => '0',
			'max'    => '100',
			'unit'   => 'px',
		) );

		$this->register_field( $tid, $sid, 'isp', array(
			'label'  => __( 'Icon', 'comet' ),
			'type'   => 'range',
			'std'    => '25',
			'min'    => '0',
			'max'    => '100',
			'unit'   => 'px',
		) );

		$this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', 'true' ) );

		$sid = $this->register_section( $tid, 'animation', __( 'Animation', 'comet' ) );

		$this->register_field( $tid, $sid, 'ani', array(
			'label' => __( 'Effect', 'comet' ),
			'desc'  => __( 'Play an effect on hovering the button.', 'comet' ),
			'type'  => 'select',
			'std'   => '',
			'values' => array(
				'none'   => __( 'None', 'comet' ),
				'zoom'   => __( 'Zoom', 'comet' ),
				'fade'   => __( 'Fade', 'comet' ),
				'shrink' => __( 'Shrink', 'comet' ),
				'pulse'  => __( 'Pulse', 'comet' ),
				'tada'   => __( 'Tada', 'comet' ),
				'left'   => __( 'Left', 'comet' ),
				'right'  => __( 'Right', 'comet' ),
				'up'     => __( 'Up', 'comet' ),
				'down'   => __( 'Down', 'comet' ),
                    /*'stt'    => __( 'Sweep to top', 'comet' ),
                    'stl'    => __( 'Sweep to left', 'comet' ),
                    'stb'    => __( 'Sweep to bottom', 'comet' ),
                    'str'    => __( 'Sweep to right', 'comet' ),*/
                )
		) );

	}

}
?>