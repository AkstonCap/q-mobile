# Q-Mobile - Quick Start Guide

## 🚀 Quick Installation (10 minutes)

### Prerequisites

Make sure you have:
- Node.js 20+ installed
- For iOS: macOS with Xcode
- For Android: Android Studio and Android SDK

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/AkstonCap/q-mobile.git
cd q-mobile

# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### Step 2: Set Up Nexus Node

**Option A - Use Public Node (Easiest):**
- Default node URL: `https://api.distordia.com`
- No setup required, just launch the app!

**Option B - Local Node (For Development):**
```bash
# Run Nexus core without authentication (testing only)
./nexus -noapiauth

# Or with authentication
./nexus -apiuser=youruser -apipassword=yourpassword
```

### Step 3: Run the App

**For iOS (macOS only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**Or start Metro bundler separately:**
```bash
npm start
# Then in another terminal:
npm run ios  # or npm run android
```

### Step 4: Create Your Wallet

1. Launch the app
2. Tap "Create New Wallet"
3. Fill in the form:
   - **Username**: `testuser` (or your choice, min 3 chars)
   - **Password**: `password123` (min 8 chars)
   - **Confirm Password**: `password123`
   - **PIN**: `1234` (4-8 digits)
   - **Confirm PIN**: `1234`
4. Tap "Create Wallet"
5. Wait ~3-5 seconds for creation
6. You're in! 🎉

### Step 5: Explore the Wallet

**Dashboard:**
- View your balance
- See your account address
- Access all wallet features

**Receive NXS:**
1. Tap "Receive"
2. Share your address or show the QR code
3. Wait for transactions to arrive

**Send NXS:**
1. Tap "Send"
2. Enter recipient address
3. Enter amount (e.g., `1.5`)
4. Add optional reference
5. Enter PIN: `1234`
6. Confirm!

**View History:**
1. Tap "History"
2. Pull down to refresh
3. Tap any transaction for details

**Settings:**
1. Tap "Settings"
2. Update node URL if needed
3. View wallet information

## 🔧 Troubleshooting

### Metro Bundler Issues

**Port already in use:**
```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9

# Restart Metro
npm start
```

**Cache issues:**
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### iOS Build Issues

**Pod install fails:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Xcode build fails:**
- Open `ios/QMobileApp.xcworkspace` in Xcode
- Product → Clean Build Folder
- Try building again

**Simulator not found:**
```bash
# List available simulators
xcrun simctl list devices

# Run on specific simulator
npm run ios -- --simulator="iPhone 15"
```

### Android Build Issues

**Gradle sync fails:**
```bash
cd android
./gradlew clean
cd ..
```

**SDK not found:**
- Open Android Studio
- File → Project Structure → SDK Location
- Make sure Android SDK path is correct

**Metro bundler can't connect:**
```bash
# Enable reverse port forwarding for Android
adb reverse tcp:8081 tcp:8081
```

### Connection Issues

**Can't connect to node:**
- Check if node is running: `curl http://localhost:8080/system/get/info`
- For remote nodes, use HTTPS: `https://api.distordia.com`
- Check network connectivity
- Verify firewall settings

**Login fails:**
- Make sure node is accessible
- Verify credentials are correct
- Check if profile exists on blockchain

### App Crashes

**Check logs:**
```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android
```

**Clear app data:**
- iOS: Delete and reinstall app
- Android: Settings → Apps → Q-Mobile → Clear Data

## 📱 Device Testing

### iOS Device

1. **Connect device** via USB
2. **Trust computer** on device
3. **Open project** in Xcode: `ios/QMobileApp.xcworkspace`
4. **Select your device** from device list
5. **Configure signing** (Xcode → Signing & Capabilities)
6. **Build and run** (Cmd + R)

### Android Device

1. **Enable Developer Options** on device:
   - Settings → About Phone
   - Tap "Build Number" 7 times
2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. **Connect device** via USB
4. **Verify connection**:
   ```bash
   adb devices
   ```
5. **Run app**:
   ```bash
   npm run android
   ```

## 🎯 Common Use Cases

### First Time Setup
```
1. Launch app
2. Tap "Create New Wallet"
3. Fill in details
4. Create wallet
5. You're ready!
```

### Sending Your First Transaction
```
1. Make sure you have NXS in your wallet
2. Tap "Send" from Dashboard
3. Enter recipient address
4. Enter amount (e.g., 1.5)
5. Enter PIN
6. Confirm and send!
```

### Receiving NXS
```
1. Tap "Receive" from Dashboard
2. Share your address or show QR code
3. Wait for confirmation
4. Check "History" tab
```

### Checking Balance
```
1. Open app (shows on Dashboard)
2. Pull down to refresh
3. View updated balance
```

## 🔐 Security Tips

1. ✅ **Use strong passwords** (mix of letters, numbers, symbols)
2. ✅ **Keep credentials safe** (write them down offline)
3. ✅ **Don't share PIN** with anyone
4. ✅ **Verify addresses** before sending
5. ✅ **Start with small amounts** when testing
6. ✅ **Logout when not in use**
7. ✅ **Keep device updated**

## 📚 Next Steps

### For Users:
- ✅ Fund your wallet with some test NXS
- ✅ Practice sending small amounts
- ✅ Explore transaction history
- ✅ Try different node configurations
- ✅ Backup your credentials safely

### For Developers:
- 📖 Read the [full README](README.md)
- 💻 Check the [API documentation](https://nexus.io/docs)
- 🔍 Explore the [source code](src/)
- 🛠️ Read [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Report issues on GitHub

## ❓ Need Help?

- 📚 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/AkstonCap/q-mobile/issues)
- 💬 Join Nexus Community
- 📖 [React Native Docs](https://reactnative.dev)

## 🎊 You're Ready!

Your Q-Mobile wallet is now set up and ready to use. Start managing your Nexus tokens!

---

**Happy Nexusing! 🚀**
