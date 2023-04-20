# react-native-i18n-storage

Sync your I18n Manager from Native Side Without hassle!

## Why?

React Native I18n Storage is a simple library to manage your app's I18nManager settings and language by keeping them in sync with local storage from the initial native app launch!
Which means that you can change the locale from native side and the app will restart with the new locale from the local storage!

## Conventions

- Locale and Layout are initialized from the first native app launch, and then they are kept in sync with the local storage.
- saves huge performance cost by not using hooks or context
- keeps your code clean and simple
- use Locale and RTL IN/OUT of React Components and they will be kept in sync with the local storage
- No need to change your code logic
- No need to change your code structure or architecture
- No need to change your code style
- No need to change your code design pattern
- No need to change your code design pattern
- No need to change your code anything 😅

## Prerequisites

- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [react-native-restart](https://www.npmjs.com/package/react-native-restart)

if you have not installed them yet, you can install them by running the following commands:

```sh
// you can use yarn instead of npm
npm install @react-native-async-storage/async-storage react-native-restart
```

## Installation

```sh
// you can use yarn instead of npm
npm install react-native-i18n-storage
```

## Usage

## Change the locale from native side and Restart the app

```js
import { ChangeNativeLocale } from '@ahmedrowaihi/react-native-i18n-storage';

await ChangeNativeLocale(true, 'ar');
```

# Roadmap

- [x] Allow to change the locale from native side
- [x] Add example of changing the locale from native side
- [ ] On App Launch, check if the locale is changed from native side (iOS)
- [ ] On App Launch, check if the locale is changed from native side (Android)
- [ ] On App Launch implementations to example
- [ ] Write tests
- [ ] Write docs

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
