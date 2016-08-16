define([
    'marionette',
    'share/modal',
    './otpModalView.tpl',
    'core/navModel',
    'vendor/bootstrap-treeview',
    'application',
    './resultModalView'
], function(Marionette, Modal, template, NavModel,Treeview,App,ResultModal) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        ui:{
        	otpCode: '#otp-code',
        	codeButton:"#code-button"
        },
        
        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #confirm-button': '_submit',
            'click #code-button': '_getCode'
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
            this.wait=90;
        },

        template: template,

        serializeData: function() {
        	var phone = this.model.phoneNum;
        	if (phone.length==11){
        		phone = phone.substring(0,3)+'****'+phone.substring(7,11);
        	}
        	var data = {
                    phone: phone
                };
                return data;
        },

        _getCode:function(){
        	this._time();
        	var model = new NavModel();
        	model.fetch({
                data: {
                    serviceId: 4000330000001018,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                	 if (msg.code=='00'){
                		 alert("验证码已经发送到您的手机，请注意查收");
                	 }
                }
        	})
        },
        
        onRender: function(){    
        	
            this.$el.modal({
                show: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
        },
        
        _time:function() {  
        	var self = this;
            if (this.wait == 0) {  
            	this.ui.codeButton.attr("disabled",false);
            	this.ui.codeButton.text('获取短信验证码');  
                this.wait = 90;  
            } else {  
            	this.ui.codeButton.attr("disabled",true);
            	this.ui.codeButton.text("重新发送(" + this.wait + ")");  
                this.wait--;  
                setTimeout(function() {  
                	self._time();  
                },  
                1000)  
            }  
        },
        
        _submit:function(){
        	var self = this;
        	var model = new NavModel();
        	model.fetch({
                data: {
                    serviceId: 4000330000001019,
                    t: new Date().valueOf(),
                    smsContent:self.ui.otpCode.val(),
                    taskId:self.model.taskId
                },
                reset: true,
                success: function(model,msg){
                	 if (msg.code=='00'){
                		 self.$el.modal('hide');
                		 var resultModal = new ResultModal({
     	 	                model: msg.message
     	 	            });
                	 } else if (msg.code="01"){
                		 alert(msg.message);
                	 }
                }
        	})
        }
    });
});