(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('BannerCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'StorageService', 'Response',
    '$uibModal', 'confirmm', 'notiffy', '$window',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, StorageService, Response, $uibModal,
              confirmm, notiffy, $window) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.cloud = function(){
        Response.stateData = vm.stateData;
        Response.selectedCloud = {id: 0, name: 'Banner'};
        $state.go('index.cloud');
      };

      $timeout(function(){
        vm.cloud();
      }, 0);

    }]);

})();