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

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('IntroCtrl', function($scope, $stateParams) {
    function setup() {

        var	gallery,
           	el,
           	i,
           	page,
           	dots = document.querySelectorAll('#nav li'),
           	slides = [
           		{
           			img: 'images/pic01.jpg',
           			width: 300,
           			height: 213,
           			desc: 'Piazza del Duomo, Florence, Italy'
           		},
           		{
           			img: 'images/pic02.jpg',
           			width: 300,
           			height: 164,
           			desc: 'Tuscan Landscape'
           		},
           		{
           			img: 'images/pic03.jpg',
           			width: 300,
           			height: 213,
           			desc: 'Colosseo, Rome, Italy'
           		},
           		{
           			img: 'images/pic04.jpg',
           			width: 147,
           			height: 220,
           			desc: 'Somewhere near Chinatown, San Francisco'
           		},
           		{
           			img: 'images/pic05.jpg',
           			width: 300,
           			height: 213,
           			desc: 'Medieval guard tower, Asciano, Siena, Italy'
           		},
           		{
           			img: 'images/pic06.jpg',
           			width: 165,
           			height: 220,
           			desc: 'Leaning tower, Pisa, Italy'
           		}
           	];

           gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

           // Load initial data
           for (i=0; i<3; i++) {
           	page = i==0 ? slides.length-1 : i-1;
           	el = document.createElement('img');
           	el.className = 'loading';
           	el.src = slides[page].img;
           	el.width = slides[page].width;
           	el.height = slides[page].height;
           	el.onload = function () { this.className = ''; }
           	gallery.masterPages[i].appendChild(el);

           	el = document.createElement('span');
           	el.innerHTML = slides[page].desc;
           	gallery.masterPages[i].appendChild(el)
           }
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
