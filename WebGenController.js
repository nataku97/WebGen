angular.module('WebGen', []);

angular.module('WebGen').controller('WebCtrl', ['Target', 'Line', 'generationServ', function(Target, Line, generationServ) {
	this.data = [ new Line(),
				  new Line(),
				  new Line(),
				  new Line(),
				  new Line(),
				  new Line(),
				  new Line(),
				  new Line() ];

	this.target = new Target(2000);

	this.state = function() { return generationServ.state; }

	this.play = function() {
		setInterval(function() { generationServ.update(this.target); }, 8);
	}

	this.clicky = function() {
		if (generationServ.state == "Start!") {
			this.play();
			generationServ.start();
		}
		else if (generationServ.state == "Next!") {
			this.data[generationServ.line] = this.target.points;
			this.target = new Target(2000);
			generationServ.start();
		}
		else if (generationServ.state == "<Boom>") {
			this.target.recordCurrent();
		}
	}
	
}]);