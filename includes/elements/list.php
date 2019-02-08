<?php
namespace Comet\Library\Elements;

if( !defined( 'ABSPATH' ) ){
    exit;
    
}
require_once COMET_PATH . 'includes/class-element.php';
use Comet\Library\Comet_Element;
use Comet\Library\Comet_Utils;

class listItems extends Comet_Element {

    public function __construct(){

        $this->set_element( 'list', __( 'List', 'comet'), 'cico-list' );

    }

    public function render( $data ){

        return 'ououfeozjf';

    }

    public function view(){

        ?>

        const content = ui.firstChild;
        var classes = 'cpb-list cpb-wrapper';
        var o = '';
        var tmp;

        if( !toolkit.utils.isStringEmpty( data.el.sty ) && ( tmp = toolkit.utils.trim( data.el.sty ) ) !== 'none' ){
            classes += ' cpb-list' + tmp;

        }
        content.innerHTML = '<ul class="' + classes + '"></ul>';

        toolkit.utils.foreachItem( data, function( iid, idata ){
            var iclasses = 'cpb-item cpb-inner';
            iclasses += ' cpb-item' + iid;
            iclasses += ' ' + toolkit.sanitize.alignment( idata.alg );

            o += toolkit.html.content({
                classes: iclasses,
                editable: true,
                tag: 'li',
                match: 'ctnt',
                id: iid,
                inner: idata.ctnt
            });

        });
        content.firstChild.innerHTML = o;

        <?php

    }

    public function css(){
        ?>
        var o = '';
        var spa, ti, sty, tmp, rcss;

        sty = !toolkit.utils.isStringEmpty( data.el.sty ) ? toolkit.utils.trim( data.el.sty ) : 'none';
        spa = toolkit.sanitize.number({ value: data.el.spa, min: 0, max: 200 });
        ti = toolkit.sanitize.number({ value: data.el.ti, min: 0, max: 200 });

        if( ( tmp = toolkit.css.margin( data.el.mrt, data.el.mrr, data.el.mrb, data.el.mrl, 'px', 'px' ) ) !== '' ){
            o += '.cpb-elementNode' + id + ' .cpb-list.cpb-wrapper{' + tmp + '}';

        }

        o += '.cpb-elementNode' + id + ' .cpb-item.cpb-inner{';

        if( ( tmp = toolkit.sanitize.number({ value: data.el.fs, min: 10, max: 100 } ) ) !== null ){
            o += toolkit.css.render( 'font-size', tmp + 'px' );

        }

        if( ( tmp = toolkit.sanitize.color( data.el.tc ) ) !== '' ){
            o += toolkit.css.render( 'color', tmp );

        }

        if( spa !== null && ti !== null && ( spa > 0 || ti > 0 ) ){
            o += toolkit.css.padding( spa, 0, spa, ti, 'px', 'px' );

        }
        o += '}';

        o += toolkit.utils.foreachItem( data, function( iid, idata ){
            var io = '';
            var img;

            if( sty === 'img' ){
                img = toolkit.utils.isString( idata.ico ) ? toolkit.utils.trim( toolkit.utils.stripTags( idata.ico ) ) : '';

                if( img !== '' ){
                    io += '.cpb-elementNode' + id + ' .cpb-inner.cpb-item' + iid +'{';
                    io += toolkit.css.render( 'background-image', 'url(' + toolkit.utils.escUrl( img ) + ')' );
                    io += '}';
                    console.log( io );

                }

            }
            return io; 

        });

        if( ( tmp = toolkit.css.margin( data.el.mrtt, data.el.mrrt, data.el.mrbt, data.el.mrlt, 'px', 'px' ) ) !== '' ){
            o += '.cpb-tabletMode .cpb-elementNode' + id + ' .cpb-list.cpb-wrapper{' + tmp + '}';
            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-list.cpb-wrapper{' + tmp + '}';
            o += toolkit.css.responsive( 't', rcss );

        }

        if( ( tmp = toolkit.css.margin( data.el.mrtm, data.el.mrrm, data.el.mrbm, data.el.mrlm, 'px', 'px' ) ) !== '' ){
            o += '.cpb-mobileMode .cpb-elementNode' + id + ' .cpb-list.cpb-wrapper{' + tmp + '}';
            rcss = '.cpb-element.cpb-elementNode' + id + ' .cpb-list.cpb-wrapper{' + tmp + '}';
            o += toolkit.css.responsive( 'm', rcss );

        }
        return o;
        <?php

    }

    protected function _register_item_settings(){

        $tid = $this->register_tab( 'general', __( 'General', 'comet' ), true );

        $sid = $this->register_section( $tid, 'item', __( 'Item', 'comet' ), true );

        $this->register_field( $tid, $sid, 'ico', array(
            'label'  => __( 'Icon', 'comet' ),
            'type'   => 'image',
        ), true );

        $this->register_field( $tid, $sid, 'alg', array(
            'label'  => __( 'Vertical alignment', 'comet' ),
            'type'   => 'select',
            'std'    => 't',
            'values' => array(
                't' => __( 'Top', 'comet' ),
                'm' => __( 'Middle', 'comet' ),
                'b' => __( 'Bottom', 'comet' )
            )
        ), true );

        $this->register_field( $tid, $sid, 'ctnt', array(
            'label'  => __( 'Text', 'comet' ),
            'type'   => 'editor',
        ), true );

        $this->push_items( __( 'Items', 'comet' ) );

    }

    protected function _register_settings(){

        $tid = $this->register_tab( 'design', __( 'Design', 'comet' ) );

        $sid = $this->register_section( $tid, 'list', __( 'List', 'comet' ) );

        $this->register_field( $tid, $sid, 'sty', array(
            'label'  => __( 'Style', 'comet' ),
            'type'   => 'select',
            'std'    => 'none',
            'values' => Comet_Utils::listStyle()
        ) );

        $this->register_field( $tid, $sid, 'spa', array(
            'label'  => __( 'Gap', 'comet' ),
            'desc'   => __( 'Define the gap between items.', 'comet'),
            'type'   => 'range',
            'min'    => '0',
            'max'    => '200',
            'std'    => '0',
            'unit'   => 'px'
        ) );

        $this->register_field( $tid, $sid, 'ti', array(
            'label'  => __( 'Text indent', 'comet' ),
            'type'   => 'range',
            'min'    => '0',
            'max'    => '200',
            'std'    => '0',
            'unit'   => 'px'
        ) );

        $sid = $this->register_section( $tid, 'text', __( 'Text', 'comet' ) );

        $this->register_field( $tid, $sid, 'fs', array(
            'label'  => __( 'Size', 'comet' ),
            'type'   => 'range',
            'min'    => '10',
            'max'    => '100',
            'std'    => '15',
            'unit'   => 'px'
        ) );

        $this->register_field( $tid, $sid, 'tc', array(
            'label'  => __( 'Color', 'comet' ),
            'type'   => 'color',
        ) );

        $sid = $this->register_section( $tid, 'spacing', __( 'Spacing', 'comet' ) );

        $this->register_field( $tid, $sid, 'mr', Comet_Utils::numbers( __( 'Margin', 'comet' ), '', '0', 'true' ) );

    }

}
?>