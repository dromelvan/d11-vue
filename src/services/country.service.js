import D11BootApi from "./d11BootApi";

const CountryService = {
  async getCountries() {
    try {
      const response = new D11BootApi.CountryApi().findAllCountries();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default CountryService;
