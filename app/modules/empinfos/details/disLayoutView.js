define([
    'lodash',
    'marionette',
    'core/navModel',
    './disLayoutView.tpl',
    './detailInfos',
    './disListView',
    'backbone.radio'
], function(_, Marionette, NavModel, DisLayoutViewTpl, DetailInfosView, DisListView, Radio) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'disinfos-detail',

        template: DisLayoutViewTpl,
        
        regions: {
            'infos': '#dis-detail-infos',
            'list': '#dis-detail-list'
            // 'content': '#sub-root'
        },

        serializeData: function() {
            var data = this.options;
            return data;
        },

        initialize: function() {
            Radio.channel('heada').trigger('aaa', ['empinfo','员工信息']);
            this.model = new NavModel();

            this.disInfoId = this.options.disInfoId;
        },

        onRender: function(){
            var self = this;
            self.getRegion('list').show(new DisListView({
                model: self.model,
                id: self.disInfoId
            }));
        }
    });

});