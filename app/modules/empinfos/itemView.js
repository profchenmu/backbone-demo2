define([
    'lodash',
    'marionette',
    './itemView.tpl'
], function(_, Marionette, ItemViewTpl) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        initialize: function() {
            this.btnAuth = window.sessionStorage.getItem('btnAuth');
        },

        serializeData: function() {
            var data = this.model.toJSON();
            data.showDetail = this.btnAuth.indexOf('4000330000001037');
            return data;
        },

    });

});