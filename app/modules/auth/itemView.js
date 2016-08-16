define([
    'lodash',
    'marionette',
    'core/navModel',
    './itemView.tpl'
], function(_, Marionette, NavModel, itemView) {
    'use strict';

    return Marionette.ItemView.extend({

        className: 'mydata-layout',

        template: itemView,

        ui: {
            'authority': '#authority',
            'sendpoint': '#sendpoint',
            'transfer': '#transfer',
            'message':'#auth-message'
        },
        
        events: {
        	'click #submitBtn': '_userSubmit'
        },

        initialize: function() {
            this.navModel = new NavModel();
        },

        onRender: function(){
        },

        serializeData: function() {
        	var data = new Object();
        	data.authority='';
        	data.sendpoint='';
        	data.transfer='';
        	$(this.options.model2.rows).each(function(){
        		if (this.paramName=='AUTHORITY_OTP') {
        			data.authority =this.paramValue == 'true' ? 'checked' : '';
        			return true;
        		}
        		if (this.paramName=='SENDPOINT_OTP') {
        			data.sendpoint =this.paramValue == 'true' ? 'checked' : '';
        			return true;
        		}
        		if (this.paramName=='TRANSFER_OTP') {
        			data.transfer =this.paramValue == 'true' ? 'checked' : '';
        			return true;
        		}
        	});
            return data;
        },
        
        _userSubmit: function(){
        	var self = this;
        	this.navModel.fetch({
                data: {
                    serviceId: 4000330000001010,
                    t: new Date().valueOf(),
                    AUTHORITY_OTP: self.ui.authority.is(':checked'),
                    SENDPOINT_OTP: self.ui.sendpoint.is(':checked'),
                    TRANSFER_OTP: self.ui.transfer.is(':checked')
                },
                reset: true,
                success: function(model,msg){
                	self.ui.message.text(msg.message);
                }
        	});
        }
    });

});