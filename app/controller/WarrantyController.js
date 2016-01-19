(function(){
	angular.module('qiku').controller('WarrantyController',warrantyController);
	warrantyController.$inject = ['$scope','$http','$state','apiUrl','$q'];
	function warrantyController($scope,$http,$state,apiUrl,$q){
		var wc = this;
		function userDetails(){
			return $q(function(resolve,reject){
				$http.get(apiUrl+'/user').success(function(data){
					wc.userDetails = data;
					resolve();
				})
			})	
		}
		wc.claim = function(){
			$('#claimWarranty').text("Claiming");
			wc.disabled = true;
			var userDetailsPromise = userDetails();
			userDetailsPromise.then(function(){
				var obj = {
					fname:wc.fname,
					lname:wc.lname,
					mobileno:wc.mobileno,
					imei:wc.imei,
					user_id:wc.userDetails._id,
					email:wc.userDetails.email
				}
				$http.post(apiUrl+'/claimwarranty',obj).then(function(){
					wc.disabled = false;
					$('#claimWarranty').text("Congrats!!");
					$state.go('home.all');
					toastr.success("Congratulations!! Please check your email for warranty card.", "Qiku Forum", {"iconClass": 'customer-info'});
				},function(){
					wc.disabled = false;
					$('#claimWarranty').text("Claim");
					toastr.success("IMEI does not qualify", "Qiku Forum", {"iconClass": 'customer-info'});					
				})
			})
		}
	}
})();	