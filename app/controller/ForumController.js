(function(){
	angular.module('qiku').controller('ForumController',forumController);
	forumController.$inject = ['$scope','$http','$state','apiUrl','$stateParams'];
	function forumController($scope,$http,$state,apiUrl,$stateParams){
		var param = $state.href($state.current.name, $state.params);
		if(param == '/all'){
			$('.tab-label-3 > a').trigger('click');
		}else if(param == '/latest'){
			$('.tab-label-2 > a').trigger('click');
		}
		var fc = this;
		fc.$state = $state;
		$http.get(apiUrl+'/thread').success(function(data){
			fc.threads = data;
		});
	}
})();