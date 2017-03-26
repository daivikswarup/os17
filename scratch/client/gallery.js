Template.gallery.events({
    'submit form': function(e,tmpl){
                    e.preventDefault();
                    transaction = {
                            gas: 500000,
                            from: app.getDefaultAddress()
                            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
                        };
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
                            contract.like(Session.get('hash'),transaction);
                            e.target.sendEther.value = 0;
                    }
                    catch(e){
                        alert('Insufficient funds / Locked Account');
                        Modal.show('navbarModal');
                    }
                    //FlowRouter.redirect('/');
    }
});