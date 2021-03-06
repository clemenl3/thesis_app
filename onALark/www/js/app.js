// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('intro', {
    url: '',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  }).state('survey', {
      url: '/survey',
      templateUrl: 'templates/survey.html',
      controller: 'SurveyCtrl',
      abstract: true
  }).state('survey.mealtype', {
      url: '/mealtype',
      templateUrl: 'templates/survey-mealtype.html',
      controller: 'SurveyCtrl'
    }).state('survey.restrictions', {
        url: '/restrictions',
        templateUrl: 'templates/survey-restrictions.html',
        controller: 'SurveyCtrl'
      }).state('survey.distance', {
          url: '/distance',
          templateUrl: 'templates/survey-distance.html',
          controller: 'SurveyCtrl'
        }).state('survey.prompt', {
            url: '/prompt',
            templateUrl: 'templates/survey-prompt.html',
            controller: 'SurveyCtrl'
          }).state('survey.viewmatch',{
            url:'/viewmatch',
            templateUrl: 'templates/survey-viewmatch.html',
            controler: 'SurveyCtrl'
          })

  // Each tab has its own nav history stack:

  // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/tab/dash');

});
