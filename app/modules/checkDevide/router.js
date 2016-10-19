define([
    'backbone',

    'application',

    './layout',
    './listView',
    './manageAuth/layout',
    './manageAuth/itemView',
    './addUser/layout',
    'backbone.radio'
], function(Backbone, App, LayoutView, ListView, AuthLayoutView, AuthItemView, AddUserView, Radio) {
    'use strict';

    return {
        router: {
            'check_devide': 'index',
            // 'manage/auth/:id': 'manageAuth',
            // 'manage/addUser': 'addUser'
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

            manageAuth: function(id){
                if(App.logged){
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AuthLayoutView({userId: id});
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
                // this._checkLogin();
                // if(App.rootView){
                //     var layout =  new AuthLayoutView({userId: id});
                //     App.rootView.getRegion('main').show(layout);
                // }
            },
            addUser: function(){
                if(App.logged){

                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddUserView();
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
                // this._checkLogin();
                // if(App.rootView){
                //     var layout =  new AddUserView();
                //     App.rootView.getRegion('main').show(layout);
                // }
            }
        }
    };

});