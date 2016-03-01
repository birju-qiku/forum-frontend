(function(){
	angular.module('qiku').controller('BugsController',bugsController);
	bugsController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function bugsController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		$('.tab-label-8 > a').trigger('click');
		var bc = this;
		bc.$state = $state;
		bc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		bc.totalThreads = 0;
    	bc.threadsPerPage = 10;
		bc.pageChanged = function(newPage) {
			var limit = newPage * 10;
			var offset  = limit - bc.threadsPerPage;
        	getResultsPage(limit,offset);
    	};
    	bc.pageChanged(1);
    	/*hc.pagination = {
		    current: 1
		};*/
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/category?category=bugs&limit='+limit+'&offset='+offset).success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				bc.threads = data.data;
				bc.totalThreads = data.count;
			});
	    }
	}
})();