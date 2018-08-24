<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Dashboard {

  private function menu(){
    return array(
      array(
        'menu_title' => __( 'Dashboard', 'comet' ),
        'page_title' => __( 'Dashboard', 'comet' ),
        'slug'       => '',
        'callback'   => 'comet_page_main',
        'help'       => '<p>' . __( 'Welcome to your Comet dashboard! This screen gives you access to the general features of Comet.', 'comet' ) . '<br><br>' . __( 'The Comet logo at the top left is the main menu and provides links to all of the Comet administration screens.', 'comet' ) . '<br><br>' . __( 'The cross at the top right allows you to close the Comet dashboard.', 'comet' ) . '</p>',
      ),
      array(
        'menu_title' => __( 'Templates', 'comet' ),
        'page_title' => __( 'My templates', 'comet' ),
        'slug'       => 'mytemplates',
        'callback'   => 'comet_page_mytemplates',
        'cap'        => 'manage_options',
      ),
      array(
        'menu_title' => __( 'Typography', 'comet' ),
        'page_title' => __( 'Typography', 'comet' ),
        'slug'       => 'typography',
        'callback'   => 'comet_page_typography',
        'cap'        => 'manage_options',
        'help'       => '<p>' . __( 'All the fonts you’ve downloaded are listed here and loaded on your site. Comet provides standard set of fonts but not listed on this screen.', 'comet' ) . '<br><br>' . __( 'The fonts library allows you to select fonts to download from Google fonts and remove fonts of your list.', 'comet' ) . '<br><br>' . __( 'Note that the fonts affect page load performance (load time).', 'comet' ) . '</p>',
      ),
      array(
        'menu_title' => __( 'Settings', 'comet' ),
        'page_title' => __( 'General settings', 'comet' ),
        'slug'       => 'settings',
        'callback'   => 'comet_page_settings',
        'cap'        => 'manage_options',
      )
    );

  }
  

  private function navigation(){
    $menu = $this->menu();
    $o = '<ul id="comet-dashboardSidebarMenu" class="comet-row col2">';
    foreach( $menu as $item => $info ){
      if( isset( $info['cap'] ) && is_string( $info['cap'] ) && !current_user_can( $info['cap'] ) ){
        continue;
      }
      $url = esc_url( comet_getAdminPageUrl( $info['slug'] ) );
      $o .= '<li class="comet-dashboardSidebarMenuItem comet-column"><a href="'. $url .'">' . $info['menu_title'] . '</a></li>';
    }
    $o .= '</ul>';
    return $o;

  }
  

  public function render() {
    $menu = $this->menu();

    $d = 0;
    foreach( $menu as $item => $values ){
      if( isset( $values['slug'] ) && comet_is_screen( $values['slug'] ) ){
        $d = $item;
        break;
      }
    }

    echo '<div id="comet-dashboard">';
    echo '<div id="comet-dashboardHeader" class="comet-row col3">';

    echo '<div class="comet-column col1 text-left">';
    echo '<div class="comet-middleIb comet-dashTopBarMenuPop">';
    echo '<a href="#" id="comet-doSidebarOpen" class="comet-dashTopBarItem"><span class="comet-icon cico cico-comet"></span></a>';
    echo '<div id="comet-dashboardSidebar">';
    echo '<div>';
    echo '<button id="comet-doSidebarClose" class="comet-button comet-buttonPrimary"><span class="comet-icon dashicons dashicons-arrow-left-alt"></span>' . __( 'Close', 'comet' ) . '</button>';
    echo $this->navigation();
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '</div>';

    echo '<div class="comet-column col2 text-center">';
    echo '<h1>' . $menu[$d]['page_title'] . '</h1>';
    echo '</div>';

    echo '<div class="comet-column col3 text-right">';
    echo '<div class="comet-middleIb comet-dashTopBarMenuPop comet-tooltip">';
    echo '<a href="#" class="comet-dashTopBarItem comet-buttonTooltip"><span class="comet-icon">?</span></a>';
    echo '<div class="comet-innerTooltip">';
    echo '<div class="comet-headerTooltip comet-blockTooltip">';
    echo '<h4>' . __( 'Help', 'comet' ) . '</h4>';
    echo '</div>';
    if( isset( $menu[$d]['help'] ) && !empty( $menu[$d]['help'] ) ){
      echo '<div class="comet-mainTooltip comet-blockTooltip">' . $menu[$d]['help'] . '</div>';
    }
    echo '<div class="comet-footerTooltip comet-blockTooltip">';
    echo '<a class="comet-linkTooltip" href="' . esc_url( 'https://blacklead.fr/support/docs/comet' ) . '" target="_blank">' . __( 'Documentation', 'comet' ) . '<span class="dashicons dashicons-arrow-right-alt2"></span></a>';
    echo '<a class="comet-linkTooltip" href="' . esc_url( 'https://wordpress.org/support/plugin/comet-lite/' ) . '" target="_blank">' . __( 'Support', 'comet' ) . '<span class="dashicons dashicons-arrow-right-alt2"></span></a>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    echo '<div class="comet-middleIb comet-dashTopBarMenuPop">';
    echo '<a href="' . esc_url( get_admin_url() ) . '" class="comet-dashTopBarItem"><span class="comet-icon cico cico-x"></span></a>';
    echo '</div>';
    echo '</div>';


    echo '</div>';
    echo '<div id="comet-dashboardContent">';

    if( isset( $menu[$d]['cap'] ) && is_string( $menu[$d]['cap'] ) && !current_user_can( $menu[$d]['cap'] ) ){
      echo '<div class="comet-dashCtntBoxed">';
      echo comet_message( __( 'Access denied.', 'comet' ), 'warning' );
      echo '</div>';
    }else{
      if( isset( $menu[$d]['callback'] ) && $menu[$d]['callback'] !== false && function_exists( $menu[$d]['callback'] ) ){
        call_user_func( $menu[$d]['callback'] );
      }
    }
    echo '</div>';
    echo '</div>';
  }

}

function _comet_get_dashboard(){
  static $comet_dashboard = null;

  if ( is_null( $comet_dashboard ) ) {
    $comet_dashboard = new Comet_Dashboard();
  }
  return $comet_dashboard;
}
?>
