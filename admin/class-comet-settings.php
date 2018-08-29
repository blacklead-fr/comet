<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Settings {

  public function render(){

    $settings = self::settings();
    $options = get_option( 'comet_settings' );
    $_options = self::manage_options();

    if( !$_options ){
      $state = 'error';
      $m = __( 'Settings have not been saved.', 'comet' );
    }elseif( is_array( $_options ) ){
      $state = 'success';
      $m = __( 'Settings have been saved successfully.', 'comet' );
      $options = $_options;
    }
    

    echo '<form id="comet-settings" class="comet-dashCtntBoxed" action="' . esc_url( comet_getAdminPageUrl( 'settings' ) ) . '" method="post">';
    if( isset( $m ) && is_string( $m ) && isset( $state ) && is_string( $state ) ){
      echo comet_message( $m, $state );
    }

    foreach( $settings as $id => $setting ){
      if( !isset( $setting['type'] ) ){
        continue;
      }
      echo '<div class="comet-setting comet-row col2">';

      echo '<div class="comet-settingBlock first comet-column col1">';
      if( isset( $setting['title'] ) ){
        echo '<label for="' . $id . '">' . $setting['title'] . '</label>';
      }

      if( isset( $setting['desc'] ) ){
        echo '<div class="comet-settingDesc">' . trim( $setting['desc'] ) . '</div>';
      }
      echo '</div>';

      echo '<div class="comet-settingBlock last comet-column col2">';

      $type = $setting['type'];
      $std = isset( $setting['std'] )? $setting['std'] : '';
      if( !isset( $options[$id] ) && $type !== 'checkbox' ){
        $options[$id] = $std;
      }elseif( isset( $options[$id] ) && $type !== 'checkbox' ){
        $options[$id];
      }

      $field_class = 'comet-field';

      if ( array_key_exists( 'class', $setting ) &&  strlen( trim( $setting['class'] ) ) > 0 )
        $field_class = ' ' . $setting['class'];

      switch( $type ){
        case 'checkbox':
          if( !isset( $setting['choices'] ) || !is_array( $setting['choices'] ) ){
            break;
          }
          $choices = $setting['choices'];
          $i = 0;
          foreach ( $choices as $value => $label ){
            $checked = (isset($options[$value])? checked( $options[$value], 1, false ) : '');
            echo '<div class="comet-fieldCheckbox">';
            echo '<input class="' . $field_class . '" type="checkbox" name="comet_settings[' . $value . ']" id="' . $value . '" value="1" ' . $checked . '/>';
            echo '<label for="' . $value . '" class="comet-middleIb">' . $label . '</label>'; 
            echo '</div>';
            $i++;
          }
          break;
        case 'select':
          if( !isset( $setting['choices'] ) || !is_array( $setting['choices'] ) ){
            break;
          }
          $choices = $setting['choices'];
          echo '<select class="select' . $field_class . '" name="comet_settings[' . $id . ']">';

          foreach ( $choices as $value => $label ){
            echo '<option value="' . esc_attr( $value ) . '"' . selected( $options[$id], $value, false ) . '>' . $label . '</option>';
          }

          echo '</select>';
          break;
        case 'radio':
          $i = 0;
          if( !isset( $setting['choices'] ) || !is_array( $setting['choices'] ) ){
            break;
          }
          $choices = $setting['choices'];

          foreach ( $choices as $value => $label ){
            $classToAdd = $options[$id] === $value ? ' comet-field-radio-active' : NULL;
            echo '<label for="' . $id . $i . '" class="comet-field-radio'.$classToAdd.'">';
            if( isset( $setting['icon'] ) && strlen( trim( $setting['icon'] ) ) > 0 ){
              echo '<div class="comet-radio-icon"></div>';
            }

            echo '<span>'. $label . '</span>';
            echo '<input class="' . $field_class . '" type="radio" name="comet_settings[' . $id . ']" id="' . $id . $i . '" value="' . esc_attr( $value ) . '" ' . checked( $options[$id], $value, false ) . '>';
            echo '</label>';

            $i++;
          }
          break;
        case 'number':
          echo '<input class="comet-middleIb ' . $field_class . '" type="number" id="' . $id . '" name="comet_settings[' . $id . ']" placeholder="' . $std . '" value="' . esc_attr( $options[$id] ) . '" />';
          if( isset( $setting['label_is'] ) ){
            echo '<label for="' . $id . '" class="comet-middleIb">' . $setting['label_is'] . '</label>';
          }
          break;
        case 'text':
        default:
          echo '<input class="' . $field_class . '" type="text" id="' . $id . '" name="comet_settings[' . $id . ']" placeholder="' . $std . '" value="' . esc_attr( $options[$id] ) . '" />';
      }

      echo '</div>';
      echo '</div>';
    }
    echo '<button name="submit" class="comet-button comet-buttonPrimary">' . __( 'Save', 'comet' ) . '</button>';
    echo '<input type="hidden" id="comet-nonce" name="comet-nonce" value="' . wp_create_nonce( 'comet-nonce' ) . '" />';
    echo '</form>';
  }

  private function manage_options(){
    $p = $_POST;
    $options_name = 'comet_settings';

    if( !is_array( $p ) || !isset( $p[$options_name] ) || !is_array( $p[$options_name] ) ){
      return 'init';
    }
    
    if( !check_admin_referer( 'comet-nonce', 'comet-nonce' ) ){
      return false;
    }

    $options = $p[$options_name];
    foreach( $options as $id => $value ){
      $settings[$id] = sanitize_text_field( $value );
    }

    $e = update_option( 'comet_settings', $settings );

    if( $e ){
      return $settings;
    }
    return false;
  }

  private function settings(){

    $settings = array();

		$settings['post_types'] = array(
      'section' => 'general',
			'title'   => __( 'Post Types', 'comet' ),
			'desc'    => __( 'Check post types you want Comet works with.', 'comet' ),
			'type'    => 'checkbox',
			'str'     => 'apt_post',
			'choices' => comet_get_post_types( 'apt_' )
		);

		/*$settings['integration'] = array(
			'section' => 'general',
			'title'   => __( 'Integration', 'comet' ),
			'desc'    => __( 'Check post types to enable automatic integration. Uncheck if your theme uses manual integration.', 'comet' ),
			'type'    => 'checkbox',
			'std'     => 'int_post',
			'choices' => self::comet_get_post_types( 'int_' )
    );

		$settings['width'] = array(
			'section' => 'general',
			'title'   => __( 'Width', 'comet' ),
			'desc'	=> __( 'Define the content width.', 'comet' ),
			'label_is'=> 'px',
			'type'    => 'number',
			'std'     => 1100
		);*/

		$settings['googlekey'] = array(
			'section' => 'general',
			'title'   => __( 'Google API key', 'comet' ),
			'desc'	  => __( 'Some Google products such Maps and Fonts require authentication.', 'comet' ) . ' <a target="_blank" href="'. esc_url( 'https://developers.google.com/maps/documentation/javascript/get-api-key' ). '">' . __( 'Read more', 'comet' ) . '</a>.',
			'type'    => 'text',
		);

		$settings['uninstall'] = array(
			'section' => 'general',
			'title'   => __( 'Uninstall (Deep)', 'comet' ),
      'desc'    => __( 'Check the box to completely remove all data on uninstall.', 'comet' ),
			'type'    => 'checkbox',
			'std'     => '0',
			'choices' => array(
        'uninstall' => __( 'Remove all data on uninstall ?', 'comet' )
      )
		);

    return $settings;
  }
}

function _comet_get_settings(){
  static $comet_settings = null;

  if ( is_null( $comet_settings ) ) {
    $comet_settings = new Comet_Settings();
  }
  return $comet_settings;
}
?>
