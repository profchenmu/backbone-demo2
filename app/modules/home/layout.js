define([
    'lodash',
    'marionette',
    'core/navModel',
    './itemView',
    './layout.tpl',
    'backbone.radio'
], function(_, Marionette, InfoModel, ItemView, layoutTpl, Radio) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'index-layout',

        template: layoutTpl,

        regions: {
            'infos': '.infos'
        },

        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['index','平台首页']);
            

        },

        onRender: function(){
            var self = this;
            this.model = new InfoModel();
            this.model.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001003,
                    t: new Date().valueOf(),
                },
                success: function(model,msg){
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    self.model.set({
                        'message': msg.message,
                        'rootAgencyName': msg.rootAgencyName,
                        'userName': msg.userName,
                        'adminFlag': msg.adminFlag
                    });
                    self.getRegion('infos').show(new ItemView({
                        infos: self.infos2,
                        model: self.model
                    }));
                    
                }
            });
           
        }

    });

});