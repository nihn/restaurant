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

  menuApp.config([
    'CacheFactoryProvider',
    function(CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, {
        storageMode: 'localStorage'
      });
  }]);

}());
