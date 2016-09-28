angular
  .module('expenses')
  .run(['CONSTANTS', '$rootScope', '$state', '$window', '$location', '$sessionStorage', 'DTDefaultOptions',
    function (CONSTANTS, $rootScope, $state, $window, $location, $sessionStorage, DTDefaultOptions) {

      $rootScope.$state = $state;

      if($location.host() == 'localhost'){
        CONSTANTS.API_URI = 'http://localhost:8080/';
        CONSTANTS.DEV = true;
      }else {
        CONSTANTS.API_URI = '/expenses/';
        CONSTANTS.DEV = false;
      }

      $rootScope.CONSTANTS = CONSTANTS;

      $rootScope.$on('$stateChangeStart',
        function (event, toState) {
          if(!$sessionStorage.userToken) {
            if (toState.url != '/login') {
              event.preventDefault();
              $state.go('login');
            }
          }
        });

      DTDefaultOptions.setLanguageSource('resources/Spanish.json');

  }]);