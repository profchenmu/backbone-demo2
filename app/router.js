define([
    'lodash',
    'backbone',
    'marionette',
    'backbone.radio',
    'application',
    'core/views/root-view/root-view',
    'modules/no-login/router',
    'modules/home/router'
], function(_, Backbone, Marionette, Radio, App, RootView, NoLogged, HomeRouter) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
        routes: {
            '*path': 'index',

        },

        execute: function() {
            this.configureEventsBeforeRoute();
            Marionette.AppRouter.prototype.execute.apply(this, arguments);
        },

        configureEventsBeforeRoute: function() {

            var fragment = Backbone.history.fragment;
        },

        login: function() {
            
        },

        index: function() {
            if(App.logged){
                this.navigate('index', {
                    trigger: true
                });
                Radio.channel('subNav').trigger('focus', 'index'); 
            }else{
                this.navigate('login', {
                    trigger: true
                });
            }
            
        }
    });

    App.subRouters = [
        NoLogged,
        HomeRouter
    ];
    App.addInitializer(function() {
        var rootView = new RootView(),
       		router = new Router();

	    _.each(App.subRouters, function(subRouter) {
	        router.processAppRoutes(subRouter.controller, subRouter.router);
	    });
        
        App.Router = router;

        App.getRegion('body').show(rootView);
    

	    $('body').on('click', 'a[data-href]', function(e){
	        var url = $(e.currentTarget).attr('data-href');


	        router.navigate(url, {
	            trigger: true
	        });
	        e.preventDefault();
	    });
    });

    return Router;
});