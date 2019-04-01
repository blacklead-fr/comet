import utils from './utils.js';

/* global __cometdata, XMLHttpRequest */

export default function( data ){
    const ret = {

        done: function( todo ){

            if( !utils.isFunction( todo ) || !utils.isObject( xhr ) ){
                return;

            }

            xhr.onload = function(){
                const response = xhr.status === 200 ? xhr.responseText : false;
                todo( response );

            };

        }

    };
    var xhr;

    if( !utils.isObject( data ) || utils.isStringEmpty( data.do ) ){
        return ret;

    }

    function encode( obj ){
        var _eStr = '';
        var prop;

        for( prop in obj ){

            if( !( prop in obj ) ){
                continue;

            }
            _eStr += ( _eStr.length > 0 ? '&' : '' ) + encodeURI( prop + '=' + obj[prop] );

        }
        return _eStr;

    }
    data.do = utils.trim( data.do );
    data.action = utils.isStringEmpty( __cometdata.user ) || __cometdata.user !== 'true' ? 'cometnoprivactions' : 'cometprivactions';

    if( 'security' in __cometdata ){
        data.security = __cometdata.security;
    }

    xhr = new XMLHttpRequest();
    xhr.open( 'POST' , __cometdata.ajax_url, true );
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

    xhr.send( encode( data ) );

    return ret;
}