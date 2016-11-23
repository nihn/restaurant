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

    $scope.tableParams = new NgTableParams({count: 5});
    $scope.currentMenu = null;

    $scope.init = function() {
      $scope.currentTpl = '/menu/list';
      apiService.getMenus(function (data) {
        $log.debug('Got response from menus api', data);
        $scope.tableParams.settings({
          dataset: data
        });
      }, function (res) {
        $log.debug(res);
        $log.error('Failed to get menus list');
      });

      $log.debug('Loading')
    };

    $scope.selectMenu = function (menu) {
      $scope.currentMenu = menu;
      $scope.currentTpl = '/menu/details';
    };

    $scope.collectDishes = function (menu) {
      apiService.getDishesFromMenu(menu, function (res) {
        $log.debug('Got ' + res.length + ' dishes');
        $scope.currentMenu.dishes = res;
      })
    }
    }]);
}());
