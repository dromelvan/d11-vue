// Provides access to a D11 api variable than can be used to create service apis.
const D11BootApi = require("d11-boot-api");
const apiBasePath = process.env.VUE_APP_API_BASE_URL;

D11BootApi.ApiClient.instance.basePath =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  (parseInt(window.location.port) - 2);

D11BootApi.setBearerToken = function() {
  D11BootApi.ApiClient.instance.authentications[
    "BearerAuth"
  ].accessToken = JSON.parse(localStorage.getItem("d11-token"));
};

D11BootApi.clearBearerToken = function() {
  D11BootApi.ApiClient.instance.authentications["BearerAuth"].accessToken = "";
};

D11BootApi.setApiBasePath = function() {
  D11BootApi.ApiClient.instance.basePath = apiBasePath;
};

export default D11BootApi;
