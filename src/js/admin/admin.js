import dashboard from './dashboard.js';
import templates from './templates.js';
import fonts from './fonts.js';

(function( cometAdmin ){

  cometAdmin( window, document);

}(function( win, doc ){

  'use strict';

  dashboard();
  templates();
  fonts();

}));
