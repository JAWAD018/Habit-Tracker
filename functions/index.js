const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Common function to send reminder
 */
async function sendReminder(title, body) {
  const usersSnap = await admin
    .firestore()
    .collection("users")
    .where("notificationEnabled", "==", true)
    .get();

  for (const doc of usersSnap.docs) {
    const data = doc.data();
    const token = data.fcmToken;

    if (!token) continue;

    try {
      await admin.messaging().send({
        token,
        notification: {
          title,
          body,
        },
        android: {
          priority: "high",
        },
        webpush: {
          headers: {
            Urgency: "high",
          },
        },
      });
    } catch (err) {
      console.error("FCM error:", err.message);
    }
  }
}

/**
 * 🔔 10 AM Reminder
 */
exports.morningReminder = functions.pubsub
  .schedule("0 10 * * *") // 10:00 AM
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    await sendReminder(
      "Good Morning 🌅",
      "Don’t forget to complete your tasks!"
    );
    return null;
  });

/**
 * 🔔 3 PM Reminder
 */
exports.afternoonReminder = functions.pubsub
  .schedule("0 15 * * *") // 3:00 PM
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    await sendReminder(
      "Afternoon Check ⏰",
      "Quick reminder to stay on track!"
    );
    return null;
  });

  /**
 * 🔔 TEST Reminder – 9:08 AM
 */
exports.testReminder = functions.pubsub
  .schedule("8 9 * * *") // 9:08 AM
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    await sendReminder(
      "Test Reminder 🧪",
      "This is a test notification at 9:08 AM"
    );
    return null;
  });

