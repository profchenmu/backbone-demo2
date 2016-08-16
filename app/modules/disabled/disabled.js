define([
    'backbone',
    'marionette',

    'application',

    'backbone.radio',

    './disabled.tpl',
    
], function(Backbone, Marionette, App, Radio, disabledTpl) {
    'use strict';

    var LayoutView = Marionette.LayoutView.extend({

        className: 'disabled-layout',

        template: disabledTpl,

        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['disabled','无权限']);
        },

        serializeData: function(){
            return {
                name: App.userGroup
            };
        }

    });

    return {
        router: {
            'disabled': 'disabled'
        },

        controller: {
            disabled: function() {
                if(App.logged){
                    var layout = new LayoutView();
                    if(App.rootView){
                        App.rootView.getRegion('main').show(layout);
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