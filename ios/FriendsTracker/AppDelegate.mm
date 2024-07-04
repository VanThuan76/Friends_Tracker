#import "AppDelegate.h"
#import "RNCConfig.h"
#import <Firebase.h>
// Safari Apple Auth
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>

// Facebook SDK
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

// Google SDK
#import <GoogleMaps/GoogleMaps.h>

//Other
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *apiKey = [RNCConfig envFor:@"GOOGLE_MAPS_API_KEY"];
  [GMSServices provideAPIKey:apiKey];
  self.moduleName = @"FriendsTracker";
  [FIRApp configure];
  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge

{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
