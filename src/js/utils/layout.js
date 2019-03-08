import __target from '../editor/target.js';
import sanitize from './sanitize.js';
import Element from './element.js';
import utils from './utils.js';
import parse from './parse.js';
import style from './style.js';
import css from './css.js';

/* global document, console */

export default function ( data, g_css ){

	const _d = document;

	const _priv = {

		css: function( id, type, dt ){
			var o, tmp, classe, br, bo, bg, pad, mar;

			if( [ 'sections', 'rows', 'columns' ].indexOf( type ) < 0 || !utils.isObject( dt ) ){
				return '';

			}

			classe = '.cpb-';

			switch( type ){
				case 'sections':
				classe += 'section-' + id + '.cpb-section > .cpb-sectionContent';
				break;

				case 'rows':
				classe += 'row-' + id + '.cpb-row';
				break;

				case 'columns':
				classe += 'column-' + id + '.cpb-column';
				break;

				default:
				return '';

			}

			bg = css.background({
				type: dt.bgt,
				gradient: {
					type: dt.bgor,
					gradient: dt.gradient,
					angle: dt.bgor === 'radial' ? dt.shape : dt.angle

				},
				color: dt.bgc,
				url: dt.image,
				position: dt.pos,
				repeat: dt.repeat,
				size: dt.size,
				att: dt.att,

			});

			bo = css.border({
				color: dt.bc,
				style: dt.bs,
				top: dt.bwt,
				right: dt.bwr,
				bottom: dt.bwb,
				left: dt.bwl,
			});

			br = css.borderRadius( dt.bradt, dt.bradr, dt.bradb, dt.bradl );
			pad = css.padding( dt.padt, dt.padr, dt.padb, dt.padl, 'px', 'px' );
			mar = css.margin( dt.mart, dt.marr, dt.marb, dt.marl, 'px', 'px' );

			switch( type ){

				case 'sections':
				o = classe + '{' + bg + bo + mar + pad + br + '}';
				break;

				case 'rows':
				o = '';

				if( dt.width === 'cust' && ( tmp = sanitize.number({ value: dt.wsize, min: 300 }) ) !== null && tmp >= 300 ){
					o += classe + '{' + css.render( 'max-width', tmp + 'px' ) + '}';

				}
				classe += ' .cpb-rowContent';
				o += classe + '{' + bg + bo + pad + br + mar;

				switch( dt.alg ){

					case 't':
					o += css.render( 'align-items', 'flex-start' );
					break;

					case 'b':
					o += css.render( 'align-items', 'flex-end' );
					break;

					case 'c':
					o += css.render( 'align-items', 'center' );
					break;
				}
				o += '}';
				break;

				case 'columns':
				o = '';

				if( ( tmp = sanitize.number({ value: dt.wsize, min: 10, max: 100 }) ) !== null ){
					o += classe + '{' + css.render( 'width', tmp + '%' ) + '}';

				}
				classe += ' .cpb-columnContent';
				o += classe + '{' + bg + bo + pad + br + mar + '}';
				break;

				default:
				return '';
			}

			if( 'ov' in dt && 'ovc' in dt ){

				if( [ 'true', true ].indexOf( dt.ov ) > -1 && !utils.isEmpty( tmp = sanitize.color( dt.ovc ) ) ){

					o += classe + ' > .cpb-backgroundComponents > .cpb-backgroundOverlay{background:' + tmp + ';}';

					if( br !== '' ){
						o += classe + ' > .cpb-backgroundComponents{' + br + '}';
					}
				}
			}
			pad = css.padding( dt.padtt, dt.padrt, dt.padbt, dt.padlt, 'px', 'px' );
			mar = css.margin( dt.martt, dt.marrt, dt.marbt, dt.marlt, 'px', 'px' );

			if( pad !== '' || mar !== '' ){
				o += '.cpb-tabletMode ' + classe + '{' + pad + mar + '}';
				o += css.responsive( 't', classe + '{' + pad + mar + '}' );

			}
			pad = css.padding( dt.padtm, dt.padrm, dt.padbm, dt.padlm, 'px', 'px' );
			mar = css.margin( dt.martm, dt.marrm, dt.marbm, dt.marlm, 'px', 'px' );

			if( pad !== '' || mar !== '' ){
				o += '.cpb-mobileMode ' + classe + '{' + pad + mar + '}';
				o += css.responsive( 'm', classe + '{' + pad + mar + '}' );

			}

			style( id, type ).insert( o );

		},

		hasConnection: function( connection ){
			return ( utils.isObject( data ) && utils.isObject( data[connection] ) );

		},

		backgroundTags: function( dt ){
			const url = utils.isString( dt.vurl ) ? utils.trim( utils.stripTags( dt.vurl ) ) : '';
			var o = '<div class="cpb-backgroundComponents">';

			if( [ 'true', true ].indexOf( dt.vid ) > -1 && !utils.isEmpty( url ) ){
				o += '<video class="cpb-backgroundVideo" src="' + utils.escUrl( url ) + '" muted loop autoplay preload="auto"></video>';

			}

			if( [ 'true', true ].indexOf( dt.ov ) > -1 && 'ovc' in dt ){
				o += '<div class="cpb-backgroundOverlay"></div>';

			}
			o += '</div>';

			return o;

		}

	};

	const prop = {

		css: false,

		init: function( parent, from ){
			var _do, ids, s, fragment, section;

			if( !utils.isObject( data ) || utils.isStringEmpty( data._sections ) || !_priv.hasConnection( 'sections' ) ){
				return false;

			}

			if( !utils.isArray( ( ids = parse.ids( utils.trim( data._sections ), 'array' ) ), 1 ) ){
				return false;

			}
			_do = 0;
			from = parse.id( from );
			fragment = _d.createDocumentFragment();

			for( s = 0; s < ids.length; s++ ){

				if( _do !== 1 && from !== false && from !== ids[s] ){
					continue;

				}

				if( !( section = prop.section( ids[s] ) ) ){
					continue;

				}
				fragment.appendChild( section );
				_do = 1;

			}
			parent.appendChild( fragment );
			return true;

		},

		section: function( id ){
			var html, section, cl, r, ids, fragment, row;

			if( !_priv.hasConnection( 'sections' ) || !( id = parse.id( id ) ) || !utils.isObject( data.sections[id] ) ){
				return false;

			}
			_priv.css( id, 'sections', data.sections[id] );

			if( g_css ){
				return true;

			}
			cl = 'cpb-section-' + id;
			cl += ' cpb-section';

			html = '<div class="cpb-rows cpb-sectionContent">';
			html += _priv.backgroundTags( data.sections[id] );
			html += '</div>';

			section = _d.createElement( 'div' );
			section.className = cl;
			section.dataset.id = id;
			section.innerHTML = html;

			if( _priv.hasConnection( 'rows' ) && !utils.isStringEmpty( data.sections[id]._rows ) && utils.isArray( ( ids = parse.ids( utils.trim( data.sections[id]._rows ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( r = 0; r < ids.length; r++ ){

					if( !( row = prop.row( ids[r] ) ) ){
						continue;

					}
					fragment.appendChild( row );

				}
				section.firstChild.appendChild( fragment );

			}
			return section;

		},

		row: function( id ){
			var c, html, row, ids, cl, nb, fragment, column;

			if( !_priv.hasConnection( 'rows' ) || !( id = parse.id( id ) ) || !utils.isObject( data.rows[id] ) ){
				return false;

			}
			_priv.css( id, 'rows', data.rows[id] );

			if( g_css ){
				return true;

			}

			cl = 'cpb-row';
			cl += ' cpb-row-' + id;

			html = '<div class="cpb-rowContent" data-ncol="0">';
			html += _priv.backgroundTags( data.rows[id] );
			html += '</div>';

			row = _d.createElement( 'div' );
			row.className = cl;
			row.dataset.id = id;
			row.innerHTML = html;

			nb = 0;

			if( _priv.hasConnection( 'columns' ) && !utils.isStringEmpty( data.rows[id]._columns ) && utils.isArray( ( ids = parse.ids( utils.trim( data.rows[id]._columns ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( c = 0; c < ids.length; c++ ){

					if( !( column = prop.column( ids[c] ) ) ){
						continue;

					}
					fragment.appendChild( column );
					nb++;
				}
				row.firstChild.appendChild( fragment );

			}
			row.firstChild.dataset.ncol = nb;
			return row;

		},

		column: function( id ){
			var e, html, column, ids, cl, fragment, element;

			if( !_priv.hasConnection( 'columns' ) || !( id = parse.id( id ) ) || !utils.isObject( data.columns[id] ) ){
				return false;

			}
			_priv.css( id, 'columns', data.columns[id] );

			if( g_css ){
				return true;

			}

			cl = 'cpb-column';
			cl += ' cpb-column-' + id;

			html = '<div class="cpb-columnContent">';
			html += _priv.backgroundTags( data.columns[id] );
			html += '</div>';

			column = _d.createElement( 'div' );
			column.className = cl;
			column.dataset.id = id;
			column.innerHTML = html;

			if( _priv.hasConnection( 'elements' ) && !utils.isStringEmpty( data.columns[id]._elements ) && utils.isArray( ( ids = parse.ids( utils.trim( data.columns[id]._elements ), 'array' ) ), 1 ) ){
				fragment = _d.createDocumentFragment();

				for( e = 0; e < ids.length; e++ ){

					 if( !( element = prop.element( ids[e] ) ) ){
					 	continue;

					 }
					 fragment.appendChild( element );
				}
				column.firstChild.appendChild( fragment );

			}
			return column;

		},

		element: function( id, state ){
			var cl, element, fragment, el;

			if( !_priv.hasConnection( 'elements' ) || !( id = parse.id( id ) ) || !utils.isObject( data.elements[id] ) || utils.isStringEmpty( data.elements[id]._type ) ){
				return false;

			}

			if( !( el = Element( utils.trim( data.elements[id]._type ), id, sanitize.data( data, id ) ) ) ){
				return false;

			}
			style( id, 'elements' ).insert( el.css() );

			if( g_css || ( [ 'view', 'VIEW' ].indexOf( state ) > -1 && !el.force_js ) ){
				return true;
				
			}
			fragment = _d.createDocumentFragment();
			element = _d.createElement( 'div' );
			fragment.appendChild( element );

			cl = 'cpb-element';
			cl += ' cpb-element' + utils.capitalize( utils.trim( data.elements[id]._type ) );
			cl += ' cpb-elementNode' + id;

			console.time('element');
			element.className = cl;
			element.dataset.id = id;
			element.innerHTML = '<div class="cpb-elementContent"></div>';
			el.view( element );
			console.timeEnd('element');

			if( [ 'update', 'UPDATE', 'updating', 'UPDATING', true, 1 ].indexOf( state ) > -1 ){
				__target().set({node: element });

			}
			return fragment;

		},

	};
	g_css = ( ( utils.isBool( g_css ) && g_css ) || ( utils.isString( g_css ) && utils.trim( g_css.toLowerCase() ) === 'css' ) );
	prop.css = g_css;

	return prop;

}