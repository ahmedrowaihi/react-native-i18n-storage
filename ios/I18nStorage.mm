#import "I18nStorage.h"
#import <React/RCTI18nUtil.h>

@implementation I18nStorage

RCT_EXPORT_MODULE()

- (void)SyncI18nStorage {
    NSString *key = @"REACT_NATIVE_I18N_STORAGE_KEY_v1";
    @try {
        NSString *settings = [[NSUserDefaults standardUserDefaults] stringForKey:key];
        [self setOrReset:settings];
    }
    @catch (NSException *exception) {
        NSLog(@"Exception: %@", exception);
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
    }
}

- (void)setOrReset:(nullable NSString *)settings {
    settings = settings ?: @"{}";

    NSError *error;
    NSData *data = [settings dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *settingsDict = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
    if (error) {
        NSLog(@"Error parsing settings: %@", error);
        return;
    }

    // Extract the properties from the dictionary
    NSString *locale = settingsDict[@"locale"];
    NSNumber *forceRTL = settingsDict[@"forceRTL"];
    NSNumber *allowRTL = settingsDict[@"allowRTL"];
    NSNumber *doLeftAndRightSwapInRTL = settingsDict[@"doLeftAndRightSwapInRTL"];

    // Set the app language based on the system locale or the original language
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSArray *preferredLanguages = [NSLocale preferredLanguages];
    NSString *languageCode = [preferredLanguages firstObject];
    NSDictionary *originalSettings = [defaults objectForKey:@"originalSettings"];
    if (originalSettings == nil) {
        originalSettings = @{
            @"languageCode": languageCode,
            @"forceRTL": @(NO),
            @"allowRTL": @(YES),
            @"doLeftAndRightSwapInRTL": @(YES)
        };
        [defaults setObject:originalSettings forKey:@"originalSettings"];
    } else if (settingsDict.count == 0) {
        languageCode = originalSettings[@"languageCode"];
    }
    [defaults setObject:@[languageCode] forKey:@"AppleLanguages"];
    [defaults synchronize];

    // Set the app locale based on the system locale or the value of the "locale" key
    NSLocale *localeObj = [NSLocale autoupdatingCurrentLocale];
    NSString *localeIdentifier = locale ?: localeObj.localeIdentifier;
    [defaults setObject:localeIdentifier forKey:@"AppleLocale"];
    [defaults synchronize];

    // Set the app directionality based on the value of the "forceRTL" key or the original settings
    BOOL shouldForceRTL = forceRTL ? [forceRTL boolValue] : [originalSettings[@"forceRTL"] boolValue];
    [[RCTI18nUtil sharedInstance] forceRTL:shouldForceRTL];
    BOOL shouldAllowRTL = allowRTL ? [allowRTL boolValue] : [originalSettings[@"allowRTL"] boolValue];
    [[RCTI18nUtil sharedInstance] allowRTL:shouldAllowRTL];
    BOOL shouldSwapLeftAndRight = doLeftAndRightSwapInRTL ? [doLeftAndRightSwapInRTL boolValue] : [originalSettings[@"doLeftAndRightSwapInRTL"] boolValue];
    [[RCTI18nUtil sharedInstance] swapLeftAndRightInRTL:shouldSwapLeftAndRight];
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
