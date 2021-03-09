// Provides access to a D11 api variable than can be used to create service apis.
// The base path of the ApiClient will be set to window.location with port number - 1.
export default {
  install(Vue) {
    const d11BootApi = require("d11-boot-api");
    d11BootApi.ApiClient.instance.basePath =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      (parseInt(window.location.port) - 1);
    Vue.prototype.$d11BootApi = d11BootApi;
  }
};
