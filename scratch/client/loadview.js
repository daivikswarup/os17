loadlocation = function () {
    Session.set('latestHash',"");
    Session.set('albumImages',[]);
    Session.set('autoSort',false);
    populateAlbumLocation(Session.get('locat_full'),'',10);
    Session.set('viewType','location');
    Modal.show('viewModal');

  };


loadtopic = function () {
    Session.set('latestHash',"");
    Session.set('albumImages',[]);
    Session.set('autoSort',false);
    populateAlbumTopic(Session.get('topic'),'',10);
    Session.set('viewType','topic');
    Modal.show('viewModal');
  };



loadUser = function () {
    Session.set('latestHash',"");
    Session.set('albumImages',[]);
    Session.set('autoSort',false);
    populateAlbumUser('',10);
    Session.set('viewType','user');
    Modal.show('viewModal');

  };


  populateAlbumUser = function(hash,count){
        transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(abi).at(address);
        contract.get_user_prev(hash,transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    //count = count - 1;
                    Session.set('latestHash',new_hash);
                    arr = Session.get('albumImages');
                    var data = contract.get_metadata(new_hash);
                    arr.push({'hash':new_hash,'ether':data[2].c[0],'topic':data[0],'location':data[1]});
                    Session.set('albumImages',arr);
                    if(count > 0)
                    {
                        populateAlbumUser(new_hash,count-1);
                        return;
                    }
                    else{
                        if(Session.get('autoSort') == true)
                            console.log('sorting');
                            Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                    }

                }
                else{
                    if(Session.get('autoSort')){
                        console.log('sorting');
                        Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                    }
                    console.log('End of list');
                }
            });
  };

   populateAlbumLocation = function(location,hash,count){
        transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(abi).at(address);
        contract.get_location_prev(location,hash,transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    //count = count - 1;
                    Session.set('latestHash',new_hash);
                    arr = Session.get('albumImages');
                    var data = contract.get_metadata(new_hash);
                    arr.push({'hash':new_hash,'ether':data[2].c[0],'topic':data[0],'location':data[1]});
                    Session.set('albumImages',arr);
                    if(count > 0)
                    {
                        populateAlbumLocation(location,new_hash,count-1);
                        return;
                    }
                    else{
                        if(Session.get('autoSort')){
                            console.log('sorting');
                            Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                        }
                    }

                }
                else{
                    if(Session.get('autoSort')){
                        console.log('sorting');
                        Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                    }
                    console.log('End of list');
                }
            });
  };


     populateAlbumTopic = function(topic,hash,count){
        transaction = {
                gas: 500000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
        //address = "0x76888bd4ac074939fae8a12ca72a786a6a31fc7a";
        contract = web3.eth.contract(abi).at(address);
        contract.get_topic_prev(topic,hash,transaction,function(err,new_hash){
                if(err) throw err;
                console.log(new_hash);
                if(new_hash!="")
                {
                    //count = count - 1;
                    Session.set('latestHash',new_hash);
                    arr = Session.get('albumImages');
                    var data = contract.get_metadata(new_hash);
                    arr.push({'hash':new_hash,'ether':data[2].c[0],'topic':data[0],'location':data[1]});
                    Session.set('albumImages',arr);
                    if(count > 0)
                    {
                        populateAlbumTopic(topic,new_hash,count-1);
                        return;
                    }
                    else{
                        if(Session.get('autoSort')){
                            console.log('sorting');
                            Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                        }
                    }

                }
                else{
                    if(Session.get('autoSort')){
                        console.log('sorting');
                        Session.set('albumImages',Session.get('albumImages').sort(function(a,b){return(b.ether-a.ether);}));
                    }
                    console.log('End of list');
                }
            });
  };