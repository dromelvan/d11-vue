import D11BootApi from "./d11BootApi";

const CountryService = {
  async getCountries() {
    try {
      let countryApi = new D11BootApi.CountryApi();
      D11BootApi.setApiBasePath();
      const response = countryApi.findAllCountries();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default CountryService;
