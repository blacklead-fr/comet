import gradient from '../../utils/gradient.js';
import sanitize from '../../utils/sanitize.js';
import utils from '../../utils/utils.js';
//import kitImage from '../media/kit.js';

export default function( id, field, data ){
	const prop = {};
	var type, val, dt, classes, adr, isResponsive, isSwitch, oReturn;

	if( !utils.isObject( field ) || !( 'type' in field ) || utils.isStringEmpty( type = field.type ) ){
		return '';

	}
    type = utils.trim( type );

	function getValue( _id, _field ){
		var value = '';

		if( 'std' in _field ){
			value = _field.std.toString();

		}

		if( utils.isObject( data ) && _id in data ){
			value = data[_id].toString();

		}
		return value;

	}

	prop.textarea = function(){
		var op;

		if( type === 'editor' ){
			classes += ' comet-fieldEditor';

			if( !utils.isStringEmpty( op = field.option ) && [ 'advanced', 'force_tag' ].indexOf( op = utils.trim( op ) ) > -1 ){
				classes += op === 'advanced' ? ' comet-fieldEditorAdvanced' : ' comet-fieldEditorForceTag';

			}
		}
		return '<textarea id="' + adr + '" name="' + id +'" class="' + classes + '" ' + dt + '>' + val + '</textarea>';

	};

	prop.numbers = function(){
		var _label, _device, _id, _val, cs, c, d, tmp, o;

		if( !utils.isObject( cs = field.values ) ){
			return '';

		}

		function generate(){
			var ot = '';
			var adr = 'comet-modalField' + _id;
			var active = 'cpb-active';

			if( _device !== 'd' ){
				active = '';

			}
			ot += '<div class="comet-modalFieldWrap ' + active + '" data-device="' + _device + '">';
			ot += '<input id="' + adr + '" type="number" name="' + _id +'" class="' + classes + '" value="' + _val + '" ' + dt + '/>';

			if( !utils.isStringEmpty( _label ) ){
				ot += '<label for="' + adr + '">' + _label + '</label>';

			}
			ot += '</div>';
			return ot;

		}

		o = '<button class="comet-button comet-edControlInline comet-editorLock" title="' + __cometi18n.ui.unlocked + '"><span class="cico cico-unlock"></span></button>';

		if( isResponsive ){
			o += '<div class="comet-button comet-edControlInline comet-editorSwitchDevice">';
			o += '<span class="cico cico-desktop"></span>';
			o += '<div class="comet-edSDevices">';
			o += '<button class="comet-edSDevice" data-device="d"><span class="cico cico-desktop"></span><span class="comet-edSDTitle">' + __cometi18n.ui.desktop + '</span></button>';
			o += '<button class="comet-edSDevice" data-device="t"><span class="cico cico-tablet"></span><span class="comet-edSDTitle">' + __cometi18n.ui.tablet + '</span></button>';
			o += '<button class="comet-edSDevice" data-device="m"><span class="cico cico-mobile"></span><span class="comet-edSDTitle">' + __cometi18n.ui.mobile + '</span></button>';
			o += '</div>';
			o += '</div>';

		}
		o += '<div class="comet-modalControlBunch">';

		for( c in cs ){
			tmp = id + c;
			_id = tmp;
			_val = getValue( _id, cs[c] );
			_label = utils.isString( cs[c].label ) ? utils.trim( utils.stripTags( cs[c].label ) ) : '' ;
			_device = 'd';
			o += generate();

			if( !isResponsive ){
				continue;

			}

			for( d = 1; d < 3; d++ ){
				_device = d === 1 ? 't' : 'm';
				_id = tmp + _device;
				_val = getValue( _id, cs[c] );
				o += generate();

			}
		}
		o += '</div>';

		return o;

	};

	prop.range = function(){
		var o, mms = '';

		if( 'min' in field ){
			mms += ' min="' + field.min + '"';

		}
        
		if( 'max' in field ){
			mms += ' max="' + field.max + '"';

		}

		if( 'step' in field ){
			mms += ' step="' + field.step + '"';

		}
        classes += ' comet-fieldRange';
		o = '<input type="hidden" name="' + id +'" class="' + classes + '" value="' + val + '" ' + mms + ' ' + dt + '/>';
		o += '<div class="comet-eRValueUnit">';
        o += '<span class="comet-eRValue">' + val + '</span>';

        if( utils.isString( field.unit ) ){
            o += utils.trim( utils.stripTags( field.unit ) );

        }
        o += '</div>';
        return o;

    };

    prop.number = function(){
    	var o, unit;

    	o = '<input type="number" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';

    	if( utils.isString( unit = field.unit ) && ( unit = utils.trim( utils.stripTags( unit ) ) ).length > 0 ){
    		o += '<span class="comet-modalFieldUnit">' + unit + '</span>';

    	}
    	return o;

    };

    prop.select = function(){
    	var cs, c, _c, o, selected;

    	if( !utils.isObject( cs = field.values ) ){
    		return '';

    	}

    	if( isSwitch && utils.isObject( field.to ) ){
    		dt += ' data-switch="' + encodeURI( JSON.stringify( field.to ) ) + '"';

    	}
    	o = '<select id="' + adr + '" name="' + id + '" class="' + classes + '" ' + dt + '>';

    	for( c in cs ){

            if( !utils.isString( c ) && !utils.isNumber( c ) ){
                continue;

            }
    		_c = utils.trim( c.toString() );
    		selected = _c === val ? ' selected="selected"' : '';
    		o += '<option value="' + _c + '"' + selected + '>' + cs[c] + '</option>';

    	}
    	o += '</select>';
    	return o;

    };

    prop.radio = function(){
    	var cs, c, _c, o, _id, _adr, _classes, checked;

    	if( !utils.isObject( cs = field.values ) ){
    		return '';

    	}
    	o = '<div class="comet-modalControlRadioWrap">';

    	for( c in cs ){

    		if( !utils.isObject( cs[c] ) || !utils.isString( cs[c].title ) || ( !utils.isString( c ) && !utils.isNumber( c ) ) ){
    			continue;

    		}
    		_c = utils.trim( c.toString() );
    		_id = id + _c;
    		_adr = 'comet-modalField' + _id;
    		_classes = 'comet-modalFieldRadioWrap';
    		checked = '';

    		if( val === _c ){
    			checked = ' checked="checked"';
    			_classes += ' cpb-active';

    		}
    		o += '<label for="' + _adr + '" class="' + _classes + '">';
    		_classes = 'comet-modalFieldRadioLabel';

    		if( utils.isString( cs[c].icon ) ){
    			o += '<span class="comet-modalFieldRadioIcon ' + utils.trim( utils.stripTags( cs[c].icon ) ) + '"></span>';
    			_classes += ' comet-tooltip';

    		}
    		o += '<span class="' + _classes + '">' + utils.trim( utils.stripTags( cs[c].title, '<b><strong><i><span><u><ins>' ) ) + '</span>';
    		o += '<input id="' + _adr + '" type="radio" name="' + id +'" class="' + classes + '" value="' + _c + '"' + checked + ' ' + dt + '/>';
    		o += '</label>';

    	}
    	o += '</div>';
    	return o;

    };

    prop.checkbox = function(){
        const checked = val == 'true' ? ' checked="checked"' : '';

        return '<input type="checkbox" id="' + adr + '" name="' + id +'" class="' + classes + '" value="true" ' + dt + checked +' />';

    };

    prop.image = function(){
        var o;

        classes += ' comet-fieldImage';

        o = '<div class="comet-uploader comet-image comet-wrapper">';
        //o += kitImage( val ).outerHTML;
        o += '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
        o += '</div>';

        return o;

    };

    prop.icon = function(){
        var o;

        classes += ' comet-fieldIcon';

        o = '<div class="comet-uploader comet-icon comet-wrapper">';
        o += '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';
        o += '</div>';

        return o;

    };

    prop.gradient = function(){
        classes += ' comet-fieldGradient';
        return '<input type="hidden" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';


    };

    prop.default = function(){
        var o = '';

        if( type === 'color' ){
            classes += ' comet-fieldColor';
            
        }
        o += '<input type="text" id="' + adr + '" name="' + id +'" class="' + classes + '" value="' + val + '" ' + dt + '/>';

        return o;

    };

    val = getValue( id, field );
    isResponsive = utils.isString( field.responsive ) && [ 'true', 'yes' ].indexOf( ( field.responsive ).toLowerCase() ) > -1 ? true : false;
    isSwitch = utils.isString( field.switch ) && [ 'true', 'yes' ].indexOf( ( field.switch ).toLowerCase() ) > -1 ? true : false;
    adr = 'comet-modalField' + id;
    dt = 'data-type="' + type + '"';
    classes = 'comet-field comet-rendField';

    if( isSwitch ){
    	classes += ' comet-fieldSwitch';

    }
    oReturn = '<div class="comet-modalControl comet-modalControl' + utils.capitalize( type ) + '">';

    if( typeof prop[type] === 'function' ){
        oReturn += prop[type]();

    }else{

        if( type === 'editor' ){
            oReturn += prop.textarea();

        }else{
            oReturn += prop.default();

        }
    }
    oReturn += '</div>';

    return oReturn;

}