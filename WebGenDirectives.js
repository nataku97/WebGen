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

			drawSupports = function() {
				for (i = 0; i < scope.lines.length; i++) {

					scope.ctx.translate(scope.originX, scope.originY);
					scope.ctx.rotate(i * (Math.PI /4) );

					drawLine(scope.lines[i]);

					scope.ctx.rotate(-i * (Math.PI /4) );
					scope.ctx.translate(-scope.originX, -scope.originY);
				}	
			};

			drawWeb = function() {
				scope.ctx.translate(scope.originX, scope.originY);
				for (m = 0; m < scope.lines[0].points.length-1; m++) {
					scope.ctx.beginPath();
					
					scope.ctx.moveTo(scope.lines[0].points[m], 0);
					for (n = 0; n < 8; n++) {
						
						scope.ctx.rotate(n * (Math.PI /4) );
						
						scope.ctx.lineTo((scope.lines[n].points[m]*(scope.canvas.width/2)), 0);

						scope.ctx.rotate(-n * (Math.PI /4) );
					}
					scope.ctx.lineTo((scope.lines[0].points[m]*(scope.canvas.width/2)), 0);
					scope.ctx.stroke();
					
				}
				scope.ctx.translate(-scope.originX, -scope.originY);

			};

			drawLine = function(line) {	
				//begin line
				scope.ctx.beginPath();
				
				scope.ctx.moveTo((line.points[0]*(scope.canvas.width/2)), 0);
				for (k = 1; k < line.points.length; k++) {
					scope.ctx.lineTo((line.points[k]*(scope.canvas.width/2)), 0);
				}
				scope.ctx.stroke();
				
			};

			clearWeb = function() {
				scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
			}

			scope.update = $interval(function() {
				clearWeb();
				drawSupports();
				drawWeb();
			}, 16);

		}

	}
}]);

angular.module('WebGen').directive('webBeat', ['$interval', '$window', 'inputServ', function($interval, $window, inputServ) {
	return {

		restrict: 'E',
		scope: {
			marker: '=indicator'
		},

		template: "<canvas id='webmeter'/>",

		link: function(scope, element, attrs) {
			scope.canvas = element.find('canvas')[0];
			scope.ctx = scope.canvas.getContext('2d');
			//set canvas dimensions
			scope.canvas.width = $window.innerWidth * (2/3);
			scope.canvas.height = $window.innerHeight * (1/3);

			scope.meterLength = scope.canvas.width;
			scope.meterThickness = 14;
			scope.meterX = 0;
			scope.meterY = (scope.canvas.height * (2/3)) - scope.meterThickness/2;

			drawMeter = function() {
				
				//draw main line
				scope.ctx.beginPath();
				scope.ctx.moveTo(scope.meterX, scope.meterY);
				scope.ctx.lineTo(scope.meterLength, scope.meterY);
				scope.ctx.lineWidth = scope.meterThickness;
				scope.ctx.strokeStyle = '#000000';
				scope.ctx.stroke();

				//draw player marker
				scope.ctx.beginPath();
				scope.ctx.arc((scope.meterLength * (scope.marker.progress/scope.marker.goal)),
					 scope.meterY, scope.meterThickness, 0, 2*Math.PI );
				
				scope.ctx.strokeStyle = '#827839';
				scope.ctx.lineWidth = 3;

				scope.ctx.fillStyle = '#347C2C';

				scope.ctx.fill();
				scope.ctx.stroke();
			};

			clearMeter = function() {
				scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
			};			

			element.on('mousedown', function(event) {
				inputServ.beat(scope.marker)
			});

			scope.update = $interval(function() {
				clearMeter();
				drawMeter();
			}, 16);
		}

	}
}]);