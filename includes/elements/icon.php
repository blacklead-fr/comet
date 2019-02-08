<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-register.php';
use Comet\Library\Comet_Register;
use Comet\Library\Comet_Utils;

class icon extends Comet_Register {

	public function get_slug(){

		return strtolower( __CLASS__ );

	}

	public function get_name(){

		return __( 'Icon', 'comet' );

	}

	public function get_icon(){

		return 'cico-icon';

	}

	public function get_data(){

		if( !is_array( $this->data ) || count( $this->data ) < 1 ){
			$this->_register_settings();


		}
		return $this->data;

	}

    public function get_view(){

        ?>

        const content = ui.firstChild;
        const icon = toolkit.utils.isString( data.el.icon ) ? toolkit.utils.trim( data.el.icon ) : '';
        const url = toolkit.utils.isString( data.el.url ) ? toolkit.utils.trim( toolkit.utils.stripTags( data.el.url ) ) : '';
        var tag = 'div';
        var wrapper = false;
        var attr, classes;

        if( icon === '' ){
            content.innerHTML = toolkit.html.placeholder();
            return;

        }
        classes = 'cpb-icon cpb-wrapper';
        classes += ' ' + toolkit.sanitize.alignment( data.el.alg );
        content.innerHTML = '<div class="' + classes + '"></div>';


        attr = ' class="cpb-icon cpb-inner"';

        if( url !== '' ){
            tag = 'a';
            attr += ' href="' + toolkit.utils.escUrl( url ) + '"';

            if( [ 'true', '1', 1, true ].indexOf( data.el.tar ) > -1 ){
                attr += ' target="_blank"';

            }

        }
        content.firstChild.innerHTML = '<' + tag + attr + '></' + tag + '>';
        toolkit.html.icon( content.firstChild.firstChild, icon );

        <?php

    }

    public function get_style(){
        ?>
        var o, tmp, rcss;
        
        o = '.cpb-elementNode' + id + ' .cpb-icon.cpb-inner{';

        if( ( tmp = toolkit.sanitize.color( data.el.bgc ) ) !== '' ){
            o += toolkit.css.render( 'background', tmp );

        }

        if( ( tmp = toolkit.sanitize.color( data.el.ic ) ) !== '' ){
            o += toolkit.css.render( 'color', tmp );

        }
        o += toolkit.css.border({
            color: data.el.bc,
            style: data.el.bs,
            top: data.el.brt,
            right: data.el.brr,
            bottom: data.el.brb,
            left: data.el.brl,

        });
        o += toolkit.css.borderRadius( data.el.rdt, data.el.rdr, data.el.rdb, data.el.rdl );

        if( ( tmp = toolkit.sanitize.number({ value: data.el.pd, min: 0, max: 100 }) ) !== null || tmp > 0 ){
            o += toolkit.css.render( 'padding', tmp + 'px' );

        }
        o += '}';

        if( ( tmp = toolkit.sanitize.number({ value: data.el.isi, min: 20, max: 200 }) ) !== null ){
            o += '.cpb-elementNode' + id + ' .cpb-icon.cpb-inner svg{';
            o += toolkit.css.render( 'width', tmp + 'px' );
            o += '}';

        }

        if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
            o += '.cpb-elementNode' + id + ' .cpb-icon.cpb-wrapper{' + tmp + '}';

        }

        if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
            o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-icon.cpb-wrapper{' + tmp + '}';
            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-icon.cpb-wrapper{' + tmp + '}';
            o += toolkit.css.responsive( 't', rcss );

        }

        if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
            o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-icon.cpb-wrapper{' + tmp + '}';
            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-icon.cpb-wrapper{' + tmp + '}';
            o += toolkit.css.responsive( 'm', rcss );

        }
        return o;
        <?php

    }

    private function _register_settings(){

        $tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

        $sid = $this->register_section( $tid, 'icon', __( 'Icon', 'comet' ) );

        $this->register_field( $tid, $sid, 'icon', array(
            'label'  => __( 'Icon', 'comet' ),
            'type'   => 'icon',
        ) );

        $this->register_field( $tid, $sid, 'isi', array(
            'label' => __( 'Size', 'comet' ),
            'type'   => 'range',
            'min'    => '20',
            'max'    => '200',
            'std'   => '30',
            'unit'  => 'px'
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
            )
        ) );

        $sid = $this->register_section( $tid, 'link', __( 'Link', 'comet' ) );

        $this->register_field( $tid, $sid, 'url', array(
            'label' => __( 'Link', 'comet' ),
            'type'  => 'text'
        ) );

        $this->register_field( $tid, $sid, 'tar', array(
            'label' => __( 'Target', 'comet' ),
            'desc'  => __( 'Open the link in a new tab ?', 'comet' ),
            'type'  => 'checkbox',
            'std'   => 'true'
        ) );

        $tid = $this->register_tab( 'design', __( 'Design', 'comet' ) );

        $sid = $this->register_section( $tid, 'colors', __( 'Colors', 'comet' ) );

        $this->register_field( $tid, $sid, 'ic', array(
            'label' => __( 'Icon', 'comet' ),
            'type'  => 'color',
        ) );

        $this->register_field( $tid, $sid, 'bgc', array(
            'label' => __( 'Background', 'comet' ),
            'type'  => 'color',
        ) );

        $sid = $this->register_section( $tid, 'border', __( 'Border', 'comet' ) );

        $this->register_field( $tid, $sid, 'br', Comet_Utils::numbers( __( 'Width', 'comet' ) ) );
        $this->register_field( $tid, $sid, 'bs', array(
            'label'  => __( 'Style', 'comet' ),
            'type'   => 'select',
            'std'    => 'solid',
            'values' => Comet_Utils::borderStyle()
        ) );

        $this->register_field( $tid, $sid, 'bc', array(
            'label' => __( 'Color', 'comet' ),
            'type'  => 'color',
        ) );

        $this->register_field( $tid, $sid, 'rd', Comet_Utils::numbers( __( 'Radius', 'comet' ) ) );

        $sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

        $this->register_field( $tid, $sid, 'pd', array(
            'label' => __( 'Padding', 'comet' ),
            'type'  => 'range',
            'min'   => '0',
            'max'   => '50',
            'std'   => '20',
            'unit'  => 'px'
        ) );

        $this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', true ) );

    }

}
?>