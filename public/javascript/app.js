(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('CreatePin', {
			url: '/createPin',
			controller: 'CeatePinController',
			templateUrl: 'views/CreatePin.html',
			controllerAs: 'vm'
		})
		$urlRouterProvider.otherwise('/');
	}
})();
