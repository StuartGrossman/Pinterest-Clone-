(function(){
	'use strict'
	angular.module('app').controller('CeatePinController', CeatePinController);
	CeatePinController.$inject = ['$state', 'HomeFactory'];

	function CeatePinController($state, HomeFactory){
		var vm = this;
		vm.pin = {}

		vm.CreatePin = function(){
			vm.pin.created = new Date(vm.pin.created + '-1-1');
			console.log('inside CreatePin controller')
			HomeFactory.CreateNewPin(vm.pin).then(function(res){
				console.log('back to the state');
				console.log('this is the res to creating pin ' + res);
				$state.go('Home');
			})
		}
	}

})()
