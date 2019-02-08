<?php
namespace Comet\Library;

if( !defined( 'ABSPATH' ) ){
	exit;

}

class Comet_Js {

	private $id = null;

	private $public = false;

	private $data = array();

	public function __construct( $id = null, $public = true ){

		$this->id = ( is_int( $id = intval( $id ) ) && $id > -1 ? $id : null );
		$this->public = is_bool( $public ) ? $public : true;

		if( $this->public ){
			$mth = [ 'post', 'settings', 'svgSets' ];

		}else{
			$mth = [ 'post', 'settings', 'lib', 'svgSets' ];

		}
		$this->data = !is_array( $this->data ) ? [] : $this->data;

		foreach( $mth as $m ){

			if( method_exists( $this, $m ) ){
				$this->data[$m] = call_user_func( [ $this, $m ] );

			}
		}

	}

	public function get_data(){
		return $this->data;

	}

	private function post(){

		return ( ( $post = comet_get_post( $this->id ) ) ? $post->get_post() : false );

	}

	private function settings(){

		$elements = comet_get_elements_data();

		if( $this->public ){

			return array(
				'elements'	=> $elements 
			);

		}
		$layout = comet_layout();

		return array(
			'elements'	=> $elements,
			'section'	=> is_array( $data = $layout->get_type_data( 'section' ) ) ? $data['tabs'] : array(),
			'row'		=> is_array( $data = $layout->get_type_data( 'row' ) ) ? $data['tabs'] : array(),
			'column'	=> is_array( $data = $layout->get_type_data( 'column' ) ) ? $data['tabs'] : array()
		);

	}

	private function lib(){
		$opt = get_option( 'comet_settings' );
		$api = 'googlekey';

		return array(
			'admin_url'	=> get_admin_url(),
			'apikey'	=> ( is_array( $opt ) && ( $api = $opt[$api] ) !== null && is_string( $api ) ? trim( strip_tags( $api ) ) : '' )
		);

	}

	private function svgSets(){

		return comet_get_iconsets();

	}

}
?>