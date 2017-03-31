Template.gallery.events({
    'click .delete' : function(e){
            contract = web3.eth.contract(abi).at(address);
                    transaction = {
                            gas: 500000,
                            from: app.getDefaultAddress()
                            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
                        };
                    try{
                            contract.delete_image(Session.get('hash'),transaction);
                            $('.fa-window-close').click();
                    }
                    catch(e){
                        alert('Insufficient funds / Locked Account');
                        $('.fa-window-close').click();
                        Modal.show('navbarModal');
                    }
    }
});

Template.gallery.helpers({
    sending:function(){
        return Session.get('sending');
    }
})

Template.gallery.onCreated(function(e){
    Session.set('sending',false);
});