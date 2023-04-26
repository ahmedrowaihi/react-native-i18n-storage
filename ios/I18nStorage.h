
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNI18nStorageSpec.h"

@interface I18nStorage : NSObject <NativeI18nStorageSpec>
#else
#import <React/RCTBridgeModule.h>

@interface I18nStorage : NSObject <RCTBridgeModule>
- (void)SyncWithStorage;
- (void)setOrReset:(NSString *)settings;

#endif

@end
