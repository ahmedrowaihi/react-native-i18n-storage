package com.i18nstorage;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class I18nStorageModule extends ReactContextBaseJavaModule {
  public static final String NAME = "I18nStorage";

  public I18nStorageModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void setI18nStorage(String settings, Promise promise) {
    I18nStorageUtility.setOrReset(this.getReactApplicationContext(), settings);
    promise.resolve(null);
  }
}
