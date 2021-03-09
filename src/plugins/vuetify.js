import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#000A3C",
        anchor: "#000000",
        highlight: "#597090"
      },
      dark: {
        primary: "#000A3C"
      }
    }
  }
});
