(function(){
	angular.module('qiku',['ui.router','angularUtils.directives.dirPagination',/*'doowb.angular-pusher',*/'ui.bootstrap','ngSanitize','ngFileUpload'])
	.config(routers)
	/*.config(['PusherServiceProvider',
	  function(PusherServiceProvider) {
	    PusherServiceProvider
	    .setToken('f2b00087f977c39298f4')
	    .setOptions({});
	  }
	])*/
	.config(function ($httpProvider) {
         $httpProvider.interceptors.push(function ($q) {
             return {
                 'request': function (config) {
                 	var hash = localStorage.getItem('hash');
                 	if(config.url.indexOf('localhost:8080') !== -1 || config.url.indexOf('inforum.qiku.com') !== -1){
                 		if(config.url.indexOf('?') !== -1){
                 			config.url = config.url + '&hash='+hash;
                 		}else{
                 			config.url = config.url + '?hash='+hash;
                 		}
                 	}
                    return config;
                 }

             }
         });
     })
	.constant('apiUrl',config.apiUrl)
	//.constant('apiUrl','http://localhost:8080')
	.run(['$http','$rootScope','apiUrl','$window','fbAuth','shareVariables',function($http,$rootScope,apiUrl,$window,fbAuth,shareVariables){
		//$http.defaults.headers.common['hash'] = localStorage.getItem('hash');
		//$http.defaults.headers.common["Content-Type"] = "text/plain";
		if(localStorage.getItem('passed')){
			var hash = localStorage.getItem('hash');
			$http.get(apiUrl+'/user').success(function(data){
				shareVariables.set('userData',data);
				localStorage.setItem('userid',data._id);
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

	      //appId: '906239946095792',
	      appId: config.facebook.appId,

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
	headerCtrlFunction.$inject = ['$scope','$rootScope','$http','$state','apiUrl','$timeout','$window'];
	mainCtrlFunction.$inject = ['$scope','$rootScope',/*'Pusher',*/'$state'];
	function mainCtrlFunction($scope,$rootScope,Pusher,$state){
	    /*Pusher.subscribe('test_channel', 'my_event', function (data) {
	    	toastr.options = {
			  "closeButton": true,
			  "timeOut": "500000",
			  onclick: function () { $state.go('home.replies',{id:data.url});} 
			}
	    	toastr.success(data.message, "Qiku Forums", {"iconClass": 'customer-info'});
	    });
	    Pusher.subscribe('test_channel', 'second_event', function (data) {
	    	toastr.options = {
			  "closeButton": true,
			  "timeOut": "500000",
			  onclick: function () { $state.go('home.replies',{id:data.url});} 
			}
	    	toastr.success(data.message, "Qiku Forums", {"iconClass": 'customer-info'});
	    });*/
		$rootScope.$on('updateOgTags',function(event,data){
			for(i in data){
				$scope[i] = data[i];
			}
		});
	}
	function headerCtrlFunction($scope,$rootScope,$http,$state,apiUrl,$timeout,$window){
		$rootScope.$on('loggedIn',function(event,data){
			$scope.username = data.username;
			$scope.image = data.image
		});
		$scope.logout = function(){
			$http.put(apiUrl+'/user/logout').success(function(data){
				localStorage.removeItem('passed');
				localStorage.removeItem('userid');
				localStorage['hash'] = data.token;
				$rootScope.$emit('loggedIn',false);
				$state.go('login');
				//$window.location.reload();
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
	    .state('home.hot',{
	    	url:'hot',
	    	templateUrl:'/app/hot.html',
	    	controller:'HotController',
		  	controllerAs:'forum'
		})
		.state('home.all',{
			url:'all',
	    	templateUrl:'/app/all.html',
		  	controller:'LatestController',
		  	controllerAs:'latest'
		})
		.state('home.qterra',{
			url:'qterra',
	    	templateUrl:'/app/qterra.html',
		  	controller:'QterraController',
		  	controllerAs:'forum'
		})
		.state('home.os',{
			url:'os',
	    	templateUrl:'/app/os.html',
		  	controller:'OsController',
		  	controllerAs:'os'
		})
		.state('home.faq',{
			url:'faq',
	    	templateUrl:'/app/faq.html',
		  	controller:'FaqController',
		  	controllerAs:'faq'
		})
		.state('home.guide',{
			url:'guide',
	    	templateUrl:'/app/guide.html',
		  	controller:'GuideController',
		  	controllerAs:'guide'
		})
		.state('home.bugs',{
			url:'bugs',
	    	templateUrl:'/app/bugs.html',
		  	controller:'BugsController',
		  	controllerAs:'bugs'
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
		.state('home.pagereplies',{
			url: 'replies/:id/:page',
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
		.state('initiatereset',{
			url:'/initiatereset',
	    	templateUrl: '/app/initiate-reset.html',
	    	controller: 'LoginController',
		  	controllerAs:'login'
		})
		.state('reset',{
			url:'/reset/:id',
	    	templateUrl: '/app/reset.html',
	    	controller: 'LoginController',
		  	controllerAs:'login'
		})
		.state('profile',{
			url:'/profile',
	    	templateUrl: '/app/profile.html',
	    	controller: 'ProfileController',
		  	controllerAs:'profile'
		})
		.state('home.warranty',{
			url:'extended-warranty',
	    	templateUrl:'/app/extended-warranty.html',
		  	controller:'WarrantyController'
		})
		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('httpErrorInterceptor');
	}
})();