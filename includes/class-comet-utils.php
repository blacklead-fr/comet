<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_Utils {

  static protected function numbers( $label, $desc = '', $std = '0', $res = false ){
    $numbers = array(
      'label'  => $label,
      'desc'   => $desc,
      'std'    => $std,
      'type'   => 'numbers',
      'responsive' => $res || $res === 'true' || $res === 1 || $res === '1' ? 'true' : 'false',
      'values' => array(
        't'    => array(
          'label' => __( 'Top', 'comet' ),
          'std'   => $std,
        ),
        'r'  => array(
          'label' => __( 'Right', 'comet' ),
          'std'   => $std,
        ),
        'b' => array(
          'label' => __( 'Bottom', 'comet' ),
          'std'   => $std,
        ),
        'l'   => array(
          'label' => __( 'Left', 'comet' ),
          'std'   => $std,
        ),
      )
    );
    return $numbers;
  }

  static protected function backgroundPosition(){
    $position = array();

    for($choice = 1; $choice <= 9; $choice++){
      if($choice <= 3){
        $a = 'l';
      }elseif($choice > 3 && $choice <= 6){
        $a = 'r';
      }elseif($choice > 6 && $choice <= 9){
        $a = 'c';
      }

      if($choice === 1 || $choice === 4 || $choice === 7){
        $b = 't';
      }elseif($choice === 2 || $choice === 5 || $choice === 8){
        $b = 'c';
      }elseif($choice === 3 || $choice === 6 || $choice === 9){
        $b = 'b';
      }
      $id = "{$a}{$b}";
      $position[$id] = self::backgroundPositionName( $a, $b );
    }
    return $position;
  }

  static private function backgroundPositionName( $first, $second ){
    if( $first === 'l' ){
      if( $second === 't' ){
        return __( 'Left top', 'comet' );
      }
      if( $second === 'c' ){
        return __( 'Left center', 'comet' );
      }
      if( $second === 'b' ){
        return __( 'Left bottom', 'comet' );
      }
    }
    if( $first === 'r' ){
      if( $second === 't' ){
        return __( 'Right top', 'comet' );
      }
      if( $second === 'c' ){
        return __( 'Right center', 'comet' );
      }
      if( $second === 'b' ){
        return __( 'Right bottom', 'comet' );
      }
    }
    if( $first === 'c' ){
      if( $second === 't' ){
        return __( 'Top center', 'comet' );
      }
      if( $second === 'c' ){
        return __( 'Center', 'comet' );
      }
      if( $second === 'b' ){
        return __( 'Bottom center', 'comet' );
      }
    }
  }

  static protected function backgroundRepeat(){
    $repeat = array(
      'r'  => __( 'Repeat', 'comet' ),
      'x'  => __( 'Repeat horizontally', 'comet' ),
      'y'  => __( 'Repeat vertically', 'comet' ),
      's'  => __( 'Space', 'comet' ),
      'rd' => __( 'Round', 'comet' ),
      'no' => __( 'No repeat', 'comet' )
    );

	  return $repeat;
  }

  static function borderStyle(){
    $bs = array(
      'solid'  => __( 'Solid', 'comet' ),
      'dotted' => __( 'Dotted', 'comet' ),
		  'dashed' => __( 'Dashed', 'comet' ),
		  'double' => __( 'Double', 'comet' ),
		  'inset'  => __( 'Inset', 'comet' ),
		  'outset' => __( 'Outset', 'comet' ),
		  'none'   => __( 'None', 'comet' )
	  );

	  return $bs;
  }

  static function grid( $max = 3 ){
		for($count = 1; $count <= $max; $count++){
			$grid[$count] = sprintf( _n('1 column','%d columns', $count, 'comet' ), $count );
		}
    return $grid;
  }

  static function imageSizes(){
    global $_wp_additional_image_sizes;
    $sizes = array();
    foreach ( get_intermediate_image_sizes() as $_size ) {
      if( in_array( $_size, array('thumbnail', 'medium', 'medium_large', 'large') ) ){
        $width = get_option( "{$_size}_size_w" );
        $height = get_option( "{$_size}_size_h" );
      }elseif( isset( $_wp_additional_image_sizes[ $_size ] ) ){
        $width = $_wp_additional_image_sizes[ $_size ]['width'];
				$height = $_wp_additional_image_sizes[ $_size ]['height'];
      }else{
        continue;
      }
      $size = "{$width}x{$height}";
      $sizes[$_size] = ucfirst( $_size ) . ' ' . $size;
    }
    $sizes['full'] = __( 'Full', 'comet' );
    return $sizes;
  }

  static function listStyle(){
    return array(
      'none'                 => __( 'None', 'comet' ),
      'img'                  => __( 'Custom image', 'comet' ),
      'disc'                 => __( 'Disc', 'comet' ),
      'circle'               => __( 'Circle', 'comet' ),
      'square'               => __( 'Square', 'comet' ),
      'armenian'             => __( 'Armenian', 'comet' ),
      'cjk_ideographic'      => __( 'Cjk ideographic', 'comet' ),
      'decimal'              => __( 'Decimal', 'comet' ),
      'decimal_leading_zero' => __( 'Decimal leading zero', 'comet' ),
      'georgian'             => __( 'Georgian', 'comet' ),
      'hebrew'               => __( 'Hebrew', 'comet' ),
      'hiragana'             => __( 'Hiragana', 'comet' ),
      'hiragana_iroha'       => __( 'Hiragana iroha', 'comet' ),
      'katakana'             => __( 'Katakana', 'comet' ),
      'katakana_iroha'       => __( 'Katakana iroha', 'comet' ),
      'lower_alpha'          => __( 'Lower alpha', 'comet' ),
      'lower_greek'          => __( 'Lower greek', 'comet' ),
      'lower_latin'          => __( 'Lower latin', 'comet' ),
      'lower_roman'          => __( 'Lower roman', 'comet' ),
      'upper_alpha'          => __( 'Upper alpha', 'comet' ),
      'upper_latin'          => __( 'Upper latin', 'comet' ),
      'upper_roman'          => __( 'Upper roman', 'comet' )
    );
  }

  static protected function fonts(){

    $default = array(
      '0'               => __( 'Default', 'comet' ),
      'arial'           => 'Arial',
      'arial black'     => 'Arial Black',
      'courier new'     => 'Courier New',
      'georgia'         => 'Georgia',
      'helvetica'       => 'Helvetica',
      'tahoma'          => 'Tahoma',
      'times new roman' => 'Times New Roman',
      'verdana'         => 'Verdana',
    );

    $fonts = comet_getRegisteredFonts( array() );
  
    foreach( $fonts as $id => $font ){
      $f = explode( ':', $font );
      if( is_string( $f[0] ) && !isset( $default[$f[0]] ) ){
        $default[$f[0]] = $f[0];
      }
    }

    return $default;
  }

  static protected function weight(){

    $w = array(
      '0' => __( 'Default', 'comet' ) 
    );

    for( $a = 1; $a < 10; $a++ ){
      $v = $a * 100;
      $w[$v] = $v;
    }

    return $w;
  }
}
?>
