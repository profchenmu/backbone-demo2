define([
    'backbone',

    'application',

    './no-logged',
    
], function(Backbone, App, NoLogged) {
    'use strict';

    return {
        router: {
            'login': 'login'
        },

        controller: {
            login: function() {
                App.baseView.getRegion('rootView').show(new NoLogged());
            }
        }
    };

});