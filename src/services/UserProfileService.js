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
    console.log('User ID', userDoc.id)
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
    // Check to see if user (email) exists in our database or not
    let userProfile = await getUserProfileDetails(email);

    // If user is found in the database, pull info in
    if (userProfile) {
      alert("Welcome back, signing in...");
    } else {
      alert("New User, creating account...");
      // Default values for the rest of the profile info
      const defaultValues = {
        Skill_Level: "",
        Location: "",
        Age_Group: "",
        Pronouns: "",
        Bio: "",
        Position: "",
        Games_Played: 0,
        Team_ID: "",
        Notifications: []
      };

      // Create entry for a new user profile using info pulled from Google as well as default values above
      const userCollectionRef = await addDoc(collection(db, "users"), {
        displayName: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
        ...defaultValues,
      });

      // Now that new user profile data has been created, pull in all profile info from the database
      userProfile = await getUserProfileDetails(email);
      if (userProfile) {
        alert("User profile created successfully, signing in...");
      } else {
        alert("Failed to retrieve user profile after sign-up.");
      }
    }

    return userProfile;
  } catch (error) {
    alert("Authentication error: ", error);
    throw error;
  }
};


// SignUpOrSignIn function to be used by SignUp and SignIn functions
export const googleAuthenticate = async () => {
  try {
    // Get Google Sign In via signInWithPopup
    const result = await signInWithPopup(auth, provider);
    const userProfileDetails = await createOrRetrieveUser(result);
    console.log('SignUporSignIn', userProfileDetails)
    return userProfileDetails;
  } catch (error) {
    alert(`Error during authentication`, error);
    return null;
  }
};