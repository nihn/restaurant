(function(){
  "use strict";

  angular.module('menuApp.controllers.menuCtrl', ['ngTable'])
    .controller('MenuCtrl', [
      '$scope',
      '$log',
      'NgTableParams',
      'apiService', function(
      $scope,
      $log,
      NgTableParams,
      apiService) {

    $scope.menusTableParams = new NgTableParams({count: 5}, {counts: []});
    $scope.dishesTableParams = new NgTableParams({count: 5}, {counts: []});
    $scope.currentMenu = null;

    $scope.init = function() {
      go('/menu/list');
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
      go('/menu/details');
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
    };

    angular.element(window).on('popstate', function(event) {
      $log.debug('Pop history state', event.state);
      var tpl;

      if (event.state) {
        tpl = event.state.tpl;
      }
      else {
        $log.debug('History state is falsy', event.state);
        tpl = '/menu/list';
      }
      $scope.currentTpl = tpl;
      // Trigger reloading template
      $scope.$apply(function () {});
    });

    function go(tpl)
    /**
     * Switch to give template, update history state.
     */
    {
      $scope.currentTpl = tpl;
      updateHistoryState(tpl);
    }

    function updateHistoryState(tpl)
    /**
     * Update history state with currently used template before switch to the
     * new one.
     */
    {
      if (!window.history || !window.history.pushState) {
        $log.debug('History API not detected');
        return;
      }

      var state = {tpl: tpl};

      if (!history.state) {
        history.replaceState(state, '');
        $log.debug('Replace history state', state);
      }
      else if (history.state.tpl !== tpl) {
        history.pushState(state, '');
        $log.debug('Push history state', state);
      }
    }
    }]);
}());
