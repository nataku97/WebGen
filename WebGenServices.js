angular.module('WebGen').service('inputServ', function() {
	this.songActive = false;

	this.beat = function(target) {
		if (!this.songActive) {
			this.songActive = true;
			target.start();
			setInterval(function() { target.update(); }, 1);
		}
		else if (target.running) {
			target.recordCurrent();
		}
		else if (!target.running) {
			target.start();
		}
	}
});