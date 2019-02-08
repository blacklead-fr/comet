import accordion from '../../../utils/ui/accordion.js';
import gradient from '../../../utils/ui/gradient.js';
import cp from '../../../utils/ui/color-picker.js';
import tabs from '../../../utils/ui/tabs.js';
import node from '../../../utils/node.js';
import item from '../../item/item.js';
import update from '../../update.js';
import _switch from './switch.js';
import device from './device.js';
import editor from './editor.js';
import range from './range.js';
import image from './image.js';
import icon from './icon.js';


const parts = {

	tabs: function(){

		tabs({
			target: document.getElementsByClassName( 'comet-modalInner' ),
			classes: {
				active: 'cpb-active',
				ref: 'comet-modalTabRef',
				tabs: 'comet-modalTabs',
				tab: 'comet-modalTab',
				body: 'comet-modalContent'
			}
		});

	},

	accordion: function(){

		accordion({
			target: document.getElementsByClassName( 'comet-modalTab' ),
			active: 1,
			collapsible: false,
			classes: {
				item: 'comet-editorModalSection',
				header: 'comet-editorModalSectionHeader',
				body: 'comet-editorModalSectionBody',
				active: 'cpb-active'
			}

		});

	},

	radio: function(){

		node( '.comet-modalFieldRadioWrap' ).on( 'click', function( ev, ui ){
			const active = 'cpb-active';
			var _p, dren, c, _child;

			if( !( ( _p = node( ui.parentNode ) ).isNode() ) || ( dren = _p.prop().children ).length < 1 ){
				return;
			}

			for( c in dren ){

				if( !( ( _child = node( dren[c] ) ).isNode() ) ){
					continue;

				}

				if( !_child.hasClass( 'comet-modalFieldRadioWrap' ) ){
					continue;

				}
				_child.removeClass( active );

			}
			node( ui ).addClass( active );

		});

	},

	image: function(){

		image( document.getElementsByClassName( 'comet-fieldImage' ) );

	},

	icon: function(){

		icon( document.getElementsByClassName( 'comet-fieldIcon' ) );

	},

	item: function(){

		item();

	},

	range: function(){

		range();

	},

	switch: function(){

		node( '.comet-edControlInline' ).on( 'click', _switch );

	},

	gradient: function(){
		const opts = {
			size: 20,
			onchange: function( ui, gdt ){
				update( ui );

			}
		};
		gradient( document.getElementsByClassName( 'comet-fieldGradient' ), opts );

	},

	editor: editor,

	device: function(){

		node( '.comet-edSDevice' ).on( 'click', device );

	},

	color: function(){

		cp( document.getElementsByClassName( 'comet-fieldColor' ), {
			opacity: true,
			input: true,
			clear: true,
			onchange: function( ui, source, color ){
				update( source );

			}

		});

	},

	fields: function(){

		node( '.comet-field' ).on( 'input change', function( ev, ui ){
			update( ui );

		});

	},

	init: function(){
		const self = this;
		var i;

		for( i in self ){

			if( i === 'init' ){
				continue;

			}
			self[i]();

		}

	}

};

export default parts;