import { LocalStorage } from "./localStorage";
import { TSMap } from "../node_modules/typescript-map";
import { Trip } from "./trip";
import { Person } from "./person";
import { Expense } from "./expense";
import { Currency } from "./currency";

export class Service {

    static async getExpensesSummary(tripId: string){
        let tripPromise = this.getTrip(tripId);
        return tripPromise.then((trip) =>{
            return trip.getExpensesSummary();
        });
    }

    static async addPersonToTrip(tripId: string, person: Person): Promise<Trip[]>{
        console.log(tripId);
        let tripPromise = this.getTrip(tripId);
        
       return tripPromise.then((trip) =>{
            //console.log('bzfeipzqbf '+ person);
            //console.log('jiezdsjfezi'+trip.getExpensesSummary());
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
            t.addPerson(person);
           LocalStorage.updateTrip(t);
           return this.getAllTrips();
        });
    }

    static async removePersonFromTrip(tripId: string, person: Person){
        let tripPromise = this.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removePerson(person);
                LocalStorage.updateTrip(trip);
           });
    }

    static async addExpenseToTrip(tripId: string, expense: Expense){
        let tripPromise = this.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.addExpense(expense);
                LocalStorage.updateTrip(trip);
           });
    }

    static async removeExpenseFromTrip(tripId: string, expense: Expense){
        let tripPromise = this.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removeExpense(expense);
                LocalStorage.updateTrip(trip);
           });
    }

    static async addCurrencyToTrip(tripId: string, currency: Currency){
        let tripPromise = this.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.addCurrency(currency);
                LocalStorage.updateTrip(trip);
           });
    }

    static async removeCurrencyFromTrip(tripId: string, currency: Currency){
        let tripPromise = this.getTrip(tripId);
        tripPromise.then((trip) =>{
                trip.removeCurrency(currency);
                LocalStorage.updateTrip(trip);
           });
    }

    static async getTrip(tripId: string): Promise<Trip> {
        return LocalStorage.getAllTrips().then((trips)=>{
             for(let trip of trips)
             {
                 //console.log('hbefzup '+ trip.id);
                 if(trip.id == tripId)
                 {
                   //  console.log('rfo'+ trip.getExpensesSummary());
                     //console.log('ojgrnor '+ trip);
                    // console.log('efzihb'+ trip.id);
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
}
