import { Currency } from "./currency";
import { Expense } from "./expense";
import { Person } from "./person";
export class Trip{

    private _id : string;
    private _participants : Array<Person> = new Array();
    private _expenses : Array<Expense> = new Array();
	private _currencies : Array<Currency> = new Array();
    private _startdate : Date;
    private _enddate : Date;
    private _name : string;

    constructor(id : string, name: string, startDate : Date, endDate : Date){
        this._id = id;
        this._name = name;
        this._startdate = startDate;
        this._enddate = endDate;
    }

    addExpense(expense: Expense){
        this._expenses.push(expense);
    }

    addPerson(person : Person){
        this._participants.push(person);
    }

    addCurrency(currency : Currency){
        this._currencies.push(currency);
    }

    removeExpense(expense: Expense){
        this._expenses.splice(this._expenses.indexOf(expense),1);
    }

    removePerson(person : Person){
		if(this.getIndexPerson(person) != -1){
			this._participants.splice(this.getIndexPerson(person),1);
		}
    }

    removeCurrency(currency : Currency){
        this.currencies.splice(this._currencies.indexOf(currency),1);
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

	public toString = () : string => {
		return "{\"id\":\""+ this.id.toString() +"\",\"name\":\""+ this.name.toString() +"\",\"participants\":[" + this.participants.toString() + "],\"expenses\":[" + this.expenses.toString() + "],\"currencies\":[" + this.currencies.toString() + "],\"_startdate\":\"" + this.startdate.toString() + "\",\"_enddate\":\"" + this.enddate.toString() + "\"}";
	}

	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
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

	public get startdate(): Date {
		return this._startdate;
	}

	public set startdate(value: Date) {
		this._startdate = value;
	}

	public get enddate(): Date {
		return this._enddate;
	}

	public set enddate(value: Date) {
		this._enddate = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}