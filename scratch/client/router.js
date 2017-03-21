FlowRouter.route('/', {
    name: 'Main',
    action: function(params) {
        BlazeLayout.render("mainLayout");
    }
});