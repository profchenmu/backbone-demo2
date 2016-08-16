define([
    'lodash',
    'marionette',
    './layout.tpl',
    'core/navModel',    
    './modal/resultModalView',
    'backbone.radio',
], function(_, Marionette, layoutTpl,NavModel,ResultModal,Radio) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'add-user-item',

        template: layoutTpl,

        ui: {
        	'lefile': '#lefile',
        	'empMessage':'#emp-message'
        },

        events: {
        	'click #upload-button': '_upAction',
        	'change #lefile':'_up',
        	'click #user-submit':'_submit'
        },

        initialize: function() {
            this.model = new NavModel();
            Radio.channel('heada').trigger('aaa', ['empinfo','员工信息']);
        },
        
        _submit:function(){
        	var url = window.getApi('/getService.do?serviceId=4000330000001035');
	        $.ajax({  
	            url : url,  
	            type:'POST',  
	            data:{
	            	orgFileName: this.orgname,
	            	fileName:this.uploadFile
	            },  
	            async: false,  
	            cache: false,  
	            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
		        success: function(msg){
		        	if (msg.code=='00'){
		        		var resultModal = new ResultModal({
		        			model: msg
 	 	            	});
		        	} 
		        }
	        });
	        return false;
        },
        
        _up:function(){
        	var self = this;
        	var file = this.ui.lefile.val();
        	//IE 10 fix
        	if (file==''){
        		return false;
        	}
        	var pos=file.lastIndexOf("\\");
        	this.orgname=file.substring(pos+1);
        	
        	
        	var formData = new FormData(document.forms.namedItem("fileinfo"));
        	var url = window.getApi('/upload.do');
        	$.ajax({  
                url : url,  
                type : 'POST',  
                data : formData,  
                async: false,  
                cache: false,  
                contentType: false,  
                processData: false, 
                success : function(msg) {  
                	if (msg.code=='00'){
                		self.ui.empMessage.text('');
                		self.uploadFile=msg.fileName;
                		$("#file-name").html('<a style="cursor: pointer;"  href="'+window.getApi('/download.do?fname=')+
                				msg.fileName+'&orgname='+self.orgname+'">'+self.orgname+'<a>');
                		$("#user-submit").attr("disabled",false);
                	} else {
                		self.ui.empMessage.text(msg.message);
                	}
                	self.ui.lefile.val('');
                },  
            });  
        },
        
        _upAction:function(){
        	this.$el.find("#lefile").click();
        },

        serializeData: function() {
        	var data = {};
        	data.url = window.getApi('/download.do?t=01');
        	return data;
        },
        
        onRender: function(){
        }
    });

});