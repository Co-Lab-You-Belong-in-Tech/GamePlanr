import { auth, db, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Get User Profile Details from Datbase (Firestore)
const getUserProfileDetails = async (email) => {
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

// Taking email from Google SignIn, see if user exists in datbase. If so, pull info, if not, create user profile
const AuthenticateUser = async (result) => {
  try {
    const { displayName, email, photoURL } = result.user;
    // Check to see if user (email) exists in our database or not
    const userProfile = await getUserProfileDetails(email);

    // If user is found in database, pull info in and redirect them to home page
    if (userProfile) {
      alert("User account found, signing in...");
      return userProfile;
      // If user is NOT found in database, create entry for new user in the database
    } else {
      alert("New User, creating account...");
      // Default values for rest of profile info
      const defaultValues = {
        Skill_Level: null,
        Location: null,
        Age_Group: null,
        Gender: null,
        Team_ID: null,
      };
      
      // Create entry for new user profile using info pulled from Google as well as default values above
      const docRef = await addDoc(collection(db, "users"), {
        displayName: displayName || null,
        email: email || null,
        photoURL: photoURL || null,
        ...defaultValues,
      });

      // Now that new user profile data has been created, pull in all profile info from database
      const newUserProfile = await getUserProfileDetails(email);
      if (newUserProfile) {
        alert("User profile created successfully, signing in...");
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

const SignUpOrSignIn = async (isSignUp) => {
  try {
    // Get Google Sign In via signInWithPopup
    const result = await signInWithPopup(auth, provider);
    const userProfileDetails = await AuthenticateUser(result);
    return userProfileDetails;
  } catch (error) {
    alert(`Error during ${isSignUp ? 'sign-up' : 'sign-in'}: `, error);
    return null;
  }
};

const SignUp = async () => SignUpOrSignIn(true);
const SignIn = async () => SignUpOrSignIn(false);

export { SignUp, SignIn };
