angular.module('WebGen').service('generationServ', function() {
	this.state = "Start!";
	this.play = false;
	this.line = 0;

	this.restart = function() {
		this.play = false;
		this.state = "Next!";
		this.line += 1;
	};

	this.start = function() {
		this.play = true;
		this.state = "<Boom>";
	};

	this.update = function(t) {
		if (this.play) {
			t.update();
			if (t.progress <= t.goal) {
				this.restart();
			}
		}
	};
});