(function(){
	angular.module('qiku').controller('ForumController',forumController);
	forumController.$inject = ['$scope','$http','$state','apiUrl'];
	function forumController($scope,$http,$state,apiUrl){
		var fc = this;
		fc.$state = $state;
		$http.get(apiUrl+'/thread').success(function(data){
			fc.threads = data;
		});
	}
})();