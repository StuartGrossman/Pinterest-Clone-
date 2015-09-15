(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.pin = {}
		o.createNewPin = function(){
			var q = $q.defer();
			http.post('/pin/create').success(function(res){
				q.resolve;
			})
			return q; 
		}
		return o;
	}
})();
