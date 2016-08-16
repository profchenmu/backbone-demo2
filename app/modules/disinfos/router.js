define([
    'backbone',

    'application',

    './layout',
    './details/disLayoutView'
], function(Backbone, App, LayoutView, DisLayoutView) {
    'use strict';

    return {
        router: {
            'disinfos': 'index',
            'disinfos/detail/:id': 'detail'
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
                
            },
            detail: function(id){
                if(App.logged){
                    if(App.menuGroups.indexOf('disinfos')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        if(App.rootView){
                            var layout =  new DisLayoutView({disInfoId: id});
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