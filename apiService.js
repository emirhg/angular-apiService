'use strict';

/**
 * @ngdoc overview
 * @name apiService
 * @description
 * # apiService
 *
 * A module to handle API conenctivity.
 */
angular.module('apiService', [])
/**
 * @ngdoc provider
 * @name apiService.apiBaseURL
 * @description
 * # apiBaseURL
 * API configuration.
 */
  .provider('apiBaseURL', function apiBaseURLProvider() {
      var apiBaseURL = '';

      this.setBaseURL = function(value) {
        apiBaseURL = value;
      };

      this.$get = function apiFactory() {
        return apiBaseURL;
      };
    })
/**
 * @ngdoc service
 * @name apiService.apiService
 * @description
 * # apiService
 * API Utilities
 */
  .service('apiService', ['$q', '$http', 'apiBaseURL', function ($q, $http, apiBaseURL) {
  	var data = {};    
    var getResource = function(resourceURI) {
            resourceURI = apiBaseURL + resourceURI;
            var deferred = $q.defer();

            if (typeof data[resourceURI] !== 'undefined' && data[resourceURI] !== null){
                deferred.resolve(data[resourceURI]);
            }else{
                $http({
                        method: 'GET',
                        url: resourceURI,
                    })
                    .success(function(response) {
                        data[resourceURI] = response;
                        return deferred.resolve(response);
                    })
                    .error(function(response) {
                        console.error('An error occurred while downloading the resource at '+ resourceURI);
                        deferred.reject(response);
                    });
            }

            return deferred.promise;
        };
    return {
    	getResource:getResource
    }
  }]);
