# Q-Mobile

Mobile cryptocurrency wallet for the Nexus blockchain - a mobile version of the [q-wallet](https://github.com/AkstonCap/q-wallet) browser extension.

![Nexus Wallet](https://img.shields.io/badge/Nexus-Blockchain-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.82-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Core Wallet Functionality
- 🔐 **Secure Account Management** - Create and manage Nexus accounts with encrypted storage
- 💰 **Send & Receive NXS** - Easy-to-use mobile interface for sending and receiving NXS tokens
- 📊 **Transaction History** - View all your past transactions
- 🔄 **Real-time Balance Updates** - Pull to refresh balance data
- ⚙️ **Configurable Node** - Connect to any Nexus node (local or remote)
- 🔒 **Session Management** - Secure login/logout with PIN protection
- 📱 **QR Code Support** - Display QR codes for receiving payments

### Security Features
- 🔑 **Password Protected** - Strong password encryption
- 🔢 **PIN Authentication** - Additional PIN layer for transaction approval
- 🔐 **Secure Storage** - AsyncStorage and Keychain for sensitive data
- 🚪 **Lock/Unlock** - Lock your wallet when not in use
- 🌐 **HTTPS Enforcement** - Remote connections must use secure HTTPS protocol
- 💰 **Transparent Fees** - All transaction and service fees clearly displayed

### Mobile-Specific Features
- 📱 **Native Mobile UI** - Optimized for iOS and Android
- 📲 **Touch-friendly Interface** - Large buttons and easy navigation
- 🔄 **Pull to Refresh** - Swipe down to update balances and transactions
- 📴 **Offline Support** - View cached transaction history offline

## Installation

### Prerequisites

- Node.js (>= 20.x)
- npm or yarn
- For iOS development:
  - macOS
  - Xcode 12 or newer
  - CocoaPods
- For Android development:
  - Android Studio
  - Android SDK
  - Java Development Kit (JDK 11)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/AkstonCap/q-mobile.git
cd q-mobile
```

2. **Install dependencies**
```bash
npm install
```

3. **iOS Setup** (macOS only)
```bash
cd ios
pod install
cd ..
```

4. **Android Setup**
Make sure you have Android Studio installed and Android SDK configured.

### Running the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Metro Bundler:**
```bash
npm start
```

## Getting Started

### 1. Set Up Your Nexus Node

Before using the wallet, you need a Nexus node running. You can:

**Option A: Use a Public Node**
- Default: `https://api.distordia.com`
- Configure in Settings screen

**Option B: Run a Local Node**
```bash
./nexus -apiuser=youruser -apipassword=yourpassword
# Or without authentication (for local testing only)
./nexus -noapiauth
```

### 2. Create Your Wallet

1. Launch the app
2. Tap "Create New Wallet"
3. Enter your details:
   - **Username**: Your unique identifier (min 3 characters)
   - **Password**: Strong password (min 8 characters)
   - **PIN**: 4-8 digit PIN for transaction approval
4. Confirm your details
5. Wait for wallet creation (~2-5 seconds)

**⚠️ Important:** Store your username, password, and PIN safely! They cannot be recovered if lost.

### 3. Using the Wallet

#### Receive NXS
1. Tap "Receive" on the Dashboard
2. Your address will be displayed with a QR code
3. Share your address or show the QR code
4. Wait for the transaction to confirm

#### Send NXS
1. Tap "Send" on the Dashboard
2. Enter recipient address or username
3. Enter amount to send
4. Add optional reference/memo
5. Enter your PIN
6. Confirm transaction

**Transaction Fees:**
- **Nexus Network Fee:** 0.01 NXS (auto-deducted by blockchain)
- **Distordia Service Fee:**
  - For NXS: 0.1% of send amount (minimum 0.000001 NXS)
  - For other tokens: 0.01 NXS flat fee
- All fees are deducted from your default NXS account

#### View Transactions
- Tap "History" to view your transaction history
- Pull down to refresh
- Tap any transaction for details

#### Configure Settings
- Tap "Settings" from the Dashboard
- Update Node URL if needed
- View wallet information

## Building for Production

### iOS

1. **Configure code signing in Xcode**
2. **Build for release:**
```bash
cd ios
xcodebuild -workspace QMobileApp.xcworkspace -scheme QMobileApp -configuration Release
```

3. **Archive and submit to App Store** via Xcode

### Android

1. **Generate signing key:**
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure signing in `android/gradle.properties`**

3. **Build release APK:**
```bash
cd android
./gradlew assembleRelease
```

4. **APK location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

## Project Structure

```
q-mobile/
├── src/
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── services/         # API and wallet services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # Main app component
└── package.json          # Dependencies
```

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Lint code

### Tech Stack

- **Framework:** React Native 0.82
- **Navigation:** React Navigation
- **Storage:** AsyncStorage, React Native Keychain
- **HTTP Client:** Axios
- **QR Codes:** react-native-qrcode-svg
- **Language:** TypeScript

## Security Features

### Data Protection
- 🔒 **No Credential Storage** - Your username, password, and PIN are never permanently stored
- 🔐 **Session-Based Security** - Session tokens stored securely using Keychain
- 🔑 **PIN Confirmation** - All transactions require PIN re-entry
- 🌐 **HTTPS Enforcement** - Remote connections must use secure HTTPS
- 💰 **Transparent Fees** - All fees displayed before confirmation

### Fee Structure
- **Nexus Network Fee:** 0.01 NXS per additional transaction within 10 seconds
- **Distordia Service Fee:**
  - NXS sends: 0.1% of amount (min 0.000001 NXS)
  - Token sends: 0.01 NXS flat fee
  - Account creation: 0.01 NXS flat fee

### Best Practices
1. ✅ Use strong, unique passwords (minimum 8 characters)
2. ✅ Never share your password or PIN with anyone
3. ✅ Only connect to trusted Nexus nodes
4. ✅ Review all transactions carefully before confirming
5. ✅ Lock your wallet when not in use
6. ✅ Keep your credentials backed up safely offline
7. ✅ Keep your device updated with the latest security patches

## Troubleshooting

### Build Errors

**iOS:**
- Run `pod install` in the ios directory
- Clean build folder in Xcode: Product → Clean Build Folder
- Delete `ios/Pods` and `Podfile.lock`, then run `pod install`

**Android:**
- Clean gradle: `cd android && ./gradlew clean`
- Clear gradle cache: `rm -rf ~/.gradle/caches/`
- Invalidate caches in Android Studio: File → Invalidate Caches / Restart

### Connection Issues

- Verify your Nexus node is running and accessible
- Check network connectivity
- Ensure HTTPS is used for remote nodes
- Check firewall settings

### App Crashes

- Check Metro bundler logs
- Run `npx react-native log-android` for Android logs
- Run `npx react-native log-ios` for iOS logs
- Clear app data and cache

## FAQ

### How do I backup my wallet?
Your wallet is created on the Nexus blockchain, not just in the app. Securely store your username, password, and PIN. You can access your wallet from any device with these credentials.

### Can I use multiple accounts?
Yes! The Nexus blockchain supports multiple accounts per profile. You can create additional accounts for different tokens.

### What if I forget my password or PIN?
If you forget your credentials, you can only recover access using your private seed phrase (if you created one in the Nexus desktop wallet). Always keep secure backups of your credentials.

### Is my wallet secure?
Yes! Your credentials are not permanently stored. Session tokens use secure Keychain storage. All transactions require PIN confirmation.

### Which platforms are supported?
iOS 12+ and Android 6.0+ (API level 23+)

### Can I use this with hardware wallets?
Not currently. Hardware wallet support may be added in future versions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Related Projects

- [q-wallet](https://github.com/AkstonCap/q-wallet) - Browser extension version
- [Nexus](https://nexus.io) - Nexus blockchain

## Important Disclaimer

This wallet manages cryptocurrency. Use at your own risk. Always:
- ✅ Keep secure backups of your credentials
- ✅ Use strong, unique passwords
- ✅ Verify all transactions before confirming
- ✅ Only install from trusted sources
- ✅ Never share your password or PIN

---

**Built with ❤️ for the Nexus Blockchain Community**
