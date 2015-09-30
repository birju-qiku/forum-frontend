(function(){
	angular.module('qiku').controller('ForumController',forumController);
	forumController.$inject = ['$scope','$http','$state'];
	function forumController($scope,$http,$state){
		var fc = this;
		fc.$state = $state;
		$http.get('http://localhost:8080/thread').success(function(data){
			fc.threads = data;
		});
	}
})();