package com.i18nstorage;

import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.preference.PreferenceManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import java.util.Locale;

public class I18nStorageModule extends ReactContextBaseJavaModule {
  public static final String NAME = "I18nStorage";

  public static I18nUtil I18nSharedUtilInstance = null;
  public I18nStorageModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void ChangeNativeLocale(boolean rtl, String locale, Promise promise) {
    // Set app language
    Resources resources = getReactApplicationContext().getResources();
    Configuration configuration = resources.getConfiguration();
    Locale newLocale = new Locale(locale);
    Locale.setDefault(newLocale);
    configuration.setLocale(newLocale);
    resources.updateConfiguration(configuration, resources.getDisplayMetrics());

    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
    SharedPreferences.Editor editor = preferences.edit();
    editor.putString("user_language", locale);
    editor.apply();

    // Set RTL layout
    if(I18nSharedUtilInstance == null) I18nSharedUtilInstance = I18nUtil.getInstance();
    I18nSharedUtilInstance.allowRTL(getReactApplicationContext(), rtl);
    I18nSharedUtilInstance.forceRTL(getReactApplicationContext(), rtl);
    promise.resolve(null);
  }
}
