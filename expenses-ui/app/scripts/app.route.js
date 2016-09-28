angular
  .module('expenses')
  .config(['$stateProvider', '$urlRouterProvider', 'CONSTANTS', function ($stateProvider, $urlRouterProvider, CONSTANTS) {

    $urlRouterProvider.otherwise("/index/main");

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Login', specialClass: 'gray-bg'}
      })
      .state('500', {
        url: "/500",
        templateUrl: "views/common/500.html",
        data: {pageTitle: 'Server Error', specialClass: 'gray-bg'}
      })
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "views/common/content.html",
        controller: "IndexCtrl",
        controllerAs: "vm"
      })
      .state('index.profile', {
        url: "/profile",
        templateUrl: "views/common/profile.html",
        controller: "ProfileCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Mi Perfil'}
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "views/main/home.html",
        controller: "HomeCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Inicio'}
      })
      .state('index.mission', {
        url: "/mission",
        templateUrl: "views/main/mission.html",
        controller: "MissionCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Misión'}
      })
      .state('index.vision', {
        url: "/vision",
        templateUrl: "views/main/vision.html",
        controller: "VisionCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Visión'}
      })
      .state('index.us', {
        url: "/us",
        templateUrl: "views/main/us.html",
        controller: "UsCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Nosotros'}
      })
      .state('index.appointment', {
        url: "/appointment/:reload",
        templateUrl: "views/appointment/appointment.html",
        controller: "AppointmentCtrl",
        controllerAs: "vm",
        data: { pageTitle: 'Citas' }
      })
      .state('index.user', {
        url: "/user",
        templateUrl: "views/user/user.html",
        controller: "UserCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Usuarios'}
      })
      .state('index.client', {
        url: "/client",
        templateUrl: "views/person/person.html",
        controller: "PersonCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.client',
          pageTitle: 'Clientes',
          label: 'Cliente',
          iClass: 'fa fa-suitcase',
          personType: CONSTANTS.PERSON_TYPE.CLIENT,
          path: 'person'
        }
      })
      .state('index.employee', {
        url: "/employee",
        templateUrl: "views/person/person.html",
        controller: "PersonCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.employee',
          pageTitle: 'Empleados',
          label: 'Empleado',
          iClass: 'fa fa-fire',
          personType: CONSTANTS.PERSON_TYPE.EMPLOYEE,
          path: 'person'
        }
      })
      .state('index.supplier', {
        url: "/supplier",
        templateUrl: "views/person/person.html",
        controller: "PersonCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.supplier',
          pageTitle: 'Proveedores',
          label: 'Proveedor',
          iClass: 'fa fa-truck',
          personType: CONSTANTS.PERSON_TYPE.SUPPLIER,
          path: 'person'
        }
      })
      .state('index.cloud', {
        url: "/cloud",
        templateUrl: "views/common/cloud.html",
        controller: "CloudCtrl",
        controllerAs: "vm",
        data: {
          pageTitle: 'Nube'
        }
      })
      .state('index.banner', {
        url: "/banner",
        controller: "BannerCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.banner',
          pageTitle: 'Banner',
          label: 'Banner',
          iClass: 'fa fa-bullhorn',
          path: 'banner'
        }
      })
      .state('index.diagnostic', {
        url: "/diagnostic",
        templateUrl: "views/diagnostic/diagnostic.html",
        controller: "DiagnosticCtrl",
        controllerAs: "vm",
        data: {
          pageTitle: 'Diagnóstico'
        }
      })
      .state('index.category', {
        url: "/category",
        templateUrl: "views/category/category.html",
        controller: "CategoryCtrl",
        controllerAs: "vm",
        data: {
          pageTitle: 'Categorías'
        }
      })
      .state('index.product', {
        url: "/product",
        templateUrl: "views/product/product.html",
        controller: "ProductCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.product',
          pageTitle: 'Productos',
          label: 'Producto',
          iClass: 'fa fa-shopping-cart',
          type: CONSTANTS.PRODUCT_TYPE.PRODUCT,
          path: 'product'
        }
      })
      .state('index.service', {
        url: "/service",
        templateUrl: "views/product/product.html",
        controller: "ProductCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.service',
          pageTitle: 'Servicios',
          label: 'Servicio',
          iClass: 'fa fa-list',
          type: CONSTANTS.PRODUCT_TYPE.SERVICE,
          path: 'product'
        }
      })
      .state('index.store-product', {
        url: "/store-product",
        templateUrl: "views/store/store.html",
        controller: "StoreCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.store-product',
          pageTitle: 'Productos',
          label: 'Producto',
          iClass: 'fa fa-shopping-cart',
          type: CONSTANTS.PRODUCT_TYPE.PRODUCT
        }
      })
      .state('index.store-service', {
        url: "/store-service",
        templateUrl: "views/store/store.html",
        controller: "StoreCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.store-service',
          pageTitle: 'Servicios',
          label: 'Servicio',
          iClass: 'fa fa-list',
          type: CONSTANTS.PRODUCT_TYPE.SERVICE
        }
      })
      .state('index.cart', {
        url: "/cart",
        templateUrl: "views/store/cart.html",
        controller: "CartCtrl",
        controllerAs: "vm",
        data: {
          pageTitle: 'Mi Pedido'
        }
      })
      .state('index.equipment', {
        url: "/equipment",
        templateUrl: "views/equipment/equipment.html",
        controller: "EquipmentCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.equipment',
          pageTitle: 'Equipos',
          label: 'Equipo',
          iClass: 'fa fa-desktop',
          path: 'equipment'
        }
      })
      .state('index.cubicle', {
        url: "/cubicle",
        templateUrl: "views/cubicle/cubicle.html",
        controller: "CubicleCtrl",
        controllerAs: "vm",
        data: {
          state: 'index.cubicle',
          pageTitle: 'Cub\u00EDculos',
          label: 'Cub\u00EDculo',
          iClass: 'fa fa-map-marker',
          path: 'cubicle'
        }
      });

  }]);