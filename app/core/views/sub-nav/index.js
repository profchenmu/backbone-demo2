define([
    'lodash',
    'marionette',
    'core/navModel',
    'backbone.radio',
    'application',
    './data.json',
    './nav.tpl'

], function(_, Marionette, NavModel, Radio, App, data, Nav){
    return Marionette.LayoutView.extend({
        tagName: 'ul',

        className: 'nav',

        template: false,

        events: {
            'click a': '_preventDefault'
        },


        initialize: function() {
            this.navModel = new NavModel();            
            
            this.channel = Radio.channel('subNav');
            this.configureEvents();

        },

        onRender: function(){
            var self = this;
            if(window.sessionStorage.getItem('menuGroups')===null){
                App.menuGroups = ['index'];
                // App.menuGroups = ['index', 'check_devide', 'check_distribute'];
                App.subGroups = [];
                this.navModel = new NavModel();

                this.navModel.fetch({
                    data: {
                        serviceId: 4000330000001001,
                        t: new Date().valueOf()
                    },
                    reset: true,
                    success: function(model,msg){
                        console.log(msg);
                        $('#main').removeClass('no-logged');
                        var childrens = model.get('children');
                        _.each(model.get('children'), function(e){
                            if(e.hidden===false){
                                App.menuGroups.push(e.name);
                                if(e.children){
                                    var menuSub = {
                                        name: e.name,
                                        children: []
                                    };
                                    _.each(e.children, function(f){
                                        if(f.hidden===false){
                                            menuSub.children.push(f.name);
                                        }
                                    });
                                    App.subGroups.push(menuSub);
                                }
                            }
                        });
                        self.navModel.fetch({
                            reset: true,
                            data: {
                                serviceId: 4000330000001002,
                                t: new Date().valueOf(),
                            },
                            success: function(model, msg){
                                if(msg.code==='00'){
                                    var btnAuthTemp = msg.button_auth;
                                    
                                    window.sessionStorage.setItem('btnAuth', btnAuthTemp);
                                    App.btnAuth = btnAuthTemp;

                                    window.sessionStorage.setItem('menuGroups', App.menuGroups);
                                    window.sessionStorage.setItem('subGroups', JSON.stringify(App.subGroups));
                                    self._checkMenus();
                                    self._renderSubNav();
                                    

                                }
                            }
                        });
                        
                    }
                });

            }else{
                App.menuGroups = window.sessionStorage.getItem('menuGroups').split(',');
                self._renderSubNav();
                self._checkMenus();
                App.btnAuth = window.sessionStorage.getItem('btnAuth');
            }
        },

        _checkMenus: function(){
            if(window.sessionStorage.getItem('menuGroups')){
                var menuNow = window.sessionStorage.getItem('menuGroups').split(',');
                if(menuNow.length>0){
                    Radio.channel('heada').trigger('aaa', [menuNow[0],'']);
                    App.Router.navigate( menuNow[0], {
                        trigger: true
                    });
                }else{
                    App.Router.navigate( 'login', {
                        trigger: true
                    });
                }
            }
        },

        configureEvents: function() {
            // this.channel.on('render', this._renderSubNav, this);
            this.channel.on('focus', this._focusSubNav, this);
            // this.channel.on('reminder.add', this._addReminder, this);
            // this.channel.on('reminder.remove', this._removeReminder, this);
        },

        _focusSubNav: function(name) {
            if (name) {
                var $item = this.$el.find('a[data-href=' + name + ']'),
                    info = $item.text(),
                    title = name,
                    desc = $item.data('desc');

                this.$el.find('.menu-item').removeClass('active');
                $item.addClass('active');
                Radio.channel('heada').trigger('aaa', [title,desc]);
            }
        },

        _preventDefault: function(e){
            var $item = $(e.currentTarget),
                info = $item.text(),
                title = $item.data('href'),
                desc = $item.data('desc');
            this.$el.find('.menu-item').removeClass('active');
            $item.addClass('active');
            e.preventDefault();
            Radio.channel('heada').trigger('aaa', [title,desc]);
        },

        _renderSubNav: function() {
            var self = this;
            var mainRouteNames = ['index', 'manage', 'devide', 'distribute', 'disinfos', 'devinfos', 'auth', 'manage/addUser', 'empinfo', 'empinfo/upload', 'check_devide', 'check_distribute'];
            var disabledItems = _.difference(mainRouteNames, App.menuGroups);
            App.disabledItems = disabledItems;
            
            var dataTemp = $.extend(true, {}, data);


            _.each(App.disabledItems, function(e,i,l){
                _.remove(dataTemp.menu, function(f) {
                    return f.name === e; 
                });
            });

            var menu = dataTemp.menu;
                // var groups = _.groupBy(menu, function(item){
                //     return item.group || 1;
                // });

                // var group = _.result(_.find(menu[name], function(n){
                //     return n.name === subName;
                // }), 'group') || 1;
            self.$el.empty();
            self.name = name;
            // self.group = group;
            _.each(menu, function(item, i){
                item.index = i;
                // self.$el.append('<li data-name="'+ item.url + '"><a class="menu-item" href="'+item.url+'" data-href="'+item.url+'">'+item.title+'</a></li>');
                self.$el.append(Nav(item));

            });


        },
    });
});

