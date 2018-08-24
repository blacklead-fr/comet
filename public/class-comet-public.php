<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 * @subpackage Comet/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Comet
 * @subpackage Comet/public
 * @author     blacklead <contact@blacklead.fr>
 */
class Comet_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Enqueue the scripts for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue() {

		$opts = get_option( 'comet_settings' );
		$post = get_post( get_the_ID() );
		$utils = $this->plugin_name . '-utils';
		$public = $this->plugin_name . '-public';

		if( !is_object( $post ) || !isset( $post->post_type ) || !isset( $post->ID ) ){
			return;
		}

		$pt = 'apt_' . trim( $post->post_type );

		if( !isset( $opts[$pt] ) || $opts[$pt] != '1' ){
			return;
		}
		$post->meta = comet_getPostMeta( $post->ID );

		$data = comet_scriptdata( array(
			'post'       => $post,
		) );

		comet_enqueueTypography( comet_getRegisteredFonts() );
		wp_localize_script( $utils, 'cometdata', $data );
		wp_enqueue_script( $utils );
		wp_enqueue_style( $public );

	}
	
}
