import node from '../../../utils/node.js';

export default function( ev, ui  ){
	ev.preventDefault();
	ev.stopPropagation();

	const _ui = node( ui );
	const active = 'cpb-active';
	const locked = 'comet-modalFieldLocked';
	var enabled = false;
	var icon, ico, _p, dren, x, _child, fields, _field, f;

	if( _ui.hasClass( active ) ){
		_ui.removeClass( active );
		ico = 'cico-unlock';
		enabled = false;

	}else{
		_ui.addClass( active );
		ico = 'cico-lock';
		enabled = true;

	}

	if( !_ui.hasClass( 'comet-editorLock' ) ){
		return;

	}

	if( ( dren = ui.children ).length > 0 ){
		icon = document.createElement( 'span' );
		icon.className = 'cico ' + ico;

		for( x in dren ){

			if( !node( dren[x] ).hasClass( 'cico' ) ){
				continue;

			}
			ui.replaceChild( icon, dren[x] );

		}
	}

	if( !( ( _p = node( ui.parentNode ) ).isNode() ) || ( dren = _p.prop().children ).length < 1 ){
		return;

	}

	for( x in dren ){

		if( !( ( _child = node( dren[x] ) ).hasClass( 'comet-modalControlBunch' ) ) || ( fields = _child.prop().children ).length < 1 ){
			continue;

		}

		for( f in fields ){

			if( !( ( _field = node( fields[f] ) ).hasClass( 'comet-modalFieldWrap' ) ) || !_field.hasClass( active ) ){
				continue;

			}
			_field.removeClass( locked );

			if( enabled ){
				_field.addClass( locked );

			}
		}
	}
};
