define([
    'marionette',
    'backbone.radio',

    './modal.tpl'
], function(Marionette, Radio, template) {
    'use strict';

    return Marionette.LayoutView.extend({


        className: 'modal fade modal-full',

        template: template,

        initialize: function() {
        },

        onRender: function() {
            this.$el.modal({
            });
        },
    });

});