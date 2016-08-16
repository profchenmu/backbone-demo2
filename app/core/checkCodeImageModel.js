define([
    'lodash',
    'marionette',
    'application'
], function(_, Marionette, App) {
    'use strict';

    return Backbone.Model.extend({
        url: window.getApi('/checkCodeImage.do'),

        parse: function(res) {
            // return (res.code === '00') ? res.fragment : {message:'error'};
            if(res.code === '00'){
                if(res.message){
                    return res.message;
                }
            }else if(res.code === '101'){
                App.Router.navigate('login', {
                    trigger: true
                });
                window.sessionStorage.clear();
                return false;
            }else{
                return res.message;
            }
        }

    });

});