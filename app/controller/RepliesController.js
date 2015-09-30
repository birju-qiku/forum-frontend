(function(){
	angular.module('qiku').controller('RepliesController',repliesController);
	repliesController.$inject = ['$scope','$http','$q','$stateParams'];
	function repliesController($scope,$http,$q,$stateParams){
		var rc = this
		rc.postReply = function(){
			rc.replyDisabled = true;
			var obj = {
				thread_id:rc.threadDetails._id,
				desc:$("#replyToThread").htmlcode(),
				posted_by:'Qiku India',
				posted_by_id:'5600fd78f401d1101a4f4eed'
			}
			$http.post('http://localhost:8080/reply',obj).success(function(data){
				rc.replyDisabled = false;
				rc.replies.push({
					_id:data.id,
					thread_id:rc.threadDetails._id,
					desc:$("#replyToThread").htmlcode(),
					posted_by:'Qiku India',
					posted_by_id:'5600fd78f401d1101a4f4eed'
				});
				$("#replyToThread").htmlcode('');
				alert('success');
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
				$http.get('http://localhost:8080/thread-by-link/'+$stateParams.id).success(function(data){
					rc.threadDetails = data;
					resolve();
				})
			})	
		}
		var getThreadPromise = getThreadId();
		getThreadPromise.then(function(){
			$http.get('http://localhost:8080/reply/'+rc.threadDetails._id+'?limit=10&offset=0').success(function(data){
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