(function(){
	angular.module('qiku').controller('NewThreadController',newThreadController);
	newThreadController.$inject = ['$scope','$http','$state','apiUrl','$q','Upload'];
	function newThreadController($scope,$http,$state,apiUrl,$q,Upload){
		var nt = this;
		function userDetails(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/user').success(function(data){
					nt.userDetails = data;
					resolve();
				})
			})	
		}
		nt.category="general";
		nt.post = function(){
			if($("#newThread").htmlcode().replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, "").replace(/\<br\>/g," ").replace(/&nbsp;/g," ").trim() == ""){
				toastr.success("You need to add description!", "Qiku Forum", {"iconClass": 'customer-info'});
				return;
			}
			$('#addThread').text("Posting..");
			nt.postThreadDisabled = true;
			var userDetailsPromise = userDetails();
			userDetailsPromise.then(function(){
				var obj = {
					title:nt.title,
					desc:$("#newThread").htmlcode(),
					posted_by:nt.userDetails.username,
					posted_by_id:nt.userDetails._id,
					posted_by_image:nt.userDetails.image,
					category:nt.category,
					stand:nt.userDetails.stand
				}
				$http.post(apiUrl+'/thread',obj).success(function(){
					$('#addThread').text("Post");
					$state.go('home.all');
					toastr.success("Your thread is added to our forum.", "Qiku Forum", {"iconClass": 'customer-info'});
				})
			})
		}
	    nt.uploadFiles = function(file, errFiles) {
	    	$('#threadAttach').text('Attaching');
	        nt.f = file;
	        nt.errFile = errFiles && errFiles[0];
	        if (file) {
	            file.upload = Upload.upload({
	                url: apiUrl+'/attach',
	                data: {attachment: file}
	            });

	            file.upload.then(function (response) {
	                var tmp = $("#newThread").htmlcode();
	        		$("#newThread").htmlcode(tmp+"<br /><img class='squezeimage' src="+response.data.url+" />");
	        		$('#threadAttach').text('Attach Image');
	            }, function (response) {
	            	$('#threadAttach').text('Attach Image');
	                if (response.status > 0){
	                	nt.errorMsg = response.status + ': ' + response.data;
	                }
	            }, function (evt) {
	                file.progress = Math.min(100, parseInt(100.0 * 
	                                         evt.loaded / evt.total));
	            });
	        }   
	    }
		var wbbOpt = {
			buttons: "bold,italic,underline,|,img,link"
		}
		$(function() {
		  $("#newThread").wysibb(wbbOpt);
		})
	}
})();	