define([
    'lodash',
    'marionette',
    'backbone.radio',
    './layout.tpl',
    './treeView',
    './modal/confirmModalView',
    'vendor/bootstrap-treeview'
], function(_, Marionette, Radio, layout, TreeView, ConfirmModal) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'mydata-layout',

        template: layout,

        events: {
            'click #submit-btn': '_submit'
        },
        
        regions: {
            'tree': '#devide-tree'
        },
        
        onRender: function(){
            var self = this;
        	this.getRegion('tree').show(new TreeView());
            setTimeout(function(){
            	// self._validator();
            },0);
        },

        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['devide','福利划拨']);
        },
        
        _validator: function(e){
	        this.$el.find('#devide-form').bootstrapValidator({
	            message: 'This value is not valid',
	            feedbackIcons: {
	                valid: 'glyphicon glyphicon-ok',
	                invalid: 'glyphicon glyphicon-remove',
	                validating: 'glyphicon glyphicon-refresh'
	            },
	            fields: {
	                info: {
	                    validators: {
	                        notEmpty: {
	                            message: '说明不能为空。'
	                        },
	                        stringLength: { 
	                            min: 1, 
	                            max: 40, 
	                            message: '说明必须大于1个字符，小于40个字符。' 
	                        }, 
	                    }
	                },
	                org:{
	                	validators: {
	                        notEmpty: {
	                            message: '请至少一个组织'
	                        },
	                        stringLength: { 
	                            min: 1, 
	                            max: 20, 
	                            message: '划拨金额大于可用金额。' 
	                        }
	                    }
	                }
	            }
	        }).on('success.form.bv', function(e) {
	     		e.preventDefault();
	     		var confirmModal = new ConfirmModal({
	                model: this.model
	            });
	     		$("#submit-btn").attr("disabled",false);
	     	});
        }
    });

});