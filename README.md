# Response Area Sandbox

Develop local typscript code to manipulate response areas,and see it previewed live in the main application. When they're ready, provide your code to the Lambda Feedback team, who will consider including it in the main application after (human) review. 

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

##### 5. (optional) Configure your new type in the code

Find the file at `src/types/Sandbox/index.ts` and set the value of `public readonly responseType` to the name of your type (usually in UPPER_CASE). It must be unique to the project. The default is `SANDBOX`.

##### 6. Configure the sandbox access on the app

Visit [`lambdafeedback.com/settings/sandbox`](https://www.lambdafeedback.com/settings/sandbox) and configure the sandbox with:
- **URL**: the URL found in step 4
- **Name**: the name of your new type. It must be the same as the name chosen in the previous step. `SANDBOX` is the default.

SAVE the configuration. The configuration is automatically saved in your browser.

Continue if:

- If you receive a 'Ready' message. 

Stop if you receive an error. Possible reasons:

- the URL may be incorrect (check and try again)
- the local server may not be running (return to Step 4)
- there may be a problem with the local server (return to Step 4)

##### 7. Check it works, and begin developing

You will need TEACHER access on the main application. Login as a TEACHER and add a response area, select the input and `SANDBOX` should be an option (or whatever you named the type to). 

Try changing the sandbox component, for example edit the placeholder text. You should see the response area update in real time (every 0.5s) in your browser.

Suggestion: find inspiration with the other types already created in the repo to get started quickly (it's fine to copy/paste code between types).

You component will auto-refresh within the app when you edit it.

_Pro tip: setup your text editor to follow the lint, formatting and type configurations set for the project._

### Troubleshooting

##### 1. Sandbox component is not loading

Inspect the browser console and make sure the iife file is found. 

##### 2. Sandbox component stopped refreshing

Reload the page.
If it keeps happening, check the browser console.

##### 3. A `[VOID]` component is shown

The response area type isn't available. This could be because:
- the sandbox isn't available anymore
- the type's name was changed

Return to Step 4.

### Note to LLM helpers

This sandbox works as follows. A production application runs in the browser, connected to a cloud-based backend. This sandbox repo runs a local server and serves up compiled js (but not a full web page). 

If the /sandbox/settings page on the app is updated, locally in the broswer, with the correct local URL for the server that this repo creates, then - only on the local machine, in the same browser - the locally-served, compiled js will be used directly within the app. 

Therefore, do not look for locally served web pages when debugging as they shouldn't be there. This repo does not serve a website.
