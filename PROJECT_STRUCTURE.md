# 3ardElYoum Project Structure

```
3ardElYoum/
│
├── client/                                    # Main Expo React Native app
│   │
│   ├── app/                                   # Expo Router routes (file-based)
│   │   ├── _layout.tsx                        # Root layout (theme, i18n, navigation)
│   │   ├── splash.tsx                         # Splash screen route (auth check)
│   │   ├── login.tsx                          # Login screen route
│   │   ├── (tabs)/                            # Tab navigation group
│   │   │   ├── _layout.tsx                    # Tabs layout
│   │   │   └── index.tsx                      # Home tab (offers feed)
│   │   ├── +html.tsx                          # HTML metadata
│   │   ├── +not-found.tsx                     # 404 page
│   │   └── modal.tsx                          # Modal example
│   │
│   ├── src/                                   # Source code
│   │   ├── components/                        # Reusable UI components
│   │   │   └── OfferCard.tsx                  # Offer card with image, discount, button
│   │   │
│   │   ├── screens/                           # Screen components
│   │   │   ├── Home.tsx                       # Home screen (offer list, pull-to-refresh)
│   │   │   ├── Login.tsx                      # Login screen (email/password)
│   │   │   └── Splash.tsx                     # Splash screen (auth listener)
│   │   │
│   │   ├── config/                            # Configuration
│   │   │   ├── firebase.ts                    # Firebase initialization (reads from env)
│   │   │   ├── auth.ts                        # Auth utilities (login, logout, observer)
│   │   │   ├── i18n.ts                        # i18next setup (Arabic, RTL)
│   │   │   └── locales/
│   │   │       └── ar.json                    # Arabic translations
│   │   │
│   │   ├── theme/                             # Theme configuration
│   │   │   └── index.ts                       # React Native Paper theme (colors)
│   │   │
│   │   ├── utils/                             # Utility functions
│   │   │   ├── index.ts                       # General utils (validation, RTL, date)
│   │   │   └── notifications.ts               # Push notification handlers
│   │   │
│   │   └── navigation/                        # Navigation (unused, using Expo Router)
│   │       └── index.tsx
│   │
│   ├── types/                                 # TypeScript type definitions
│   │   ├── offer.ts                           # Offer interface
│   │   └── user.ts                            # User interface
│   │
│   ├── assets/                                # Media assets
│   │   ├── images/                            # Images (splash, icon, adaptive-icon)
│   │   │   ├── icon.png
│   │   │   ├── splash-icon.png
│   │   │   ├── adaptive-icon.png
│   │   │   └── favicon.png
│   │   └── icons/                             # Icons (empty, ready for custom icons)
│   │
│   ├── components/                            # Legacy components (from template)
│   │   ├── ExternalLink.tsx
│   │   ├── ThemedText.tsx
│   │   ├── ThemedView.tsx
│   │   └── ...
│   │
│   ├── constants/                             # Constants (from template)
│   │   └── Colors.ts
│   │
│   ├── app.config.ts                          # Expo app configuration (name, splash, env)
│   ├── tsconfig.json                          # TypeScript configuration (paths)
│   ├── package.json                           # Dependencies and scripts
│   ├── .env                                   # Environment variables (Firebase keys)
│   ├── .env.example                           # Environment variables template
│   ├── .gitignore                             # Git ignore rules
│   └── README.md                              # Client app documentation
│
├── start.sh                                   # Quick start script (iOS/Android/Web)
├── README.md                                  # Root repository documentation
└── IMPLEMENTATION.md                          # Implementation checklist

```

---

## 🔑 Key Files Explained

### Configuration Files

| File            | Purpose                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| `app.config.ts` | Expo app configuration (name, splash, icons, plugins, Firebase env exposure) |
| `tsconfig.json` | TypeScript compiler options (strict mode, path aliases)                      |
| `.env`          | Environment variables (Firebase API keys, project ID, etc.)                  |
| `.env.example`  | Template for environment variables                                           |

### Routes (Expo Router)

| File                   | Route      | Description                                          |
| ---------------------- | ---------- | ---------------------------------------------------- |
| `app/splash.tsx`       | `/splash`  | Entry point, checks auth and routes to login or home |
| `app/login.tsx`        | `/login`   | Login screen with Firebase auth                      |
| `app/(tabs)/index.tsx` | `/(tabs)/` | Home screen with daily offers feed                   |
| `app/_layout.tsx`      | Root       | Wraps all routes with theme, i18n, navigation        |

### Screens

| File                     | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `src/screens/Home.tsx`   | Offer list with FlatList, pull-to-refresh, mock data |
| `src/screens/Login.tsx`  | Email/password form with Firebase integration        |
| `src/screens/Splash.tsx` | Loading screen with auth state listener              |

### Components

| File                           | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `src/components/OfferCard.tsx` | Reusable card for offers (image, title, discount, button) |

### Configuration & Services

| File                         | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| `src/config/firebase.ts`     | Firebase app initialization (reads from env via expo-constants) |
| `src/config/auth.ts`         | Firebase auth utilities (login, logout, observeAuthState)       |
| `src/config/i18n.ts`         | i18next setup (Arabic language, RTL forcing)                    |
| `src/config/locales/ar.json` | Arabic translation strings                                      |
| `src/theme/index.ts`         | React Native Paper theme (orange primary, white bg)             |

### Utilities

| File                         | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `src/utils/index.ts`         | General helpers (validation, date formatting, RTL utilities) |
| `src/utils/notifications.ts` | Expo Notifications setup (permission request, handler)       |

### Types

| File             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `types/offer.ts` | TypeScript interface for Offer (id, title, image, discount) |
| `types/user.ts`  | TypeScript interface for User (id, email, displayName)      |

---

## 🎨 Theme & Design

### Colors

- **Primary**: `#FFA500` (Orange)
- **Background**: `#FFFFFF` (White)
- **Text**: `#333333` (Dark Gray)

### Typography

- **Font Family**: Cairo (Google Fonts)
  - Regular: `Cairo_400Regular`
  - Bold: `Cairo_700Bold`

### Layout

- **Direction**: RTL (right-to-left)
- **Language**: Arabic (ar)

---

## 🚀 Quick Commands

```bash
# Install dependencies
cd client && npm install

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# TypeScript check
npx tsc --noEmit

# Or use the helper script
./start.sh
```

---

## 📱 Navigation Flow

```
Splash Screen
    ├── Not Authenticated → Login Screen
    │                           └── Successful Login → Home (Tabs)
    │
    └── Authenticated → Home (Tabs)
                            └── Offers Feed
```

---

## 🔐 Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in Firebase credentials:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
3. Restart the dev server if running

---

## 📚 Documentation

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Paper Docs](https://callstack.github.io/react-native-paper/)
- [Firebase Docs](https://firebase.google.com/docs)
- [i18next Docs](https://www.i18next.com/)
