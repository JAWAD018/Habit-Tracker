// src/utils/enableNotifications.js
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

export async function enableNotifications() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Notifications blocked");
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: "BB11QKT5ZEHOL2oUzsMva2Lqnb5mPfw-ZbNcLUSBaySLGYu_Id1833zx58kCcITxKh_7IPbGHhRRj9U5nliQjhQ",
  });

  if (!token) {
    alert("FCM token not generated");
    return;
  }

  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      fcmToken: token,
      notificationEnabled: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  console.log("✅ FCM TOKEN SAVED:", token);
}
