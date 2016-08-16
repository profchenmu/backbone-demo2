define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'id',

        // urlRoot: window.getApi('/getService.do'),

        defaults: {
        	benefitAmount: '',
        	benefitName: '',
        	failCount: '',
        	id: '',
        	remark: '',
        	status: '',
        	submitDateStr: '',
        	sucNum: '',
        	successDateStr: '',
        	totalNum: '',
            employeName: '',
            message: ''
        }
    });

});