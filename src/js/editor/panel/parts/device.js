import parse from '../../../utils/parse.js';
import node from '../../../utils/node.js';
import redefine from '../../redefine.js';

export default function( ev, ui ){
	ev.preventDefault();
	ev.stopPropagation();
	const frame = document.getElementById( 'cpb-content' );
	const active = 'cpb-active';
	var isLocked = false;
	var device, device1, tmp, _p, _pp, _ppp, dren, c, dren1, fields, f, _field, field, classes, ico, icon, _child;

	function _device( comp ){
		var dv = false;

		if( !( dv = parse.dataset( comp, 'device' ) ) || [ 'd', 't', 'm' ].indexOf( dv ) < 0 ){
			return false;

		}
		return dv;

	}

	function _active(){
		var count = 0;
		var children, __child, a;

		if( ( children = _ppp.prop().children ).length < 1 ){
			return false;
		}

		for( a in  children ){

			if( !( ( __child = node( children[a] ) ).isNode() ) ){
				continue;

			}

			if( __child.hasClass( 'comet-editorLock' ) && __child.hasClass( active ) ){
				count++;

			}

		}
		return ( count > 0 );

	}

	function toggleDeviceClass(){
		const _frame = node( frame );
		const cls = {
			d: 'cpb-desktopMode',
			t: 'cpb-tabletMode',
			m: 'cpb-mobileMode'
		};

		if( !( device in cls ) ){
			return;

		}

		for( c in cls ){
			_frame.removeClass( cls[c] );

		}
		_frame.addClass( cls[device] );

	}

	if( !( device = _device( ui ) ) || !( ( _p = node( ui.parentNode ) ).isNode() ) || !( ( _pp = node( _p.prop().parentNode ) ).isNode() ) ){
		return;

	}

	if( !( ( _ppp = node( _pp.prop().parentNode ) ).isNode() ) || ( dren = _ppp.prop().children ).length < 1 ){
		return;

	}

	if( device === 'd' ){
		ico = 'cico-desktop';
		redefine.workflow();

	}else if( device === 't' ){
		ico = 'cico-tablet';
		frame.style.maxWidth = '800px';

	}else{
		ico = 'cico-mobile';
		frame.style.maxWidth = '400px';

	}
	toggleDeviceClass();
	_pp.removeClass( active );

	if( ( dren1 = _pp.prop().children ).length > 0 ){

		icon = document.createElement( 'span' );
		icon.className = 'cico ' + ico;

		for( c in dren1 ){

			if( !node( dren1[c] ).hasClass( 'cico' ) ){
				continue;

			}
			_pp.prop().replaceChild( icon, dren1[c] );

		}

	}
	isLocked = _active();

	for( c in dren ){

		if( !( ( _child = node( dren[c] ) ).hasClass( 'comet-modalControlBunch' ) ) || ( fields = _child.prop().children ).length < 1 ){
			continue;

		}

		for( f in fields ){

			if( !( ( _field = node( fields[f] ) ).isNode() ) || !_field.hasClass( 'comet-modalFieldWrap' ) || !( device1 = _device( field = _field.prop() ) ) ){
				continue;

			}
			field.className = 'comet-modalFieldWrap';
			field.style.display = 'none';

			if( device !== device1 ){
				continue;

			}
			classes = active;

			if( isLocked ){
				classes += ' comet-modalFieldLocked';

			}
			_field.addClass( classes );
			field.style.display = 'block';
			
		}
	}
};