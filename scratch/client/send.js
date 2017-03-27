
Template.send.events({
    'submit form': function(e,tmpl){
                        e.preventDefault();
                        //address = "0x790311f15df00207c3f32d3586e73790db613167";
                        contract = web3.eth.contract(abi).at(address);
                        value = web3.toWei(e.target.sendEther.value,'ether');
                        transaction = {
                                gas: 500000,
                                from: app.getDefaultAddress(),
                                value: value
                                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
                            };
                        Session.set('sending',true);
                        contract.like(Session.get('hash'),transaction,function(err){
                                Session.set('sending',false);
                                if(err){
                                    alert('Insufficient funds / Locked Account');
                                    $('.fa-window-close').click();
                                    Session.set('sending',false);
                                    Modal.show('navbarModal');
                                }
                        });
                        console.log(value);
                        e.target.sendEther.value = 0;
                        //FlowRouter.redirect('/');
        },
        'click .valueButton':function(e){
            console.log(document.getElementById('sendEther').value);
            document.getElementById('sendEther').value = Number(document.getElementById('sendEther').value) + Number(e.target.value);
        }
});

Template.send.helpers({
    denom:function(){
        return [1,10,100,1000];
    },
    value:function(){
        return this;
    }
})