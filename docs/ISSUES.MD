# Performance Issues

### mergeDeepRight

It appears that most (if not all) reducers that put data onto the store do so using Ramda's `mergeDeepRight` function. Here's the Ramda docs description:

> Creates a new object with the own properties of the first object merged with the own properties of the second object. If a key exists in both objects: and both values are objects, the two values will be recursively merged otherwise the value from the second object will be used.

In a nut shell, this means that every time we update some part of the store, we get a new reference value for that object. This prevents any selectors created with `createSelector` from memoizing their resulting function correctly. So in essence, we not getting any of the benefits of selectors. They're just adding complexity.

### Many 'selectors' are just plain functions

In a lot of cases, selectors are just functions `piped` together with no memoization at all. While this looks similar to selector composition, it misses the point entirely. Those functions are not memoized, and are therefore not actually selectors. In addition, when these non-memoized selectors are composed along with memoized selectors (using `createSelector`), they negate the resulting selectors memoization.

It is very difficult to track which selectors might be negating memoization. When debugging a selector, you often have to looks at the selectors it is composed with. Those selectors in turn will often be composed, so as you look back up the chain, it branches outwards and you will quickly find yourself overwhelmed with selectors to investigate.

### Custom `createSelector`

The app uses a custom selector which swaps out strict equality checking for ramda's `equals` fucntion. This function is misleading and it checks for equivalence, not equality. It uses deep checking to do this, and we have some pretty hefty objects on the store that are expensive to check this way. So even when selectors do work properly, we're doing more work than than we would if we just computed the derived state with every render.

### Computation is being done in the actions

There's nothing wrong with doing some computation when we receive data from an API call. It's wise to transform API responses to meet the needs of your application so you do less work over time.

In this app, we're relying on Thunks to load and transform data. A commonly acknowledged problem with Thunks is that they easily becomes difficult to follow and reason about. This is certainly the case with this application.

### Parameterised selectors

It's important to understand that Selectors are singletons. This is an easily missed point, and perhaps the most common source of confusion when it comes to creating selectors that require parameters.

Since they are singletons, the correct way to paramaterise them is with the factory pattern. Create a function that takes the parameter you need, which returns a fresh selector with a reference to a parameter in a closure.

In this application, parameterisation is being achieved in very, VERY, unusual way. It relies on Javascript's `arguments` object, which is common to all javascript functions.

Not only does this negate memoization once more. it is also a pretty nasty hack. We now have selectors that look like this..

```
export const getHotelRoom = createSelector(
  [getArg(2), getHotelsAccommodationProducts],
  prop
);
```

The `createSelector` function takes two arguments. State, props, and that's it. However, because it's a javascript function, it also provides `arguments` object accessible to the function body.

We have no idea what getArg(2) is semantically, and we have no idea where it came from. Nor can we guarantee that it will always come from the same place since it's value depends on the context in which it was called and not the parameters the developer thinks it was called with. Add selector composition to this and we're left with an app that's functioning more through luck than good code.

## How do we fix these issues?

There's no easy solution here. To give selectors any chance of working, we have to remove the use of `mergeDeepRight`.

We also need to ensure that every selector is properly memoized.

### Removing `mergeDeepRight`

The complication here is that the reducers have been abstracted in such a way that most of the modules use the same common reducers to update the store. This is only possible for two reasons

1. `mergeDeepRight` is agnostic about the data it is operating on.
2. The store has been modelled to meet the needs of the reducers when it should be the other war around. Reducers should be bespoke to the domain they manage.

If we remove `mergeDeepRight`, then we need to know the shape of each domain when we update it. This is how things should be, but it's not as they are right now. So we need to rewrite at least thirteen reducers so they are bespoke to the domain they manage.

### Fixing the selectors

We simply have to rewrite almost all of the selectors so they're memoized and parameterised.
