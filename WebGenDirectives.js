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
				for (m = 0; m < 8; m++) {
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
				
				scope.ctx.moveTo(0, 0);
				for (k = 0; k < line.points.length; k++) {
					scope.ctx.lineTo((line.points[k]*(scope.canvas.width/2)), 0);
				}
				scope.ctx.stroke();
				
			};

			scope.update = $interval(function() {
				drawSupports();
				drawWeb()
			}, 16);

		}

	}
}]);

angular.module('WebGen').directive('webBeat', ['$interval', '$window', function($interval, $window) {
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
			scope.canvas.height = $window.innerHeight * (1/6);

			scope.meterX = scope.canvas.width/8;
			scope.meterY = scope.canvas.height/2;
			scope.meterLength = scope.canvas.width *(6/8);

			drawMeter = function() {
				
				//draw main line
				scope.ctx.beginPath();
				scope.ctx.moveTo(scope.meterX, scope.meterY);
				scope.ctx.lineTo(scope.meterX + scope.meterLength , scope.meterY);
				scope.ctx.lineWidth = 4;
				scope.ctx.stroke();


				//draw points
				for (i = 0; i < 10; i++) {
					scope.ctx.beginPath();
					scope.ctx.moveTo(scope.meterX + i*(scope.meterLength/9), scope.meterY+10);
					scope.ctx.lineTo(scope.meterX + i*(scope.meterLength/9), scope.meterY-10);

					if (i == 0 || i == 9) {
						scope.ctx.strokeStyle = '#000000';
						scope.ctx.lineWidth = 3;
					}
					else {
						scope.ctx.strokeStyle = '#ff0000';
						scope.ctx.lineWidth = 2;
					}

					scope.ctx.stroke();
				}

				//draw player marker
				scope.ctx.beginPath();
				scope.ctx.moveTo(scope.meterX + (scope.meterLength * (scope.marker.progress/scope.marker.goal)), scope.meterY+10);
				scope.ctx.lineTo(scope.meterX + (scope.meterLength * (scope.marker.progress/scope.marker.goal)), scope.meterY-10);

				if (i == 0 || i == 9) {
					scope.ctx.strokeStyle = '#000085';
					scope.ctx.lineWidth = 2;
				}
				if (i > 0 && i < 9) {
					scope.ctx.strokeStyle = '#006640';
					scope.ctx.lineWidth = 2;
				}
				else {
					scope.ctx.strokeStyle = '#000066';
					scope.ctx.lineWidth = 3;
				}

				scope.ctx.stroke();
			};

			scope.update = $interval(function() {
				drawMeter();
			}, 16);
		}

	}
}]);