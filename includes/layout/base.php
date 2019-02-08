<?php
namespace Comet\Library\Layout;

if( !defined( 'ABSPATH' ) ){
	exit;
	
}
require_once COMET_PATH . 'includes/class-register.php';
use Comet\Library\Comet_Register;
use Comet\Library\Comet_Utils;

class Base extends Comet_Register {

	public function get_data(){

		$this->_register_settings();

		return $this->data;
	}

	private function _register_settings(){

		$tid = $this->register_tab( 'settings', __( 'Settings', 'comet' ) );

		$sid = $this->register_section( $tid, 'background', __( 'Background', 'comet' ) );

		$this->register_field( $tid, $sid, 'bgt', array(
			'label'  => __( 'Type', 'comet' ),
			'type'   => 'select',
			'std'    => 'color',
			'switch' => 'true',
			'to'     => array(
				'color'    => array( 'bgc' ),
				'gradient' => array( 'bgor', 'gradient', 'shape', 'angle' ),
			),
			'values' => array(
				'color'    => __( 'Color', 'comet' ),
				'gradient' => __( 'Gradient', 'comet' ),
				'none'     => __( 'None', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'bgc', array(
			'label'    => __( 'Color', 'comet' ),
			'check'    => 'bgt:color',
			'type'     => 'color',
		) );

		$this->register_field( $tid, $sid, 'bgor', array(
			'label'  => __( 'Gradient type', 'comet' ),
			'check'  => 'bgt:gradient',
			'type'   => 'select',
			'std'    => 'linear',
			'values' => array(
				'linear' => __( 'Linear', 'comet' ),
				'radial' => __( 'Radial', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'gradient', array(
			'label'  => __( 'Gradient', 'comet' ),
			'type'   => 'gradient',
			'check'  => 'bgt:gradient',
		) );

		$this->register_field( $tid, $sid, 'shape', array(
			'label'  => __( 'Shape', 'comet' ),
			'type'   => 'select',
			'std'    => 'corner',
			'check'  => 'bgt:gradient',
			'values' => array(
				'side'   => __( 'Side', 'comet' ),
				'corner' => __( 'Corner', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'angle', array(
			'label'  => __( 'Angle', 'comet' ),
			'check'  => 'bgt:gradient',
			'type'   => 'range',
			'min'    => '0',
			'max'    => '360',
			'step'    => '1',
			'std'    => '0',
			'unit'   => __( 'deg', 'comet' )
		) );

		$sid = $this->register_section( $tid, 'image', __( 'Image', 'comet' ) );

		$this->register_field( $tid, $sid, 'image', array(
			'type'  => 'image',
			'label' => __( 'Image','comet'),
		) );

		$this->register_field( $tid, $sid, 'pos', array(
			'type'   => 'select',
			'label'  => __( 'Position', 'comet' ),
			'values' => Comet_Utils::backgroundPosition()
		) );

		$this->register_field( $tid, $sid, 'repeat', array(
			'type'   => 'select',
			'label'  => __( 'Repeat', 'comet' ),
			'values' => Comet_Utils::backgroundRepeat()
		) );

		$this->register_field( $tid, $sid, 'size', array(
			'type'   => 'select',
			'label'  => __( 'Size', 'comet' ),
			'std'    => 'auto',
			'values' => array(
				'auto'  => __( 'Auto', 'comet' ),
				'cov'   => __( 'Cover', 'comet' ),
				'con'   => __( 'Contain', 'comet' ),
			)
		) );

		$this->register_field( $tid, $sid, 'att', array(
			'type'   => 'select',
			'label'  => __( 'Attachment', 'comet' ),
			'std'    => 'scr',
			'values' => array(
				'scr'  => __( 'Scroll', 'comet' ),
				'fix'  => __( 'Fixed', 'comet' ),
			)
		) );

		$sid = $this->register_section( $tid, 'video', __( 'Video', 'comet' ) );

		$this->register_field( $tid, $sid, 'vid', array(
			'label'  => __( 'Video', 'comet' ),
			'desc'   => __( 'Add a video on the background ?', 'comet' ),
			'type'   => 'checkbox',
			'switch' => 'true',
			'std'    => 'false',
			'to'     => 'vurl'
		) );

		$this->register_field( $tid, $sid, 'vurl', array(
			'label'    => __( 'Video', 'comet' ),
			'desc'     => __( 'There are 3 supported video formats: MP4, WebM, and Ogg. But MP4 is supported by all modern browsers.', 'comet' ),
			'onload'   => 'hide',
			'type'     => 'text',
			'std'      => ''
		) );

		$sid = $this->register_section( $tid, 'overlay', __( 'Overlay', 'comet' ) );

		$this->register_field( $tid, $sid, 'ov', array(
			'label'  => __( 'Overlay', 'comet' ),
			'desc'   => __( 'Add an overlay on the background ?', 'comet' ),
			'type'   => 'checkbox',
			'std'    => 'false',
		) );

		$this->register_field( $tid, $sid, 'ovc', array(
			'label'  => __( 'Color','comet' ),
			'type'   => 'color'
		) );

		$sid = $this->register_section( $tid, 'border', __( 'Border', 'comet' ) );

		$this->register_field( $tid, $sid, 'bw', Comet_Utils::numbers(
			__( 'Width', 'comet' ),
			__( 'Set the width of the section\'s four borders. The values must be positive integers.', 'comet' )
		) );

		$this->register_field( $tid, $sid, 'bc', array(
			'label'   => __( 'Color', 'comet' ),
			'type'    => 'color',
		) );

		$this->register_field( $tid, $sid, 'bs', array(
			'type'   => 'select',
			'label'  => __('Style','comet'),
			'values' => Comet_Utils::borderStyle()
		) );

		$this->register_field( $tid, $sid, 'brad', Comet_Utils::numbers( __( 'Radius', 'comet' ) ) );

		$sid = $this->register_section( $tid, 'sizing', __( 'Sizing', 'comet' ) );

		$this->register_field( $tid, $sid, 'width', array(
			'type'   => 'select',
			'label'  => __( 'Width', 'comet' ),
			'std'    => 'full',
			'switch' => 'true',
			'to'     => array(
				'cust'    => array( 'wsize' ),
			),
			'values' => array(
				'full'  => __( 'Full', 'comet' ),
				'cust'  => __( 'Custom', 'comet' )
			)
		) );

		$this->register_field( $tid, $sid, 'wsize', array(
			'type'   => 'range',
			'label'  => __( 'Size', 'comet' ),
			'check'  => 'width:cust',
			'min'    => '300',
			'max'    => '5000',
			'step'   => '1',
			'std'    => '1000',
			'unit'   => 'px'
		) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'pad', Comet_Utils::numbers(
			__( 'Padding', 'comet' ),
			__( 'Padding properties are used to generate space around the content. The values must be positive integers.', 'comet' ),
			'0',
			'true'
		) );

		$this->register_field( $tid, $sid, 'mar', Comet_Utils::numbers(
			__( 'Margin', 'comet' ),
			__( 'Margin properties are used to generate space around the section. The values must be integers.', 'comet' ),
			'0',
			'true'
		) );

	}

}
?>