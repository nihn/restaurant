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

    var handleResponse = function (data, params) {
      if (data.next) {
        params.successCallback(data.results);
        params.url = data.next;
        doRequest(params);
      } else {
        params.successCallback(data.results || data);
      }
    };

    var doRequest = function (params, base_url, cache) {
      NProgress.start();
      return $http.get(params.url || base_url, {cache: cache,
          timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            handleResponse(response.data, params);
          } else {
            params.errorCallback(response.data);
          }
          NProgress.done();
        }, params.errorCallback);
      };

    return {
      getMenus: function (params) {
        return doRequest(params, getMenusUrl, menusCache);
      },
      getDishesFromMenu: function (params) {
        return doRequest(params, apiUrl + params.menu.id + '/dishes', dishesCache);
      }
    }
  }]);
}());
