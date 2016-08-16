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
                message: '修改成功'
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
        	 var self = this;
             $.ajax({
                 url: window.getApi('/loginOut.do?t=' + new Date().valueOf()),
                 success: function(){
                     self._logoutTemp();
                 }
             });
        },
        
        _logoutTemp: function(){
            window.sessionStorage.clear();
            App.menuGroups = [];
            App.userName = null;
            App.userGroup = null;
            App.logged = false;
            App.Router.navigate('login', {
                trigger: true
            });
        }

    });
});