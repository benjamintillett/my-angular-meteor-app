function PartyDetailsCtrl($stateParams,$meteor){
	var self = this;

	self.party = $meteor.object(Parties,$stateParams.partyId).subscribe('parties');
	self.users = $meteor.collection(Meteor.users,false).subscribe('users');

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

angular.module('socially')
	.controller('PartyDetailsCtrl',['$stateParams','$meteor',PartyDetailsCtrl]);
