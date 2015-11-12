angular.module('starter.services', [])

.factory('Notifications', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow MD',
    lastText: 'Your labs are great!',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx MD',
    lastText: 'Annual visit',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson MD',
    lastText: 'Flu season is here',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor RN',
    lastText: 'Please get a flu shot at our clinic',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'Need to sign consent form',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

  .factory('Patient', function(CONSTANTS, $http, $q) {
  var _patients = [];
  return {
    search: function(strPatName) {
      var deferred = $q.defer();
      if(_patients.length > 0){
        return deferred.resolve(_patients);
      }
      var url = CONSTANTS.API_BASE + '/Patient?'
        + 'name=' + encodeURIComponent(strPatName);
      var req = {
        method: 'GET',
        url: url
      };

      $http(req).
      success(function (response, status, headers, config) {
        console.log(response.entry);
        _patients = response.entry;
        deferred.resolve(response.entry);
      }).
      error(function (data, status, headers, config) {
        deferred.reject('There was a problem with search request...');
        console.log(data, status, headers, config);
      });


      return deferred.promise;
    },
    get: function(patId) {
      for (var i = 0; i < _patients.length; i++) {
        if (_patients[i].resource.id === patId) {
          return _patients[i];
        }
      }
      return null;
    }
  };
})
  .factory('Medications', function(CONSTANTS, $http, $q) {
    var _medications = [];
    return {
      search: function(patId) {
        var deferred = $q.defer();
        if(_medications.length > 0){
          return deferred.resolve(_medications);
        }
        var url = CONSTANTS.API_BASE + '/MedicationPrescription?'
          + 'patient=' + patId
          + '&status=active';
        var req = {
          method: 'GET',
          url: url
        };
        $http(req).
        success(function (response, status, headers, config) {
          console.log(response.entry);
          _medications = response.entry;
          deferred.resolve(response.entry);
        }).
        error(function (data, status, headers, config) {
          deferred.reject('There was a problem with search request...');
          console.log(data, status, headers, config);
        });
        return deferred.promise;
      },
      get: function(medId) {
        for (var i = 0; i < _medications.length; i++) {
          if (_medications[i].resource.id === medId) {
            return _medications[i];
          }
        }
        return null;
      }
    };
  });
