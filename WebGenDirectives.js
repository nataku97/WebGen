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

			scope.beatButtonX = scope.canvas.width * (6/16);
			scope.beatButtonY = scope.canvas.height * (1/5);
			scope.beatButtonWidth = scope.canvas.width * (4/16);
			scope.beatButtonHeight = scope.canvas.height * (1/5);

			scope.beatButtonTextX = scope.canvas.width * (7/16);
			scope.beatButtonTextY = scope.beatButtonY + (scope.canvas.height * (3/20));
			scope.beatButtonText = "";
			scope.ctx.font = "32px Arial";

			drawMeter = function() {
				drawBeatButton();

				//draw main line
				scope.ctx.beginPath();
				scope.ctx.moveTo(scope.meterX, scope.meterY);
				scope.ctx.lineTo(scope.meterLength, scope.meterY);
				scope.ctx.lineWidth = scope.meterThickness;
				scope.ctx.strokeStyle = '#000000';
				scope.ctx.stroke();

				drawPoints();

				//draw player marker
				scope.ctx.beginPath();
				scope.ctx.arc((scope.meterLength * (scope.marker.progress/scope.marker.goal)),
					 scope.meterY, scope.meterThickness, 0, 2*Math.PI );
				
				scope.ctx.strokeStyle = '#752C7D';
				scope.ctx.lineWidth = 3;

				scope.ctx.fillStyle = '#347C2C';

				scope.ctx.fill();
				scope.ctx.stroke();
			};

			drawPoints = function() {
				for (p = 0; p < scope.marker.points.points.length -1; p++) {
					scope.ctx.beginPath();
					scope.ctx.arc( scope.meterLength * scope.marker.points.points[p],
						 scope.meterY, scope.meterThickness/2, 0, 2*Math.PI);
					scope.ctx.strokeStyle = '#827839';
					scope.ctx.lineWidth = 3;

					scope.ctx.fillStyle = '#657383';

					scope.ctx.fill();
					scope.ctx.stroke();
				}
			};

			drawBeatButton = function() {
				scope.ctx.rect(scope.beatButtonX, scope.beatButtonY, 
						scope.beatButtonWidth, scope.beatButtonHeight);

				if (scope.marker.running) {
					scope.ctx.fillStyle = '#6AA121';
					scope.beatButtonTextX = scope.canvas.width * (29/64);
					scope.beatButtonText = "Boom!";

				}
				else {
					scope.ctx.fillStyle = '#FF2400';
					scope.beatButtonTextX = scope.canvas.width * (25/64);
					scope.beatButtonText = "Press to Start";
				}
				scope.ctx.fill();

				scope.ctx.fillStyle = '#000000';
				scope.ctx.fillText(scope.beatButtonText,
						scope.beatButtonTextX,
						scope.beatButtonTextY);
			}

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