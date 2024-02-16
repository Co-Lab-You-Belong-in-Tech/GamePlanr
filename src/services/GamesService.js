import { db } from './FirebaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where, arrayUnion, arrayRemove } from 'firebase/firestore';


export const createGameInDatabase = async (gameData) => {
    try {
        // Add the game data to the 'games' collection in Firestore
        const gameRef = await addDoc(collection(db, 'games'), gameData);

        // Retrieve the team document using the team code
        const teamQuerySnapshot = await getDocs(
            query(collection(db, 'teams'), where('Team_Code', '==', gameData.TeamCode))
        );

        if (!teamQuerySnapshot.empty) {
            // There should be only one team document with the given team code
            const teamDoc = teamQuerySnapshot.docs[0];

            // Update the games array in the team document
            const updatedGamesArray = [...teamDoc.data().Games, gameRef.id];
            await updateDoc(teamDoc.ref, { Games: updatedGamesArray });

        } else {
            console.error('Team not found for the provided team code:', gameData.teamCode);
            throw new Error('Team not found');
        }

        return gameRef.id;
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
        const updatedGameData = { gameId: gameDocRef.id, ...updatedDocSnapshot.data() }

        console.log('Updated AttendingUsers:', updatedGameData);

        return updatedGameData
    } catch (error) {
        console.error("Error updating attending users:", error);
    }
};


// Function to check for games using teamCode and returning game(s) info if found
export const getGamesData = async (teamCode) => {
    try {
        // Query the 'games' collection to find games with the matching teamCode
        const gamesQuery = query(collection(db, 'games'), where("TeamCode", "==", teamCode));
        
        // Get the documents from the query result
        const querySnapshot = await getDocs(gamesQuery);
        
        // Check if any games were found
        if (querySnapshot.empty) {
            // If no games were found, return an empty array
            
        } else {
            // If games were found, map over each document to extract data and document ID
            const gamesData = querySnapshot.docs.map((doc) => {
                const gameData = doc.data();
                // Convert Firestore timestamp to JavaScript Date object
                const startDate = gameData.startDate.toDate();
                // Return the game data
                return {
                    gameId: doc.id,
                    ...gameData,
                    startDate: startDate
                };
            });
            return gamesData;
        }
    } catch (error) {
        console.error('Error checking for games:', error);
        throw new Error('Failed to check for games');
    }
};