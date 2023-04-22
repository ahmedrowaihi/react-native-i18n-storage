package com.i18nstorage;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.preference.PreferenceManager;


import androidx.core.text.TextUtilsCompat;

import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import java.util.Locale;

import org.json.JSONObject;
public class I18nStorageUtility {
  public static final String KEY = "REACT_NATIVE_I18N_STORAGE_KEY_v1";
  public static I18nUtil I18nSharedUtilInstance = null;
  public static void SyncI18nStorage(Context context) {
    if(I18nSharedUtilInstance == null ) I18nSharedUtilInstance = I18nUtil.getInstance();
    try {
      String settings = AsyncLocalStorageUtil.getItemImpl(
        ReactDatabaseSupplier.getInstance(context).get(),
        KEY);
      setOrReset(context, settings);
    } catch (Exception ignored) {}
  }
  public static void setOrReset(Context context, String settings){
    String locale;
    boolean forceRTL, allowRTL, doLeftAndRightSwapInRTL;
    try {
      if(settings == null){
        Locale defaultLocale = Locale.getDefault();
        locale= defaultLocale.toString();
        forceRTL = TextUtilsCompat.getLayoutDirectionFromLocale(defaultLocale) == 1;
        allowRTL = forceRTL;
        doLeftAndRightSwapInRTL = true;
      } else {
        // Set app language
        JSONObject obj = new JSONObject(settings);
        locale = obj.getString("locale");
        forceRTL = obj.getBoolean("forceRTL");
        allowRTL = obj.getBoolean("allowRTL");
        doLeftAndRightSwapInRTL = obj.getBoolean("doLeftAndRightSwapInRTL");
      }

      Configuration config = context.getResources().getConfiguration();
      Locale newLocale = new Locale(locale);
      Locale.setDefault(newLocale);
      config.setLocale(newLocale);
      context.getResources().updateConfiguration(config, context.getResources().getDisplayMetrics());

      SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
      SharedPreferences.Editor editor = preferences.edit();
      editor.putString("user_language", locale);
      editor.apply();

      // Set RTL layout
      if (I18nSharedUtilInstance == null) I18nSharedUtilInstance = I18nUtil.getInstance();
      I18nSharedUtilInstance.allowRTL(context, allowRTL);
      I18nSharedUtilInstance.forceRTL(context, forceRTL);
      I18nSharedUtilInstance.swapLeftAndRightInRTL(context, doLeftAndRightSwapInRTL);

    } catch (Exception ignored){}
  }
}
