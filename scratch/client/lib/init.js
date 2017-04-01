
window.app = window.app || {}

//Initialize web3 provider
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'));
Meteor.startup(function () {
	console.log('initializing accounts');
  	EthAccounts.init();
  	try{
  		web3.eth.defaultAccount = web3.eth.accounts[0]
  	}
  	catch(e){
  		alert('please create an account');
  		console.log(e);
  	}
});

//Allow multiple popups
Modal.allowMultiple = true

//Address of database contract
address = '0xf53ecfea966c81a726275c36495d33a160caa759';
abi = [{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"delete_image","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"location","type":"string"},{"name":"hash","type":"string"}],"name":"get_location_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getPlaces","outputs":[{"name":"arr","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfshash","type":"string"}],"name":"like","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"ownerWithdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"duetome","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"get_user_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumPlaces","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"topic","type":"string"},{"name":"hash","type":"string"}],"name":"get_topic_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfshash","type":"string"},{"name":"location","type":"string"},{"name":"topic","type":"string"}],"name":"upload","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"get_metadata","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumTopics","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getTopics","outputs":[{"name":"arr","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]


//Initialize ipfs provider
import ipfs from 'ipfs-js'
window.ipfs = ipfs
ipfs.setProvider({host:'localhost',port:'5001'});