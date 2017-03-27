Template.uploadModal.events({
  'submit form': function (e, tmpl) {
    // address = "0x790311f15df00207c3f32d3586e73790db613167";
    e.preventDefault();
    TemplateVar.set('uploading', true);
    transaction = {
                gas: 2000000,
                from: app.getDefaultAddress()
                //from: "0x6e53e0a1f2373ba4b7d9d8fd4aeba07174830611"
            };
    contract = web3.eth.contract(abi).at(address);
    image = e.target.image.value;
    if(image.length != 46){
        console.log(image.length);
        alert('Invalid hash');
        TemplateVar.set('uploading', false);
        return;
    }
    topic = e.target.topic.value;
    locat = e.target.locat.value;
    locat_title = e.target.locat_title.value;
    console.log(image);
    console.log(topic);
    console.log(locat);
    console.log(locat_title);
    var complete_location = combineLocStr(locat,locat_title);
    contract.upload(image,complete_location,topic,transaction,function(err,data){
            if(err){ 
                    TemplateVar.set(tmpl,'uploading', false);
                    TemplateVar.set(tmpl,'error',true);
                    console.log("this error");
                    throw err;}
            console.log(data);
            TemplateVar.set(tmpl,'error',false);
            TemplateVar.set(tmpl,'uploading', false)
            Modal.hide();
            $('.closemodal').click();
            console.log('finished');
            // FlowRouter.redirect('/view/'+hash[0].hash)
    });
    
    // fs.readFile(image, function(err, data) {  
    //         if (err) throw err;
    //         console.log(data);
    //         hash = ipfs.add(data);
    //         console.log(hash);
    //         web3.eth.contracts(database.abi).at(address).upload(hash,location,topic,transaction);
    //     });

  },
  'click .imagepickerbutton':function(e){
        console.log('here');
        Modal.show('imagepicker');
  },
  'click .EnterPassword' : function(e){
        console.log('navigating to user panel');
        TemplateVar.set("error",false);
        Modal.show('navbarModal');
  }
});

Template.uploadModal.helpers({
        locat: function(){
                return Session.get('locat');
        },
        locat_title: function(){
                return Session.get('locat_title');
        },
        topic: function(){
                return Session.get('topic');
        },
        UploadHash: function(){
            return Session.get('UploadHash');
        }

});

Template.uploadModal.onCreated(function(e){
    Session.set('UploadHash',"");
})