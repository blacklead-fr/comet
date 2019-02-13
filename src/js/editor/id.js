import parse from '../utils/parse.js';
import utils from '../utils/utils.js';
import __data from './data.js';

export default function (){
	const prop = {};
	const data_ = __data();

	prop.create = function( type ){
		const metaData = data_.getData();
		var max = 0;

		if( !( type = parse.type( type ) ) ){
			return false;

		}

		if( !utils.isObject( metaData[type] ) ){
			metaData[type] = {};

		}
		max = !( max = parse.id( metaData[type]._max ) ) || max < 0 ? 0 : max;
		max = max + 1;

		metaData[type]._max = max;
		metaData[type][max] = {};
		data_.setData( metaData );

		return max;

	};

	prop.insert = function( id, type, catId, index ){
		const metaData = data_.getData();
		var _in, cat, ids, r;

		if( !( id = parse.id( id ) ) || ( catId = parse.id( catId ) ) === false || !( type = data_.hasType( type ) ) ){
			return false;

		}

		if( !( id in metaData[type] ) || !( cat = data_.getParent( type ) ) ){
			return false;

		}

		function injectId( str, tid, position ){
			var tp, a, b;

			if( utils.isStringEmpty( str ) ){
				return tid.toString();

			}

			if( position === 'last' ){
				if( str.substring( -1, 1 ) !== ',' ){
					str += ',';

				}
				str += tid.toString();

			}else if( position === 'first' ){

				if( str.substring( 0, 1 ) !== ',' ){
					str = ',' + str;

				}
				str = tid.toString() + str;

			}else if( ( position = parse.id( position ) ) !== false && ( tp = str.indexOf( position, 0 ) ) > -1 ){
				b = str.slice( 0, tp );
				a = str.slice( tp );
				str = b + id.toString() + ',' + a;

			}
			return str;

		}
		_in = '_' + type;

		if( type === 'sections' ){
			r = injectId( ( utils.isString( ids = metaData[_in] ) ? ids : '' ), id, index );

			if( r !== ids ){
				metaData[_in] = r;
				data_.setData( metaData );
				return true;

			}

		}else if( utils.isObject( metaData[cat] ) ){

			if( !( catId in metaData[cat] ) ){
				return false;

			}

			if( !utils.isObject( metaData[cat][catId] ) ){
				metaData[cat][catId] = {};

			}
			r = injectId( ( utils.isString( ids = metaData[cat][catId][_in] ) ? ids : '' ), id, index );

			if( r !== ids ){
				metaData[cat][catId][_in] = r;
				data_.setData( metaData );
				return true;

			}
		}
		return false;

	};

	prop.remove = function( id, type, pid ){
		const metaData = data_.getData();
		var _in, parent, tmp; 

		if( !( id = parse.id( id ) ) || !( type = parse.type( type ) ) ){
			return false;

		}

		function remove( _id, str ){
			const nids = [];
			var a = 0;
			var cid, ids, a;

			if( !utils.isArray( ( ids = parse.ids( str, 'array' ) ), 1 ) ){
				return false;

			}

			for( a; a < ids.length; a++ ){

				if( !( cid = parse.id( ids[a] ) ) || cid === _id  ){
					continue;

				}
				nids[nids.length] = cid;

			}
			return nids.join( ',' );

		}
		parent = data_.getParent( type );
		_in = '_' + type;

		if( type === 'sections' && !utils.isStringEmpty( metaData[_in] ) ){

			if( !( tmp = remove( id, utils.trim( metaData[_in], ',' ) ) ) ){
				return false;

			}
			metaData[_in] = tmp;
			data_.setData( metaData );
			return true;

		}else if( ( pid = data_.hasId( parent, pid ) ) && !utils.isStringEmpty( metaData[parent][pid][_in] ) ){

			if( !( tmp = remove( id, utils.trim( metaData[parent][pid][_in], ',' ) ) ) ){
				return false;

			}
			metaData[parent][pid][_in] = tmp;
			data_.setData( metaData );
			return true;

		}
		return false;

	};

	prop.replace = function( id, nid, type, pid ){
		const metaData = data_.getData();
		var _in, parent, str;

		if( !( id = parse.id( id ) ) || !( nid = parse.id( nid ) ) || ( pid = parse.id( pid ) ) === false || !( type = parse.type( type ) ) ){
			return false;

		}
		parent = data_.getParent( type );
		_in = '_' + type;

		if( type === 'sections' ){
			str = utils.isString( metaData[_in] ) ? metaData[_in] : '';
			str = ( utils.trim( str, ',' ) ).replace( id, nid );
			metaData[_in] = str;
			data_.setData( metaData );
			return true;

		}else if( ( pid = data_.hasId( parent, pid ) ) ){
			str = utils.isString( metaData[cat][catId][_in] ) ? metaData[cat][catId][_in] : '';
			str = ( utils.trim( str, ',' ) ).replace( id, nid );
			metaData[cat][catId][_in] = str;
			data_.setData( metaData );
			return true;

		}
		return false;

	};

	return prop;

	
};