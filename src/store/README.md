# WAFE Redux Store

WAFE uses [`redux`](https://github.com/reduxjs/redux) as it's centralised data store.  

Actions are handled using [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

Selectors use [`reselect`](https://github.com/reduxjs/reselect).

## Structure

Store is structured in the following way:

```
store/
    - common/
    - modules/
    - utils/
    - rootReducer.js
```

### Common

This holds all common functionality that can be reused across the store.  Within here there are common actions, reducers, selectors and utils

### Modules

Modules holds the main keys that make up the redux store.  For each new key that is needed there should be a new folder created in here with at least teh following files:

```
<key_name>/
    - actions.js
    - reducer.js
    - seletors.js
    - index.js
```

Generally the `index.js` will export the actions, selectors and reducers so they are available to import elsewhere e.g.

```js
// index.js

export * from './actions';
export * from './reducer';
export * from './selectors';
```
```js
import { someAction, someSelector } from 'store/modules/<some_key>';
```

### Utils

There are a number of utility functions that are used heavily in this store to make your life easier

#### `createReducer.js`

This has a default exported function that allows you to create reducers in an `ACTION => func` object, allowing more testability in your `reducer.js`.  This allows you to pass an initial state as well.

Where normally you would do

```js
export default (state, { type, payload }) => {
    switch(type) {
        case 'ACTION_1': 
            return { ...state, ...payload };
        case 'ACTION_2': 
            return { ...state, ...payload };
        case 'ACTION_3': 
            return { ...state, ...payload };
    }

    return state;
}
```

You can use the `createReducer` function to organise and maintain actions more easily:

```js
import { createReducer } from 'store/utils';

const initialState = { some: 'state' };

const action1 = (state, { payload }) => ({
    ...state,
    ...payload,
});

const action2 = (state, { payload }) => ({
    ...state,
    ...payload,
});

const action3 = (state, { payload }) => ({
    ...state,
    ...payload,
});

export default createReducer({
    'ACTION_1': action1,
    'ACTION_2': action2,
    'ACTION_3': action3,  
}, initialState);
```

#### `createSelector.js`

Even though we use `reselect` for our selectors, there is a custom `createSelector` function that uses `ramda`'s `equals` for comparison.  This allows for a deeper comparison check and ignores object refs.  Because the app is almost fully functional, object refs changes as we create new instances of objects for immutability.

You can use this the same as `reselect`'s `createSelector`:

```js
import { prop } from 'ramda';
import { createSelector } from 'store/utils';

const getBase = prop('base')

const getSomething = createSelector(
    getBase,
    prop('someProp'),
)
```