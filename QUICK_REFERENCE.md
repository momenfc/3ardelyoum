# 3ardElYoum - Quick Reference Card

## 🚀 Quick Start

```bash
cd client
npm install
npm run ios     # or android / web
```

## 🔐 Firebase Setup

1. Create project at https://console.firebase.google.com/
2. Enable Email/Password auth
3. Copy config to `client/.env`

## 📱 Routes

| Route      | Screen | Auth Required |
| ---------- | ------ | ------------- |
| `/splash`  | Splash | No            |
| `/login`   | Login  | No            |
| `/(tabs)/` | Home   | Yes           |

## 🎨 Design Tokens

```typescript
PRIMARY: '#FFA500'; // Orange
BACKGROUND: '#FFFFFF'; // White
TEXT: '#333333'; // Dark Gray
FONT: 'Cairo'; // Regular 400, Bold 700
DIRECTION: 'RTL'; // Right-to-left
```

## 📂 Key Files

```
client/
├── app/
│   ├── _layout.tsx       # Root layout
│   ├── splash.tsx        # Entry point
│   ├── login.tsx         # Login screen
│   └── (tabs)/index.tsx  # Home screen
├── src/
│   ├── components/OfferCard.tsx
│   ├── screens/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Splash.tsx
│   ├── config/
│   │   ├── firebase.ts   # Firebase init
│   │   ├── auth.ts       # Auth utils
│   │   └── i18n.ts       # i18next
│   ├── theme/index.ts    # Theme config
│   └── utils/
│       ├── index.ts      # General utils
│       └── notifications.ts
├── types/
│   ├── offer.ts
│   └── user.ts
├── app.config.ts         # Expo config
├── .env                  # Environment vars
└── package.json
```

## 🔧 Common Commands

```bash
# TypeScript check
npx tsc --noEmit

# Clear cache
npx expo start -c

# Install deps
npm install

# Run platforms
npm run ios
npm run android
npm run web
```

## 🐛 Common Issues

**Firebase config not found**
→ Create `.env` and fill Firebase keys

**RTL not working**
→ Clear cache: `npx expo start -c`

**Fonts not loading**
→ Clear cache and restart

**TypeScript errors**
→ Run `npx tsc --noEmit`

## ✅ Testing Checklist

- [ ] Firebase configured
- [ ] App launches
- [ ] Splash → Login redirect
- [ ] Login works
- [ ] Home shows offers
- [ ] RTL layout correct
- [ ] Cairo font loads
- [ ] Colors match

## 📱 Test User

Create in Firebase Console:

- Email: `test@test.com`
- Password: `123456`

## 🎯 Features

✅ Arabic RTL layout
✅ Firebase auth
✅ Push notifications
✅ Offer feed
✅ Pull-to-refresh
✅ Cairo font
✅ Material Design 3
✅ TypeScript
✅ Type-safe routing

## 📚 Documentation

- `README.md` - Main docs
- `client/README.md` - App docs
- `NEXT_STEPS.md` - Setup guide
- `AUTH_FLOW.md` - Auth logic
- `PROJECT_STRUCTURE.md` - File guide
- `IMPLEMENTATION.md` - Checklist
- `PROJECT_COMPLETE.md` - Summary

## 🔄 Auth Flow

```
Launch → Splash → Check Auth
              ├─ Not Auth → Login → Home
              └─ Auth → Home
```

## 📦 Tech Stack

- Expo SDK ~54
- React Native 0.81
- React 19.1
- TypeScript 5.9
- React Native Paper
- Firebase
- i18next
- Cairo Font

## 🌐 i18n

- Language: Arabic (ar)
- Direction: RTL
- Translations: `src/config/locales/ar.json`

## 💡 Pro Tips

1. Always clear cache when fonts/config change
2. Test on physical device for push notifications
3. Use TypeScript check before building
4. Keep `.env` out of git (already in .gitignore)
5. Read docs before asking for help

## 🎉 You're Ready!

Start with Firebase setup, then run the app!
