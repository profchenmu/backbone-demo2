define([
    'lodash',
    'marionette',
    'application',
    'backbone.radio',
    './listView.tpl',
    './itemView',
    './users',
    'vendor/jquery-simplePagination'
], function(_, Marionette, App, Radio, listViewTpl, ItemView, UsersCollection) {
    'use strict';

    return Marionette.CompositeView.extend({

        className: 'user-list',

        template: listViewTpl,

        regions: {
            'listDetail': '#list-header'
        },

        ui: {
            pages: '.table-pagenation',
            userName: '#search-username',
            phone: '#search-phone',
            searchForm: '#search-bar-form',
            addUser: '#addUser'
        },

        events: {
            'submit #search-bar-form': '_search',
            'click #reset-btn': '_reset',
            'click #addUser': '_addUser'
            // 'blur #search-phone': '_reset2',
            // 'blur #search-username': '_reset2'
        },

        childView: ItemView,

        childViewContainer: '#list-detail',

        onRender: function(){
            var self = this;
            this._renderUsers();
        },

        onShow: function(){
            
        },

        _addUser: function(e){
            App.Router.navigate('manage/addUser', {
                trigger: true
            });
        },

        initialize: function() {
            var self = this;
            this.pageSize = 10;
            this.collection = new UsersCollection();
            this.userName = '';
            this.phone = '';
            this.authBtn = (window.sessionStorage.getItem('btnAuth')).split(',');
            this.addUserBtn = this.authBtn.indexOf('4000330000001011')<0 ? false : true;
            Radio.channel('listChange').on('reset', function(e){
                self._renderPage();
            });
        },

        serializeData: function() {
            var data = {};
            data.addUserBtn = this.addUserBtn;
            return data;
        },

        _reset2: function(){
            this.ui.searchForm.data('bootstrapValidator').resetForm();
        },

        _reset: function(){
            this.userName = '',
            this.phone = '';
            this._renderUsers();
            this.ui.searchForm.data('bootstrapValidator').resetForm();
            this.ui.userName.val('');
            this.ui.phone.val('');
        },

        _renderUsers: function(){
            var self = this;
            self.pageNow = 1;
            if (self.fetchRequest) {
                self.fetchRequest.abort();
                self.fetchRequest = null;
            }

            self.fetchRequest = self.collection.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001027,
                    t: new Date().valueOf(),
                    page: 1,
                    rows: self.pageSize,
                    phone: self.phone,
                    userName: self.userName
                },
                success: function(models, msg){
                    var data = msg.data;
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    if(data.totalCount>self.pageSize){
                        self._initPagination(data);
                    }else{
                        $('.table-pagenation2').empty();
                    }
                }
            });
        },

        _initPagination: function(data) {
            var self = this,
                pageSize = self.pageSize,
                total = data.totalCount;

            $('.table-pagenation2').pagination({
                items: total,
                itemsOnPage: pageSize,
                prevText: '<b class="caret-left">上一页</b>',
                nextText: '<b class="caret-right">下一页</b>',
                displayedPages: 4,
                onPageClick: function(pageNumber, e) {
                    e.preventDefault();
                    self.pageNow = pageNumber;
                    self._renderPage();
                }
            });
        },

        _renderPage: function() {
            var self = this;
            this.collection.fetch({
                data: {
                    serviceId: 4000330000001027,
                    t: new Date().valueOf(),
                    page: self.pageNow,
                    rows: self.pageSize,
                    phone: self.phone,
                    userName: self.userName
                },
                success: function(model,msg) {
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                },
                reset: true
            });
        },

    });

});