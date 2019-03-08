import node from '../utils/node.js';

/* global document */

export default function(){

	const _d = document;

	const __ = {

		sidebar: function(){

			const sidebar = _d.getElementById( 'comet-dashboardSidebar' );

			const open = _d.getElementById( 'comet-doSidebarOpen' );

			const close = _d.getElementById( 'comet-doSidebarClose' );

			const prop = {

				open: function( ev ){
					ev.preventDefault();
					sidebar.style.display = 'block';

				},

				close: function( ev ){
					ev.preventDefault();
					sidebar.style.display = 'none';

				}

			};

			if( !sidebar || sidebar === null ){
				return;

			}

			node( open ).on( 'click', prop.open );
			node( close ).on( 'click', prop.close );
		},

		help: function(){

			const tooltip = _d.getElementsByClassName( 'comet-tooltip' );

			node( tooltip ).on( 'click', function( ev, ui ){

				node( ui ).toggleClass( 'comet-active' );

			});
		},

		slider: function(){
			const buttons = _d.getElementsByClassName( 'comet-dashboardSlideButton' );

			node( buttons ).on( 'click', function( ev, ui ){
				const slide = ui.parentNode.parentNode;
				const _ui = node( ui );
				const sc = 'comet-dashboardSlide';
				var sibling = null;
				var s, slides;

				ev.preventDefault();

                if( _ui.hasClass( 'comet-next' ) && ( sibling = slide.nextSibling ) === null ){
                	return;

                }

                if( _ui.hasClass( 'comet-prev' ) && ( sibling = slide.previousSibling ) === null ){
                	return;

                }

                if( !node( sibling ).isNode() || slide.parentNode === null || ( slides = slide.parentNode.children ).length < 1 ){
                	return;

                }

                for( s = 0; s < slides.length; s++ ){

                	if( node( slides[s] ).hasClass( sc ) ){
                		slides[s].style.display = 'none';

                	}

                }
                sibling.style.display = 'block';

			});

		}

	};
	__.sidebar();
	__.help();
	__.slider();
	
}