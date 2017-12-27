import { TSMap } from "../node_modules/typescript-map";
import { Expense } from "./expense";
import { Person } from "./person";
export class Trip{

    private _tripId : string;
    private _participants : Array<Person> = new Array();
    private _expenses : Array<Expense> = new Array();
	private _currencies : Array<string> = new Array();
    private _startDate : Date;
    private _endDate : Date;
	private _tripName : string;

    constructor(tripId : string, name: string, startDate : Date, endDate : Date){
        this.tripId = tripId;
        this.tripName = name;
        this.startDate = startDate;
		this.endDate = endDate;
	}
	
	getExpensesSummary(): TSMap<string, number[]>{
		let map = new TSMap<string,number[]>();
		for (let i = 0; i < this.expenses.length; i++){
			this.expenses[i].consumers.forEach((value: number, key: string) =>{
				let total : number[];
				if(map.has(key)){
					total[0] = value[0];
					total[1] = value[1];
				}
				total[0] += value;
				if(this.expenses[i].payers.has(key)){
                    total[1] += this.expenses[i].payers.get(key);
                }
				map.set(key, total);
            });
		}
		return map;
	}

	getLargestExpenseId(): string{
        let highest = 0;
        for(let expense of this.expenses){
            if(Number(expense.ExpenseId) > highest){
                highest = Number(expense.ExpenseId);
            }
        }
        return String(highest + 1);
	}

	getLargestPersonId(): string{
        let highest = 0;
        for(let person of this.participants){
            if(Number(person.personId) > highest){
                highest = Number(person.personId);
            }
        }
        return String(highest + 1);
	}

    addExpense(expense: Expense){
        this.expenses.push(expense);
    }

    addPerson(person : Person){
        this.participants.push(person);
    }

    addCurrency(currency : string){
        this.currencies.push(currency);
    }

    removeExpense(id: string){
        this.expenses.splice(this.expenses.findIndex(e => e.ExpenseId == id),1);
    }

    removePerson(id : string){
		this.participants.splice(this.participants.findIndex(p => p.personId == id),1);
    }

    removeCurrency(id : string){
        this.currencies.splice(this.currencies.findIndex(c => c == id),1);
	}

	public get tripId(): string {
		return this._tripId;
	}

	public set tripId(value: string) {
		this._tripId = value;
	}

	public get participants(): Array<Person> {
		return this._participants;
	}

	public set participants(value: Array<Person>) {
		this._participants = value;
	}

	public get expenses(): Array<Expense> {
		return this._expenses;
	}

	public set expenses(value: Array<Expense>) {
		this._expenses = value;
	}

	public get currencies(): Array<string> {
		return this._currencies;
	}

	public set currencies(value: Array<string>) {
		this._currencies = value;
	}

	public get startDate(): Date {
		return this._startDate;
	}

	public set startDate(value: Date) {
		this._startDate = value;
	}

	public get endDate(): Date {
		return this._endDate;
	}

	public set endDate(value: Date) {
		this._endDate = value;
	}

	public get tripName(): string {
		return this._tripName;
	}

	public set tripName(value: string) {
		this._tripName = value;
	}

	equals(t : Trip): Boolean {
		return t.tripId==this.tripId;
	}
}