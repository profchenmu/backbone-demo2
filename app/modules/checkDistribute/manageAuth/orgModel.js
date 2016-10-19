define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

		defaults: {
			orgs:[
               {
                 text: '一级组织',
                 href: '#parent1',
                 tags: ['4'],
                 nodes: [
                   {
                     text: '二级组织',
                     href: '#child1',
                     tags: ['2'],
                     nodes: [
                       {
                         text: '三级组织',
                         href: '#grandchild1',
                         tags: ['1']
                       },
                       {
                         text: '三级组织',
                         href: '#grandchild2',
                         tags: ['1']
                       }
                     ]
                   },
                   {
                        text: '二级组织',
                        href: '#child2',
                        tags: ['0']
                      },
                      {
                        text: '二级组织',
                        href: '#child3',
                        tags: ['0']
                      },
                      {
                        text: '二级组织',
                        href: '#child4',
                        tags: ['0']
                      }
                 ]
               },
             ]
		},

        // idAttribute: 'id',

        // urlRoot: window.getapi('rrp', '/news'),
    });

});