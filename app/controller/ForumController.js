(function(){
	angular.module('qiku').controller('ForumController',forumController);
	forumController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function forumController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		if(param == '/all'){
			$('.tab-label-3 > a').trigger('click');
		}else if(param == '/latest'){
			$('.tab-label-2 > a').trigger('click');
		}
		var fc = this;
		fc.$state = $state;
		fc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		$http.get(apiUrl+'/thread').success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
			fc.threads = data;
		});
		$http.get(apiUrl+'/stats').success(function(data){
			fc.stats = data.stats;
		});
	}
})();