import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2Filters from "vue2-filters";
import d11BootApi from "./plugins/d11BootApi";
import d11Mapper from "./plugins/d11Mapper";
import d11Mixin from "./mixins/d11Mixin";

import "@/scss/d11.scss";

Vue.config.productionTip = false;

Vue.use(d11BootApi);
Vue.use(d11Mapper);
Vue.use(Vue2Filters);
Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.mixin(d11Mixin);
