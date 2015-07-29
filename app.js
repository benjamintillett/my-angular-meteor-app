Parties = new Mongo.Collection("parties");

if (Meteor.isClient){


	function PartiesListCtrl($meteor){
		var self = this;

		self.parties = $meteor.collection(Parties);

		self.remove = function(party){
			self.parties.remove(party);
		}
		self.removeAll = function(){
			self.parties.remove();
		}
	}

	function PartyDetailsCtrl($stateParams,$meteor){
		var self = this;
		self.party = $meteor.object(Parties,$stateParams.partyId,false);

		self.save = function() {
			self.party.save().then(function(numberOfDocs){
				console.log('save success doc affexted', numberOfDocs);
			}, function(error){
				console.log('save error',error);
			})		
		}
		
		self.reset = function() {
			self.party.reset();
		}

	}



	function Config($urlRouterProvider,$stateProvider,$locationProvider){
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('parties',{
				url: '/parties',
				templateUrl: 'parties-list.ng.html',
				controller: 'PartiesListCtrl as parties'
			})
			.state('partyDetails',{
				url: '/parties/:partyId',
				templateUrl: 'party-details.ng.html',
				controller: 'PartyDetailsCtrl as partyDetails'
			});
			$urlRouterProvider.otherwise('/parties');

	}


	angular.module('socially',['angular-meteor','ui.router'])
		.config(['$urlRouterProvider','$stateProvider','$locationProvider',Config])
		.controller('PartiesListCtrl',PartiesListCtrl)
		.controller('PartyDetailsCtrl',['$stateParams','$meteor',PartyDetailsCtrl]);
}


if (Meteor.isServer){
	Meteor.startup(function(){
		if (Parties.find().count() === 0){
			var parties = [
				{'name': 'Dubstep-Free Zone',
				  'description': 'Can we please just for an evening not listen to dubstep.'},
				{'name': 'All dubstep all the time',
				  'description': 'Get it on!'},
				{'name': 'Savage lounging',
				  'description': 'Leisure suit required. And only fiercest manners.'}
			];
			for (var i = 0; i < parties.length; i++)
				Parties.insert(parties[i]);
		};
	})
}