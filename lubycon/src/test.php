<!DOCTYPE html>
<html lang="en" ng-app="App">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<script type="text/javascript" src="../plugin/lib/jquery-1.12.2.min.js"></script>
    <script type="text/javascript" src="../plugin/lib/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../plugin/lib/angular.min.js"></script>

	<script type="text/javascript" src="./common/common.js"></script>
	<script>
		App.controller('Ctrl1',function($scope){
			$scope.k = 1;
			$scope.a = 2;
		});
	</script>
</head>
<body ng-controller="Ctrl1">
	<input type="text" ng-model="aa" />
	<p>{{aa}}</p>
	<p>{{k}}</p>
</body>
</html>
