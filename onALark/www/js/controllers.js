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

.controller('SurveyCtrl', function($scope, $stateParams) {
  $scope.distance = 1;
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

  $scope.selectButton=function(button){
    button.value = !button.value;
  }

});
