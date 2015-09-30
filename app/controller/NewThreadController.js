(function(){
	angular.module('qiku').controller('NewThreadController',newThreadController);
	newThreadController.$inject = ['$scope','$http','$state'];
	function newThreadController($scope,$http,$state){
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
			$http.post('http://localhost:8080/thread',obj).success(function(){
				$state.go('home');
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