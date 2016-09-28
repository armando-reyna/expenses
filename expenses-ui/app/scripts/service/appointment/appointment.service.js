(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('AppointmentService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var AppointmentService = {};

      AppointmentService.getEventsByCubicle = function (cubicleId) {
        var deffered = $q.defer();
        APIService.appointment.getEventsByCubicle(cubicleId)
          .success(function (response) {
            Response.appointments = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      AppointmentService.deleteEvent = function (eventId, userId) {
        var deffered = $q.defer();
        APIService.appointment.deleteEvent({eventId: eventId, userId: userId})
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      AppointmentService.loadCubicles = function (cubicleType) {
        var deffered = $q.defer();
        APIService.appointment.loadCubicles(cubicleType)
          .success(function (response) {
            Response.cubicles = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      AppointmentService.save = function (eventDto) {
        var deffered = $q.defer();
        APIService.appointment.saveEvent(eventDto)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      AppointmentService.getUserAppointments = function (userId) {
        var deffered = $q.defer();
        APIService.appointment.getUserAppointments(userId)
          .success(function (response) {
            Response.appointments = response.data;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      AppointmentService.getAllEvents = function () {
        var deffered = $q.defer();
        APIService.appointment.getAllEvents()
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return AppointmentService;

    }]);
})();