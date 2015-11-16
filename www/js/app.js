// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
  .constant("CONSTANTS", {
    APP_NAME: "PillSquare",
    APP_VERSION: "0.9.2",
    CURR_ENV: "dev",
    // API_BASE: "http://localhost:5001",
    API_BASE: "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f"
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    $(document).ready(function () {

      connect('On9XBkN81KiLhEStjGWqoCRkhwXBuufL', 'Pv8KOLq0TbEUkP479GKMXfuZQNM4yKTa3D6mhWQgOcfUjNNY');

    });

    function connect(key, secret) {

      TigerText.connect({
          api_key: key,
          api_secret: secret
        },
        function (err) {
          if (err) {
            alert('Error connecting');
            //log(JSON.stringify(err));
          } else {

            // Message to Oleksiy.Kononenko
            TigerText.message({
              recipient: 'bd67f18c-5d57-4189-aa8d-5c700c8e0dc2',
              organization_id: 'VPLWeAVLCxk8Vm8u5gEHT5GU',
              body: 'This is the message text'
            }, function (err, client_id) {
              if (err) {
                alert('There was an error sending this message');
              } else {
                //alert('success!');
              }
            });

          }
        });
    }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom'); // other values: top

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })

  // Each tab has its own nav history stack:

  .state('app.dash', {
    url: '/dash',
    views: {
      'tab-home': {
        templateUrl: 'templates/all-meds.html',
        controller: 'DashCtrl'
      }
    }
  })

    .state('app.timeofday-detail', {
      url: '/timeofday-detail/:timeOfDayName',
      views: {
        'tab-home': {
          templateUrl: 'templates/timeofday-detail.html',
          controller: 'TimeOfDayDetailCtrl'
        }
      }
    })

    /*.state('app.dash-detail', {
      url: '/dash-detail/:chatId',
      views: {
        'tab-home': {
          templateUrl: 'templates/notification-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/
    .state('app.medication-listing', {
      url: '/medication-listing/:patId',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/medication-listing.html',
          controller: 'MedicationListingCtrl'
        }
      }
    })
    .state('app.medication-detail', {
      url: '/medication-detail/:medId',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/medication-detail.html',
          controller: 'MedicationDetailCtrl'
        }
      }
    })
  .state('app.chats', {
      url: '/chats',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/tab-notifications.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('app.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/notification-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('app.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/settings.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //


  //$urlRouterProvider.otherwise('/app/medication-listing/3860007');

  $urlRouterProvider.otherwise('/app/dash');

});
