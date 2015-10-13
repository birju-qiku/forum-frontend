(function(){
	angular.module('qiku').controller('NewThreadController',newThreadController);
	newThreadController.$inject = ['$scope','$http','$state','apiUrl'];
	function newThreadController($scope,$http,$state,apiUrl){
		var nt = this;
		nt.category="general";
		nt.post = function(){
			var obj = {
				title:nt.title,
				desc:$("#newThread").htmlcode(),
				posted_by:'Qiku India',
				posted_by_id:'5600fd78f401d1101a4f4eed',
				category:nt.category
			}
			$http.post(apiUrl+'/thread',obj).success(function(){
				$state.go('home.latest');
				toastr.success("Your thread is added to our forum.", "Qiku India", {"iconClass": 'customer-info'});
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