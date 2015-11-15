angular.module('WebGen').factory(
	"Line", function () {
		function Line() {
			this.points = [ .05, .1, .15, .20,
							.25, .30, .35, .40,
							.45, .50, .55, .60,
							.65, .70, .75, .95 ];
		}

		Line.prototype = {
			points: function() { return this.points; }
		};

		return ( Line );
	}
);

angular.module('WebGen').factory(
	"Target", ['Line', function (Line) {

		function Target(g) {
			this.goal = g;
			this.progress = 0;
			this.current = 0;
			this.points = new Line();
			this.running = false;
		}

		Target.prototype = {
			goal: function() {return this.goal;},
			progress: function() {return this.progress;},
			points: function() {return this.points;},
			current: function() {return this.current;},
			update: function() {
				if (this.running) {
					this.progress += 1;
					//if (this.points.points[this.current] > this.progress) {
					//	this.current += 1;
					//}
				}
				if (this.progress > this.goal) {
					this.running = false;
					this.progress = 0;
					this.current = 0;
				}
			},
			start: function() {
				this.running = true;
			},
			recordCurrent: function() {
				if (this.current < this.points.points.length-1) {
					this.points.points[this.current] = this.progress/this.goal;
					this.current += 1;
				}
			}
		};

		return ( Target );
	}]
);