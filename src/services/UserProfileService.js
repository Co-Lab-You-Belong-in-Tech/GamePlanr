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
    return userDoc.data();
  }
  return null;
};

// Authenticate User and update user profile context
export const authenticateUser = async (result, updateUserProfile) => {
  try {
    const { displayName, email, photoURL } = result.user;
    // Check to see if user (email) exists in our database or not
    const userProfile = await getUserProfileDetails(email);

    // If user is found in the database, pull info in and update user profile
    if (userProfile) {
      alert("User account found, signing in...");
      updateUserProfile(userProfile);
      return userProfile;
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
      };

      // Create entry for a new user profile using info pulled from Google as well as default values above
      const userCollectionRef = await addDoc(collection(db, "users"), {
        displayName: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
        ...defaultValues,
      });

      // Now that new user profile data has been created, pull in all profile info from the database
      const newUserProfile = await getUserProfileDetails(email);
      if (newUserProfile) {
        alert("User profile created successfully, signing in...");
        // Update user profile context for the newly signed up user
        updateUserProfile(newUserProfile);
        return newUserProfile;
      } else {
        alert("Failed to retrieve user profile after sign-up.");
        return null;
      }
    }
  } catch (error) {
    alert("Authentication error: ", error);
    return null;
  }
};

// SignUpOrSignIn function to be used by SignUp and SignIn functions
export const signUpOrSignIn = async (isSignUp, updateUserProfile) => {
  try {
    // Get Google Sign In via signInWithPopup
    const result = await signInWithPopup(auth, provider);
    const userProfileDetails = await authenticateUser(result, updateUserProfile);
    return userProfileDetails;
  } catch (error) {
    alert(`Error during ${isSignUp ? 'sign-up' : 'sign-in'}: `, error);
    return null;
  }
};

// SignUp function
export const signUp = async (updateUserProfile) => signUpOrSignIn(true, updateUserProfile);

// SignIn function
export const signIn = async (updateUserProfile) => signUpOrSignIn(false, updateUserProfile);
