<?php
namespace Comet\Library;

class Comet_Post {

	private $id = null;

	private $post = null;

	private $has_post = false;

	private $meta = false;

	public function __construct( $id = null ){

		$id = $id === null ? get_the_ID() : (int)$id;

		if( !is_int( $id ) || $id < 0 || ( $post = get_post( $id ) ) === null ){
			return;

		}
		$this->has_post = true;
		$this->id = $id;
		$this->post = is_array( $post ) ? (object)$post : $post;

	}

	public function has_post(){

		return ( $this->has_post && is_object( $this->post ) );

	}

	public function get_id(){

		return $this->id;

	}

	public function get_post( $meta = true ){

		if( !$this->has_post() ){
			return false;

		}
		$post = $this->post;

		if( is_bool( $meta ) && $meta ){
			$post->meta = $this->get_comet_meta();

		}
		return $post;

	}

	public function get_comet_meta(){

		$meta = !$this->meta ? get_post_meta( $this->id, '_cometMetaData', true ) : $this->meta;

		$this->meta = ( !is_array( $meta ) ? false : $meta );

		return $this->meta;

	}

	public function get_post_type(){

		return ( $this->has_post() ? $this->post->post_type : false );

	}
	
}
?>