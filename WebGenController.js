angular.module('WebGen', []);

angular.module('WebGen').controller('WebCtrl', ['Target', 'Line', function(Target, Line) {

	this.target = new Target(2000);

	this.data = [ this.target.points,
				  this.target.points,
				  this.target.points,
				  this.target.points,
				  this.target.points,
				  this.target.points,
				  this.target.points,
				  this.target.points ];
}]);