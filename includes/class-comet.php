<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 * @subpackage Comet/includes
 * @author     blacklead <contact@blacklead.fr>
 */
class Comet {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Comet_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Plugin directory path.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $dir_path    Plugin directory path from the current file.
	 */
	private $dir_path;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		
		if ( defined( 'COMET_VERSION' ) ) {
			$this->version = COMET_VERSION;
		} else {
			$this->version = '1.0.1';
		}
		$this->plugin_name = 'comet';
		$this->dir_path = plugin_dir_path( dirname( __FILE__ ) );

		$this->load_dependencies();
		$this->define_includes_hooks();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Comet_Loader. Orchestrates the hooks of the plugin.
	 * - Comet_Includes. Defines all main hooks.
	 * - Comet_Admin. Defines all hooks for the admin area.
	 * - Comet_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once $this->dir_path . 'includes/class-comet-loader.php';

		/**
		 * Core functionalities of the plugin.
		 */
		require_once $this->dir_path . 'includes/comet-includes-functions.php';
		require_once $this->dir_path . 'includes/class-comet-includes.php';
		require_once $this->dir_path . 'includes/class-comet-ajax.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once $this->dir_path . 'admin/class-comet-admin.php';
		if( is_admin() ){
			require_once $this->dir_path . 'admin/comet-admin-functions.php';
		}

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once $this->dir_path . 'public/class-comet-public.php';

		$this->loader = new Comet_Loader();

	}

	/**
	 * Register all of the hooks related to the main functionalities
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_includes_hooks() {

		$plugin_includes = new Comet_Includes( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'plugins_loaded', $plugin_includes, 'load_plugin_textdomain' );
		$this->loader->add_action( 'init', $plugin_includes, 'init', 99 );
		$this->loader->add_action( 'init', $plugin_includes, 'register' );
		$this->loader->add_filter( 'the_content', $plugin_includes, 'content' );
		$this->loader->add_filter( 'wp_insert_post_data', $plugin_includes, 'cache_templates' );
		$this->loader->add_filter( 'template_include', $plugin_includes, 'view_template');
		
		$ajax = new Comet_Ajax( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'wp_ajax_comet_ajax', $ajax, 'comet_ajax' );
		$this->loader->add_action( 'wp_ajax_nopriv_comet_ajax', $ajax, 'comet_ajax' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Comet_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'init', $plugin_admin, 'init' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'admin_menu' );
		$this->loader->add_filter( 'admin_body_class', $plugin_admin, 'body_class' );
		$this->loader->add_filter( 'replace_editor', $plugin_admin, 'editor', 10, 2 );
	 
		$this->loader->add_filter( 'page_row_actions', $plugin_admin, 'action', 10, 2 );
		$this->loader->add_filter( 'post_row_actions', $plugin_admin, 'action', 10, 2 );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Comet_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Comet_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
