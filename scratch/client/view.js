// Template.view.onCreated(function() {
//     console.log(Session.get('hash'));
//     url = 
// });


fetch1 = function () {

        transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(abi).at(address);

    	contract.get_metadata(Session.get('hash'),transaction,function(err,result){
    			if(err) throw err;
    			console.log(result);
    			console.log('here');
                //Session.set('View-user',result[2]);
                Session.set('View-topic',result[0]);
                Session.set('View-location',result[1]);
                Session.set('EtherEarned',result[2].c[0]);
    	});

    };


Template.viewModal.helpers({
    getHash: function () {
        return this.hash;
    },
    getTopic: function () {
        return this.topic;
    },
    getEther: function() {
        return this.ether;
    },
    getLocat: function () {
        return this.location; 
    },
    isLocation: function(){
        console.log(Session.get('viewType') == 'location');
        return (Session.get('viewType') == 'location');
    },
    isUser: function(){
        console.log(Session.get('viewType') == 'user');
        return (Session.get('viewType') == 'user');
    },
    getURL:function(){
        return 'http://localhost:8080/ipfs/' + this.hash;
    },
    images:function(){
        return Session.get('albumImages');
    }

});

// Template.viewModal.onCreated(function(e){
//     //fetch1();
//         document.getElementById('links').onclick = 
// })

Template.viewModal.events({
    'click .load_loc': function(e){
        e.preventDefault();
        arr = Session.get('albumImages');
        populateAlbumLocatiob(arr[arr.length-1].hash,Session.get('locat_string'),10);
    },
    'click .load_topic': function(e){
        e.preventDefault();
        arr = Session.get('albumImages');
        populateAlbumTopic(arr[arr.length-1].hash,Session.get('topic'),10);
    },
    'click .load_user': function(e){
        e.preventDefault();
        arr = Session.get('albumImages');
        populateAlbumUser(arr[arr.length-1].hash,10);
    },
    'click .close': function(e){
                    e.preventDefault();
                    Modal.hide();
    				//FlowRouter.redirect('/');
    },
    'click .delete': function(e){
                    e.preventDefault();
    				transaction = {
			                gas: 500000,
			                from: app.getDefaultAddress()
			                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
			            };
			    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
					contract = web3.eth.contract(abi).at(address);
					try{
                        contract.delete_image(Session.get('hash'),transaction);
                        Modal.hide();
                        $('.closemodal').click();
                    }
                    catch(e){
                        console.log(e)
                        alert('Unlock required');
                        Modal.show('navbarModal');
                    }
    				//FlowRouter.redirect('/');
    },
    'click #links' : function (event) {
        event = event || window.event;
        console.log(event);
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: event,
                onslide: function (index, slide) {
                    self = this;
                    var initializeAdditional = function (index, data, klass, self) {
                      var text = self.list[index].getAttribute(data),
                        node = self.container.find(klass);
                        console.log(node);
                      node.empty();
                      if (text) {
                        console.log(text);
                        node[0].innerHTML=text;
                      }
                    };
                    Session.set('hash',self.list[index].getAttribute('hash'));
                    initializeAdditional(index, 'topic', '.topic', self);
                    initializeAdditional(index, 'location', '.location', self);
                    initializeAdditional(index, 'etherEarned', '.etherEarned', self);
                  }
                },
            links = document.getElementsByClassName('galleryImage');
        blueimp.Gallery(links, options);
    },
});

