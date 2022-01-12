import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../pages/Home')
  },
  {
    path: '/market',
    component: () => import('../pages/MarketView')
  },
  {
    path: '/market/swap',
    component: () => import('../pages/MarketSwap')
  },
  {
    path: '/market/pool',
    component: () => import('../pages/MarketPool')
  },
  {
    path: '/asset',
    component: () => import('../pages/AssetView')
  },
  {
    path: '/doc',
    component: () => import('../pages/DocView')
  }
];

var router = new VueRouter({
  mode: 'history',
  routes
});

export default router;