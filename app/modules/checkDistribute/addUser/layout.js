define([
    'lodash',
    'marionette',
    'application',
    './layout.tpl',
    'vendor/bootstrap-treeview',
    'backbone.radio',
    'core/navModel',    
    'core/navVcodeModel',    
    'core/checkCodeImageModel',    
    'vendor/bootstrapValidator'
], function(_, Marionette, App, layoutTpl, BootstrapTree, Radio,NavModel,NavVcodeModel,CheckModel) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'add-user-item',

        template: layoutTpl,

        ui: {
        	userName: '#user-name',
        	phone: '#phone',
            orgTree: '#org-tree',
            menuTree: '#menu-tree',
            imageAuth: "#image-auth",
            timestamp: "#timestamp",
            checkCode: "#check-code",
            codeDiv: "#code-div",
            wrongMessage: "#wrong-message"
        },

        events: {
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth',
            'blur #check-code': '_validatorCode'
        },

        initialize: function() {
            this.model = new NavModel();
        },

        _updateImageAuth: function(){
            var timestamp=Math.round(new Date().getTime());
        	 this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp='+timestamp); 
             this.ui.timestamp.val(timestamp);
        },
        
        _validatorCode: function(){
        	var checkModel = new CheckModel();
        	var self = this;
        	checkModel.fetch({
        		data:{
        			timestamp:this.ui.timestamp.val(),
        			code:this.ui.checkCode.val(),
                    t: new Date().valueOf(),
        		},
        		reset:true,
        		success:function(model,msg){
        			if (msg.code=='01'){
                 		$("#code").val("");
                    	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('code', 'NOT_VALIDATED').validateField('code');
        			} else if (msg.code=='00'){
                 		$("#code").val("1");
                    	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('code', 'VALIDATED').validateField('code'); 
        			}
        		}
        	})
        },
        
        onRender: function(){
        	var self = this;
        	this._updateImageAuth();
            this.model.fetch({
                data: {
                    serviceId: 4000330000001011,
                    t: new Date().valueOf(),
                    type:'02'
                },
                reset: true,
                success: function(model,msg){
                	 self.ui.orgTree.treeview({
                         data: JSON.stringify(msg.treeData),
                         levels: 1,
                         showIcon: true,
                         showCheckbox: true,
                         showBorder: false,
                         checkedIcon: "glyphicon glyphicon-record",
                         onNodeChecked: function(event, node) {
                         	var checknodes = self.$el.find('#org-tree').treeview('getChecked');
                         	$(checknodes).each(function(){
                         		if (this.nodeId!=node.nodeId){
                         			self.$el.find('#org-tree').treeview('uncheckNode',this);
                         		}
             				});
                        	$("#org").val("1");
                        	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('org', 'VALIDATED').validateField('org');
                         },
                         onNodeUnchecked: function (event, node) {
                        	 $("#org").val("");
                         	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('org', 'NOT_VALIDATED').validateField('org');
                         }
                     })
                }
            });
            this.model.fetch({
                data: {
                    serviceId: 4000330000001013,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                	 self.ui.menuTree.treeview({
                         data: JSON.stringify(msg.treeData[0].nodes),
                         levels: 1,
                         showIcon: true,
                         showCheckbox: true,
                         showBorder: false,
                         onNodeChecked: function(event, node) {
                            self.$el.find('#menu-tree').treeview('addCheck', node);
                            $("#menu").val("1");
                        	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('menu', 'VALIDATED').validateField('menu');
                         },
                         onNodeUnchecked: function (event, node) {
                         	self.$el.find('#menu-tree').treeview('removeCheck', node);
                         	setTimeout(function(){
	                         	var checknodes = self.$el.find('#menu-tree').treeview('getChecked');
	                         	if (checknodes.length==0){
	                         		$("#menu").val("");
	                            	$('#add-user-form').data('vendor/bootstrapValidator').updateStatus('menu', 'NOT_VALIDATED').validateField('menu');
	                         	}
                         	},0);
                         }
                     })
                }
            });
               
            setTimeout(function(){
	            self.$el.find('#add-user-form').vendor/bootstrapValidator({
		            message: '',
		            feedbackIcons: {
		                valid: 'glyphicon glyphicon-ok',
		                invalid: 'glyphicon glyphicon-remove',
		                validating: 'glyphicon glyphicon-refresh'
		            },
		            fields: {
		                "user-name": {
		                    validators: {
		                        notEmpty: {
		                            message: '用户名不能为空。'
		                        },
		                        stringLength: { 
		                            min: 6, 
		                            max: 18, 
		                            message: '用户名必须大于6个字符，小于18个字符。' 
		                        },
		                        callback: {
		                        	message: '用户名不符合限制规则，用户名只能是纯数字，或纯字母，或字母加数字，或邮箱格式',
		                        	callback: function(value, validator) {
			                            var regexp1 =  /[^0-9a-zA-Z]/;
			                            var re = new RegExp(regexp1);
			                            if (!re.test(value)) {
			                                return true;
			                            } else {
			                            	var regexp2 =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			                            	re = new RegExp(regexp2);
			                            	 if (re.test(value)) {
					                               return true;
			                            	 } else {
			                            		 return false;
			                            	 }
			                            }
		                            }
		                        }
		                    }
		                },
		                phone: {
		                    validators: {
		                        notEmpty: {
		                            message: '手机号不能为空。'
		                        },
		                        regexp: { 
		                            regexp: /^[1]{1}[3,4,5,7,8]{1}[0-9]{9}$/,
		                            message: '手机号不对'
		                        }
		                    }
		                },
		                org:{
		                	validators: {
		                        notEmpty: {
		                            message: '请选择一个组织'
		                        }
		                	}
		                },
		                menu:{
		                	validators: {
		                        notEmpty: {
		                            message: '请至少选择一个菜单'
		                        }
		                	}
		                },
		                code:{
		                	validators: {
		                        notEmpty: {
		                            message: '验证码不正确'
		                        }
		                	}
		                }
		            }
		        }).on('success.form.bv', function(e) {
		        	var orgChecknodes = self.ui.orgTree.treeview('getChecked');
		        	if (orgChecknodes.length==0){
		        		return false;
		        	}
		        	var menuChecknodes = self.ui.menuTree.treeview('getChecked');
		        	if (menuChecknodes.length==0){
		        		return false;
		        	}
		        	var ids = new Array();
		        	$(menuChecknodes).each(function(){
		        		ids.push(this.id);
		        	});
		        	var menuIds=ids.join();
		        	var vcodeModel = new NavVcodeModel();
		        	vcodeModel.fetch({
		                data: {
		                    serviceId: 4000330000001024,
	                        t: new Date().valueOf(),
		                    userName:self.ui.userName.val(),
		                    phone:self.ui.phone.val(),
		                    agencyCode:orgChecknodes[0].id,
		                    timestamp:self.ui.timestamp.val(),
		                    code:self.ui.checkCode.val(),
		                    auths:menuIds
		                },
		                reset: true,
		                success: function(model,msg){
	        				$('#auth-manage-save').attr("disabled",false);
		                	 alert(msg.message);
		                	 if (msg.code=='00'){
			                	 App.Router.navigate('manage', {
			                         trigger: true
			                     });
		                	 }
		                	 return false;
		                }
		            });
		        	return false;
		        });
            },0);
        }
    });

});