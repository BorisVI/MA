import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./person";

export class LocalStorage{

    static async getAllTrips(): Promise<Trip[]> {
        return this.getAllTripKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }
    
    static async getTrip(tripId: string): Promise<Trip>{
        var trip: Trip= AsyncStorage.getItem('trip_' + tripId).then((json)=>{
            return JSON.parse(json) as Trip;
        });
        return trip;
    }

    static async addTrip(trip: Trip){
        let key = 'trip_' + trip.tripId;
        console.log('add trip with key: ' + key);
        AsyncStorage.setItem(key, JSON.stringify(trip).replace(/"_/g,"\""));
    }
    
    static async removeTrip(tripId: string){
        AsyncStorage.removeItem('trip_' + tripId);
    }

    static async updateTrip(trip: Trip){
        this.addTrip(trip);
    }

    static async getAllTripKeys(): Promise<string[]>{
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r, i, store) => { 
                let key: string = store[i][0];
                if(key.startsWith('trip_')){
                    return store[i][0];
                }
            });
        });
    }

    static async clearTripDb(){
        this.getAllTripKeys().then((keys: string[])=>{
            for(let id of keys){
                AsyncStorage.removeItem(id);
            }
        });
    }

    static async clearDb(){
        AsyncStorage.getAllKeys().then((keys: string[])=>{
            for(let id of keys){
                AsyncStorage.removeItem(id);
            }
        });
    }
}