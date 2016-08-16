define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'batchId',

        // urlRoot: window.getApi('/getService.do'),

        defaults: {
        	batchId: '',
            createdDate: '',
            createdDateStr: '',
            processMessage: '',
            updatedDateStr: '',
            ecode: '',
            hireDate: '',
            job: '',
            mobile: '',
            name: '',
            orgId: '',
            gender: '',
            dealMsg: ''
        }
    });

});