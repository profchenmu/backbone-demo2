'use strict';
import Backbone from 'backbone';
import Marionette from 'marionette';

var App = new Marionette.Application();

App.addRegions({
	body: '#main'
});

App.on('start', function(){
    Backbone.history.start({
        pushState: false,
        root: '/'
    });
});


export default App;
