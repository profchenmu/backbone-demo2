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

        initialize: function() {
            Radio.channel('heada').trigger('aaa', ['disinfos','发放记录']);
            this.model = new NavModel();

            this.disInfoId = this.options.disInfoId;
        },

        onRender: function(){
            var self = this;
            self.model.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001008,
                    t: new Date().valueOf(),
                    id: self.disInfoId
                },
                success: function(model,msg){
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    self.getRegion('infos').show(new DetailInfosView({
                        model: self.model
                    }));
                }
            });

            self.getRegion('list').show(new DisListView({
                model: self.model,
                id: self.disInfoId
            }));
        }
    });

});