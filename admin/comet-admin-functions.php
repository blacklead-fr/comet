<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function comet_is_actionIn( $action, $slug ){
  $g = isset( $_GET ) ? $_GET : null;
  if(    is_array( $g ) 
      && comet_is_screen( $slug )
      && isset( $g['action'] )
      && $g['action'] === $action
      && isset( $g['id'] )
      && is_numeric( $g['id'] ) ){
    return true;
  }
  return false;
}

function comet_is_screen( $slug ){
  $g = isset( $_GET ) ? $_GET : null;

  if(    is_array( $g ) 
      && comet_is_dashboard()
      && isset( $g['load'] )
      && $g['load'] === $slug ){
    return true;
  }
  return false;
}

function comet_is_dashboard(){
  $g = isset( $_GET ) ? $_GET : null;

  if(    is_array( $g ) 
      && isset( $g['page'] )
      && $g['page'] === 'comet' ){
    return true;
  }
  return false;

}

function comet_get_admin_pages(){
  if( function_exists( '_comet_get_admin_init' ) ){
    return _comet_get_admin_init()->pages();
  }
  return false;
}

function comet_page_dashboard(){
  require_once 'class-comet-dashboard.php';
  if( function_exists( '_comet_get_dashboard' ) ){
    return _comet_get_dashboard()->render();
  }
  return false;
}


function comet_page_main(){
  require_once 'class-comet-main.php';
  if( function_exists( '_comet_get_main' ) ){
    return _comet_get_main()->render();
  }
  return false;
}

function comet_page_mytemplates(){
  require_once 'class-comet-mytemplates.php';
  if( function_exists( '_comet_get_mytemplates' ) ){
    return _comet_get_mytemplates()->render();
  }
  return false;
}

function comet_page_typography(){
  require_once 'class-comet-typography.php';
  if( function_exists( '_comet_get_typography' ) ){
    return _comet_get_typography()->render();
  }
  return false;
}

function comet_page_settings(){
  require_once 'class-comet-settings.php';
  if( function_exists( '_comet_get_settings' ) ){
    return _comet_get_settings()->render();
  }
  return false;
}
?>
