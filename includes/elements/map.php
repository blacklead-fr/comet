<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-register.php';
use Comet\Library\Comet_Register;
use Comet\Library\Comet_Utils;

class map extends Comet_Register {

	public function get_slug(){

		return strtolower( __CLASS__ );

	}

	public function get_name(){

		return __( 'Google map', 'comet' );

	}

	public function get_icon(){

		return 'cico-map';

	}

	public function get_data(){

		if( !is_array( $this->data ) || count( $this->data ) < 1 ){

			$this->_register_settings();


		}
		return $this->data;

	}
    
    public function get_view(){

    	?>

    	const w = toolkit.sanitize.number({ value: data.el.wi, min: 200, max: 2000, default: 200 });
    	const h = toolkit.sanitize.number({ value: data.el.he, min: 200, max: 2000, default: 200 });
    	var src, tmp, o;

    	src = 'https://maps.google.com/maps?output=embed&=iwloc=B';
    	if( toolkit.utils.isString( data.el.q ) ){
    		src += '&q=' + toolkit.utils.trim( toolkit.utils.stripTags( data.el.q ) );

    	}
    	src += '&z=' + toolkit.sanitize.number({ value: data.el.zoom, min: 0, max: 21, default: 10 });

    	if( !toolkit.utils.isStringEmpty( data.el.mt ) && [ 'satellite', 's' ].indexOf( tmp = toolkit.utils.trim( data.el.mt ) ) > -1 ){
    		src += '&t=k';

    	}
    	src += '&width=' + w;
    	src += '&height=' + h;

    	o = '<iframe class="cpb-map cpb-frame" width="' + w + '" height="' + h + '"';
    	o += ' src="' + toolkit.utils.escUrl( src ) + '" allowfullscreen  scrolling="no" frameborder="0">';
    	o += __( 'No map to show', 'comet' );
    	o += '</iframe>';

    	ui.firstChild.innerHTML = o;
    	<?php

    }

    public function get_style(){
    	?>
    	var o = '';
    	var tmp, rcss;

    	if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-elementNode' + id + ' .cpb-map.cpb-frame{' + tmp + '}';

    	}

    	if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-map.cpb-frame{' + tmp + '}';
    		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-map.cpb-frame{' + tmp + '}';
    		o += toolkit.css.responsive( 't', rcss );

    	}

    	if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-map.cpb-frame{' + tmp + '}';
    		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-map.cpb-frame{' + tmp + '}';
    		o += toolkit.css.responsive( 'm', rcss );

    	}
    	return o;
    	<?php

    }

	private function _register_settings(){

		$tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

		$sid = $this->register_section( $tid, 'settings', __( 'Settings', 'comet' ) );

		$this->register_field( $tid, $sid, 'q', array(
			'label'  => __( 'Address', 'comet' ),
			'type'   => 'text',
			'std'    => 'Eiffel Tower, Paris France',
		) );

		$this->register_field( $tid, $sid, 'zoom', array(
			'label'  => __( 'Zoom level', 'comet' ),
			'desc'   => __( 'The initial resolution at which to display the map is set by the zoom property, where zoom 0 corresponds to a map of the Earth fully zoomed out, and higher zoom levels zoom in at a higher resolution.', 'comet' ),
			'type'   => 'range',
			'std'    => '18',
			'min'    => '0',
			'max'    => '21',
		) );

		$this->register_field( $tid, $sid, 'mt', array(
			'label'  => __( 'Map type', 'comet' ),
			'type'   => 'select',
			'std'    => 'r',
			'values' => array(
				'r'	=> __( 'Roadmap', 'comet' ),
				's'	=> __( 'Satellite', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'wi', array(
			'label'  => __( 'Width', 'comet' ),
			'type'   => 'range',
			'min'    => '200',
			'max'    => '2000',
			'std'    => '500',
			'unit'   => 'px'
		) );

		$this->register_field( $tid, $sid, 'he', array(
			'label'  => __( 'Height', 'comet' ),
			'type'   => 'range',
			'min'    => '200',
			'max'    => '2000',
			'std'    => '500',
			'unit'   => 'px'
		) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', 'true' ) );

	}

}
?>