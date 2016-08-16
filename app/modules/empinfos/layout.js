define([
    'lodash',
    'marionette',
    'backbone.radio',
    'application',
    './layout.tpl',
    './listView'
], function(_, Marionette, Radio, App, layoutTpl, UserlistView) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'users-wrapper',

        template: layoutTpl,

        regions: {
            'list': '#user-list'
        },

        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['empinfo','员工信息']);
        },
        onRender: function(){
            this.getRegion('list').show(new UserlistView());
        }
    });

});