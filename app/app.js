(function(){
	angular.module('qiku',['ui.router','seo'])
	.config(routers)
	.constant('apiUrl','http://52.25.132.250:8080')
	//.constant('apiUrl','http://localhost:8080')
	.run(['$http','$rootScope','apiUrl','$window','fbAuth',function($http,$rootScope,apiUrl,$window,fbAuth){
		$http.defaults.headers.common['hash'] = localStorage.getItem('hash');
		if(localStorage.getItem('passed')){
			var hash = localStorage.getItem('hash');
			$http.get(apiUrl+'/user').success(function(data){
				if(data.src == "fb"){
					$rootScope.$emit('loggedIn',{username:data.name,image:data.image});	
				}else{
					$rootScope.$emit('loggedIn',{username:data.username,image:data.image});
				}
			})
		}
		$window.fbAsyncInit = function() {
    	// Executed when the SDK is loaded

	    FB.init({ 

	      /* 
	       The app id of the web app;
	       To register a new app visit Facebook App Dashboard
	       ( https://developers.facebook.com/apps/ ) 
	      */

	      appId: '906239946095792',

	      /* 
	       Enable cookies to allow the server to access 
	       the session 
	      */

	      cookie: true, 

	      /* Parse XFBML */

	      xfbml: true,
	      version: 'v2.2'
	    });

	    //fbAuth.watchLoginChange();

	  };

	  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));

	}])
	.controller('headerController',headerCtrlFunction)
	.controller('mainController',mainCtrlFunction);
	headerCtrlFunction.$inject = ['$scope','$rootScope','$http','$state','apiUrl','$timeout'];
	mainCtrlFunction.$inject = ['$scope','$rootScope'];
	function mainCtrlFunction($scope,$rootScope){
		$rootScope.$on('updateOgTags',function(event,data){
			for(i in data){
				$scope[i] = data[i];
			}
		});
	}
	function headerCtrlFunction($scope,$rootScope,$http,$state,apiUrl,$timeout){
		$rootScope.$on('loggedIn',function(event,data){
			$scope.username = data.username;
			$scope.image = data.image
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