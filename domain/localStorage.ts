import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./Person";

export default class LocalStorage{


    /**
     * Get a single item
     *
     * @param {string} TripId
     * @returns {Promise<Trip>}
     * @memberof LocalStorage
     */
    async getTrip(TripId: string): Promise<Trip> {
        return AsyncStorage.getItem(`@Trip:${TripId}`)
        .then((json) => {
            return JSON.parse(json) as Trip;
        });
    }
 
    /**
     * Save a single trip
     *
     * @param {Trip} item
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async addTrip(item: Trip): Promise<void> {
        return AsyncStorage.setItem(`@Trip:${item.id}`, JSON.stringify(item));
    }
 
    /**
     * Deletes a single item
     *
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async deleteTrip(TripId: string): Promise<void> {
        return AsyncStorage.removeItem(`@Trip:${TripId}`);
    }
 
    /**
     * Get all the trips
     *
     * @returns {Promise<Trip[]>}
     * @memberof LocalStorage
     */
    async getAllTrips(): Promise<Trip[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@Trip:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }

    /**
     * Save a new member for the trip
     *
     * @param {Trip} item
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async addPersonToTrip(tripId: string, person: Person ): Promise<void> {
        const trip = this.getTrip(tripId);
        
        AsyncStorage.updateTrip(trip);
        return AsyncStorage.setItem(`@Trip:${person.firstName}`, JSON.stringify(item));
    }

    async updateTrip(trip: Trip): Promise<void>{
        this.deleteTrip(trip.id);
        this.addTrip(trip);
    }

}