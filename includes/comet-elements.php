<?php

function comet_posts( $id, $data ){

  if( !isset( $data['el'] ) || !is_array( $data['el'] ) ){
    return;
  }

  $element = $data['el'];

  $args = array(
		'post_type'			       => isset( $element['ptype'] ) && post_type_exists( trim( $element['ptype'] ) ) ? trim( $element['ptype'] ) : 'post',
		'post_status'			     => 'publish',
		'ignore_sticky_posts'  => 1,
		'posts_per_page'       => isset( $element['no'] ) && (int)$element['no'] > 0 ? (int)$element['no'] : 5,
		'orderby' 				     => isset( $element['ob'] ) ? trim( $element['ob'] ) : 'date',
		'order' 				       => isset( $element['or'] ) && trim( $element['or'] ) !== 'DESC' ? 'ASC' : 'DESC'
	);

	$posts = new WP_Query($args);

  if ( $posts->have_posts() ){

    $thumb = 'none';

    if( isset( $element['thumb'] ) ){
      $thumb = trim( $element['thumb'] );
      switch( $thumb ){
        case 'fade':
        case 'cover':
        case 'shadow':
        break;
        default:
        $thumb = 'none';
      }
    }

    $author = isset( $element['ath'] ) && $element['ath'] === 'true' ? true : false;
    $date = isset( $element['date'] ) && $element['date'] === 'true' ? true : false;
    $content = isset( $element['ctnt'] ) && ( $element['ctnt'] === 'e' || $element['ctnt'] === 'c' ) ? $element['ctnt'] : 'n';

    $btn = false;

    if( isset( $element['btn'] ) && $element['btn'] === 'true' ){
      $btn = true;
      $btn_pos = 'center';
      if( isset( $element['btnp'] ) ){
        switch( $element['btnp'] ){
          case 'l':
            $btn_pos = 'left';
            break;
          case 'r':
            $btn_pos = 'right';
            break;
          case 'j':
            $btn_pos = 'justified';
            break;
          default:
            $btn_pos = 'center';
        }
      }

      $btn_icon_p = 'none';
      if( isset( $element['btnip'] ) ){
        switch( $element['btnip'] ){
          case 'l':
            $btn_icon_p = 'left';
            break;
          case 'r':
            $btn_icon_p = 'right';
            break;
          default:
            $btn_icon_p = 'none';
        }
      }
      $btn_icon = '';//isset( $btn_icon ) && comet_type_checker( $btn_icon ) === 'fontawesome' ? $btn_icon : '';
      $btn_text = isset( $element['btnt'] ) && strlen( trim( $element['btnt'] ) ) ? trim( $element['btnt'] ) : __( 'Read more', 'comet' );
      $bClass = "comet-post-btn comet-post-btn-{$btn_pos} comet-post-btn-d-{$btn_icon_p}";
    }

    $pClass = "comet-post-outer comet-post-{$thumb}";
    $column = 1;
    if( isset( $element['col'] ) ){
      $column = (int)$element['col'];
      if( !is_int( $column ) || $column < 1 || $column > 4 ){
        $column = 1;
      }
    }

    $align = 'center';
    if( isset( $element['alg'] ) ){
      switch( $element['alg'] ){
        case 'l':
          $align = 'left';
          break;
        case 'r':
          $align = 'right';
          break;
        case 'j':
          $align = 'justified';
          break;
        default:
          $align = 'center';
      }
    }

    $gClass = "comet-posts comet-grid comet-grid{$column} comet-posts-content-{$align}";
    if( $column !== 1 ){
      $gClass .= ' comet-masonry-layout';
    }

    $post = 0;
    $output = '<ul>';
    while ( $posts->have_posts() ) {
      $posts->the_post();

      $the_title = get_the_title();
      $output .= '<li class=' . $pClass . '">';
      $output .= '<div class="comet-post-inner">';

      if( has_post_thumbnail() && $thumb !== 'none' ){
        $output .= '<div class="comet-post-thumb-wrap">';
        $output .= get_the_post_thumbnail( get_the_ID(), 'large', array( 'class' => 'comet-post-thumb' ) );
        if( $thumb === 'fade' ){
          $output .= '<div class="comet-post-fade-overlay"></div>';
        }
        $output .= '</div>';
      }

      $output .= '<div class="comet-post-body-wrap">';

      if( $author || $date ){
        $output .= '<div class="comet-post-author-wrap">';
        if( $author ){
          $author_id = get_the_author_meta( 'ID' );
          $output .= get_avatar( $author_id, 50 );
        }
        $output .= '<div class="comet-post-meta">';
        if( $author ){
          $output .= '<span class="comet-post-author-name">' . get_the_author() . '</span>';
        }
        if( $date ){
          $output .= '<span class="comet-post-date"> ' . get_the_date() . '</span>';
        }
        $output .= '</div>';
        $output .= '</div>';
      }

      if( strlen( $the_title ) ){
        $output .= '<h4 class="comet-post-title"><a href="' . get_permalink() . '">' . $the_title . '</a></h4>';
      }

      $output .= '<div class="comet-post-body">';
      if( $content === 'e' && has_excerpt() ){
        $output .= get_the_excerpt();
      }elseif( $content === 'c' ){
        $output .= get_the_content();
      }
      $output .= '</div>';

      if( $btn ){
        $output .= '<div class="' . $bClass . '">';
        $output .= '<a href="' . get_permalink() . '" title="' . $btn_text . '">';

        if( strlen( $btn_icon ) && $btn_icon_p === 'left' ){
          $output .= '<span class="fa ' . $btn_icon . '"></span>';
        }
        if( $btn_icon_p !== 'none' ){
          $output .= $btn_text;
        }
        if( strlen( $btn_icon ) && $btn_icon_p !== 'right' ){
          $output .= '<span class="fa ' . $btn_icon . '"></span>';
        }
        $output .= '</a>';
        $output .= '</div>';
      }
      $output .= '</div>';
      $output .= '</div>';
      $output .= '</li>';
      $post++;
    }
    $output .= '</ul>';
    if( $post > 0 ){
      wp_reset_postdata();
      return $output;
    }
  }
  wp_reset_postdata();
  return '<p>' . __( 'No posts to show.', 'comet' ) . '</p>';
}
?>
