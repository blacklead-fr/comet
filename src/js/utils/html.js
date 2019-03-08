import sanitize from './sanitize.js';
import parse from './parse.js';
import utils from './utils.js';
import _icon from './icon.js';
import ajax from './ajax.js';
import editor from './ui/editor.js';

/* global document */

const html = {

    editor: editor,
    /* 
    type: default,
	inner: '',
	ed_id: 0,
	id: 0,
    match: 0,
	tag: div,
	classes: ''
	editable: false
    */
    
    content: function( entry ){
        const tags = [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'span', 'div', 'aside', 'code', 'pre', 'blockquote', 'article', 'section', 'main' ];
        const allowed = '<span><br><ins><u><i><em><strong><b><strike><del><a><abbr><address><code><hr><mark><sup><sub><s>';
        var attr = '';
        var editable, content, tag, classes, o;

        if( !utils.isObject( entry ) ){
            return '';

        }
        tag = utils.isString( entry.tag ) ? ( tags.indexOf( tag = utils.trim( entry.tag.toLowerCase() ) ) > -1 ? tag : 'p' ) : 'p';
        editable = utils.isBool( entry.editable ) ? entry.editable : false;
        content = utils.isString( entry.inner ) ? utils.stripTags( entry.inner, allowed ) : '';
        classes = !utils.isStringEmpty( entry.classes ) ? utils.trim( entry.classes ) : '';

        if( editable && !utils.isStringEmpty( entry.match ) && ( entry.id = parse.id( entry.id ) ) ){
            classes += ' cpb-editable';
            attr = ' data-match="' + utils.trim( entry.match ) + '"';
            attr += ' data-id="' + entry.id + '"';

            if( content.length < 1 ){
                content = 'Write something here...';

            }

        } 
        o = '<' + tag;

        if( !utils.isStringEmpty( classes ) ){
            o += ' class="' + utils.trim( classes ) + '"';

        }
        o += attr;
        o += '>';
        o += content;
        o += '</' + tag + '>';

        return o;

    },

    image: function( entry ){
        var classes, tmp, src, img;

        if( !utils.isObject( entry ) || utils.isStringEmpty( src = ( utils.isString( entry.src ) ? utils.trim( utils.stripTags( entry.src ) ) : '' ) ) ){
            return false;

        }
        classes = utils.isArray( entry.classes ) ? entry.classes : [];
        classes[classes.length] = 'cpb-image';

        img = document.createElement( 'img' );
        img.className = classes.join( ' ' );
        img.src = utils.escUrl( src );

        if( ( tmp = sanitize.number({ value: entry.width, min: 0 }) ) > 0 ){
            img.width = tmp;

        }

        if( ( tmp = sanitize.number({ value: entry.height, min: 0 }) ) > 0 ){
            img.height = tmp;

        }

        if( !utils.isStringEmpty( tmp = ( utils.isString( entry.alt ) ? utils.trim( utils.stripTags( entry.alt ) ) : '' ) ) ){
            img.alt = tmp;

        }

        if( utils.isBool( entry.auto ) && entry.auto === true ){

            img.onload = function(){
                this.width = this.naturalWidth;
                this.height = this.naturalHeight;

            };

        }
        return img;

    },

    icon: function( entry ){
        const decoded = _icon.decode( entry );

        return ( !decoded ? '' : _icon.get_svg( decoded.set_id, decoded.icon_id ) );

    },

    element: function( opts, ondone ){
        var id;

        if( !utils.isObject( opts ) || !utils.isFunction( ondone ) || !( id = parse.id( opts.id ) ) ){
            return false;

        }

        ajax({
            do: 'element',
            element: utils.trim( opts.element ),
            id: id,
            data: utils.json_encode( utils.isObject( opts.data ) ? opts.data : {} )

        }).done( ondone );
        //return '<span class="cometPending">...</span>';

    },

    placeholder: function(){
        return '<div class="cpb-empty cpb-placeholder"><span>Placeholder</span></div>';

    }

};

export default html;