<?php
/**
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 */

if( !defined( 'WP_UNINSTALL_PLUGIN' ) || !current_user_can( 'delete_plugins' ) ){
	exit;
}

$slugs = [
	'comet_settings',
	'comet_fonts'
];

$settings = get_option( $slugs[0] );

if( !is_array( $settings ) || !isset( $settings['uninstall'] ) || (int)$settings['uninstall'] !== 1 ){
	return;

}
delete_option( $slugs[0] );
delete_option( $slugs[1] );

$posts = new WP_Query([
	'post_type'			=> 'any',
	'post_status'		=> 'any',
	'nopaging'			=> true,
	'posts_per_page'	=> -1
]);

if( $posts->have_posts() ){

	while( $posts->have_posts() ){
		$posts->the_post();
		delete_post_meta( get_the_ID(), '_cometMetaData' );

	}
	wp_reset_postdata();

}

?>