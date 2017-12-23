import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./person";

export class LocalStorage{

    async getTrip(tripId: string): Promise<Trip> {
        let trip = await AsyncStorage.getItem(tripId);
      return trip;
    }

    async getAllTrips(): Promise<Trip[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }

    async addTrip(trip: Trip){
        AsyncStorage.setItem(trip.id, JSON.stringify(trip).replace(/"_/g,"\""));
    }

    async removeTrip(tripId: string){
        AsyncStorage.removeItem(tripId);
    }

    async updateTrip(trip: Trip){
        this.addTrip(trip);
    }

    async clearDb(){
        this.getAllTrips().then((trips: Trip[]) => {
            for(let trip of trips){
                //console.log(JSON.stringify(trip).replace(/"_/g,"\""));
                this.removeTrip(trip.id);
            }
        });
    }

/*
    async getTrip(TripId: string): Promise<Trip> {
        AsyncStorage.getItem();
        return AsyncStorage.getItem(`@Trip:${TripId}`)
        .then((json) => {
            return JSON.parse(json) as Trip;
        });
    }

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

    async addTrip(item: Trip): Promise<void> {
        return AsyncStorage.setItem(`@Trip:${item.id}`, JSON.stringify(item));
    }

    async deleteTrip(TripId: string): Promise<void> {
        return AsyncStorage.removeItem(`@Trip:${TripId}`);
    }

    async updateTrip(trip: Trip): Promise<void>{
        this.deleteTrip(trip.id);
        this.addTrip(trip);
    }
*/
}