import { auth, db, provider } from "../services/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Get User Profile Details from Database (Firestore)
export const getUserProfileDetails = async (email) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);

  // If data found, pull in user profile info from database
  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    // Add userDoc.id into the userProfileData to have one complete userProfile object
    const userProfileData = { ...userDoc.data(), userID: userDoc.id };
    return userProfileData
  }
  return null;
};

// Authenticate User and update user profile context
export const createOrRetrieveUser = async (result) => {
  try {
    
    const { displayName, email, photoURL } = result.user;

    let userProfile = await getUserProfileDetails(email);

    if (!userProfile) {
      const defaultValues = {
        Skill_Level: "",
        Location: "",
        Age_Group: "",
        Pronouns: "",
        Bio: "",
        Position: "",
        Games_Played: 0,
        Team_Code: "",
        Notifications: []
      };

      const userCollectionRef = await addDoc(collection(db, "users"), {
        displayName: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
        ...defaultValues,
      });

      userProfile = await getUserProfileDetails(email);
    }

    return userProfile;
  } catch (error) {
    console.error("Authentication error: ", error);
    throw error;
  }
};



// GoogleAuthentication function to log user in or sign them up and then sign in
export const googleAuthenticate = async () => {
  try {
    // Get Google Sign In via signInWithPopup
    const result = await signInWithPopup(auth, provider);
    const userProfileDetails = await createOrRetrieveUser(result);
    return userProfileDetails;
  } catch (error) {
    alert(`Error during authentication`, error);
    return null;
  }
};