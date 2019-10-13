# Contributing to react-simple-step-wizard

🧙🙌 First off, thanks for taking your time to contribute! 🧙🙌

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub][egghead]

## Contents

- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Set up your dev environment](#set-up-your-dev-environment)
- [Make a commit](#make-a-commit)
  - [Versioning via commits](#versioning-via-commits)
  - [Commit types](#commit-types)
  - [Use commitizen](#use-commitizen)
- [Unit tests](#unit-tests)
- [References](#references)

## Setup

### Prerequisites

- [Git][git] >= 2.13.0
- [Node.JS][node] >= v8.12.0

To get started, clone [react simple step wizard][react-simple-step-wizard] and create your branch from master.

Github article [Fork a repository][fork-repository].

#### Codebase

After setting up react simple step wizard locally, the following steps will get you started:

```bash
# Library
# To install `react-simple-step-wizard` dependencies.
npm install

# Example
# To install example's dependencies.
cd example && npm install

# To commit, you should follow the guide tipping:
npm run cz
```

#### Text editor extensions

[Prettier][prettier], an opinionated code formatter that integrates with your text editor.

[ESLint][eslint], The pluggable linting utility for JavaScript and JSX

### Set up your dev environment

```bash
# run both the core library and its example on development mode, it will rerun based on the files you modify.
npm run dev
```

After this, a browser will be open. The page will reload if you make edits.

## Make a commit

We use [commitizen][commitizen] and [commitlint][commitlint] to
ensure conventional commit messages, which supports our publishing workflow and versioning scheme.

[husky][husky] is used to run precommit tasks on staged files, which includes code formatting, linting, and tests.

You will not be able to make a commit until the precommit tasks pass. We also have a prepush hook to run a full build before pushing your code.

### Use commitizen

The TDS codebase includes a script to run commitizen for a streamline commit-making experience:

```bash
# Stage your files
# To commit, you should follow commitizen guide tipping:
npm run cz
```

### Versioning via commits

Versioning is facilitated by the [Conventional Commits specification][conventional-commits].

The commit type determines what will be included in changelogs. Use the `feat` and `fix` types sparingly as these two types will appear in changelogs. For most other commits such as fixups or configurations, use the `chore` type.

### Commit types

| Type            | Description                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BREAKING CHANGE | a commit that has a footer **BREAKING CHANGE:**, or appends a ! after the type/scope, introduces a breaking API change (correlating with **MAJOR** in semantic versioning). A BREAKING CHANGE can be part of commits of any type .                                                                                                                         |
| build           | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).                                                                                                                                                                                                                                                       |
| chore           | A type for **miscellaneous** changes. Anything not covered here is considered a chore. Additionally, this is useful when iterating on changes due to PR reviews or other factors. Only one commit may be labeled as a `fix` or `feat` for any one change, so commits following that to iterate on the same feature will either be a `chore` or `refactor`. |
| ci              | Changes to our **CI configuration** files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).                                                                                                                                                                                                                                           |
| docs            | Indicates a modification to **documentation**. Changes to the .md files of components, or changes to the documentation site use this type.                                                                                                                                                                                                                 |
| feat            | a commit of the type feat introduces a new feature to the codebase (this correlates with **MINOR** in semantic versioning).                                                                                                                                                                                                                                |
| fix             | a commit of the type fix patches a bug in your codebase (this correlates with **PATCH** in semantic versioning).                                                                                                                                                                                                                                           |
| perf            | A code change that improves performance.                                                                                                                                                                                                                                                                                                                   |
| refactor        | A code change that neither fixes a bug nor adds a feature.                                                                                                                                                                                                                                                                                                 |
| style           | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).                                                                                                                                                                                                                                                    |
| test            | Adding missing tests or correcting existing tests.                                                                                                                                                                                                                                                                                                         |

### Unit tests

react-simple-step-wizard uses [Jest][jest] as part of our Git hooks, these tests are run automatically on commit and on push.

## References

### Related articles and tools

- [Commitizen][commitizen]
- [Render Props][render-props]
- [Quick guide to React compound components][compound-components]
- [Prop Getters Solution][prop-getters-solution]
- [Conventional Commits][conventional-commits]
- [conventional-commits-faq][conventional-commits-faq]

[commitizen]: https://github.com/commitizen/cz-cli
[render-props]: https://reactjs.org/docs/render-props.html
[compound-components]: https://blog.logrocket.com/guide-to-react-compound-components-9c4b3eb482e9/
[prop-getters-solution]: https://frontendmasters.com/courses/advanced-react-patterns/prop-getters-solution/
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0-beta.4/
[conventional-commits-faq]: https://www.conventionalcommits.org/en/v1.0.0-beta.4/#faq
[jest]: https://jestjs.io/
[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[git]: https://git-scm.com/
[node]: https://nodejs.org
[react-simple-step-wizard]: https://github.com/jonathanpalma/react-simple-step-wizard
[fork-repository]: https://help.github.com/articles/fork-a-repo/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[commitlint]: https://github.com/conventional-changelog/commitlint
[husky]: https://github.com/typicode/husky
