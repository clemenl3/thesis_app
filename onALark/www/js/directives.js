angular.module('starter.directives', [])
.directive('swipeview', function($timeout, $compile, $state) {
  return {
    template: "	<ul id=\"navdots\"></ul>",
    link: function(scope, element, attrs) {
      var	gallery,
      	el,
      	i,
      	page,
      	slides = [
      		{
      			width: 300,
      			height: 213,
      			desc: 'Welcome!'
      		},
          {
            width: 300,
            height: 213,
            desc: '\'On A Lark\' is a location-based food establishment and social discovery application. <br/> Connect with friends, experience different eateries, and try something new on a whim.'
          },
          {
            width: 300,
            height: 213,
            desc: '\'On A Lark\' makes the decisions for you. <br/> Based on your location and preferences, we will match you to a local business.'
          },
          {
            width: 300,
            height: 213,
            desc: 'Let\'s begin <br/><button ui-sref="survey({pageid: 1})" class="beginbutton ion-chevron-right"></button>'
          },

      	];


      gallery = new SwipeView("#wrapper", { numberOfPages: slides.length});
      var navdots = document.querySelector("#navdots");
      for(i=0; i<4; i++) {
        navdots.appendChild(document.createElement("li"));

      }
      // Load initial data
      for (i=0; i<3; i++) {
      	page = i==0 ? slides.length-1 : i-1;

      	el = document.createElement('div');
        el2 = document.createElement('div');
        el.appendChild(el2);
      	el2.innerHTML = slides[page].desc;
      	gallery.masterPages[i].appendChild(el)
      }
      navdots.children[0].className = "selected";
      gallery.onFlip(function () {
      	var el,
      		upcoming,
      		i;

      	for (i=0; i<3; i++) {
      		upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

      		if (upcoming != gallery.masterPages[i].dataset.pageIndex) {


      			el = gallery.masterPages[i].querySelector('div');
      			el.innerHTML = "<div>" + slides[upcoming].desc + "</div>";
      		}
      	}
        var prevselect = document.querySelector('.selected');
        if (prevselect != null) {
          prevselect.className = '';

        }
      	document.querySelector("#navdots").children[gallery.pageIndex % 4].className = 'selected';
        var beginButton = document.querySelector(".beginbutton");
        if(beginButton) {
          $(beginButton).on("click", function(){
            $state.go("survey.mealtype");
          });
        }
      });

    }
  };
}).directive('distanceslider', function($timeout, $compile, $state) {
  return {
    link: function(scope, element, attrs) {
        $(element).ionRangeSlider({
            type: "single",
            min: 1,
            max: 15,
            step: 1,
            grid: true,
            grid_num: 5,
            grid_snap: false,
            postfix: "mi"
        });
      }
    }
  });
