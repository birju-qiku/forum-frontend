(function(){
	angular.module('qiku').controller('GuideController',guideController);
	guideController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function guideController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		$('.tab-label-7 > a').trigger('click');
		var gc = this;
		gc.$state = $state;
		gc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		gc.totalThreads = 0;
    	gc.threadsPerPage = 10;
		gc.pageChanged = function(newPage) {
			var limit = newPage * 10;
			var offset  = limit - gc.threadsPerPage;
        	getResultsPage(limit,offset);
    	};
    	gc.pageChanged(1);
    	/*hc.pagination = {
		    current: 1
		};*/
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/category?category=guide&limit='+limit+'&offset='+offset).success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				gc.threads = data.data;
				gc.totalThreads = data.count;
			});
	    }
	}
})();