import sanitize from './sanitize.js';
import gradient from './gradient.js';
import utils from './utils.js';

const css = {};

function mu( top, right, bottom, left, vunit, hunit ){
	var x = null, y = null, o;

	function autoOrNumber( val ){

		if( utils.isString( val ) ){

			if( ( val = utils.trim( val.toLowerCase() ) ) === 'auto' ){
				return 'auto';

			}

		}
		return sanitize.number({ value: val });

	}

	top = sanitize.number( top );
	right = autoOrNumber( right );
	bottom = sanitize.number( bottom );
	left = autoOrNumber( left );
	vunit = sanitize.unit( vunit );
	hunit = sanitize.unit( hunit );

	if( top === bottom ){
		y = top;
	}
	if( left === right ){
		x = left;
	}

	if( y !== null && x !== null ){
		if( y === x ){
			if( y === 0 ){
				return 0;
			}
			if( vunit === hunit ){
				return utils.trim( sanitize.valueUnit( y, vunit ) );
			}
		}
		return utils.trim( sanitize.valueUnit( y, vunit ) + ' ' + sanitize.valueUnit( x, hunit ) );
	}
	o = sanitize.valueUnit( top, vunit );
	o += ' ' + sanitize.valueUnit( right, hunit );
	o += ' ' + sanitize.valueUnit( bottom, vunit );
	if( x === null ){
		o += ' ' + sanitize.valueUnit( left, hunit );
	}
	return utils.trim( o );


};

css.render = function( style, value ){

	if( utils.isStringEmpty( style ) || ( !utils.isNumber( value ) && utils.isStringEmpty( value ) ) ){
		return '';

	}
	style = utils.trim( style, ':' );

	return style + ':' + value + ';';
};

css.padding = function( top, right, bottom, left, vunit, hunit ){
	const _mu = mu( top, right, bottom, left, vunit, hunit );
	return ( _mu === '' ? '' : css.render( 'padding', _mu ) );
};

css.margin = function( top, right, bottom, left, vunit, hunit ){
	const _mu = mu( top, right, bottom, left, vunit, hunit );
	return ( _mu === '' ? '' : css.render( 'margin', _mu ) );
};

css.borderWidth = function( top, right, bottom, left ){
	const _mu = mu( top, right, bottom, left, 'px', 'px' );
	return ( _mu === '' ? '' : css.render( 'border-width', _mu ) );
};

css.borderRadius = function( top, right, bottom, left ){
	const _mu = mu( top, right, bottom, left, 'px', 'px' );
	var o;

	if( _mu !== '' ){
		o = css.render( 'border-radius', _mu );
		o += css.render( '-webkit-border-radius', _mu );
		o += css.render( '-moz-border-radius', _mu );
		return o;

	}
	return '';
	
};

css.border = function( entry ){
	const numb = { value: 0, min: 0, default: 0 };
	var t, r, b , l, x, y, o, w;

	if( !utils.isObject( entry ) ){
		return '';

	}

	t = r = b = l = 0;
	x = y = null;

	switch( entry.style ){
		case 's':
		case 'sld':
		case 'solid':
		entry.style = 'solid';
		break;

		case 'dot':
		case 'dtd':
		case 'dotted':
		entry.style = 'dotted';
		break;

		case 'das':
		case 'dhd':
		case 'dashed':
		entry.style = 'dashed';
		break;

		case 'dbe':
		case 'dble':
		case 'double':
		entry.style = 'double';
		break;

		case 'in':
		case 'ins':
		case 'inner':
		case 'inset':
		entry.style = 'inset';
		break;

		case 'ou':
		case 'out':
		case 'outset':
		case 'outside':
		entry.style = 'outset';
		break;

		default:
		entry.style = 'none';

	}

	if( entry.style === 'none' || ( entry.color = sanitize.color( entry.color ) ) === '' ){
		return '';

	}

	numb.value = entry.top;
	t = sanitize.number( numb );

	numb.value = entry.right;
	r = sanitize.number( numb );

	numb.value = entry.bottom;
	b = sanitize.number( numb );

	numb.value = entry.left;
	l = sanitize.number( numb );

	if( t === b ){
		y = t;

	}

	if( r === l ){
		x = r;

	}

	if( x !== null && y !== null ){

		if( x === y ){

			if( x === 0 ){
				return '';

			}
			o = sanitize.valueUnit( y, 'px' );
			o += ' ' + entry.style;
			o += ' ' + entry.color;
			return css.render( 'border', o );

		}
		o = css.render( 'border-width', sanitize.valueUnit( y, 'px' ) + ' ' + sanitize.valueUnit( x, 'px' ) );
		o += css.render( 'border-style', entry.style );
		o += css.render( 'border-color', entry.color );
		return o;

	}

	w = sanitize.valueUnit( t, 'px' );
	w += ' ' + sanitize.valueUnit( r, 'px' );
	w += ' ' + sanitize.valueUnit( b, 'px' );

	if( x === null ){
		w += ' ' + sanitize.valueUnit( l, 'px' );

	}

	o = css.render( 'border-width', w );
	o += css.render( 'border-style', entry.style );
	o += css.render( 'border-color', entry.color );
	return o;

};

css.textShadow = function( entry ){
	var w;

	if( !utils.isObject( entry ) ){
		return '';
	}
	entry.blur = sanitize.number( { value: entry.blur, default: 0, min: 0 } );
	entry.x = sanitize.number( { value: entry.x, default: 0 } );
	entry.y = sanitize.number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 ) || ( entry.color = sanitize.color( entry.color ) ) === '' ){
		return '';

	}
	w = sanitize.valueUnit( entry.x, 'px' );
	w += ' ' + sanitize.valueUnit( entry.y, 'px' );
	w += ' ' + sanitize.valueUnit( entry.blur, 'px' );
	w += ' ' + entry.color;

	return css.render( 'text-shadow', w );

};

css.boxShadow = function( entry ){
	var w, o;

	if( !utils.isObject( entry ) ){
		return '';
	}
	function isInset(){
		const _in = utils.isString( entry.inset ) || utils.isNumber( entry.inset ) ? utils.trim( ( ( entry.inset ).toString() ).toLowerCase() ) : entry.inset;
		
		switch( _in ){
			case 'true':
			case true:
			case 'in':
			case 'inset':
			case '1':
				return true;
			default:
				return false;

		}

	}
	entry.blur = sanitize.number( { value: entry.blur, default: 0, min: 0 } );
	entry.spread = sanitize.number( { value: entry.spread, default: 0 } );
	entry.x = sanitize.number( { value: entry.x, default: 0 } );
	entry.y = sanitize.number( { value: entry.y, default: 0 } );

	if( ( entry.blur < 1 && entry.x === 0 && entry.y === 0 && entry.spread === 0 ) || ( entry.color = sanitize.color( entry.color ) ) === '' ){
		return '';

	}
	w = sanitize.valueUnit( entry.x, 'px' );
	w += ' ' + sanitize.valueUnit( entry.y, 'px' );
	w += ' ' + sanitize.valueUnit( entry.blur, 'px' );
	w += ' ' + sanitize.valueUnit( entry.spread, 'px' );
	w += ' ' + entry.color;
	w += isInset() ? ' inset' : '';

	o = css.render( 'box-shadow', w );
	o += css.render( '-moz-box-shadow', w );
	o += css.render( '-webkit-box-shadow', w );

	return o;

};

css.background = function( entry ){
	const tools = {};
	var _grad, image, color, o, og, ou, tmp;

	if( !utils.isObject( entry ) ){
		return '';

	}
	_grad = image = color = false;
	o = og = ou = '';
	color = ( utils.isString( entry.type ) && utils.trim( entry.type ).toLowerCase() === 'color' );

	tools.position = function( pos ){

		pos = utils.isString( pos ) ? utils.trim( pos.toLowerCase() ) : '';

		switch( pos ){
			case 'lt':
			case 'leftop':
			case 'lefttop':
			case 'leftTop':
			return 'left top';

			case 'lc':
			case 'leftcenter':
			case 'leftCenter':
			return 'left center';

			case 'lb':
			case 'leftbottom':
			case 'leftBottom':
			return 'left bottom';

			case 'rt':
			case 'rightop':
			case 'righttop':
			case 'rightTop':
			return 'right top';

			case 'rc':
			case 'rightcenter':
			case 'rightCenter':
			return 'right center';

			case 'rb':
			case 'rightbottom':
			case 'rightBottom':
			return 'right bottom';

			case 'ct':
			case 'centertop':
			case 'centerTop':
			return 'center top';

			case 'cb':
			case 'centerbottom':
			case 'centerBottom':
			return 'center bottom';

			default:
			return 'center center';

		}

	};

	tools.repeat = function( rep ){

		rep = utils.isString( rep ) ? utils.trim( rep.toLowerCase() ) : '';

		switch( rep ){
			case 'no':
			case 'nr':
			case 'no-repeat':
			case 'norepeat':
			case 'norep':
			return 'no-repeat';

			case 'x':
			case 'repeat-x':
			case 'repeatx':
			case 'repx':
			case 'rx':
			return 'repeat-x';

			case 'y':
			case 'repeat-y':
			case 'repeaty':
			case 'repy':
			case 'ry':
			return 'repeat-y';

			case 's':
			case 'space':
			case 'sp':
			return 'space';

			case 'rd':
			case 'round':
			return 'round';

			default:
			return 'repeat';
		}

	};

	tools.size = function( size ){

		size = utils.isString( size ) ? utils.trim( size.toLowerCase() ) : '';

		switch( size ){

			case 'con':
			case 'contain':
			case 'container':
			return 'contain';

			case 'cov':
			case 'cover':
			return 'cover';

			default:
			return 'auto';

		}

	};

	tools.attachment = function( att ){

		att = utils.isString( att ) ? utils.trim( att.toLowerCase() ) : '';

		switch( att ){
			case 'fix':
			case 'fixed':
			return 'fixed';

			default:
			return 'scroll';
		}

	};

	if( !color && utils.isObject( entry.gradient ) && 'type' in entry.gradient && 'gradient' in entry.gradient && 'angle' in entry.gradient ){
		og = css.gradient( entry.gradient.type, entry.gradient.angle, entry.gradient.gradient );
		_grad = !utils.isEmpty( og );

	}

	if( !utils.isEmpty( tmp = sanitize.color( entry.color ) ) && color ){
		o += tmp;

	}


	if( !utils.isStringEmpty( entry.url ) ){
		image = true;
		ou = 'url(' + utils.trim( entry.url ) + ')';

	}

	if( _grad ){
		o += css.render( 'background-image', ou + ( image ? ', ' : ' ' ) + og );

	}else if( !_grad && image ){

		o += ' ' + ou;
	}

	if( 'repeat' in entry && image ){
		tmp = tools.repeat( entry.repeat );
		o += !_grad ? ' ' + tmp : css.render( 'background-repeat', tmp );

	}

	if( 'position' in entry && image ){
		tmp = tools.position( entry.position );
		o += !_grad ? ' ' + tmp : css.render( 'background-position', tmp );

	}

	if( !_grad ){
		o = css.render( 'background', utils.trim( o ) );
	}

	if( 'att' in entry && image ){
		o += css.render( 'background-attachment', tools.attachment( entry.att ) );
	}

	if( 'size' in entry && image ){
		o += css.render( 'background-size', tools.size( entry.size ) );

	}

	return o;


};

css.gradient = function( style, angle, colors ){
	var c, color, g;

	if( utils.isStringEmpty( colors ) || !utils.isArray( ( colors = gradient.decode( colors ) ), 2 ) ){
		return '';

	}

	if( style === 'radial' ){
		angle = utils.isString( angle ) && [ 'side', 's', 'sd' ].indexOf( utils.trim( angle ) ) > -1 ? 'side' : 'corner';
		g = 'radial-gradient( farthest-' + angle;

	}else{
		g = 'linear-gradient(';
		angle = sanitize.number( { value: angle, min: 0, max: 360, default: 0 } );

		switch( angle ){
			case 0:
			case 360:
			g += 'to top';
			break;

			case 180:
			g += 'to bottom';
			break;

			case 270:
			g += 'to left';
			break;

			case 90:
			g += 'to right';
			break;

			case 45:
			g += 'to top right';
			break;

			case 135:
			g += 'to bottom right';
			break;

			case 225:
			g += 'to bottom left';
			break;

			case 315:
			g += 'to top left';
			break;
			
			default:
			g += angle + 'deg';

		}

	}
	colors.sort(function (a, b){ return a.stop - b.stop; });

	for( c = 0; c < colors.length; c++ ){
		color = colors[c];

		if( !( 'color' in color ) || !( 'stop' in color ) || isNaN( color.stop ) ){
			continue;

		}
		g += ',' + color.color + ' ' + color.stop + '%';

	}
	g += ')';
	return g;
	
};

css.responsive = function( device, css ){
	const devices = [ 'mobile', 'm', 'M', 'tablet', 't', 'T', 'TABLET' ];
	var index;

	if( utils.isStringEmpty( css ) || ( index = mobile.indexOf( device ) ) < 0 ){
		return '';

	}
	return '@media only screen and (max-width:' + ( index <= 2 ? 400 : 800 ) + 'px){' + css + '}';

};

css.element = function( id, target, css, device ){
	const devices = [ 'mobile', 'm', 'M', 'tablet', 't', 'T', 'TABLET' ];
	const index = utils.isString( device ) ? devices.indexOf( device ) : -1;
	var targetClass;

	if( !utils.isNumber( id ) || !utils.isString( css ) ){
		return '';

	}
	targetClass = ( index > -1 ? ( '.cpb-devicetype-' + ( index <= 2 ? 'mobile' : 'tablet' ) + ' ' ) : '' );
	targetClass += '.cpb-element.cpb-elementNode' + id;
	targetClass += utils.isString( target ) ? ' ' + utils.trim( target ) : '';

	return targetClass + '{' + utils.trim( css ) + '}';

}

export default css;