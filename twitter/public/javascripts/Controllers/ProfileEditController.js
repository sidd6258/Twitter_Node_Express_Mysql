'use strict';
      mytwitter.controller("ProfileEditController", function($scope,$http,$location){
    	  $scope.oldName=function(){
        	  console.log("Fetch old Name");
        	  	         $http({
	         url: '/fetchOldName', 
	         method: 'GET'
        	  	       }).success(function(data) {
        	  				//checking the response data for statusCode
        	  				if (data.statusCode == 401) {
        	  					console.log("Error Occured Profile Page");
        	  				}
        	  				else
        	  					//Making a get call to the '/redirectToHomepage' API
        	  				console.log(data);	
        	  			var fname=document.getElementById("fname");
        	  			var lname=document.getElementById("lname");
        	  			var location=document.getElementById("location");
        	  			var dob=document.getElementById("dob");
        	  			var handle=document.getElementById("handle");
        	  			fname.placeholder=data[0].FIRST_NAME;
        	  			lname.placeholder=data[0].LAST_NAME;
        	  			location.placeholder=data[0].LOCATION;
        	  			dob.placeholder=data[0].DOB;
        	  			handle.placeholder=data[0].HANDLE;
        	  			}).error(function(error) {
        	  				$scope.unexpected_error = false;
        	  				$scope.invalid_login = true;
        	  			});
        	  		}; 
          $scope.updateName=function(){
        	  console.log("Edit profile page");
        	  	         $http({
	         url: '/editProfile', 
	         method: 'POST', 
	         data: { "newname": $scope.newname,
	        	     "lname": $scope.lname,
	        	     "location": $scope.location,
	        	     "handle": $scope.handle,
	        	     "dob": $scope.dob}
        	  	       }).success(function(data) {
        	  				//checking the response data for statusCode
        	  				if (data.statusCode == 401) {
        	  					console.log("Error Occured Profile Page");
        	  				}
        	  				else
        	  					//Making a get call to the '/redirectToHomepage' API
        	  				console.log("New Name: " + $scope.newname);	
        	  					window.location.assign("/"); 
        	  			}).error(function(error) {
        	  				$scope.unexpected_error = false;
        	  				$scope.invalid_login = true;
        	  			});
        	  		};
         });