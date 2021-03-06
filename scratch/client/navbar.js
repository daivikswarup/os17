// get ether earned by user
fetchdues = function(){
    transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
      //address = "0x790311f15df00207c3f32d3586e73790db613167";
    contract = web3.eth.contract(abi).at(address);

      contract.duetome(Session.get('hash'),transaction,function(err,result){
          if(err) throw err;
          console.log(result);
          console.log('here');
                //Session.set('View-user',result[2]);
          Session.set('DueToMe',result.c[0]/10000);
      });
}

Template.navbarModal.onRendered(function () {
  Session.set('unlocking',false);
  this.$('.dropdown-button').dropdown({
    constrain_width: false,
    belowOrigin: true
  });
  fetchdues();
});

Template.navbarModal.helpers({
  accounts: function () {
    return EthAccounts.find()
  },
  balance: function () {
    return web3.fromWei(web3.eth.getBalance(app.getDefaultAddress()).toNumber(), 'ether')
  },
  getAddress: function () {
    return address;
  },
  dues: function(){
    return Session.get('DueToMe');
  },
  dueszero:function(){
    return Session.get('DueToMe') != 0;
  },
  isdefault: function(address){
    return (app.getDefaultAccount().address == this.address);
  },
  claimClicked: function(){
    return Session.get('claimClicked');
  },
  unlocking: function(){
    return Session.get('unlocking');
  }
})

Template.navbarModal.events({
  'click .select-account': function (e) {
    e.preventDefault()
    app.setDefaultAccount(this.address)
    fetchdues();
  },
  'click .closeNavModal': function (e) {
    Modal.hide()
  },
  'click .ClaimEther': function (e) {
        e.preventDefault();
            transaction = {
                      gas: 500000,
                      from: app.getDefaultAddress()
                      //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
                  };
            //address = "0x790311f15df00207c3f32d3586e73790db613167";
          contract = web3.eth.contract(abi).at(address);
          Session.set('claimClicked',true);
          contract.withdraw(transaction,function(err){
              if(err){
                Session.set('claimClicked',false);
                alert('Please login first');
              }
          });
  },
  'submit form': function (e) {
    e.preventDefault();
    password = e.target.password.value;
  	account = app.getDefaultAccount().address;
  	try{
          Session.set('unlocking',true);
          web3.personal.unlockAccount(account, password,function(err){
                  if(err){
                    alert('Incorrect password');
                    Session.set('unlocking',false);
                  }
                  else
                  {
                    Session.set('unlocking',false);
                    Modal.hide();
                  }
          });
        }
      catch(e){
          alert('Incorrect details');
      }
  }
})
