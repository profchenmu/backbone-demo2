define([
    'marionette',
    'share/modal',
    './confirmModalView.tpl',
    'core/navModel',
    'vendor/bootstrap-treeview',
    'application',
    './otpModalView',
    './resultModalView'
], function(Marionette, Modal, template, NavModel,Treeview,App,OptModal,ResultModal) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #confirm-button': '_submit'
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
            this.model = new NavModel();
        },

        template: template,

        serializeData: function() {
            var data = {
                og: $("#og-span").text(),
                price:$("#price-span").text()
            };
            return data;
        },

        onRender: function(){           
            this.$el.modal({
                show: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
        },
        
        _initData:function(){
        	var data = new Object();
        	data.transferName = $("#info").val();
        	data.transferList = [];
        	$(".input-number").each(function(e,i){
        		var og = new Object();
        		og.targetOrganzationId = $(this).data('id')+'';
        		og.transferAmount = $(this).val();
        		if (og.transferAmount!=''&&og.transferAmount!='0'){
        			data.transferList.push(og)
        		}
        	});
        	return JSON.stringify(data);
        },
        
        _submit:function(){
        	var self = this;
        	var otp = $("#otp").val();
        	if (otp=='true'){
        		this.$el.modal('hide');
        		var optModal = new OptModal({
	                model: this.model
	            });
        		return false;
        	}
	        var data = this._initData();
	
	       	var url = window.getApi('/getService.do?serviceId=4000330000001000');
	        $.ajax({  
	            url : url,  
	            type:'POST',  
	            data:{
	            	data:data
	            },  
	            async: false,  
	            cache: false,  
	            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
		        success: function(msg){
		        	 if (msg.code=='00'){
		        		 self.$el.modal('hide');
		        		 var resultModal = new ResultModal({
		 	                model: msg.message
		 	            });
		        	 }
		        }
	        });
        }
    });
});