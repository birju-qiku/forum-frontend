(function(){
	angular.module('qiku').controller('HotController',hotController);
	hotController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function hotController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		if(param == '/all'){
			$('.tab-label-2 > a').trigger('click');
		}else if(param == '/hot'){
			$('.tab-label-1 > a').trigger('click');
		}
		var hc = this;
		hc.$state = $state;
		hc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		$http.get(apiUrl+'/thread').success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
			hc.threads = data;
		});
		$http.get(apiUrl+'/stats').success(function(data){
			hc.stats = data.stats;
		});
	}
})();