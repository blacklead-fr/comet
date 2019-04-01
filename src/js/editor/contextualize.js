import layout from '../utils/layout.js';
import utils from '../utils/utils.js';
import parse from '../utils/parse.js';
import __tabs from './panel/tabs.js';
import redefine from './redefine.js';
import node from '../utils/node.js';
import __target from './target.js';
import __data from './data.js';
import panel from './panel.js';
import __id from './id.js';

/* global document, window, __cometi18n */

export default function(){

    const _d = document;

    const _w = window;

    const frame = utils.getNode( 'frame' );

    const types = [ 'element', 'column', 'row', 'section' ];

    const roles = [ 'edit', 'move', 'dup', 'del' ];

    const classes = {
        menu: 'comet-contextmenu',
        section: 'cpb-section',
        row: 'cpb-row',
        column: 'cpb-column',
        element: 'cpb-element',

    };

    const __core = {

        getPosition: function( e ){

            var posx = 0;
            var posy = 0;

            if( !e ){
                e = _w.event;

            }

            if( e.pageX || e.pageY ){
                posx = e.pageX;
                posy = e.pageY;

            }else if( e.clientX || e.clientY ){
                posx = e.clientX + _d.body.scrollLeft + _d.documentElement.scrollLeft;
                posy = e.clientY + _d.body.scrollTop + _d.documentElement.scrollTop;

            }

            return {
                x: posx,
                y: posy
            };

        },

        getTarget: function( target ){
            const _target = node( target );

            if( !_target.isNode() ){
                return false;

            }

            if( _target.hasClass( classes.element ) ){
                return {
                    target: target,
                    type: 'element',

                };

            }

            if( _target.hasClass( classes.column ) ){
                return {
                    target: target,
                    type: 'column',

                };

            }

            if( _target.hasClass( classes.row ) ){
                return {
                    target: target,
                    type: 'row',

                };

            }

            if( _target.hasClass( classes.section ) ){
                return {
                    target: target,
                    type: 'section',

                };

            }
            return __core.getTarget( target.parentNode );

        },

        getParent: function( target, className ){
            const _target = node( target );

            return ( _target.isNode() ? ( _target.hasClass( className ) ? target : __core.getParent( target.parentNode, className ) ) : false );

        },

        preventType: function( type, checkType ){
            var _types;

            if( types.indexOf( checkType ) < 0 ){
                return true;

            }

            switch( type ){
                case 'section':
                _types = [ 'row', 'column', 'element' ];
                break;

                case 'row':
                _types = [ 'column', 'element' ];
                break;

                case 'column':
                _types = [ 'element' ];
                break;

                case 'element':
                _types = [];
                break;

                default:
                _types = types;

            }

            return ( _types.indexOf( checkType ) > -1 );

        },

    };

    const __menu = {


        isMenu: function( target ){

            return ( !__core.getParent( target, classes.menu ) ? false : true );

        },

        create: function( ev ){
            var fragment, menuNode, target;

            if( !__menu.isMenu( ev.target ) ){
                __menu.destroy();

            }

            if( ev.type === 'click' || !( target = __core.getTarget( ev.target ) ) ){
                return;

            }
            ev.preventDefault();
            menuNode = _d.createElement( 'div' );
            fragment = _d.createDocumentFragment();
            fragment.appendChild( menuNode );

            menuNode.className = classes.menu;

            __menu.setOptions( target.type, target.target, menuNode );

            _d.body.appendChild( fragment );
            __menu.setPosition( ev, menuNode );

        },

        setOptions: function( type, target, menu ){
            const options = __cometi18n.options;
            var body, option, _option, item, count;

            if( !utils.isObject( options ) || types.indexOf( type ) < 0 ){
                menu.innerHTML = __cometi18n.messages.error.noMenu;
                return;

            }

            function create_button( role, _type, name ){
                var button = _d.createElement( 'button' );
                button.className = 'comet-item';
                button.innerHTML = name;
                button.dataset.role = role;

                if( role === 'move' ){
                    node( button ).sort( __menu.onsort( target, _type ) );

                }else{
                    node( button ).on( 'click', __menu.onclick, { role: role, type: _type, target: target, targetType: type } );

                }
                return button;

            }

            for( option in options ){

                if( !utils.isObject( item = options[option] ) || types.indexOf( option ) < 0 || __core.preventType( type, option ) ){
                    continue;

                }
                count = 0;
                _option = _d.createElement( 'div' );
                _option.className = 'comet-option'; 
                _option.innerHTML = '<span>' + item.title + '</span><div class="comet-items"></div>';
                body = _option.lastChild;

                if( 'edit' in item ){
                    body.appendChild( create_button( 'edit', option, item.edit ) );
                    count++;

                }

                if( 'move' in item ){
                    body.appendChild( create_button( 'move', option, item.move ) );
                    count++;

                }

                if( 'dup' in item ){
                    body.appendChild( create_button( 'dup', option, item.dup ) );
                    count++;

                }

                if( 'del' in item ){
                    body.appendChild( create_button( 'del', option, item.del ) );
                    count++;

                }

                if( count > 0 ){
                    _option.firstChild.innerHTML = item.title + '<span class="cico cico-arrow-right"></span>';

                }
                menu.appendChild( _option );

            }

        },

        destroy: function(){
            node( '.' + classes.menu ).remove();

        },

        setPosition: function( e, menu ){

            var clickCoords = __core.getPosition(e);
            var clickCoordsX = clickCoords.x;
            var clickCoordsY = clickCoords.y;

            var menuWidth = menu.offsetWidth + 154;
            var menuHeight = menu.offsetHeight + 4;

            var windowWidth = frame.offsetWidth;
            var windowHeight = frame.offsetHeight;

            if( ( windowWidth - clickCoordsX ) < menuWidth ){
                menu.style.left = windowWidth - menuWidth + 'px';

            }else{
                menu.style.left = clickCoordsX + 'px';
            }

            if( ( windowHeight - clickCoordsY ) < menuHeight ){
                menu.style.top = windowHeight - menuHeight + 'px';

            }else{
                menu.style.top = clickCoordsY + 'px';

            }

        },

        onclick: function( ev, ui, e ){

            var get;

            const data_ = __data();

            const target_ = __target();

            const priv = {

                section: function(){
                    const type = 'sections';
                    const targetNode = __core.getParent( e.target, 'cpb-section' );
                    var id, nid, sdata, ret;

                    if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        sdata = utils.getSettingsFrom( 'section' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.section.edit,
                            tabs: __tabs( sdata, data_.get( id, type ) )

                        };

                        case 'del':

                        data_.remove( id, type );
                        node( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( nid = data_.clone( id, type ) ) || !( ret = layout( data_.getData() ).section( nid ) ) ){
                            return false;

                        }
                        node( targetNode ).after( ret.querySelectorAll( '.cpb-section' ) );
                        return true;

                        default:
                        return false;

                    }

                },

                row: function(){
                    const type = 'rows';
                    const targetNode = __core.getParent( e.target, 'cpb-row' );
                    var id, parentNode, pid, nid, rdata, ret;

                    if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        rdata = utils.getSettingsFrom( 'row' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.row.edit,
                            tabs: __tabs( rdata, data_.get( id, type ) )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-section' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }
                        data_.remove( id, type, pid );
                        node( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-section' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).row( nid ) ) ){
                            return false;

                        }
                        node( targetNode ).after( ret.querySelectorAll( '.cpb-row' ) );
                        return true;

                        default:
                        return false;

                    }

                },

                column: function(){
                    const type = 'columns';
                    const targetNode = __core.getParent( e.target, 'cpb-column' );
                    var id, parentNode, pid, nid, cdata, ret;

                    if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        cdata = utils.getSettingsFrom( 'column' );

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.column.edit,
                            tabs: __tabs( cdata, data_.get( id, type ) )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-row' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }
                        parentNode = targetNode.parentNode;
                        data_.remove( id, type, pid );
                        node( targetNode ).remove();
                        redefine.columns( parentNode );
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-row' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).column( nid ) ) ){
                            return false;

                        }
                        node( targetNode ).after( ret.querySelectorAll( '.cpb-column' ) );
                        redefine.columns( targetNode.parentNode );
                        return true;

                        default:
                        return false;

                    }

                },

                element: function(){
                    const type = 'elements';
                    const targetNode = __core.getParent( e.target, 'cpb-element' );
                    var id, parentNode, pid, nid, _type, tmp, edata, ret;

                    if( !targetNode || !( id = parse.dataset( targetNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                        return false;

                    }

                    switch( e.role ){

                        case 'edit':

                        if( !utils.isObject( tmp = data_.get( id, type ) ) || utils.isStringEmpty( _type = tmp._type ) ){
                            return false;

                        }

                        if( !utils.isObject( edata = utils.getElement( _type ) ) || !utils.isObject( edata.tabs ) ){
                            return false;

                        }

                        target_.set({
                            id: id,
                            type: type,
                            node: targetNode
                        });

                        return {
                            title: __cometi18n.options.element.edit,
                            tabs: __tabs( edata.tabs, tmp )
                        };

                        case 'del':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-column' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }
                        data_.remove( id, type, pid );
                        node( targetNode ).remove();
                        return true;

                        case 'dup':

                        if( !( parentNode = __core.getParent( targetNode, 'cpb-column' ) ) || !( pid = parse.dataset( parentNode, 'id' ) ) || !( pid = parse.id( pid ) ) ){
                            return false;

                        }

                        if( !( nid = data_.clone( id, type, pid ) ) || !( ret = layout( data_.getData() ).element( nid ) ) ){
                            console.log( ret );
                            return false;

                        }
                        node( targetNode ).after( ret.querySelectorAll( '.cpb-element' ) );
                        return true;

                        default:
                        return false;

                    }

                }

            };
            
            ev.preventDefault();

            if( !utils.isFunction( priv[e.type] ) || roles.indexOf( e.role ) < 0 ){
                __menu.destroy();
                return;

            }

            if( !utils.isObject( get = priv[e.type]() ) || !( 'tabs' in get ) || !( 'title' in  get ) ){
                __menu.destroy();
                return;

            }

            panel({
                title: get.title,
                content: 'content' in get.tabs ? get.tabs.content : '',
                tabs: 'tabs' in get.tabs ? get.tabs.tabs : '',
                close: {
                    do: function(){
                        target_.reset();
                    }
                }

            });

        },

        onsort: function( targetNode, type ){

            const priv = {

                section: {
                    connectWith : '#cpb-content',
                    items: '.cpb-section',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function(){
                        const sectionNode = __core.getParent( targetNode, classes.section );
                        var id;

                        if( !node( sectionNode ).isNode() || !( id = parse.dataset( sectionNode, 'id' ) ) || !parse.id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        sectionNode.style.visibility = 'hidden';
                        return sectionNode;

                    },
                    stop: function( e, ui, sectionNode ){
                        const id_ = __id();
                        var id, t, _closest, closest;

                        sectionNode.removeAttribute( 'style' );

                        if( !( id = parse.dataset( sectionNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                            return;

                        }
                        t = 'last';
                        closest = node( ui ).next( '.cpb-section' );
                        _closest = node( closest );
                        t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

                        id_.remove( id, 'sections', id );
                        id_.insert( id, 'sections', id, t );
                        ui.parentNode.replaceChild( sectionNode , ui );

                    }
                },

                row: {
                    connectWith : '.cpb-rows',
                    items: '.cpb-row',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function(){
                        const rowNode = __core.getParent( targetNode, classes.row );
                        var id;

                        if( !node( rowNode ).isNode() || !( id = parse.dataset( rowNode, 'id' ) ) || !parse.id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        rowNode.style.visibility = 'hidden';
                        return rowNode;

                    },
                    stop: function( e, ui, rowNode ){
                        const id_ = __id();
                        var id, sid, nsid, t, closest, _closest;

                        if( !node( rowNode ).isNode() || !( id = parse.dataset( rowNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                            return;

                        }
                        if( !( sid = parse.dataset( __core.getParent( rowNode, classes.section ), 'id' ) ) || !( sid = parse.id( sid ) ) ){
                            return;

                        }

                        if( !( nsid = parse.dataset( __core.getParent( ui, classes.section ), 'id' ) ) || !( nsid = parse.id( nsid ) ) ){
                            return;

                        }
                        closest = node( ui ).next( '.cpb-row' );
                        _closest = node( closest );
                        t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

                        rowNode.removeAttribute( 'style' );
                        id_.remove( id, 'rows', sid );
                        id_.insert( id, 'rows', nsid, t );
                        ui.parentNode.replaceChild( rowNode , ui );

                    }

                },

                column: {
                    connectWith : '.cpb-rowContent',
                    items: '.cpb-column',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function(){
                        const columnNode = __core.getParent( targetNode, classes.column );
                        var id;

                        if( !node( columnNode ).isNode() || !( id = parse.dataset( columnNode, 'id' ) ) || !( parse.id( id ) ) ){
                            return;

                        }
                        __menu.destroy();
                        columnNode.style.visibility = 'hidden';
                        return columnNode;

                    },
                    stop: function( e, ui, columnNode ){
                        const id_ = __id();
                        var containerNode, uiContainerNode, id, rid, nrid, t, closest, _closest;

                        if( !node( columnNode ).isNode() || !( id = parse.dataset( columnNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                            return;

                        }

                        if( ( containerNode = columnNode.parentNode ) === null || !( rid = parse.dataset( containerNode.parentNode, 'id' ) ) || !( rid = parse.id( rid ) ) ){
                            return;

                        }

                        if( !__data().get( rid, 'rows' ) || ( uiContainerNode = ui.parentNode ) === null || !( nrid = parse.dataset( uiContainerNode.parentNode, 'id' ) ) || !( nrid = parse.id( nrid ) ) ){
                            return;

                        }
                        closest = node( ui ).next( '.cpb-column' );
                        _closest = node( closest );
                        t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

                        columnNode.removeAttribute( 'style' );
                        id_.remove( id, 'columns', rid );
                        id_.insert( id, 'columns', nrid, t );
                        uiContainerNode.replaceChild( columnNode , ui );

                        if( rid !== nrid ){
                            redefine.columns( containerNode );
                            redefine.columns( uiContainerNode );

                        }
                    }

                },

                element: {
                    connectWith : '.cpb-columnContent',
                    items: '.cpb-element',
                    placeholder: 'cpb-edSortPlaceholder',
                    cursor: 'cpb-elementCursor',
                    containment: '#cpb-content',
                    start: function(){
                        const elementNode = __core.getParent( targetNode, classes.element );
                        var id;

                        if( !node( elementNode ).isNode() || !( id = parse.dataset( elementNode, 'id' ) ) || !parse.id( id ) ){
                            return;

                        }
                        __menu.destroy();
                        elementNode.style.visibility = 'hidden';
                        return elementNode;

                    },
                    stop: function( e, ui, elementNode ){
                        const id_ = __id();
                        var id, cid, ncid, t, closest, _closest;

                        if( !node( elementNode ).isNode() || !( id = parse.dataset( elementNode, 'id' ) ) || !( id = parse.id( id ) ) ){
                            return;

                        }

                        if( !( cid = parse.dataset( __core.getParent( elementNode, classes.column ), 'id' ) ) || !( cid = parse.id( cid ) ) ){
                            return;

                        }

                        if( !__data().get( cid, 'columns' ) || !( ncid = parse.dataset( __core.getParent( ui, classes.column ), 'id' ) ) || !( ncid = parse.id( ncid ) ) ){
                            return;

                        }
                        closest = node( ui ).next( '.cpb-element' );
                        _closest = node( closest );
                        t = _closest.isNode() && ( t = parse.dataset( _closest.prop(), 'id' ) ) && ( t = parse.id( t ) ) ? t : 'last';

                        elementNode.removeAttribute( 'style' );
                        id_.remove( id, 'elements', cid );
                        id_.insert( id, 'elements', ncid, t );
                        ui.parentNode.replaceChild( elementNode , ui );

                    }


                }

            };
            return ( type in priv ? priv[type] : {} );

        }

    };
    node( _d.documentElement ).on( 'contextmenu click', __menu.create );
    node( _w ).on( 'resize', __menu.destroy );
    node( frame ).on( 'scroll', __menu.destroy );

}