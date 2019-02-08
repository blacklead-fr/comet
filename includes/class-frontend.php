<?php
namespace Comet;

if( !defined( 'ABSPATH' ) ){
	exit;

}
require_once 'class-render.php';

class Comet_Frontend extends Comet_Render{

	protected $slug = 'comet';

	private $post = false;

	public function __construct(){

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		add_filter( 'the_content', array( $this, 'content' ) );

	}

	private function set_post(){

		if( is_admin() || !( $post = comet_get_post() ) ){
			return;

		}
		$this->post = $post;

	}

	private function is_post(){

		return ( is_object( $this->post ) && $this->post->has_post() );

	}

	private function has_comet(){

		if( !$this->is_post() ){
			$this->set_post();

		}

		if( !$this->is_post() || !$this->post->get_comet_meta() ){
			return false;

		}

		if( !is_array( $o = get_option( 'comet_settings' ) ) || !isset( $o['post_types'] ) || !is_array( $o['post_types'] ) ){
			return false;

		}
		$post_types = $o['post_types'];
		$post_type = trim( $this->post->get_post_type() );
		$post_type = "apt_{$post_type}";

		if( !isset( $post_types[$post_type] ) || (int)$post_types[$post_type] !== 1 ){
			return false;
			
		}

		return true;

	}

	public function enqueue(){

		if( !$this->has_comet() ){
			return;

		}
		$url = COMET_URL;

		$data = array(
			'id'		=> $this->post->get_id(),
			'ajax_url'	=> admin_url( 'admin-ajax.php' ),
			'security'	=> wp_create_nonce( 'comet-ajax-nonce' )
		);

		if( is_user_logged_in() ){
			$data['user'] = 'true';

		}
		comet_enqueue_fonts();
		wp_enqueue_style( $this->slug, "{$url}public/css/comet-public.css", array(), COMET_VERSION );
		wp_register_script( $this->slug, "{$url}src/js/view.js", array(), COMET_VERSION, true );
		wp_localize_script( $this->slug, '__cometdata', $data );
		wp_enqueue_script( $this->slug );

	}

	public function content( $c ){

		return ( !$this->has_comet() ? $c : $this->render( $this->post->get_comet_meta() ) );

	}
	
}
?>