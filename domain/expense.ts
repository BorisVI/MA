import { TSMap } from "../node_modules/typescript-map";
import { Currency } from "./currency";
export class Expense{
    private _name : string;
    private _date: Date;
    private _loans: Array<Loan>;
    private _payers: TSMap<Person,number>;
    private _participants: TSMap<Person,number>;
    private _category : Category;
    private _currency : Currency;

    constructor(name: string, date: Date, payers: TSMap<Person, number>, participants: TSMap<Person, number>, category : Category, Currency: Currency){
        this._name = name;
        this._date = date;
        this._payers = payers;
        this._participants = participants;
        this._category = category;
        this._currency = Currency;
        this.CalculateLoans();
    }

    CalculateLoans(){
        if(this.isValidAmounts){
            let mapOver = new TSMap<Person,number>();
            let mapUnder = new TSMap<Person,number>();
            this._participants.forEach((value: number, key: Person) =>{
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
                var payer = new Person("","");
                var receiver = new Person("","");
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

    getTotal(){
        if(this.isValidAmounts){
            return this.getTotalPayers;
        }else{
            return false;
        }
    }

    isValidAmounts(){
        return this.getTotalPayers == this.getTotalParticipants;
    }

    getTotalPayers(){
        var sum = 0;
        this._payers.forEach((value: number, key: Person) =>{
            sum += value;
        });
        return sum;
    }

    getTotalParticipants(){
        var sum = 0;
        this._participants.forEach((value: number, key: Person) =>{
            sum += value;
        });
        return sum;
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

	public get payers(): TSMap<Person,number> {
		return this._payers;
	}

	public set payers(value: TSMap<Person,number>) {
		this._payers = value;
	}

	public get participants(): TSMap<Person,number> {
		return this._participants;
	}

	public set participants(value: TSMap<Person,number>) {
		this._participants = value;
	}

	public get category(): Category {
		return this._category;
	}

	public set category(value: Category) {
		this._category = value;
	}

	public get currency(): Currency {
		return this._currency;
	}

	public set currency(value: Currency) {
		this._currency = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}