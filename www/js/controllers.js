angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('outcliente.inside');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

.controller('RegisteCliCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.cliente = {
    codigo: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    categoria: '',
    referencia: '',
    tipo_recarga: '',
    dia_visita: ''
  };

  $scope.guardar = function() {
    AuthService.register_cliente($scope.cliente).then(function(msg) {
      $state.go('outcliente.inside');
 
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

.controller('VentaCtrl', function($scope, AuthService, $ionicPopup, $state, $ionicHistory, client) {
  // $scope.cliente = {
  //   codigo: '',
  //   nombre: '',
  //   apellidos: '',
  //   direccion: '',
  //   dia_visita: ''
  // };

  // $scope.goBack = function() {
  //   $ionicNavBarDelegate.back();
  // };


  
})

.controller('EditCliCtrl', function($scope, AuthService, $ionicPopup, $state, $ionicHistory, client) {
  // $scope.cliente = {
  //   codigo: '',
  //   nombre: '',
  //   apellidos: '',
  //   direccion: '',
  //   dia_visita: ''
  // };

  // $scope.goBack = function() {
  //   $ionicNavBarDelegate.back();
  // };

  $scope.cliente = client.cliente;
  console.log(client.cliente);

   $scope.goBack = function() {
    $state.go('inside');
    console.log('edittt');
  };
  $scope.venta = function () {
    $state.go('outcliente.venta');
  }
  
})

.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state, $ionicActionSheet, client) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getCliente = function(cliente) {
    client.cliente = cliente;
    $state.go('outcliente.edit');
  };


  // $http.get(API_ENDPOINT.url + '/clientes').then(function(result) {
  //     $scope.clientes = result.data;
  //     console.log(result);
  //   });
  client.getAll();
  $scope.clientes = client.clientes;
  console.log(AuthService.list_cliente);

  var d = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Domingo";
  weekday[1] = "Lunes";
  weekday[2] = "Martes";
  weekday[3] = "Miercoles";
  weekday[4] = "Jueves";
  weekday[5] = "Viernes";
  weekday[6] = "Sabado";

  var n = weekday[d.getDay()];
  console.log('hoy es :'+ n);
  $scope.day = n;

  var botones = [
         { text: 'Lunes' },
         { text: 'Martes' },
         { text: 'Miercoles' },
         { text: 'Jueves' },
         { text: 'Viernes' },
         { text: 'Sabado' },
         { text: 'Domingo'}
       ];
  // funcion para cambiar el item en el array eliminar ====
  function Change(value) {
     for (var i in botones) {
        
       if (botones[i].text == value) {
          console.log('llego  a la funcion', botones[i].text);
          if (value == 'Domingo') {
            botones[i].text = '<i class="icon ion-android-sunny day-domingo"></i> ' + value;
          }else{
            botones[i].text = '<i class="icon ion-android-sunny day"></i> ' + value;
          };
          
          break; //Stop this loop, we found it!
       }
     }
  }
  console.log(botones);

  Change(n);

  $scope.myAcSheet = function() {
      console.log('llego sheet');
  

     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: botones,
      
       titleText: 'DIAS',
       cancelText: 'Cancel',
      
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         if(index === 0){
            console.log('es lunes');
            $scope.day = "Lunes";
            return true;
         }
         if(index === 1){
          $scope.day = "Martes";
          return true;
         }
         if(index === 2){
          $scope.day = "Miercoles";
          return true;
         }
         if(index === 3){
          $scope.day = "Jueves";
          return true;
         }
         if(index === 4){
          $scope.day = "Viernes";
          return true;
         }
         if(index === 5){
          $scope.day = "Sabado";
          return true;
         }
         if(index === 6){
          $scope.day = "Domingo";
          return true;
         }
       }
     });
    
     
   };
   
    

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  // $scope.getCliente = function() {
    
  // };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Lo sentimos, tienes que acceder de nuevo.'
    });
  });
});
