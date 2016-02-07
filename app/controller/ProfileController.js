(function(){
	angular.module('qiku').controller('ProfileController',profileController);
	profileController.$inject = ['$scope','$http','$state','apiUrl','$rootScope','shareVariables'];
	function profileController($scope,$http,$state,apiUrl,$rootScope,shareVariables){
		var pc = this;
		$http.get(apiUrl+'/user').success(function(data){
			pc.userData = data;		
			$http.get(apiUrl+'/user-stats?userid='+data._id).success(function(data){
				pc.userstats = data;
				pc.userstats.rank = checkRank(data.threadCount,data.likeCount);		
			});
		});
		pc.totalUpdates = 0;
		pc.threadsPerPage = 10;
		pc.pageChanged = function(newPage) {
			var limit = newPage * 10;
			var offset  = limit - pc.threadsPerPage;
        	getResultsPage(limit,offset);
    	};
    	pc.pageChanged(1);
    	
    	function getResultsPage(limit,offset) {
        // this is just an example, in reality this stuff should be in a service
        	$http.get(apiUrl+'/thread-updates?limit='+limit+'&offset='+offset).success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
				pc.updates = data.updates;
				pc.totalUpdates = data.updateCount;
				pc.hashStack = data.hashStack;
			});
	    }
	    function checkRank(posts,likes){
	    	if(posts == 0 && likes == 0){
	    		return rank.alien;
	    	}else if(posts < 2 ){
	    		return rank.mercury;
	    	}else if((posts <= 10 && likes <= 30) ||  (posts <= 30 && likes <= 10)){
	    		return rank.venus;
	    	}else if((posts <= 100 && likes <= 50) ||  (posts <= 50 && likes <= 100)){
	    		return rank.earth;
	    	}else if((posts <= 500 && likes <= 200) ||  (posts <= 200 && likes <= 500)){
	    		return rank.mars;
	    	}else if((posts <= 750 && likes <= 350) ||  (posts <= 350 && likes <= 750)){
	    		return rank.jupiter;
	    	}else if((posts <= 1000 && likes <= 500) ||  (posts <= 500 && likes <= 1000)){
	    		return rank.saturn;
	    	}else if((posts <= 1500 && likes <= 700) ||  (posts <= 700 && likes <= 1500)){
	    		return rank.uranus;
	    	}else if((posts <= 3000 && likes <= 1000) ||  (posts <= 1000 && likes <= 3000)){
	    		return rank.neptune;
	    	}
	    }
	    var rank = {
	    	alien:'Alien',
	    	mercury:'Mercury',
	    	venus:'Venus',
	    	earth:'Earth',
	    	mars:'Mars',
	    	jupiter:'Jupiter',
	    	saturn:'Saturn',
	    	uranus:'Uranus',
	    	neptune:'Neptune'
	    }
	}
})();