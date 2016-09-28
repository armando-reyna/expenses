(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('AddressService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var AddressService = {};

      AddressService.getEstados = function () {
        var deffered = $q.defer();
        APIService.address.getEstados()
          .success(function (response) {
            Response.estados = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return AddressService;

    }]);
})();
