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

.controller('SurveyCtrl', function($scope, $stateParams, $http) {
  $scope.$on('$ionicView.loaded', function (viewInfo, state) {
    if(state.stateId=="survey.prompt") {
      $scope.randomMatch();
    }
  });
  $scope.match = {
    name: "Doug Right",
    address: "Left",
    gps_coordinates: "0.1,3.1",
    menu_link: "//www.google.com",
    review_link: "//www.google.com",

  }
  $scope.distance = {distance: "12"};
  $scope.buttons = [
    [
      {name: "Breakfast", value: false},
      {name: "Coffee", value: false},
      {name: "Lunch",value: false},
      {name: "Fast Food",value: false},
      {name: "Dinner",value: false},
      {name: "Drinks",value: false}
    ],
    [
      {name: "Vegitarian",value: false},
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
    localStorage['survey_buttons'] = JSON.stringify($scope.buttons);
  }
  $scope.distanceChange=function() {
    console.log($scope.distance);
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

    var data = {
           oauth_consumer_key: '22fyEPMy0uDEz3E4x2QQRQ', //Consumer Key
           oauth_token: 'o71MFjO_geUXGESVpNY121zBGflw8BYU', //Token
           oauth_signature_method: "HMAC-SHA1",
           oauth_timestamp: new Date().getTime(),
           oauth_nonce: $scope.generateUUID(),
           location: 'San+Francisc',
           term: 'food'
    }
    var method = 'GET';
    var url = 'https://api.yelp.com/v2/search'
    data["oauth_signature"] = oauthSignature.generate('GET', url, data, "RgObJbWlEdp14tn5LCv-CHlzAFM", "mTZ9HRC6hNB4eS7J8uKLfBKRspE", { encodeSignature: false})

    $http({
      method: method,
      url: url,
      params: data

    }).then(function successCallback(response) {
        $scope.parseBusiness(response.data.businesses[0]);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  $scope.parseBusiness = function(business) {
    console.log(business);
    $scope.match.name=business.name;
    $scope.match.menu_link = business.mobile_url;
    $scope.match.gps_coordinates = business.location.coordinate.latitude + "," + business.location.coordinate.longitude;
    $scope.match.address = business.location.address[0] + ", " + business.location.city + ", " + business.location.state_code;
  }

});
