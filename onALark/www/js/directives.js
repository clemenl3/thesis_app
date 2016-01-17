angular.module('starter.directives', [])
.directive('swipeview', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      var	gallery,
      	el,
      	i,
      	page,
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
console.log(element);
      gallery = new SwipeView("#wrapper", { numberOfPages: slides.length });

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
  };
});
