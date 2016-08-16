define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'id',

        // urlRoot: window.getApi('/getService.do'),

        defaults: {
        	benefitAmount: '',
        	content: '',
        	createdDateStr: '',
        	fundRemitName: '',
        	status: '',
        	sucNum: '',
        	totalAmount: '',
        	updatedDateStr: ''
		}
    });

});