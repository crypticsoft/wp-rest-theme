import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(require('vue-resource'));
Vue.use(VueRouter);

import Posts from './posts.vue'
import Post from './post.vue'
Vue.component('Post', Post)
import Page from './page.vue'
Vue.component('Page', Page)
import Header from './theme-header.vue'
Vue.component('theme-header', Header)
import Footer from './theme-footer.vue'
Vue.component('theme-footer', Footer)

var routes = [{
  path: wp.base_path,
  component: Vue.component('Posts', Posts)
}];

for (var key in wp.routes) {
    var route = wp.routes[key];
    routes.push({
      path: wp.base_path + route.slug + '/',
      component: Vue.component(capitalize(route.type)),
      meta: {
        postId: route.id
      }
    });
}

var router = new VueRouter({
    routes: routes,
    mode: 'history'
});

var App = new Vue({
    router: router,
    //render: h => h('router-view'), // runtime-only build
    // Router View: use <keep-alive> with router-view for caching: https://router.vuejs.org/en/api/router-view.html
    template: '<div><theme-header></theme-header>' +
              '<div class="container"><router-view></router-view></div>' +
              '<theme-footer></theme-footer></div>',

    mounted() {
        this.updateTitle('');
    },

    methods: {
        updateTitle(pageTitle) {
            document.title = (pageTitle ? pageTitle + ' - ' : '') + wp.site_name;
        }
    }
});

/* watch for $emit events */
App.$on('page-title', function (title) {
  this.updateTitle(title);
})
/* mount the app */
App.$mount('#app')

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
