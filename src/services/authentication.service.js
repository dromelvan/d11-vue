import D11BootApi from "./d11BootApi";
import store from "@/store/index";

const AuthenticationService = {
  async login(credentials) {
    try {
      let authenticationApi = new D11BootApi.AuthenticationApi();
      D11BootApi.setApiBasePath();
      const response = await authenticationApi.authenticate(credentials);
      store.dispatch("login", response);
      return Promise.resolve(response);
    } catch (error) {
      store.dispatch("logout");
      return Promise.reject(error);
    }
  },
  async signUp(userRegistration) {
    try {
      let userApi = new D11BootApi.UserApi();
      D11BootApi.setApiBasePath();
      const response = await userApi.createUser({
        name: userRegistration.name,
        email: userRegistration.email,
        password: userRegistration.password,
        repeatedPassword: userRegistration.confirmPassword
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async changePassword(userRegistration) {
    try {
      let userApi = new D11BootApi.UserApi();
      D11BootApi.setApiBasePath();
      D11BootApi.setBearerToken();
      const response = await userApi.updatePassword({
        password: userRegistration.password,
        repeatedPassword: userRegistration.confirmPassword
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout() {
    store.dispatch("logout");
  }
};

export default AuthenticationService;
