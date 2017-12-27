import { TSMap } from "../node_modules/typescript-map";
import { Currency } from "./currency";
import { Expense } from "./expense";
import { Person } from "./person";
export class Trip{

    private _tripId : string;
    private _participants : Array<Person> = new Array();
    private _expenses : Array<Expense> = new Array();
	private _currencies : Array<Currency> = new Array();
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
		for (let i = 0; i < this._expenses.length; i++){
			this._expenses[i].consumers.forEach((value: number, key: string) =>{
				let total : number[];
				if(map.has(key)){
					total[0] = value[0];
					total[1] = value[1];
				}
				total[0] += value;
				if(this._expenses[i].payers.has(key)){
                    total[1] += this._expenses[i].payers.get(key);
                }
				map.set(key, total);
            });
		}
		return map;
	}

    addExpense(expense: Expense){
        this._expenses.push(expense);
    }

    addPerson(person : Person){
		//console.log(person);
        this._participants.push(person);
    }

    addCurrency(currency : Currency){
        this._currencies.push(currency);
    }

    removeExpense(expense: Expense){
        if(this.getIndexExpense(expense) != -1){
			this._expenses.splice(this.getIndexExpense(expense),1);
		}
    }

    removePerson(person : Person){
		if(this.getIndexPerson(person) != -1){
			this._participants.splice(this.getIndexPerson(person),1);
		}
    }

    removeCurrency(currency : Currency){
        if(this.getIndexCurrency(currency) != -1){
			this._currencies.splice(this.getIndexCurrency(currency),1);
		}
	}

	getIndexExpense(e: Expense): number{
		let index: number = -1;
		for (var i = 0; i < this._expenses.length; i++){
			if(this._expenses[i].equals(e)){
				index = i;
			}
		}
		return index;
	}

	getIndexCurrency(c: Currency): number{
		let index: number = -1;
		for (var i = 0; i < this._currencies.length; i++){
			if(this._currencies[i].equals(c)){
				index = i;
			}
		}
		return index;
	}
	
	getIndexPerson(p: Person): number{
		let index: number = -1;
		for (var i = 0; i < this._participants.length; i++){
			if(this._participants[i].equals(p)){
				index = i;
			}
		}
		return index;
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

	public get currencies(): Array<Currency> {
		return this._currencies;
	}

	public set currencies(value: Array<Currency>) {
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
	equals(t : Trip){
		return t.tripId==this.tripId;
	}
}