define([
    'lodash',
    'marionette',

    './layout.tpl',
    'backbone.radio',
    './itemView',
    '../user'
    // './listView',
    // './newsCollection'
], function(_, Marionette, layoutTpl, Radio, UserAuthView, UserModel) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'manage-auth',

        template: layoutTpl,

        regions: {
            'authMain': '#auth-main'
        },

        initialize: function(){
            
            Radio.channel('heada').trigger('aaa', ['manage','权限管理']);
            this.userModel = new UserModel({id: this.options.userId});

        },

        onRender: function(){
            this.getRegion('authMain').show(new UserAuthView({model: this.userModel}));
        }
    });

});