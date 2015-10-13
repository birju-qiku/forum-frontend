(function(){
	angular.module('qiku', ['ui.router'])
	.config(routers)
	.constant('apiUrl','http://52.25.132.250:8080')
	//.constant('apiUrl','http://localhost:8080')
	.run(function($http,$rootScope,apiUrl){
		if(!localStorage.getItem('hash')){
			$http.post(apiUrl+'/token').success(function(data){
				localStorage.setItem('hash',data.token);
				$http.defaults.headers.common['hash'] = data.token;
			});
		}else{
			$http.defaults.headers.common['hash'] = localStorage.getItem('hash');
		}
		if(localStorage.getItem('passed')){
			var hash = localStorage.getItem('hash');
			$http.get(apiUrl+'/user').success(function(data){
				$rootScope.$emit('loggedIn',data.username)
			})
		}
	})
	.controller('headerController',headerCtrlFunction);
	headerCtrlFunction.$inject = ['$scope','$rootScope','$http','$state','apiUrl','$timeout'];
	function headerCtrlFunction($scope,$rootScope,$http,$state,apiUrl,$timeout){
		$rootScope.$on('loggedIn',function(event,username){
			$scope.username = username;
		});
		$scope.logout = function(){
			$http.put(apiUrl+'/user/logout').success(function(data){
				localStorage.removeItem('passed');
				$rootScope.$emit('loggedIn',false);
				$state.go('login');
			})
		}
	}
	routers.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider'];
	function routers($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider){
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
			url:'/login',
	    	templateUrl: '/app/login.html',
		    controller: 'LoginController',
		  	controllerAs:'login'
		})
		.state('signup',{
			url:'/signup',
	    	templateUrl: '/app/signup.html',
	    	controller: 'LoginController',
		  	controllerAs:'login'
		})
		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('httpErrorInterceptor');
	}
})();