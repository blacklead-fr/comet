<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Comet_My_Templates {

  public function render(){
    
    if( comet_is_actionIn( 'edit', 'mytemplates' ) ){
      self::edit();
      return;
    }

    self::templates();
  }

  private function templates() {
    $templates = comet_get_templates();
    $action = comet_getAdminPageUrl( 'mytemplates' );

    echo '<form id="comet-mytemplates" class="comet-dashCtntBoxed" action="' . esc_url( $action ) . '" method="post">';

    echo '<div class="comet-adminHeader">';
    echo '<div class="comet-row col2">';
    echo '<div class="comet-column col1 text-left">';
    echo '<h4>' . sprintf( _n( '%d template', '%d templates', $templates->found_posts, 'comet' ), $templates->found_posts ) . '</h4>';
    echo '</div>';
    echo '<div class="comet-column col3 text-right">';
    echo '<a id="comet-newTemplate" class="comet-mthOption comet-button comet-buttonPrimary cico cico-plus" title="' . __( 'Create new', 'comet' ) . '"></a>';
    echo '<div id="comet-importTemplate" class="comet-middleIb">';
    echo '<input type="file" id="comet-importTemplateFile" multiple accept=".json" />';
    echo '<button type="button" id="comet-importTemplateBtn" class="comet-mthOption comet-button cico cico-import" title="' . __( 'Import', 'comet' ) . '"></button>';
    echo '</div>';
    echo '</div>';
    echo '</div>';

    echo '</div>';

    echo '<ul id="comet-map-templates">';

    if( $templates->have_posts() ){
      while( $templates->have_posts() ){
        $templates->the_post();
        $single = $templates->post;
        $id = $single->ID;
        echo self::template( $id, $single );
      }
      wp_reset_postdata();
    }
    echo '</ul>';

    echo '</form>';
  }

  private function template( $id, $single ){

    $o = '<li class="comet-template">';
    $o .= '<h4 class="comet-templateName">' . ucfirst( get_the_title() ) . '</h4>';
    $o .= '<p class="comet-templateInfo"><span class="comet-templateDate">' . get_the_date() . '</span>•<span class="comet-templateAuthor">' . get_the_author() . '</span></p>';

    $o .= '<div class="comet-templateAction">';
    $o .= '<a class="comet-templateEdit comet-button comet-buttonPrimary" href="' . comet_getEditLink( $id ) . '">' . __( 'Edit', 'comet' ) . '</a>';
    $o .= '<a class="comet-templatePreview comet-button cico cico-eye" title="' . __( 'Preview', 'comet' ) . '" data-id="' . $id . '"></a>';
    $o .= '<a class="comet-templateExport comet-button cico cico-export" title="' . __( 'Export', 'comet' ) . '" data-id="' . $id . '"></a>';
    $o .= '<a class="comet-templateDelete comet-button cico cico-trash" title="' . __( 'Delete', 'comet' ) . '" data-id="' . $id . '"></a>';
    $o .= '</div>';
    $o .= '</li>';
    return $o;
  }

  private function edit(){
    echo '<div id="comet-myTemplate">';
    echo '<div id="comet-editorWin"></div>';
    echo '</div>';
  }
}

function _comet_get_mytemplates(){
  static $comet_mytemplates = null;

  if ( is_null( $comet_mytemplates ) ) {
    $comet_mytemplates = new Comet_My_Templates();
  }
  return $comet_mytemplates;
}
?>
