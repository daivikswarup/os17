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
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_metadata(Session.get('hash'),transaction,function(err,result){
    			if(err) throw err;
    			console.log(result);
    			console.log('here');
                Session.set('View-user',result[2]);
                Session.set('View-topic',result[0]);
                Session.set('View-location',result[1]);
    	});

    };


Template.viewModal.helpers({
     url: function () {
        return 'http://localhost:8080/ipfs/' + Session.get('hash'); 
    },
    user: function () {
        return Session.get('View-user');
    },
    topic: function () {
        return Session.get('View-topic');; 
    },
    location: function () {
        return Session.get('View-location'); 
    },

});

Template.viewModal.onCreated(function(e){fetch1();})

Template.viewModal.events({
    'click .next_user': function(e){
        e.preventDefault();
    	transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_user_next(Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
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
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(database.abi).at(address);
		console.log('hehrre');
        console.log(Session.get('hash'));
    	contract.get_user_prev(Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
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
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_topic_next('',Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
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
		contract = web3.eth.contract(database.abi).at(address);
		console.log('hehrre');
    	contract.get_topic_prev('',Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
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
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_location_next('',Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
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
		contract = web3.eth.contract(database.abi).at(address);
		console.log('hehrre');
    	contract.get_location_prev('',Session.get('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				Session.set('hash',new_hash);
                    fetch1();
    			}
    			else
    				console.log('End of list');

    	});
        // code goes here
    },
    'click .upload': function(e){
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
					contract = web3.eth.contract(database.abi).at(address);
					contract.delete_image(Session.get('hash'),transaction);
                    Modal.hide();
    				//FlowRouter.redirect('/');
    }
});