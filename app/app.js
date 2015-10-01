(function(){
	angular.module('qiku', ['ui.router'])
	.config(routers)
	.constant('apiUrl','http://52.25.132.250:8080');
	//.constant('apiUrl','http://localhost:8080');
	routers.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
	function routers($stateProvider, $urlRouterProvider,$locationProvider){
		$urlRouterProvider.otherwise(function () {
		    return '/'
		});
		$stateProvider.state('home', {
	        url: '/',
	        templateUrl: '/app/forum.html',
	        controller: 'ForumController',
	        controllerAs:'forum'
	    })
	    .state('home.latest',{
	    	url:'latest',
	    	templateUrl:'/app/latest.html',
	    	controller:'ForumController',
		  	controllerAs:'forum'
		})
		.state('home.all',{
			url:'all',
	    	templateUrl:'/app/all.html',
		  	controller:'ForumController',
		  	controllerAs:'forum'
		})
		.state('home.newThread',{
			url:'new-thread',
	    	templateUrl:'/app/new-thread.html',
		  	controller:'NewThreadController'
		})
		.state('home.replies',{
			url: 'replies/:id',
	    	templateUrl:'/app/replies.html',
		  	controller:'RepliesController',
		  	controllerAs:'replies'
		})
		.state('login',{
	    	templateUrl: '/app/login.html',
		    controller: 'LoginController',
		  	controllerAs:'forum'
		})
		.state('signup',{
	    	templateUrl: '/app/signup.html',
		    controller: 'LoginController',
		  	controllerAs:'forum'
		})
		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
	}
})();