<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Ajax {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
  }

  function comet_ajax() {

    if( $_POST['action'] !== 'comet_ajax' || !isset( $_POST['do'] ) ){
      echo __( 'Error on execution.', 'comet' );
      wp_die();
    }

    if( $_POST['do'] !== 'element' ){

      if( !current_user_can( 'edit_posts' ) ){
        echo __( 'User not allowed.', 'comet' );
        wp_die();
      }

      if( !isset( $_POST['nonce'] ) || !check_ajax_referer( 'comet-ajax-nonce', 'nonce', false ) ){
        echo __( 'This operation cannot be verified.', 'comet' );
        wp_die();
      }
    }

    switch( $_POST['do'] ){
      case 'element':
        if( isset( $_POST['element'] ) && isset( $_POST['id'] ) && isset( $_POST['data'] ) && is_array( $_POST['data'] ) ){
          require_once 'comet-elements.php';
          if( function_exists( trim( $_POST['element'] ) ) ){
            echo call_user_func( trim( $_POST['element'] ), $_POST['id'], $_POST['data'] );
            break;
          }
        }
        echo __( 'Nope', 'comet' );
        break;
      case 'templates':
        if( isset( $_POST['data'] ) && $_POST['data'] === 'cus' ){
          $templates = comet_get_templates();
          if( $templates->have_posts() ){
            $o = '';
            while( $templates->have_posts() ){
              $templates->the_post();
              $single = $templates->post;
              $id = $single->ID;
              $t = trim( get_the_title() );

              $o .= '<div class="comet-tempCollectionScope" data-id="' . $id . '" data-title="' . esc_attr( $t ) . '">';
              $o .= '<figure class="comet-tempFigure">';
              if( has_post_thumbnail( $id ) ){
                $o .= get_the_post_thumbnail( $id, 'full' );
              }else{
                $o .= '<span>#' . $id . '</span>';
              }
              $o .= '<div class="comet-tempUiElements">';
              $o .= '<button class="comet-tempItemInsert" data-id="' . $id . '"><span class="cico cico-dir-download"></span><span class="comet-tooltip">' . __( 'Insert', 'comet' ) . '</span></button>';
              $o .= '<button class="comet-tempItemPreview" data-id="' . $id . '"><span class="cico cico-eye"></span><span class="comet-tooltip">' . __( 'Preview', 'comet' ) . '</span></button>';
              $o .= '</div>';
              $o .= '</figure>';
              $o .= '<aside class="comet-tempTitle">';
              $o .= '<span>' . ucfirst( $t ) . '</span>';
              $o .= '</aside>';
              $o .= '</div>';
            }
            echo $o;
            wp_reset_postdata();
            break;
          }
        }
        echo __( 'Nope', 'comet' );
        break;
      case 'dtemplate':
          $r = 'false';
          if( isset( $_POST['id'] ) ){
            $p = comet_deleteMyTemplate( $_POST['id'] );
            if( $p || is_array( $p ) || is_object( $p ) ){
              $r = 'true';
            }
          }
          echo $r;
          break;
      case 'save':
        $r = 0;
        $d = isset( $_POST['data'] ) ? comet_parse_json( $_POST['data'] ) : false;
  
        if( is_array( $d ) ){
          $r = comet_updatePost( $d );
        }
        echo $r;
      break;
      case 'meta':
        $r = 0;
        if( isset( $_POST['id'] ) ){
          $r = comet_getPostMeta( $_POST['id'] );
          if( is_array( $r ) ){
            echo json_encode( $r );
            break;
          }
          $r = 0;
        }
        echo $r;
      break;
      case 'get':
        $r = 0;
        if( isset( $_POST['id'] ) ){
          $r = comet_getPost( $_POST['id'] );
          if( is_object( $r ) ){
            echo json_encode( $r );
            break;
          }
          $r = 0;
        }
        echo $r;
      break;
      case 'sfonts':
        $r = -1;
        if( current_user_can( 'manage_options' ) && isset( $_POST['data'] ) && is_array( $_POST['data'] ) ){
          //$r = 33;
          update_option( 'comet_fonts', $_POST['data'] );
          $r = 1;
        }
        echo $r;
        break;
      default:
      break;
    }
    wp_die();
  }
}
?>
