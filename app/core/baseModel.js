define([
    'lodash',
    'marionette',

], function(_, Marionette) {
    'use strict';

    return Backbone.Model.extend({
        url: window.getApi('/login.do'),

        parse: function(res) {
            return (res.code === '00') ? res : {message:'error'};
        }
    });

});