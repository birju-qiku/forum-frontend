(function(){
	angular.module('qiku').controller('RepliesController',repliesController);
	repliesController.$inject = ['$scope','$http','$q','$stateParams','apiUrl','$rootScope','Upload','$sce','$sanitize'];
	function repliesController($scope,$http,$q,$stateParams,apiUrl,$rootScope,Upload,$sce,$sanitize){
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
			if($("#replyToThread").htmlcode().replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, "").replace(/\<br\>/g," ").replace(/&nbsp;/g," ").trim() == ""){
				toastr.success("You need to add description!", "Qiku Forum", {"iconClass": 'customer-info'});
				return;
			}
			rc.replyDisabled = true;
			var userDetailsPromise = userDetails();
			userDetailsPromise.then(function(){
				var obj = {
					thread_id:rc.threadDetails._id,
					thread_title:rc.threadDetails.title,
					thread_link:rc.threadDetails.link,
					desc:$("#replyToThread").htmlcode(),
					posted_by:rc.userDetails.username,
					posted_by_id:rc.userDetails._id,
					posted_by_image:rc.userDetails.image,
					category:rc.threadDetails.category
				}
				$http.post(apiUrl+'/reply',obj).success(function(data){
					rc.replyDisabled = false;
					rc.replies.push({
						_id:data.id,
						thread_id:rc.threadDetails._id,
						desc:$("#replyToThread").htmlcode(),
						posted_by:rc.userDetails.username,
						posted_by_id:rc.userDetails._id,
						posted_by_image:rc.userDetails.image,
						category:rc.threadDetails.category
					});
					$("#replyToThread").htmlcode('');
					toastr.success("Your reply is added to the thread.", "Qiku Forums", {"iconClass": 'customer-info'});
				})
			})
		}
		rc.fillReply = function($event,posted_by){
			var quote = $($event.target).parents().eq(3).find('.actualDesc').html()
			var desc = "<div style='background-color:#f2f1f1;padding-left:5px'>-<b>"+posted_by+"</b> said <br />"+quote+"</div>"; 
			$("#replyToThread").htmlcode(desc);
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);
		}
		rc.like = function(id){
			$http.put(apiUrl+'/like/'+id).then(function(data){
				toastr.success("Liked!", "Qiku Forums", {"iconClass": 'customer-info'});
			});
		}
		rc.uploadcsv = function(file){
        //console.log('file is ' + JSON.stringify(file));
        	var fd = new FormData();
        	//fd.append('id', id);
        	fd.append('attachment', file);
        	$('#replyAttach').text('Uploading');
        	$http.post(apiUrl+'/attach',fd, {
            	transformRequest: angular.identity,
            	headers: {'Content-Type': undefined}
        	}).success(function(data){
        		var tmp = $("#replyToThread").htmlcode();
        		$("#replyToThread").htmlcode(tmp+"<img src="+data.url+" />");
        		$('#replyAttach').text('Attach Image');
        	})
	    };
	    rc.uploadFiles = function(file, errFiles) {
	    	$('#replyAttach').text('Attaching');
	        rc.f = file;
	        rc.errFile = errFiles && errFiles[0];
	        if (file) {
	            file.upload = Upload.upload({
	                url: apiUrl+'/attach',
	                data: {attachment: file}
	            });

	            file.upload.then(function (response) {
	                var tmp = $("#replyToThread").htmlcode();
	        		$("#replyToThread").htmlcode(tmp+"<br /><img class='squezeimage' src="+response.data.url+" />");
	        		$('#replyAttach').text('Attach Image');
	            }, function (response) {
	            	$('#replyAttach').text('Attach Image');
	                if (response.status > 0){
	                	rc.errorMsg = response.status + ': ' + response.data;
	                }
	            }, function (evt) {
	                file.progress = Math.min(100, parseInt(100.0 * 
	                                         evt.loaded / evt.total));
	            });
	        }   
	    }
		//get route param fetch and create a promise :)
		function getThreadId(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/thread-by-link/'+$stateParams.id).success(function(data){
					$rootScope.$emit('updateOgTags',{ogtitle:data.title,ogurl:"https://forums.qiku.com/replies/"+$stateParams.id,ogdesc:data.desc.replace(/<(?:.|\n)*?>/gm, '').substr(0,200)});
					rc.threadDetails = data;
					resolve();
				})
			})	
		}
		var getThreadPromise = getThreadId();
		getThreadPromise.then(function(){
			$http.get(apiUrl+'/reply/'+rc.threadDetails._id+'?limit=10&offset=0').success(function(data){
				rc.replies = data.replies;
				//$scope.htmlReady();
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