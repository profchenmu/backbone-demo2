define([
    'lodash',
    'marionette',
    'backbone.radio',
    'core/navModel',
    './logged.tpl',
    'application',
    'core/views/sub-nav/index'
], function(_, Marionette, Radio, NavModel, LoggedTpl, App, NavView){
    return Marionette.LayoutView.extend({

        regions: {
            'subNav': '.root-sub-nav',
            'main': '.main-right'
        },

        ui: {
            'title': '#title',
        },

        template: LoggedTpl,

        initialize: function() {
            // $('#main').attr('class','index');
            // $('#title').text('平台首页');
            Radio.channel('heada').on('aaa', this._changeTitle);
            // this._configureEvents();
            this.authModel = new NavModel();
        },

        _changeTitle: function(a){
            $('#main').attr('class', a[0]);
            // $('#title').text(a[1]);
            $('.nav').find('.menu-item').removeClass('active');
            $('.nav').find('.menu-item[data-href="'+ a[0] +'"]').addClass('active');
        },

        onRender: function() {
            var self = this;
            console.log(App);
            this.getRegion('subNav').show(new NavView());
        },

    });
});