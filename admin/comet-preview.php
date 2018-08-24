<?php

if( isset( $_GET['comet'] )
    && $_GET['comet'] === 'mytemplates'
    && isset( $_GET['action'] )
    && $_GET['action'] === 'preview'
    && isset( $_GET['id'] )
    && is_numeric( $_GET['id'] ) ){

    $id = (int)$_GET['id'];
    $post = get_post( $id );
	$utils = 'comet-utils';
    $public = 'comet-public';
    
    if( !is_object( $post ) || !isset( $post->post_type ) || $post->post_type !== 'comet_mytemplates' || !isset( $post->ID ) ){
        _e( 'Unrechable template', 'comet' );
        wp_die();
    }
    $post->meta = comet_getPostMeta( $post->ID );
    
    $data = comet_scriptdata( array(
        'post'       => $post,
    ) );
    comet_enqueueTypography( comet_getRegisteredFonts() );
    wp_localize_script( $utils, 'cometdata', $data );
    wp_enqueue_script( $utils );
    wp_enqueue_style( $public );
    wp_enqueue_style( 'dashicons' );
        
    echo '<html>';
    echo '<head>';
    echo '<title>' . get_bloginfo('name') . ' &rsaquo; ' . __( 'Previewing template', 'comet' ) . ' &#8212; ' . __( 'WordPress' ) . '</title>';
    echo '<style>html,body{margin:0;padding:0;border:0;color:#404146;} #cpb-loading{display:block;text-align:center;}#cpb-loading > span{animation:waitWhile 2s linear 0s infinite;}@keyframes waitWhile {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}</style>';
    do_action( 'admin_print_styles' );
    do_action( 'admin_print_scripts' );
    echo '</head>';
    echo '<body>';
    echo '<div id="cpb-content" class="cpb cpb-frontendMode"><div id="cpb-loading"><span class="dashicons dashicons-update"></span></div></div>';
    do_action( 'admin_print_footer_scripts' );
    echo '</body>';
    echo '</html>';
    exit;
}
?>