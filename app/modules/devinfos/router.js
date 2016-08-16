define([
    'backbone',

    'application',

    './layout',
    './listView'
], function(Backbone, App, LayoutView, ListView) {
    'use strict';

    return {
        router: {
            'devinfos': 'index'
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