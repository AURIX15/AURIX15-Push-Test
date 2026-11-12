import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getMessaging, getToken, isSupported, onMessage } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAey4K4hOcuBvZea__WGPqv5Tahm8OEPpNQ",
  authDomain: "aurix15-push-test-9e9fe.firebaseapp.com",
  projectId: "aurix15-push-test-9e9fe",
  storageBucket: "aurix15-push-test-9e9fe.firebasestorage.app",
  messagingSenderId: "831973947031",
  appId: "1:831973947031:web:a3d2bb33958d0a9d13dbd2",
  measurementId: "G-XGE0K0M2M3"
};

const VAPID_PUBLIC_KEY = "BFXtDIpZxIkz5XakDaIXpSUrI9YmLbebx-sJYQf0Xey6oDEtuTms1BFwMSvBluIIY1xzRLDsfU-n10glR55XKCk";

const app = initializeApp(firebaseConfig);
const enableBtn = document.getElementById("enableBtn");
const statusBox = document.getElementById("status");
const tokenBox = document.getElementById("tokenBox");
const tokenArea = document.getElementById("token");
const copyBtn = document.getElementById("copyBtn");

function setStatus(message) {
  statusBox.textContent = message;
}

enableBtn.addEventListener("click", async () => {
  enableBtn.disabled = true;
  setStatus("جارٍ فحص دعم الإشعارات...");
  try {
    if (!("serviceWorker" in navigator) || !("Notification" in window)) {
      throw new Error("المتصفح لا يدعم Service Worker أو إشعارات الويب.");
    }
    if (!(await isSupported())) {
      throw new Error("Firebase Messaging غير مدعوم في هذا المتصفح أو هذا السياق.");
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("لم يتم منح إذن الإشعارات. اسمح به من إعدادات الموقع ثم حاول مجددًا.");
    }

    setStatus("تم الإذن. جارٍ تسجيل Service Worker...");
    const swRegistration = await navigator.serviceWorker.register("./firebase-messaging-sw.js");
    await navigator.serviceWorker.ready;

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
      serviceWorkerRegistration: swRegistration
    });

    if (!token) {
      throw new Error("لم يتم إصدار رمز للجهاز. أعد المحاولة بعد التأكد من الإذن والاتصال.");
    }

    tokenArea.value = token;
    tokenBox.style.display = "block";
    setStatus("نجح التسجيل! هذا الجهاز جاهز لاستقبال إشعار الاختبار. احتفظ برمز الجهاز بشكل خاص.");
    onMessage(messaging, (payload) => {
      const title = payload.notification?.title || "وصل إشعار تجريبي";
      const body = payload.notification?.body || "تم استلام رسالة أثناء فتح التطبيق.";
      setStatus("وصل إشعار والتطبيق مفتوح:\n" + title + "\n" + body);
    });
  } catch (error) {
    console.error(error);
    setStatus("تعذر إكمال التسجيل:\n" + (error?.message || String(error)));
  } finally {
    enableBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(tokenArea.value);
    setStatus("تم نسخ رمز الجهاز. لا تنشره علنًا.");
  } catch {
    tokenArea.focus();
    tokenArea.select();
    setStatus("حدد الرمز وانسخه يدويًا. لا تنشره علنًا.");
  }
});