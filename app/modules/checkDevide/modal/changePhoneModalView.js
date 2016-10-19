define([
    'marionette',
    'backbone.radio',
    './changePhoneModalView.tpl',
    'vendor/bootstrapValidator'
], function(Marionette, Radio, template) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth',
            'shown.bs.modal': '_shownModal',
            'success.form.bv': '_sendChange'
        },

        template: template,

        ui: {
            'imageAuth': '#image-auth',
            'changePhoneForm': '#change-phone-form',
            'newPhoneNum': '#new-phone-num',
            'code': '#code',
            'errorMsg': '#error-msg'
        },

        initialize: function() {
            // this.promise = $.Deferred();
            this.render();
            this.id = this.model.id;
        },

        _updateImageAuth: function(){
            this.timestamp = Math.round(new Date().getTime());
            this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp='+this.timestamp); 
        },

        serializeData: function() {
            var name = this.model.get('name');
            var data = {
                name: name
            };
            return data;
        },

        _sendChange: function(e){
            
            
        },

        _shownModal: function(){
            var self = this;
            this.ui.changePhoneForm.vendor/bootstrapValidator({
                message: '',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    code: {
                        validators: {
                            notEmpty: {
                                message: '验证码不能为空。'
                            },
                            blank: {}
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '手机号不能为空。'
                            },
                            regexp: { 
                                regexp: /^[1]{1}[3,4,5,8]{1}[0-9]{9}$/,
                                message: '手机号不对'
                            }
                        }
                    }
                }
            })
            .on('success.form.bv', function(e){
                e.preventDefault();
                var code = self.ui.code.val(),
                    phone = self.ui.newPhoneNum.val(),
                    $form = $(e.target),
                    bv = $form.data('vendor/bootstrapValidator');  

                $.ajax({
                    url: window.getApi('/getVcodeService.do'),
                    data: {
                        serviceId: 4000330000001012,
                        phone: phone,
                        userId: self.id,
                        timestamp: self.timestamp,
                        code: self.ui.code.val(),
                        t: new Date().valueOf()
                    },
                    success: function(res){
                        if(res.code === '00'){
                            Radio.channel('listChange').trigger('reset');
                            // self.ui.errorMsg.text('');
                            self.$el.modal('hide');
                        }else if(res.code === '101'){

                            App.Router.navigate('login', {
                                trigger: true
                            });
                            window.sessionStorage.clear();
                            return false;
                        }else{
                            bv.updateMessage('code', 'blank', res.message);
                            bv.updateStatus('code', 'INVALID', 'blank');
                        }
                    }
                });
            });
        },

        onRender: function(){   
            this.$el.modal({
                show: true
                // backdrop: true
            });
            this._updateImageAuth();
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});