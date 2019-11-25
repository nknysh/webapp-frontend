# FastSearch Container

## Before you read this...

...make sure you've read the [FastSearch Module](../store/modules/fastSearch/Readme.md) and [Issues](../../docs/ISSUES.md) readmes.

## Description

As with the fastSearch module, this is a departure from existing containers in this application. The focus here is to create Container components that are performant and testable, that can be used to create an applciation that is easy to reason about.

In a react/redux applicaiton, there are several types of component with different levels of reuse value. Ordered from highest to lowest in terms of reuse value, they are;

1. Presentational components.
2. Higher Order components (HOCs).
3. Container Components.

In a redux app, Container components represent the 'glue code' that **connects** your presentational components to the redux store (via a combination of HOCs and Modules).

To make things testable, and easier to reason about, container AND presentational components should avoid mounting other container components. Ideally, container compoentns should only ever be mounted by React Router like this

```
<Route path="some/route" component={SomeContainer} />
```

When mounting a component, never pass in additional props. All props should be taken from the store, via either a module or a HOC.

```
// Don't do this
const someContainerInstance = <SomeContainer foo="bar" />
<Route path="some/route" component={someContainerInstance} />
```

## Why use a class based PureComponent rather than a functional component?

Containers will typically have multiple render methods, and they make good use of lifecycle methods. It's still simpler to use class components for that, rather than shoehorning in hooks to get the same lifecycle methods in an oblique way, and peppering the code base with render functions that you're not sure where to put. This is also straightforward to test, and any testing friction should be avoided.
