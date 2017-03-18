// Template.view.onCreated(function() {
//     console.log(FlowRouter.getParam('hash'));
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

    	contract.get_metadata(FlowRouter.getParam('hash'),transaction,function(err,result){
    			if(err) throw err;
    			console.log(result);
    			console.log('here');
    			newalt = "User: "+result[2] + "\nTopic:" + result[0] + "\nLocation:"+result[1];
    			document.getElementById('description').innerHTML = newalt;
    	});

    };


Template.view.helpers({
     url: function () {
        fetch1();
        return 'http://localhost:8080/ipfs/' + FlowRouter.getParam('hash');
        

    }
});

//Template.view.onCreated(function(e){fetch1();})

Template.view.events({
    'click .next_user': function(e){
        e.preventDefault();
    	transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_user_next(FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
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
        console.log(FlowRouter.getParam('hash'));
    	contract.get_user_prev(FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
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

    	contract.get_topic_next('',FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
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
    	contract.get_topic_prev('',FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
    			}
    			else
    				console.log('End of list');

    	});
        // code goes here
    },
    'click .next_location': function(e){
        e.preventDefault();
    	transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(database.abi).at(address);

    	contract.get_location_next('',FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
    			}
    			else
    				console.log('End of list');

    	});
    },
    'click .prev_location': function(e){
        e.preventDefault();
    	transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    	//address = "0x790311f15df00207c3f32d3586e73790db613167";
		contract = web3.eth.contract(database.abi).at(address);
		console.log('hehrre');
    	contract.get_location_prev('',FlowRouter.getParam('hash'),transaction,function(err,new_hash){
    			if(err) throw err;
    			console.log(new_hash);
    			if(new_hash!=""){
    				FlowRouter.redirect('/view/'+new_hash);
    			}
    			else
    				console.log('End of list');

    	});
        // code goes here
    },
    'click .upload': function(e){
                    e.preventDefault();
    				FlowRouter.redirect('/');
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
					contract.delete_image(FlowRouter.getParam('hash'),transaction);
    				FlowRouter.redirect('/');
    }
});