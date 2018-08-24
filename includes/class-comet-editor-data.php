<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once 'class-comet-utils.php';

class Comet_Editor_Data extends Comet_Utils {

  static public function section(){
    $base = self::base();
    unset( $base[0]['sections'][5] );
    return $base;
  }

  static public function row(){
    $base = self::base();
    $base[0]['sections'][5]['fields']['alg'] = array(
      'label'   => __( 'Align', 'comet' ),
      'type'    => 'select',
      'std'     => 's',
      'values'  => array(
        't'   => __( 'Top', 'comet' ),
        'c'   => __( 'Center', 'comet' ),
        'b'   => __( 'Bottom', 'comet' ),
        's'   => __( 'Stretch (full height)', 'comet' ),
      )
    );
    return $base;
  }

  static public function column(){

    $base = self::base();

    $base[0]['sections'][5]['fields'] = array(
      'wsize' => array(
        'label'   => __( 'Width', 'comet' ),
        'type'   => 'range',
        'min'    => '10',
        'max'    => '100',
        'step'   => '0.01',
        'std'    => '100',
        'unit'   => '%'
      ),
    );


    return $base;

  }

  static private function base(){

    $base = array(
      0 => array(
        'name'     => __( 'Settings', 'comet' ),
        'sections' => array(
          0 => array(
            'name'   => __( 'Background', 'comet' ),
            'fields' => array(
              'bgt' => array(
                'label'  => __( 'Type', 'comet' ),
					 	    'type'   => 'select',
                'std'    => 'color',
                'switch' => 'true',
                'to'     => array(
                  'color'    => array( 'bgc' ),
                  'gradient' => array( 'bgor', 'gradient', 'shape', 'angle' ),
                ),
                'values' => array(
                  'color'    => __( 'Color', 'comet' ),
                  'gradient' => __( 'Gradient', 'comet' ),
                  'none'     => __( 'None', 'comet' ),
                )
              ),
              'bgc' => array(
                'label'    => __( 'Color', 'comet' ),
                'check'    => 'bgt:color',
					 	    'type'     => 'color',
              ),
              'bgor' => array(
                'label'  => __( 'Gradient type', 'comet' ),
                'check'  => 'bgt:gradient',
                'type'   => 'select',
                'std'    => 'linear',
                'values' => array(
                  'linear' => __( 'Linear', 'comet' ),
                  'radial' => __( 'Radial', 'comet' ),
                )
              ),
              'gradient' => array(
                'label'  => __( 'Gradient', 'comet' ),
                'type'   => 'gradient',
                'check'  => 'bgt:gradient',
              ),
              'shape' => array(
                'label'  => __( 'Shape', 'comet' ),
                'type'   => 'select',
                'std'    => 'corner',
                'check'  => 'bgt:gradient',
                'values' => array(
                  'side'   => __( 'Side', 'comet' ),
                  'corner' => __( 'Corner', 'comet' ),
                )
              ),
              'angle' => array(
                'label'  => __( 'Angle', 'comet' ),
                'check'  => 'bgt:gradient',
                'type'   => 'range',
                'min'    => '0',
                'max'    => '360',
                'std'    => '0',
                'unit'   => __( 'deg', 'comet' )
              ),
            ),
          ),
          1 => array(
            'name'   => __( 'Image', 'comet' ),
            'fields' => array(
              'image' => array(
                'type'  => 'image',
                'label' => __( 'Image','comet'),
              ),
              'pos' => array(
                'type'   => 'select',
                'label'  => __( 'Position', 'comet' ),
                'values' => parent::backgroundPosition()
              ),
              'repeat' => array(
                'type'   => 'select',
                'label'  => __( 'Repeat', 'comet' ),
                'values' => parent::backgroundRepeat()
              ),
              'size' => array(
                'type'   => 'select',
                'label'  => __( 'Size', 'comet' ),
                'std'    => 'auto',
                'values' => array(
                  'auto'  => __( 'Auto', 'comet' ),
                  'cov'   => __( 'Cover', 'comet' ),
                  'con'   => __( 'Contain', 'comet' ),
                )
              ),
              'att' => array(
                'type'   => 'select',
                'label'  => __( 'Attachment', 'comet' ),
                'std'    => 'scr',
                'values' => array(
                  'scr'  => __( 'Scroll', 'comet' ),
                  'fix'  => __( 'Fixed', 'comet' ),
                )
              ),
            )
          ),
          2 => array(
            'name'   => __( 'Video', 'comet' ),
            'fields' => array(
              'vid' => array(
                'label'  => __( 'Video', 'comet' ),
                'desc'   => __( 'Add a video on the background ?', 'comet' ),
                'type'   => 'checkbox',
                'switch' => 'true',
                'std'    => 'false',
                'to'     => 'vurl'
              ),
              'vurl' => array(
                'label'    => __( 'Video', 'comet' ),
                'desc'     => __( 'There are 3 supported video formats: MP4, WebM, and Ogg. But MP4 is supported by all modern browsers.', 'comet' ),
                'onload'   => 'hide',
                'type'     => 'text',
                'std'      => ''
              )
            )
          ),
          3 => array(
            'name'   => __( 'Overlay', 'comet' ),
            'fields' => array(
              'ov' => array(
                'label'  => __( 'Overlay', 'comet' ),
                'desc'   => __( 'Add an overlay on the background ?', 'comet' ),
                'type'   => 'checkbox',
                'std'    => 'false',
              ),
              'ovc' => array(
                'label'  => __( 'Color','comet' ),
                'type'   => 'color'
              )
            )
          ),
          4 => array(
            'name'   => __( 'Border', 'comet' ),
            'fields' => array(
              'bw' => parent::numbers(
                __( 'Width', 'comet' ),
                __( 'Set the width of the section\'s four borders. The values must be positive integers.', 'comet' )
              ),
              'bc' => array(
                'type'   => 'color',
                'label'  => __( 'Color', 'comet')
              ),
              'bs' => array(
                'type'   => 'select',
                'label'  => __('Style','comet'),
                'values' => parent::borderStyle()
              ),
              'brad' => parent::numbers(
                __( 'Radius', 'comet' )
              ),
            )
          ),
          5 => array(
            'name'   => __( 'Sizing', 'comet' ),
            'fields' => array(
              'width' => array(
                'type'   => 'select',
                'label'  => __( 'Width', 'comet' ),
                'std'    => 'full',
                'switch' => 'true',
                'to'     => array(
                  'cust'    => array( 'wsize' ),
                ),
                'values' => array(
                  'full'  => __( 'Full', 'comet' ),
                  'cust'  => __( 'Custom', 'comet' )
                )
              ),
              'wsize' => array(
                'type'   => 'range',
                'label'  => __( 'Size', 'comet' ),
                'check'  => 'width:cust',
                'min'    => '300',
                'max'    => '5000',
                'step'   => '1',
                'std'    => '1000',
                'unit'   => 'px'
              ),
            )
          ),
          6 => array(
            'name'   => __( 'Spacing', 'comet' ),
            'fields' => array(
              'pad' => parent::numbers(
                __( 'Padding', 'comet' ),
                __( 'Padding properties are used to generate space around the content. The values must be positive integers.', 'comet' ),
                '0',
                'true'
              ),
              'mar' => parent::numbers(
                __( 'Margin', 'comet' ),
                __( 'Margin properties are used to generate space around the section. The values must be integers.', 'comet' ),
                '0',
                'true'
              )
            )
          ),
        )
      ),
    );

    return $base;
  }
}

function _comet_get_editor_data() {
  static $comet_editor_data = null;

  if ( is_null( $comet_editor_data ) ) {
    $comet_editor_data = new Comet_Editor_Data();
  }
  return $comet_editor_data;
}
?>
