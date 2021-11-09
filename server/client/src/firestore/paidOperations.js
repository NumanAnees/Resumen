import fire from '../conf/fire';

export async function getUserMembership (userId){
     const db = fire.firestore();
     const usersRef  = db.collection("users").doc(userId);
     const snapshot = await usersRef.get()
     if(snapshot.exists){
         return snapshot.data()
     }else{
         return false;
     }
} 