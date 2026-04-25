const db = require("./firebaseAdmin");

async function getAllBookMarks() {
  try {
    const snapshot = await db.ref("bookmarks").once("value");

    if (!snapshot.exists()) {
      console.log("No data available");
      return [];
    }
    
    return snapshot.val();
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getAllBookMarks,
};
