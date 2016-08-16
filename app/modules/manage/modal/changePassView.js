define([
    'marionette',
    'backbone.radio',
    './changePassView.tpl',
    'application'
], function(Marionette, Radio, template, App) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click .confirm': '_confirm'
            // 'shown.bs.modal': '_shownModal'
        },

        initialize: function() {
            this.render();
            this.id = this.model.id;
        },

        template: template,

        serializeData: function() {
            var data = this.model.toJSON();
            return data;
        },

        onRender: function(){           
            this.$el.modal({
                show: true
                // backdrop: true
            });
        },

        _confirm: function(e){
            var self = this;
            e.preventDefault();

            $.ajax({
                url: window.getApi('/getService.do'),
                data: {
                    serviceId: 4000330000001026,
                    userId: self.model.id,
                    t: new Date().valueOf()
                },
                success: function(res){                    
                    if(res.code === '00'){
                        Radio.channel('listChange').trigger('reset');
                    }else if(res.code === '101'){

                        App.Router.navigate('login', {
                            trigger: true
                        });
                        window.sessionStorage.clear();
                        return false;
                        
                    }
                }
            }).always(function(){
                self.$el.modal('hide');
            });
             
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});