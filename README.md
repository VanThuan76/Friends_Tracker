# Main Processing

## Step 0:

    - Config **.env** and **.env.local** and **.env.dev** and **.env.prod** file
    	+ ENCRYPTION_SECRET_KEY=1fmxF8liac2klMBbjzzkiT3xvQ
    	+ GOOGLE_MAPS_API_KEY=<your API key>
    - Install and config library gem and cocoapod (ruby) and gradle for machine environments
    - Install Xcode and Simulator (MacOs)
    - Install SDK Android (Docs React Native)
    - Cd this project and install all of package dependencies (npm run install and yarn install)

## Step 1: (OR)

    - Build mobile android:
    	1. npm run gradle-clean
    	2. npm run gradle-build
    - Build mobile ios:
    	1. npm run pod-clean
    	2. npm run pod-install

## Step 2: (OR)

    - Run mobile android simulator: npm run android
    - Run mobile ios simulator: npm run ios

## Step 3:

    - Run dev localhost: yarn start --reset-cache

# Other Document

1. Choose alternative encrypted storage for Async Storage:
   - https://reactnative.dev/docs/security
   - https://javascript.plainenglish.io/trending-storage-options-for-react-native-developers-8671fbffb686
   - https://github.com/mrousavy/react-native-mmkv
2. Encrypt / Decrypt data, redux-persist encrypt

   - https://docs.google.com/document/d/1kH5cfmFXuMp9pgIo6G4NET6bPcf8-UVSS9Il0ZgLMXQ/edit#

3. Configure ENV
   - https://github.com/lugg/react-native-config

# Template Document

- https://thecodingmachine.github.io/react-native-boilerplate/docs/project-structure
