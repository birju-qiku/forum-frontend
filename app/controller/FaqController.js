(function(){
	angular.module('qiku').controller('FaqController',faqController);
	faqController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function faqController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		$('.tab-label-6 > a').trigger('click');
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
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/faq?limit='+limit+'&offset='+offset).success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				hc.threads = data.data;
				hc.totalThreads = data.count;
			});
	    }
	}
})();