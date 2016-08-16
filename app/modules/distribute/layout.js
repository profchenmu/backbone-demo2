define([
    'lodash',
    'marionette',
    'backbone.radio',
    './layout.tpl',
    'application',
    'core/navModel',
    'core/budgetModel',
    './modal/confirmModalView',
    './modal/messageModalView',
    'vendor/bootstrap-datepicker',
    'vendor/chosen',
    'vendor/bootstrap-treeview'
], function(_, Marionette, Radio, layout,App,NavModel,budgetModel,ConfirmModal, MessageModal) {

    'use strict';

    return Marionette.LayoutView.extend({

        className: 'mydata-layout',

        template: layout,
        
        ui: {
            'departTree': '#depart-tree',
            'peopleCount': '#people-count',
            'budgetAmt':'#budget-amt',
            'fundBalance':'#fund-balance',
            'fundBalance2':'#fund-balance2',
            'calResult': '#cal-result',
            'calResult2': '#cal-result2',
            'price': '#price',
            'gender': '#gender',
            'joinDate': '#join-date',
            'roleSelect': '#role-select',
            'uploadFile': '#upload-file',
            'lefile': '#lefile',
            'peopleSpan': '#people-span',
            'averageSpan': '#average-span',
            'totalSpan': '#total-span',
            'info2':' #info2',
            'info': '#info',
            'calBtn': '#cal-btn',
        },
        
        events:{
        	'change #lefile':'_up',
        	'click #cal2-btn': '_cal2',
        	'click #upload-button': '_upAction',
        	'click #submit-btn': '_distribute',
        	'click #submit2-btn': '_distribute2',
        	'blur #price':'_fixPoint',
        },

        serializeData: function() {
        	var data = {};
            if(window.sessionStorage.getItem('subGroups')){
            	var btnAuth = JSON.parse(window.sessionStorage.getItem('subGroups'))[0].children;
                data.btn1 = btnAuth.indexOf('distribute_1')>=0? true:false;
                data.btn2 = btnAuth.indexOf('distribute_2')>=0? true:false;
            }
        	data.url = window.getApi('/download.do?fname=template.csv&orgname=template.csv');
        	return data;
        },
        
        _distribute:function(){
        	var confirmModal = new ConfirmModal({
                model: '01'//tab1
            });
     		$("#submit-btn").attr("disabled",false);
        	return false;
        },
        
        _distribute2:function(){
        	var confirmModal = new ConfirmModal({
                model: '02'//tab2
            });
     		$("#submit2-btn").attr("disabled",false);
        	return false;
        },
        
        _upAction:function(){
        	this.$el.find("#lefile").click();
        },
        
        _fixPoint:function(){
        	var price = this.ui.price.val();
        	var floatPrice = parseFloat(price);
        	if (!isNaN(floatPrice)){
        		price = floatPrice.toFixed(2);
        		this.ui.price.val(price);
        	}
        },
        
        _up:function(){
        	var self = this;
        	var file = this.ui.lefile.val();
        	$("#orgname").val(file);
        	var pos=file.lastIndexOf("\\");
        	
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
                		self.ui.uploadFile.val(msg.fileName);
                		self.$el.find("#file-name").html('<a style="cursor: pointer;" target="_blank" href="'+window.getApi('/download.do?fname=')+
                				self.ui.uploadFile.val()+'&orgname='+file.substring(pos+1)+'">'+file.substring(pos+1)+'<a>');
                		self.ui.lefile.val('');
                	} else {
                		self.$el.find("#file-name").html('');
                		self.ui.uploadFile.val('');
                		self.ui.peopleSpan.text('');
                		self.ui.totalSpan.text('');
                		self.ui.averageSpan.text('');
                		self.ui.calResult2.addClass("hide");
                    	var messageModal = new MessageModal({
                            model: msg.message
                        });
                	}
                },  
            });  
        },
        
        _cal2:function(){
        	var model = new budgetModel();	
        	var self = this;
        	if (this.ui.uploadFile.val()==''){
        		return false;
        	}
        	model.fetch({
        		data: {
        			fname: this.ui.uploadFile.val(),
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                	if (msg.code=='00'){
                		self.ui.peopleSpan.text(msg.peopleCount);
                		self.ui.totalSpan.text(numeral(msg.budgetAmt).format('0,0.00'));
                		self.ui.averageSpan.text(parseInt(msg.budgetAmt/msg.peopleCount));
                		self.ui.calResult2.removeClass("hide");
                		if (msg.peopleCount>0){
                			$("#submit2-btn").attr("disabled",false);
                		} else {
                			$("#submit2-btn").attr("disabled",true);
                		}
                		var price = self._rmoney($("#fund-balance").text());
                		if (Number(price)>=Number(msg.budgetAmt)){
                			$("#total-span").css("color","red");
                			$("#submit2-btn").attr("disabled",false);
                		} else {
                			$("#total-span").css("color","green");
                			$("#submit2-btn").attr("disabled",true);
                		}
                	} else if(msg.code=='99'){
                		self.ui.peopleSpan.text('');
                		self.ui.totalSpan.text('');
                		self.ui.averageSpan.text('');
                		self.ui.calResult2.addClass("hide");
                		var messageModal = new MessageModal({
                            model: '文件类型或数据出错！'
                        });
                	}
                }
        	})
        	return false;
        },
        
        _getOrgIds:function(){
        	var orgChecknodes = this.ui.departTree.treeview('getChecked');
        	var ids = new Array();
        	$(orgChecknodes).each(function(){
        		ids.push(this.orgCode);
        	});
        	return ids.join();
        },
        
        _getJobIds:function(){
        	var jobs = this.ui.roleSelect.val();
        	if (jobs&&jobs.length>0){
        		jobs = jobs.join();
        	}
        	return jobs;
        },
        
        _updateOrg:function(){
        	var orgChecknodes = this.ui.departTree.treeview('getChecked');
        	if (orgChecknodes.length>0){
            	$("#org").val("1");
            	$('#distribute1-form').data('bootstrapValidator').updateStatus('org', 'NOT_VALIDATED').validateField('org');
        	} else if (orgChecknodes.length==0){
        		$("#org").val("");
            	$('#distribute1-form').data('bootstrapValidator').updateStatus('org', 'VALIDATED').validateField('org');
        	}
        },
        
        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['distribute','福利发放']);
            this.model = new NavModel();	
        },

        onRender: function(){
        	var self = this;
            this.$el.find(".input-group.date").datepicker({
            	autoclose: true,
            	clearBtn: true,
            	language: 'zh-CN',
            	format:'yyyy/mm/dd'
            });
            this.model.fetch({
                data: {
                    serviceId: 4000330000001029,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){

                	$('#depart-tree').treeview({
                     	data: JSON.stringify(msg.treeData),
		                levels: 1,
		                showIcon: true,
		                showCheckbox: true,
		                showBorder: false,
		                onNodeChecked: function(event, node) {
		                	self.$el.find('#depart-tree').treeview('addCheck2', node);
		                	setTimeout(function(){
                                self._updateOrg();
                            },0);
		                },
		                onNodeUnchecked: function (event, node) {
		                	self.$el.find('#depart-tree').treeview('removeCheck2', node);
		                	setTimeout(function(){
                                self._updateOrg();
                            },0);
		                }
                	});
                	self.$el.find('#fund-balance').text(numeral(msg.fundBalance).format('0,0.00'));
                	self.$el.find('#fund-balance2').text(numeral(msg.fundBalance).format('0,0.00'));
                }
            });
            //填写职务
            this.model.fetch({
          		data: {
                       serviceId: 4000330000001014,
                       t: new Date().valueOf(),
          		 },
          		 reset: true,
          		 success: function(model,msg){
          			 if (msg.employes){
		            	 if (msg.employes[0]&&msg.employes[0].dictionarys){
		            		 $(msg.employes[0].dictionarys).each(function(){
		                		   self.$el.find('#gender').append("<option value='"+this.code+"'>"+this.name+"</option>");
			                  });
		            	 }
		            	 if (msg.employes[1]&&msg.employes[1].dictionarys){
			                   $(msg.employes[1].dictionarys).each(function(){
			                  		self.$el.find('#role-select').append("<option value='"+this.code+"'>"+this.name+"</option>");
			                   });
			                   $('#role-select').chosen();
		            	 }
          			 }
	            	
               }
          	});
            setTimeout(function(){
                self._validator();
            },0)
        },
        
        _rmoney:function(s) { 
        	return parseFloat(s.replace(/[^\d\.-]/g, "")); 
        },
        
        _validator: function(e){
        	var self = this;
        	 this.$el.find('#distribute2-form').bootstrapValidator({
 	            message: 'This value is not valid',
 	            feedbackIcons: {
 	                valid: 'glyphicon glyphicon-ok',
 	                invalid: 'glyphicon glyphicon-remove',
 	                validating: 'glyphicon glyphicon-refresh'
 	            },
 	            fields: {
 	                info2: {
 	                    validators: {
 	                        notEmpty: {
 	                            message: '说明不能为空。'
 	                        },
 	                        stringLength: { 
 	                            min: 1, 
 	                            max: 40, 
 	                            message: '说明必须大于1个字符，小于40个字符。' 
 	                        }
 	                    }
 	                }
 	            }
        	 }).on('error.validator.bv', function(e) {
 	        	$("#submit2-btn").attr("disabled",true);
        	 });
        	
        	
	        this.$el.find('#distribute1-form').bootstrapValidator({
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
	                        }
	                    }
	                },
	                price: {
	                	validators: { 
	                		numeric:{
	                			message: '必须是数字。'
	                		},
	                		notEmpty: {
	                            message: '金额不能为空。'
	                        },
	                        between:{
	                        	min:0.001,
	                        	max:10000000000000000,
	                        	message:'金额必须必须大于0元,小于10000000000000000元'
	                        }
	                	}
	                },
	                org:{
	                	validators: {
	                        notEmpty: {
	                            message: '请至少一个组织'
	                        }
	                    }
	                }
	            }
	        }).on('error.validator.bv', function(e) {
	        	$("#submit-btn").attr("disabled",true);
	        }).on('success.form.bv', function(e) {
	     		e.preventDefault();
	     		var url = window.getApi('/getService.do?serviceId=4000330000001015');
		        $.ajax({  
		            url : url,  
		            type:'POST',  
		            data:{
		            	singlePrice:self.ui.price.val(),
	                    org_code:self._getOrgIds(),
	                    job:self._getJobIds(),
	                    gender:self.ui.gender.val(),
	                    hire_date:self.ui.joinDate.val()
		            },  
		            async: false,  
		            cache: false,  
		            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
			        success: function(msg){
			        	if(msg.code=='00'){
	                		self.ui.peopleCount.text(msg.peopleCount);
	                    	self.ui.budgetAmt.text(msg.budgetAmt);
	                    	self.ui.calResult.removeClass("hide");
	                		if (msg.peopleCount>0){
	                			$("#submit-btn").attr("disabled",false);
	                			var price = self._rmoney($("#fund-balance").text());
		                		if (Number(price)>=Number(msg.budgetAmt)){
		                			$("#submit-btn").attr("disabled",false);
		                			$("#budget-amt").css("color","red");
		                		} else {
		                			$("#budget-amt").css("color","green");
		                			$("#submit-btn").attr("disabled",true);
		                		}
	                		} else {
	                			$("#submit-btn").attr("disabled",true);
	                		}
	                	}
	                	$("#cal-btn").attr("disabled",false);
			        }
		        });
	     	});
        }
    });
});
