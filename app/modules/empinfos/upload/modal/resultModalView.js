define([
    'marionette',
    'share/modal',
    './resultModalView.tpl',
    'application'
], function(Marionette, Modal, template, App) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',
        
        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #confirm-button': '_submit',
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
        },

        template: template,

        serializeData: function() {
        	var data = {
        		message:this.model.message,
                batchId: this.model.batchId
            };
            return data;
        },

        onRender: function(){    
            this.$el.modal({
                show: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
        },
        
        _submit:function(){
        	 this.$el.modal('hide');
        	App.Router.navigate('empinfo', {
                trigger: true
            });
        }
    });
});