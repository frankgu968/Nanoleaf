function myCtrl($scope, $http) {
	$http.get('/data').success(function(data) {
		$scope.docs = data
	})
}

