
      mytwitter.controller("LoginController", function($scope,$http,$location,$window){
        	 
          $scope.SignIn1=function(){
        	  console.log("in12");
        	  console.log("pass"+$scope.password);
        	  	         $http({
	         url: '/afterSignIn', 
	         method: 'POST', 
	         data: { "username": $scope.username, "password": $scope.password }
	         }).success(function (data, status, headers, config) {
	         		console.log(data);
	         		if(data=="Invalid Login"){
	    				console.log(data);
	    				alert("Soryy I valid Username/password");
	    				
	    			}
	         		else
	         			{
	         			$window.sessionStorage.userid=data[0]["USER_ID"];
	         			$window.sessionStorage.username=data[0]["USER_NAME"];
	         			$window.sessionStorage.firstname=data[0]["FIRST_NAME"];
	         			$window.sessionStorage.lastname=data[0]["LAST_NAME"];
	         			$window.sessionStorage.handle=data[0]["HANDLE"];
	         			$location.path("/userLoginPage");
	         			}
	         }).error(function (data, status, headers, config) {
	          		
	         });
     };
         });