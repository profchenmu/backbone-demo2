define([
    'lodash',
    'marionette',
    './treeView.tpl',
    'vendor/bootstrap-treeview',
    'core/navModel'
], function(_, Marionette,treeViewTpl, BootstrapTree, NavModel) {
    'use strict';
    return Marionette.CompositeView.extend({
       
        className: 'devide-tree',
        
        template: treeViewTpl,
        
        initialize: function() {
            this.model = new NavModel();
        },
        
        onRender: function(){
            var self = this;
            this.model.fetch({
                data: {
                    serviceId: 4000330000001029,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                	self.$el.treeview({
                         data: JSON.stringify(msg.treeData),
                         levels: 1,
                         showIcon: true,
                         showCheckbox: true,
                         showBorder: false,
                         onNodeChecked: function(event, node) {
                             self.$el.treeview("addText",[node.nodeId]);
                         },
                         onNodeUnchecked: function (event, node) {
                             self.$el.treeview("removeText",[node.nodeId]);
                             setTimeout(function(){
                                 self._updatePredict();
                             },0);
                         }
                     })
                    $("#fundBalance").text(numeral(msg.fundBalance).format('0,0.00'));
                    $("#phone").val(msg.phone);
                    if (msg.securityConfigList&&msg.securityConfigList[2]){
                    	$("#otp").val(msg.securityConfigList[2].paramValue);
                    }
                }
            });
            
            self.$el.on('blur', '.input-number', function(e) {
            	var text = $(e.currentTarget).val();
            	text = parseFloat(text).toFixed(2);
            	if (text<0){
            		text = 0;
            	}
            	$(e.currentTarget).val(text);
                self.$el.treeview("addText",[$(e.currentTarget).data('nodeid'), {text:text}]);
                self._updatePredict();
            });
        },
        
        _rmoney:function(s) { 
        	return parseFloat(s.replace(/[^\d\.-]/g, "")); 
        },
        
        _updatePredict: function (){
            var num = 0,
            price = 0;
            this.$el.find(".input-number").each(function(e,i){
                var currentPrice = Number($(this).val());
                if(currentPrice!==NaN&&currentPrice!=''){
                    num++;
                    price = price+Number(currentPrice);
                }
            });
            $("#og-span").text(num);
            $("#price-span").text(price.toFixed(2));
            if (num>0){
            	$("#org").val("1");
            	$('#devide-form').data('bootstrapValidator').updateStatus('org', 'NOT_VALIDATED').validateField('org');
            } else if (num==0){
            	$("#org").val("");
            	$('#devide-form').data('bootstrapValidator').updateStatus('org', 'VALIDATED').validateField('org');
            }
            var balance = this._rmoney($("#fundBalance").text());
            var price = this._rmoney($("#price-span").text());
            if (Number(balance)<Number(price)){
               	$("#org").val("999999999999999999999999999");
            	$('#devide-form').data('bootstrapValidator').updateStatus('org', 'NOT_VALIDATED').validateField('org');
            }
        }
    });
})
