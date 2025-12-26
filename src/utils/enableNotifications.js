import { getToken } from "firebase/messaging";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { messaging, db, auth } from "../firebase";

export async function enableNotifications() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Permission blocked");
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: "BJYZ1o8RTlsTrbu4-pS_jYgeuld1xa59RUmrEs0U9xmeo6JENbbq0XEMwHuCJlrVHpp85j3gGWu34XH0G9uyf_w"
  });

  const user = auth.currentUser;
  if (!user) {
    alert("User not logged in");
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      fcmToken: token,
      notificationEnabled: true,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  alert("FCM token saved correctly ✅");
}
