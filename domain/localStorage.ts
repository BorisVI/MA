import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./person";

export class LocalStorage{

    static async getTrip(tripId: string): Promise<Trip> {
        let trip = await AsyncStorage.getItem(tripId);
      return trip;
    }

    static async getAllTrips(): Promise<Trip[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }

    static async addTrip(trip: Trip){
        AsyncStorage.setItem(trip.id, JSON.stringify(trip).replace(/"_/g,"\""));
    }

    static async removeTrip(tripId: string){
        AsyncStorage.removeItem(tripId);
    }

    static async updateTrip(trip: Trip){
        this.addTrip(trip);
    }

    static async clearDb(){
        this.getAllTrips().then((trips: Trip[]) => {
            for(let trip of trips)
            {
                this.removeTrip(trip.id);     
            }
        });
    }
}