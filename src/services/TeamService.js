import { db } from './FirebaseConfig';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useUserProfile } from '../context/UserContext';

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

  // If the code is not unique, generate a new one recursively
  if (!teamsSnapshot.empty) {
    return generateUniqueTeamCode();
  }

  return teamCode;
};

const createTeam = async (teamName, teamDescription, teamIcon) => {
  try {
    const userProfile = useUserProfile();

    // Generate a unique team code
    const teamCode = await generateUniqueTeamCode();

    // Create a new team document with the provided values
    const teamsCollectionRef = collection(db, 'teams');
    const newTeamDocRef = await addDoc(teamsCollectionRef, {
      Team_Name: teamName,
      Team_Description: teamDescription,
      Team_Icon: teamIcon,
      Team_Captain: userProfile.userProfile.uid,
      Team_Code: teamCode,
    });

    // Create the 'members' subcollection and add Team_Captain to it
    const membersCollectionRef = collection(newTeamDocRef, 'members');
    await addDoc(membersCollectionRef, { uid: userProfile.userProfile.uid });

    return newTeamDocRef.id; // Return the ID of the newly created team
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

const addPlayerToTeam = async (teamId, playerId) => {
  try {
    // Add the player to the 'members' subcollection of the team
    const membersCollectionRef = collection(db, 'teams', teamId, 'members');
    await addDoc(membersCollectionRef, { uid: playerId });

    return true; // Indicate success
  } catch (error) {
    console.error('Error adding player to team:', error);
    throw error;
  }
};

export { createTeam, addPlayerToTeam };
