import sort from '../../utils/sort.js';

import _sections from './sections.js';
import _elements from './elements.js';
import _columns from './columns.js';
import _items from './items.js';
import _rows from './rows.js';

export default function (){
	const actions = [ _sections, _rows, _columns, _elements, _items ];
	var a;

	for( a in actions ){

		if( typeof actions[a] !== 'object' ){
			continue;

		}
		sort( actions[a] );

	}
	
}