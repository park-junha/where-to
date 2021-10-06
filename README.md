# Where To?
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/park-junha/where-to.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/park-junha/where-to/context:javascript)
[![Chrome](https://img.shields.io/endpoint?url=https%3A%2F%2Fo3x72k5hu9.execute-api.us-west-1.amazonaws.com%2Fapi%2Fchrome)](https://chrome.google.com/webstore/detail/where-to/kdhcodpjaffhbbphkahnkbllddjihima)
[![Firefox](https://img.shields.io/endpoint?url=https%3A%2F%2Fo3x72k5hu9.execute-api.us-west-1.amazonaws.com%2Fapi%2Ffirefox)](https://addons.mozilla.org/en-US/firefox/addon/where-to/)

![WhereTo](public/img/WhereTo128.png)

Where To is a web browser extension that replaces your New Tab with a customizable, personalized interface.

You can download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/where-to/kdhcodpjaffhbbphkahnkbllddjihima) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/where-to/)!

The following technologies are used:
- **Language**: TypeScript
- **Web Framework**: React
- **Stylesheets**: Sass
- **Test Frameworks**: Jest, React Testing Library
- **Package Manager**: Yarn

## Contributing

Read [contributing guidelines](CONTRIBUTING.md) here!

## Development Server

To run a development server, run the following:

```
yarn install
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
