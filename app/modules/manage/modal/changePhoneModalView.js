define([
    'marionette',
    'backbone.radio',
    './changePhoneModalView.tpl'
], function(Marionette, Radio, template) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth',
            'shown.bs.modal': '_shownModal',
            'success.form.bv': '_sendChange'
        },

        template: template,

        ui: {
            'imageAuth': '#image-auth',
            'changePhoneForm': '#change-phone-form',
            'newPhoneNum': '#new-phone-num',
            'code': '#code',
            'errorMsg': '#error-msg'
        },

        initialize: function() {
            // this.promise = $.Deferred();
            this.render();
            this.id = this.model.id;
        },

        _updateImageAuth: function(){
            this.timestamp = Math.round(new Date().getTime());
            this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp='+this.timestamp); 
        },

        serializeData: function() {
            var name = this.model.get('name');
            var data = {
                name: name
            };
            return data;
        },

        _sendChange: function(e){
            
            
        },

        _shownModal: function(){
            var self = this;
            
        },

        onRender: function(){   
            this.$el.modal({
                show: true
                // backdrop: true
            });
            this._updateImageAuth();
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});