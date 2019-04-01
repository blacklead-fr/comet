import utils from '../utils/utils.js';
import node from '../utils/node.js';

/* global document, __cometi18n */

export default function ( str, status ){
    const _d = document;
    const cockpit = _d.getElementById( 'comet-cockpit' );
    const notifications = _d.getElementById( 'comet-notifications' );
    var o, inner, _cockpit;

    if( !node( notifications ).isNode() || !( ( _cockpit = node( cockpit ) ).isNode() ) ){
        return false;

    }
    status = parseInt( status );

    switch( status ){
        case 100:
        status = 'note';
        break;
        case 200:
        status = 'success';
        break;
        case 300:
        status = 'warning';
        break;
        default:
        status = 'error';
    }
    _cockpit.addClass( 'is_toggled' );

    o = _d.createElement( 'div' );
    o.className = 'comet-notification ' + status;

    inner = '<p>' + ( utils.isString( str ) || utils.isNumber( str ) ? utils.stripTags( str.toString() ) : '' ) + '</p>';
    inner += '<button class="comet-button comet-close" title="' + __cometi18n.ui.close + '" aria-label="' + __cometi18n.ui.close + '"><span class="cico cico-x"></span></button>';
    o.innerHTML = inner;

    notifications.appendChild( o );

    node( o.lastChild ).on( 'click', function( ev, ui ){
        var _note;
        
        ev.preventDefault();

        if( ( ( _note = node( ui.parentNode ) ).isNode() ) ){
            _note.remove();

        }

    });

}