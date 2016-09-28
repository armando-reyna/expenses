/*
 los archivops app.*.js son los de configuración general de la aplicacion
 */
(function () {
  'use strict';

  angular
    .module('expenses', [
      'ui.router',
      'ui.bootstrap',
      'ngStorage',
      'ngSanitize',
      'cgNotify',
      'ngJsTree',
      'oitozero.ngSweetAlert',
      'datatables',
      'ngFileUpload',
      'datePicker',
      'ngAnimate',
      'akoenig.deckgrid'
    ]);

})();
