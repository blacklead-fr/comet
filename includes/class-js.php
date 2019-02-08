<?php
namespace Comet\Library;

if( !defined( 'ABSPATH' ) ){
	exit;

}

class Comet_Js {

	private $id = null;

	private $public = false;

	private $data = array();

	public function __construct( $id = null, $public = true ){

		$this->id = ( is_int( $id = intval( $id ) ) && $id > -1 ? $id : null );
		$this->public = is_bool( $public ) ? $public : true;

		if( $this->public ){
			$mth = array( 'post', 'settings', 'svgSets' );

		}else{
			$mth = array( 'i18n', 'post', 'settings', 'lib', 'svgSets' );

		}
		$this->data = !is_array( $this->data ) ? array() : $this->data;

		foreach( $mth as $m ){

			if( method_exists( $this, $m ) ){
				$this->data[$m] = call_user_func( array( $this, $m ) );

			}
		}

	}

	public function get_data(){
		return $this->data;

	}

	private function i18n(){

		return array(
			'cockpit'	=> array(
				'title'		=> __( 'Cockpit', 'comet' ),
				'clearNx'	=> __( 'Clear notifications', 'comet' ),
				'options'	=> array(
					'settings'	=> __( 'General settings', 'comet' ),
					'save'		=> __( 'Save as template', 'comet' ),
					'lib'		=> __( 'Template library', 'comet' ),
					'exit'		=> __( 'Exit', 'comet' ),
				)
			),
			'ui'		=> array(
				'locked'		=> __( 'Locked', 'comet' ),
				'unlocked'		=> __( 'Unlocked', 'comet' ),
				'cancel'		=> __( 'Cancel', 'comet' ),
				'done'			=> __( 'Done', 'comet' ),
				'save'			=> __( 'Save', 'comet' ),
				'update'		=> __( 'Update', 'comet' ),
				'close'			=> __( 'Close', 'comet' ),
				'desktop'		=> __( 'Desktop', 'comet' ),
				'tablet'		=> __( 'Tablet', 'comet' ),
				'mobile'		=> __( 'Mobile', 'comet' ),
				'browse'		=> __( 'Browse', 'comet' ),
				'remove'		=> __( 'Remove', 'comet' ),
				'delete'		=> __( 'Delete', 'comet' ),
				'edit'			=> __( 'Edit', 'comet' ),
				'bold'			=> __( 'Bold', 'comet' ),
				'italic'		=> __( 'Italic', 'comet' ),
				'st'			=> __( 'Strikethrough', 'comet' ),
				'ilink'			=> __( 'Insert link', 'comet' ),
				'tempname'		=> __( 'Template name', 'comet' ),
				'select'		=> __( 'Select', 'comet' ),
				'back'			=> __( 'Back', 'comet' ),
				'search'		=> __( 'Search', 'comet' ),
				'underline'		=> __( 'Underline', 'comet' ),
				'preview'		=> __( 'Preview', 'comet' ),
				'insert'		=> __( 'Insert', 'comet' ),
				'elements'		=> __( 'Elements', 'comet' ),
				'layout'		=> __( 'Layout', 'comet' ),

			),
			'titles'	=> array(
				'selimg'      => __( 'Select an image', 'comet' ),
				'mytemp'      => __( 'My templates', 'comet' ),
				'ptemp'       => __( 'Previewing template', 'comet' ),
				'santemp'     => __( 'Save as new template', 'comet' ),
				'editItem'    => __( 'Item settings', 'comet' ),
			),
			'messages'	=> array(
				'searchEl'		=> __( 'Search an element...', 'comet' ),
				'searchTemp'	=> __( 'Search a template...', 'comet' ),
				'searchIcon'	=> __( 'Search an icon...', 'comet' ),
				'unreach'    => __( 'Unreachable content.', 'comet' ),
				'leave'      => __( 'Are you sure you want to exit ?', 'comet' ),
				'clear'      => __( 'Are you sure you want to clear all?', 'comet' ),
				'santemp'    => __( 'Save this page as new template and re-use it on any page or sites you want.', 'comet' ),
				'rmtemp'     => __( 'Read more about templates', 'comet' ),
				'notSaved'   => __( 'Save operation has failed.', 'comet' ),
				'noTitle'    => __( 'The title is missing.', 'comet' ),
				'empty'      => __( 'Failed to save empty content.', 'comet' ),
				'success'    => array(
					'savePost'  => __( 'The post has been correctly saved.', 'comet' ),
				),
				'error'      => array(
					'savePost'  => __( 'The post has not been saved.', 'comet' ),
				)
			),
			'options'	=> array(
				'section'   => array(
					'edit' => __( 'Section settings', 'comet' ),
					'move' => __( 'Move section', 'comet' ),
					'dup'  => __( 'Duplicate section', 'comet' ),
					'del'  => __( 'Delete section', 'comet' ),
				),
				'row'       => array(
					'edit' => __( 'Row settings', 'comet' ),
					'move' => __( 'Move row', 'comet' ),
					'dup'  => __( 'Duplicate row', 'comet' ),
					'del'  => __( 'Delete row', 'comet' ),
				),
				'column'    => array(
					'edit' => __( 'Column settings', 'comet' ),
					'move' => __( 'Move column', 'comet' ),
					'dup'  => __( 'Duplicate column', 'comet' ),
					'del'  => __( 'Delete column', 'comet' ),
				),
				'element'   => array(
					'edit' => __( 'Element settings', 'comet' ),
					'move' => __( 'Move element', 'comet' ),
					'dup'  => __( 'Duplicate element', 'comet' ),
					'del'  => __( 'Delete element', 'comet' ),
				)
			)

		);

	}

	private function post(){

		return ( ( $post = comet_get_post( $this->id ) ) ? $post->get_post() : false );

	}

	private function settings(){

		$elements = comet_get_elements_data();

		if( $this->public ){

			return array(
				'elements'	=> $elements 
			);

		}
		$layout = comet_layout();

		return array(
			'elements'	=> $elements,
			'section'	=> is_array( $data = $layout->get_type_data( 'section' ) ) ? $data['tabs'] : array(),
			'row'		=> is_array( $data = $layout->get_type_data( 'row' ) ) ? $data['tabs'] : array(),
			'column'	=> is_array( $data = $layout->get_type_data( 'column' ) ) ? $data['tabs'] : array()
		);

	}

	private function lib(){
		$opt = get_option( 'comet_settings' );
		$api = 'googlekey';

		return array(
			'admin_url'	=> get_admin_url(),
			'apikey'	=> ( is_array( $opt ) && ( $api = $opt[$api] ) !== null && is_string( $api ) ? trim( strip_tags( $api ) ) : '' )
		);

	}

	private function svgSets(){

		return comet_get_iconsets();

	}

}
?>