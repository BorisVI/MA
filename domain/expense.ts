import { TSMap } from "../node_modules/typescript-map";
import { Person } from "./person";
import { Loan } from "./loan";
import {Category} from "./category";

export class Expense{

    private _expenseId: string;
    private _name : string;
    private _date: Date;
    private _loans: Array<Loan> = new Array<Loan>();
    private _payers: TSMap<string,number> = new TSMap<string, number>(); //betalers (person,aantal)
    private _consumers: TSMap<string,number> = new TSMap<string, number>(); //Verbuikers (person,aantal)
    private _category : Category;
    private _currency : string;

    constructor(id:string,name: string, date: Date, currency : string){
        this.expenseId=id;
        this.name = name;
        this.date = date;
        this.category = Category.Misc;
        this.currency = currency;
        /*this.payers = payers;
        this.consumers = consumers;*/
    }

    equals(e: Expense): boolean{
        return e.expenseId == this.expenseId;
    }

    /*
    CalculateLoans(){
        if(this.isValidAmounts){
            let mapOver = new TSMap<Person,number>();
            let mapUnder = new TSMap<Person,number>();
            this._consumers.forEach((value: number, key: Person) =>{
                var amount = 0;
                if(this._payers.has(key)){
                    amount = this._payers.get(key) - value;
                }
                if(amount>0){
                    mapOver.set(key, amount);
                }else{
                    mapUnder.set(key, 0 - amount);
                }
            });
            while(this.getTotalPayers() != 0){
                var topay = 0;
                var canreceive = 0;
                var amount = 0;
                var payer = new Person("","","");
                var receiver = new Person("","","");
                var found = false;
                mapUnder.forEach((value: number, key: Person) =>{
                    if(value != 0 && !found){
                        topay = value;
                        payer = key;
                        found = true;
                    }
                });
                found = false;
                mapOver.forEach((value: number, key: Person) =>{
                    if(value != 0 && !found){
                        canreceive = value;
                        receiver = key;
                        found = true;
                    }
                });
                topay = Math.abs(topay);
                canreceive = Math.abs(canreceive);
                if(topay <= canreceive){
                    amount = topay;
                }else{
                    amount = canreceive;
                }
                this._loans.push(new Loan(receiver,payer,amount));
                mapUnder.set(payer, mapUnder.get(payer) + amount);
                mapOver.set(receiver, mapOver.get(receiver) - amount);
            }
        }else{
            console.log("error on creating loans, unequal amount payers/receivers");
        }

    }
    */

    getTotal(){
        if(this.isValidAmounts){
            return this.getTotalPayers;
        }else{
            return false;
        }
    }

    isValidAmounts(){
        return this.getTotalPayers == this.getTotalconsumers;
    }

    getTotalPayers(){
        var sum = 0;
        this._payers.forEach((value: number, key: string) =>{
            sum += value;
        });
        return sum;
    }

    getTotalconsumers(){
        var sum = 0;
        this._consumers.forEach((value: number, key: string) =>{
            sum += value;
        });
        return sum;
    }

    public get expenseId(): string {
		return this._expenseId;
    }
	public set expenseId(value: string) {
		this._expenseId = value;
	}

	public get loans(): Array<Loan> {
		return this._loans;
	}

	public set loans(value: Array<Loan>) {
		this._loans = value;
	}

	public get date(): Date {
		return this._date;
	}

	public set date(value: Date) {
		this._date = value;
	}

	public get payers(): TSMap<string,number> {
		return this._payers;
	}

	public set payers(value: TSMap<string,number>) {
		this._payers = value;
	}

	public get consumers(): TSMap<string,number> {
		return this._consumers;
	}

	public set consumers(value: TSMap<string,number>) {
		this._consumers = value;
	}

	public get category(): Category {
		return this._category;
	}

	public set category(value: Category) {
		this._category = value;
	}

	public get currency(): string {
		return this._currency;
	}

	public set currency(value: string) {
		this._currency = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
    }
}