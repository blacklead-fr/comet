import utils from '../utils/utils.js';
import node from '../utils/node.js';

export default function ( str, status ){
    const cockpit = document.getElementById( 'comet-cockpit' );
    const notifications = document.getElementById( 'comet-notifications' );
    var o, button;

    if( !node( notifications ).isNode() || !node( cockpit ).isNode() ){
        return false;

    }
    status = parseInt( status );

    switch( status ){
        case 0:
        case 400:
        status = 'error';
        break;
        default:
        status = 'success';
    }
    cockpit.className = 'cpb-active';

    o = document.createElement( 'div' );
    o.className = 'comet-notification ' + status;
    o.innerHTML = '<p>' + ( utils.isString( str ) || utils.isNumber( str ) ? utils.stripTags( str.toString() ) : '' ) + '</p>';

    button = document.createElement( 'button' );
    button.className = 'comet-button comet-close comet-closeNote';
    button.innerHTML = '<span class="cico cico-x"></span>';

    o.appendChild( button );

    notifications.appendChild( o );

    node( button ).on( 'click', function( e, ui ){
        e.preventDefault();
        var _note;

        if( ( ( _note = node( ui.parentNode ) ).isNode() ) ){
            _note.remove();

        }

    });

}