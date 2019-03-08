import utils from './utils.js';

const __icon = {

	get_set: function( set_id ){
		const sets = utils.getSvgSets();

		return ( utils.isObject( sets ) && utils.isString( set_id ) && utils.isObject( sets[set_id] ) ? sets[set_id] : {} );

	},

	get_icon: function( set_id, icon_id ){
		var set;

		if( !__icon.icon_exists( set_id, icon_id ) ){
			return false;

		}
		set = __icon.get_set( set_id );

		return set.set[icon_id];

	},

	get_svg: function( set_id, icon_id ){
		const icon = __icon.get_icon( set_id, icon_id );

		return ( !icon ? '' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + icon.width + ' ' + icon.height + '">' + icon.path + '</svg>' );

	},

	get_svg_from_data: function( data ){

		if( utils.isObject( data ) && 'width' in data && 'height' in data && 'path' in data ){
			return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + data.width + ' ' + data.height + '">' + data.path + '</svg>';

		}
		return '';

	},

	set_exists: function( set_id ){
		const sets = utils.getSvgSets();

		return ( utils.isObject( sets ) && utils.isString( set_id ) && utils.isObject( sets[set_id] ) );

	},

	icon_exists: function( set_id, icon_id ){
		const set = __icon.get_set( set_id );

		return ( utils.isString( icon_id ) && utils.isObject( set ) && utils.isObject( set.set ) && utils.isObject( set.set[icon_id] ) );

	},

	decode: function( entry ){

		if( utils.isStringEmpty( entry ) || !utils.isArray( ( entry = ( utils.trim( entry ) ).split( ':' ) ), 2 ) ){
			return false;

		}

		return {
			set_id: entry[0],
			icon_id: entry[1]
		};

	},

	encode: function( set_id, icon_id ){

		return ( !__icon.icon_exists( set_id, icon_id ) ? false : set_id + ':' + icon_id );

	}
	
};

export default __icon;