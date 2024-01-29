import { db } from './FirebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


export const createGameInDatabase = async (gameData) => {
    try {
        const defaultValues = {
            AttendingUsers: [],
            Notifications: [],
        };

        // Extract data from the gameData object
        const { TeamCode, startDate, duration, location, playersNeeded, opponent, notes } = gameData;

        // Add the game data to the 'games' collection in Firestore
        const gamesCollectionRef = await addDoc(collection(db, 'games'), {
            TeamCode: TeamCode,
            GameTimeDate: startDate,
            Duration: duration,
            Location: location,
            PlayersNeeded: playersNeeded,
            Opponent: opponent,
            Notes: notes,
            ...defaultValues,       
        });
        console.log('Game created successfully');
        } catch (error) {
        console.error('Error creating game:', error);
        throw new Error('Failed to create game');
    }
};