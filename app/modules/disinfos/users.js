define([
    'backbone',
    './user',
    'application'
], function(Backbone, UsersModel, App) {
    'use strict';

    return Backbone.Collection.extend({

        url: window.getApi('/getService.do'),

        model: UsersModel,

        parse: function(res) {
            if(res.code ==='00'){
                return res.rows;
            }else if(res.code === '101'){
                App.Router.navigate('login', {
                    trigger: true
                });
                window.sessionStorage.clear();
                return false;
            }else{
                return [];
            }
            
        },
    });
});