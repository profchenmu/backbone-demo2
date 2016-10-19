define([
    'lodash',
    'marionette',
    'application',
    './itemView.tpl',
    'core/navModel',
    'vendor/bootstrap-treeview',
    './modal/resultModalView'
], function(_, Marionette, App, itemViewTpl, NavModel, BootstrapTree,ResultModal) {
    'use strict';

    return Marionette.ItemView.extend({

        className: 'comment-item',

        template: itemViewTpl,

        ui: {
            orgTree: '#org-tree',
            menuTree: '#menu-tree',
            name:'#name'
        },

        events: {
            'click #auth-manage-save': '_authManageSave'
        },

        initialize: function() {
            this.model =new NavModel();	
        },

        onRender: function(){
            var self = this;
            this.model.fetch({
                data: {
                    serviceId: 4000330000001030,
                    t: new Date().valueOf(),
                    userId:this.options.model.id,
                    type:'02'
                },
                reset: true,
                success: function(model,msg){
                	 self.ui.orgTree.treeview({
                        data: JSON.stringify(msg.agencyTree),
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
	                    },
	                    onNodeUnchecked: function (event, node) {
	                    }
                	 });
                	 self.ui.menuTree.treeview({
                 		data: JSON.stringify(msg.authTree[0].nodes),
 		                levels: 1,
 		                showIcon: true,
 		                showCheckbox: true,
 		                showBorder: false,
 		                onNodeChecked: function(event, node) {
 		                    self.$el.find('#menu-tree').treeview('addCheck', node);
 		                },
 		                onNodeUnchecked: function (event, node) {
 		                	self.$el.find('#menu-tree').treeview('removeCheck', node);
 		                }
 		            });
                	 self.ui.name.text(msg.userName);
                }
            });
        },

        serializeData: function() {
        	return this.model.toJSON();
        },

        _getMenuIds:function(){
        	var menuChecknodes = this.ui.menuTree.treeview('getChecked');
        	var ids = new Array();
        	$(menuChecknodes).each(function(){
        		ids.push(this.id);
        	});
        	return ids.join();
        },
        
        _authManageSave: function(e){
        	var orgChecknodes = this.ui.orgTree.treeview('getChecked');
        	var orgId = '';
        	if (orgChecknodes.length==1){
        		orgId = orgChecknodes[0].id;
        	}
        	var menuIds = this._getMenuIds();
        	this.model.fetch({
                 data: {
                     serviceId: 4000330000001025,
                     t: new Date().valueOf(),
                     userId:this.options.model.id,
                     auths:menuIds,
                     agencyCode:orgId
                 },
                 reset: true,
                 success: function(model,msg){
                	 var resultModal = new ResultModal({
  	 	                model: msg.message
  	 	            });
                 }
        	 });
        }
    });

});