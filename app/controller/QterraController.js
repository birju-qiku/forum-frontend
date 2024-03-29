(function(){
	angular.module('qiku').controller('QterraController',qterraController);
	qterraController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function qterraController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		$('.tab-label-4 > a').trigger('click');
		var hc = this;
		hc.$state = $state;
		hc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		hc.totalThreads = 0;
    	hc.threadsPerPage = 15;
		hc.pageChanged = function(newPage) {
			var limit = newPage * 15;
			var offset  = limit - hc.threadsPerPage;
        	getResultsPage(limit,offset);
    	};
    	hc.pageChanged(1);
    	hc.pagination = {
		    current: 1
		};
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/category?limit='+limit+'&offset='+offset+'&category=qterra').success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				hc.threads = data.data;
				hc.totalThreads = data.count;
			});
	    }
	}
})();