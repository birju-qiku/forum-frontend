(function(){
	angular.module('qiku').controller('LoginController',loginController);
	loginController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope','fbAuth'];
	function loginController($scope,$http,$state,apiUrl,$stateParams,$rootScope,fbAuth){
		if(typeof(FB) !== 'undefined'){
			FB.XFBML.parse();
		}
		var lc = this;
		var refid = $stateParams.id;
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
				$state.go("login");
				toastr.success("We have send you an email. Please verify.", "Qiku Forums", {"iconClass": 'customer-info'});
			},function(err){
				if(err.data.unique == 'username'){
					toastr.success("Username already exists.", "Qiku Forums", {"iconClass": 'customer-info'});
				}else if(err.data.unique == 'email'){
					toastr.success("Email already exists.", "Qiku Forums", {"iconClass": 'customer-info'});
				}
			})
		}
		lc.login = function(){
			$http.post(apiUrl+'/user/login',lc.user).then(function(data){
				localStorage.setItem('passed',true);
				localStorage.setItem('hash',data.data.token);
				localStorage.setItem('userid',data.data._id);
				$http.defaults.headers.common['hash'] = data.data.token;
				$rootScope.$emit('loggedIn',{username:data.data.username,image:''})
				$state.go('home');
				toastr.success("Welcome to Qiku Forums", "Qiku Forums", {"iconClass": 'customer-info'});
			},function(){
				toastr.success("Authentication failed", "Qiku Forums", {"iconClass": 'customer-info'});
			})
		}
		lc.fblogin = function(){
			FB.login(function(response) {
			    if (response.authResponse) {
			    	console.log('Welcome!  Fetching your information.... ');
			    	fbAuth.getUserInfo();
			    } else {
			     console.log('User cancelled login or did not fully authorize.');
			    }
			},{scope: 'email'});
		},
		lc.initiateReset = function(email){
			$http.post(apiUrl+'/initiatereset/'+email).then(function(){
				toastr.success("We have send you the link to reset password", "Qiku Forums", {"iconClass": 'customer-info'});
				$state.go("login");
			})
		},
		lc.reset = function(){
			var resetObj = {};
			resetObj.refid = refid;
			resetObj.password = lc.user.resetPassword;
			$http.put(apiUrl+'/reset',resetObj).then(function(){
				$state.go("login");
				toastr.success("You have successfully changed your password.", "Qiku Forums", {"iconClass": 'customer-info'});
			},function(err){
				/*if(err.data.unique == 'username'){
					toastr.success("Username already exists.", "Qiku India", {"iconClass": 'customer-info'});
				}else if(err.data.unique == 'email'){
					toastr.success("Email already exists.", "Qiku India", {"iconClass": 'customer-info'});
				}*/
				toastr.success("Your link has expired","Qiku Forums",{"iconClass": 'customer-info'});
			})
		}
	}
})();