<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-element.php';
use Comet\Library\Comet_Element;
use Comet\Library\Comet_Utils;

class shortcode extends Comet_Element {

    public function __construct(){

        $this->set_element( 'shortcode', __( 'Shortcode', 'comet'), 'cico-shortcode' );

    }

    public function render( $data ){

        return 'ououfeozjf';



    }

    public function view(){

        ?>

        const content = ui.firstChild;

        toolkit.load.element({
            id: id,
            element: 'shortcode',
            data: data

        }, function( response ){

            if( !toolkit.utils.isString( response ) ){
                return;

            }
            content.innerHTML = '<div class="cpb-shortcode cpb-wrapper">' + response + '</div>';

        });

    	<?php

    }

    public function css(){
    	?>
    	var o = '';
    	var tmp, rcss;

    	if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-elementNode' + id + ' .cpb-shortcode.cpb-wrapper{' + tmp + '}';

    	}

    	if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-shortcode.cpb-wrapper{' + tmp + '}';
    		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-shortcode.cpb-wrapper{' + tmp + '}';
    		o += toolkit.css.responsive( 't', rcss );

    	}

    	if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
    		o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-shortcode.cpb-wrapper{' + tmp + '}';
    		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-shortcode.cpb-wrapper{' + tmp + '}';
    		o += toolkit.css.responsive( 'm', rcss );

    	}
    	return o;
    	<?php

    }

	public function ajax( $id, $data ){

		if( !isset( $data['el'] ) || !is_array( $data['el'] ) ){
			return '';
		}
		$element = $data['el'];
		$s = isset( $element['s'] ) && is_string( $element['s'] ) ? stripslashes( trim( $element['s'] ) ) : '';

		return $s !== '' ? do_shortcode( $s ) : '';

	}

	protected function _register_settings(){

		$tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

		$sid = $this->register_section( $tid, 'shortcode', __( 'Shortcode', 'comet' ) );

		$this->register_field( $tid, $sid, 's', array(
			'label'  => __( 'Shortcode', 'comet' ),
			'type'   => 'textarea',
			'std'   => '[caption id="2812" align="alignright" width="300"]',
		) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', true ) );


	}

}
?>