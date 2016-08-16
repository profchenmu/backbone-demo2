define([
    'lodash',
    'marionette',
    'application'
], function(_, Marionette, App) {
    'use strict';
    return Backbone.Model.extend({
        url: window.getApi('/getService.do'),
        parse: function(res) {
            // return (res.code === '00') ? res.fragment : {message:'error'};
            if(res.code === '00'){
                if(res.fragment){
                    return res.fragment;
                }
                if(res.agency){
                    return res.agency;
                }
                if(res.benefitRule){
                    return res.benefitRule;
                }
                if(res.button_auth){

                    return res.button_auth;
                }
                if(res.benefit){
                    return res.benefit;
                }
                if(res.rows){
                    return res.rows;
                }
                if(res.employes){
                    return res.employes;
                }
                return res;
            }else if(res.code === '101'){

                App.Router.navigate('login', {
                    trigger: true
                });
                
                window.sessionStorage.clear();
                return false;
            }else{
                return {message:'error'};
            }
        }

    });

});