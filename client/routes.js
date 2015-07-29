function Config($urlRouterProvider,$stateProvider,$locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('parties',{
			url: '/parties',
			templateUrl: 'client/parties/views/parties-list.ng.html',
			controller: 'PartiesListCtrl as parties'
		})
		.state('partyDetails',{
			url: '/parties/:partyId',
			templateUrl: 'client/parties/views/party-details.ng.html',
			controller: 'PartyDetailsCtrl as partyDetails'
		});
		$urlRouterProvider.otherwise('/parties');
}

angular.module('socially')
	.config(['$urlRouterProvider','$stateProvider','$locationProvider',Config])