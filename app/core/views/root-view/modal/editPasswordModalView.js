define([
    'marionette',
    'backbone.radio',
    './editPasswordModalView.tpl',
    'core/navVcodeModel',
    './resultModalView'
], function(Marionette, Radio, template,NavModel,ResultModal) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth'
        },

        template: template,

        ui: {
            'imageAuth': '#image-auth',
            'editPasswordForm': '#edit-password-form',
            'code': '#code',
            'oldPassword':'#oldPassword',
            'newPassword':'#newPassword'
        },

        initialize: function() {
            this.render();
        },

        _updateImageAuth: function(){
            this.timestamp = Math.round(new Date().getTime());
            this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp='+this.timestamp); 
        },

        onRender: function(){   
        	this.$el.modal({
                show: true
            });
        	var self = this;
            this.ui.editPasswordForm.bootstrapValidator({
                message: '',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                	 'old-password': {
                         validators: {
                             notEmpty: {
                                 message: '原密码不能为空。'
                             },
                             different: {
                                 field: 'new-password,confirm-password',
                                 message: '原密码与新密码不能相同'
                             },
                             stringLength: { 
 	                            min: 3, 
 	                            max: 18, 
 	                            message: '原密码必须大于3个字符，小于18个字符。' 
 	                        }
                         }
                     },
                     'new-password': {
                         validators: {
                             notEmpty: {
                                 message: '新密码不能为空。'
                             },
                             identical: {
                                 field: 'confirm-password',
                                 message: '新密码与确认密码不同'
                             },
                             different: {
                                 field: 'old-password',
                                 message: '新密码不能与原密码相同'
                             },
                             stringLength: { 
  	                            min: 4, 
  	                            max: 18, 
  	                            message: '新密码必须大于4个字符，小于18个字符。' 
  	                        }
                         }
                     },
                     'confirm-password': {
                         validators: {
                             notEmpty: {
                                 message: '确认密码不能为空。'
                             },
                             identical: {
                                 field: 'new-password',
                                 message: '确认密码与新密码不同'
                             },
                             different: {
                                 field: 'old-password',
                                 message: '确认密码不能与原密码相同'
                             },
                             stringLength: { 
  	                            min: 4, 
  	                            max: 18, 
  	                            message: '确认密码必须大于4个字符，小于18个字符。' 
  	                        }
                         }
                     },
                    code: {
                        validators: {
                            notEmpty: {
                                message: '验证码不能为空。'
                            },
                            blank: {}
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '手机号不能为空。'
                            },
                            regexp: { 
                                regexp: /^[1]{1}[3,4,5,8]{1}[0-9]{9}$/,
                                message: '手机号不对'
                            }
                        }
                    }
                }
            })
            .on('success.form.bv', function(e){
                e.preventDefault();
                var model = new NavModel();
            	model.fetch({
                    data: {
                        serviceId: 4000330000001034,
                        t: new Date().valueOf(),
                        userName:window.sessionStorage.userName,
                        oldPassword:$('#old-password').val(),
                        newPassword:$('#new-password').val(),
                        code:$('#code').val(),
                        timestamp:self.timestamp
                    },
                    reset: true,
                    success: function(model,msg){
                    	if (msg.code=="01"){
                    		$('#edit-password-form').data('bootstrapValidator').updateMessage('code', 'blank', msg.message)
                    		$('#edit-password-form').data('bootstrapValidator').updateStatus('code', 'INVALID', 'blank');
                    	} else if (msg.code=='00'){
                    		 self.$el.modal('hide');
                    		 var resultModal = new ResultModal({
         	 	                model: msg.message
         	 	            });
                    	} else {
                    		alert(msg.message);
                    	}
                    	$("#edit-password-button").attr("disabled",false);
                    }
            	})
            });
            this._updateImageAuth();
        },

        _destroyModal: function() {
            this.$el.remove();
        }

    });

});