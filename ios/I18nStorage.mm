#import "I18nStorage.h"
#import <React/RCTI18nUtil.h>

@implementation I18nStorage
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(ChangeNativeLocale:(BOOL)rtl withLocale:(NSString *)locale
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  // Set RTL layout
  [[RCTI18nUtil sharedInstance] allowRTL:rtl];
  [[RCTI18nUtil sharedInstance] forceRTL:rtl];

  // Set app language
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSArray *preferredLanguages = [NSLocale preferredLanguages];
  NSString *languageCode = locale ?: [preferredLanguages firstObject];
  [defaults setObject:@[languageCode] forKey:@"AppleLanguages"];
  [defaults synchronize];

  resolve(nil);
}

@end
