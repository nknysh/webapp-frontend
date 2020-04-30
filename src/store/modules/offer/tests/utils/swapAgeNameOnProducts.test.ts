import { swapAgeNameOnProducts } from '../../utils';
import { IOfferProductDiscounts } from 'services/BackendApi';
import uuid from 'uuid';

describe('swapAgeNameOnProducts', () => {
  it('Swaps names', () => {
    const input = {
      Supplement: [
        {
          products: [
            {
              ageNames: ['Foo', 'infant'],
            },
          ],
        },
      ],
    } as IOfferProductDiscounts<any>;

    const output = {
      Supplement: [
        {
          products: [
            {
              ageNames: ['Bar', 'infant'],
            },
          ],
        },
      ],
    };
    const res = swapAgeNameOnProducts(input, 'Foo', 'Bar');
    expect(res).toEqual(output);
  });

  it("Doesn't error wth an empty discount set", () => {
    const res = swapAgeNameOnProducts({}, 'Foo', 'Bar');
    expect(res).toEqual({});
  });

  it("Doesn't error on products without age names", () => {
    const input = {
      Supplement: [
        {
          products: [
            {
              uuiid: '1',
              ageNames: ['Foo', 'infant'],
            },
            {
              uuid: '2',
            },
          ],
        },
      ],
    } as IOfferProductDiscounts<any>;

    expect(() => swapAgeNameOnProducts(input, 'Foo', 'Bar')).not.toThrow();
  });
});
