import { LocalStorage } from "./localStorage";
import { TSMap } from "../node_modules/typescript-map";
import { Trip } from "./trip";
import { Person } from "./person";
import { Expense } from "./expense";
import { Loan } from "./loan";
import { Category } from "./category";

export class Service {

    static async finalizeBill(tripId: string, expenseId: string, bill: string): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.splitBill(expenseId, bill);
            this.updateTrip(t);
        });
    }

    static async splitEvenly(tripId: string, expenseId: string, participants: string[], amount: number): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.splitEvenly(expenseId,participants,amount);
            this.updateTrip(t);
        });
    }

    static async getTransactionSummaryForPerson(tripId: string, personId: string): Promise<Array<string[]>>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getLoanSummaryForPerson(personId);
        });
    }

    static async getTransactionSummary(tripId: string): Promise<Array<string[]>>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getLoanSummary();
        });
    }

    static async payLoan(tripId: string, expenseId: string, loanId: string): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.payLoan(expenseId, loanId);
            this.updateTrip(t);
        });
    }

    static async getLoans(tripId: string, expenseId: string): Promise<TSMap<string[],Loan>>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getLoans(expenseId);
        });
    }

    static async isFinal(tripId: string, expenseId: string): Promise<boolean>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpenseById(expenseId).isFinalized;
        });
    }

    static async finaliseExpense(tripId: string, expenseId: string): Promise<boolean>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.getExpenseById(expenseId).calculateLoans();
            this.updateTrip(t);
            return t.getExpenseById(expenseId).isFinalized;
        });
    }

    static async getTableByExpense(tripId: string, expenseId: string): Promise<TSMap<string[], number[]>>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getTableByExpense(expenseId);
        });
    }

    static async getConsumersFromExpense(tripId: string, expenseId: string): Promise<TSMap<string[], number>>{
        return this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            let map = new TSMap<string[], number>();
            t.getExpenseById(expenseId).consumers.forEach((value: number, key: string) =>{
                let p = t.getPersonFromId(key);
                map.set([p.personId,p.firstName,p.lastName],value);
            });
            return map;
        });
    }
    static async getExpenseForPersonPerCategory(tripId:string,personId:string):Promise<TSMap<Category,number>>{
        return this.getTrip(tripId).then((trip)=>{
            let t=this.getNewTrip(trip);
            let person=t.getPersonFromId(personId);
            return t.getExpensesForPersonPerCategory(personId);
        });
    }

    static async getPayersFromExpense(tripId: string, expenseId: string): Promise<TSMap<string[], number>>{
        return this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            let map = new TSMap<string[], number>();
            t.getExpenseById(expenseId).payers.forEach((value: number, key: string) =>{
                let p = t.getPersonFromId(key);
                map.set([p.personId,p.firstName,p.lastName],value);
            });
            return map;
        });
    }

    static async getExpenseById(tripId: string, expenseId: string): Promise<Expense>{
        return this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            return t.getExpenseById(expenseId);
        });
    }

    static async editExpenseFromTrip(tripId: string, expenseId: string, name: string, date: Date, currency: string, category: Category ): Promise<void>{
        let expense = new Expense(expenseId, name, date, currency);
        expense.category = category;
        await this.getExpenseById(tripId,expenseId).then((response)=>{
            expense.consumers = response.consumers;
            expense.payers = response.payers;
            if(expense.currency!=response.currency){
                expense.convertAll(response.currency,expense.currency).then(()=>{
                    return;
            });
        }
        });
        await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.editExpense(expense);
            LocalStorage.updateTrip(t);
        });
    }

    static async addConsumersToExpense(tripId: string, expenseId: string, consumers: TSMap<string, number>): Promise<void>{
        await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.getExpenseById(expenseId).consumers = consumers;
            this.updateTrip(t);
        });
    }
    static getAllCatergories():Category[]{
        return [Category.OvernightStay,Category.Transport,Category.Activity,Category.Food,Category.Misc];
    }
    static async addPayersToExpense(tripId: string, expenseId: string, payers: TSMap<string, number>): Promise<void>{
        await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.getExpenseById(expenseId).payers = payers;
            this.updateTrip(t);
        });
    }

    static async getExpensesPerPerson(tripId: string, personId: string): Promise<TSMap<string, number[]>> {
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesFromPerson(personId);
        });
    }

    static async getExpensesByCategory(tripId: string): Promise<TSMap<string, number>>{
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesByCategory();
        });
    }

    static async getExpensesSummary(tripId: string): Promise<TSMap<string[], number[]>> {
        return this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            return t.getExpensesSummary();
        });
    }

    static async getExpenseForPersonPerDay(tripId:string,personId:string){
        return this.getTrip(tripId).then((trip)=>{
            let t=this.getNewTrip(trip);
            return t.getExpenseForPersonPerDay(personId);
        });

    }

    static async addPersonToTrip(tripId: string, firstName: string, lastName: string): Promise<Boolean>{
        return await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            let valid=t.addPerson(new Person(t.getLargestPersonId(), firstName, lastName));
            this.updateTrip(t);
            return valid;
        });
    }
    static async removePersonFromTrip(tripId: string, id: string): Promise<void>{
      await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removePerson(id);
            this.updateTrip(t);
        });
    }

    static async addExpenseToTrip(tripId: string, name: string, date: Date): Promise<void>{
      await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addExpense(new Expense(t.getLargestExpenseId(), name, date, t.standardCurrency));
            this.updateTrip(t);
        });
    }

    static async removeExpenseFromTrip(tripId: string, id: string): Promise<void>{
      await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removeCurrency(id);
            this.updateTrip(t);
        });
    }

    static async addCurrencyToTrip(tripId: string, id:string): Promise<void>{
        await this.getTrip(tripId).then((trip) =>{
            let t = this.getNewTrip(trip);
            t.addCurrency(id);
            this.updateTrip(t);
        });
    }
    
    static async removeCurrencyFromTrip(tripId: string, name: string): Promise<void>{
       await this.getTrip(tripId).then((trip)=>{
            let t = this.getNewTrip(trip);
            t.removeCurrency(name);
            this.updateTrip(t);
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

    static async addTrip(trip: Trip): Promise<void>{
        return LocalStorage.addTrip(trip);
    }

    static async removeTrip(tripId: string): Promise<void>{
        return LocalStorage.removeTrip(tripId);
    }

    static async updateTrip(trip: Trip): Promise<void>{
        return LocalStorage.updateTrip(trip);
    }

    static getAllCurrencyTypes(): Array<string>{
        return LocalStorage.getAllCurrenciesPossible();
    }

    static overWriteCurrency(currencyTag:string, value:number):Promise<void>{
        return LocalStorage.overwriteCurrency(currencyTag,value);
    }

    static getCurrencyValue(currencyTag:string):Promise<[string,number]>{
        return LocalStorage.getCurrencyValue(currencyTag);
    }

    static convertAmountFromEuroTo(currencyTag:string,amount:number):Promise<number>{
        return this.getCurrencyValue(currencyTag).then((value)=>{
            return amount*value[1];
        });    
    }
    static convertAmountToEuroFrom(currencyTag:string,amount:number):Promise<number>{
        return this.getCurrencyValue(currencyTag).then((value)=>{
            return amount/value[1];
        });
    }

    static async clearTripDb(){
        LocalStorage.clearTripDb();
    }

    static async clearDb(){
        LocalStorage.clearDb();
    }

    static getNewTrip(trip: Trip): Trip{
        let test = trip instanceof Trip;
        if(test){
            return trip;
        }else{
            let t = new Trip(trip.tripId, trip.tripName, trip.startDate, trip.endDate);
            for(let exp of trip.expenses)
            {
                let expense = new Expense(exp.expenseId, exp.name, exp.date, exp.currency);
                expense.category = exp.category;
                expense.isFinalized = exp.isFinalized;
                expense.loans = exp.loans;
                let consumers : TSMap<string, number> = new TSMap<string, number>();
                let payers : TSMap<string, number> = new TSMap<string, number>();
                if(exp.consumers != null){
                   for(let k of Object.keys(exp.consumers)){
                        consumers.set(k, exp.consumers[k]);
                    }
                }
                if(exp.payers != null){
                    for(let k of Object.keys(exp.payers)){
                        payers.set(k, exp.payers[k]);
                    }
                }
                expense.consumers = consumers;
                expense.payers = payers;
                t.addExpense(expense);
            }
            for(let cur of trip.currencies)
            {
                t.addCurrency(cur);
            }
            for(let par of trip.participants)
            {
                let person = new Person(par.personId, par.firstName, par.lastName);
                t.addPerson(person);
            }
            return t;
        }
    }
    static deepEqual(a:Object,b:Object): Boolean{
        return JSON.stringify(a) == JSON.stringify(b);
    }
}
