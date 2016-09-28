(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('BuyService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var BuyService = {};

      BuyService.save = function (postObj) {
        var deffered = $q.defer();
        APIService.buy.save(postObj)
          .success(function (response) {
            Response.response = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return BuyService;

    }]);
})();
