define([
    'marionette',
    'backbone.radio',
    './destroyModalView.tpl'
], function(Marionette, Radio, template) {
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
            this.stat = this.model.get('stat');
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
            var self = this,
                changeStat = self.stat===1 ? 2 : 1;
            e.preventDefault();

            $.ajax({
                url: window.getApi('/getService.do'),
                data: {
                    serviceId: 4000330000001028,
                    userId: self.model.id,
                    stat: changeStat,
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