Template.imagepicker.events({
    'change #filepicker':function(e){
        var files = e.target.files;
        var file = files[0];
        reader = new FileReader();
        reader.onload = function(){
                data = new Buffer( reader.result );
                console.log(data);
                ipfs.add(data, function(err,hash){
                    if(err){
                        console.log("that error"); 
                        TemplateVar.set(tmpl,'uploading',false); 
                        throw err;}
                    console.log(hash);
                    Session.set('UploadHash',hash);
                });
              };
        reader.readAsArrayBuffer(file);

    },
    'click .camera':function(e){
        MeteorCamera.getPicture(function(err,data){
            if(err) throw err;
            // declare a regexp to match the non base64 first characters
            var dataUrlRegExp = /^data:image\/\w+;base64,/;
            // remove the "header" of the data URL via the regexp
            var base64Data = data.replace(dataUrlRegExp, "");
            // declare a binary buffer to hold decoded base64 data
            var imageBuffer = new Buffer(base64Data, "base64");
            ipfs.add(imageBuffer, function(err,hash){
                    if(err){
                        console.log("that error"); 
                        TemplateVar.set(tmpl,'uploading',false); 
                        throw err;}
                    console.log(hash);
                    Session.set('UploadHash',hash);
                });
        });

    }
});


