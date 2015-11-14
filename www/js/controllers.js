angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })


  .controller('DashCtrl', function($scope, Patient, $ionicLoading) {
    $scope.data = {
      strSearch: ''
    };
    $scope.search = ionic.debounce(function(){
      $ionicLoading.show();
      Patient.search($scope.data.strSearch).then(function(res){
        $scope.patients = res;
        $ionicLoading.hide();
      },function(err){
        console.log(err);
        $ionicLoading.hide();
      });
    }, 1000);

    $scope.clearSearch = function(){
      $scope.data.strSearch = '';
    };
  })

.controller('ChatsCtrl', function($scope, Notifications) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.notifications = Notifications.all();
  $scope.remove = function(notification) {
    Notifications.remove(notification);
  };
})

.controller('ChatDetailCtrl', function($sce, $scope, $stateParams, $ionicLoading, Patient, Medications) {
  $scope.pat = Patient.get($stateParams.chatId);

  Medications.search($stateParams.chatId).then(function(res){
    $scope.medications = res;
    $ionicLoading.hide();
  },function(err){
    console.log(err);
    $ionicLoading.hide();
  });
  //$scope.htmlSafe = function(strHtml){
  //  return $sce.trustAsHtml(strHtml);
  //};
})

.controller('MedicationDetailCtrl', function($sce, $scope, $stateParams, $ionicLoading, Medications) {
  $scope.med = Medications.get($stateParams.medId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  }
});
