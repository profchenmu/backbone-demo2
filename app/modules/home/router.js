define([
    'backbone',

    'application',

    './layout',
    
], function(Backbone, App, LayoutView) {
    'use strict';

    return {
        router: {
            'index': 'index'
        },

        controller: {
            index: function() {
                alert('cao');
                    var layout = new LayoutView();
                    if(App.rootView){
                        App.rootView.getRegion('main').show(layout);
                    }

            }
        }
    };

});