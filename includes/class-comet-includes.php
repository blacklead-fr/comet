<?php

/**
 * The general functionalities of the plugin.
 *
 * @link       https://blacklead.fr
 * @since      1.0.0
 *
 * @package    Comet
 * @subpackage Comet/includes
 * @author     blacklead <contact@blacklead.fr>
 */
class Comet_Includes {
	 
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
	 * Plugin directory url.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $dir_url    Plugin directory url from the current file.
	 */
	private $dir_url;

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
		$this->dir_url = plugin_dir_url( dirname( __FILE__ ) );

    }

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'comet',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}

	/**
	 * Allow new template on post types supported by Comet.
	 *
	 * @since     1.0.0
	 */ 
    public function init() {
		$post_types = comet_get_supported_post_types();

		if( is_array( $post_types ) ){
			foreach( $post_types as $post_type => $name ){
				add_filter( "theme_{$post_type}_templates", array( $this, 'templates' ), 10, 4 );
			}
		}
    }

	/**
	 * Register scripts and styles for back-end and front-end.
	 *
	 * @since     1.0.0
	 */ 
    public function register() {

		wp_register_style( 'cico', $this->dir_url . 'includes/css/cico' . $this->suffix . '.css', array(), '1.0.0', 'all' );
		wp_register_script( $this->plugin_name . '-elements', $this->dir_url . 'includes/js/comet-elements' . $this->suffix . '.js', array(), $this->version, true );
		wp_register_script( $this->plugin_name . '-public', $this->dir_url . 'public/js/comet-public' . $this->suffix . '.js', array(), $this->version, true );
		wp_register_script( $this->plugin_name . '-utils', $this->dir_url . 'includes/js/comet-utils' . $this->suffix . '.js', array( 'jquery', $this->plugin_name . '-elements', $this->plugin_name . '-public' ), $this->version, true );
		wp_register_style( $this->plugin_name . '-public', $this->dir_url . 'public/css/comet-public' . $this->suffix . '.css', array(), $this->version, 'all' );

    }

	/**
	 * Filter the content to add Comet.
	 *
	 * @since     1.0.0
	 */
	public function content( $content ) {
		
		$comet = comet_getPostMeta( get_the_ID() );

		if( is_array( $comet ) ){
			return comet_content();
		}

		return $content;

    }
    
    /**
     * Add new template to the dropdown. (Wordpress 4.7+).
     * 
     * @since   1.0.0
     */
    public function templates( $templates ) {
        $templates = is_array( $templates ) ? $templates : array();
        $templates['comet-fwtemplate.php'] = __( 'Comet (full width)', 'comet' );
        return $templates;
    }

    /**
     * Add new template to the cache.
     * 
     * @since   1.0.0
     */
    public function cache_templates( $atts ) {
        
        $cache_key = 'page_templates-' . md5( get_theme_root() . '/' . get_stylesheet() );
        
        $templates = wp_get_theme()->get_page_templates();
        if ( empty( $templates ) ) {
            $templates = array();
        }
        
        wp_cache_delete( $cache_key , 'themes');
        
        $templates = $this->templates( $templates );
        
        wp_cache_add( $cache_key, $templates, 'themes', 1800 );
        return $atts;
    }

    /**
     * Check if the template is assigned to the page.
     * 
     * @since   1.0.0
     */
    public function view_template( $template ) {
        global $post;

        if( !$post ){
            return $template;
        }
        $templates = $this->templates( array() );
        $meta = get_post_meta( $post->ID, '_wp_page_template', true );
    
        if( !isset( $templates[$meta] ) ){
            return $template;
        }
        $file = plugin_dir_path( __FILE__ ) . $meta;
    
        if( file_exists( $file ) ){
            return $file;
        }else{
            echo $file;
        }
        return $template;
    }

}
?>