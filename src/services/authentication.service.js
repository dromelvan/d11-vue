import D11BootApi from "./d11BootApi";
import store from "@/store/index";

const AuthenticationService = {
  async login(credentials) {
    try {
      const response = await new D11BootApi.AuthenticationApi().authenticate(
        credentials.username,
        credentials.password
      );
      store.dispatch("login", response);
      return Promise.resolve(response);
    } catch (error) {
      store.dispatch("logout");
      return Promise.reject(error);
    }
  },
  logout() {
    store.dispatch("logout");
  }
};

export default AuthenticationService;
