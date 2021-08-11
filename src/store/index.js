import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var initialState = {
  status: {
    initialized: false,
    // Think about using a HttpOnly cookie, or a one time use refresh JWT instead of storing active token in local storage.
    loggedIn: localStorage.getItem("d11-token") !== null
  },
  current: {
    season: null
  },
  cache: {
    teams: [],
    d11Teams: []
  }
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loggedIn(state, authentication) {
      localStorage.setItem("d11-token", JSON.stringify(authentication.jwt));
      localStorage.setItem("d11-team", JSON.stringify(authentication.d11Team));
      localStorage.setItem(
        "d11-authorities",
        JSON.stringify(authentication.authorities)
      );
      state.status.loggedIn = true;
    },
    loggedOut(state) {
      localStorage.removeItem("d11-token");
      localStorage.removeItem("d11-team");
      state.status.loggedIn = false;
    },
    initialized(state, current) {
      localStorage.setItem("currentSeason", JSON.stringify(current.season));
      localStorage.setItem(
        "currentTransferWindow",
        JSON.stringify(current.transferWindow)
      );
      localStorage.setItem(
        "currentTransferDay",
        JSON.stringify(current.transferDay)
      );
      state.current.season = current.season;
      state.current.transferWndow = current.transferWndow;
      state.current.transferDay = current.transferDay;
      state.cache.teams = current.teams;
      state.cache.d11Teams = current.d11Teams;
      state.cache.positions = current.positions;
      state.cache.countries = current.countries;
      state.cache.currentD11Teams = current.currentD11Teams;
      state.status.initialized = true;
    }
  },
  actions: {
    login({ commit }, authentication) {
      commit("loggedIn", authentication);
    },
    logout({ commit }) {
      commit("loggedOut");
    },
    initialize({ commit }, current) {
      commit("initialized", current);
    }
  },
  modules: {},
  getters: {
    initialized: state => {
      return state.status.initialized;
    },
    currentSeason: state => {
      return state.current.season;
    },
    currentTransferWindow: state => {
      return state.current.transferWndow;
    },
    teams: state => {
      return state.cache.teams;
    },
    d11Teams: state => {
      return state.cache.d11Teams;
    },
    positions: state => {
      return state.cache.positions;
    },
    countries: state => {
      return state.cache.countries;
    }
  }
});
