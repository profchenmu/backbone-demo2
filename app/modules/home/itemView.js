define([
    'lodash',
    'marionette',
    'application',
    './itemView.tpl',
    'numeral'
], function(_, Marionette, App, itemViewTpl, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        className: 'info-items',

        template: itemViewTpl,

        initialize: function() {
            // this.reportId = this.options.reportId;
        },

        serializeData: function() {
            var data = this.model.toJSON();
            data.fundBalance = numeral(data.fundBalance).format('0,0.00');
            data.totalRemit = numeral(data.totalRemit).format('0,0.00');
            data.totalWelfare = numeral(data.totalWelfare).format('0,0.00');
            return data;
        },
    });

});