import { TSMap } from "../node_modules/typescript-map";
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
	
	getExpensesSummary(): TSMap<string, number[]>{
		let map = new TSMap<string,number[]>();
		for (let i = 1; i < this._expenses.length; i++){
			this._expenses[i].participants.forEach((value: number, key: Person) =>{
				let total : number[];
				if(map.has(key.firstName+ " " + key.name)){
					total[0] = value[0];
					total[1] = value[1];
				}
				total[0] += value;
				if(this._expenses[i].payers.has(key)){
                    total[1] += this._expenses[i].payers.get(key);
                }
				map.set(key.firstName+ " " + key.name, total);
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