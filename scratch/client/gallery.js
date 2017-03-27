Template.gallery.events({
    'submit form': function(e,tmpl){
                    e.preventDefault();
                    //address = "0x790311f15df00207c3f32d3586e73790db613167";
                    contract = web3.eth.contract(abi).at(address);
                    value = e.target.sendEther.value;
                    transaction = {
                            gas: 500000,
                            from: app.getDefaultAddress(),
                            value: value
                            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
                        };
                    try{
                            Session.set('sending',true);
                            contract.like(Session.get('hash'),transaction,function(err){
                                    Session.set('sending',false);
                                    if(err) throw err;
                            });
                            e.target.sendEther.value = 0;
                    }
                    catch(e){
                        alert('Insufficient funds / Locked Account');
                        $('.fa-window-close').click();
                        Modal.show('navbarModal');
                    }
                    //FlowRouter.redirect('/');
    },
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