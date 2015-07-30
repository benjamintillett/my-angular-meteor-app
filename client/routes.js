function Config($urlRouterProvider,$stateProvider,$locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('parties',{
			url: '/parties',
			templateUrl: 'client/parties/views/parties-list.ng.html',
			controller: 'PartiesListCtrl as parties',
			resolve: {
				'subscribe': [
					'$meteor',function($meteor){
						return $meteor.subscribe('parties');
					}
				]
			}
		})
		.state('partyDetails',{
			url: '/parties/:partyId',
			templateUrl: 'client/parties/views/party-details.ng.html',
			controller: 'PartyDetailsCtrl as partyDetails',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
					return $meteor.requireUser();
				}]
			}
		});
		$urlRouterProvider.otherwise('/parties');
}


function StateChangeErrorHandler($rootScope,$state){
	$rootScope.$on("$stateChangeError",function(event,toState,toParams,fromState,fromParams,error){
		if (error === "AUTH_REQUIRED") {
			console.log(error);
			$state.go('parties');
		}
	})
}



angular.module('socially')
	.config(['$urlRouterProvider','$stateProvider','$locationProvider',Config])
	.run(["$rootScope","$state",StateChangeErrorHandler]);