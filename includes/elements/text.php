<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-element.php';
//require_once COMET_PATH . 'includes/class-register.php';
use Comet\Library\Comet_Element;
use Comet\Library\Comet_Utils;

class text extends Comet_Element{

	public function __construct(){

		$this->set_element( 'text', __( 'Text', 'comet'), 'cico-text' );

	}

	public function render( $data ){

		return 'ououfeozjf';



	}

	public function view(){

		?>

		const content = ui.firstChild;
		const classes = [ 'cpb-text', 'cpb-wrapper', toolkit.sanitize.alignment( data.el.alg ) ];

		content.innerHTML = '<div class="' + toolkit.utils.toClass( classes ) + '"></div>';

		content.firstChild.innerHTML = toolkit.html.content({
			editable: true,
			id: id,
			match: 'content',
			inner: data.el.content,
			tag: data.el.tag,
		});


		<?php

	}

	public function css(){
		?>
		var tmp, tmp1, tmp2, tmp3, o, rcss;

		o = '.cpb-elementNode' + id + ' .cpb-text.cpb-wrapper {';

		if( ( tmp = toolkit.sanitize.number( { value: data.el.lh, float: true } ) ) !== null && tmp > 0 ){
			o += toolkit.css.render( 'line-height', tmp );

		}

		if( ( tmp = toolkit.sanitize.number( data.el.ls ) ) !== null ){
			o += toolkit.css.render( 'letter-spacing', tmp + 'px' );

		}

		if( ( tmp = toolkit.sanitize.color( data.el.tc ) ) !== '' ){
			o += toolkit.css.render( 'color', tmp );

		}

		if( !toolkit.utils.isStringEmpty( data.el.fo ) ){
			o += toolkit.css.render( 'font-family', toolkit.utils.trim( data.el.fo ) );

		}

		o += toolkit.css.textShadow({
			color: data.el.tsc,
			blur: data.el.tsb,
			x: data.el.tsh,
			y: data.el.tsv

		});

		if( ( tmp = toolkit.sanitize.color( data.el.bg ) ) !== '' ){
			o += toolkit.css.render( 'background', tmp );

		}

		o += toolkit.css.border({
			style: data.el.bs,
			color: data.el.bc,
			top: data.el.brt,
			right: data.el.brr,
			bottom: data.el.brb,
			left: data.el.brl
		});
		o += toolkit.css.padding( data.el.pdt, data.el.pdr, data.el.pdb, data.el.pdl, 'px', 'px' );
		o += toolkit.css.borderRadius( data.el.rdt, data.el.rdr, data.el.rdb, data.el.rdl );
		o += toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' );
		o += '}';


		o += '.cpb-elementNode' + id + ' .cpb-text.cpb-wrapper *{';

		if( ( tmp = toolkit.sanitize.number( data.el.fs ) ) !== null && tmp > 0 ){
			o += toolkit.css.render( 'font-size', tmp + 'px' );

		}

		if( ( tmp = toolkit.sanitize.number( data.el.fw ) ) !== null && tmp > 99 && tmp < 901 ){
			o += toolkit.css.render( 'font-weight', tmp );

		}
		o += '}';

		tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' );
		tmp1 = toolkit.css.padding( data.el.pdtt, data.el.pdrt, data.el.pdbt, data.el.pdlt, 'px', 'px' );

		o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-text.cpb-wrapper{' + tmp + tmp1 + '}';

		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-text.cpb-wrapper{' + tmp + tmp1 + '}';

		o += toolkit.css.responsive( 't', rcss );

		tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' );
		tmp1 = toolkit.css.padding( data.el.pdtm, data.el.pdrm, data.el.pdbm, data.el.pdlm, 'px', 'px' );

		o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-text.cpb-wrapper{' + tmp + tmp1 + '}';

		rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-text.cpb-wrapper{' + tmp + tmp1 + '}';
		o += toolkit.css.responsive( 'm', rcss );
		return o;

		<?php

	}

	protected function _register_settings(){

		$tid = $this->register_tab( 'general', __( 'General', 'comet' ) );

		$sid = $this->register_section( $tid, 'text', __( 'Text', 'comet' ) );

		$this->register_field( $tid, $sid, 'tag', array(
			'label'   => __( 'HTML Tag', 'comet' ),
			'type'    => 'select',
			'std'     => 'p',
			'values'  => array(
				'p'				=> 'p',
				'h1'			=> 'h1',
				'h2'			=> 'h2',
				'h3'			=> 'h3',
				'h4'			=> 'h4',
				'h5'			=> 'h5',
				'h6'			=> 'h6',
				'blockquote'	=> 'blockquote',
				//'code'       	=> 'code',
				'pre'			=> 'preformatted',
			),
		) );

		$this->register_field( $tid, $sid, 'alg', array(
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
		) );

		$this->register_field( $tid, $sid, 'content', array(
			'label'   => __( 'Content', 'comet' ),
			'type'    => 'editor',
		) );


		$tid = $this->register_tab( 'design', __( 'Design', 'comet' ) );

		$sid = $this->register_section( $tid, 'typography', __( 'Typography', 'comet' ) );

		$this->register_field( $tid, $sid, 'tc', array(
			'label'   => __( 'Color', 'comet' ),
			'type'    => 'color',
		) );

		$this->register_field( $tid, $sid, 'fo', array(
			'label'   => __( 'Font', 'comet' ),
			'type'    => 'select',
			'std'     => '',
			'values'  => Comet_Utils::fonts(),
		) );

		$this->register_field( $tid, $sid, 'fs', array(
			'label'   => __( 'Size', 'comet' ),
			'type'    => 'range',
			'std'     => '',
			'min'     => '10',
			'max'     => '200',
			'unit'    => 'px'
		) );

		$this->register_field( $tid, $sid, 'fw', array(
			'label'   => __( 'Weight', 'comet' ),
			'desc'    => __( 'If the exact weight given is unavailable, then the closest weight will be applied.', 'comet' ),
			'type'    => 'select',
			'std'     => '',
			'values'  => Comet_Utils::weight()
		) );

		$this->register_field( $tid, $sid, 'lh', array(
			'label'   => __( 'Line height', 'comet' ),
			'type'    => 'range',
			'std'     => '',
			'min'     => '1',
			'max'     => '5',
			'step'    => '0.1',
			'unit'    => ''
		) );

		$this->register_field( $tid, $sid, 'ls', array(
			'label'   => __( 'Letter spacing', 'comet' ),
			'type'    => 'range',
			'std'     => '',
			'min'     => '-5',
			'max'     => '20',
			'step'    => '1',
			'unit'    => 'px'
		) );

		$sid = $this->register_section( $tid, 'shadow', __( 'Text shadow', 'comet' ) );

		$this->register_field( $tid, $sid, 'tsc', array(
                  'label'   => __( 'Color', 'comet' ),
                  'type'    => 'color',
		) );

		$this->register_field( $tid, $sid, 'tsb', array(
                  'label'   => __( 'Blur', 'comet' ),
                  'type'    => 'range',
                  'std'     => '0',
                  'min'     => '0',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
		) );

		$this->register_field( $tid, $sid, 'tsv', array(
                  'label'   => __( 'Vertical', 'comet' ),
                  'type'    => 'range',
                  'std'     => '0',
                  'min'     => '-50',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
		) );

		$this->register_field( $tid, $sid, 'tsh', array(
                  'label'   => __( 'Horizontal', 'comet' ),
                  'type'    => 'range',
                  'std'     => '0',
                  'min'     => '-50',
                  'max'     => '50',
                  'step'    => '1',
                  'unit'    => 'px'
		) );

		$sid = $this->register_section( $tid, 'background', __( 'Background', 'comet' ) );

		$this->register_field( $tid, $sid, 'bg', array(
                  'label'   => __( 'Color', 'comet' ),
                  'type'    => 'color',
		) );

		$sid = $this->register_section( $tid, 'border', __( 'Border', 'comet' ) );

		$this->register_field( $tid, $sid, 'br', Comet_Utils::numbers( __( 'Width', 'comet' ) ) );

		$this->register_field( $tid, $sid, 'bs', array(
                  'label'   => __( 'Style', 'comet' ),
                  'type'    => 'select',
                  'std'		=> 'none',
                  'values'	=> Comet_Utils::borderStyle()
		) );

		$this->register_field( $tid, $sid, 'bc', array(
                  'label'   => __( 'Color', 'comet' ),
                  'type'    => 'color',
		) );

		$this->register_field( $tid, $sid, 'rd', Comet_Utils::numbers( __( 'Radius', 'comet' ) ) );

		$sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

		$this->register_field( $tid, $sid, 'pd', Comet_Utils::numbers( __( 'Padding', 'comet' ), '', '0', 'true' ) );

		$this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', 'true' ) );

	}

}
?>