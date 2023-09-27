import D11BootApi from "./d11BootApi";
import store from "@/store/index";

const AuthenticationService = {
  async login(credentials) {
    try {
      const response = await new D11BootApi.AuthenticationApi().authenticate(
        credentials
      );
      store.dispatch("login", response);
      return Promise.resolve(response);
    } catch (error) {
      store.dispatch("logout");
      return Promise.reject(error);
    }
  },
  async signUp(userRegistration) {
    try {
      const response = await new D11BootApi.UserApi().createUser({
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
      D11BootApi.setBearerToken();
      const response = await new D11BootApi.UserApi().updatePassword({
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
