import { db } from './FirebaseConfig';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
} from 'firebase/firestore';

const generateUniqueTeamCode = async () => {
  // Generate a random team code (3 uppercase letters + 3 numbers)
  const randomLetters = String.fromCharCode(
    65 + Math.floor(Math.random() * 26),
    65 + Math.floor(Math.random() * 26),
    65 + Math.floor(Math.random() * 26)
  );
  const randomNumbers = String(Math.floor(100 + Math.random() * 900));

  const teamCode = `${randomLetters}${randomNumbers}`;

  // Check if the generated code is unique in the 'teams' collection
  const teamsCollectionRef = collection(db, 'teams');
  const teamsQuery = query(teamsCollectionRef, where('Team_Code', '==', teamCode));
  const teamsSnapshot = await getDocs(teamsQuery);

  // If the code is not unique, generate a new one
  if (!teamsSnapshot.empty) {
    return generateUniqueTeamCode();
  }

  return teamCode;
};

// Call to createTeam in the database
const createTeam = async (teamCaptain, teamName, teamDescription, chosenIcon) => {
  try {
    // Generate a unique team code
    const teamCode = await generateUniqueTeamCode();

    // Create a new team document with the provided values
    const teamsCollectionRef = collection(db, 'teams');
    const newTeamDocRef = doc(teamsCollectionRef);
    await setDoc(newTeamDocRef, {
      Team_Name: teamName,
      Team_Description: teamDescription,
      Team_Icon: chosenIcon,
      Team_Captain: teamCaptain,
      Team_Code: teamCode,
      Games: [],
    });

    // Create 'Members' subcollection for the new team
    const membersCollectionRef = collection(newTeamDocRef, 'Members');
    
    // Create 'membersList' document within the 'Members' subcollection
    const membersListDocRef = doc(membersCollectionRef, 'membersList');
    await setDoc(membersListDocRef, {id: [teamCaptain]});

    // Update the user's document with the teamCode
    const userDocRef = doc(db, 'users', teamCaptain);
    await updateDoc(userDocRef, { Team_Code: teamCode });

    // Get the newly created team document including its subcollection
    const newTeamDocSnapshot = await getDoc(newTeamDocRef);
    const newTeamData = newTeamDocSnapshot.data();

    const TeamInfo = { TeamID: newTeamDocRef.id, ...newTeamData };

    return TeamInfo;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// Call to get team data based on teamCode
const getTeamByCode = async (teamCode) => {
  try {
    // Get team document in our 'teams' collection using teamCode
    const teamsCollectionRef = collection(db, 'teams');
    const teamQuerySnapshot = await getDocs(
      query(teamsCollectionRef, where('Team_Code', '==', teamCode))
    );
    if (!teamQuerySnapshot.empty) {
      const teamDoc = teamQuerySnapshot.docs[0];
      const teamData = teamDoc.data();
      
      // Reference the 'Members' subcollection of the team document
      const membersCollectionRef = collection(teamDoc.ref, 'Members');
      
      // Reference the 'membersList' document within the 'Members' subcollection
      const membersListDocRef = doc(membersCollectionRef, 'membersList');

      // Get the 'membersList' document
      const membersListDocSnapshot = await getDoc(membersListDocRef);
      const membersListData = membersListDocSnapshot.data();

      // Get the length of the id array in the membersList document
      const membersCount = membersListData ? (membersListData.id ? membersListData.id.length : 0) : 0;

      // Fetch captain data from the user's document
      const captainDocSnapshot = await getDoc(doc(db, 'users', teamData.Team_Captain));
      const captainData = captainDocSnapshot.data();

      // Return team data along with the length of the 'Members' collection and captain data
      return {
        ...teamData,
        membersCount: membersCount,
        captainDisplayName: captainData.displayName,
        captainPhotoURL: captainData.photoURL
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
}


// Call to join team 
const joinTeam = async (teamCode, userId) => {
  try {
    // Fetch the team document using the provided teamCode
    const teamsQuerySnapshot = await getDocs(
      query(collection(db, 'teams'), where('Team_Code', '==', teamCode))
    );
    
    // Check if the team document exists
    if (!teamsQuerySnapshot.empty) {
      const teamDoc = teamsQuerySnapshot.docs[0];
      const teamId = teamDoc.id;
      
      // Reference the 'Members' subcollection of the team document
      const membersCollectionRef = collection(db, 'teams', teamId, 'Members');
      
      // Reference the 'membersList' document within the 'Members' subcollection
      const membersListDocRef = doc(membersCollectionRef, 'membersList');

      // Update the 'membersList' document with the user ID
      await updateDoc(membersListDocRef, {
        id: arrayUnion(userId)
      });

      // Update the user's document with the teamCode
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { Team_Code: teamCode });

      // Fetch the updated team data after joining
      const updatedTeamDocSnapshot = await getDoc(teamDoc.ref);
      const updatedTeamData = updatedTeamDocSnapshot.data();

      return updatedTeamData;
    } else {
      console.log("Team not found!");
      return null;
    }
  } catch (error) {
    console.error('Error joining team:', error);
    throw error;
  }
};



const getTeamMemberData = async (teamCode) => {
  try {
    // Fetch team data based on the team code
    const teamsCollectionRef = collection(db, 'teams');
    const teamQuerySnapshot = await getDocs(
      query(teamsCollectionRef, where('Team_Code', '==', teamCode))
    );

    // Check if the team exists
    if (!teamQuerySnapshot.empty) {
      const teamDoc = teamQuerySnapshot.docs[0];
      const teamData = teamDoc.data();

      // Reference the 'Members' subcollection of the team document
      const membersCollectionRef = collection(teamDoc.ref, 'Members');

      // Reference the 'membersList' document within the 'Members' subcollection
      const membersListDocRef = doc(membersCollectionRef, 'membersList');

      // Get the 'membersList' document
      const membersListDocSnapshot = await getDoc(membersListDocRef);
      const membersListData = membersListDocSnapshot.data();

      // Get the member IDs from the 'membersList' document
      const memberIds = membersListData ? membersListData.ids || [] : [];

      // Fetch user data for each member
      const userDataPromises = memberIds.map(async (userId) => {
        const userDocSnapshot = await getDoc(doc(db, 'users', userId));
        return userDocSnapshot.exists() ? userDocSnapshot.data() : null;
      });

      // Wait for all user data promises to resolve
      const userData = await Promise.all(userDataPromises);

      // Combine team data with user data
      const completeTeamData = {
        ...teamData,
        members: userData.filter((user) => user !== null),
      };

      return completeTeamData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};



export { createTeam, getTeamByCode, joinTeam, getTeamMemberData };
