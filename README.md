# TestingStructureWorkshop

This repo was used in an Angular Communit Meetup live workshop: ["Structuring Code to Avoid Shell-Shocked Testing | Jason Warner"](https://www.youtube.com/watch?v=nbzJGcrTp0k).

> The way we write our code has a significant impact on how testable it is. Let's talk about testing strategies and how we can structure our code to make those testing strategies work. Can we write our code so that we are more successful with testing? Absolutely! Let's talk about it.

The code in this repo can be referenced in a before & after way in `main`, with one folder being for the hard to test code that the workshop started with, and the other folder being better testable code
- Before: [`testing-structure-workshop` folder](https://github.com/xocomil/testing-structure-workshop/tree/main/apps/testing-structure-workshop)
    - Main files
        - [component](https://github.com/xocomil/testing-structure-workshop/blob/main/apps/testing-structure-workshop/src/app/app.component.ts)
        - [component spec file](https://github.com/xocomil/testing-structure-workshop/blob/main/apps/testing-structure-workshop/src/app/app.component.spec.ts)
    - Most of the important async logic for loading the TMNT info was done in the component
    - Manual subscriptions that assigned non-reactive data
    - Hard to test and reason about because of the mix of component logic and async data
- After: [`testable-code` folder](https://github.com/xocomil/testing-structure-workshop/tree/main/apps/testable-code)
    - Main files
        - [component](https://github.com/xocomil/testing-structure-workshop/blob/main/apps/testable-code/src/app/app.component.ts)
        - [store](https://github.com/xocomil/testing-structure-workshop/blob/main/apps/testable-code/src/app/store/app.component.store.ts)
        - [store spec file](https://github.com/xocomil/testing-structure-workshop/blob/main/apps/testable-code/src/app/store/app.component.store.spec.ts)
    - The important async logic was moved to a signal store
    - Data is reactive - no manual subscriptions
    - Easier testing for:
        -  Component: no testing of the data needed
        -  Store: easier to set and read test data as it can effectively be handled synchronously since the store handles the async computation automatically

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve testing-structure-workshop
```

To create a production bundle:

```sh
npx nx build testing-structure-workshop
```

To see all available targets to run for a project, run:

```sh
npx nx show project testing-structure-workshop
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
