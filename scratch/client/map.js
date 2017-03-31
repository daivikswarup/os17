
 
// create marker collection
var Markers = new Meteor.Collection('markers');

Meteor.subscribe('markers');


//Function to be called periodicallyto reset markers and topics
resetMap = function(){
  Session.set('claimClicked',false);
  transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
  markersLayer.clearLayers();
  web3.eth.contract(abi).at(address).getNumPlaces(transaction,function(err,count){
      for(var i =0 ; i<count; i= i + 1) {
          web3.eth.contract(abi).at(address).getPlaces(i,transaction,function(err,data){
              console.log('Adding marker for ' + data);
              var obj = JSON.parse(data);
              var title = obj[2];  //value searched
              var loc = [obj[0],obj[1]];    //position found
              var marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
              var htmlpop = "<strong>"+title+"</strong><br><a onClick=\"loadlocation()\">Browse</a><br><a onClick=\"{Modal.show('uploadModal');}\">Upload</a>"
              marker.bindPopup(htmlpop);
              markersLayer.addLayer(marker);
              marker.on('click', function(e){
                console.log(e)
                console.log('clicked! ',e.target.options.title);
                var locstr = getLatLngString(e.latlng.lat,e.latlng.lng);
                Session.set('locat',locstr);
                Session.set('locat_title',e.target.options.title);
                Session.set('locat_full',getLocatString(e.latlng.lat,e.latlng.lng,e.target.options.title));
          });
      });
    };

    Session.set('AllTopics',[]);
    web3.eth.contract(abi).at(address).getNumTopics(transaction,function(err,count){
      if(err) throw err;
      for(var i =0 ; i<count; i= i + 1) {
          web3.eth.contract(abi).at(address).getTopics(i,transaction,function(err,data){
              console.log('Adding topic for ' + data);
              a = Session.get('AllTopics');
              a.push(data);
              Session.set('AllTopics',a);
              
        });
      };
    });
  });
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


//Initialize map
Template.map.rendered = function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

  map = new L.Map('map').setView([22.316492798844163,87.30646133422853], 14);;  //set center to KGP!

  //Open Street map layer
  map.addLayer(new  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }) );

  //add markers
  markersLayer = new L.LayerGroup();  //layer contain searched elements
  
  map.addLayer(markersLayer);
  map.doubleClickZoom.disable(); 

  var controlSearch = new L.Control.Search({
    position:'topright',    
    layer: markersLayer,
    initial: false,
    zoom: 12,
    marker: false
  });

  map.addControl( controlSearch );

  //add new marker on double click
  map.on('dblclick', function(event) {
    console.log(event.latlng);
    try{
      Session.set('UploadHash','');
      Session.set('topic','');
      Session.set('locat',getLatLngString(event.latlng["lat"],event.latlng["lng"]));
      Session.set('locat_title','');
      Modal.show('uploadModal');
    }
    catch(err){ throw err};
  });

  //geo search
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

  Session.set('AllTopics',[]);


  // From http://odoe.net/blog/custom-leaflet-control/
  // Topic search
  TopicControl = L.Control.extend({
    options: {
      // topright, topleft, bottomleft, bottomright
      position: 'topright',
      placeholder: 'Search Topic...'
    },
    initialize: function (options /*{ data: {...}  }*/) {
      // constructor
      L.Util.setOptions(this, options);
    },
    onAdd: function (map) {
      // happens after added to map
      var container = L.DomUtil.create('div', 'search-container');
      this.form = L.DomUtil.create('form', 'form', container);
      var group = L.DomUtil.create('div', 'form-group', this.form);
      this.input = L.DomUtil.create('input', 'form-control input-sm', group);
      this.input.type = 'text';
      this.input.placeholder = this.options.placeholder;
      this.results = L.DomUtil.create('div', 'list-group', group);
      L.DomEvent.addListener(this.input, 'keyup', _.debounce(this.keyup, 300), this);
      L.DomEvent.addListener(this.form, 'submit', this.submit, this);
      L.DomEvent.disableClickPropagation(container);
      return container;
    },
    onRemove: function (map) {
      // when removed
      L.DomEvent.removeListener(this._input, 'keyup', this.keyup, this);
      L.DomEvent.removeListener(form, 'submit', this.submit, this);
    },
    keyup: function(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // do nothing
      } else {
        this.results.innerHTML = '';
        if (this.input.value.length > 2) {
          var value = this.input.value;
          var results = _.take(_.filter(Session.get('AllTopics'), function(x) {
            return x.toUpperCase().indexOf(value.toUpperCase()) > -1;
          }).sort(), 10);
          _.map(results, function(x) {
            var a = L.DomUtil.create('a', 'list-group-item');
            a.href = '';
            a.setAttribute('data-result-name', x);
            a.innerHTML = x;
            this.results.appendChild(a);
            L.DomEvent.addListener(a, 'click', this.itemSelected, this);
            return a;
          }, this);
        }
      }
    },
    itemSelected: function(e) {
      L.DomEvent.preventDefault(e);
      var elem = e.target;
      var value = elem.innerHTML;
      this.input.value = elem.getAttribute('data-result-name');
      Session.set('topic',elem.getAttribute('data-result-name'));
      console.log(elem.getAttribute('data-result-name'));
      this.results.innerHTML = '';
      loadtopic();
    },
    submit: function(e) {
      L.DomEvent.preventDefault(e);
    }
  });
  map.addControl(new TopicControl());

  // Add buttons to open modals
  resetMap();
  L.easyButton('fa-refresh', function(btn, map){
    console.log('clikkk');
    resetMap();
  }).addTo( map );

  L.easyButton('fa-user-o', function(btn, map){
    console.log('clikkk2');
    Modal.show('navbarModal');
  }).addTo( map );

  L.easyButton('fa-camera', function(btn, map){
    console.log('clikkk2');
    loadUser();
  }).addTo( map );

  L.easyButton('fa-question-circle', function(btn, map){
    console.log('clikkk2');
    Modal.show('aboutModal');
  }).addTo( map );
  // Reload map markers and topics every 120 seconds
  var interval = setInterval(resetMap, 120000);
};