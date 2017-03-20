// if(typeof web3 === 'undefined')
window.app = window.app || {}
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'));
Meteor.startup(function () {
	console.log('initializing accounts');
  	EthAccounts.init()
  	$(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
    console.log(window.innerHeight - 82 - 45);
  });
  $(window).resize();
})
address = "0x7615e5eb2d4ce7f7169d7387a3484932a116c981";
import ipfs from 'ipfs-js'
window.ipfs = ipfs
ipfs.setProvider()
// if (Meteor.isClient) {
// 	L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
// 	var map = L.map('map');
//     L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
// }
