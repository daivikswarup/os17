// if(typeof web3 === 'undefined')
window.app = window.app || {}
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'));
Meteor.startup(function () {
	console.log('initializing accounts');
  	EthAccounts.init()
  	// $(window).resize(function() {
   //  $('#map').css('height', window.innerHeight - 82 - 45);
   //  console.log(window.innerHeight - 82 - 45);
  //});
  // $(window).resize();
});
Modal.allowMultiple = true
address = '0xa118b27fd55daa0fc4b6aeb1901d0946163012c6';
abi = [{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"delete_image","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"location","type":"string"},{"name":"hash","type":"string"}],"name":"get_location_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"topics","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getPlaces","outputs":[{"name":"arr","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfshash","type":"string"}],"name":"like","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"topic","type":"string"},{"name":"hash","type":"string"}],"name":"get_topic_next","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"duetome","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"get_user_next","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"get_user_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"location","type":"string"},{"name":"hash","type":"string"}],"name":"get_location_next","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumPlaces","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"topic","type":"string"},{"name":"hash","type":"string"}],"name":"get_topic_prev","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfshash","type":"string"},{"name":"location","type":"string"},{"name":"topic","type":"string"}],"name":"upload","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"get_metadata","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumTopics","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getTopics","outputs":[{"name":"arr","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"places","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"}]
import ipfs from 'ipfs-js'
window.ipfs = ipfs
ipfs.setProvider()
// if (Meteor.isClient) {
// 	L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
// 	var map = L.map('map');
//     L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
// }