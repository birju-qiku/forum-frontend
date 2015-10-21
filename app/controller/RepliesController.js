(function(){
	angular.module('qiku').controller('RepliesController',repliesController);
	repliesController.$inject = ['$scope','$http','$q','$stateParams','apiUrl'];
	function repliesController($scope,$http,$q,$stateParams,apiUrl){
		var rc = this
		function userDetails(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/user').success(function(data){
					rc.userDetails = data;
					resolve();
				})
			})	
		}
		rc.postReply = function(){
			rc.replyDisabled = true;
			var userDetailsPromise = userDetails();
			userDetailsPromise.then(function(){
				var obj = {
					thread_id:rc.threadDetails._id,
					desc:$("#replyToThread").htmlcode(),
					posted_by:rc.userDetails.username,
					posted_by_id:rc.userDetails._id,
					posted_by_image:rc.userDetails.image
				}
				$http.post(apiUrl+'/reply',obj).success(function(data){
					rc.replyDisabled = false;
					rc.replies.push({
						_id:data.id,
						thread_id:rc.threadDetails._id,
						desc:$("#replyToThread").htmlcode(),
						posted_by:rc.userDetails.username,
						posted_by_id:rc.userDetails._id,
						posted_by_image:rc.userDetails.image
					});
					$("#replyToThread").htmlcode('');
					toastr.success("Your reply is added to the thread.", "Qiku India", {"iconClass": 'customer-info'});
				})
			})
		}
		rc.fillReply = function(desc,posted_by){
			var desc = "<div style='background-color:#f2f1f1;padding-left:5px'>-<b>"+posted_by+"</b> said <br />"+desc+"</div>"; 
			$("#replyToThread").htmlcode(desc);
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);
		}
		//get route param fetch and create a promise :)
		function getThreadId(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/thread-by-link/'+$stateParams.id).success(function(data){
					rc.threadDetails = data;
					resolve();
				})
			})	
		}
		var getThreadPromise = getThreadId();
		getThreadPromise.then(function(){
			$http.get(apiUrl+'/reply/'+rc.threadDetails._id+'?limit=10&offset=0').success(function(data){
				rc.replies = data.replies;
			})
		})
		var wbbOpt = {
			buttons: "bold,italic,underline,|,img,link"
		}
		$(function() {
		  $("#replyToThread").wysibb(wbbOpt);
		})
	}
})();