(function(){
	'use strict'
	angular.module('app').controller('CeatePinController', CeatePinController);
	CeatePinController.$inject = ['$state', 'HomeFactory'];

	function CeatePinController($state, HomeFactory){
		var vm = this;
		vm.pin = {}

		function CreatePin(){
			vm.pin.created = new Date(vm.movie.created + '-1-1');
			HomeFactory.CreateNewPin(vm.pin).then(function(){
				$state.go('Home');
			})
		}
	}

})()
