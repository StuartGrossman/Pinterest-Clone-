(function(){
	'use strict'
	angular.module('app').controller('PinInfoController', PinInfoController);
	PinInfoController.$inject = ['$stateParams', '$state', 'HomeFactory']

	function PinInfoController($stateParams, $state, HomeFactory){
		var vm = this;
		console.log('hitting movieinfo controller')
		vm.pin = {}
		if (!$stateParams.id){
			 $state.go('Home')
			}else{
				HomeFactory.getPin($stateParams.id).then(function(res){
					console.log(res)
					console.log('made it to getPin function')
					vm.pin = res
				})
		}
		vm.deleteComment = function(id){
			console.log('inside function delete')
			var temp = id;
			console.log(id)
			id = vm.pin.comments[id]._id
			console.log(id)
			console.log(temp)
			console.log(vm.pin.comments)
			HomeFactory.deleteComment(id).then(function(res){
				console.log('am i at the splice?.')
				vm.pin.comments.splice(temp, 1);

			})
		}	

		vm.createComment = function() {
			var comment = {
				body: vm.newComment,
				pin: $stateParams.id
			};
			HomeFactory.createComment(comment).then(function(res) {
				vm.newComment = '';
				// console.log(res);
				// vm.movie.comments.push(res);
				HomeFactory.getPin($stateParams.id).then(function(res) {
					vm.pin = res;
					console.log(vm.pin);
				});
			})
		}

	}
})();