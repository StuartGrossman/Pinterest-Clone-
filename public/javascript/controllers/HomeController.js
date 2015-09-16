(function(){
	'use strict'
	angular.module('app').controller('HomeController', HomeController);
	HomeController.$inject = ['$state', 'HomeFactory'];

	function HomeController($state, HomeFactory){
		var vm = this;

		HomeFactory.getPins().then(function(res) {
			console.log('hitting home controler')
			console.log(res);
			vm.pins = res;
			
		});
	}

})()
