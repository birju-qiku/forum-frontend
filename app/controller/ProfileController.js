(function(){
	angular.module('qiku').controller('ProfileController',profileController);
	profileController.$inject = ['$scope','$http','$state','apiUrl','$rootScope'];
	function profileController($scope,$http,$state,apiUrl,$rootScope){
		/*var param = $state.href($state.current.name, $state.params);
		if(param == '/all'){
			$('.tab-label-2 > a').trigger('click');
		}else if(param == '/hot'){
			$('.tab-label-1 > a').trigger('click');
		}*/
		var pc = this;
		pc.$state = $state;
		/*$http.get(apiUrl+'/officialthread').success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
			fc.threads = data;
		});
		$http.get(apiUrl+'/stats').success(function(data){
			fc.stats = data.stats;
		});*/
	}
})();