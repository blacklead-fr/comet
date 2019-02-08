import parts from './parts/parts.js';
import redefine from '../redefine.js';

export default function(){
	parts.init();
	redefine.workflow();

}