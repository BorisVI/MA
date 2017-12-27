import { LocalStorage } from "./localStorage";
import { TSMap } from "../node_modules/typescript-map";
import { Trip } from "./trip";
import { Person } from "./person";
import { Expense } from "./expense";
import { Currency } from "./currency";

export class Service {

    static async getExpensesSummary(tripId: string): Promise<TSMap<string, number[]>> {
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesSummary();
        });
    }

    static async addPersonToTrip(tripId: string, person: Person): Promise<Trip[]>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addPerson(person);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
        });
    }

    static async removePersonFromTrip(tripId: string, person: Person): Promise<Trip[]>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);  
            t.removePerson(person);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
           });
    }

    static async addExpenseToTrip(tripId: string, expense: Expense): Promise<Trip[]>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addExpense(expense);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
           });
    }

    static async removeExpenseFromTrip(tripId: string, expense: Expense): Promise<Trip[]>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            t.removeExpense(expense);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
           });
    }

    static async addCurrencyToTrip(tripId: string, currency: Currency): Promise<Trip[]>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t=this.getNewTrip(trip);
            t.addCurrency(currency);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
           });
    }

    static async removeCurrencyFromTrip(tripId: string, currency: Currency){
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            t.removeCurrency(currency);
            LocalStorage.updateTrip(t);
            return this.getAllTrips();
           });
    }

    static async addTripTest(trip: Trip): Promise<Trip[]>{
        LocalStorage.addTrip(trip);
        return this.getAllTrips();
    }

    static async getTripTest(tripId: string): Promise<Trip> {
        return LocalStorage.getTrip(tripId);
    }

    static async getTrip(tripId: string): Promise<Trip> {
        return LocalStorage.getAllTrips().then((trips)=>{
             for(let trip of trips)
             {
                 if(trip.tripId == tripId)
                 {
                     return trip;
                 }
             }
             return null;
         });
    }

    static async getAllTrips(): Promise<Trip[]> {
        return LocalStorage.getAllTrips();
    }

    static async addTrip(trip: Trip): Promise<Trip[]>{
        LocalStorage.addTrip(trip);
        return this.getAllTrips();
    }

    static async removeTrip(tripId: string): Promise<Trip[]>{
        LocalStorage.removeTrip(tripId);
        return this.getAllTrips();
    }

    static async updateTrip(trip: Trip): Promise<Trip[]>{
        LocalStorage.updateTrip(trip);
        return this.getAllTrips();
    }

    static async clearDb(){
        LocalStorage.clearDb();
    }

    static getNewTrip(trip: Trip): Trip{
        let t = new Trip(trip.tripId, trip.tripName, trip.startDate, trip.endDate);
        for(let exp of trip.expenses)
        {
            t.addExpense(exp);
        }
        for(let cur of trip.currencies)
        {
            t.addCurrency(cur);
        }
        for(let par of trip.participants)
        {
            t.addPerson(par);
        }
        return t;
    }

    static deepEqual(a:Object,b:Object): Boolean{
        return JSON.stringify(a) == JSON.stringify(b);
    }
}
