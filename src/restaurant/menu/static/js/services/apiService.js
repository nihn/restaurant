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

    function handleResponse (data, params) {
    /**
     * Handle paginated and regular responses.
     */
      if (data.next) {
        params.successCallback(data.results);
        params.url = data.next;
        doRequest(params);
      } else {
        params.successCallback(data.results || data);
      }
    }

    function doRequest(params, base_url)
    /**
     * Make get requests to retrieve data from the API. Display progress bar.
     */
    {
      NProgress.start();
      return $http.get(params.url || base_url, {cache: params.cache,
          timeout: timeout}).then(
            function (response) {
          if (response.status === 200) {
            handleResponse(response.data, params);
          } else {
            params.errorCallback(response.data);
          }
          NProgress.done();
        }, params.errorCallback);
      }

    return {
      getMenus: function (params) {
        params.cache = menusCache;
        return doRequest(params, getMenusUrl);
      },
      getDishesFromMenu: function (params) {
        params.cache = dishesCache;
        return doRequest(params, apiUrl + params.menu.id + '/dishes');
      }
    }
  }]);
}());
