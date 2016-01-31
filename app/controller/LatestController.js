(function(){
	angular.module('qiku').controller('LatestController',latestController);
	latestController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function latestController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		$('.tab-label-2 > a').trigger('click');
		var hc = this;
		hc.$state = $state;
		hc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		hc.totalThreads = 0;
    	hc.threadsPerPage = 10;
		hc.pageChanged = function(newPage) {
			var limit = newPage * 10;
			var offset  = limit - hc.threadsPerPage;
        	getResultsPage(limit,offset);
    	};
    	hc.pageChanged(1);
    	hc.pagination = {
		    current: 1
		};
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/thread?limit='+limit+'&offset='+offset).success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				hc.threads = data.data;
				hc.totalThreads = data.count;
			});
	    }
		$http.get(apiUrl+'/stats').success(function(data){
			hc.stats = data.stats;
		});
	}
})();