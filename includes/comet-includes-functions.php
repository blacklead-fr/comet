<?php

function comet_getDashboardUrl(){
  $base = get_admin_url( null, 'admin.php' );
  $url = add_query_arg( 'page', 'comet', $base );
  return $url;
}

function comet_getAdminPageUrl( $slug ){
  $base = comet_getDashboardUrl();
  if( strlen( $slug = trim( $slug ) ) > 0 ){
    $url = add_query_arg( 'load', $slug, $base );
    return $url;
  }
  return $base;
}

function comet_getPurl(){
  if( is_admin() ){
    if( isset( $_GET['load'] ) && $_GET['load'] === 'mytemplates' ){
      return comet_getAdminPageUrl( 'mytemplates' );

    }
    return comet_getDashboardUrl();
  }
  return get_permalink();
}

function comet_getEditLink( $id ){
  $base = get_edit_post_link( $id );
  $url = add_query_arg( 'comet', '', $base );
  return $url;
}

function comet_message( $str = '', $type = 'note', $aclass = '' ){
  $type = trim( $type );
  $class = 'comet-message';

  switch( $type ){
    case 'warning':
    case 'error':
    case 'success':
    break;
    default:
      $type = 'note';
  }

  $class .= ' comet-message' . ucfirst( $type );
  $class .= strlen( ( $aclass = trim( $aclass ) ) ) > 0 ? ' ' . $aclass : '';

  return '<div class="' . $class . '">' . $str . '</div>';
}

function comet_updateMyTemplate( $data = array() ){
  $r = -1;
  if( is_array( $data ) ) {
    $arr = array(
      'comment_status'  => 'closed',
      'ping_status'     => 'closed',
      'post_title'      => isset( $data['title'] ) ? trim( $data['title'] ) : '',
      'post_status'     => 'publish',
      'post_type'       => 'comet_mytemplates',
      'post_content'    => '',
      'meta_input'      => array(
        '_cometMetaData' => isset( $data['meta'] ) && is_array( $data['meta'] ) ? $data['meta'] : ''
      )
    );
    if( isset( $data['id'] ) && is_numeric( $data['id'] ) ){
      $arr['ID'] = (int)$data['id'];
    }
    $r = wp_insert_post( $arr );
  }else{
    $r = -2;
  }
  return $r;
}

function comet_getPost( $id ){
  $id = (int)$id;
  if( !is_numeric( $id ) || !is_int( $id ) || $id < 0 ){
    return false;
  }
  $post = get_post( $id );

  if( is_object( $post ) ){
    $post->meta = comet_getPostMeta( $id );
    //$post->style = comet_getPostStyle( $id );
    return $post;
  }
  return false;
}

function comet_updatePost( $data = array() ){
  $r = 0;
  if( is_array( $data ) ) {

    $esc_data = array();

    if( isset( $data['title'] ) && $data['title'] ){
      $esc_data['post_title'] = $data['title'];
    }

    if( isset( $data['content'] ) ){
      $esc_data['post_content'] = $data['content'];
    }

    if( isset( $data['post_type'] ) ){
      $esc_data['post_type'] = $data['post_type'];
    }

    $esc_data['meta_input'] = array();

    if( isset( $data['meta'] ) && is_array( $data['meta'] ) ){
      $esc_data['meta_input']['_cometMetaData'] = $data['meta'];
    }

    /*if( isset( $data['style'] ) ){
      $esc_data['meta_input']['_cometStyle'] = $data['style'];
    }*/

    if( isset( $data['comment'] ) && in_array( $data['comment'], array( 'closed', 'open' ), true ) ){
      $esc_data['comment_status'] = $data['comment'];
    }

    if( isset( $data['ping'] ) && in_array( $data['ping'], array( 'closed', 'open' ), true ) ){
      $esc_data['ping_status'] = $data['ping'];
    }

    if( isset( $data['status'] ) && in_array( $data['status'], array( 'inherit', 'future', 'publish', 'pending', 'private', 'trash', 'auto-draft', 'draft' ), true ) ){
      $esc_data['post_status'] = $data['status'];
    }

    if( isset( $data['excerpt'] ) && is_string( $data['excerpt'] ) && strlen( $data['excerpt'] ) > 0 ){
      $esc_data['post_excerpt'] = $data['excerpt'];
    }

    if( isset( $data['id'] ) && is_numeric( $data['id'] ) ){
      $esc_data['ID'] = (int)$data['id'];
      $r = wp_update_post( $esc_data );
    }else{
      $r = wp_insert_post( $esc_data );
    }
  }
  return $r;
}

function comet_deleteMyTemplate( $id ){
  $r = false;
  $id = (int)$id;
  if( is_numeric( $id ) && $id >= 0 ){
   $r = wp_delete_post( $id, true );
  }
  return $r;
}

function comet_updatePostMeta( $id, $data = array() ){
  $r = -1;
  if( is_numeric( $id ) ){
    $r = update_post_meta( (int)$id, '_cometMetaData', $data );
  }else{
    $r = -2;
  }
  return $r;
}

function comet_getPostMeta( $id ){
  $r = -1;
  if( is_numeric( $id ) ){
    $r = get_post_meta( (int)$id, '_cometMetaData', true );
  }else{
    $r = -2;
  }
  return $r;
}

function comet_parse_items( $ids, $items ){
  if( !is_string( $ids ) || !is_array( $items ) ){
      return false;
    }

    $ids = explode( ',', $ids );

    if( sizeof( $ids ) < 1 ){
      return false;
    }

    $rt = [];
    $n = 0;
    foreach( $ids as $c => $id ){
      $id = (int)$id;
      if( !is_int( $id ) || !isset( $items[$id] ) ){
        continue;
      }
      $rt[$id] = $items[$id];
    }
    return $rt;
}

function comet_get_image_id( $image_url ) {
	global $wpdb;
  $attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid='%s';", $image_url ) );
  if( is_array( $attachment ) && isset( $attachment[0] ) ){
    return $attachment[0];
  }
  return false;
}

function comet_get_image_meta( $url ){
  $attachment_id = comet_get_image_id( $url );
  if( $attachment_id !== false ){
    return wp_get_attachment_metadata( $attachment_id, false );
  }
  return false;
}

function comet_get_templates(){

  $query = new WP_Query(
    array(
      'post_type'      => 'comet_mytemplates',
      'post_status'    => 'any',
      'posts_per_page' => 50
    )
  );

  return $query;
}

function comet_get_template( $id ){

  $query = new WP_Query(
    array(
      'p'         => (int)$id,
      'post_type' => 'comet_mytemplates'
    )
  );

  return $query;
}

function comet_get_elements(){
  require_once plugin_dir_path( dirname( __FILE__ ) ) .  'includes/class-comet-elements.php';
  if( function_exists( '_comet_get_elements' ) ){
    return _comet_get_elements()->elements();
  }
  return false;
}

function comet_get_section(){
  require_once plugin_dir_path( dirname( __FILE__ ) ) .  'includes/class-comet-editor-data.php';
  if( function_exists( '_comet_get_editor_data' ) ){
    return _comet_get_editor_data()->section();
  }
  return false;
}

function comet_get_row(){
  require_once plugin_dir_path( dirname( __FILE__ ) ) .  'includes/class-comet-editor-data.php';
  if( function_exists( '_comet_get_editor_data' ) ){
    return _comet_get_editor_data()->row();
  }
  return false;
}

function comet_get_column(){
  require_once plugin_dir_path( dirname( __FILE__ ) ) .  'includes/class-comet-editor-data.php';
  if( function_exists( '_comet_get_editor_data' ) ){
    return _comet_get_editor_data()->column();
  }
  return false;
}

function comet_getPostId(){
  $id = get_queried_object_id();

  if( $id === 0 ){
    if( isset( $_GET['post'] ) && is_numeric( $_GET['post'] ) ){
      $id = (int)$_GET['post'];
    }elseif( isset( $_GET['id'] ) && is_numeric( $_GET['id'] ) ){
      $id = (int)$_GET['id'];
    }
  }
  return $id;
}

function comet_svgSets(){
  $icons = array(
    'fas' => array(
      'name' => 'FontAwesome solid',
      'set'  => 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/advanced-options/svg-sprites/fa-solid.svg'
    ),
    'fab' => array(
      'name' => 'FontAwesome brands',
      'set'  => 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/advanced-options/svg-sprites/fa-brands.svg'
    ),
    'far' => array(
      'name' => 'FontAwesome regular',
      'set'  => 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/advanced-options/svg-sprites/fa-regular.svg'
    ),
    'fci' => array(
      'name' => 'Flat color icons',
      'set'  => 'https://raw.githubusercontent.com/icons8/flat-color-icons/master/icon-set/icons.svg'
    ),
  );
  return $icons;
}

function comet_getRegisteredFonts( $r = '' ){
  return get_option( 'comet_fonts', $r );
}

function comet_updateFonts( $fonts = array() ){
  return update_option( 'comet_fonts', $fonts );
}

function comet_enqueueTypography( $fonts ){

  if( !is_array( $fonts ) ){
    return false;
  }
  $a = 'https://fonts.googleapis.com/css?family=';
  $b = implode( '|', $fonts );
  $url = esc_url( $a . $b );

  wp_enqueue_style( 'webfont', $url, array(), null, 'all' );

}

function comet_content( $array = array() ){

  $array = !is_array( $array ) ? array() : $array;

  array_unshift( $array, 'cpb', ( is_admin() ? 'cpb-editArea cpb-backendMode' : 'cpb-frontendMode' ) );
  
  return '<div id="cpb-content" class="'. implode( $array, ' ' ) .'"></div>';

}

function comet_scriptdata( $array = array() ){
  $opt = get_option( 'comet_settings' );
  $key = is_array( $opt ) && isset( $opt['googlekey'] ) ? trim( $opt['googlekey'] ) : '';
  $array = is_array( $array ) ? $array : array();

  $base = array(
    'ajax_url'   => admin_url( 'admin-ajax.php' ),
    'nonce'      => wp_create_nonce( 'comet-ajax-nonce' ),
    'svgSets'    => comet_svgSets(),
    'apikey'     => $key
  );

  $r = array_merge( $array, $base );

  return $r;

}

function comet_get_header( $name = null ){
  
  $name = apply_filters( 'comet_template_header', $name );

  get_header( $name );

}

function comet_get_footer( $name = null ){
  
  $name = apply_filters( 'comet_template_footer', $name );

  get_footer( $name );

}

function comet_get_post_types( $prefix = '' ){
  $post_types = get_post_types(
    array(
      'public'  => true
    )
  );
  
  $choices = array();
  $prefix = trim( $prefix );
  foreach( $post_types as $post_type ){
    if( $post_type !== 'attachment'){
      $post_type = trim( $post_type );
      $choice = strtolower( trim( $prefix . $post_type ) );
      $choices[$choice] = ucfirst( $post_type );
    }
  }
  return $choices;

}

function comet_get_supported_post_types(){
  $prefix = trim( 'apt_' );
  $opt = get_option( 'comet_settings' );
  $post_types = comet_get_post_types();
  $support = array();

  if( !is_array( $opt) || !is_array( $post_types ) ){
    return $support;
  }

  foreach( $post_types as $post_type => $name ){
    $g = strtolower( $prefix . trim( $post_type ) );
    if( isset( $opt[$g] ) && $opt[$g] == '1' ){
      $support[$post_type] = $name;
    }

  }
  return $support;

}

function comet_parse_json( $data ){

  if( is_string( $data ) ){
    $data = json_decode( stripslashes( $data ), true );
  }

  if( is_bool( $data ) || is_null( $data ) || !is_array( $data ) ){
    return false;
  }
  return $data;

}

?>
