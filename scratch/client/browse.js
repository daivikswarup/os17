Template.browse.events({
  'click .go-locat': function (e) {
    e.preventDefault();
    transaction = {
                gas: 500000,
                from: web3.eth.accounts[0]
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        console.log('hehrre');
        contract = web3.eth.contract(database.abi).at(address);
        locat = document.getElementById('browse-locat').value;
        contract.get_location_prev(locat,'',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                    Session.set('hash',new_hash);
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
  'click .go-topic': function (e) {
    e.preventDefault();
    transaction = {
                gas: 500000,
                from: web3.eth.accounts[0]
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        topic = document.getElementById('browse-topic').value;
        contract.get_topic_prev(topic,'',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                    Session.set('hash',new_hash);
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
  'click .go-user': function (e) {
    e.preventDefault();
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
                    Session.set('hash',new_hash);
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
});


Template.browse.helpers({
        locat: function(){
                return Session.get('locat');
        },
        locat_title: function(){
                return Session.get('locat_title');
        },
        locat_full: function(){
                return Session.get('locat_full');
        }
});