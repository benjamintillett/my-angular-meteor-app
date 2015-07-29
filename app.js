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


	angular.module('socially',['angular-meteor'])
		.controller('PartiesListCtrl',PartiesListCtrl);
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