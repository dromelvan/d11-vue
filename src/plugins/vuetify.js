import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        brand: "#000A3C",
        anchor: "#000000",
        highlight: "#597090",
        menu: "#000000",
        // Maybe figure out how to make the below work some day.
        //menu: "#000000de"
        menuText: "#FFFFFF"
      },
      dark: {
        brand: "#000A3C",
        anchor: "#000000",
        menu: "#000000",
        //menu: "#000000de"
        menuText: "#FFFFFF"
      }
    }
  }
});
