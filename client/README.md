# 3ardElYoum - عرض اليوم

## Arabic Daily Offers Mobile App

Modern React Native mobile app for daily offer notifications (Arabic/RTL).

---

## 📁 Project Structure

```
client/
├── app/                  # Expo Router screens (file-based routing)
│   ├── _layout.tsx       # Root layout with navigation + theme + i18n
│   ├── splash.tsx        # Splash screen checks auth state & navigates
│   ├── login.tsx         # Login screen
│   └── (tabs)/           # Tabs layout
│       └── index.tsx     # Home screen
├── src/
│   ├── components/       # Reusable UI components (OfferCard)
│   ├── screens/          # Screen components imported into routes
│   ├── config/           # Configuration (Firebase, i18n, auth)
│   ├── utils/            # Utility helpers (validation, notifications, RTL)
│   └── theme/            # React Native Paper theme configuration
├── types/                # TypeScript interfaces (User, Offer)
├── assets/               # Images and icons
├── app.config.ts         # Expo config (app name, splash, notifications, env)
├── .env                  # Environment variables (Firebase keys)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Expo CLI** (installed globally): `npm install -g expo-cli`
- **Xcode** (for iOS) or **Android Studio** (for Android)

### Installation

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase project keys:
     ```env
     EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
     EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

---

## 🎯 Run the App

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Web (development preview)

```bash
npm run web
```

---

## ✅ Testing Checklist

- [ ] **RTL Layout**: All text displays correctly in Arabic right-to-left
- [ ] **Navigation Flow**: Splash → Login → Home transitions work
- [ ] **Firebase Config**: App reads Firebase config from environment variables without errors
- [ ] **Cairo Font**: Arabic text uses Cairo font family (regular & bold)
- [ ] **Offer List**: Home screen displays mock offers with images
- [ ] **Pull to Refresh**: Offer list can be refreshed by pulling down
- [ ] **OfferCard UI**: Cards display image, title, discount badge, and details button
- [ ] **Login Screen**: Email/password inputs work with Arabic labels
- [ ] **Notifications**: Permission request triggers on app load (physical device)
- [ ] **Colors**: Orange primary (#FFA500), white background, dark text (#333333)
- [ ] **Android & iOS**: RTL consistent on both platforms

---

## 📦 Key Technologies

- **Expo SDK ~54** (with Expo Router for navigation)
- **React Native 0.81** (React 19)
- **TypeScript** (strict mode)
- **React Native Paper** (Material Design 3 UI components)
- **Firebase** (Authentication & Cloud Messaging)
- **i18next** (Arabic localization)
- **Cairo Font** (Google Fonts via @expo-google-fonts)
- **expo-notifications** (Push notifications)

---

## 🔧 Configuration Files

| File                     | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `app.config.ts`          | Expo app configuration (name, splash, plugins, env exposure) |
| `tsconfig.json`          | TypeScript paths & compiler options                          |
| `.env`                   | Environment variables (Firebase keys)                        |
| `src/config/i18n.ts`     | i18next initialization with Arabic translations              |
| `src/theme/index.ts`     | React Native Paper theme with custom colors                  |
| `src/config/firebase.ts` | Firebase app initialization from env                         |
| `src/config/auth.ts`     | Firebase auth utilities (login, logout, observer)            |

---

## 🌐 RTL & Localization

- **RTL forced globally** via `I18nManager.forceRTL(true)` in `src/config/i18n.ts`
- **Cairo font** loaded for all Arabic text
- **Translation keys** in `src/config/locales/ar.json`
- **TextAlign** set to `"right"` for inputs and text components

---

## 🔔 Notifications Setup

Push notifications are configured via:

- `expo-notifications` plugin in `app.config.ts`
- `registerForPushNotificationsAsync()` utility in `src/utils/notifications.ts`
- Permission request triggered on splash screen mount

For Firebase Cloud Messaging (FCM):

1. Add your FCM server key to Firebase project settings
2. Update `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
3. Test with physical device (push notifications don't work in simulator)

---

## 🛠️ Development Notes

### Adding a New Screen

1. Create screen component in `src/screens/`
2. Add route file in `app/` or under route group like `(tabs)/`
3. Import screen component into route file

### Adding a New Component

- Create in `src/components/`
- Use React Native Paper components for consistency
- Add TypeScript props interface

### Firebase Authentication Flow

- **Splash screen** checks auth state via `observeAuthState()`
- Redirects to `/login` if not authenticated
- Redirects to `/(tabs)` if authenticated
- **Login screen** calls `login(email, password)` and navigates on success

### Mock Data

- Offer mock data in `src/screens/Home.tsx`
- Uses random images from `picsum.photos` for placeholders

---

## 📄 License

MIT

---

## 👨‍💻 Author

Built with ❤️ for the Arabic-speaking community.
