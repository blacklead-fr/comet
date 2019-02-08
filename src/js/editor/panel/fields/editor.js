import utils from '../../../utils/utils.js';
import parse from '../../../utils/parse.js';
import node from '../../../utils/node.js';
import redefine from '../../redefine.js';
import __target from '../../target.js';
import __data from '../../data.js';

export default function( destroy ){
	const oTid = 'comet-editorToolbar';//'comet-toolbar';	
	const selection = {};
	const target = __target();
	const id = target.id();
	const item = target.item();
	const element = target.node();
	const type = target.type();
	const classes = {
		active: 'cpb-active',
		textarea: 'comet-fieldEditor',
		editor: 'cpb-editable'
	}
	const textarea = document.getElementsByClassName( classes.textarea );
	var neditor = 0;
	var oToolbar = document.getElementById( oTid );

	destroy = utils.isBool( destroy ) ? destroy : false;

	function _destroy(){
		const editors = document.getElementsByClassName( classes.editor );
		var e, _editor;

		if( editors.length < 1 ){
			return;

		}

		for( e = 0; e < editors.length; e++ ){

			if( ( _editor = node( editors[e] ) ).isNode() ){
				editors[e].removeAttribute( 'contenteditable' );
				_editor.removeClass( classes.active );

			}

		}

	}

	function editor(){
		var editors, _editor, e;

		const prop = {

			triggered: function( tested ){
				const cid = parse.id( parse.dataset( tested, 'id' ) );
				var cm = prop.matched( tested );

				return ( ( cm && ( ( id === cid && !item ) || ( item && item === cid ) ) ) ? cm : false );

			},

			matched: function( tested ){
				const need = parse.dataset( tested, 'match' );
				var t = 0;

				for( t; t < textarea.length; t++ ){

					if( !node( textarea[t] ).isNode() || utils.isStringEmpty( textarea[t].name ) || utils.trim( textarea[t].name ) !== need ){
						continue;

					}
					return textarea[t];

				}
				return false;

			},

			focus: function( ev, ui ){
				ev.preventDefault();
				var buttons, _target;

				if( window.getSelection && window.getSelection().modify ){
					selection.range = window.getSelection().getRangeAt(0);
					selection.clicked = true;

				}

				if( ( buttons = oToolbar.getElementsByClassName( 'comet-tbButton' ) ).length < 1 || !( ( _target = node( ev.target ) ).isNode() ) ){
					return;

				}

				function isCommand( button, command ){
					const cmd = parse.dataset( button, 'command' );

					return ( utils.isString( cmd ) && utils.trim( cmd ) === command );

				}

				function parent( comp ){
					var command, command1, _button, b;

					if( node( comp ).hasClass( classes.editor ) || comp.parentNode === null ){
						return;

					}

					switch( comp.nodeName.toLowerCase() ){
						case 'b':
						case 'bold':
						case 'bolder':
						case 'strong':
						command = 'bold';
						break;
						case 'i':
						case 'em':
						case 'italic':
						command = 'italic';
						break;
						case 'u':
						case 'ins':
						case 'underline':
						command = 'underline';
						break;
						case 'del':
						case 'strike':
						case 'strikethrough':
						command = 'strikeThrough';
						break;
						case 'a':
						case 'link':
						command = 'link';
						break;
						default:
						return;
					}

					for( b = 0; b < buttons.length; b++ ){

						if( !( ( _button = node( buttons[b] ) ).isNode() ) || !isCommand( buttons[b], command ) ){
							continue;

						}
						_button.addClass( classes.active );

					}
					parent( comp.parentNode );

				}
				node( buttons ).removeClass( classes.active );
				parent( _target.prop() );

			},

			change: function( ev, ui ){
				const ct = prop.matched( ui );

				if( !ct ){
					return;

				}
				ct.value = utils.stripTags( ui.innerHTML, '<p><strong><ins><del><sup><sub><b><i><span><u><em><strike><a><h1><h2><h3><h4><h5><h6><hr><br><img><caption>' );
				__data().catchAndSet( id, type );

			}

		};

		if( destroy ){
			_destroy();
			return;

		}

		if( !node( element ).isNode() || ( editors = element.getElementsByClassName( classes.editor ) ).length < 1 || textarea.length < 1 ){
			return;

		}

		for( e = 0; e < editors.length; e++ ){

			if( !( ( _editor = node( editors[e] ) ).isNode() ) ){
				continue;

			}

			if( destroy || !prop.triggered( editors[e] ) ){
				editors[e].removeAttribute( 'contenteditable' );
				_editor.removeClass( classes.active );
				continue;

			}
			editors[e].setAttribute( 'contenteditable', 'true' );
			_editor.addClass( classes.active );
			_editor.on( 'click', prop.focus );
			_editor.on( 'input', prop.change );
			neditor++;

		}

	}

	function toolbar(){
		const frame = utils.getNode( 'frame' );
		var _oToolbar = node( oToolbar );
		const toolbarExists = ( _oToolbar.isNode() );

		const prop = {

			create: function(){
				const buttons = prop.buttons();
				var button, oButton, inner, bClasses, b;

				oToolbar = document.createElement( 'div' );
				oToolbar.id = oTid;

				for( b = 0; b < buttons.length; b++ ){
					button = buttons[b];
					oButton = document.createElement( 'button' );
					oButton.dataset.command = button.command;
					oButton.className = 'comet-button comet-tbButton';
					bClasses = 'comet-title';
					inner = '';

					if( 'icon' in button ){
						inner += '<span class="comet-icon ' + button.icon + '"></span>';
						bClasses += ' comet-tooltip';

					}

					if( 'title' in button ){
						inner += '<span class="' + bClasses + '">' + button.title + '</span>';

					}
					oButton.innerHTML = inner;

					if( utils.isFunction( button.render ) ){
						oToolbar.appendChild( button.render( oButton ) );

					}else{
						oToolbar.appendChild( oButton );

					}
					node( oButton ).on( 'click', button.do );

				}
				frame.before( oToolbar );

			},

			buttons: function(){

				const onbutton = {

					default: function( command, val ){
						var sel, range;

						val = !utils.isStringEmpty( val ) ? utils.trim( val ) : null;

						if( !window.getSelection || !window.getSelection().modify || selection.range === null ){
							return;

						}
						sel = window.getSelection();

						if( selection.clicked ){
							sel.removeAllRanges();
							sel.addRange( selection.range );

						}

						if( sel.type === 'Caret' ){
							sel.modify('move', 'backward', 'word');
							sel.modify('extend', 'forward', 'word');

						}
						range = sel.getRangeAt(0);
						document.execCommand( command, false, val );
						selection.clicked = false;

					},

					toggle: function( ui ){
						const _ui = node( ui );

						if( _ui.hasClass( classes.active ) ){
							_ui.removeClass( classes.active );
							return false;

						}
						_ui.addClass( classes.active );
						return true;

					}


				}

				return [
				{
					command: 'bold',
					icon: 'cico cico-bold',
					title: __cometi18n.ui.bold,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'bold' );

					}
				},

				{
					command: 'italic',
					icon: 'cico cico-italic',
					title: __cometi18n.ui.italic,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'italic' );

					}
				},

				{
					command: 'underline',
					icon: 'cico cico-underline',
					title: __cometi18n.ui.underline,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'underline' );

					}
				},

				{
					command: 'strikeThrough',
					icon: 'cico cico-striketrough',
					title: __cometi18n.ui.st,
					do: function( ev, ui ){
						ev.preventDefault();
						onbutton.toggle( ui );
						onbutton.default( 'strikeThrough' );

					}
				},

				{
					command: 'link',
					icon: 'cico cico-link',
					title: __cometi18n.ui.ilink,
					render: function( button ){
						const inline = document.createElement( 'div' );
						const input = document.createElement( 'input' );
						const createLink = document.createElement( 'button' );


						inline.className = 'comet-inline';

						createLink.className = 'comet-button comet-done';
						createLink.innerHTML = '<span class="comet-icon cico cico-break"></span><span class="comet-title comet-tooltip">' + __cometi18n.ui.ilink + '</span>';

						inline.appendChild( button );
						inline.appendChild( input );
						inline.appendChild( createLink );

						node( createLink ).on( 'click', function( ev, ui ){
							ev.preventDefault();
							const val = utils.isString( input.value ) ? utils.trim( utils.stripTags( input.value ) ) : '';
							const state = val === '' ? 'unlink' : 'createLink';
							onbutton.default( state, val );
						});

						return inline;

					},
					do: function( ev, ui ){
						ev.preventDefault();
						const _p = node( ui.parentNode );

						if( onbutton.toggle( ui ) ){
							_p.addClass( classes.active );
							return;

						}
						_p.removeClass( classes.active );

					}
				}];

			}

		};

		if( destroy || neditor < 1 ){

			if( toolbarExists ){
				_oToolbar.remove();

			}
			frame.style.height = '';
			frame.style.top = '';
			return;

		}

		if( !toolbarExists ){
			prop.create();

		}

	}

	editor();
	toolbar();

}