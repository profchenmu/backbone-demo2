define([
    'backbone',

    'application',

    './layout',
    // './listView',
    // './stock/layout'
], function(Backbone, App, LayoutView) {
    'use strict';

    return {
        router: {
            'auth': 'index',
            // 'mydata/stock/:id': 'stock'
        },

        controller: {
            index: function() {
                if(App.logged){
                    var hash = window.location.hash.replace('#','');
                    if(App.menuGroups.indexOf(hash)<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            App.rootView.getRegion('main').show(layout);
                            // layout.getRegion('list').show(new ListView());
                        }
                    }
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
            }
        }
    };

});