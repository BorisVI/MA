import { LocalStorage } from "./localStorage";
import { TSMap } from "../node_modules/typescript-map";
import { Trip } from "./trip";
import { Person } from "./person";
import { Expense } from "./expense";
import { Currency } from "./currency";

export class Service {

    static async getExpensesSummary(tripId: string){
        let tripPromise = LocalStorage.getTrip(tripId);
        return tripPromise.then((trip) =>{
            return trip.getExpensesSummary();
        });
    }

    static async addPersonToTrip(tripId: string, person: Person){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
            trip.addPerson(person);
           LocalStorage.updateTrip(trip);
        });
    }

    static async removePersonFromTrip(tripId: string, person: Person){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removePerson(person);
                LocalStorage.updateTrip(trip);
           });
    }

    static async addExpenseToTrip(tripId: string, expense: Expense){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.addExpense(expense);
                LocalStorage.updateTrip(trip);
           });
    }

    static async removeExpenseFromTrip(tripId: string, expense: Expense){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removeExpense(expense);
                LocalStorage.updateTrip(trip);
           });
    }

    static async addCurrencyToTrip(tripId: string, currency: Currency){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.addCurrency(currency);
                LocalStorage.updateTrip(trip);
           });
    }

    static async removeCurrencyFromTrip(tripId: string, currency: Currency){
        let tripPromise = LocalStorage.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removeCurrency(currency);
                LocalStorage.updateTrip(trip);
           });
    }

    static async getTrip(tripId: string): Promise<Trip> {
        return LocalStorage.getTrip(tripId);
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
}
