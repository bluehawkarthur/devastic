angular.module('starter', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'templates/outside.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('outside.register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('outcliente', {
    url: '/outcliente',
    abstract: true,
    templateUrl: 'templates/outcliente.html'
  })
  .state('outcliente.inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  })
  .state('register_cliente', {
    url: '/register_cliente',
    templateUrl: 'templates/register_cliente.html',
    controller: 'RegisteCliCtrl'
  })
  .state('outcliente.edit', {
    url:'/edit',
    templateUrl :'templates/edit.html',
    controller: 'EditCliCtrl'
  });

  $urlRouterProvider.otherwise('/outside/login');
})

.run(function ($ionicPlatform, $ionicPopup, $cordovaNetwork, $rootScope, $state, AuthService, AUTH_EVENTS, $location) {
  $ionicPlatform.ready(function() {


      if ($cordovaNetwork.isOffline()) {

         $ionicPopup.confirm({

            title: "Internet no funciona",

            content: "El internet no está funcionando en su dispositivo."

         });

      }

   });

  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }else{
      console.log('logeadooo');
      // console.log(window.localStorage.getItem('yourTokenKey'));
      if (next.name == 'outside.login') {
        $location.path('/outcliente/inside');
      }
    }
  });
});

 // .run(function($ionicPlatform, $ionicPopup) {
 //        $ionicPlatform.ready(function() {
 //            if(window.Connection) {
 //                if(navigator.connection.type == Connection.NONE) {
 //                    alert('no hauyu');
 //                    $ionicPopup.confirm({
 //                        title: "Internet Disconnected",
 //                        content: "The internet is disconnected on your device."
 //                    });
 //                }
 //            }
 //        });
 //    });
