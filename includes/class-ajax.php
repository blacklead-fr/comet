<?php
namespace Comet;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Ajax {

	public function __construct(){

        add_action( 'wp_ajax_cometprivactions', array( $this, 'priv' ) );
        add_action( 'wp_ajax_nopriv_cometnoprivactions', array( $this, 'nopriv' ) );

    }

    private function _element( $p ){

        if( !isset( $p['element'] ) || !isset( $p['id'] ) ){
            return __( 'Unregistered element.', 'comet' );

        }
        $element = is_string( $p['element'] ) ? trim( $p['element'] ) : '';
        $id = is_integer( $id = (int)$p['id'] ) && $id > -1 ? $id : null;
        return comet_get_element_ajax( $element, $id, ( isset( $p['data'] ) && ( $data = comet_parse_json( $p['data'] ) ) ? $data : array() ) );

    }

    private function _data( $p ){
        $public = isset( $p['public'] ) ? filter_var( $p['public'], FILTER_VALIDATE_BOOLEAN ) : true;
        $id = isset( $p['id'] ) && is_integer( $id = (int)$p['id'] ) && $id > -1 ? $id : null;

        if( $id === null ){
            return __( 'Failed trying to pick data up.', 'comet' );

        }
        $r = comet_js( $id, $public );
        return is_array( $r ) ? json_encode( $r ) : false;

    }

    public function nopriv(){
        $p = is_array( $_POST ) ? $_POST : array();

        if( $p['action'] !== 'cometnoprivactions' || !isset( $p['do'] ) ){
            echo __( 'Error', 'comet' );
            wp_die();

        }

        switch( is_string( $p['do'] ) ? trim( strtolower( $p['do'] ) ) : '' ){
            case 'element':
            echo $this->_element( $p );
            break;

            case 'data':
            echo $this->_data( $p );
            break;
            
            default:

            echo __( 'Wrong request.', 'comet' );
            break;

        }
        wp_die();

    }

    public function priv(){
        $p = is_array( $_POST ) ? $_POST : array();

        if( $p['action'] !== 'cometprivactions' || !isset( $p['do'] ) ){
            echo __( 'Error', 'comet' );
            wp_die();

        }

        if( !isset( $p['security'] ) || !check_ajax_referer( 'comet-ajax-nonce', 'security', false ) ){
            echo __( 'Access denied', 'comet');
            wp_die();

        }

        switch( is_string( $p['do'] ) ? trim( strtolower( $p['do'] ) ) : '' ){

            case 'element':
            echo $this->_element( $p );
            break;

            case 'data':
            echo $this->_data( $p );
            break;

            case 'templates':
            $r = 0;

            if( isset( $p['data'] ) && $p['data'] === 'cus' && ( $templates = comet_get_mytemplates( null, false ) ) ){
                $r = json_encode( $templates );

            }
            echo $r;
            break;

            case 'dtemplate':

            echo ( isset( $p['id' ] ) && ( $post = comet_get_post( $p['id' ] ) )->has_post() && $post->delete_post() ? 1 : 0 );
            break;

            case 'save':

            if( isset( $p['data'] ) && ( $data = comet_parse_json( $p['data'] ) ) ){
                $id = isset( $p['id' ] ) ? $p['id'] : -1;
                $post = comet_get_post( $id );
                echo $post->save_post( $data );
                break;

            } 
            echo 0;
            break;

            case 'get':

            $meta = isset( $p['meta'] ) && in_array( $p['meta'], [ 'true', 'TRUE', true, 1 ] ) ? true : false;

            echo ( isset( $p['id' ] ) && ( $post = comet_get_post( $p['id' ] ) )->has_post() ? json_encode( $post->get_post( $meta ) ) : 0 );
            break;

            case 'sfonts':
            $r = -1;

            if( current_user_can( 'manage_options' ) && isset( $p['data'] ) && is_array( $data = comet_parse_json( $p['data'] ) ) ){
                update_option( 'comet_fonts', $data );
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
