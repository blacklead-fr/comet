import node from '../../utils/node.js';

const prop = {

	component: {
		id: 'comet-menuComponent',
		classes: {
			button: 'comet-menuComponentButton',
			active: 'cpb-active'
		}
	},

	close: function(){
		const buttons = document.getElementsByClassName( prop.component.classes.button );
		const menu = document.getElementById( prop.component.id );

		if( buttons.length > 0 ){
			node( buttons ).removeClass( prop.component.classes.active );

		}

		if( node( menu ).isNode() && node( menu.parentNode ).isNode() ){
			menu.parentNode.removeChild( menu );

		}
	},

	setPosition: function(){
		const buttons = document.getElementsByClassName( prop.component.classes.button );
		const menu = document.getElementById( prop.component.id )
		var _button, b, th, rec;

		if( buttons.length < 1 || !node( menu ).isNode() ){
			return;

		}

		for( b in buttons ){

			if( !( ( _button = node( buttons[b] ) ).isNode() ) || !_button.hasClass( prop.component.classes.active ) ){
				continue;

			}
			th = _button.prop();
		}

		if( !node( th ).isNode() ){
			prop.close();
			return;

		}
		rec = th.getBoundingClientRect();
		menu.style.top = parseInt( rec.top + rec.height ) + 'px';
		menu.style.left = parseInt( rec.left ) + 'px';

	},

	getActive: function(){
		const buttons = document.getElementsByClassName( prop.component.classes.button );
		var _button, b;

		if( buttons.length < 1 ){
			return false;

		}

		for( b in buttons ){

			if( !( ( _button = node( buttons[b] ) ).isNode() ) || !_button.hasClass( prop.component.classes.active ) ){
				continue;

			}
			return _button.prop();

		}
		return false;
	}

};

export default prop;