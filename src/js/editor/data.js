import global from '../utils/global.js';
import parse from '../utils/parse.js';
import utils from '../utils/utils.js';
import __id from './id.js';

export default function (){
	const prop = {};
	const global_ = global();

	prop.getData = function(){
		var data = global_.get( 'data' );
		return ( utils.isObject( data ) ? data : prop.setData( {} ) );

	};

	prop.setData = function( data ){

		if( !utils.isObject( data ) ){
			return false;

		}
		return global_.set( 'data', data );

	};

	prop.hasType = function( type ){
		const metaData = prop.getData();

		if( !utils.isObject( metaData ) || !( type = parse.type( type ) ) || !utils.isObject( metaData[type] ) ){
			return false;

		}
		return type;

	};

	prop.hasId = function( type, id ){
		const metaData = prop.getData();

		if( !( type = this.hasType( type ) ) || !( id = parse.id( id ) ) || !( id in metaData[type] ) ){
			return false;

		}
		return id;

	};

	prop.getParent = function( type ){
		type = parse.type( type );

		switch( type ){
			case 'rows':
			case 'sections':
			return 'sections';

			case 'columns':
			return 'rows';

			case 'elements':
			return 'columns';

			case 'items':
			return 'elements';

			default:
			return false;
		}

	};

	prop.getChild = function( type ){
		type = parse.type( type );

		switch( type ){
			case 'sections':
			return 'rows';

			case 'rows':
			return 'columns';

			case 'columns':
			return 'elements';

			case 'elements':
			return 'items';
			
			default:
			return false;
		}

	};

	prop.create = function( type, pid, index, dd ){
		const id_ = __id();
		var metaData = prop.getData();
		var data, id, st;

		if( ( pid = parse.id( pid ) ) === false || utils.isStringEmpty( type ) ){
			return false;

		}

		if( !utils.isObject( dd ) ){
			dd = {};

		}

		switch( type ){

			case 'sections':
			//data = utils.getSettingsFrom( 'section' );
			break;

			case 'rows':
			//data = utils.getSettingsFrom( 'row' );
			break;

			case 'columns':
			//data = utils.getSettingsFrom( 'column' );
			break;

			case 'items':

			if( !utils.isObject( metaData.elements ) || !utils.isObject( metaData.elements[pid] ) ){
				return false;

			}

			if( utils.isStringEmpty( st = metaData.elements[pid]._type ) || !utils.isObject( st = utils.getElement( st ) ) ){
				return false;

			}

			if( !utils.isObject( st.tabs ) || !utils.isObject( st.tabs.items ) ){
				return false;

			}
			//data = st.tabs.items;
			break;

			default:

			if( !utils.isObject( data = utils.getElement( type ) ) || !utils.isObject( data.tabs ) ){
				return false;

			}
			dd._type = type;
			//data = data.tabs;
			type = 'elements';
			break;

		}

		if( !( id = id_.create( type ) ) || !id_.insert( id, type, pid, index ) ){
			return false;

		}
		metaData = prop.getData();

		if( !utils.isObject( metaData[type] ) ){
			metaData[type] = {};

		}

		if( !utils.isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}
		metaData[type][id] = utils.extend( {}, dd );
		this.setData( metaData );
		return id;

	};

	prop.insert = function( id, type, data ){
		var metaData = prop.getData();

		if( !( type = parse.type( type ) ) || !( id = parse.id( id ) ) ){
			return false;

		}

		if( !utils.isObject( metaData ) ){
			metaData = {};

		}

		if( !utils.isObject( metaData[type] ) ){
			metaData[type] = {};

		}

		if( !( id in metaData[type] ) ){
			metaData[type][id] = {};

		}
		metaData[type][id] = utils.extend( {}, data );
		this.setData( metaData );
		return metaData[type][id];

	};

	prop.set = function( id, type, data ){
		var metaData = prop.getData();
		var a;

		if( !( type = this.hasType( type ) ) || !( id = parse.id( id ) ) || !utils.isObject( data ) ){
			return false;

		}

		if( !utils.isObject( metaData[type][id] ) ){
			metaData[type][id] = {};

		}

		for( a in data ){
			metaData[type][id][a] = data[a];

		}
		this.setData( metaData );
		return metaData[type][id];

	};

	prop.get = function( id, type ){
		const metaData = prop.getData();

		if( !( id = parse.id( id ) ) || !( type = this.hasType( type ) ) || !utils.isObject( metaData[type][id] ) ){
			return false;

		}
		return metaData[type][id];

	};

	prop.remove = function( id, type, pid ){
		const metaData = prop.getData();
		const id_ = __id();

		if( !( id = parse.id( id ) ) || !( type = prop.hasType( type ) ) || !( id in metaData[type] ) ){
			return false;

		}

		function removeChildren(){
			const children = prop.getChild( type );
			var ids, _children, cid, a;

			if( children || !utils.isObject( metaData[children] ) || !utils.isObject( metaData[type][id] ) ){
				return;

			}

			if( !( ( _children = '_' + children ) in metaData[type][id] ) ){
				return;

			}

			if( !utils.isArray( ( ids = parse.ids( metaData[type][id][_children], 'array' ) ), 1 ) ){
				return;

			}
			for( a in ids ){

				if( !( cid = parse.id( ids[a] ) ) || !( cid in metaData[children] ) ){
					continue;

				}
				prop.remove( cid, children );
				delete metaData[children][cid];

			}

		}
		removeChildren();
		id_.remove( id, type, pid );
		
		delete metaData[type][id];
		prop.setData( metaData );
		return true;

	};

	prop.removeIds = function( id, type ){
		const metaData = prop.getData();
		var children, _children;

		if( !( id = this.hasId( type, id ) ) || !( type = parse.type( type ) ) || !( children = this.getChild( type ) ) ){
			return false;

		}
		_children = '_' + children;
		metaData[type][id][_children] = '';
		this.setData( metaData );
		return true;

	};

	prop.clone = function( id, type, pid ){
		const metaData = prop.getData();
		const id_ = __id();
		var tmp = {};
		var children, _children, cid, ids, nid, nnid, i;

		pid = pid && ( pid = parse.id( pid ) ) ? pid : 0;

		if( !( id = parse.id( id ) ) || !( type = this.hasType( type ) ) || !( id in metaData[type] ) ){
			return false;

		}

		if( !( nid = id_.create( type ) ) || !id_.insert( nid, type, pid, 'last' ) ){
			return false;

		}

		if( utils.isObject( metaData[type][id] ) ){
			tmp = metaData[type][id];

		}

		if( !this.insert( nid, type, tmp ) ){
			return false;

		}


		if( !utils.isObject( metaData[type][id] ) || !( children = this.hasType( this.getChild( type ) ) ) ){
			return nid;

		}
		_children = '_' + children;
		
		if( utils.isStringEmpty( metaData[type][id][_children] ) || !utils.isArray( ids = parse.ids( metaData[type][id][_children], 'array' ), 1 ) ){
			return nid;

		}

		for( i in ids ){

			if( !( cid = parse.id( ids[i] ) ) || !utils.isObject( metaData[children][cid] ) || !( nnid = this.clone( cid, children ) ) ){
				continue;

			}
			ids[i] = nnid;
			metaData[type][nid][_children] = ids.join( ',' );

		}
		this.setData( metaData );
		return nid;

	};

	return prop;

}