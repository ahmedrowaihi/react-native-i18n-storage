#import "I18nStorage.h"
#import <React/RCTI18nUtil.h>

@implementation I18nStorage

RCT_EXPORT_MODULE()

- (void)SyncI18nStorage {
    NSString *key = @"REACT_NATIVE_I18N_STORAGE_KEY_v1";
    @try {
        NSString *settings = [[NSUserDefaults standardUserDefaults] stringForKey:key];
        if (settings) [self setOrReset:settings];
    }
    @catch (NSException *exception) {
        NSLog(@"Exception: %@", exception);
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
    }
}

- (void)setOrReset:(NSString *)settings {
    // Parse the settings string into a dictionary
    NSError *error;
    NSData *data = [settings dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *settingsDict = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
    if (error) {
        NSLog(@"Error parsing settings: %@", error);
        return;
    }

    // Extract the properties from the dictionary
    NSString *locale = settingsDict[@"locale"];
    BOOL forceRTL = [settingsDict[@"forceRTL"] boolValue];
    BOOL allowRTL = [settingsDict[@"allowRTL"] boolValue];
    BOOL doLeftAndRightSwapInRTL = [settingsDict[@"doLeftAndRightSwapInRTL"] boolValue];

    // Set the app language based on the locale
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSArray *preferredLanguages = [NSLocale preferredLanguages];
    NSString *languageCode = locale ?: [preferredLanguages firstObject];
    [defaults setObject:@[languageCode] forKey:@"AppleLanguages"];
    [defaults synchronize];

    if (locale) {
        // Set the app locale based on the locale
        NSLocale *localeObj = [[NSLocale alloc] initWithLocaleIdentifier:locale];
        [defaults setObject:localeObj.localeIdentifier forKey:@"AppleLocale"];
        [defaults synchronize];
    } else {
        // Set the app locale to system locale
        [defaults setObject:nil forKey:@"AppleLocale"];
        [defaults synchronize];
    }

    // Set the app's RTL layout based on the forceRTL and allowRTL properties
    [[RCTI18nUtil sharedInstance] allowRTL:allowRTL];
    [[RCTI18nUtil sharedInstance] forceRTL:forceRTL];
    [[RCTI18nUtil sharedInstance] swapLeftAndRightInRTL:doLeftAndRightSwapInRTL];
}

RCT_EXPORT_METHOD(setI18nStorage:(NSString *)settings withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
{
    if (settings) {
        @try {
            [self setOrReset:settings];
            resolve(nil);
        }
        @catch (NSException *exception) {
            NSLog(@"Exception: %@", exception);
            reject(@"Exception", exception.description, nil);
        }
    } else {
        resolve(nil);
    }
}
@end
