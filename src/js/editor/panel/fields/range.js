import sanitize from '../../../utils/sanitize.js';
import range from '../../../utils/ui/range.js';
import node from '../../../utils/node.js';
import update from '../../update.js';

export default function (){

	range(
		document.getElementsByClassName( 'comet-fieldRange' ),
		{
			buttons: true,
			change: function( ev, ui, data ){
				var dren, val, tmp, x;

				if( ( val = sanitize.number( data.source.value ) ) === null ){
					return;

				}

				if( !( tmp = data.source.parentNode ) || !node( tmp ).isNode() || ( dren = tmp.getElementsByClassName( 'comet-eRValue' ) ).length < 1 ){
					return;

				}

				for( x = 0; x < dren.length; x++ ){

					if( !node( dren[x] ).isNode() ){
						continue;

					}
					dren[x].innerHTML = val;

				}
				update( data.source );

			}

		}
	);
}