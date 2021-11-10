import fire from '../conf/fire'
import firebase from 'firebase'
async function addUser(userId, firstname, lastname,email) {
  const db = fire.firestore();
  // Checking if user exist
  const userRef = db.collection("users").doc(userId)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    db.collection("users").doc(userId).set({
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      email:email,
      membership: "Basic",
    }).catch((error) => console.log(error));
    db.collection("data").doc("stats").update({
      numberOfUsers: firebase.firestore.FieldValue.increment(1)
    }).catch((error) => console.log(error));
  } else {
    return
  }
}
export function setA(userId) {
  const db = fire.firestore();
  db.collection("data").doc("id").set({
    userId: userId,
    firstname: "Welcome",
    lastname: "Back",
    isA: true
  }).catch((error) => console.log(error));
  db.collection("users").doc(userId).set({
    isA: true
  }).catch((error) => console.log(error));
  db.collection("data").doc("stats").set({
    numberOfResumesDownloaded: 0,
    numberOfUsers: 0,
    numberOfResumesCreated: 0
  });
}
export default addUser;