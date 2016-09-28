(function () {
  'use strict';

  var module = angular.module('expenses');

  module.factory('APIService', ['CONSTANTS', '$log', '$http', 'Upload',
    function (CONSTANTS, $log, $http, Upload) {

      var APIService = {};

      var upload = function (uri, obj, fields) {
        return Upload.upload({
          url: CONSTANTS.API_URI + uri,
          fields: fields ? fields : {},
          file: obj ? obj.file : {}
        })
      };

      var multiUpload = function (uri, obj, fields) {
        return Upload.upload({
          url: CONSTANTS.API_URI + uri,
          fields:  fields ? fields : {},
          file: obj ? obj.file : {},
          arrayKey: ''
        })
      };

      var post = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri,
          method: 'POST',
          data: obj ? obj : {},
          headers: headers ? headers : {}
        });
      };

      var put = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri,
          method: 'PUT',
          data: obj ? obj : {},
          headers: headers ? headers : {}
        });
      };

      var get = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri + (obj ? obj : ''),
          method: 'GET',
          headers: headers ? headers : {}
        });
      };

      APIService.config = {
        getMenu: function (menu) {
          return get('resources/' + menu + '.json');
        }
      };

      APIService.user = {
        getAppointmentModalInfo: function (userId) {
          return post('user/appointment-modal-info', userId);
        },
        login: function (user) {
          return post('login/', user);
        },
        save: function (user) {
          return post('user/', user);
        },
        getAllUserRoles: function () {
          return post('roles/');
        },
        getUsers: function (inactive) {
          return post('users/', inactive);
        },
        activate: function (users) {
          return post('user/activate', users);
        },
        deactivate: function (users) {
          return post('user/deactivate', users);
        },
        getPayments: function (userId) {
          return post('user/payments', userId);
        },
        saveMembership: function (membershipDTO) {
          return post('user/process-membership', membershipDTO);
        },
        skipMessage: function (userId) {
          return post('user/skipmessage', userId);
        },
        changePassword: function (user) {
          return post('user/changepassword', user);
        }
      };

      APIService.person = {
        save: function (person) {
          return post('person/save', person);
        },
        get: function (postObj) {
          return post('person/get', postObj);
        },
        getOne: function (id) {
          return post('person/getOne', id);
        },
        activate: function (persons) {
          return post('person/activate', persons);
        },
        deactivate: function (persons) {
          return post('person/deactivate', persons);
        },
        isEmailDuplicated: function (person) {
          return post('person/isEmailDuplicated', person);
        },
        getEmployeeTypes: function () {
          return post('employee/get-types');
        }
      };

      APIService.equipment = {
        save: function (equipment) {
          return post('equipment/save', equipment);
        },
        get: function (postObj) {
          return post('equipment/get', postObj);
        },
        getOne: function (id) {
          return post('equipment/getOne', id);
        },
        activate: function (equipments) {
          return post('equipment/activate', equipments);
        },
        deactivate: function (equipments) {
          return post('equipment/deactivate', equipments);
        },
        getAvailable: function (equipment) {
          return post('equipment/getAvailable', equipment);
        }
      };

      APIService.cubicle = {
        save: function (cubicle) {
          return post('cubicle/save', cubicle);
        },
        get: function (postObj) {
          return post('cubicle/get', postObj);
        },
        getOne: function (id) {
          return post('cubicle/getOne', id);
        },
        activate: function (cubicles) {
          return post('cubicle/activate', cubicles);
        },
        deactivate: function (cubicles) {
          return post('cubicle/deactivate', cubicles);
        }
      };

      APIService.category = {
        save: function (category) {
          return post('category/save', category);
        },
        get: function (postObj) {
          return post('category/get', postObj);
        },
        activate: function (categories) {
          return post('category/activate', categories);
        },
        deactivate: function (categories) {
          return post('category/deactivate', categories);
        },
        getByType: function (postObj) {
          return post('category/get-by-type', postObj);
        }
      };

      APIService.product = {
        save: function (product) {
          return post('product/save', product);
        },
        get: function (postObj) {
          return post('product/get', postObj);
        },
        getOne: function (id) {
          return post('product/getOne', id);
        },
        activate: function (products) {
          return post('product/activate', products);
        },
        deactivate: function (products) {
          return post('product/deactivate', products);
        }
      };

      APIService.address = {
        getEstados: function () {
          return post('address/getEstados');
        }
      };

      APIService.storage = {
        upload: function (uploadDTO, id) {
          return multiUpload('storage/upload', uploadDTO, id);
        },
        get: function (id) {
          return post('storage/get', id);
        },
        remove: function (fileDto) {
          return post('storage/remove', fileDto);
        },
        getBanners: function () {
          return post('banner/get');
        }
      };

      APIService.diagnostic = {
        save: function (diagnostic) {
          return post('diagnostic/save', diagnostic);
        },
        get: function (client) {
          return post('diagnostic/get', client);
        },
        activate: function (diagnostics) {
          return post('diagnostic/activate', diagnostics);
        },
        deactivate: function (diagnostics) {
          return post('diagnostic/deactivate', diagnostics);
        }
      };

      APIService.buy = {
        save: function (postObj) {
          return post('buy/save', postObj);
        }
      };

      APIService.appointment = {
        getEventsByCubicle: function (cubicle) {
          return post('appointment/cubicle-event', cubicle);
        },
        deleteEvent: function (deleteDto) {
          return post('appointment/delete-event', deleteDto);
        },
        loadCubicles: function (cubicleType) {
          return post('active/cubicles', cubicleType);
        },
        saveEvent: function (eventDto) {
          return post('appointment/save-event', eventDto);
        },
        getUserAppointments: function (userId) {
          return post('user/appointments', userId);
        },
        getAllEvents: function () {
          return post('appointment/all-events');
        }
      };

      APIService.membership = {
        getPayPalResponse: function (payPalRequest) {
          return post("membership/paypal-payment-validation", payPalRequest);

        }
      };

      APIService.store = {
        getShoppableMemberships: function (userId) {
          return post("membership/valid-memberships", userId);
        }
      };

      return APIService;

    }]);

})();
