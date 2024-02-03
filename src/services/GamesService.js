import { db } from './FirebaseConfig';
// import { getTeamMembers } from './TeamService';
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


export const createGameInDatabase = async (gameData) => {
    try {
        // Add the game data to the 'games' collection in Firestore
        const gameRef = await addDoc(collection(db, 'games'), gameData);

        console.log('here is gameRef?', gameRef.id)
        return gameRef.id
        } catch (error) {
        console.error('Error creating game:', error);
        throw new Error('Failed to create game');
    }
};


// Function to update AttendingUsers in a game document in Firestore
export const updateAttendingUsersInGame = async (gameId, userId, response) => {
    try {
        const gameDocRef = doc(db, 'games', gameId);
        let updateData = {};
        
        // Add or remove user from AttendingUsers array based on response
        if (response === 'going') {
            updateData = {
                AttendingUsers: arrayUnion(userId)
            };
        } else if (response === 'not going') {
            updateData = {
                AttendingUsers: arrayRemove(userId)
            };
        }

        await updateDoc(gameDocRef, updateData);

        // Fetch the updated game data from Firestore
        const updatedDocSnapshot = await getDoc(gameDocRef);
        const updatedGameData = updatedDocSnapshot.data();

        console.log('Updated AttendingUsers:', updatedGameData);

        return updatedGameData;
    } catch (error) {
        console.error("Error updating attending users:", error);
    }
};
