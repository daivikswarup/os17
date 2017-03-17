FlowRouter.route('/', {
    name: 'upload',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "upload"});
    }
});

FlowRouter.route('/view/:hash', {
    name: 'view',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "view",hash: params.hash});
    }
});