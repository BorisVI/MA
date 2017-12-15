import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';

export default class LocalStorage{


    /**
     * Get a single item
     *
     * @param {string} TripId
     * @returns {Promise<Trip>}
     * @memberof LocalStorage
     */
    async getItem(TripId: string): Promise<Trip> {
        return AsyncStorage.getItem(`@Trip:${TripId}`)
        .then((json) => {
            return JSON.parse(json) as Trip;
        });
    }
 
    /**
     * Save a single item
     *
     * @param {Trip} item
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async setItem(item: Trip): Promise<void> {
        return AsyncStorage.setItem(`@Trip:${item.id}`, JSON.stringify(item));
    }
 
    /**
     * Deletes a single item
     *
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async deleteItem(TripId: string): Promise<void> {
        return AsyncStorage.removeItem(`@Trip:${TripId}`);
    }
 
    /**
     * Get all the items
     *
     * @returns {Promise<Trip[]>}
     * @memberof LocalStorage
     */
    async getAllItems(): Promise<Trip[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@Trip:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }
}