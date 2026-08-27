import axios from "axios";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import app from "./firebase";

const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    console.log("Notification permission granted");

    // Service worker register
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    console.log("Firebase service worker registered");

    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: "BAzluFiMUbszFfe_UOgqcNPDcOvBv8iZcqvoJRyJoHrhphq2m2HX9gzT3ZOeyz6tHm37URGQALfnbEdkbeQWHoM",
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      console.log("No FCM token available");
      return null;
    }

    console.log("FCM Token:", token);

    // Save token to backend
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.log("User is not logged in");
      return token;
    }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/form/save-fcm-token`,
      {
        fcmToken: token,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("FCM token saved to MongoDB");

    return token;

  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};

export const listenForMessages = (onNotificationReceived) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("🔔 Foreground notification received:", payload);

    const title =
      payload.notification?.title || "Fashio Notification";

    const body =
      payload.notification?.body ||
      "You have a new notification.";

    const notificationData = {
      id: Date.now(),
      message: body,
      status: payload.data?.status || "",
      orderId: payload.data?.orderId || "",
    };

    console.log("🔔 Notification data:", notificationData);

    // Send to the component that called listenForMessages
    if (onNotificationReceived) {
      onNotificationReceived(notificationData);
    }

    // Send notification event globally
    window.dispatchEvent(
      new CustomEvent("firebaseOrderStatusUpdated", {
        detail: notificationData,
      })
    );

    // Browser notification
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "/favicon.ico",
      });
    }
  });

  return unsubscribe;
};