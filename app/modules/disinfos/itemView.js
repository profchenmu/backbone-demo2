define([
    'lodash',
    'marionette',
    './modal/rolesModalView',
    './itemView.tpl',
    'core/navModel',
    'numeral'
], function(_, Marionette, RolesModal, ItemViewTpl, ModalModel, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        events: {
            'click #show-roles': '_showRoles'
        },

        initialize: function() {
            this.rolesModel = new ModalModel();
        },
        

        onRender: function(){
            
        },

        serializeData: function() {
            var data = this.model.toJSON(),
                btnAuth = window.sessionStorage.getItem('btnAuth').split(',');
            data.benefitAmount = numeral(data.benefitAmount).format('0,0.00');
            data.sucNum = data.totalNum - data.failCount;
            if(btnAuth.indexOf('4000330000001008')>=0){
                data.showDetails = true;
            }else{
                data.showDetails = false;
            }
            
            if(btnAuth.indexOf('4000330000001014')>=0){
                data.showRoles = true;
            }else{
                data.showRoles = false;
            }
            return data;
        },

        _showRoles: function(){
            var self = this;
            this.rolesModel.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001014,
                    t: new Date().valueOf(),
                },
                success: function(model,msg){
                	self.rolesModel.employes = msg.employes;
                	self.rolesModel.fetch({
                        reset: true,
                        data: {
                             id: self.model.id,
                             serviceId: 4000330000001009,
                             t: new Date().valueOf(),
                        },
                        success: function(model, msg){
                            if(msg.code === '00'){
                                var rolesModal = new RolesModal({
                                     model: self.rolesModel
                                });
                            }
                        }
                    })
                }
            });
        }

    });

});