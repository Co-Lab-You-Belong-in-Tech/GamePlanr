import { db } from './FirebaseConfig';
// import { getTeamMembers } from './TeamService';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


export const createGameInDatabase = async (gameData) => {
    try {
        // Default values to track attending users and notifications for game
        const defaultValues = {
            AttendingUsers: [],
            Notifications: [],
        };

        // Extract data from the gameData object
        const { TeamCode, startDate, duration, location, playersNeeded, opponent, notes } = gameData;

        // Add the game data to the 'games' collection in Firestore
        const gameRef = await addDoc(collection(db, 'games'), {
            TeamCode: TeamCode,
            GameTimeDate: startDate,
            Duration: duration,
            Location: location,
            PlayersNeeded: playersNeeded,
            Opponent: opponent,
            Notes: notes,
            ...defaultValues,       
        });

        // Retrieve team members
        // const teamMembers = await getTeamMembers(TeamCode);
        console.log('here is gameRef?', gameRef.id)
        return gameRef.id
        } catch (error) {
        console.error('Error creating game:', error);
        throw new Error('Failed to create game');
    }
};