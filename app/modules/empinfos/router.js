define([
    'backbone',

    'application',

    './layout',
    './details/disLayoutView',
    './upload/layout'
], function(Backbone, App, LayoutView, DisLayoutView, UploadView) {
    'use strict';

    return {
        router: {
            'empinfo': 'index',
            'empinfo/detail/:id?time=:createdDateStr': 'detail',
            'empinfo/upload': 'upload'
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
            detail: function(id, createdDateStr){
                if(App.logged){
                    if(App.menuGroups.indexOf('empinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        if(App.rootView){
                            var layout =  new DisLayoutView({disInfoId: id, createdDateStr: createdDateStr});
                            App.rootView.getRegion('main').show(layout);
                        }
                    }
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
            },
            upload: function(){
                if(App.logged){
                    if(App.menuGroups.indexOf('empinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        if(App.rootView){
                            var layout =  new UploadView();
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