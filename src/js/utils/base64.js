const base64 = {};

base64.encode = function( str ){
	return window.btoa( unescape( encodeURIComponent( str ) ) );
};

base64.decode = function( str ){
	return decodeURIComponent( escape( window.atob( str ) ) );
};

export default base64;