angular.module('WebGen', []);

angular.module('WebGen').controller('WebCtrl', ['Target', 'Line', 'generationServ', function(Target, Line, generationServ) {

	this.target = new Target(2000);
	this.template = new Line();

	this.data = [ this.template,
				  this.template,
				  this.template,
				  this.template,
				  this.template,
				  this.template,
				  this.template,
				  this.template ];
}]);