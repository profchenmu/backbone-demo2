define([
	'lodash',
	'./loading.tpl'
], function(_, loadingTpl) {
	'use strict';
	return {
		isLoading: false,

	    start: function(wrapper, text, name) {
	        wrapper = wrapper || $('body');
	        wrapper.find('.loading').remove();

	        var loadingEl = loadingTpl();

	        if (name) {
	            $(loadingEl).addClass('loading-' + name);
	        }
	        if (_.isString(text)) {
	            $(loadingEl).find('p').text(text);
	        }

	        wrapper.append(loadingEl);

	        this.isLoading = true;
	    },

	    end: function(name) {
	        var loadingEl = $('.loading');
	        // if (name) {
	        //     loadingEl = loadingEl.find('.loading-' + name);
	        // }
	        loadingEl.remove();

	        this.isLoading = false;
	    }
	};
    
});
