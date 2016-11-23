(function(){
  "use strict";

  angular.module("menuApp.services.apiService", [])
    .factory('apiService', ['$http', 'CacheFactory', function($http, CacheFactory) {

    if (!CacheFactory.get('menusCache')) {
      CacheFactory.createCache('menusCache');
    }
    if (!CacheFactory.get('dishesCache')) {
      CacheFactory.createCache('dishesCache');
    }

    var apiUrl = window.MENU_API_URL;
    var getMenusUrl = apiUrl + 'list';
    var timeout = 2000;
    var menusCache = CacheFactory.get('menusCache');
    var dishesCache = CacheFactory.get('dishesCache');

    return {
      getMenus: function(successCallback, errorCallback) {
        return $http.get(getMenusUrl, {cache: menusCache || false,
                                       timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            successCallback(response.data)
          } else {
            errorCallback(response.data);
          }
        }, errorCallback);
      },
      getDishesFromMenu: function(menu, successCallback, errorCallback) {
        return $http.get(apiUrl + menu.id + '/dishes',
          {cache: dishesCache, timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            successCallback(response.data)
          } else {
            errorCallback(response.data);
          }
        }, errorCallback);
      }
    }
  }]);
}());
