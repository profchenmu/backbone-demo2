define([
    'lodash',
    'marionette',
    'share/modal',
    './rolesModalView.tpl',
], function(_, Marionette, Modal, template) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
        },

        initialize: function() {
            this.render();
        },

        template: template,

        serializeData: function() {
            var data = this.model.toJSON();
            return this._initData(data);
        },

        _initData: function(data){
        	if (data.type.indexOf('2')>=0){
        		var rule = JSON.parse(data.ruleContent);
        		var pos=rule.orgname.lastIndexOf("\\");
        		data.orgname = rule.orgname.substring(pos+1);
        		data.url = window.getApi('/download.do?fname=')+rule.fname+'&orgname='+data.orgname;
        		data.job='';
        		data.gender='';
        		data.joindate=''
        		data.amount='';
        		data.orgName='';
        		return data;
        	}
        	if (data.type.indexOf('1')>=0){
        		data.orgname = '';
        		data.url='';
	        	var rule = JSON.parse(data.ruleContent);
	        	data.orgName = rule.org_name.toString();
	        	//转换职能
	        	var job = '';
	        	if (rule.job&&rule.job.length>0){
	        		var jobs = new Array();
	        		var ruleJobs = rule.job.split(",");
	        		$.each(ruleJobs,function(i,jobid){
	        			$.each(data[1].dictionarys,function(p,dict){
	        				if (jobid==dict.code){
	        					jobs.push(dict.name);
	        				}
	        			})
	        		});
	        		job = jobs.join();
	        	}
	        	data.job = job;
	        	//转换性别
	        	var gender = '';
	        	if (rule.gender&&rule.gender!=''){
		        	$.each(data[0].dictionarys,function(p,dict){
						if (rule.gender==dict.code){
							gender = dict.name;
						}
					})
	        	}
	        	data.gender = gender;
	        	
	        	//入职日期
	        	var joindate = "";
	        	if (rule.joindate&&rule.joindate.length>0){
	        		joindate = rule.joindate + "之前入职";
	        	}	
	        	data.joindate = joindate;
	        	if (!data.amount){
	        		data.amount='';
	        	}
        	}
        	return data;
        },
        
        onRender: function(){           
            this.$el.modal({
                show: true
                // backdrop: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});