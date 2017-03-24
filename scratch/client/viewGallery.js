var imageCollection=[];
var num=5;

Template.viewGallery.helpers({
    url: function () {
        return 'http://localhost:8080/ipfs/' + Session.get('hash');
    },
    images: function(){
         return imageCollection.find();
    }
    topic: function () {
        return Session.get('View-topic');
    },
    earned: function() {
        return Session.get('EtherEarned');
    },
    location: function () {
        return Session.get('View-location');
    },
    isLocation: function(){
        console.log(Session.get('viewType') == 'location');
        return (Session.get('viewType') == 'location');
    },
    isUser: function(){
        console.log(Session.get('viewType') == 'user');
        return (Session.get('viewType') == 'user');
    }
});

Template.viewGallery.onCreated(function(e){
    imageCollection=[];
    if(Session.get('viewType') == 'user'){
      for(var i=0;i<num;i++){
          transaction = {
              gas: 500000,
              from: app.getDefaultAddress()
            };
          contract = web3.eth.contract(abi).at(address);
          contract.get_user_next(Session.get('hash'),transaction,function(err,new_hash){
            if(err) throw err;
              console.log(new_hash);
            if(new_hash!=""){
              Session.set('hash',new_hash);
              imageCollection.push(Session.get('hash'));
            }
            else
              console.log('End of list');
          });
      }
    }
    else if(Session.get('viewType') == 'location'){
      for(var i=0;i<num;i++){
          transaction = {
              gas: 500000,
              from: app.getDefaultAddress()
            };
          contract = web3.eth.contract(abi).at(address);
          contract.get_topic_next(Session.get('hash'),transaction,function(err,new_hash){
            if(err) throw err;
              console.log(new_hash);
            if(new_hash!=""){
              Session.set('hash',new_hash);
              imageCollection.push(Session.get('hash'));
            }
            else
              console.log('End of list');
          });
      }
    }
    else{
      for(var i=0;i<num;i++){
          transaction = {
              gas: 500000,
              from: app.getDefaultAddress()
            };
          contract = web3.eth.contract(abi).at(address);
          contract.get_location_next(Session.get('hash'),transaction,function(err,new_hash){
            if(err) throw err;
              console.log(new_hash);
            if(new_hash!=""){
              Session.set('hash',new_hash);
              imageCollection.push(Session.get('hash'));
            }
            else
              console.log('End of list');
          });
      }
    }
});

Template.viewGallery.events({
    'click .next_user': function(e){
      e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
        };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
	contract = web3.eth.contract(abi).at(address);

    	contract.get_user_next(imageCollection[imageCollection.length-1],transaction,function(err,new_hash){
    	    if(err) throw err;
    	    console.log(new_hash);
    	    if(new_hash!=""){
    		      Session.set('hash',new_hash);
              imageCollection.shift();
              imageCollection.push(new_hash);
    	    }
    	    else
    		console.log('End of list');
    	});
    },
    'click .prev_user': function(e){
        e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
        };
    		contract = web3.eth.contract(abi).at(address);
	      console.log('hehrre');
	      console.log(Session.get('hash'));
    	contract.get_user_prev(imageCollection[0],transaction,function(err,new_hash){
    	    if(err) throw err;
    	    console.log(new_hash);
    	    if(new_hash!=""){
            Session.set('hash',new_hash);
            imageCollection.pop();
            imageCollection.unshift(new_hash);
    	    }
    	    else
    		console.log('End of list');
    	});
        // code goes here
    },
    'click .next_topic': function(e){
        e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
        };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
	contract = web3.eth.contract(abi).at(address);

    	contract.get_topic_next('',imageCollection[imageCollection.length-1],transaction,function(err,new_hash){
    	    if(err) throw err;
    	     console.log(new_hash);
    	    if(new_hash!=""){
    		      Session.set('hash',new_hash);
              imageCollection.shift();
              imageCollection.push(new_hash);
    	    }
    	    else
    		console.log('End of list');

    	});
    },
    'click .prev_topic': function(e){
        e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
        };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
	contract = web3.eth.contract(abi).at(address);
	console.log('hehrre');
    	contract.get_topic_prev('',imageCollection[0],transaction,function(err,new_hash){
    	    if(err) throw err;
    	    console.log(new_hash);
    	    if(new_hash!=""){
            Session.set('hash',new_hash);
            imageCollection.pop();
            imageCollection.unshift(new_hash);
    	    }
    	    else
    		console.log('End of list');

    	});
        // code goes here
    },
    'click .next_loc': function(e){
        e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
        };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
	contract = web3.eth.contract(abi).at(address);

    	contract.get_location_next('',imageCollection[imageCollection.length-1],transaction,function(err,new_hash){
    	    if(err) throw err;
    	    console.log(new_hash);
    	    if(new_hash!=""){
            Session.set('hash',new_hash);
            imageCollection.shift();
            imageCollection.push(new_hash);
    	    }
    	    else
    		console.log('End of list');

    	});
    },
    'click .prev_loc': function(e){
        e.preventDefault();
    	transaction = {
            gas: 500000,
            from: app.getDefaultAddress()
            //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
        };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
	contract = web3.eth.contract(abi).at(address);
	console.log('hehrre');
    	contract.get_location_prev('',imageCollection[0],transaction,function(err,new_hash){
    	    if(err) throw err;
    	    console.log(new_hash);
    	    if(new_hash!=""){
            Session.set('hash',new_hash);
            imageCollection.pop();
            imageCollection.unshift(new_hash);
    	    }
    	    else
    		console.log('End of list');

    	});
        // code goes here
    },
    'click .close': function(e){
        e.preventDefault();
        Modal.hide();
    }
});
