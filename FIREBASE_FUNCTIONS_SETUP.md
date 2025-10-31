# Firebase Cloud Functions for Push Notifications

This document explains how to set up Firebase Cloud Functions to send push notifications for new offers in the 3ardElYoum app.

## Setup

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
```

2. Initialize Firebase Functions in your project:

```bash
cd functions
npm install
```

3. Install required dependencies:

```bash
npm install firebase-admin
npm install expo-server-sdk
```

## Cloud Function: Send Notification on New Offer

Create `functions/index.js`:

\`\`\`javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Expo } = require('expo-server-sdk');

admin.initializeApp();
const expo = new Expo();

/\*\*

- Trigger: When a new offer is created in Firestore
- Action: Send push notification to all users
  \*/
  exports.sendNewOfferNotification = functions.firestore
  .document('offers/{offerId}')
  .onCreate(async (snap, context) => {
  const offer = snap.data();
  const offerId = context.params.offerId;

      // Get all users with push tokens
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .where('push_token', '!=', null)
        .get();

      const messages = [];

      usersSnapshot.forEach((userDoc) => {
        const user = userDoc.data();
        const pushToken = user.push_token;

        // Check that the push token is valid
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(\`Invalid push token: \${pushToken}\`);
          return;
        }

        // Save notification to user's subcollection
        admin.firestore()
          .collection('users')
          .doc(userDoc.id)
          .collection('notifications')
          .add({
            title: '🔥 عرض جديد اليوم',
            body: \`\${offer.title} - خصم \${offer.discount}%\`,
            offer_ref: \`/offers/\${offerId}\`,
            is_read: false,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
          });

        // Prepare push notification message
        messages.push({
          to: pushToken,
          sound: 'default',
          title: '🔥 عرض جديد اليوم',
          body: \`\${offer.title} - خصم \${offer.discount}%\`,
          data: { offerId },
          badge: 1,
        });
      });

      // Send push notifications in chunks
      const chunks = expo.chunkPushNotifications(messages);
      const tickets = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error('Error sending push notifications:', error);
        }
      }

      console.log(\`Sent \${messages.length} notifications for offer: \${offerId}\`);
      return tickets;

  });

/\*\*

- Scheduled function: Send daily offer reminder at 9 AM
  _/
  exports.sendDailyOfferReminder = functions.pubsub
  .schedule('0 9 _ \* \*')
  .timeZone('Africa/Cairo')
  .onRun(async (context) => {
  // Get today's active offers
  const offersSnapshot = await admin.firestore()
  .collection('offers')
  .where('is_active', '==', true)
  .where('created_at', '>=', admin.firestore.Timestamp.fromDate(
  new Date(new Date().setHours(0, 0, 0, 0))
  ))
  .limit(1)
  .get();

      if (offersSnapshot.empty) {
        console.log('No offers for today');
        return null;
      }

      const offer = offersSnapshot.docs[0].data();
      const offerId = offersSnapshot.docs[0].id;

      // Get all users with push tokens
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .where('push_token', '!=', null)
        .get();

      const messages = [];

      usersSnapshot.forEach((userDoc) => {
        const user = userDoc.data();
        const pushToken = user.push_token;

        if (!Expo.isExpoPushToken(pushToken)) {
          return;
        }

        messages.push({
          to: pushToken,
          sound: 'default',
          title: '☀️ عرض اليوم',
          body: \`\${offer.title} - خصم \${offer.discount}%\`,
          data: { offerId },
          badge: 1,
        });
      });

      // Send notifications
      const chunks = expo.chunkPushNotifications(messages);
      for (const chunk of chunks) {
        try {
          await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          console.error(error);
        }
      }

      console.log(\`Sent daily reminder to \${messages.length} users\`);
      return null;

  });
  \`\`\`

## Deploy

Deploy your functions:

```bash
firebase deploy --only functions
```

## Testing

Test locally:

```bash
firebase emulators:start --only functions,firestore
```

## Manual Send via Firebase Console

You can also send notifications manually from Firebase Console:

1. Go to Firebase Console > Cloud Messaging
2. Create a new campaign
3. Select your app
4. Compose your message in Arabic
5. Add custom data: `{ "offerId": "your-offer-id" }`

## Environment Variables

Set up your Firebase project:

```bash
firebase functions:config:set expo.push_url="https://exp.host/--/api/v2/push/send"
```

## Monitoring

Monitor function logs:

```bash
firebase functions:log
```

## Notes

- Push notifications only work on physical devices (not simulators/emulators)
- Users must grant notification permissions
- Expo push tokens are stored in Firestore under users/{uid}/push_token
- Notification history is stored in users/{uid}/notifications subcollection
