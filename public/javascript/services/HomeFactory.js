(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}

		o.getMovie = function(id) {
			var q = $q.defer();
			$http.get('/api/movies/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.getMovies = function() {
			var q = $q.defer();
			$http.get('/api/movies').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.createMovie = function(movie) {
			var q = $q.defer();
			$http.post('/api/movies', movie, getAuth()).success(function(res) {
				console.log(res);
				q.resolve();
			});
			return q.promise;
		}

		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comments', comment, getAuth()).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}

		return o;
	}
})();
