define([
    'lodash',
    'marionette',
    'application',
    './layout.tpl',
    'vendor/bootstrap-treeview',
    'backbone.radio',
    'core/navModel',    
    'core/navVcodeModel',    
    'core/checkCodeImageModel'
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
                    	$('#add-user-form').data('bootstrapValidator').updateStatus('code', 'NOT_VALIDATED').validateField('code');
        			} else if (msg.code=='00'){
                 		$("#code").val("1");
                    	$('#add-user-form').data('bootstrapValidator').updateStatus('code', 'VALIDATED').validateField('code'); 
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
                        	$('#add-user-form').data('bootstrapValidator').updateStatus('org', 'VALIDATED').validateField('org');
                         },
                         onNodeUnchecked: function (event, node) {
                        	 $("#org").val("");
                         	$('#add-user-form').data('bootstrapValidator').updateStatus('org', 'NOT_VALIDATED').validateField('org');
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
                        	$('#add-user-form').data('bootstrapValidator').updateStatus('menu', 'VALIDATED').validateField('menu');
                         },
                         onNodeUnchecked: function (event, node) {
                         	self.$el.find('#menu-tree').treeview('removeCheck', node);
                         	setTimeout(function(){
	                         	var checknodes = self.$el.find('#menu-tree').treeview('getChecked');
	                         	if (checknodes.length==0){
	                         		$("#menu").val("");
	                            	$('#add-user-form').data('bootstrapValidator').updateStatus('menu', 'NOT_VALIDATED').validateField('menu');
	                         	}
                         	},0);
                         }
                     })
                }
            });
               
        }
    });

});