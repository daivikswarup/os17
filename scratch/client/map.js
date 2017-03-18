// on startup run resizing event
Meteor.startup(function() {
  $(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
    console.log(window.innerHeight - 82 - 45);
  });
  $(window).resize(); // trigger resize event 
});
 
// create marker collection
var Markers = new Meteor.Collection('markers');

Meteor.subscribe('markers');

Template.map.rendered = function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

  map.on('dblclick', function(event) {
    document.getElementById('locat_from_map').value= JSON.stringify(event.latlng);
    console.log(event.latlng);
    // Markers. = [{latlng: event.latlng}];
  });

  // add clustermarkers
  var markers = L.markerClusterGroup();
  map.addLayer(markers);

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