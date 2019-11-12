# Contributing

At the time of writing, this project is in a bit of a mess and there's a lot to do to turn it around. We don't have the luxury of starting from scratch, so we'll have to transition the project from it's current state into something more stable and production ready over time. So the code base will get messier before it get's better and we start to introduce better standards and practices to the code base.

### Typescript

WAFE can now handle Typescript, with some caveats.

#### No JS Checking

The project is configured to only analyse `.ts` and `.tsx` files. We have a lot of bugs that would simply not exist if everything was already written in Typescript. Let's not add to that problem. That said, TS is not going to save you from errors just yet, since it doesn't analyse `.js` or `.jsx` files. We'd be here for weeks fixing that.

When creating new files, please use Typescript. And if you're making major changes to existing files, consider converting them to Typescript. Bit by bit, we'll get there.

#### Webpack is 'Transpile Only'

Webpack is painfully slow when a typescript loader has to analyse every file. So for now, you will only get type errors in your IDE, and as a pre-commit hoot. You can run type checking at any time with

```
yarn typecheck
```

But a bug in Typescript means `-watch` isn't working for now.

### TESTS!

Code coverage is abysmimal at the moment. It was previously impossible to test components and containers that used hooks because the React version didn't support the `act` method needed to test them. We've upgraded React, so we can test components with hooks. That said, don't add anymore use hooks. They're good for small apps. For big apps, let Redux do the heavy lifting.

### Yarn

It seem we're using yarn and npm interchangeable, which has led to multiplt lock files. This can cause issues, but more iimportanlty it means we don't have a singlesource of truth for versions.

We can have a debate about wether NPM is better than Yarn, but for now, the project is using a yarn lock file, and we'll keep removing `package.lock` files if they appear.

### Explicit Versions

Semver is a great idea. Module developers however, are scum who should not be trusted. So don't trust Semver. Always install expicit versions of your modules. Or better yet, don't add any more dependencies (he say's, as he's just added a bunch as is poised to add a bunch more).

### Keep dependecies up to date

Anyone can run `yarn upgrade-interactive`, so try to get into that habit. And don't be put off by having to fix bugs caused by breaking changes to an existing dependecy. It's much easier to do this a bit at a time over time, rather than trying to do it all in one go when we have no choice but to upgrade a dependecy.

### Rebase. Don't merge.

Now that we're going to be refactoring a lot, it's more important than every that we keep the commit history clean so we can revert, roll back, and read more easily. If you use `rebase and merge` once in github, it will remeber.

## See Also

For more details on the main issues, see [ISSUES.md](/docs/ISSUES.md).
