package com.i18nstorage;

import android.content.Context;
import android.content.res.Configuration;

import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import java.util.Locale;
public class I18nStorageUtility {
  public static void SyncWithStorage(Context context) {
    String value;
    try {
      value = AsyncLocalStorageUtil.getItemImpl(ReactDatabaseSupplier.getInstance(context).get(),"REACT_NATIVE_I18N_STORAGE_KEY_v1");
      if (value == null) value = Locale.getDefault().getLanguage();
      boolean isRTL = "ar".equals(value);
      Locale locale = new Locale(value);
      Configuration config = context.getResources().getConfiguration();
      config.setLocale(locale);
      I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
      sharedI18nUtilInstance.allowRTL(context, isRTL);
      sharedI18nUtilInstance.forceRTL(context, isRTL);
    } catch (Exception ignored) {}
  }
}
