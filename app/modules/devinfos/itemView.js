define([
    'lodash',
    'marionette',
    './itemView.tpl',
    'core/navModel',
    'numeral'
], function(_, Marionette, ItemViewTpl, ModalModel) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        initialize: function() {
            this.rolesModel = new ModalModel();
        },
        

        onRender: function(){
            var self = this;
            
        },

        serializeData: function() {
            var data = this.model.toJSON();
            data.totalAmount = numeral(data.totalAmount).format('0,0.00');
            data.sucNum = data.totalNum - data.failCount;
            return data;
        },

    });

});