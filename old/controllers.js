angular.module('enDev')

	.controller('apiController', function($scope, $http, $routeParams){
		$http.get('js/menu.json')
		.success(function(data) {
			$scope.json = data;
		});

		var partial = null;

		//If routeParams set, set the partial.
		if($routeParams.header && $routeParams.article) {
			partial = "docs/" + $routeParams.header + "/" + $routeParams.article + ".html";
		}

		$scope.getPartial = function() {
			return partial;
		}

		$scope.setPartial = function(url) {
			//Set permalink in hash
		    parent.location.hash = "/reference/" + url.slice(5, -5);
			partial = url;
		}

		$scope.showSandbox = function() {
			$('#divSandbox').animate({
				width: "toggle"
			}, 250, "easeOutCirc", function() {
				$(".innerContents").fadeIn(0);
			});
		}

		$('#steps li').on('click', function(){
			console.log('text');
		});
	});
