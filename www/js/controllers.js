angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
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


  .controller('DashCtrl', function($scope, $state, Patient, $ionicLoading) {
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

    $scope.goToDetailList = function(timeOfDay){
      switch(timeOfDay) {
        case 'breakfast':
          console.log('*** breakfast');
          break;
        case 'lunch':
          console.log('*** lunch');
          break;
        case 'dinner':
          console.log('*** dinner');
          break;
      }
      console.log(timeOfDay);
      $state.go('app.timeofday-detail',{timeOfDayName: timeOfDay});
    };

  })

  .controller('TimeOfDayDetailCtrl', function($timeout, $ionicActionSheet, $ionicModal, $sce, $scope, $stateParams, $ionicLoading, Patient, Medications) {
    //$scope.timeOfDayName = Patient.get($stateParams.timeOfDayName);

    console.log('********** timeOfDayName: ' + $stateParams.timeOfDayName);

    Medications.search('3860007').then(function(res){
      $scope.medications = res;
      $ionicLoading.hide();
    },function(err){
      console.log(err);
      $ionicLoading.hide();
    });

    $scope.snoozeMed = function(){
      console.log('***** fired snoozeMed');
    };
    $scope.skipMed = function(){
      console.log('***** fired skipMed');
      $scope.showModal();
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/skip-reason-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.showModal = function() {
      $scope.modal.show();
    };

    $scope.chooseReason = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'No time' },
          { text: 'Side effects' },
          { text: 'Do not have it with me' }
        ],
        /*destructiveText: 'Skip',*/
        titleText: 'Skip reason',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          return true;
        }
      });
    };

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 2000);

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

.controller('MedicationListingCtrl', function($sce, $scope, $stateParams, $ionicLoading, Patient, Medications) {
  $scope.pat = Patient.get($stateParams.patId);

  Medications.search($stateParams.patId).then(function(res){
    $scope.medications = res;
    $ionicLoading.hide();
  },function(err){
    console.log(err);
    $ionicLoading.hide();
  });
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
