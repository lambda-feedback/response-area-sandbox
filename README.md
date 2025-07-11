# Response Area Sandbox

## Development

### Setup locally

##### 1. Clone this repository

##### 2. Install Node

Recommended via [Nodenv](https://github.com/nodenv/nodenv) or [NVM](https://github.com/nvm-sh/nvm)

##### 3. Install Yarn and packages

```
npm install --global yarn
yarn
```

##### 4. Run the dev server

```sh
yarn dev 
```

This will serve your new reponse area type as a compiled IIFE bundle.

Note the Local URL (it should be something like `http://localhost:4173/`).

##### 5. Configure your new type in the code

Find the file at `src/types/Sandbox/index.ts` and set the value of `public readonly responseType` to the name of your type (usually in UPPER_CASE). It must be unique to the project.

##### 6. Configure the sandbox access on the app

Visit [`/settings/sandbox`](https://www.lambdafeedback.com/settings/sandbox) and configure the sandbox with:
- **URL**: the URL found in the previous step
- **Name**: the name of your new type. It must be the same as the name chosen in the previous step.

The configuration is automatically saved in your browser.

##### 7. Done

You can now create new response areas using your new type, and work on the type locally. Find inspiration with the other types already created in the repo to get started quickly (it's fine to copy/paste code between types).

You component aill auto-refresh within the app when you edit it.

_Pro tip: setup your text editor to follow the lint, formatting and type configurations set for the project._

### Troubleshooting

##### 1. Sandbox component is not loading

Inspect the browser console and make sur the iife file is found.

##### 2. Sandbox component stopped refreshing

Reload the page.
If it keeps happening, check the browser console.
