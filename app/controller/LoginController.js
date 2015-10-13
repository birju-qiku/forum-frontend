(function(){
	angular.module('qiku').controller('LoginController',loginController);
	loginController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function loginController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var lc = this;
		var param = $state.href($state.current.name, $state.params);
		if(param == '/login'){
			$('.entry-tab a').css({'background-color':'#eb5b5f','color':'#ffffff'});
			$('#login-tab a').css({'background-color':'#ffffff'});
			$('#login-tab a').css({'color':'#eb5b5f'});
		}else if(param == '/signup'){
			$('.entry-tab a').css({'background-color':'#eb5b5f','color':'#ffffff'});
			$('#signup-tab a').css({'background-color':'#ffffff'});
			$('#signup-tab a').css({'color':'#eb5b5f'});
		}
		lc.register = function(){
			$http.post(apiUrl+'/user',lc.user).then(function(){
				lc.user = {};
				toastr.success("We have send you an email. Please verify.", "Qiku India", {"iconClass": 'customer-info'});
			},function(err){
				if(err.data.unique == 'username'){
					toastr.success("Username already exists.", "Qiku India", {"iconClass": 'customer-info'});
				}else if(err.data.unique == 'email'){
					toastr.success("Email already exists.", "Qiku India", {"iconClass": 'customer-info'});
				}
			})
		}
		lc.login = function(){
			$http.post(apiUrl+'/user/login',lc.user).then(function(data){
				localStorage.setItem('passed',true);
				localStorage.setItem('hash',data.data.token);
				$rootScope.$emit('loggedIn',data.data.username)
				$state.go('home.latest');
				toastr.success("Welcome to Qiku India Forum", "Qiku India", {"iconClass": 'customer-info'});
			},function(){
				alert('authentication failed');
			})
		}
	}
})();