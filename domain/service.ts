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

    static async getTrip(tripId: string): Promise<Trip> {
        return LocalStorage.getAllTrips().then((trips)=>{
             for(let trip of trips)
             {
                 if(trip.id == tripId)
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

    static async addTrip(trip: Trip){
        LocalStorage.addTrip(trip);
    }

    static async removeTrip(tripId: string){
        LocalStorage.removeTrip(tripId);
    }

    static async updateTrip(trip: Trip){
        LocalStorage.updateTrip(trip);
    }

    static async clearDb(){
        LocalStorage.clearDb();
    }

    static getNewTrip(trip: Trip): Trip{
        let t = new Trip(trip.id, trip.name, trip.startdate, trip.enddate);
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
}
