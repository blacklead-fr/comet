<?php
global $comet_lib;
$comet_lib = '\Comet\Library';

function comet_get_dashboard_url( $slug = null ){
  $base = add_query_arg( 'page', 'comet', admin_url( 'admin.php' ) );

  return ( !is_string( $slug ) || preg_match( '/[^a-z_\-]/i', $slug ) ? $base : add_query_arg( 'rq', trim( $slug ), $base ) );

}

function comet_get_post_edit_link( $id, $default = true ){
  $default = is_bool( $default ) ? $default : true;

  return add_query_arg( 'comet', ( $default ? 'default' : 'template' ), get_edit_post_link( $id ) );
  
}

function comet_message( $str = '', $type = 'note', $echo = false ){
  $types = array( 'warning', 'error', 'success', 'note' );
  $type = ( is_string( $type ) && in_array( $type = trim( strtolower( $type ) ), $types ) ? $type : 'note' );
  $str = esc_html( is_string( $str ) ? strip_tags( $str, comet_inline_tags() ) : '' );

  $output = "<div class=\"comet-message comet-{$type}\"><p>{$str}</p></div>";

  if( is_bool( $echo ) && $echo ){
    echo $output;

  }else{
    return $output;

  }

}

function comet_get_mytemplates( $args = [], $query = true ){

  $default = [
    'post_type'       => 'comet_mytemplates',
    'post_status'     => 'publish',
    'nopaging'        => true,
    'posts_per_page'  => -1,
    'has_password'    => false
  ];

  $args = is_array( $args ) ? $args : [];
  $Templates = new WP_Query( array_merge( $default, $args ) );

  if( is_bool( $query ) && $query ){
    return $Templates;

  }
  return $Templates->posts;

}

function comet_get_mytemplate( $id, $meta = false ){
  $post = comet_get_post( $id );
  
  return ( $post->has_post() && ( $the_post = $post->get_post( $meta ) ) && isset( $the_post->post_type ) && $the_post->post_type === 'comet_mytemplates' ? $the_post : false );

}

/*function comet_updateMyTemplate( $data = array() ){
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
}*/

function comet_get_post( $id = null ){
  global $comet_lib;

  $path = COMET_PATH;
  $post = "{$comet_lib}\Comet_Post";
  $file = "{$path}includes/class-post.php";


  return ( !( $post = comet_requires( $post, $file ) ) || !( $_post = new $post( $id ) ) || !( $_post instanceof $post ) ? false : $_post );

}

/*function comet_updatePost( $data = array() ){
  $r = 0;

  if( is_array( $data ) ) {

    $metaboxes = array();

    $esc_data = array();

    if( isset( $data['_post'] ) && is_string( $data['_post'] ) ){
      parse_str( $data['_post'], $metaboxes );
    }

    /*if( isset( $metaboxes['title'] ) && is_string( $metaboxes['title'] ) ){
      $esc_data['post_title'] = sanitize_title( $metaboxes['title'] );
    }*/

    /*if( isset( $data['title'] ) && is_string( $data['title'] ) ){
      $esc_data['post_title'] = sanitize_title( $data['title'] );
    }

    if( isset( $data['content'] ) ){
      $esc_data['post_content'] = wp_kses_post( $data['content'] );
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

   /* if( isset( $data['comment'] ) && in_array( $data['comment'], array( 'closed', 'open' ), true ) ){
      $esc_data['comment_status'] = $data['comment'];
    }

    if( isset( $data['ping'] ) && in_array( $data['ping'], array( 'closed', 'open' ), true ) ){
      $esc_data['ping_status'] = $data['ping'];
    }

    if( isset( $metaboxes['status'] ) && in_array( $metaboxes['status'], array( 'inherit', 'future', 'publish', 'pending', 'private', 'trash', 'auto-draft', 'draft' ), true ) ){
      $esc_data['post_status'] = $metaboxes['status'];
    }

    if( isset( $metaboxes['excerpt'] ) && is_string( $metaboxes['excerpt'] ) ){
      $esc_data['post_excerpt'] = sanitize_text_field( $metaboxes['excerpt'] );
    }

    if( isset( $data['id'] ) && is_numeric( $data['id'] ) ){
      $esc_data['ID'] = (int)$data['id'];
      $r = wp_update_post( $esc_data );
    }else{
      $r = wp_insert_post( $esc_data );
    }
  }
  return $r;
}*/

/*function comet_deleteMyTemplate( $id ){
  $r = false;
  $id = (int)$id;
  if( is_numeric( $id ) && $id >= 0 ){
   $r = wp_delete_post( $id, true );
  }
  return $r;
}*/

/*function comet_updatePostMeta( $id, $data = array() ){
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
}*/

/*function comet_get_template( $id ){

  $post = comet_get_post( $id );
  
  return ( $post->has_post() && ( $the_post = $post->get_post() ) && isset( $the_post->post_type ) && $the_post->post_type === 'comet_mytemplates' ? $the_post : false );

}*/

function comet_layout(){
  global $comet_lib;

  $path = COMET_PATH;

  return comet_autoload( "{$comet_lib}\Comet_Layout", "{$path}includes/class-layout.php" );
  
}

/*function comet_getPostId(){
  $id = get_queried_object_id();

  if( $id === 0 ){
    if( isset( $_GET['post'] ) && is_numeric( $_GET['post'] ) ){
      $id = (int)$_GET['post'];
    }elseif( isset( $_GET['id'] ) && is_numeric( $_GET['id'] ) ){
      $id = (int)$_GET['id'];
    }
  }
  return $id;
}*/

function comet_iconsets(){
  global $comet_lib;
  $path = COMET_PATH;

  return comet_autoload( "{$comet_lib}\Comet_Iconsets", "{$path}includes/class-iconsets.php" );

}

function comet_get_iconsets(){
  $Sets = comet_iconsets();

  return ( !$Sets ? [] : $Sets->get_sets() );

}

function comet_get_icons( $set_id ){
  $Sets = comet_iconsets();

  return ( !$Sets || !( $Set = $Sets->get_set( $set_id ) ) ? false : $Set );

}

function comet_get_icon( $set_id, $icon_id ){
  $set = comet_get_icons( $set_id );

  return ( !is_array( $set ) || !isset( $set['set'] ) || !is_array( $set['set'] ) || !is_string( $icon_id ) || !isset( $set['set'][$icon_id] ) || !is_array( $set['set'][$icon_id] ) ? false : $set['set'][$icon_id] );

}

function comet_get_fonts( $r = false ){
  return get_option( 'comet_fonts', $r );

}

/*function comet_updateFonts( $fonts = array() ){
  return update_option( 'comet_fonts', $fonts );

}*/

function comet_fonts_url(){

  if( !is_array( $fonts = comet_get_fonts() ) ){
    return false;

  }
  return 'https://fonts.googleapis.com/css?family=' . implode( '|', $fonts );

}

function comet_enqueue_fonts(){

  if( !( $url = comet_fonts_url() ) ){
    return;

  }
  wp_enqueue_style( 'webfont', esc_url( $url ) );

}

function comet_get_header( $name = null ){
  
  $name = apply_filters( 'comet_template_header', $name );

  get_header( $name );

}

function comet_get_footer( $name = null ){
  
  $name = apply_filters( 'comet_template_footer', $name );

  get_footer( $name );

}

function comet_get_post_types( $prefix = false ){

  if( !is_array( $post_types = get_post_types( [ 'public' => true ] ) ) ){
    return false;

  }
  $choices = [];
  $prefix = ( is_string( $prefix ) ? preg_replace( '/[^a-z_]/i', '', $prefix ) : '' );

  foreach( $post_types as $post_type ){

    if( !is_string( $post_type ) || ( $post_type = trim( strtolower( $post_type ) ) ) === 'attachment' ){
      continue;

    }

    if( $post_type === 'attachment' ){
      continue;

    }
    $choice = "{$prefix}{$post_type}";
    $choices[$choice] = ucfirst( $post_type );

  }
  return $choices;

}

function comet_get_supported_post_types(){
  $prefix = 'apt_';
  $op = get_option( 'comet_settings' );
  $post_types = comet_get_post_types();
  $support = [];

  if( !is_array( $op ) || !isset( $op['post_types'] ) || !is_array( $pt = $op['post_types'] ) || !is_array( $post_types ) ){
    return $support;

  }

  foreach( $post_types as $post_type => $name ){

    if( ( $g = "{$prefix}{$post_type}" ) && isset( $pt[$g] ) && (int)$pt[$g] === 1 ){
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

function comet_allowed_tags( $toStr = true ){

  $tags = array( 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'section', 'span', 'aside', 'figure', 'img', 'sup', 'sub', 'code', 'pre', 'blockquote', 'a', 'article', 'audio', 'b', 'br', 'strong', 'u', 'i', 'canvas', 'svg', 'button', 'caption', 'cite', 'col', 'colgroup', 'dd', 'del', 'dl', 'dt', 'em', 'embed', 'fieldset', 'input', 'select', 'textarea', 'video', 'figcaption', 'form', 'footer', 'header', 'iframe', 'li', 'ul', 'ol', 'label', 'nav', 'mark', 'legend', 'object', 'optgroup', 'option', 'param', 'q', 'cite', 's', 'small', 'source', 'table', 'tbody', 'tfoot', 'td', 'tr', 'thead', 'th', 'track', 'title', 'var' );

  if( isset( $toStr ) && !$toStr ){
    return $tags;

  }
  $_tags = '';

  foreach( $tags as $tag ){
    $_tags .= "<{$tag}>"; 

  }
  return $_tags;

}

function comet_inline_tags( $toString = true ){

  $tags = array( 'span', 'img', 'sup', 'sub', 'code', 'a', 'b', 'br', 'strong', 'u', 'i', 'del', 'em', 'li', 'ul', 'ol', 'small', 'strike' );

  if( is_bool( $toString ) && !$toString ){
    return $tags;

  }
  $_tags = '';

  foreach( $tags as $tag ){
    $_tags .= "<{$tag}>"; 

  }
  return $_tags;

}

function comet_js( $id = null, $public = true ){
  global $comet_lib;

  $path = COMET_PATH;
  $js = "{$comet_lib}\Comet_Js";
  $file = "{$path}includes/class-js.php";

  return ( !( $js = comet_requires( $js, $file ) ) || !( $_js = new $js( $id, $public ) ) || !( $_js instanceof $js ) ? false : $_js->get_data() );

}

function comet_elements(){
  global $comet_lib;

  $path = COMET_PATH;

  return comet_autoload( "{$comet_lib}\Comet_Elements", "{$path}includes/class-elements.php" );

}

function comet_get_elements_data(){

  return ( !( $elements = comet_elements() ) ? false : $elements->get_elements_data() );

}

function comet_get_element_data( $slug ){

  return ( !( $elements = comet_elements() ) ? false : $elements->get_element_data( $slug ) );

}

function comet_get_elements(){

  return ( !( $elements = comet_elements() ) ? false : $elements->get_elements() );

}

function comet_get_element( $slug ){

  return ( !( $elements = comet_elements() ) ? false : $elements->get_element( $slug ) );

}

function comet_get_element_ajax( $slug = '', $id = null, $data ){

  if( !( $element = comet_get_element( $slug ) ) || !( $element instanceof $slug ) || !method_exists( $element, 'ajax' ) ){
    return false;

  }
  return $element->ajax( $id, $data );

}

function comet_get_i18n( $type = null ){
  global $comet_lib;

  $path = COMET_PATH;
  $i18n = "{$comet_lib}\Comet_i18n";
  $file = "{$path}includes/class-i18n.php";

  return ( !( $i18n = comet_requires( $i18n, $file ) ) || !( $_i18n = new $i18n( $type ) ) || !( $_i18n instanceof $i18n ) ? false : $_i18n );

}

function comet_requires( $className, $file ){

  if( !is_string( $className ) || !is_string( $file ) || !file_exists( $file = trim( $file ) ) ){
    return false;

  }
  require_once $file;
  return ( class_exists( $className ) ? $className : false );

}

function comet_autoload( $className, $file ){

  return ( !( $class = comet_requires( $className, $file ) ) || !( $_class = new $class ) || !( $_class instanceof $class ) ? false : $_class );

}

?>
