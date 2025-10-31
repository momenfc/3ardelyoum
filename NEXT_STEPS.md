# 🎯 Next Steps - 3ardElYoum

Your **3ardElYoum** app is fully scaffolded and ready to run! Here's what to do next:

---

## ✅ Step 1: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Email/Password Authentication**:
   - Go to **Authentication** → **Sign-in method**
   - Enable **Email/Password**
4. Get your Firebase config:
   - Go to **Project Settings** → **General**
   - Scroll to **Your apps** → **Web app**
   - Copy the config object
5. Fill in `client/.env`:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-app
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

---

## ✅ Step 2: Run the App

```bash
cd client

# iOS Simulator (macOS only)
npm run ios

# Android Emulator
npm run android

# Web Preview (for quick testing)
npm run web
```

Or use the helper script:

```bash
./start.sh
```

---

## ✅ Step 3: Test the App

### Manual Testing Checklist

- [ ] **Splash Screen**

  - App shows splash screen on launch
  - Auto-navigates to Login (if not authenticated)
  - Auto-navigates to Home (if authenticated)

- [ ] **Login Screen**

  - Email and password inputs work
  - Text displays in Arabic (RTL)
  - Login button is orange (#FFA500)
  - Keyboard dismisses on tap outside
  - Successful login navigates to Home

- [ ] **Home Screen**

  - Displays list of 8 mock offers
  - Each offer card shows:
    - Image (from picsum.photos)
    - Title in Arabic
    - Discount badge (orange with percentage)
    - "عرض التفاصيل" button
  - Pull-to-refresh works
  - Tab bar shows at bottom

- [ ] **RTL Layout**

  - All text aligns right
  - Navigation animations are RTL-aware
  - Inputs have right-aligned text

- [ ] **Cairo Font**

  - Arabic text uses Cairo font
  - Bold titles use Cairo_700Bold

- [ ] **Colors**
  - Primary buttons are orange (#FFA500)
  - Background is white (#FFFFFF)
  - Text is dark gray (#333333)

---

## ✅ Step 4: Create a Test User

Since you have a fresh Firebase project:

1. Open Firebase Console → **Authentication** → **Users**
2. Click **Add user**
3. Create a test account:
   - Email: `test@test.com`
   - Password: `123456`
4. Use this to test login in the app

---

## 🚀 Optional Enhancements

Once the core app works, you can add:

### 1. Offer Details Screen

Create a new screen to show full offer information when the "عرض التفاصيل" button is clicked.

```bash
# Create the file
touch client/app/offer/[id].tsx
```

### 2. Real Offer Data

Replace mock data with a real API or Firebase Firestore:

```typescript
// Example: Fetch from Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/config/firebase';

const offersCollection = collection(db, 'offers');
const snapshot = await getDocs(offersCollection);
const offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### 3. Push Notifications (FCM)

Set up Firebase Cloud Messaging for real push notifications:

1. Add `google-services.json` (Android) to `android/app/`
2. Add `GoogleService-Info.plist` (iOS) to `ios/`
3. Test on physical device (push doesn't work in simulator)

### 4. Logout Button

Add a logout button to the Home screen:

```typescript
import { logout } from '@/src/config/auth';
import { router } from 'expo-router';

<Button
  onPress={async () => {
    await logout();
    router.replace('/login');
  }}>
  تسجيل الخروج
</Button>;
```

### 5. User Profile

Create a user profile screen showing user info from Firebase auth.

### 6. Search & Filters

Add search functionality to filter offers by name or discount.

### 7. Favorites

Let users save favorite offers using AsyncStorage or Firestore.

### 8. Dark Mode

Implement dark theme support with react-native-paper.

### 9. Animations

Add smooth transitions using `react-native-reanimated`.

### 10. Error Handling

Show user-friendly error messages for login failures.

---

## 📚 Useful Resources

- **Expo Documentation**: https://docs.expo.dev/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **React Native Paper**: https://callstack.github.io/react-native-paper/
- **Firebase Authentication**: https://firebase.google.com/docs/auth
- **Firebase Cloud Messaging**: https://firebase.google.com/docs/cloud-messaging
- **i18next**: https://www.i18next.com/

---

## 🐛 Troubleshooting

### Error: Firebase config not found

- Make sure `.env` file exists in `client/` directory
- Restart the dev server after editing `.env`
- Check that all Firebase keys are filled in

### RTL not working

- Clear cache: `npx expo start -c`
- Restart the app
- Check that `I18nManager.forceRTL(true)` is in `src/config/i18n.ts`

### Fonts not loading

- Clear cache: `npx expo start -c`
- Check that `@expo-google-fonts/cairo` is installed
- Verify `useFonts()` hook in `app/_layout.tsx`

### Push notifications not working

- Push notifications only work on physical devices
- Make sure you've added FCM config files
- Check that permission was granted

### TypeScript errors

- Run `npx tsc --noEmit` to check for errors
- Make sure all imports use correct paths
- Check that `tsconfig.json` has correct path aliases

---

## 📞 Need Help?

If you run into issues:

1. Check the documentation in `client/README.md`
2. Review the implementation checklist in `IMPLEMENTATION.md`
3. Check the project structure in `PROJECT_STRUCTURE.md`
4. Review TypeScript errors: `npx tsc --noEmit`
5. Clear cache and restart: `npx expo start -c`

---

## 🎉 You're All Set!

Your app is ready to run. Start with Step 1 (Firebase config) and work your way through the steps. Enjoy building **3ardElYoum**! 🚀

---

## Quick Reference

```bash
# Navigate to app
cd client

# Install dependencies (if not done)
npm install

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# TypeScript check
npx tsc --noEmit

# Clear cache
npx expo start -c
```
