angular.module('enDev', ['ngRoute'])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				// templateUrl: 'partials/splash.html'
				templateUrl: 'partials/splash2.html'
			}).
			when('/reference', {
				// templateUrl: 'partials/reference.html'
				templateUrl: 'partials/chalk_reference.html'
			}).
			when('/chalk', {
				templateUrl: 'partials/splash2.html'
			}).
			when('/chalk/reference', {
				templateUrl: 'partials/chalk_reference.html',
				controller: 'apiController'
			}).
			when('/reference/:header/:article', {
				templateUrl: 'partials/chalk_reference.html',
				controller: 'apiController'
			}).
			otherwise({
				// templateUrl: 'partials/splash.html'
				templateUrl: 'partials/splash2.html'
			});
		}
]);


// Non-Angular functions
$(document).ready(function() {

	bindEvents();

	function bindEvents() {
		$('#btnGetKey').on('click', function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#apiPanel').animate({
					height: "toggle"
				}, 400, "easeOutCubic");
			}
			else {
				$(this).addClass('active');
				$('#apiPanel').animate({
					height: "toggle"
				}, 600, "easeOutElastic");
			}
		});

		$('#apiPanel .submit').on('click', function() {
			$('#apiPanel .panelContents').fadeOut(500);
			$('#apiPanel .loader').delay(500).fadeIn(500, function() {
				$('#apiPanel .loader .windows8').delay(5000).fadeOut(500, function() {
					$('#apiPanel .confirmation').fadeIn(500, function() {
						$('#btnGetKey').removeClass('active');
						$('#apiPanel').delay(1000).animate({
							height: "toggle"
						}, 400, "easeOutCubic");
					});
				});
			});
		});

		$('#searchIcon').on('click', function() {
			$(this).animate({right: -100}, 0);
			$('#txtSearch2').animate({width: 200, right: 0}, 500, "easeOutElastic");
			$('#btnGetKey2').animate({right: -200}, 500, "easeOutElastic");

			$('#txtSearch2').on('mouseout', function() {
				$('#txtSearch2').val('').animate({width: 18, right: 190}, 500, "easeOutElastic");
				$('#btnGetKey2').animate({right: 0}, 500, "easeOutElastic");
				$('#searchIcon').delay(200).animate({right: 200}, 0);
			})
		});

		$("#divSandbox .exit").on('click', function() {
			$(".innerContents").fadeOut(0);
			$('#divSandbox').animate({
				width: "toggle"
			}, 400, "easeOutCirc");
		});


	}
});
