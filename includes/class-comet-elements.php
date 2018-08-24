<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once 'class-comet-utils.php';

class Comet_Elements extends Comet_Utils {

  static public function elements(){

    $elements = array();

    /* Text */

    $elements['text'] = array(
      'name'  => __( 'Text', 'comet' ),
      'icon'  => 'cico-text',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Text', 'comet' ),
              'fields' => array(
                'tag' => array(
                  'label'   => __( 'HTML Tag', 'comet' ),
					  	    'type'    => 'select',
                  'std'     => 'p',
                  'values'  => array(
                    'p'          => 'p',
                    'h1'         => 'h1',
                    'h2'         => 'h2',
                    'h3'         => 'h3',
                    'h4'         => 'h4',
                    'h5'         => 'h5',
                    'h6'         => 'h6',
                    'span'       => 'span',
                    'blockquote' => 'blockquote',
                    'code'       => 'code',
                  ),
                ),
                'alg' => array(
                  'label'   => __( 'Alignment', 'comet' ),
					  	    'type'    => 'radio',
                  'std'     => 'l',
                  'values'  => array(
                    'l'   => array(
                      'title' => __( 'Left', 'comet' ),
                      'icon'  => 'cico cico-align-left'
                    ),
                    'c'   => array(
                      'title' => __( 'Center', 'comet' ),
                      'icon'  => 'cico cico-align-center'
                    ),
                    'r'   => array(
                      'title' => __( 'Right', 'comet' ),
                      'icon'  => 'cico cico-align-right'
                    ),
                  ),
                ),
                'content' => array(
                  'label'   => __( 'Content', 'comet' ),
					  	    'type'    => 'editor',
                ),
              )
            ),
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Typography', 'comet' ),
              'fields' => array(
                'tc' => array(
                  'label'   => __( 'Color', 'comet' ),
					  	    'type'    => 'color',
                ),
                'fo' => array(
                  'label'   => __( 'Font', 'comet' ),
					  	    'type'    => 'select',
                  'std'     => '',
                  'values'  => parent::fonts(),
                ),
                'fs' => array(
                  'label'   => __( 'Size', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '',
                  'min'     => '10',
                  'max'     => '200',
                  'unit'    => 'px'
                ),
                'fw' => array(
                  'label'   => __( 'Weight', 'comet' ),
                  'desc'    => __( 'If the exact weight given is unavailable, then the closest weight will be applied.', 'comet' ),
					  	    'type'    => 'select',
                  'std'     => '',
                  'values'  => parent::weight()
                ),
                'lh' => array(
                  'label'   => __( 'Line height', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '',
                  'min'     => '1',
                  'max'     => '5',
                  'step'    => '0.1',
                  'unit'    => ''
                ),
                'ls' => array(
                  'label'   => __( 'Letter spacing', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '',
                  'min'     => '-5',
                  'max'     => '20',
                  'step'    => '1',
                  'unit'    => 'px'
                ),
              )
            ),
            array(
              'name'   => __( 'Text shadow', 'comet' ),
              'fields' => array(
                'tsc' => array(
                  'label'   => __( 'Color', 'comet' ),
					  	    'type'    => 'color',
                ),
                'tsb' => array(
                  'label'   => __( 'Blur', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '0',
                  'min'     => '0',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
                ),
                'tsv' => array(
                  'label'   => __( 'Vertical', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '0',
                  'min'     => '-50',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
                ),
                'tsh' => array(
                  'label'   => __( 'Horizontal', 'comet' ),
					  	    'type'    => 'range',
                  'std'     => '0',
                  'min'     => '-50',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
                ),
              )
            ),
            array(
              'name'   => __( 'Background', 'comet' ),
              'fields' => array(
                'bg' => array(
                  'label'   => __( 'Color', 'comet' ),
					  	    'type'    => 'color',
                ),
              )
            ),
            array(
              'name'   => __( 'Border', 'comet' ),
              'fields' => array(
                'bc' => array(
                  'label'   => __( 'Color', 'comet' ),
					  	    'type'    => 'color',
                ),
                'br' => parent::numbers( __( 'Width', 'comet' ) ),
                'rd' => parent::numbers( __( 'Radius', 'comet' ) )
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'pd' => parent::numbers( __( 'Padding', 'comet' ), '', '0', 'true' ),
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', 'true' )
              )
            )
          )
        )
      )
    );

    /* Google map */

    $elements['map'] = array(
      'name'  => __( 'Google map', 'comet' ),
      'icon'  => 'cico-map',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Settings', 'comet' ),
              'fields' => array(
                'q' => array(
						      'label'  => __( 'Address', 'comet' ),
					    	  'type'   => 'text',
                  'std'    => 'Eiffel Tower, Paris France',
					      ),
					      'zoom' => array(
					      	'label'  => __( 'Zoom level', 'comet' ),
						      'desc'   => __( 'The initial resolution at which to display the map is set by the zoom property, where zoom 0 corresponds to a map of the Earth fully zoomed out, and higher zoom levels zoom in at a higher resolution.', 'comet' ),
                  'type'   => 'range',
                  'std'    => '18',
                  'min'    => '0',
                  'max'    => '21',
					      ),
                'mt' => array(
                  'label'  => __( 'Map type', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'roadmap',
                  'values' => array(
                    'roadmap'   => __( 'Roadmap', 'comet' ),
                    'satellite' => __( 'Satellite', 'comet' ),
                  )
                ),
					      'size' => array(
						      'label'  => __( 'Height', 'comet' ),
					      	'type'   => 'range',
                  'min'    => '200',
                  'max'    => '2000',
                  'std'    => '500',
                  'unit'   => 'px'
					      ),
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', 'true' )
              )
            )
          )
        ),
      )
    );

    /* Button */

    $elements['button'] = array(
      'name'  => __( 'Button', 'comet' ),
      'icon'  => 'cico-click',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Button', 'comet' ),
              'fields' => array(
                'text' => array(
                  'label'  => __( 'Text', 'comet' ),
                  'type'   => 'text',
                  'std'    => __( 'Hello', 'comet' ),
                ),
                'link' => array(
                  'label'  => __( 'Link', 'comet' ),
                  'type'   => 'text',
                  'std'    => '#'
                ),
                'tar' => array(
                  'label'  => __( 'Target', 'comet' ),
                  'type'   => 'checkbox',
                  'std'    => 'true',
                  'desc'   => __( 'Open the link in a new tab ?', 'comet' ),
                ),
                'alg' => array(
                  'label'  => __( 'Alignment', 'comet' ),
                  'type'   => 'radio',
                  'std'    => 'c',
                  'values' => array(
                    'l' => array(
                      'title' => __( 'Left', 'comet' ),
                      'icon'  => 'cico cico-align-left',
                    ),
                    'c' => array(
                      'title' => __( 'Center', 'comet' ),
                      'icon'  => 'cico cico-align-center',
                    ),
                    'r' => array(
                      'title' => __( 'Right', 'comet' ),
                      'icon'  => 'cico cico-align-right',
                    ),
                    'j' => array(
                      'title' => __( 'Justified', 'comet' ),
                      'icon'  => 'cico cico-justify',
                    ),
                  ),
                ),
              )
            ),
            array(
              'name'   => __( 'Icon', 'comet' ),
              'fields' => array(
                'icon' => array(
                  'label'  => __( 'Icon', 'comet' ),
                  'type'   => 'icon'
                ),
                'ipos' => array(
                  'label'  => __( 'Position', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'l',
                  'values' => array(
                    'l' => __( 'Left', 'comet' ),
                    'r' => __( 'Right', 'comet' )
                  )
                ),
              )
            )
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Background', 'comet' ),
              'fields' => array(
                'sty' => array(
                  'label'  => __( 'Style', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'f',
                  'values' => array(
                    'f' => __( 'Flat', 'comet' ),
                    'g' => __( 'Gradient', 'comet' ),
                  )
                ),
                'bg' => array(
                  'label' => __( 'Color (inactive)', 'comet' ),
                  'type'  => 'color',
                ),
                'hbg' => array(
                  'label' => __( 'Color (active)', 'comet' ),
                  'type'  => 'color',
                ),
                'gbg' => array(
                  'label' => __( 'Gradient (inactive)', 'comet' ),
                  'type'  => 'gradient',
                ),
                'ghbg' => array(
                  'label' => __( 'Gradient (active)', 'comet' ),
                  'type'  => 'gradient',
                ),
                'ang' => array(
                  'label'  => __( 'Angle', 'comet' ),
                  'type'   => 'range',
                  'std'    => '0',
                  'min'    => '0',
                  'max'    => '360',
                  'unit'   => __( 'deg', 'comet' ),
                ),
              )
            ),
            array(
              'name'   => __( 'Text', 'comet' ),
              'fields' => array(
                'fs' => array(
                  'label'  => __( 'Size', 'comet' ),
                  'type'   => 'range',
                  'std'    => '20',
                  'min'    => '10',
                  'max'    => '70',
                  'unit'   => 'px',
                ),
                'tc' => array(
                  'label' => __( 'Color (inactive)', 'comet' ),
                  'type'  => 'color',
                ),
                'htc' => array(
                  'label' => __( 'Color (active)', 'comet' ),
                  'type'  => 'color',
                ),
              )
            ),
            array(
              'name'   => __( 'Border', 'comet' ),
              'fields' => array(
                'br' => parent::numbers( __( 'Width', 'comet' ) ),
                'bs' => array(
                  'label' => __( 'Type', 'comet' ),
                  'type'  => 'select',
                  'std'   => 'solid',
                  'values' => parent::borderStyle()
                ),
                'bc' => array(
                  'label' => __( 'Color (inactive)', 'comet' ),
                  'type'  => 'color',
                ),
                'hbc' => array(
                  'label' => __( 'Color (active)', 'comet' ),
                  'type'  => 'color',
                ),
                'rd' => parent::numbers( __( 'Radius', 'comet' ) )
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'vsp' => array(
                  'label'  => __( 'Vertical', 'comet' ),
                  'type'   => 'range',
                  'std'    => '10',
                  'min'    => '0',
                  'max'    => '70',
                  'unit'   => 'px',
                ),
                'hsp' => array(
                  'label'  => __( 'Horizontal', 'comet' ),
                  'type'   => 'range',
                  'std'    => '25',
                  'min'    => '0',
                  'max'    => '100',
                  'unit'   => 'px',
                ),
                'isp' => array(
                  'label'  => __( 'Icon', 'comet' ),
                  'type'   => 'range',
                  'std'    => '25',
                  'min'    => '0',
                  'max'    => '100',
                  'unit'   => 'px',
                ),
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', 'true' )
              )
            ),
            array(
              'name'   => __( 'Animation', 'comet' ),
              'fields' => array(
                'ani' => array(
                  'label' => __( 'Effect', 'comet' ),
                  'desc'  => __( 'Play an effect on hovering the button.', 'comet' ),
                  'type'  => 'select',
                  'std'   => '',
                  'values' => array(
                    'none'   => __( 'None', 'comet' ),
                    'zoom'   => __( 'Zoom', 'comet' ),
                    'fade'   => __( 'Fade', 'comet' ),
                    'shrink' => __( 'Shrink', 'comet' ),
                    'pulse'  => __( 'Pulse', 'comet' ),
                    'tada'   => __( 'Tada', 'comet' ),
                    'left'   => __( 'Left', 'comet' ),
                    'right'  => __( 'Right', 'comet' ),
                    'up'     => __( 'Up', 'comet' ),
                    'down'   => __( 'Down', 'comet' ),
                    /*'stt'    => __( 'Sweep to top', 'comet' ),
                    'stl'    => __( 'Sweep to left', 'comet' ),
                    'stb'    => __( 'Sweep to bottom', 'comet' ),
                    'str'    => __( 'Sweep to right', 'comet' ),*/
                  )
                ),
              )
            )
          )
        )
      )
    );

    /* Image */

    $elements['image'] = array(
      'name'  => __( 'Image', 'comet' ),
      'icon'  => 'cico-image',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Image', 'comet' ),
              'fields' => array(
                'img' => array(
                  'label'  => __( 'Image', 'comet' ),
                  'type'   => 'image',
                  'std'    => '',
                ),
                'cap' => array(
                  'label'  => __( 'Caption', 'comet' ),
                  'type'   => 'text'
                ),
                'alt' => array(
                  'label'  => __( 'Alternative text', 'comet' ),
                  'desc'   => __( 'Alternative text is required for SEO. By default it uses the image filename.', 'comet' ),
                  'type'   => 'text'
                ),
                'alg' => array(
                  'label'  => __( 'Alignment', 'comet' ),
                  'type'   => 'radio',
                  'std'    => 'c',
                  'values' => array(
                    'l'   => array(
                      'title' => __( 'Left', 'comet' ),
                      'icon' => 'cico cico-align-left',
                    ),
                    'c' => array(
                      'title' => __( 'Center', 'comet' ),
                      'icon' => 'cico cico-align-center',
                    ),
                    'r'  => array(
                      'title' => __( 'Right', 'comet' ),
                      'icon' => 'cico cico-align-right',
                    ),
                  )
                ),
              )
            ),
            array(
              'name'   => __( 'Link', 'comet' ),
              'fields' => array(
                'link' => array(
                  'label'  => __( 'Link', 'comet' ),
                  'type'   => 'text',
                  'std'    => '',
                ),
                'tar' => array(
                  'label'  => __( 'Target', 'comet' ),
                  'type'   => 'checkbox',
                  'std'    => 'true',
                  'desc'   => __( 'Open the link in a new tab ?', 'comet' ),
                ),
              )
            )
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Caption', 'comet' ),
              'fields' => array(
						  	'tc' => array(
                  'label' => __( 'Color', 'comet' ),
                  'type'  => 'color',
                ),
						  	'tsi' => array(
                  'label' => __( 'Size', 'comet' ),
                  'type'   => 'range',
                  'std'    => '12',
                  'min'    => '10',
                  'max'    => '50',
                  'unit'   => 'px',
                ),
              )
            ),
            array(
              'name'   => __( 'Border', 'comet' ),
              'fields' => array(
                'bc' => array(
                  'label' => __( 'Color', 'comet' ),
                  'type'  => 'color',
                ),
                'br' => parent::numbers( __( 'Border', 'comet' ) ),
                'rd' => parent::numbers( __( 'Radius', 'comet' ) ),
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', 'true' )
              )
            )
          )
        )
      )
    );

    /* List */

    $elements['list'] = array(
      'name'  => __( 'List', 'comet' ),
      'icon'  => 'cico-list',
      'tabs'  => array(
        'items' => array(
          'name'     => __( 'Items', 'comet' ),
          'tabs'  => array(
            array(
              'name'     => __( 'General', 'comet' ),
              'sections' => array(
                array(
                  'name'   => __( 'Item', 'comet' ),
                  'fields' => array(
                    'ico' => array(
                      'label'  => __( 'Icon', 'comet' ),
                      'type'   => 'image',
                    ),
                    'alg' => array(
                      'label'  => __( 'Vertical alignment', 'comet' ),
                      'type'   => 'select',
                      'std'    => 't',
                      'values' => array(
                        't' => __( 'Top', 'comet' ),
                        'm' => __( 'Middle', 'comet' ),
                        'b' => __( 'Bottom', 'comet' )
                      )
                    ),
                    'ctnt' => array(
                      'label'  => __( 'Text', 'comet' ),
                      'type'   => 'editor',
                    )
                  )
                )
              )
            )
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'List', 'comet' ),
              'fields' => array(
                'sty' => array(
                  'label'  => __( 'Style', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'none',
                  'values' => parent::listStyle()
                ),
                'spa' => array(
                  'label'  => __( 'Gap', 'comet' ),
                  'desc'   => __( 'Define the gap between items.', 'comet'),
                  'type'   => 'range',
                  'min'    => '0',
                  'max'    => '200',
                  'std'    => '0',
                  'unit'   => 'px'
                ),
                'ti' => array(
                  'label'  => __( 'Text indent', 'comet' ),
                  'type'   => 'range',
                  'min'    => '0',
                  'max'    => '200',
                  'std'    => '0',
                  'unit'   => 'px'
                ),
              )
            ),
            array(
              'name'   => __( 'Text', 'comet' ),
              'fields' => array(
                'fs' => array(
                  'label'  => __( 'Size', 'comet' ),
                  'type'   => 'range',
                  'min'    => '10',
                  'max'    => '100',
                  'std'    => '15',
                  'unit'   => 'px'
                ),
                'tc' => array(
                  'label'  => __( 'Color', 'comet' ),
                  'type'   => 'color',
                ),
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', 'true' )
              )
            )
          )
        )
      )
    );

    /* Video */

    $elements['video'] = array(
      'name'  => __( 'Video', 'comet' ),
      'icon'  => 'cico-video',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Video', 'comet' ),
              'fields' => array(
                'type' => array(
                  'label'  => __( 'Type', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'y',
                  'values' => array(
                    'y' => __( 'YouTube', 'comet' ),
                    'v' => __( 'Vimeo', 'comet' ),
                    'c' => __( 'Custom', 'comet' ),
                  )
                ),
                'url' => array(
                  'label'  => __( 'Video', 'comet' ),
                  'desc'   => __( 'Filetypes supported for custom video: "MP4", "WebM" and "Ogg".', 'comet' ),
                  'type'   => 'text',
                ),
                'wid' => array(
                  'label'  => __( 'Width', 'comet' ),
                  'type'   => 'range',
                  'min'    => '100',
                  'max'    => '4000',
                  'std'    => '640',
                  'unit'   => 'px'
                ),
                'hei' => array(
                  'label'  => __( 'Height', 'comet' ),
                  'type'   => 'range',
                  'min'    => '100',
                  'max'    => '4000',
                  'std'    => '360',
                  'unit'   => 'px'
                )
              )
            ),
            array(
              'name'   => __( 'Options', 'comet' ),
              'fields' => array(
                'aut' => array(
                  'label'    => __( 'Autoplay', 'comet' ),
                  'desc'     => __( 'Enabling autoplay ?', 'comet' ),
                  'type'     => 'checkbox',
                  'std'      => 'false',
                ),
                'inf' => array(
                  'label'    => __( 'Informations', 'comet' ),
                  'desc'     => __( 'Showing informations such as title, author, etc?', 'comet' ),
                  'type'     => 'checkbox',
                  'std'      => 'true',
                ),
                'ov' => array(
                  'label'    => __( 'Lightbox', 'comet' ),
                  'desc'     => __( 'Play the video in lightbox', 'comet' ),
                  'type'     => 'select',
                  'std'      => 'n',
                  'switch'   => 'true',
                  'to'       => array(
                    //'n'   => array( 'aut' ),
                    'p'   => array( 'pos' ),
                  ),
                  'values'   => array(
                    'n'   => __( 'No', 'comet' ),
                    'p'   => __( 'Yes', 'comet' ),
                  )
                ),
                'pos' => array(
                  'label' =>  __( 'Poster', 'comet' ),
                  'type'  => 'image',
                  'check' => 'ov:p',
                ),
              )
            ),
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Button', 'comet' ),
              'fields' => array(
                'ic' => array(
                  'label'  => __( 'Color', 'comet' ),
                  'type'   => 'color',
                  'check'  => 'ov:p',
                ),
                'bgc' => array(
                  'label'  => __( 'Background color', 'comet' ),
                  'type'   => 'color',
                  'check'  => 'ov:p',
                ),
                'bc' => array(
                  'label'  => __( 'Border color', 'comet' ),
                  'type'   => 'color',
                  'check'  => 'ov:p',
                ),
                'bw' => array(
                  'label'  => __( 'Border width', 'comet' ),
                  'type'   => 'range',
                  'min'    => '0',
                  'max'    => '5',
                  'std'    => '0',
                  'unit'   => 'px',
                  'check'  => 'ov:p',
                ),
                'br' => parent::numbers( __( 'Border radius', 'comet' ), '', '0', false )
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', true )
              )
            )
          )
        )
      )
    );

    /* Audio */

    $elements['audio'] = array(
      'name'  => __( 'Audio', 'comet' ),
      'icon'  => 'cico-audio',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Audio', 'comet' ),
              'fields' => array(
                'url' => array(
                  'label'  => __( 'Audio', 'comet' ),
                  'desc'   => __( 'Filetypes supported: "MP3", "Wav" and "Ogg".', 'comet' ),
                  'type'   => 'text',
                ),
                'aut' => array(
                  'label'    =>__( 'Autoplay', 'comet' ),
                  'type'     => 'checkbox',
                  'std'      => 'false',
                  'desc'     => __( 'Playing as soon as audio player is ready ?', 'comet' )
                ),
                'loop' => array(
                  'label'    =>__( 'Loop', 'comet' ),
                  'type'     => 'checkbox',
                  'std'      => 'false',
                  'desc'     => __( 'Start audio over again everytime it is finished ?', 'comet' )
                ),
              )
              ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', true )
              )
            )
          )
        )
      )
    );

    /* Icon */

    $elements['icon'] = array(
      'name'  => __( 'Icon', 'comet' ),
      'icon'  => 'cico-icon',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Icon', 'comet' ),
              'fields' => array(
                'icon' => array(
                  'label'  => __( 'Icon', 'comet' ),
                  'type'   => 'icon',
                ),
                'isi' => array(
                  'label' => __( 'Size', 'comet' ),
                  'type'   => 'range',
                  'min'    => '20',
                  'max'    => '200',
                  'std'   => '30',
                  'unit'  => 'px'
                ),
                'alg' => array(
                  'label'  => __( 'Alignment', 'comet' ),
                  'type'   => 'radio',
                  'std'    => 'c',
                  'values' => array(
                    'l' => array(
                      'title' => __( 'Left', 'comet' ),
                      'icon'  => 'cico cico-align-left',
                    ),
                    'c' => array(
                      'title' => __( 'Center', 'comet' ),
                      'icon'  => 'cico cico-align-center',
                    ),
                    'r' => array(
                      'title' => __( 'Right', 'comet' ),
                      'icon'  => 'cico cico-align-right',
                    ),
                  )
                )
              )
            ),
            array(
              'name'   => __( 'Link', 'comet' ),
              'fields' => array(
                'url' => array(
                  'label' => __( 'Link', 'comet' ),
                  'type'  => 'text'
                ),
                'tar' => array(
                  'label' => __( 'Target', 'comet' ),
                  'desc'  => __( 'Open the link in a new tab ?', 'comet' ),
                  'type'  => 'checkbox',
                  'std'   => 'true'
                ),
              )
            )
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Colors', 'comet' ),
              'fields' => array(
                'ic'  => array(
                  'label' => __( 'Icon', 'comet' ),
                  'type'  => 'color',
                ),
                'bgc' => array(
                  'label' => __( 'Background', 'comet' ),
                  'type'  => 'color',
                ),
              )
            ),
            array(
              'name'   => __( 'Border', 'comet' ),
              'fields' => array(
                'br' => parent::numbers( __( 'Width', 'comet' ) ),
                'bs'  => array(
                  'label'  => __( 'Style', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'solid',
                  'values' => parent::borderStyle()
                ),
                'bc'  => array(
                  'label' => __( 'Color', 'comet' ),
                  'type'  => 'color',
                ),
                'rd' => parent::numbers( __( 'Radius', 'comet' ) )
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'pd' => array(
                  'label' => __( 'Padding', 'comet' ),
                  'type'  => 'range',
                  'min'   => '0',
                  'max'   => '50',
                  'std'   => '20',
                  'unit'  => 'px'
                ),
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', true )
              )
            ),
          )
        )
      )
    );

    /* Shortcode */

    $elements['shortcode'] = array(
      'name'  => __( 'Shortcode', 'comet' ),
      'icon'  => 'cico-shortcode',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Shortcode', 'comet' ),
              'fields' => array(
                's' => array(
                  'label'  => __( 'Shortcode', 'comet' ),
                  'type'   => 'textarea',
                  'std'   => '[caption id="2812" align="alignright" width="300"]',
                ),
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', true )
              )
            ),
          )
        )
      )
    );

    /* Gallery */

    $elements['gallery'] = array(
      'name'  => __( 'Gallery', 'comet' ),
      'icon'  => 'cico-gallery',
      'tabs'  => array(
        array(
          'name'     => __( 'General', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Gallery', 'comet' ),
              'fields' => array(
                'col' => array(
                  'label'  => __( 'Columns', 'comet' ),
                  'type'   => 'select',
                  'std'    => '3',
                  'values' => parent::grid( 5 )
                ),
                'lb' => array(
                  'label' => __( 'Lightbox', 'comet' ),
                  'desc'  => __( 'Open in a lightbox ?', 'comet' ),
                  'type'  => 'checkbox',
                  'std'   => 'true',
                ),
                'cp' => array(
                  'label'  => __( 'Caption', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'c',
                  'values' => array(
                    'h'  => __( 'Hide', 'comet' ),
                    'b'  => __( 'Banner', 'comet' ),
                    'c'  => __( 'Cover', 'comet' ),
                    'u'  => __( 'Under', 'comet' ),
                  )
                ),
              )
            ),
            array(
              'name'   => __( 'Images', 'comet' ),
              'fields' => array(
                'pd' => array(
                  'label'  => __( 'Gap', 'comet' ),
                  'type'   => 'range',
                  'min'    => '0',
                  'max'    => '30',
                  'std'    => '0',
                  'unit'   => '%'
                ),
                'she' => array(
                  'label'  => __( 'Height', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'c',
                  'switch'   => 'true',
                  'to'       => array(
                    'c'   => array( 'hei' ),
                  ),
                  'values' => array(
                    'd'  => __( 'Default', 'comet' ),
                    'c'  => __( 'Custom', 'comet' ),
                  )
                ),
                'hei' => array(
                  'label'  => __( 'Custom height', 'comet' ),
                  'type'   => 'range',
                  'min'    => '200',
                  'max'    => '500',
                  'std'    => '200',
                  'step'   => '1',
                  'unit'   => 'px',
                  'check'  => 'she:c'
                ),
              )
            ),
          )
        ),
        'items' => array(
          'name'     => __( 'Images', 'comet' ),
          'tabs'  => array(
            array(
              'name'     => __( 'General', 'comet' ),
              'sections' => array(
                array(
                  'name'   => __( 'Image', 'comet' ),
                  'fields' => array(
                    'img' => array(
                      'label'  => __( 'Image', 'comet' ),
                      'type'   => 'image',
                    ),
                    'alt' => array(
                      'label'  => __( 'Alternative text', 'comet' ),
                      'desc'   => __( 'Alternative text is required for SEO. By default it uses the image filename.', 'comet' ),
                      'type'   => 'text'
                    ),
                    'cap' => array(
                      'label'  => __( 'Caption', 'comet' ),
                      'type'   => 'text',
                    ),
                    'ath' => array(
                      'label'  => __( 'Author', 'comet' ),
                      'type'   => 'text',
                    ),
                  )
                )
              )
            )
          )
        ),
        array(
          'name'     => __( 'Design', 'comet' ),
          'sections' => array(
            array(
              'name'   => __( 'Caption', 'comet' ),
              'fields' => array(
                'cps' => array(
                  'label'=> __( 'Size', 'comet' ),
                  'type'   => 'range',
                  'min'    => '10',
                  'max'    => '50',
                  'std'    => '15',
                  'unit'   => 'px'
                ),
                'tc'  => array(
                  'label' => __( 'Color', 'comet' ),
                  'type'  => 'color',
                ),
              )
            ),
            array(
              'name'   => __( 'Border', 'comet' ),
              'fields' => array(
                'bs' => array(
                  'label'  => __( 'Style', 'comet' ),
                  'type'   => 'select',
                  'std'    => 'solid',
                  'values' => parent::borderStyle()
                ),
                'bc'  => array(
                  'label' => __( 'Color', 'comet' ),
                  'type'  => 'color',
                ),
                'br' => parent::numbers( __( 'Width', 'comet' ) ),
                'rd' => parent::numbers( __( 'Radius', 'comet' ) )
              )
            ),
            array(
              'name'   => __( 'Spacing', 'comet' ),
              'fields' => array(
                'mr' => parent::numbers( __( 'Margin', 'comet' ), '', '0', true )
              )
            ),
          )
        )
      )
    );

    $elements = apply_filters( 'comet_elements', $elements );

    $elements = self::sortElements( $elements );

		return $elements;

  }

  static private function sortElements( $elements ){

    $order = 'text button image list icon gallery map shortcode audio video';

    $f_order = apply_filters( 'comet_sort_elements', $order, $elements );

    if( is_string( $f_order ) ){
      $order = $f_order;
    }

    $elementsO = explode( ' ', $order );
    $kelements = array();
    foreach( $elementsO as $key => $id ){
      $id = trim( $id );
      if( isset( $elements[$id] ) ){
        $kelements[$id] = $elements[$id];
        unset( $elements[$id] );
      }
    }

    if( count( $elements ) > 0 ){
      $kelements = array_merge( $kelements, $elements );
    }
    return $kelements;
  }
}

function _comet_get_elements() {
  static $comet_elements = null;

  if ( is_null( $comet_elements ) ) {
    $comet_elements = new Comet_Elements();
  }
  return $comet_elements;
}
?>
