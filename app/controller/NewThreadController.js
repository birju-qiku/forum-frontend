(function(){
	angular.module('qiku').controller('NewThreadController',newThreadController);
	newThreadController.$inject = ['$scope','$http','$state','apiUrl','$q'];
	function newThreadController($scope,$http,$state,apiUrl,$q){
		var nt = this;
		function userDetails(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/user').success(function(data){
					nt.userDetails = data;
					resolve();
				})
			})	
		}
		nt.category="general";
		nt.post = function(){
			var userDetailsPromise = userDetails();
			userDetailsPromise.then(function(){
				var obj = {
					title:nt.title,
					desc:$("#newThread").htmlcode(),
					posted_by:nt.userDetails.username,
					posted_by_id:nt.userDetails._id,
					posted_by_image:nt.userDetails.image,
					category:nt.category
				}
				$http.post(apiUrl+'/thread',obj).success(function(){
					$state.go('home.latest');
					toastr.success("Your thread is added to our forum.", "Qiku India", {"iconClass": 'customer-info'});
				})
			})
		}
		var wbbOpt = {
			buttons: "bold,italic,underline,|,img,link"
		}
		$(function() {
		  $("#newThread").wysibb(wbbOpt);
		})
	}
})();	