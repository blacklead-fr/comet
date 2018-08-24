<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 * @subpackage Comet/admin
 * @author     blacklead <contact@blacklead.fr>
 */
 class Comet_Admin {
	 
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
	 * Debug suffix.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $suffix    Min suffix.
	 */
	private $suffix;

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
		$this->suffix = defined( 'COMET_DEBUG' ) && COMET_DEBUG ? '' : '.min';

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue() {

		wp_enqueue_style( 'cico' );
		
		if( !comet_is_dashboard() ){
			return;
		}

		if( is_rtl() ){
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/comet-admin-rtl' . $this->suffix . '.css', array(), $this->version, 'all' );

		}else{
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/comet-admin' . $this->suffix . '.css', array(), $this->version, 'all' );
		}
		

		if( comet_is_screen( 'typography' ) ){
			comet_enqueueTypography( comet_getRegisteredFonts() );
		}

	
		$data = self::data();

		wp_register_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/comet-admin' . $this->suffix . '.js', array( 'jquery' ), $this->version, true );
		wp_localize_script( $this->plugin_name, 'cometdata', $data );
		wp_enqueue_script( $this->plugin_name );
		
		if( comet_is_screen( 'mytemplates' ) ){
			wp_enqueue_script( $this->plugin_name . '-utils' );
		}
	}

	private function data(){
	
		$data = array(
			'svgSets' 	  => '',
			'admin_url'   => get_admin_url(),
			'edit_url' 	  => get_admin_url( null, 'post.php' ),
			'myTemplates' => comet_getAdminPageUrl( 'mytemplates' ),
			'fonts' 	  => comet_getRegisteredFonts(),
			'messages'    => array(
				'delete'    => __( 'Are you sure you want to delete permanently?', 'comet' ),
				'error'     => __( 'An error appears, please try again.', 'comet' ),
				'file'      => __( 'Select one or multiple template to import.', 'comet' ),
				'unreach' 	=> __( 'Unreachable content.', 'comet' ),
				'notDel'	=> __( 'Failed to delete.', 'comet'),
				'wait' 		=> __( 'Please wait while the operation is processing.', 'comet' ),
				'stDel' 	=> __( 'The template has been correctly deleted.', 'comet' ),
				'selFonts' 	=> __( 'Select fonts to import.', 'comet' ),
				'noTitle' 	=> __( 'The title is missing.', 'comet' ),
				'stNew' 	=> __( 'The template has been correctly created.', 'comet' ),
				'redirect'	=> __( 'You will be redirected to the edit page automatically. If it fails please click the link:', 'comet' ),
				'gtep' 		=> __( 'Go to the edit page', 'comet' ),
			),
			'titles' 	  => array(
				'ptemp'		=> __( 'Previewing template', 'comet' ),
				'delTemp' 	=> __( 'Delete template', 'comet' ),
				'expTemp' 	=> __( 'Export template', 'comet' ),
				'impTemp' 	=> __( 'Import template', 'comet' ),
				'selFonts' 	=> __( 'Select fonts', 'comet' ),
				'fonts'		=> __( 'Fonts', 'comet' ),
				'newTemp'	=> __( 'Create new template', 'comet' ),
			),
			'ui'     	  => array(
				'close'    => __( 'Close', 'comet' ),
				'cancel'   => __( 'Cancel', 'comet' ),
				'delete'   => __( 'Delete', 'comet' ),
				'done'     => __( 'Done', 'comet' ),
				'save'     => __( 'Save', 'comet' ),
				'import'   => __( 'Import', 'comet' ),
				'export'   => __( 'Export', 'comet' ),
				'search'   => __( 'Search...', 'comet' ),
				'select'   => __( 'Select', 'comet' ),
				'download' => __( 'Download', 'comet' ),
			)
		);

		$data = comet_scriptdata( $data );

		return $data;

	}

	public function admin_menu() {
		
		add_menu_page(
			'Comet',
			'Comet',
			'edit_posts',
			'comet',
			'comet_page_dashboard',
			'none',
			82
		);

	}
	
	public function create_post_types() {
		
		$labels = array(
			'name'                  => _x( 'My templates', 'Post Type General Name', 'comet' ),
	  		'singular_name'         => _x( 'My template', 'Post Type Singular Name', 'comet' ),
	  		'menu_name'             => __( 'My templates', 'comet' ),
	  		'name_admin_bar'        => __( 'My templates', 'comet' ),
	  		'archives'              => __( 'My templates', 'comet' ),
	  		'attributes'            => __( 'My templates', 'comet' ),
	  		'parent_item_colon'     => __( 'Parent template:', 'comet' ),
	  		'all_items'             => __( 'All templates', 'comet' ),
	   		'add_new_item'          => __( 'Add New template', 'comet' ),
	  		'add_new'               => __( 'Add New', 'comet' ),
  			'new_item'              => __( 'New template', 'comet' ),
	  		'edit_item'             => __( 'Edit template', 'comet' ),
			'update_item'           => __( 'Update template', 'comet' ),
  			'view_item'             => __( 'View template', 'comet' ),
	  		'view_items'            => __( 'View templates', 'comet' ),
	  		'search_items'          => __( 'Search template', 'comet' ),
  			'not_found'             => __( 'Not found', 'comet' ),
  			'not_found_in_trash'    => __( 'Not found in Trash', 'comet' ),
	  		'featured_image'        => __( 'Featured Image', 'comet' ),
	  		'set_featured_image'    => __( 'Set featured image', 'comet' ),
	  		'remove_featured_image' => __( 'Remove featured image', 'comet' ),
	  		'use_featured_image'    => __( 'Use as featured image', 'comet' ),
	  		'insert_into_item'      => __( 'Insert into template', 'comet' ),
	  		'uploaded_to_this_item' => __( 'Uploaded to this template', 'comet' ),
	  		'items_list'            => __( 'templates list', 'comet' ),
	  		'items_list_navigation' => __( 'templates list navigation', 'comet' ),
			'filter_items_list'     => __( 'Filter templates list', 'comet' ),
		);
		
		$args = array(
			'label'                 => __( 'My template', 'comet' ),
	  		'labels'                => $labels,
	  		'supports'              => array( 'title', 'author', 'custom-fields', ),
	  		'hierarchical'          => false,
	  		'public'                => false,
	  		'show_ui'               => true,
	  		'show_in_menu'          => false,
	  		'menu_position'         => 5,
	  		'show_in_admin_bar'     => false,
	  		'show_in_nav_menus'     => false,
  			'can_export'            => true,
	  		'has_archive'           => false,
	  		'exclude_from_search'   => true,
	  		'publicly_queryable'    => false,
	  		'rewrite'               => false,
	  		'capability_type'       => 'page',
			'show_in_rest'          => false,
		);
	
		register_post_type( 'comet_mytemplates', $args );
	}
	
	public function body_class( $classes ){

		$classes .= ' comet-adminDashboard ';

		return $classes;

	}

	public function editor( $a, $b ){
		
		if( isset( $_REQUEST['comet'] ) ){
			require_once 'class-comet-post-edit.php';

			if( class_exists( 'Comet_Post_Edit' ) ){
				$cpe = new Comet_Post_Edit( $this->plugin_name, $this->version, $b );
				$cpe->render();
			}
			return true;

		}
		return $a;

	}

	public function action( $actions, $post ){

		$opts = get_option( 'comet_settings' );

		$pt = 'apt_' . trim( $post->post_type );


		if( isset( $opts[$pt] ) && $opts[$pt] == '1' ){
			
			$url = esc_url( comet_getEditLink( $post->ID ) );
			$title = sprintf( __( 'Edit &#8220;%s&#8221; with Comet', 'comet' ), $post->post_title );
			$actions['comet'] = sprintf(
				'<a href="%s" aria-label="%s">%s</a>',
				esc_url( $url ),
				esc_attr( $title ),
				__( 'Edit with Comet', 'comet' )
			);
		}
		return $actions;
	}

	public function init(){
		self::create_post_types();
		require_once 'comet-preview.php';
	}

}
