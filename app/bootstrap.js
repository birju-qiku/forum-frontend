(function() {
    fetchData().then(bootstrapApplication);
    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        var $q = initInjector.get("$q");
        var apiUrl = config.apiUrl;
        var deferred = $q.defer();
        if(!localStorage.getItem('hash')){
        	$http.post(apiUrl+"/token").then(function(response) {
	            localStorage.setItem('hash',response.data.token);
	            deferred.resolve();
	        }, function(errorResponse) {
	            // Handle error case
	        });
        }else{
        	deferred.resolve();
        }
        return deferred.promise;
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["qiku"]);
        });
    }
}());