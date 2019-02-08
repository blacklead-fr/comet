<?php
namespace Comet\Library;

if( !defined( 'ABSPATH' ) ){
	exit;

}

class Comet_Iconsets {

    private $sets = [];

    public function __construct(){

        $path = COMET_PATH . 'includes/iconsets/';
        $np = '\Comet\Library\Iconsets';

        $this->add( 'fas', "{$np}\Fas", "{$path}fas.php" );

        $this->add( 'fab', "{$np}\Fab", "{$path}fab.php" );

        $this->add( 'far', "{$np}\Far", "{$path}far.php" );

        $this->add( 'fci', "{$np}\Fci", "{$path}fci.php" );

        $this->add( 'win10', "{$np}\Win10", "{$path}win10.php" );

    }

    private function sanitize_id( $id ){

        return ( is_string( $id ) ? preg_replace( '/(^[0-9]*|[^a-z0-9_]*)/i', '', $id ) : '' );

    }

    private function add( $id, $className, $file ){

        $id = $this->sanitize_id( $id );

        if( $this->set_exists( $id ) || !is_string( $className ) || !is_string( $file ) || !file_exists( $file = trim( $file ) ) ){
            return false;

        }

        $this->sets[$id] = [
            'class'     => $className,
            'file'      => $file
        ];

        return $this->sets[$id];

    }

    private function delete( $id ){

        if( $this->set_exists( $id ) ){
            unset( $this->sets[$id] );
            return true;

        }
        return false;


    }

    public function set_exists( $id ){

        return ( is_array( $this->sets ) && is_string( $id ) && isset( $this->sets[$id] ) );

    }

    public function get_registered_sets(){

        return ( $this->sets );

    }

    public function get_registered_set( $id ){

        return ( $this->set_exists( $id ) ? $this->sets[$id] : false );

    }

    public function get_sets(){

        $iconsets = [];

        if( is_array( $this->sets ) ){

            foreach( $this->sets as $id => $values ){

                if( !( $set = $this->get_set( $id ) ) ){
                    continue;

                }
                $iconsets[$id] = $set;

            }

        }
        return $iconsets;

    }

    public function get_set( $id ){

        if( !$this->set_exists( $id ) || !( $set = comet_autoload( $set['class'], $set['file'] ) ) ){
            return false;

        }

        return [
            'name'  => $set->get_name(),
            'set'   => $set->get_icons()

        ];

    }

}
?>