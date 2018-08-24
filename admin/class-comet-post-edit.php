<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Post_Edit {
  
	/**
	 * The current plugin slug.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $slug
	 */
  private $slug;
  
	/**
	 * The current post array.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array    $post
	 */
  private $post;

	/**
	 * The version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version
	 */
	private $version;

	/**
	 * Debug suffix.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $suffix;

	/**
	 * Load elements data.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $elements;

	/**
	 * Load metadata.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string
	 */
	private $meta;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name
	 * @param      string    $version
	 * @param      string    $post
	 */
  public function __construct( $slug, $version, $post ){
    
    $this->slug = $slug;
    $this->post = $post;
		$this->version = $version;
    $this->suffix = defined( 'COMET_DEBUG' ) && COMET_DEBUG ? '' : '.min';
    $this->elements = comet_get_elements();
    $this->meta = comet_getPostMeta( $post->ID );

  }

  public function enqueue(){

    $data = self::data();
    
    wp_enqueue_media();
    wp_enqueue_style( 'cico' );
    comet_enqueueTypography( comet_getRegisteredFonts() );
    wp_register_script( 'spectrum', 'https://cdn.jsdelivr.net/npm/spectrum-colorpicker@1.8.0/spectrum.min.js', array( 'jquery' ), '1.8.0', true );
    wp_register_script( $this->slug . '-editor', plugin_dir_url( dirname( __FILE__ ) ) . 'includes/js/comet-editor' . $this->suffix . '.js', array( 'spectrum', $this->slug . '-utils' ), $this->version, true );
    wp_localize_script( $this->slug . '-editor', 'cometdata', $data );
    wp_enqueue_script( $this->slug . '-editor' );

    if( is_rtl() ){
      wp_enqueue_style( $this->slug . '-editor', plugin_dir_url( dirname( __FILE__ ) ) . 'includes/css/comet-editor-rtl' . $this->suffix . '.css', array( $this->slug . '-public' ), $this->version, 'all' );
    }else{
      wp_enqueue_style( $this->slug . '-editor', plugin_dir_url( dirname( __FILE__ ) ) . 'includes/css/comet-editor' . $this->suffix . '.css', array( $this->slug . '-public' ), $this->version, 'all' );
    }
 
  }
  
  private function data(){
    
    $post = $this->post;

    $post->meta = $this->meta;
    
    $data = array(
      'post'       => $post,
			'admin_url'  => get_admin_url(),
      'purl'       => comet_getPurl(),
      'elements'   => $this->elements,
      'section'    => comet_get_section(),
      'row'        => comet_get_row(),
      'column'     => comet_get_column(),
      'rtl'        => is_rtl() ? 'true' : 'false',
      'ui'         => array(
        'locked'      => __( 'Locked', 'comet' ),
        'unlocked'    => __( 'Unlocked', 'comet' ),
        'cancel'      => __( 'Cancel', 'comet' ),
        'done'        => __( 'Done', 'comet' ),
        'save'        => __( 'Save', 'comet' ),
        'update'      => __( 'Update', 'comet' ),
        'close'       => __( 'Close', 'comet' ),
        'desktop'     => __( 'Desktop', 'comet' ),
        'tablet'      => __( 'Tablet', 'comet' ),
        'mobile'      => __( 'Mobile', 'comet' ),
        'browse'      => __( 'Browse', 'comet' ),
        'remove'      => __( 'Remove', 'comet' ),
        'delete'      => __( 'Delete', 'comet' ),
        'edit'        => __( 'Edit', 'comet' ),
        'bold'        => __( 'Bold', 'comet' ),
        'italic'      => __( 'Italic', 'comet' ),
        'st'          => __( 'Strikethrough', 'comet' ),
        'ilink'       => __( 'Insert link', 'comet' ),
        'tempname'    => __( 'Template name', 'comet' ),
        'select'      => __( 'Select', 'comet' ),
        'back'        => __( 'Back', 'comet' ),
        'search'      => __( 'Search', 'comet' ),
        'underline'   => __( 'Underline', 'comet' ),
        'underline'   => __( 'Underline', 'comet' ),

      ),
      'titles'    => array(
        'selimg'      => __( 'Select an image', 'comet' ),
        'mytemp'      => __( 'My templates', 'comet' ),
        'ptemp'       => __( 'Previewing template', 'comet' ),
        'santemp'     => __( 'Save as new template', 'comet' ),
        'editItem'    => __( 'Item settings', 'comet' ),
      ),
      'messages'  => array(
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
      'options'   => array(
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

    $data = comet_scriptdata( $data );

    return $data;

  }

  private function header(){

    @header( 'Content-Type: ' . get_option( 'html_type' ) . '; charset=' . get_option( 'blog_charset' ) );

    if ( !defined( 'WP_ADMIN' ) ) {
      require_once( ABSPATH . 'wp-admin/admin.php' );
    }

    global $current_screen;

    if ( empty( $current_screen ) ) {
      set_current_screen();
    }

    $title = esc_html( strip_tags( get_the_title() ) );


    _wp_admin_html_begin();

    echo '<title>' . sprintf( __('%s &#8212; Comet', 'comet' ), $title ) . '</title>';


    $this->enqueue();

    echo '</head>';
    echo '<body>';
  }

  public function render(){

    $the_ID = get_the_ID();

    $this->header();

    $classes = 'comet wrap';
    $classes .= ' post-' . trim( $the_ID ); 

    if( is_rtl() ){
      $classes .= ' rtl';
    }

    echo '<div id="comet-editor" class="' . $classes . '">';
    $this->sidebar();
    echo comet_content();
    echo '</div>';

  }

  private function sidebar(){

    $elements = $this->elements;
    $options = $this->options();
    
    echo '<div id="comet-editorSidebar">';
    echo '<div id="comet-editorSidebarIn">';
    if( is_array( $elements ) ){
      
      echo '<button id="comet-editorSidebarToggle" class="comet-button" title="' . __( 'Elements', 'comet' ) .'"><span class="cico cico-elements"></span></button>';
      echo '<ul class="comet-editorElements">';
      echo '<li id="comet-editorAdd" title="' . __( 'Layout', 'comet' ) . '">';
      echo '<div class="comet-editorElementIcon">';
      echo '<span class="cico cico-layout"></span>';
      echo '</div>';
      echo '<h4>' . __( 'Layout', 'comet' ) . '</h4>';
      echo '</li>';
      
      foreach( $elements as $element => $values ){
        
        if( !isset( $values['name'] ) || !isset( $values['tabs'] ) || !is_array( $values['tabs'] ) ){
          continue;
        }
        
        $id = 'comet-elementPicker' . ucfirst( $element );
        $name = ucfirst( trim( $values['name'] ) );
        echo '<li id="' . $id . '" class="comet-editorElement" data-id="' . $element . '" title="' . $name . '">';
        echo '<div class="comet-editorElementIcon">';
        $icon = isset( $values['icon'] ) && !empty( $values['icon'] ) ? trim( $values['icon'] ) : 'cico-custom';
        echo '<span class="cico ' . $icon . '"></span>';
        echo '</div>';
        echo '<h4>' . $name . '</h4>';
        echo '</li>';
      }
      echo '</ul>';
    }
    echo '</div>';
    
    echo '<div id="comet-editorSidebarFooter">';
    echo '<button id="comet-editorSaveButton" class="comet-button comet-buttonPrimary"><span class="comet-edSbFtIcon cico cico-update"></span><span class="comet-edSbFtTitle">' . __( 'Save', 'comet' ) . '</span></button>';
    echo '<button id="comet-editorOptionsButton" class="comet-button comet-buttonPrimary comet-editorCockpitToggle" title="' . __( 'Cockpit', 'comet' ) . '"><span class="comet-edSbFtIcon cico cico-more"></span></button>';
    echo '</div>';
    echo '</div>';
    echo '<div id="comet-editorCockpit">';
    echo '<div class="comet-inner">';
    echo '<div class="comet-header">';
    echo '<h4>' . __( 'Cockpit', 'comet' ) . '</h4>';
    echo '<button class="comet-button comet-editorCockpitToggle" title="' . __( 'Close cockpit', 'comet' ) . '"><span class="cico cico-x"></span></button>';
    echo '<p><button id="comet-clearNotifications">' . __( 'Clear notifications', 'comet' ) . '</button></p>';
    echo '</div>';
    echo '<div id="comet-editorNotifications">';
    echo '</div>';
    echo '<div class="comet-footer">';
    if( is_array( $options ) ){
      foreach( $options as $option => $values ){
        
        if( !isset( $values['title'] ) || !isset( $values['id'] ) ){
          continue;
        }
        
        echo '<button id="' . trim( $values['id'] ) . '" class="comet-button comet-editorCockpitOption" title="' . trim( $values['title'] ) . '">';
        $icon = isset( $values['icon'] ) && !empty( $values['icon'] ) ? trim( $values['icon'] ) : 'cico-custom';
        echo '<span class="cico ' . $icon . '"></span>';
        echo '</button>';
      }
    }
    echo '</div>';
    echo '</div>';
    echo '<div class="comet-editorCockpitToggle"></div>';
    echo '</div>';
  }

  private function options(){
    $o = array(
      array(
        'id'    => 'comet-editorSaveTemplate',
        'title' => __( 'Save as template', 'comet' ),
        'icon'  => 'cico-dir-upload'
      ),
      array(
        'id'    => 'comet-editorTemplates',
        'title' => __( 'Templates library', 'comet' ),
        'icon'  => 'cico-directory'
      ),
      array(
        'id'    => 'comet-editorExit',
        'title' => __( 'Exit', 'comet' ),
        'icon'  => 'cico-power'
      )
    );

    return $o;

  }

}
?>
