define([
    'lodash',
    'marionette',
    'backbone.radio',
    'core/navModel',
    './root-view.tpl',
    'application',
    './logged',
    './modal/editPasswordModalView',
    'modules/no-login/no-logged'
], function(_, Marionette, Radio, NavModel, rootViewTpl, App, LoggedView, EditPasswordModal, NoLogin){
    return Marionette.LayoutView.extend({
        className: 'wrapper',

        regions: {
            'rootView': '.root-view'
        },

        template: rootViewTpl,

        events: {
            'click #logout': 'logout',
            'click #edit-password': '_editPassword'
        },

        ui: {
            'logoutBtn': '#logout'
        },

        initialize: function() {
            var self = this;
            self.authModel = new NavModel();
            App.baseView = this;
            Radio.channel('logout').on('logout',function(){
                self._logoutTemp();
            });
            App.logged = window.sessionStorage.getItem('logged');
        },

        serializeData: function() {
            var data = {
                showPassChange: App.logged
            }
            return data;
        },

        onRender: function() {
            var self = this;
            if(App.logged){
                var logged = new LoggedView();
                this.getRegion('rootView').show(logged);
                App.rootView = logged;
            }else{
                if(window.location.hash === '#login')
                    App.baseView.getRegion('rootView').show(new NoLogin());
                App.Router.navigate('login', {
                    trigger: true
                });
            }
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
        },

        logout: function(){
            var self = this;
            $.ajax({
                url: window.getApi('/loginOut.do?t=' + new Date().valueOf()),
                success: function(){
                    self._logoutTemp();
                }
            });
        },
        
        _editPassword:function(){
            var editPasswordModal = new EditPasswordModal({
                model: self.model
            });
        },

    });
});

