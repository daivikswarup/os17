loadlocation = function () {
    transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        if(Session.get('locat_title') == '')
            return;
        var locat = Session.get('locat_full');
        contract.get_location_prev(locat,'',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    Session.set('viewType','location');
                    Session.set('hash',new_hash);
                    Modal.show('viewModal');
                }
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

  };


loadtopic = function () {
    transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        console.log('hehrre');
        if(Session.get('topic') == '')
            return;
        var topic = Session.get('topic');
        contract.get_topic_prev(topic,'',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    Session.set('viewType','topic');
                    Session.set('hash',new_hash);
                    Modal.show('viewModal');
                }
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

  };



loadUser = function () {
    transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(database.abi).at(address);
        contract.get_user_prev('',transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    Session.set('viewType','user');
                    Session.set('hash',new_hash);
                    Modal.show('viewModal');
                }
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

  };