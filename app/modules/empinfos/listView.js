define([
    'lodash',
    'marionette',
    'application',
    'backbone.radio',
    './listView.tpl',
    './itemView',
    './users',
    'vendor/jquery-simplePagination',
    'vendor/bootstrap-datepicker'
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
            searchForm: '#search-bar-form',
            sDate: '#s-date',
            eDate: '#e-date',
            nums: '#search-nums',
            errorA: '.error-a',
            searchBtn: '#search-btn'
        },

        childView: ItemView,

        childViewContainer: '#list-detail',

        initialize: function() {
            var self = this;
            self.btnAuth = window.sessionStorage.getItem('btnAuth');
            self.datePickerObj = {
                clearDates: true,
                autoclose: true,
                clearBtn: true,
                language: 'zh-CN',
                todayHighlight: true,
                format: 'yyyy/mm/dd'
            };
            self.canRest = false;
            self.canSearch = true;
            self.pageSize = 10;
            self.pageNow = 1;
            self.sDate = '';
            self.eDate = '';
            self.batchId = '';
            self.collection = new UsersCollection();   
        },

        onRender: function(){
            var self = this;
            
            // if(this.btnAuth.indexOf('4000330000001036')>=0){
                this._renderUsers();
                this.$el.find(".input-daterange").each(function(i,e) {
                    self.datePicker = $(e).datepicker(self.datePickerObj);
                });
            // }
            
        },

        serializeData: function() {
            var self = this;
            var data = {
                showSearch: self.btnAuth.indexOf('4000330000001036')>=0,
                showUp: self.btnAuth.indexOf('4000330000001035')>=0,
                showDetail: self.btnAuth.indexOf('4000330000001037')>=0, 
            }
            return data;
        },

        onShow: function(){

        },

        _emperyError: function(e){
            e.preventDefault();
            var self = this,
                nums = self.ui.searchForm.find('[name="nums"]').val(),
                dates = self.ui.searchForm.find('[name="dates"]').val(),
                $formGroups = self.$el.find('.form-group');

            if(dates==='' && nums===''){
                $formGroups.removeClass('has-success')
                    .addClass('has-error');
                self.ui.errorA.show();
                self.ui.searchBtn.attr('disabled', 'disabled');
            }else{
                $('.form-group-dates').removeClass('has-error');
                self.ui.errorA.hide();
            }
        },

        events: {
            'submit #search-bar-form': '_emperyError',
            'click #reset-btn': '_reset',
            'click #emp-upload': '_empUpload',
            'keyup [name="nums"]': '_emperyError',
            'click input': '_setSearch',
            'success.form.bv': '_submitSearch',
            'changeDate': '_timeChange',
            'clearDate': '_timeClear',
            'changeDate #s-date': '_redate',
            'changeDate #e-date': '_redate2'
        },

        // _redate: function(e){
        //     var self = this,
        //         $eDate = self.$el.find('#e-date'),
        //         $sDate = self.$el.find('#s-date'),
        //         sDate = $sDate.datepicker('getDate').valueOf();
        //         console.log(sDate);
        //     sDate += (24*60*60*1000*365);
        //     var _sDate = new Date(sDate);

        //     var nEndDate = _sDate.getFullYear() + '/' + (_sDate.getMonth()+1) + '/' + (_sDate.getDate());
        //     // var _nYear = sDate.substring(0,4)-0+1,

        //     // console.log(nEndDate);
        //         // nEndDate = sDate.replace(/^[0-9]{4}\//, nYear);
        //     $('#e-date').datepicker('setEndDate', nEndDate);
        // },

        _redate: function(e){
            var self = this,
                $eDate = self.$el.find('#e-date'),
                $sDate = self.$el.find('#s-date'),
                sDate = $sDate.val();
            var nYear = sDate.substring(0,4)-0+1+'/',
                nEndDate = sDate.replace(/^[0-9]{4}\//, nYear);
            $('#e-date').datepicker('setEndDate', nEndDate);
        },

        _redate2: function(e){
            var self = this,
                $eDate = self.$el.find('#e-date'),
                $sDate = self.$el.find('#s-date'),
                eDate = $eDate.val();
            var nYear = eDate.substring(0,4)-1+'/',
                nStartDate = eDate.replace(/^[0-9]{4}\//, nYear);
            $('#s-date').datepicker('setStartDate', nStartDate);
        },

        _submitSearch: function(e){
            var self = this;
            e.preventDefault();
            if(this.canSearch){
                self.sDate = self.ui.sDate.val();
                self.eDate = self.ui.eDate.val();
                self.nums = self.ui.nums.val();
                self._renderUsers();
                self.ui.searchForm.data('bootstrapValidator').resetForm();
                this.canRest = true;
                this.canSearch = false;
            }
            
        },

        _setSearch: function(){
            this.canSearch = true;
        },
        _timeChange: function(){
            var inputs = this.$el.find('.input-daterange input').val(),
                $formGroups = this.$el.find('.form-group'),
                $errorA = this.$el.find('.error-a'),
                $searchBtn = this.ui.searchBtn,
                nums = this.ui.nums.val();
            if(nums.length<=0){
                if(inputs.length>0){
                    $formGroups.removeClass('has-error');
                    $searchBtn.removeAttr('disabled');
                    $errorA.hide();
                }else{
                    $formGroups.addClass('has-error');
                    $errorA.show();
                    $searchBtn.attr('disabled','disabled');
                }
            }else{
                $formGroups.removeClass('has-error');
                $errorA.hide();
                $searchBtn.removeAttr('disabled');
            }
        },
        _timeClear: function(){
            $('.input-daterange input').val('');
        },

        _reset: function(){
            if(this.canRest){
                this.pageNow = 1;
                this.sDate = '';
                this.eDate = '';
                this.nums = '';
                this._renderUsers();
                this.canRest = false;
            }
            this.ui.searchForm.data('bootstrapValidator').resetForm();
            this.$el.find('.form-group').removeClass('has-error');
            this.ui.errorA.hide();
            this.ui.searchForm.find('input').val('');
            
        },


        _empUpload: function(e){
            e.preventDefault();
            App.Router.navigate('empinfo/upload', {
                trigger: true
            });
        },

        _renderUsers: function(){
            var self = this;
            if (this.fetchRequest) {
                this.fetchRequest.abort();
                this.fetchRequest = null;
            }
            this.collection.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001036,
                    t: new Date().valueOf(),
                    pageNo: 1,
                    pageSize: self.pageSize,
                    sDate: self.sDate,
                    eDate: self.eDate,
                    batchId: self.nums
                },
                success: function(models, msg){
                    var data = msg;
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    if(data.totalNum>self.pageSize){
                        self._initPagination(msg);
                    }else{
                        $('.table-pagenation').empty();
                    }
                }
            });
            
        },

        _initPagination: function(data) {
            var self = this,
                pageSize = self.pageSize,
                total = data.totalNum;

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
            this.canRest = true;
            return this.collection.fetch({
                data: {
                    serviceId: 4000330000001036,
                    t: new Date().valueOf(),
                    pageNo: self.pageNow,
                    pageSize: self.pageSize,
                    sDate: self.sDate,
                    eDate: self.eDate,
                    batchId: self.nums
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