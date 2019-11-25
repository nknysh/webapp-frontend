# BackendApi Service

A stateless service that provides a Promise based interface to interact with the backend API.

All responses from the back end follow the same base scheme.

```
{
  data: {
    ...responsePayload
  }
}
```

## Relevant Env Vars

- Appstack: `BACKEND_BASE_URL=https://8002/api`
- Sandbox: `BACKEND_BASE_URL=https://api.sandbox.pure-escapes.com/api`
- QA: `BACKEND_BASE_URL=https://api.qa.pure-escapes.com/api`

## Methods

### `getOffersSearch`

Perfromns a search of hotels, and return

#### Search query params

Returns search results, complete with booking builder objects.

**Request Params**

```
// Query interface
{
"name": "Maldives",
"lodgings": [{ "honeymoon": true, "birthday": true, "numberOfAdults": 2, "agesOfAllChildren": [14] }],
"mealPlanCategories": ["BB"],
"regions": ["North", "South"],
"filters": ["Best for Fishing", "Best of the Best"],
"starRatings": ["5+"],
"startDate": "2020-01-01",
"endDate": "2020-01-07",
"priceRange": { "min": 1, "max": 100000 }
}

// Query string
?name=Maldives&lodgings%5B0%5D%5BnumberOfAdults%5D=2&lodgings%5B0%5D%5BagesOfAllChildren%5D%5B0%5D=14&lodgings%5B0%5D%5BrepeatCustomer%5D=false&mealPlanCategories%5B0%5D=BB&filters%5B0%5D=Seaplane%20transfer&starRatings%5B0%5D=5%2B&startDate=2020-01-01&endDate=2020-01-07&priceRange%5Bmin%5D=1&priceRange%5Bmax%5D=100000

```

- `lodgings` - An array with an entry per room
- `startDate` - Must be in `YYYY-MM-DD` format, without time
- `endDate` - Must be in `YYYY-MM-DD` format, without time

**Response**

The response is pretty big. See `./src/services/BackendApi/types/IOffersSearchResponse.ts`
