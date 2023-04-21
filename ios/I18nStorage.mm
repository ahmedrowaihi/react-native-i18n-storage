#import "I18nStorage.h"
#import <React/RCTI18nUtil.h>

@implementation I18nStorage

RCT_EXPORT_MODULE()

- (void)SyncWithStorage {
    NSString *value = [[NSUserDefaults standardUserDefaults] stringForKey:@"REACT_NATIVE_I18N_STORAGE_KEY_v1"];
    BOOL isRTL = [value isEqualToString:@"ar"] || [[[NSLocale preferredLanguages] objectAtIndex:0] hasPrefix:@"ar_"];
    if (isRTL) {
        // Set app language
        NSLocale *locale = [[NSLocale alloc] initWithLocaleIdentifier:@"ar"];
        [[NSUserDefaults standardUserDefaults] setObject:@[locale.localeIdentifier] forKey:@"AppleLanguages"];
        [[NSUserDefaults standardUserDefaults] setObject:locale.localeIdentifier forKey:@"AppleLocale"];
    } else {
        // Set app language to system language
        [[NSUserDefaults standardUserDefaults] setObject:nil forKey:@"AppleLanguages"];
        [[NSUserDefaults standardUserDefaults] setObject:nil forKey:@"AppleLocale"];
    }
    [[NSUserDefaults standardUserDefaults] synchronize];
    // Force App Layout
    [[RCTI18nUtil sharedInstance] allowRTL:isRTL];
    [[RCTI18nUtil sharedInstance] forceRTL:isRTL];
}

RCT_EXPORT_METHOD(ChangeNativeLocale:(BOOL)rtl withLocale:(NSString *)locale withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
{
    // Set app language
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSArray *preferredLanguages = [NSLocale preferredLanguages];
    NSString *languageCode = locale ?: [preferredLanguages firstObject];
    [defaults setObject:@[languageCode] forKey:@"AppleLanguages"];
    [defaults synchronize];
    // Set RTL layout
    [[RCTI18nUtil sharedInstance] allowRTL:rtl];
    [[RCTI18nUtil sharedInstance] forceRTL:rtl];
    resolve(nil);
}

@end
