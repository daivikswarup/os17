// on startup run resizing event
// Meteor.startup(function() {
//   $(window).resize(function() {
//     console.log('resizing');
//     $('#map').css('height', window.innerHeight - 82 - 45);
//     console.log(window.innerHeight - 82 - 45);
//   });

//   $(window).resize(); // trigger resize event 
// });
 
// create marker collection
var Markers = new Meteor.Collection('markers');

Meteor.subscribe('markers');

resetMap = function(){
        ////////////populate map with markers from sample data
  markersLayer.clearLayers();
  //   var data = [
  //   {"loc":[41.575330,13.102411], "title":"aquamarine"},
  //   {"loc":[41.575730,13.002411], "title":"black"},
  //   {"loc":[41.807149,13.162994], "title":"blue"},
  //   {"loc":[41.507149,13.172994], "title":"chocolate"},
  //   {"loc":[41.847149,14.132994], "title":"coral"},
  //   {"loc":[41.219190,13.062145], "title":"cyan"},
  //   {"loc":[41.344190,13.242145], "title":"darkblue"},  
  //   {"loc":[41.679190,13.122145], "title":"Darkred"},
  //   {"loc":[41.329190,13.192145], "title":"Darkgray"},
  //   {"loc":[41.379290,13.122545], "title":"dodgerblue"},
  //   {"loc":[41.409190,13.362145], "title":"gray"},
  //   {"loc":[41.794008,12.583884], "title":"green"}, 
  //   {"loc":[41.805008,12.982884], "title":"greenyellow"},
  //   {"loc":[41.536175,13.273590], "title":"red"},
  //   {"loc":[41.516175,13.373590], "title":"rosybrown"},
  //   {"loc":[41.506175,13.273590], "title":"royalblue"},
  //   {"loc":[41.836175,13.673590], "title":"salmon"},
  //   {"loc":[41.796175,13.570590], "title":"seagreen"},
  //   {"loc":[41.436175,13.573590], "title":"seashell"},
  //   {"loc":[41.336175,13.973590], "title":"silver"},
  //   {"loc":[41.236175,13.273590], "title":"skyblue"},
  //   {"loc":[41.546175,13.473590], "title":"yellow"},
  //   {"loc":[41.239190,13.032145], "title":"white"}
  // ];
  var length = web3.eth.contract(database.abi).at(address).getNumPlaces.call();
  for(var i =0 ; i<length; i= i + 1) {
    var data = web3.eth.contract(database.abi).at(address).getPlaces.call(i);
    console.log('Adding marker for ' + data);
    var obj = JSON.parse(data);
    var title = obj[2];  //value searched
    var loc = [obj[0],obj[1]];    //position found
    var marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
    var htmlpop = "<strong>"+title+"</strong><br><a onClick=\"loadlocation()\">Browse</a><br><a onClick=\"Modal.show('uploadModal')\">Upload</a>"
    marker.bindPopup(htmlpop);
    markersLayer.addLayer(marker);
    marker.on('click', function(e){
      console.log(e)
      console.log('clicked! ',e.target.options.title);
      var locstr = getLatLngString(e.latlng.lat,e.latlng.lng);
      Session.set('locat',locstr);
      Session.set('locat_title',e.target.options.title);
      Session.set('locat_full',getLocatString(e.latlng.lat,e.latlng.lng,e.target.options.title));
      //Modal.show('uploadModal');
      // try{
      //   document.getElementById('locat_from_map').value= locstr;
      //   document.getElementById('locat_title_from_map').value= e.target.options.title;
      // }
      // catch(err){};
      // try{
      //   // jugaaad. lol.
      //   document.getElementById('browse-locat').value= getLocatString(e.latlng.lat,e.latlng.lng,e.target.options.title);
      // }
      // catch(err){};

  });
  }


};


// So that we can easily change the format later if required.
combineLocStr = function(str1,title)
{
  return ('['+str1+',\"'+title+'\"]');
}

getLatLngString = function(lat,lng)
{
  return(String(lat) + ',' +String(lng));
}

getLocatString = function(lat,lng,title)
{
  return(combineLocStr(getLatLngString(lat,lng),title));
}


Template.map.rendered = function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

  // var map = L.map('map', {
  //   doubleClickZoom: false
  // }).setView([49.25044, -123.137], 13);

  // L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);



  // // add clustermarkers
  // var markers = L.markerClusterGroup();
  // map.addLayer(markers);

  ///////hererererer



  map = new L.Map('map').setView([22.316492798844163,87.30646133422853], 14);;  //set center to KGP!

  map.addLayer(new  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }) );

  markersLayer = new L.LayerGroup();  //layer contain searched elements
  
  map.addLayer(markersLayer);

  var controlSearch = new L.Control.Search({
    position:'topright',    
    layer: markersLayer,
    initial: false,
    zoom: 12,
    marker: false
  });

  map.addControl( controlSearch );

    map.on('dblclick', function(event) {
    console.log(event.latlng);
    try{
      Session.set('locat',getLatLngString(event.latlng["lat"],event.latlng["lng"]));
      Modal.show('uploadModal');
      //document.getElementById('locat_from_map').value= getLatLngString(event.latlng["lat"],event.latlng["lng"]);
    }
    catch(err){ throw err};
    try{
      // document.getElementById('browse-locat').value= String(event.latlng["lat"] + ',' + event.latlng["lng"]);
    }
    catch(err){};
    // Markers. = [{latlng: event.latlng}];
  });
  map.addControl( new L.Control.Search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    marker: false,
    autoCollapse: true,
    autoType: false,
    minLength: 2
  }) );

  resetMap();
  L.easyButton('fa-refresh', function(btn, map){
    console.log('clikkk');
    resetMap();
  }).addTo( map );

  L.easyButton('fa-id-card', function(btn, map){
    console.log('clikkk2');
    Modal.show('navbarModal');
  }).addTo( map );
  // sidebar = L.control.sidebar('sidebar').addTo(map);
  // var query = Markers.find();
  // query.observe({
  //   added: function (document) {
  //     var marker = L.marker(document.latlng).addTo(map)
  //       .on('click', function(event) {
  //         map.removeLayer(marker);
  //         Markers.remove({_id: document._id});
  //       });
  //      markers.addLayer(marker);
  //   },
  //   removed: function (oldDocument) {
  //     layers = map._layers;
  //     var key, val;
  //     for (key in layers) {
  //       val = layers[key];
  //       if (val._latlng) {
  //         if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
  //           map.removeLayer(val);
  //         }
  //       }
  //     }
  //   }
  // });
};