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
            'click #reload-img': '_reloadImg'
            // 'shown.bs.modal': '_shownModal'
        },

        ui: {
            'imageAuth': '#image-auth'
        },

        initialize: function() {
            this.render();
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
            this.ui.imageAuth.attr('src','');
            
        },

        _reloadImg: function(){
            this.ui.imageAuth.attr('src','');
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});