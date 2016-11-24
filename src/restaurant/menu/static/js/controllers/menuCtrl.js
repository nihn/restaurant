(function(){
  "use strict";

  angular.module('menuApp.controllers.menuCtrl', ['ngTable'])
    .controller('MenuCtrl', [
      '$scope',
      '$rootScope',
      '$log',
      'NgTableParams',
      'apiService', function(
      $scope,
      $rootScope,
      $log,
      NgTableParams,
      apiService) {

    $scope.menusTableParams = new NgTableParams({count: 5});
    $scope.dishesTableParams = new NgTableParams({count: 5});
    $scope.currentMenu = null;

    $scope.init = function() {
      $scope.currentTpl = '/menu/list';
      var menus = [];
      $scope.menusTableParams.settings({
        dataset: menus
      });

      apiService.getMenus({successCallback: function (data) {
        $log.debug('Got response from menus api', data);
        menus.push.apply(menus, data);
        $scope.menusTableParams.reload();
      }, errorCallback: function (res) {
        $log.debug(res);
        $log.error('Failed to get menus list');
      }});

      $log.debug('Loading')
    };

    $scope.selectMenu = function (menu) {
      $scope.currentMenu = menu;
      $scope.currentTpl = '/menu/details';
    };

    $scope.collectDishes = function (menu) {
      var dishes = [];
       $scope.dishesTableParams.settings({
        dataset: dishes
      });

      $scope.currentMenu.dishes = dishes;
      apiService.getDishesFromMenu({menu: menu, successCallback: function (res) {
        $log.debug('Got dishes: ', res);
        dishes.push.apply(dishes, res);
        $scope.dishesTableParams.reload();
      }})
    }
    }]);
}());
