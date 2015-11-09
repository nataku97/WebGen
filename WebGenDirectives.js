angular.module('WebGen').directive('webScreen', ['$interval', '$window', function($interval, $window) {
	return {

		restrict: 'E',
		scope: {
			lines: '=data'
		},

		template: "<canvas id='webscreen'/>",

		link: function(scope, element, attrs) {
			scope.canvas = element.find('canvas')[0];
			scope.ctx = scope.canvas.getContext('2d');
			//set canvas area to two-third window height squared
			scope.canvas.width = $window.innerHeight * (2/3);
			scope.canvas.height = $window.innerHeight * (2/3);

			//set origin point
			scope.originX = scope.canvas.width/2
			scope.originY = scope.canvas.height/2;

			drawLines = function() {
				
				for (i = 0; i < scope.lines.length; i++) {

					scope.ctx.translate(scope.originX, scope.originY);
					scope.ctx.rotate(i * (Math.PI /4) );

					drawLine(scope.lines[i]);

					scope.ctx.rotate(-i * (Math.PI /4) );
					scope.ctx.translate(-scope.originX, -scope.originY);
				}

				
			};

			drawLine = function(line) {	
				//begin line
				scope.ctx.beginPath();
				
				scope.ctx.moveTo(0, 0);
				for (k = 0; k < line.length; k++) {
					scope.ctx.lineTo(line[k], 0);
				}
				scope.ctx.stroke();
				
			};

			scope.update = drawLines();

		}

	}
}]);