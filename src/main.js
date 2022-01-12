import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store';
import {
  Button,
  Collapse,
  CollapseItem,
  Tooltip,
  Slider,
  Input,
  Table,
  TableColumn,
  Switch,
  InputNumber,
  Message
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import router from './router';
import './assets/style/customElement.css';
import YouswapHeader from 'youswap-header';
import CustomButton from 'comp/Button.vue'
import 'utils/number.js'
import VueClipboard from 'vue-clipboard2'

// import vconsole from "vconsole";
// new vconsole();
import { post, get } from './assets/script/http';
import { getContract, getWriteContract, getContractLoad, getWriteContractLoad } from 'utils/contract.js'
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$read = getContract;
Vue.prototype.$write = getWriteContract;
Vue.prototype.$readLoad = getContractLoad;
Vue.prototype.$writeLoad = getWriteContractLoad;
Vue.prototype.$message = Message;

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueClipboard);
const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'en', // set locale
  messages: {
    'zh': require('./lan/zh.js'), // 中文语言包
    'en': require('./lan/en.js') // 英文语言包
  }
});

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tooltip);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(InputNumber);
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(YouswapHeader);
Vue.component('CustomButton', CustomButton)
import './assets/style/customElement.css';
import './assets/style/font.css';

new Vue({
  render: h => h(App),
  i18n,
  router,
  store
}).$mount('#app');
