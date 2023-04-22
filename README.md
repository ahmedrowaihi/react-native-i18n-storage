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
// you can use npm instead of yarn
yarn add @react-native-async-storage/async-storage react-native-restart
```

## Installation

```sh
// you can use npm instead of yarn
yarn add @ahmedrowaihi/react-native-i18n-storage
```

## Setup

### iOS

#### 1. import headers into your `AppDelegate.mm`:

```objc
// ios/your-app-name/AppDelegate.mm
#import "AppDelegate.h"
#import <I18nStorage.h>
```

#### 2. modify AppDelegate.mm file inside `didFinishLaunchingWithOptions` method:

```objc
// ios/your-app-name/AppDelegate.mm
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  I18nStorage *i18nStorage = [[I18nStorage alloc] init]; // <--- Add this line at the top
  [i18nStorage SyncI18nStorage]; // <- call the SyncI18nStorage method
  // rest of the code ...
}
```

### Android

#### 1. import package to your `MainApplication.java`

```java
// android/app/src/main/java/com/your-app-name/MainApplication.java
import com.facebook.react.ReactApplication;
import com.i18nstorage.I18nStorageUtility; // <-- Add this line
// ... rest of the imports
```

#### 2. Add the following code to your MainApplication.java file inside `onCreate` method:

```java
// android/app/src/main/java/com/your-app-name/MainApplication.java
@Override
public void onCreate() {
  super.onCreate();
  I18nStorageUtility.SyncI18nStorage(this); // <-- Add this line
  // rest of the code ...
}
```

## Usage

### change the locale and Restart the app

```js
import { setI18nStorage } from '@ahmedrowaihi/react-native-i18n-storage';
import { Platform, Settings } from 'react-native';

await setI18nStorage({
  locale: 'ar', // or any other locale
  forceRTL: true, // or false
  allowRTL: true, // or false
  doLeftAndRightSwapInRTL: true, // or false
});
```

or with optional parameters

```js
await setI18nStorage(
  {
    locale: 'ar', // or any other locale
    forceRTL: true, // or false
    allowRTL: true, // or false
    doLeftAndRightSwapInRTL: true, // or false
  },
  false, // (restart) default is true
  () => {} // (callback before restart) default is undefined
);
```

### get the locale and RTL from the local storage

```js
/**
 * @returns {Promise<{locale: string, forceRTL: boolean, allowRTL: boolean, doLeftAndRightSwapInRTL: boolean}>}
 */
import { getI18nStorage } from '@ahmedrowaihi/react-native-i18n-storage';
const I18nStorage = await getI18nStorage();
```

### reset the locale and RTL to the default values

```js
import { resetI18nStorage } from '@ahmedrowaihi/react-native-i18n-storage';
await resetI18nStorage();
```

or with optional parameters

```js
await resetI18nStorage(
  false, // (restart) default is true
  () => {} // (callback before restart) default is undefined
);
```

# Roadmap

- [x] Allow to change the locale from native side
- [x] Add example of changing the locale from native side
- [x] On App Launch, check if the locale is changed from native side (iOS)
- [x] On App Launch, check if the locale is changed from native side (Android)
- [x] On App Launch implementations to example
- [x] Proof of concept for RTL Storage and Sync from native side!
- [x] Add/Fix JavaScript Methods
- [x] Refactor Native Code + JavaScript Code
- [x] Write docs
- [ ] Write tests

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

```

```

development workflow.

## License

MIT
