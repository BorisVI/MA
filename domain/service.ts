import { LocalStorage } from "./localStorage";
import { TSMap } from "../node_modules/typescript-map";
import { Trip } from "./trip";
import { Person } from "./person";
import { Expense } from "./expense";

export class Service {

    static async getExpensesPerPerson(tripId: string, personId: string): Promise<TSMap<string, number[]>> {
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesFromPerson(personId);
        });
    }

    static async getExpensesByCategory(tripId: string): Promise<TSMap<string, number>>{
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesByCategory();
        });
    }

    static async getExpensesSummary(tripId: string): Promise<TSMap<string, number[]>> {
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesSummary();
        });
    }

    static async addPersonToTrip(tripId: string, firstName: string, lastName: string): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addPerson(new Person(t.getLargestPersonId(), firstName, lastName));
            LocalStorage.updateTrip(t);
        });
    }

    static async removePersonFromTrip(tripId: string, id: string): Promise<void>{
      await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removePerson(id);
            LocalStorage.updateTrip(t);
        });
    }

    static async addExpenseToTrip(tripId: string, name: string, date: Date): Promise<void>{
      await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addExpense(new Expense(t.getLargestExpenseId(), name, date, t.standardCurrency));
            LocalStorage.updateTrip(t);
        });
    }

    static async removeExpenseFromTrip(tripId: string, id: string): Promise<void>{
      await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removeCurrency(id);
            LocalStorage.updateTrip(t);
        });
    }

    static async addCurrencyToTrip(tripId: string, id:string): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addCurrency(id);
            LocalStorage.updateTrip(t);
        });
    }

    static async removeCurrencyFromTrip(tripId: string, name: string): Promise<void>{
       await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removeCurrency(name);
            LocalStorage.updateTrip(t);
        });
    }

    static async getTrip(tripId: string): Promise<Trip> {
        return LocalStorage.getTrip(tripId).then((trip) =>{
            return this.getNewTrip(trip);
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
