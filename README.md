# 3ardElYoum - عرض اليوم

## Arabic Daily Offers Mobile Application

This repository contains an Expo + React Native mobile app for browsing daily offers, designed for Arabic-speaking users with full RTL (right-to-left) support.

---

## 📂 Repository Structure

```
3ardElYoum/
├── client/          # Main Expo mobile app (React Native + TypeScript)
└── README.md        # This file
```

**The mobile app is located in the `client/` directory.**  
See [`client/README.md`](client/README.md) for setup and running instructions.

---

## 🚀 Quick Start

1. Navigate to the client app:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Copy `.env.example` to `.env`
   - Add your Firebase project credentials

4. Run the app:
   ```bash
   npm run ios       # iOS simulator
   npm run android   # Android emulator
   npm run web       # Web preview
   ```

---

## ✨ Features

✅ **Arabic-First Design**: Full RTL layout with Arabic UI text  
✅ **Firebase Authentication**: Email/password login with auth state management  
✅ **Push Notifications**: Expo Notifications with permission handling  
✅ **Daily Offers Feed**: Scrollable list of offers with images, discounts, and details  
✅ **Modern UI**: React Native Paper (Material Design 3) with custom orange theme  
✅ **Cairo Font**: Google Fonts integration for authentic Arabic typography  
✅ **Type-Safe Routing**: Expo Router with TypeScript typed routes  
✅ **Environment Config**: Secure Firebase config via environment variables

---

## 🛠️ Tech Stack

- **Expo SDK ~54** (with Expo Router)
- **React Native 0.81** + **React 19**
- **TypeScript** (strict mode)
- **React Native Paper** (UI components)
- **Firebase** (Auth & Cloud Messaging)
- **i18next** (Arabic localization)
- **Cairo Font** (Google Fonts)

---

## 📖 Documentation

Full documentation is available in [`client/README.md`](client/README.md), including:

- Installation & setup
- Running on iOS/Android/Web
- Firebase configuration
- Project structure
- Testing checklist
- RTL & localization details
- Development guidelines

---

## 🌐 Localization

- **Language**: Arabic (ar)
- **Direction**: RTL (right-to-left)
- **Font**: Cairo (regular & bold)
- **Translations**: JSON-based with i18next

---

## 📱 Screens

| Screen     | Route      | Description                                      |
| ---------- | ---------- | ------------------------------------------------ |
| **Splash** | `/splash`  | Checks auth state and navigates to login or home |
| **Login**  | `/login`   | Email/password authentication with Firebase      |
| **Home**   | `/(tabs)/` | Daily offers feed with pull-to-refresh           |

---

## 🎨 Design System

| Element              | Value                         |
| -------------------- | ----------------------------- |
| **Primary Color**    | Orange (#FFA500)              |
| **Background**       | White (#FFFFFF)               |
| **Text Color**       | Dark Gray (#333333)           |
| **Font Family**      | Cairo (400 Regular, 700 Bold) |
| **Layout Direction** | RTL (right-to-left)           |

---

## 🔐 Environment Variables

Required Firebase configuration in `client/.env`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

---

## 📄 License

MIT

---

## 👨‍💻 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🙏 Acknowledgments

Built with ❤️ for the Arabic-speaking community.
