<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Main {

  public function render(){

    echo '<div id="comet-mapDashboard" class="comet-dashCtntBoxed">';
    echo '<div class="comet-row col2">';
    echo '<div class="comet-column col1">';
    echo $this->tour();
    echo $this->feedback();
    echo '</div>';
    echo '<div class="comet-column col2">';
    echo $this->learn();
    echo $this->support();
    echo '</div>';
    echo '</div>';
    echo '</div>';

  }

  private function tour(){

    $o1 = '<strong>' . __( 'Comet dashboard', 'comet' ) . '</strong> > <strong>' . __( 'Menu', 'comet' ) . '</strong> > <strong>' . __( 'Settings', 'comet' ) . '</strong>';
    $o2 = '<strong>' . __( 'Comet dashboard', 'comet' ) . '</strong> > <strong>' . __( 'Menu', 'comet' ) . '</strong> > <strong>' . __( 'Typography', 'comet' ) . '</strong>';
    $o3 = '<strong>' . __( 'Comet dashboard', 'comet' ) . '</strong> > <strong>' . __( 'Menu', 'comet' ) . '</strong> > <strong>' . __( 'Templates', 'comet' ) . '</strong>';

    $slides = array(
      array(
        'id'    => 'start',
        'title' => __( 'Getting started with Comet.', 'comet' ),
      ),
      array(
        'id'       => 'setup',
        'title'    => __( 'Setup', 'comet' ),
        'content'  => sprintf( __( 'Comet requires only one step to get it fully ready. To setup the general settings go to %s.', 'comet' ), $o1 ),
      ),
      array(
        'id'       => 'typography',
        'title'    => __( 'Typography', 'comet' ),
        'content'  => sprintf( __( 'Comet allows you to import fonts from Google Fonts easily and use them on your projects. To manage your fonts go to %s.', 'comet' ), $o2 ),
      ),
      array(
        'id'       => 'template',
        'title'    => __( 'Templates', 'comet' ),
        'content'  => sprintf( __( 'With Comet you can save your projects as templates for a later use. You can also edit, remove, export or import the templates. To manage your templates go to %s.', 'comet' ), $o3 ),
      ),
    );

    $total = count( $slides );

    $o = '<div id="comet-dashboardSlider" class="comet-dashboardWidget">';

    $n = 1;

    foreach( $slides as $id => $slide ){

      $hasT = isset( $slide['title'] ) && !empty( $slide['title'] ) ? true : false;
      $hasC = isset( $slide['content'] ) && !empty( $slide['content'] ) ? true : false;

      if( !$hasT && !$hasC ){
        continue;
      }

      $cl = 'comet-dashboardSlide';
      if( isset( $slide['id'] ) && !empty( $slide['id'] ) ){
        $cl .= ' comet-dashboardSlide' . ucfirst( trim( $slide['id'] ) );
      }

      $o .= '<div class="' . $cl . '">';
      $o .= '<div class="comet-dashboardSlideCount"><span>' . $n . '/' . $total . '</span></div>';
      if( $hasT ){
        $o .= '<h4>' . $slide['title'] . '</h4>';
      }
      if( $hasC ){
        $o .= '<p>' . $slide['content'] . '</p>';
      }
      $o .= '<div class="comet-dashboardSlideButtonset">';
      if( $n !== 1 ){
        $o .= '<button class="comet-dashboardSlideButton comet-prev comet-button">' . __( 'Back', 'comet' ) . '</button>';
      }
      if( $n !== $total ){
        $o .= '<button class="comet-dashboardSlideButton comet-next comet-button">' . __( 'Next', 'comet' ) . '</button>';
      }
      $o .= '</div>';
      $o .= '</div>';
      $n++;
    }
    $o .= '</div>';


    return $o;
  }

  private function feedback(){

    $o = '<div id="comet-dashboardFeedback" class="comet-dashboardWidget">';
    $o .= '<figure>';
    $o .= '<svg width="100" height="100" viewBox=" 0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <g>
     <polygon id="svg_4" points="175.5,102 175.31,102.455 175.27,102.577 175.23,102.664 175.19,102.732 175.03,102.951    174.9,103.105 151.91,125.938 157.76,158.629 157.73,158.609 157.71,158.6 149.52,154.42 128.27,143.555 99.63,159 99.62,159    99.04,159.235 99.06,159.093 99.17,158.346 99.18,158.288 102.71,136.679 103.52,131.759 104.595,126.42 96,117.94 96,117.93    80.775,103.44 80.563,103.33 80.65,103.15 80.66,103 80.67,103 85.14,102.47 87.96,102.095 96.47,100.897 96.56,100.854    96.9,100.682 113.41,98 113.43,98 113.77,98.445 116.82,91.578 117.01,91.379 127.71,69.205 127.92,68.872 128,68.8 128,68.79    127.91,68.66 127.895,68.54 138.263,89.33 142.666,98.16 174.533,102.205 175.49,102  " fill="#FFEA4B"/>
     <polygon id="svg_5" points="157.762,158.668 128.281,143.461 128.111,114.837  " fill="#F8D417"/>
     <polygon id="svg_6" points="128,114.83 128,114.84 99.365,158.55 99.032,159.1 99.026,159.13 99.163,158.35 99.176,158.29    102.708,136.68 103.314,131.75 104,126.42 104,126.39  " fill="#F8D417"/>
     <polygon id="svg_7" points="128.11,114.92 104.595,126.435 96,117.94 96,117.93 80.655,103.41 80.673,103.44 96.201,107.18    117.646,112.32 117.933,112.48 128.03,115 128.04,115  " fill="#F2A81D"/>
     <polygon id="svg_8" points="175.47,102.68 175.44,102.69 175.19,102.75 174.79,102.85 128.11,114.83 127.85,86.05 127.71,69.2    127.7,68.53 127.87,68.87 138.16,89.32 142.61,98.16 174.52,102.55 175.27,102.65 175.42,102.67  " fill="#F2A81D"/>
     <polygon id="svg_9" points="175.471,102.68 174.787,102.85 128.112,114.833 142.61,98.16 174.517,102.55  " fill="#F8D417"/>
     <polygon id="svg_10" points="80.67,103.1 80.9,103.16 80.6,103.2 80.53,103.21 80.66,103.1  " fill="#F8D417"/>
     <polygon id="svg_11" points="128.06,114.93 117.92,112.435 117.62,112.342 96.16,106.991 80.9,103.166 87.96,102.123    96.47,100.872 96.56,100.86 113.32,98.34 113.385,98.45 128,114.81 128,115 128.04,115  " fill="#F8D417"/>
     <polygon id="svg_13" points="95.92,123.27 95.83,123.42 95.81,123.45 95.8,123.48 95.79,123.5 95.71,123.61 95.68,123.65    95.65,123.69 92.98,126.63 84.91,135.52 88.62,151.47 88.61,151.46 85.93,150.26 73.72,144.725 60.01,153 60,153 60,153.27    60,153.21 59.871,153.2 59.94,152.97 60,152.82 60,152.79 61.64,136.96 57.029,133.01 49.23,126.26 49.154,126.2 49.218,126.13    49.244,126.09 51.432,125.68 53.201,125.33 56.971,124.6 57.01,124.57 57.17,124.61 65.23,123 65.24,123 65.42,123.08    66.75,119.555 66.84,119.417 71.54,108.219 71.795,108.039 72,107.99 72,107.98 71.785,107.92 71.703,107.86 77.296,117.83    79.663,122.07 95.462,123.32  " fill="#FFEA4B"/>
     <polygon id="svg_14" points="88.626,151.484 73.72,144.748 72.905,130.655  " fill="#F8D417"/>
     <polygon id="svg_15" points="72.91,130.65 59.89,152.92 59.83,153.03 59.73,153.2 59.72,153.21 59.86,152.96 60,152.82    60,152.79 62,136.96 62,136.95 73.12,130.66  " fill="#F8D417"/>
     <polygon id="svg_16" points="72.91,131 72.88,130.835 61.52,137.038 56.97,133.054 49.14,126.262 49.2,126.271 56.97,127.706    67.67,129.683 67.83,129.886 72.87,131  " fill="#F2A81D"/>
     <polygon id="svg_17" points="95.92,123.46 95.79,123.5 95.59,123.56 95.14,123.7 72.91,130.65 72.04,116.48 71.54,108.2    71.52,107.86 71.61,108.03 77.2,117.795 79.62,122 79.64,122 95.43,123 95.45,123 95.81,123.24  " fill="#F2A81D"/>
     <polygon id="svg_18" points="95.92,123.46 95.79,123.5 95.59,123.56 95.14,123.7 72.91,130.615 79.62,122 79.64,122 95.43,123    95.45,123 95.81,123.24  " fill="#F8D417"/>
     <polygon id="svg_19" points="49.24,126.09 49.34,126.11 49.21,126.13 49.18,126.14  " fill="#F8D417"/>
     <polygon id="svg_20" points="73,131 73,130.66 67.891,129.71 67.7,129.68 56.984,127.6 49.348,126.11 53.204,125.33    56.972,124.58 57.011,124.57 65.201,122.91 65.306,122.96 73,130.64 73,131  " fill="#F8D417"/>
     <polygon id="svg_22" points="203.783,123.268 203.693,123.422 203.659,123.478 203.569,123.609 203.508,123.686    192.768,135.516 196.482,151.466 196.466,151.455 181.576,144.801 167.865,153.147 167.859,153.147 167.577,153.269    167.623,152.822 169.376,136.965 164.826,133.015 164.826,133.009 157.058,126.255 157.001,126.204 157.068,126.134    157.097,126.086 157.103,126.086 159.284,125.684 164.826,124.605 165.029,124.463 173.092,122.704 173.103,122.704    173.283,122.935 173.283,122.929 174.608,119.479 174.698,119.383 179.484,107.989 179.484,107.983 179.462,107.921    179.464,107.859 185.106,117.833 187.502,122.072 203.307,123.321 203.777,123.268  " fill="#FFEA4B"/>
     <polygon id="svg_23" points="196.484,151.484 181.578,144.748 180.764,130.655  " fill="#F8D417"/>
     <polygon id="svg_24" points="180.764,130.653 167.747,152.917 167.577,153.209 167.623,152.792 169.376,136.95  " fill="#F8D417"/>
     <polygon id="svg_25" points="180.764,130.653 169.376,136.95 164.826,133.015 164.826,133.009 157.001,126.244 157.058,126.255    164.826,127.699 175.532,129.683 175.685,129.711 180.725,130.647  " fill="#F2A81D"/>
     <polygon id="svg_26" points="203.777,123.459 203.445,123.56 180.764,130.653 179.901,116.485 179.377,107.859 185.061,117.833    187.479,122.072 203.304,123.419  " fill="#F2A81D"/>
     <polygon id="svg_27" points="203.777,123.459 203.445,123.56 180.764,130.653 187.479,122.072 203.304,123.419  " fill="#F8D417"/>
     <polygon id="svg_28" points="180.736,130.658 175.685,129.711 164.826,127.603 157.103,126.086 157.097,126.086    157.035,126.143 164.826,124.582 173.058,122.906 173.103,122.96 180.725,130.643  " fill="#F8D417"/>
    </g>
   </svg>';
    $o .= '</figure>';
    $o .= '<aside>';
    $o .= '<h4>' . __( 'Thank you for using Comet!', 'comet' ) . '</h4>';
    $o .= '<p>' . __( 'Please tell us what you think about Comet.', 'comet' ) . '</p>';
    $o .= '<a class="comet-button" href="' . esc_url( 'https://wordpress.org/support/plugin/comet-lite/reviews/?filter=5#new-post' ) . '" target="_blank">' . __( 'Rate Comet', 'comet' ) . '</a>';
    $o .= '</aside>';
    $o .= '</div>';
    return $o;
  }

  private function learn(){

    $docs = array(
      array(
        'title' => __( 'Comet', 'comet' ),
        'desc'  => __( 'Know more about Comet and the features.', 'comet' ),
        'url'   => 'https://blacklead.fr/support/docs/comet',
      ),
      array(
        'title' => __( 'Dashboard overview', 'comet' ),
        'desc'  => __( 'Getting started with the major components of the UI.', 'comet' ),
        'url'   => 'https://blacklead.fr/support/docs/comet/user-interface/',
      ),
      /*array(
        'title' => __( 'Integration', 'comet' ),
        'desc'  => __( 'Make Comet works with your wordpress theme.', 'comet' ),
        'url'   => 'https://blacklead.fr/support/comet',
      ),*/
      array(
        'title' => __( 'Editor overview', 'comet' ),
        'desc'  => __( 'Learn to use the basic layout.', 'comet' ),
        'url'   => 'https://blacklead.fr/support/docs/comet/user-interface/',
      ),
    );

    $o = '<ul id="comet-dashboardLearn" class="comet-dashboardWidget">';

    foreach( $docs as $id => $doc ){

      $o .= '<li>';
      $o .= '<a href="' . esc_url( $doc['url'] ) . '" target="_blank">';
      $o .= '<h4>' . $doc['title'] . '</h4>';
      $o .= '<p>' . $doc['desc'] . '</p>';
      $o .= '</a>';
      $o .= '</li>';

    }

    $o .= '</ul>';

    return $o;

  }

  private function support(){

    $o = '<div id="comet-dashboardReadDoc" class="comet-dashboardWidget">';
    $o .= '<a target="_blank" href="' . esc_url( 'https://blacklead.fr/support/docs/comet' ) . '">' . __( 'Read the documentation', 'comet' ) . '</a>';
    $o .= '</div>';

    return $o;

  }
}

function _comet_get_main(){
  static $comet_main = null;

  if ( is_null( $comet_main ) ) {
    $comet_main = new Comet_Main();
  }
  return $comet_main;
}
?>
