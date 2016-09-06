# angular-apiService
An HTTP Handler to request data resources using promises. Very useful to bind an HTTP resource with an AngularJS data model.

# Installation
Install using bower

    bower install --save angular-apiService

# Usage

Add module to the application

    angular
        .module('MyApp', [
            'apiService'
        ])


Configure the base path for the calls

    .config(function(apiBaseURLProvider) {
        apiBaseURLProvider.setBaseURL('http://localhost');
    }

Acquire data and save it into the model

    apiService.getResource('/resource').then(function(response) {
            $scope.data =  response;
    });
