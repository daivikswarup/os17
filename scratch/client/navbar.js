Template.navbarModal.onRendered(function () {
  this.$('.dropdown-button').dropdown({
    constrain_width: false,
    belowOrigin: true
  })
})

Template.navbarModal.helpers({
  accounts: function () {
    return EthAccounts.find()
  },
  balance: function () {
    return web3.fromWei(web3.eth.getBalance(app.getDefaultAddress()).toNumber(), 'ether')
  }
})

Template.navbarModal.events({
  'click .select-account': function (e) {
    e.preventDefault()
    app.setDefaultAccount(this.address)
  },
  'click .closeNavModal': function (e) {
    Modal.hide()
  }
})