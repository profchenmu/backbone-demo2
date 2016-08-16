define([
    'lodash',
    'marionette',
    'core/navModel',
    './layout.tpl',
    './itemView',
    'backbone.radio'
], function(_, Marionette, NavModel, layout, ItemView, Radio) {

    'use strict';

    return Marionette.LayoutView.extend({

        className: 'mydata-layout',

        template: layout,
        
        regions: {
            'content': '#sub-root'
        },

        initialize: function() {
            Radio.channel('heada').trigger('aaa', ['auth','安全验证配置']);
            this.model = new NavModel();
        },

        onRender: function(){
        	var self = this;
        	this.model.fetch({
                data: {
                    serviceId: 4000330000001006,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                    if(msg.code==='00'){
                        self.getRegion('content').show(new ItemView({
                            model2: msg,
                            model: model
                        }));
                    }
                    
                }
            });
        }
    });

});