<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Typography {

  public function render() {

    $fonts = comet_getRegisteredFonts( array() );

    $li = '';
    $total = 0;

    foreach( $fonts as $id => $font ){
      $f = explode( ':', $font );
      if( is_string( $f[0] ) && is_numeric( $f[1] ) ){
        $i = (int)$f[1];

        switch( $i ){
          case 100:
          case 200:
          case 300:
          case 400:
          case 500:
          case 600:
          case 700:
          case 800:
          case 900:
            break;
          default: 
            continue;
        }
        $li .= '<li><h4>' . $f[0] . ' ' . $i .'</h4>';
        $li .= '<p style="font-family:' . $f[0] . ';font-weight:' . $i . ';">';
        $li .= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        $li .= '</p>';
        $li .= '</li>';
        $total++;
      }
    }

    echo '<div id="comet-fonts" class="comet-dashCtntBoxed">';

    echo '<div class="comet-row col2">';
    echo '<div class="comet-column col1 text-left">';
    echo '<h4>' . sprintf( _n( '%s font', '%s fonts', $total, 'comet' ), $total ) . '</h4>';
    echo '</div>';
    echo '<div class="comet-column col2 text-right">';
    echo '<a id="comet-addFont" class="comet-button comet-buttonPrimary">' . __( 'Library', 'comet' ) . '</a>';
    echo '</div>';
    echo '</div>';

    echo '<ul id="comet-mapFonts">';
    echo $li;
    echo '</ul>';

    echo '</div>';
    
  }
}

function _comet_get_typography(){
  static $comet_typography = null;

  if ( is_null( $comet_typography ) ) {
    $comet_typography = new Comet_Typography();
  }
  return $comet_typography;
}
?>
