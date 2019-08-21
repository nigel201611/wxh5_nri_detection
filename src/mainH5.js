// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './AppH5'
import router from './router'
import utils from './utils/util.js'
import store from './store'
import 'lib-flexible/flexible'
import { Cell, CellGroup, Uploader, Field, Icon, Loading, Overlay, Button, Row, Col, Toast } from 'vant';

window.storeLocal = utils.storeLocal;
window.storeSession = utils.storeSession;

Vue.use(Row).use(Col);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Loading);
Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Uploader)
Vue.use(Field);
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.mixin({
  data() {
    return {
      service: '', // 服务
      router: '/', // 路由路径
      imgSrc: '' // 图片路径
    }
  },
  methods: {
    newroot() {
      return this.$route
    },
    navigatePageTo(url) {
      this.$router.push(url)
    },
    reLaunchPageTo(url) {
      this.$router.replace(url)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
