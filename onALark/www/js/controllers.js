angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('IntroCtrl', function($scope, $stateParams) {

})

.controller('SurveyCtrl', function($scope, $stateParams, $http, $ionicLoading) {
  $scope.$on('$ionicView.loaded', function (viewInfo, state) {
    if(state.stateId=="survey.prompt") {

      $scope.randomMatch();
    }

    if(state.stateId=="survey.distance") {
      $ionicLoading.show({
        template: "<ion-spinner icon=\"crescent\"></ion-spinner>"
      })
      navigator.geolocation.getCurrentPosition(function(response) {
        console.log(response);
        $scope.geolocate(response);
      });
    }
  });

  $scope.geolocate=function(response) {

    console.log(response);
    $scope.coordinates = response.coords;
    $http({
      method:"GET",
      url: 'http://maps.googleapis.com/maps/api/geocode/json',
      params: {
        latlng: $scope.coordinates.latitude + "," + $scope.coordinates.longitude,
        sensor: true
      }

    }).then(function successCallback(response) {
        $scope.temporary_address = response.data.results[0].formatted_address;
        $ionicLoading.hide();
  });
}
$scope.temporary_address = "";
  $scope.coordinates = {};
  $scope.match = {
    name: "No Matches",
    address: "(find new match or back to survey)",
    gps_coordinates: "",
    menu_link: "",
    review_link: "",
  }

  $scope.distance = {distance: "1"};
  window.buttons = [
    [
      {name: "Breakfast", value: false},
      {name: "Coffee", value: false},
      {name: "Lunch",value: false},
      {name: "Fast Food",value: false},
      {name: "Dinner",value: false},
      {name: "Bars",value: false}
    ],
    [
      {name: "Vagetarian",value: false},
      {name: "Vegan",value: false},
      {name: "Gluten-Free",value: false}
    ]
  ]
  if(localStorage['survey_buttons']) {
    $scope.buttons = JSON.parse(localStorage['survey_buttons']);
  }
  if(localStorage['survey_distance']) {
    $scope.distance = JSON.parse(localStorage['survey_distance']);
  }

  $scope.selectButton=function(button){
    button.value = !button.value;
    console.log($scope.buttons);
    localStorage['survey_buttons'] = JSON.stringify($scope.buttons);
  }
  $scope.distanceChange=function() {
    localStorage['survey_distance'] = JSON.stringify($scope.distance);
  }
  $scope.generateUUID = function() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  };
  $scope.randomMatch=function() {
    $ionicLoading.show({
      template: "<ion-spinner icon=\"crescent\"></ion-spinner>"
    })
    $scope.buttons = JSON.parse(localStorage['survey_buttons']);
    terms = "food";
    for(var i = 0; i < $scope.buttons[0].length; i++) {
      if($scope.buttons[0][i].value) {
        terms += "," + $scope.buttons[0][i].name;
      }
    }
    for(var i = 0; i < $scope.buttons[1].length; i++) {
      if($scope.buttons[1][i].value) {
        terms += "," + $scope.buttons[1][i].name;
      }
    }
    var data = {
           oauth_consumer_key: '22fyEPMy0uDEz3E4x2QQRQ', //Consumer Key
           oauth_token: 'o71MFjO_geUXGESVpNY121zBGflw8BYU', //Token
           oauth_signature_method: "HMAC-SHA1",
           oauth_timestamp: new Date().getTime(),
           oauth_nonce: $scope.generateUUID(),
           location: $scope.temporary_address,
           radius_filter: $scope.distance.distance * 1609.34,
           cll: $scope.coordinates.latitude + "," + $scope.coordinates.longitude,
           term: terms
    }
    var method = 'GET';
    var url = 'https://api.yelp.com/v2/search'
    data["oauth_signature"] = oauthSignature.generate('GET', url, data, "RgObJbWlEdp14tn5LCv-CHlzAFM", "mTZ9HRC6hNB4eS7J8uKLfBKRspE", { encodeSignature: false})

    $http({
      method: method,
      url: url,
      params: data

    }).then(function successCallback(response) {
        $scope.parseBusiness(response.data.businesses[Math.floor(Math.random()*response.data.businesses.length)]);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  $scope.parseBusiness = function(business) {
    console.log(business);
    $ionicLoading.hide();
    $scope.match.name=business.name;
    $scope.match.menu_link = business.mobile_url;
    $scope.match.gps_coordinates = business.location.coordinate.latitude + "," + business.location.coordinate.longitude;
    $scope.match.address = business.location.address[0] + ", " + business.location.city + ", " + business.location.state_code;
  }

});
