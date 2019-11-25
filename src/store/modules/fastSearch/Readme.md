# FastSearch Module

## Description

At the time of writing, the FastSearch module is a big departure from existing modules in this app. To understand why this departure is necessary, see [Issues.md](../../../docs/Issues.md).

The focus here is to write code that's easy to reason about, stable, and testable. This module can serve as the canonnical example of how to create a performant, and maintainable Redux module for this appllication. It demonstrates all the technique that any other module may need.

1. Properly state.
2. Typed Actions with as little boilerplate as possible.
3. A simple approach to Action testiung to ensure coverage.
4. Properly memoized,compose, typed, and tested selectors.
5. Proper side effect management with Redux-Sagas (no more thunks).
6. An easier to understand reducer, with reducer composition.
7. Consistent naming conventions for acitons, action types, selectors and sagas.

## See Also [FastSearchContainer](../../containers/FastSearch/readme.md);
