(function () {
  'use strict';

  var module = angular.module('expenses');

  module.controller('CarouselModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'Response', '$uibModalInstance', '$timeout', 'url', 'files', 'index',
    function (CONSTANTS, $rootScope, $scope, $state, Response, $uibModalInstance, $timeout, url, files, index) {

      var vm = this;

      vm.loading = true;
      $timeout(function(){
        vm.loading = false;
      }, 1000);

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.active = index;

      vm.images = [];
      angular.forEach(files, function (file, index) {
        vm.images.push({
          id: index,
          url: url + file.name
        });
      });

    }]);

})();