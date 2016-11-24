(function (){
  "use strict";

  var menuApp = angular.module('menuApp', [
    /* dependencies */
    'angular-cache',
    'ngTable',
    /* project specific modules */
    'menuApp.controllers.menuCtrl',
    'menuApp.services.apiService',
  ]);
}());
