import { BackendApiService } from '../BackendApi';
import { AxiosInstance } from 'axios';
import { sampleQuery } from '../types/sampleQuery';
import mockAxios from 'jest-mock-axios';

describe('BackendApi Service', () => {
  let backendApi: BackendApiService<AxiosInstance>;

  describe('getOffersSearch', () => {
    beforeEach(() => {
      backendApi = new BackendApiService((<unknown>mockAxios) as AxiosInstance);
      mockAxios.reset();
    });

    it('calls the clients get method once, with the correct query string', done => {
      const expected =
        'api/search?name=Amilla%20Fushi&lodgings%5B0%5D%5BnumberOfAdults%5D=1&lodgings%5B0%5D%5BrepeatCustomer%5D=false&lodgings%5B0%5D%5Bhoneymoon%5D=true&mealPlanCategories%5B0%5D=BB&filters%5B0%5D=Seaplane%20transfer&starRatings%5B0%5D=5%2B&startDate=2020-01-01&endDate=2020-01-07&priceRange%5Bmin%5D=1&priceRange%5Bmax%5D=100000';
      backendApi.getOffersSearch(sampleQuery);
      expect(mockAxios.get).toHaveBeenCalledWith(expected);
      expect(mockAxios.get).toBeCalledTimes(1);
      done();
    });
  });
});
