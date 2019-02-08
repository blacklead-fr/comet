<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-register.php';
use Comet\Library\Comet_Register;
use Comet\Library\Comet_Utils;

class image extends Comet_Register {

	public function get_slug(){

		return strtolower( __CLASS__ );

	}

	public function get_name(){

		return __( 'Image', 'comet' );

	}

	public function get_icon(){

		return 'cico-image';

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
    	const image = toolkit.html.image({
        	src: data.el.img,
        	alt: data.el.alt,
        	auto: true
        });
    	var tag = 'div';
        var wrapper = false;
        var inner = false;
        var link, aside, classes;

        if( !image ){
        	content.innerHTML = toolkit.html.placeholder( 'image' );
        	return;

        }
        link = toolkit.utils.isString( data.el.link ) ? toolkit.utils.trim( toolkit.utils.stripTags( data.el.link ) ) : '';
        tag = link !== '' ? 'a' : 'div';
        classes = 'cpb-image cpb-wrapper';
        classes += ' ' + toolkit.sanitize.alignment( data.el.alg );
        wrapper = document.createElement( 'div' );
        wrapper.className = classes;
        content.appendChild( wrapper );

        inner = document.createElement( tag );
        inner.className = 'cpb-image cpb-inner';

        if( tag === 'a' ){
        	inner.href = toolkit.utils.escUrl( link );

        	if( [ 'true', '1', 1, true ].indexOf( data.el.tar ) > -1 ){
        		inner.target = '_blank';

        	}

        }
        inner.appendChild( image );


        if( toolkit.utils.isString( data.el.cap ) ){
        	aside = document.createElement( 'aside' );
        	aside.className = 'cpb-caption';
        	aside.innerHTML = toolkit.utils.stripTags( data.el.cap );
        	inner.appendChild( aside );

        }
        wrapper.appendChild( inner );
        <?php

    }

    public function get_style(){
    	?>
    	var o, tmp, rcss;

    	o = '.cpb-elementNode' + id + ' .cpb-image .cpb-caption{';
    	if( ( tmp = toolkit.sanitize.color( data.el.tc ) ) !== '' ){
    		o += toolkit.css.render( 'color', tmp );

    	}

    	if( ( tmp = toolkit.sanitize.number({ value: data.el.tsi, min: 10, max: 50 }) ) !== null ){
    		o += toolkit.css.render( 'font-size', tmp + 'px' );

    	}
    	o += '}';

    	if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-elementNode' + id + ' .cpb-image.cpb-wrapper{' + tmp + '}';

    	}
    	o += '.cpb-elementNode' + id + ' .cpb-image.cpb-inner{';
    	o += toolkit.css.border({
    		color: data.el.bc,
            style: 'solid',
            top: data.el.brt,
            right: data.el.brr,
            bottom: data.el.brb,
            left: data.el.brl,

        });

        if( ( tmp =  toolkit.sanitize.color( data.el.bg ) ) !== '' ){
        	o += toolkit.css.render( 'background', tmp );

        }
        o += toolkit.css.borderRadius( data.el.rdt, data.el.rdr, data.el.rdb, data.el.rdl );
    	o += toolkit.css.padding( data.el.pdt, data.el.pdr, data.el.pdb, data.el.pdl, 'px', 'px' );
        o += '}';

        if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
        	o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-image.cpb-wrapper{' + tmp + '}';
        	rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-image.cpb-wrapper{' + tmp + '}';
        	o += toolkit.css.responsive( 't', rcss );

        }

        if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
        	o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-image.cpb-wrapper{' + tmp + '}';
        	rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-image.cpb-wrapper{' + tmp + '}';
        	o += toolkit.css.responsive( 'm', rcss );

        }
        return o;
        <?php
        
    }

	private function _register_settings(){

		$tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

		$sid = $this->register_section( $tid, 'image', __( 'Image', 'comet' ) );

		$this->register_field( $tid, $sid, 'img', array(
			'label'  => __( 'Image', 'comet' ),
			'type'   => 'image',
			'std'    => '',
		) );

		$this->register_field( $tid, $sid, 'cap', array(
			'label'  => __( 'Caption', 'comet' ),
			'type'   => 'text'
		) );

		$this->register_field( $tid, $sid, 'alt', array(
			'label'  => __( 'Alternative text', 'comet' ),
			'desc'   => __( 'Alternative text is required for SEO. By default it uses the image filename.', 'comet' ),
			'type'   => 'text'
		) );

		$this->register_field( $tid, $sid, 'alg', array(
			'label'  => __( 'Alignment', 'comet' ),
			'type'   => 'radio',
			'std'    => 'c',
			'values' => array(
				'l'   => array(
					'title' => __( 'Left', 'comet' ),
					'icon' => 'cico cico-align-left',
				),
				'c' => array(
					'title' => __( 'Center', 'comet' ),
					'icon' => 'cico cico-align-center',
				),
				'r'  => array(
					'title' => __( 'Right', 'comet' ),
					'icon' => 'cico cico-align-right',
				),
			)
		) );

		$sid = $this->register_section( $tid, 'link', __( 'Link', 'comet' ) );

		$this->register_field( $tid, $sid, 'link', array(
			'label'  => __( 'Link', 'comet' ),
			'type'   => 'text',
			'std'    => '',
		) );

		$this->register_field( $tid, $sid, 'tar', array(
			'label'  => __( 'Target', 'comet' ),
			'type'   => 'checkbox',
			'std'    => 'true',
			'desc'   => __( 'Open the link in a new tab ?', 'comet' ),
		) );

		$tid = $this->register_tab( 'design', __( 'Design', 'comet' ) );

		$sid = $this->register_section( $tid, 'caption', __( 'Caption', 'comet' ) );

		$this->register_field( $tid, $sid, 'tc', array(
			'label' => __( 'Color', 'comet' ),
			'type'  => 'color',
		) );

		$this->register_field( $tid, $sid, 'tsi', array(
			'label' => __( 'Size', 'comet' ),
			'type'   => 'range',
			'std'    => '12',
			'min'    => '10',
			'max'    => '50',
			'unit'   => 'px',
		) );

		$sid = $this->register_section( $tid, 'background', __( 'Background', 'comet' ) );

		$this->register_field( $tid, $sid, 'bg', array(
			'label' => __( 'Color', 'comet' ),
			'type'  => 'color',
		) );

		$sid = $this->register_section( $tid, 'border', __( 'Border', 'comet' ) );

		$this->register_field( $tid, $sid, 'bc', array(
			'label' => __( 'Color', 'comet' ),
			'type'  => 'color',
		) );

		$this->register_field( $tid, $sid, 'br', Comet_Utils::numbers( __( 'Border', 'comet' ) ) );

		$this->register_field( $tid, $sid, 'rd', Comet_Utils::numbers( __( 'Radius', 'comet' ) ) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'pd', Comet_Utils::numbers( __( 'Padding', 'comet' ), '', '0', 'true' ) );

		$this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', 'true' ) );

	}

}
?>