import dashboard from './dashboard.js';
import templates from './templates.js';
import fonts from './fonts.js';

'use strict';

(function( cometAdmin ){

  cometAdmin( window, document);

}(function( win, doc ){

  dashboard();
  templates();
  fonts();

}));
