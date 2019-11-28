import { BackendApiService } from '../BackendApi';
import { AxiosInstance } from 'axios';
import { sampleQuery } from './fixtures/sampleQuery';
import mockAxios from 'jest-mock-axios';

describe('BackendApi Service', () => {
  let backendApi: BackendApiService<AxiosInstance>;

  describe('getOffersSearch', () => {
    beforeEach(() => {
      backendApi = new BackendApiService((<unknown>mockAxios) as AxiosInstance);
      mockAxios.reset();
    });

    it('calls the clients get method once, with the correct query string', async done => {
      backendApi.getOffersSearch(sampleQuery);
      await expect(mockAxios.get).toHaveBeenCalledWith('search', { params: sampleQuery });
      await expect(mockAxios.get).toBeCalledTimes(1);
      done();
    });
  });
});
