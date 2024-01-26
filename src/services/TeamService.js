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
} from 'firebase/firestore';
// import { useUserProfile } from '../context/UserContext';

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
    await addDoc(membersCollectionRef, { uid: teamCaptain });

    // Get the newly created team document including its subcollection
    const newTeamDocSnapshot = await getDoc(newTeamDocRef);
    const newTeamData = newTeamDocSnapshot.data();

    const TeamInfo = { TeamID: newTeamDocRef.id, ...newTeamData };

    return TeamInfo
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// const addPlayerToTeam = async (teamId, playerId) => {
//   try {
//     // Add the player to the 'Members' subcollection of the team
//     const teamDocRef = doc(db, 'teams', teamId, 'Members');
//     await addDoc(teamDocRef, { uid: playerId });

//     return true;
//   } catch (error) {
//     console.error('Error adding player to team:', error);
//     throw error;
//   }
// };


// Function to get all members of a team
const getTeamMembers = async (teamId) => {
  try {
    // Reference the 'Members' subcollection of the team
    const membersCollectionRef = collection(db, 'teams', teamId, 'Members');
    
    // Get all documents from the 'Members' subcollection
    const membersQuerySnapshot = await getDocs(membersCollectionRef);
    
    // Iterate through each document in the 'Members' subcollection
    const members = [];
    membersQuerySnapshot.forEach((doc) => {
      // Retrieve the data from each document
      const memberData = doc.data();
      members.push(memberData);
    });
    
    return members;
  } catch (error) {
    console.error('Error getting team members:', error);
    throw error;
  }
};

export { createTeam, getTeamMembers };
