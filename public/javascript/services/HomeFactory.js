(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q', '$rootScope'];

	function HomeFactory($http, $q, $rootScope) {
		var o = {};
		o.pin = {}
		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.CreateNewPin = function(pin){
			var q = $q.defer();
			
			pin.user = $rootScope._user.id
			console.log(pin)
			
			// pin.user = $rootScope.user.id
			// console.log('this is user id'  + pin.user)
			// console.log('creating new pin line 13')
			$http.post('/pin', pin, getAuth()).success(function(res){
				q.resolve();
			})
			return q.promise; 
		}
		
		o.getPins = function(){
			var q = $q.defer();
			console.log('inside homefactory')
			$http.get('/pin')
			.success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.getPin = function(id){
			console.log(id);
			var q = $q.defer();
			console.log('in side get Pin in homefactory')
			$http.get('/pin/' +  id, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/comments', comment, getAuth()).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}
		o.deleteComment = function(id){
			var q = $q.defer();
			$http.delete('/comments/' + id, getAuth()).success(function(res){
				console.log('hit')
				q.resolve(res);
				console.log(res)
			})
			return q.promise;
		}
		return o;
	}
})();
