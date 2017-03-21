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
address = "0x658b679e87aed0063b3bec5139abd6fff3e6197a";
import ipfs from 'ipfs-js'
window.ipfs = ipfs
ipfs.setProvider()
// if (Meteor.isClient) {
// 	L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
// 	var map = L.map('map');
//     L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
// }