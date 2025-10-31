# Authentication Flow - 3ardElYoum

This document explains how authentication works in the app.

---

## 🔐 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          APP LAUNCH                                 │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                        ┌─────────────────┐
                        │  Native Splash  │ (expo-splash-screen)
                        │  (Auto-hidden)  │
                        └─────────────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │  app/_layout │ (Loads fonts & theme)
                          └──────────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │ app/splash   │ (Custom splash screen)
                          └──────────────┘
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │   observeAuthState(callback)  │
                  │   (Firebase auth listener)    │
                  └───────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
            ┌───────▼────────┐         ┌───────▼────────┐
            │  User = null   │         │  User exists   │
            │ (Not logged in)│         │  (Logged in)   │
            └───────┬────────┘         └───────┬────────┘
                    │                           │
                    ▼                           ▼
            ┌───────────────┐         ┌────────────────┐
            │  app/login    │         │  app/(tabs)    │
            │  Login Screen │         │  Home Screen   │
            └───────┬───────┘         └────────────────┘
                    │
                    │ User enters email/password
                    │ Clicks "دخول" button
                    │
                    ▼
        ┌──────────────────────────┐
        │ login(email, password)   │
        │ (Firebase signIn)        │
        └──────────┬───────────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
 ┌────▼─────┐            ┌─────▼──────┐
 │  Success │            │   Error    │
 └────┬─────┘            └─────┬──────┘
      │                         │
      │                         ▼
      │                  ┌─────────────┐
      │                  │ Show error  │
      │                  │ (optional)  │
      │                  └─────────────┘
      │
      ▼
┌──────────────────┐
│ router.replace   │
│   '/(tabs)'      │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  app/(tabs)      │
│  Home Screen     │
│  (Offers Feed)   │
└──────────────────┘
```

---

## 📂 Files Involved

### 1. `app/splash.tsx`

- **Purpose**: Entry point that checks authentication status
- **Key Code**:
  ```typescript
  React.useEffect(() => {
    const unsub = observeAuthState(user => {
      router.replace(user ? '/(tabs)' : '/login');
    });
    return () => unsub();
  }, []);
  ```

### 2. `src/config/auth.ts`

- **Purpose**: Firebase authentication utilities
- **Functions**:
  - `observeAuthState(callback)` - Listen to auth state changes
  - `login(email, password)` - Sign in with email/password
  - `logout()` - Sign out current user

### 3. `app/login.tsx`

- **Purpose**: Login screen route
- **Key Code**:
  ```typescript
  const onLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      // Handle error
    }
  };
  ```

### 4. `src/screens/Login.tsx`

- **Purpose**: Login screen component (UI)
- **Contains**: Email input, password input, login button

### 5. `src/config/firebase.ts`

- **Purpose**: Initialize Firebase app
- **Reads**: Environment variables from `expo-constants`

---

## 🔄 State Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION STATE                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐                    ┌────────────────┐  │
│  │  Not Signed In  │ ───login()───────▶ │  Signed In     │  │
│  │  (user = null)  │                    │  (user object) │  │
│  └─────────────────┘ ◀───logout()────── └────────────────┘  │
│                                                              │
│  ┌─────────────────┐                    ┌────────────────┐  │
│  │  /login route   │                    │  /(tabs) route │  │
│  └─────────────────┘                    └────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 How It Works

### Initial Load (Cold Start)

1. **App launches** → Native splash screen shows
2. **Fonts load** → `app/_layout.tsx` loads Cairo fonts
3. **Splash screen shows** → `app/splash.tsx` renders
4. **Auth listener starts** → `observeAuthState()` called
5. **Check auth state**:
   - If `user = null` → Navigate to `/login`
   - If `user exists` → Navigate to `/(tabs)`

### Login Flow

1. **User on login screen** → Enters email & password
2. **User clicks "دخول"** → `onLogin()` function called
3. **Firebase sign in** → `login(email, password)` called
4. **Auth state changes** → `observeAuthState` detects change
5. **Navigate to home** → `router.replace('/(tabs)')`
6. **Home screen shows** → User sees offers feed

### Logout Flow (When Implemented)

1. **User clicks logout button** → `logout()` function called
2. **Firebase sign out** → User session cleared
3. **Auth state changes** → `observeAuthState` detects change
4. **Navigate to login** → `router.replace('/login')`
5. **Login screen shows** → User sees login form

---

## 🔑 Key Concepts

### Protected Routes

- The app doesn't have explicit "protected route" middleware
- Instead, auth state determines navigation at app launch
- `observeAuthState()` continuously monitors auth changes

### Persistent Auth

- Firebase Auth automatically persists user sessions
- User stays logged in even after closing the app
- Session is stored in AsyncStorage (managed by Firebase SDK)

### Auto-Redirect

- If logged in user manually navigates to `/login`, nothing prevents it
- To add protection, implement navigation guards in `_layout.tsx`

---

## 🛡️ Optional: Add Route Protection

If you want to prevent logged-in users from accessing `/login`:

```typescript
// app/_layout.tsx
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { observeAuthState } from '@/src/config/auth';

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsub = observeAuthState(u => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      // User not logged in but trying to access protected route
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      // User logged in but on login screen
      router.replace('/(tabs)');
    }
  }, [user, segments]);

  // ... rest of layout
}
```

---

## 📱 Testing the Flow

### Test Case 1: Fresh Install (Not Logged In)

1. Launch app
2. See splash screen briefly
3. Redirect to login screen
4. Enter credentials
5. Login successful
6. Redirect to home screen

### Test Case 2: Returning User (Already Logged In)

1. Launch app
2. See splash screen briefly
3. Redirect to home screen (skip login)

### Test Case 3: Logout (When Implemented)

1. On home screen
2. Click logout button
3. Redirect to login screen
4. Cannot access home without logging in again

---

## 🐛 Common Issues

### Issue: "Firebase config not found"

**Cause**: `.env` file missing or empty  
**Solution**: Create `.env` and fill in Firebase credentials

### Issue: "Network request failed"

**Cause**: No internet connection or invalid Firebase URL  
**Solution**: Check internet connection and Firebase project settings

### Issue: "Invalid credentials"

**Cause**: Wrong email/password or user doesn't exist  
**Solution**: Create a test user in Firebase Console → Authentication

### Issue: Stuck on splash screen

**Cause**: `observeAuthState()` not resolving  
**Solution**: Check Firebase initialization and network connection

---

## 🎯 Summary

1. **Splash screen** checks auth state using Firebase
2. **If not logged in** → Navigate to Login
3. **If logged in** → Navigate to Home
4. **Login successful** → Firebase updates auth state → Auto-navigate to Home
5. **Logout** → Firebase clears auth state → Auto-navigate to Login

Simple, secure, and automatic! 🚀
