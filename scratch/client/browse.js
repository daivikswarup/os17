Template.browse.events({
  'submit form .locat': function (e, tmpl) {
    transaction = {
                gas: 500000,
                from: web3.eth.accounts[0]
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        locat = e.target.locat.value;
        contract.get_location_prev('',locat,transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                    FlowRouter.redirect('/view/'+new_hash);
                else
                    console.log('End of list');
            });
    
    // fs.readFile(image, function(err, data) {  
    //         if (err) throw err;
    //         console.log(data);
    //         hash = ipfs.add(data);
    //         console.log(hash);
    //         web3.eth.contracts(database.abi).at(address).upload(hash,location,topic,transaction);
    //     });

  },
  'submit form .topic': function (e, tmpl) {
    transaction = {
                gas: 500000,
                from: web3.eth.accounts[0]
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        topic = e.target.topic.value;
        contract.get_topic_prev('',topic,transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                    FlowRouter.redirect('/view/'+new_hash);
                else
                    console.log('End of list');
            });
    
    // fs.readFile(image, function(err, data) {  
    //         if (err) throw err;
    //         console.log(data);
    //         hash = ipfs.add(data);
    //         console.log(hash);
    //         web3.eth.contracts(database.abi).at(address).upload(hash,location,topic,transaction);
    //     });

  },
  'submit form .user': function (e, tmpl) {
    transaction = {
                gas: 500000,
                from: web3.eth.accounts[0]
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        contract.get_user_prev('',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                    FlowRouter.redirect('/view/'+new_hash);
                else
                    console.log('End of list');
            });
    
    // fs.readFile(image, function(err, data) {  
    //         if (err) throw err;
    //         console.log(data);
    //         hash = ipfs.add(data);
    //         console.log(hash);
    //         web3.eth.contracts(database.abi).at(address).upload(hash,location,topic,transaction);
    //     });

  }
})
