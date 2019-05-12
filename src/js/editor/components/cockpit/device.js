import { frame as Frame } from '../stored.js';
//import utils from '../../../utils/utils.js';
import parse from '../../../utils/parse.js';
import node from '../../../dom/element.js';

export default function( ev_source, source ){

	const _d = document;

	const frame = Frame();

	const device = parse.dataset( source, 'device' );

	const className = 'comet-device';

	const __devices = {
		desktop: {
			width: '100%',
			name: __cometi18n.ui.desktop,
			classes: {
				name: className + '--desktop',
				icon: 'cico-desktop'
			}
		},
		tablet: {
			width: '800px',
			name: __cometi18n.ui.tablet,
			classes: {
				name: className + '--tablet',
				icon: 'cico-tablet'
			}
		},
		mobile: {
			width: '400px',
			name: __cometi18n.ui.mobile,
			classes: {
				name: className + '--mobile',
				icon: 'cico-mobile'
			}
		}

	};
	var next_device = 'tablet';
	var inner;

	ev_source.preventDefault();

	if( !Frame || !device || !( device in __devices ) ){
		return;

	}
	next_device = device === 'desktop' ? 'tablet' : ( device === 'tablet' ? 'mobile' : 'desktop' );

	inner = '<span class="comet-cockpit__footer__button__icon cico ' + __devices[next_device].classes.icon + '"></span>';
	inner += '<span class="comet-cockpit__footer__button__title"><span>' + __devices[next_device].name + '</span></span>';

	source.dataset.device = next_device;
	source.innerHTML = inner;

}