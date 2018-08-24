<?php

/**
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 */

// If uninstall not called from WordPress, then exit.
if( !defined( 'WP_UNINSTALL_PLUGIN' )
	|| !current_user_can( 'delete_plugins' ) ){
	exit;
}

$opts = get_option( 'comet_settings' );

if( !is_array( $opts ) || !isset( $opts['uninstall'] ) || $opts['uninstall'] != '1' ){
	return;
}

delete_option( 'comet_settings' );
delete_option( 'comet_fonts' );

$posts = new WP_Query(
	array(
		'post_type'			=> 'any',
        'post_status'    	=> 'any',
        'nopaging'       	=> true,
		'posts_per_page'	=> -1
	)
);

if( $posts->have_posts() ){
	while( $posts->have_posts() ){
		$posts->the_post();
		delete_post_meta( get_the_ID(), '_cometMetaData' );
	}
	wp_reset_postdata();
}

