import { isNode } from '../../../utils/is.js';
import node from '../../../dom/element.js';

const TYPES = [ 'element', 'column', 'row', 'section' ];

const ROLES = [ 'edit', 'move', 'dup', 'del' ];

export const DOCUMENT = document;

export const WINDOW = window;

export const CORE = {

    classes: {
        menu: 'comet-contextmenu',
        section: 'cpb-section',
        row: 'cpb-row',
        column: 'cpb-column',
        element: 'cpb-element',

    },

    isRoleDefined: function( role ){
        return isString( role ) && ROLES.indexOf( role ) > -1;

    },

    isTypeDefined: function( type ){
        return isString( type ) && TYPES.indexOf( type ) > -1;

    },

    getPosition: function( e ){

        var posx = 0;
        var posy = 0;

        if( !e ){
            e = WINDOW.event;

        }

        if( e.pageX || e.pageY ){
            posx = e.pageX;
            posy = e.pageY;

        }else if( e.clientX || e.clientY ){
            posx = e.clientX + DOCUMENT.body.scrollLeft + DOCUMENT.documentElement.scrollLeft;
            posy = e.clientY + DOCUMENT.body.scrollTop + DOCUMENT.documentElement.scrollTop;

        }

        return {
            x: posx,
            y: posy
        };

    },

    getTarget: function( target ){
        var Target;

        if( !isNode( target ) ){
            return false;

        }
        Target = node( target );

        if( Target.hasClass( CORE.classes.element ) ){
            return {
                target: Target,
                type: 'element',

            };

        }

        if( Target.hasClass( CORE.classes.column ) ){
            return {
                target: Target,
                type: 'column',

            };

        }

        if( Target.hasClass( CORE.classes.row ) ){
            return {
                target: Target,
                type: 'row',

            };

        }

        if( Target.hasClass( CORE.classes.section ) ){
            return {
                target: Target,
                type: 'section',

            };

        }
        return CORE.getTarget( target.parentNode );

    },

    getParent: function( target, className ){

        return ( isNode( target ) ? ( node( target ).hasClass( className ) ? target : CORE.getParent( target.parentNode, className ) ) : false );

    },

    preventType: function( type, checkType ){
        var types;

        if( !CORE.isTypeDefined( checkType ) ){
            return true;

        }

        switch( type ){
            case 'section':
            types = [ 'row', 'column', 'element' ];
            break;

            case 'row':
            types = [ 'column', 'element' ];
            break;

            case 'column':
            types = [ 'element' ];
            break;

            case 'element':
            types = [];
            break;

            default:
            types = CORE.types;

        }

        return CORE.isTypeDefined( checkType );

    },

};