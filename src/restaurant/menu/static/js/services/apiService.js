(function(){
  "use strict";

  angular.module("menuApp.services.apiService", [])
    .factory('apiService', ['$http', '$log', 'CacheFactory', function($http, $log, CacheFactory) {

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

    var handleResponse = function (data, fun, params) {
      if (data.next) {
        params.successCallback(data.results);
        params.url = data.next;
        fun(params);
      } else {
        params.successCallback(data.results || data)
      }
    };

    return {
      getMenus: function getMenus(params) {
        return $http.get(params.url || getMenusUrl, {cache: menusCache,
          timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            handleResponse(response.data, getMenus, params)
          } else {
            params.errorCallback(response.data);
          }
        }, params.errorCallback);
      },
      getDishesFromMenu: function getDishesFromMenu(params) {
        return $http.get(params.url || apiUrl + params.menu.id + '/dishes',
          {cache: dishesCache, timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            handleResponse(response.data, getDishesFromMenu, params)
          } else {
            params.errorCallback(response.data);
          }
        }, params.errorCallback);
      }
    }
  }]);
}());
