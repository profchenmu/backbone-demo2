define([
    'lodash',
    'marionette',
    'application',
    './detailInfos.tpl',
    'numeral',
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
            data.successDateStr = data.successDateStr||'';
            // if(data.message == 'error'){
            //     App.Router.navigate('login', {
            //         trigger: true
            //     });
            // }
            data.fundBalance = numeral(data.fundBalance).format('0,0.00');
            data.totalRemit = numeral(data.totalRemit).format('0,0.00');

            data.totalWelfare = numeral(data.totalWelfare).format('0,0.00');
            data.totalNum = data.totalNum || 0;
            data.failCount = data.failCount || 0;
            data.successNum = data.totalNum - data.failCount;
            return data;

        },

    });

});