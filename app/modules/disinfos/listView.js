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
            pages: '.table-pagenation'
        },

        childView: ItemView,

        childViewContainer: '#list-detail',

        onRender: function(){
            this._renderUsers();
        },

        initialize: function() {
            var self = this;
            this.pageSize = 6;
            this.pageNow = 1;
            this.collection = new UsersCollection();
            
        },

        _renderUsers: function(){
            var self = this;
            if (this.fetchRequest) {
                this.fetchRequest.abort();
                this.fetchRequest = null;
            }
            this.fetchRequest = this.collection.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001004,
                    t: new Date().valueOf(),
                    page: 1,
                    rows: self.pageSize
                },
                success: function(models, msg){
                    var data = msg;
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    if(data.total>self.pageSize){
                        self._initPagination(msg);
                    }
                }
            });
        },

        _initPagination: function(data) {
            var self = this,
                pageSize = self.pageSize,
                total = data.total;

            $('.table-pagenation').pagination({
                items: total,
                itemsOnPage: pageSize,
                prevText: '<b class="caret-left">上一页</b>',
                nextText: '<b class="caret-right">下一页</b>',
                displayedPages: 4,
                onPageClick: function(pageNumber, e) {
                    e.preventDefault();
                    self._renderPage(pageNumber);
                }
            });
        },

        _renderPage: function(pageNumber) {
            var self = this;
            this.pageNow = pageNumber;

            return this.collection.fetch({
                data: {
                    serviceId: 4000330000001004,
                    t: new Date().valueOf(),
                    page: self.pageNow,
                    rows: self.pageSize
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