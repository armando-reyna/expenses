(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('DiagnosticService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var DiagnosticService = {};

      DiagnosticService.save = function (diagnostic) {
        var deffered = $q.defer();
        APIService.diagnostic.save(diagnostic)
          .success(function (response) {
            Response.response = response;
            deffered.resolve();
          })
          .error(function (err) {
            alert(err.toSource());
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      DiagnosticService.get = function (client) {
        var deffered = $q.defer();
        APIService.diagnostic.get(client)
          .success(function (response) {
            Response.diagnostics = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      DiagnosticService.deactivate = function (diagnostics) {
        var deffered = $q.defer();
        APIService.diagnostic.deactivate(diagnostics)
          .success(function (response) {
            Response.deactivated = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return DiagnosticService;

    }]);
})();
