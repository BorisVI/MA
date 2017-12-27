import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./person";

export class LocalStorage{


    static async getAllTrips(): Promise<Trip[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }
    
    static async getTrip(tripId: string): Promise<Trip>{
        var trip: Trip= AsyncStorage.getItem(tripId).then((value)=>{
            return JSON.parse(value);
        });
        return trip;
    }

    static async addTrip(trip: Trip){
        AsyncStorage.setItem(trip.tripId, JSON.stringify(trip).replace(/"_/g,"\""));
    }

    static async removeTrip(tripId: string){
        AsyncStorage.removeItem(tripId);
    }

    static async updateTrip(trip: Trip){
        this.addTrip(trip);
    }

    static async clearDb(){
        AsyncStorage.getAllKeys().then((keys: string[])=>{
            for(let id of keys){
                this.removeTrip(id);
            }
        });
    }
}