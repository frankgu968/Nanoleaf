function myCtrl($scope, $http) {
	$http.get('/data').success(function(data) {
		$scope.docs = data;
	});
};

function expectationCtrl($scope, $http){
	$http.get('/dataE').success(function(data){
			$scope.expectations = data;
	});
	
	$scope.okay = function(){
		var data = $scope.text;
		$http.post("/rcv", {message : data})
			
			.success(function(serverResponse, status, headers) {
				console.log("success!");
			}).error(function(serverResponse, status, headers) {
				console.log("failure");
			}
		);
		$scope.text='';
		alert(data + ' added!');
		
		$http.get('/dataE').success(function(data){
			$scope.expectations = data;
		});
	};
};