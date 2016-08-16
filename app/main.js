import '../less/main.less';

define([
	'backbone',
	'application',
	'./router',
	'core/views/root-view/root-view'
],
function ( Backbone, App) {
    'use strict';
	App.start();
});
