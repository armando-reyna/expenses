(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('ProductService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var ProductService = {};

      ProductService.save = function (product) {
        var deffered = $q.defer();
        APIService.product.save(product)
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

      ProductService.get = function (postObj) {
        var deffered = $q.defer();
        APIService.product.get(postObj)
          .success(function (response) {
            Response.productList = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ProductService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.product.getOne(id)
          .success(function (response) {
            Response.product = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ProductService.activate = function (products) {
        var deffered = $q.defer();
        APIService.product.activate(products)
          .success(function (response) {
            Response.activated = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ProductService.deactivate = function (products) {
        var deffered = $q.defer();
        APIService.product.deactivate(products)
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

      return ProductService;

    }]);
})();
