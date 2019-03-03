import parse from '../parse.js';
import utils from '../utils.js';
import node from '../node.js';

/**
 * 
 * @param {Object}		source			Node to replace by the editor
 * @param {Object}		options			Inline editor options
 * @param {String}		options.type	advanced/basic
 * @param {Integer}		options.id		Element id
 * @param {String}		options.slug	Matching setting slug
 * @param {String}		options.content	Content inner the HTML tag
 * @param {String}		options.tag		HTML tag wrapping the content
 *
 */

 /**
 *
 * @TODO	Verify if id exists
 * @TODO	Verify if slug exists
 * @TODO	Update input
 * @TODO	Retrieve command state
 * 
 */



 export default function( source, options ){

 	const _d = document;

 	const _w =  window;

 	const __core = {

 		classes: {
 			hide: 'comet-hide'

 		},

 		get: {

 			tags: function( oArray ){
 				const tags = [ 'span', 'br', 'ins', 'u', 'i', 'em', 'strong', 'b', 'strike', 'del', 'a', 'abbr', 'code', 'hr', 'mark', 'sup', 'sub', 's', 'small', 'cite', 'time', 'q' ];
 				var output = '';
 				var i = 0;

 				if( utils.isBool( oArray ) && oArray ){
 					return tags;

 				}

 				for( i; i < tags.length; i++ ){
 					output += '<' + utils.trim( tags[i] ) + '>';

 				}
 				return output;

 			},

 			elementId: function( ui ){
 				const _ui = node( ui );
 				var id;

 				if( !_ui.isNode() ){
 					return false;

 				}

 				if( _ui.hasClass( 'cpb-element' ) ){
 					return ( !( id = parse.dataset( ui, 'id' ) ) || !( id = parse.id( id ) ) ? false : id );

 				}
 				return __core.getElementId( ui.parentNode );

 			},

 			textarea: function( ui ){

 			}

 		},

 		toolbar: {

 			slug: 'editorToolbar',

 			get: function(){
 				const toolbar = __global().get( __core.toolbar.slug );

 				return node( toolbar ).isNode() ? toolbar : false;

 			},

 			set: function( toolbar ){

 				return node( toolbar ).isNode() ? __global().set( __core.toolbar.slug, toolbar, true ) : false;

 			},

 			close: function( ev, ui ){
 				const toolbar = __core.toolbar.get();

 				if( !toolbar ){
 					return;

 				}
 				node( toolbar ).addClass( __core.classes.hide );

 			},

 			buttons: function(){

 				const onbutton = {

 					default: function( command, val ){
 						var sel, range;

 						val = !utils.isStringEmpty( val ) ? utils.trim( val ) : null;

 						if( !_w.getSelection || !_w.getSelection().modify || selection.range === null ){
 							return;

 						}
 						sel = _w.getSelection();

 						if( selection.clicked ){
 							sel.removeAllRanges();
 							sel.addRange( selection.range );

 						}

 						if( sel.type === 'Caret' ){
 							sel.modify('move', 'backward', 'word');
 							sel.modify('extend', 'forward', 'word');

 						}
 						range = sel.getRangeAt(0);
 						_d.execCommand( command, false, val );
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


 				};

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
 							const val = utils.isString( input.value ) ? utils.trim( utils.stripTags( input.value ) ) : '';
 							const state = val === '' ? 'unlink' : 'createLink';

 							ev.preventDefault();

 							onbutton.default( state, val );
 						});

 						return inline;

 					},
 					do: function( ev, ui ){
 						const _p = node( ui.parentNode );

 						ev.preventDefault();

 						if( onbutton.toggle( ui ) ){
 							_p.addClass( classes.active );
 							return;

 						}
 						_p.removeClass( classes.active );

 					}
 				}];

 			},

 			create: function(){
 				const fragment = _d.createDocumentFragment();
 				const oToolbar = _d.createElement( 'div' );
 				const buttons = __core.toolbar.buttons();
 				var button, oButton, inner, bClasses, b;

 				oToolbar.className = 'comet-toolbar comet-ui comet-inline comet-float';

 				fragment.appendChild( oToolbar );

 				for( b = 0; b < buttons.length; b++ ){
 					button = buttons[b];
 					oButton = _d.createElement( 'button' );
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
 				_d.body.appendChild( fragment );
 				return __core.toolbar.set( oToolbar );


 			}

 		},

 		editor: {

 			create: function(){
 				const tags = [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'div', 'aside', 'pre', 'blockquote', 'article', 'section' ];
 				const tag = utils.isString( options.tag ) ? utils.trim( options.tag.toLowerCase() ) : 'p';
 				const oObject = _d.createElement( tags.indexOf( tag ) < 0 ? 'p' : tag );

 				oObject.className = 'comet-editable comet-ui';
 				oObject.innerHTML = utils.isString( options.content ) ? utils.stripTags( options.content, __core.get.tags( false ) ) : 'Write something here...';
 				oObject.setAttribute( 'contenteditable', 'true' );

 				node( oObject ).on( 'click', __core.editor.focus );
 				node( oObject ).on( 'input', __core.editor.change );

 				return oObject;

 			},

 			change: function( ev, ui ){
 				const id = __core.get.elementId( ui );
 				var toolbar;

 				ev.preventDefault();
 				ev.stopPropagation();

 				if( !id ){
 					return;

 				}

 				if( !( toolbar = __core.toolbar.get() ) ){
 					toolbar = __core.toolbar.create();

 				}else{
 					node( toolbar ).removeClass( __core.classes.hide );

 				}


 			},


 			focus: function( ev, ui ){
 				var buttons, _target;

 				ev.preventDefault();

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
 		}

 	};

 	var editor;

 	if( !node( source ).isNode() || source.parentNode === null ){
 		return false;

 	}

 	if( !utils.isObject( options ) ){
 		options = {};

 	}
 	editor = __core.editor.create();
 	source.parentNode.replaceChild( editor, source );



 }