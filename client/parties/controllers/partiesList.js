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

angular.module('socially')
	.controller('PartiesListCtrl',['$meteor',PartiesListCtrl])