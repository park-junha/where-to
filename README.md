## Where To?
![Chrome](https://img.shields.io/website?down_message=unavailable&label=chrome&up_message=available&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fwhere-to%2Fkdhcodpjaffhbbphkahnkbllddjihima)

Where To is a web broswer extension that replaces your New Tab with a customizable, personalized interface.

Where To is currently in alpha. You can download it from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/where-to/kdhcodpjaffhbbphkahnkbllddjihima)!

## Development Server

To run a development server, run the following:

```
yarn add
yarn start
```

## Install Locally

### Google Chrome

1. Run `yarn build`. This will produce a `build` folder.
2. Go to `chrome://extensions` in Chrome and enable Developer mode (located on top right).
3. Click **Load unpacked** and select the `build` directory generated by step 1. The New Tab interface should now be loaded with Where To.
4. To update your extension with a future version, come back to `chrome://extensions` and click the circular arrow on your extension's card or "Update" near the top left (updates all extensions).

### Firefox

1. Run `yarn build`. This will produce a `build` folder.
2. Go to `about:debugging` in Firefox and navigate to **This Firefox**.
3. Click **Load Temporary Add-on** and select any file in `build/`. The New Tab interface should now be loaded with Where To.
