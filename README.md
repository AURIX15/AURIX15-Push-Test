# AURIX15 Push Test

Standalone Firebase Cloud Messaging web-push test app.

## Files
- `index.html`: test interface
- `app.js`: requests notification permission and obtains this browser's FCM registration token
- `firebase-messaging-sw.js`: background messaging service worker

## Deploy
Enable GitHub Pages from **Settings → Pages → Deploy from a branch → main → /(root)**.
The site must be served over HTTPS.

## Send a test notification
1. Open the deployed site in Chrome on Android.
2. Tap **تفعيل الإشعارات وتسجيل الجهاز** and allow notifications.
3. Keep the device registration token private.
4. In Firebase Console → Messaging, create a test notification and target the copied registration token.

This first test checks delivery only. Scheduled reminders require a trusted server-side scheduler and secure message-sending credentials; never put service-account private keys in this repository.