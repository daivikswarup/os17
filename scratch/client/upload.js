Template.upload.events({
  'submit form': function (e, tmpl) {
    // address = "0x790311f15df00207c3f32d3586e73790db613167";
    e.preventDefault();
    TemplateVar.set('uploading', true)
    transaction = {
                gas: 2000000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    contract = web3.eth.contract(database.abi).at(address);
    image = e.target.image.files[0];
    topic = e.target.topic.value;
    locat = e.target.locat.value;
    console.log(image);
    console.log(topic);
    console.log(locat);

    reader = new FileReader();
    reader.onload = function(){
            data = new Buffer( reader.result );
            console.log(data);
            ipfs.add(data, function(err,hash){
                if(err){
                    console.log("that error"); 
                    TemplateVar.set(tmpl,'uploading',true); 
                    throw err;}
                console.log(hash);
                contract.upload(hash,locat,topic,transaction,function(err,data){
                        if(err){ 
                                TemplateVar.set(tmpl,'uploading', false);
                                TemplateVar.set(tmpl,'error',true);
                                console.log("this error");
                                throw err;}
                        console.log(data);
                        TemplateVar.set(tmpl,'error',false);
                        TemplateVar.set(tmpl,'uploading', false)
                        // FlowRouter.redirect('/view/'+hash[0].hash)
                });
            });
          };
    reader.readAsArrayBuffer(image);
    
    // fs.readFile(image, function(err, data) {  
    //         if (err) throw err;
    //         console.log(data);
    //         hash = ipfs.add(data);
    //         console.log(hash);
    //         web3.eth.contracts(database.abi).at(address).upload(hash,location,topic,transaction);
    //     });

  }
})
