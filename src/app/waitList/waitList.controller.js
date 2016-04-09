(function() {
    'use strict';
    
    angular
        .module('app.waitList')
        .controller('WaitListController', WaitListController);
    
    WaitListController.$inject = ['textMessageService', 'partyService'];
    
    function WaitListController(textMessageService, partyService) {
        var vm = this;
        
        vm.newParty = new partyService.Party();
        
        //download the data from a Firebase reference into a pseudo read-only array
        //all server changes are applied in real time
        
        vm.parties = partyService.parties;
        console.log('firebase array', vm.parties);
        
        
        //functions to add and remove parties
        vm.addParty = addParty;
        vm.removeParty = removeParty;
        vm.sendTextMessage = sendTextMessage;
        vm.toggleDone = toggleDone;
        
        function addParty() {
            vm.parties.$add(vm.newParty);
            vm.newParty = new partyService.Party();
        }
        
        function removeParty(party) {
            vm.parties.$remove(party);
        }
        
        function sendTextMessage(party) {
            textMessageService.sendTextMessage(party, vm.parties);
        }
        
        function toggleDone(party) {
            vm.parties.$save(party);
        }    
        
    }
    


})();