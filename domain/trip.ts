import { TSMap } from "../node_modules/typescript-map";
import { Expense } from "./expense";
import { Person } from "./person";
import { Loan } from "./loan";
import { Category } from "./category";
export class Trip{

    private _tripId : string;
    private _participants : Array<Person> = new Array();
    private _expenses : Array<Expense> = new Array();
	private _currencies : Array<string> = new Array();
    private _startDate : Date;
    private _endDate : Date;
	private _tripName : string;
	private _standardCurrency: string;

    constructor(tripId : string, name: string, startDate : Date, endDate : Date){
        this.tripId = tripId;
        this.tripName = name;
        this.startDate = startDate;
		this.endDate = endDate;
		this.standardCurrency = "EUR";
	}

	splitBill(expenseId: string, bill: string){
		let expense = this.getExpenseById(expenseId);
		let b = JSON.parse(bill);
		if(expense.consumers == null)
		{
			expense.consumers = new TSMap<string, number>();
		}
		else{
			expense.consumers.clear();
		}
		for(let item of b){
			let amount: number = Number(Number(item.price).toFixed(2)); 
			if(item.isShared){
				amount = Number((Number(amount) / Number(item.consumers.length)).toFixed(2));
			}
			for(let c of item.consumers){
				console.log(c.key + " consumed " + amount + " of " + item.key);
				if(expense.consumers.has(c.key)){
					expense.consumers.set(c.key, Number(amount) + Number(expense.consumers.get(c.key)));
				}else{
					expense.consumers.set(c.key, amount);
				}
				console.log(c.key + " has now consumed " + expense.consumers.get(c.key));
			}
		}
	}

	splitEvenly(expenseId: string, participants: string[], amount: number){
		let expense = this.getExpenseById(expenseId);
		console.log(expense);
		if(expense.consumers == null)
		{
			expense.consumers = new TSMap<string, number>();
		}
		else{
			expense.consumers.clear();
		}
		for(let p of participants){
			expense.consumers.set(p, amount/participants.length);
		}
	}

	payLoan(expenseId: string, loanId: string){
		this.getExpenseById(expenseId).payLoan(loanId);
	}

	getLoans(expenseId: string): TSMap<string[], Loan>{
        let result : TSMap<string[], Loan> = new TSMap<string[], Loan>();
        for(let l of this.getExpenseById(expenseId).loans){
            result.set(this.getPersonInfo(l.payer).concat(this.getPersonInfo(l.receiver)),l);
		}
		console.log(result);
        return result;
    }

	getPersonInfo(personId: string): string[]{
		let person = this.getPersonFromId(personId);
		return [personId, person.firstName, person.lastName];
	}

	getPersonFromId(personId: string): Person{
		for(let p of this.participants){
			if(p.personId == personId){
				return p;
			}
		}
		return null;
	}

	getLoanSummaryForPerson(personId: string): Array<string[]>{
		let resultAll : Array<string[]> = this.getLoanSummary();
		let result : Array<string[]> = new Array<string[]>();
		for(let s of resultAll){
			if(s[0] == personId || s[1] == personId){
				result.push(s);
			}
		}
		return result;
	}

	getLoanSummary(): Array<string[]>{
		let result : Array<string[]> = new Array<string[]>();
		for(let e of this.expenses){
			for(let l of e.loans){
				let payer = this.getPersonFromId(l.payer);
				let receiver = this.getPersonFromId(l.receiver);
				let s : string[] = [l.payer, l.receiver, payer.firstName + ' ' + payer.lastName,receiver.firstName +' ' + receiver.lastName, String(l.amount), l.payed ? "Payed" : "Open"];
				result.push(s);
			}
		}
		return result;
	}

	//table by expense
	getTableByExpense(expenseId: string): TSMap<string[], number[]>{
		let expense = this.getExpenseById(expenseId);
		let map = new TSMap<string,number[]>();
		expense.consumers.forEach((value: number, key: string) =>{
			let amounts = new Array<number>(0,0,0);
			if(map.has(key)){
				amounts = Array<number>(Number(map.get(key)[0]), Number(map.get(key)[1]));
			}
			amounts[0] += Number(value);
			amounts[2] = Number(amounts[1]) - Number(amounts[0]);
			map.set(key, amounts);
		});
		expense.payers.forEach((value: number, key: string) =>{
			let amounts = new Array<number>(0,0,0);
			if(map.has(key)){
				amounts = Array<number>(Number(map.get(key)[0]), Number(map.get(key)[1]));
			}
			amounts[1] += Number(value);
			amounts[2] = Number(amounts[1]) - Number(amounts[0]);
			map.set(key, amounts);
		});
		let result = new TSMap<string[],number[]>();
		map.forEach((value: number[], key: string) =>{
			result.set(this.getPersonInfo(key), value);
		});
		console.log(result);
		return result;
	}

	//expenses per person, not filtered
	getExpensesFromPerson(personId: string): TSMap<string, number[]>{
		let map = new TSMap<string,number[]>();
		for(let e of this.expenses){
			let toPay : number = 0;
			if(e.consumers != null && e.consumers.has(personId)){
				toPay = Number(e.consumers.get(personId));
			}
			let payed : number = 0;
			if(e.payers != null && e.payers.has(personId)){
				payed = Number(e.payers.get(personId));
			}
			if(!(payed == 0 && toPay == 0)){
				let balance = payed - toPay;
				map.set(e.name, [toPay,payed,balance]);
			}
		}
		return map;
	}
	
	getExpensesForPersonPerCategory(personId:string): TSMap<Category,number>{
		let resultMap = new TSMap<Category,number>();
		let result = this.getExpenseForPersonByCategory(personId);
		resultMap.set(Category.OvernightStay,result[0]);
		resultMap.set(Category.Activity,result[1]);
		resultMap.set(Category.Food,result[2]);
		resultMap.set(Category.Transport,result[3]);
		resultMap.set(Category.Misc,result[4]);
		return resultMap;
	}
	
	getExpenseForPersonPerDay(personId:string):TSMap<string,number>{
		let resultMap = new TSMap<string,number>();
		for(let i=0;i<this.expenses.length;i++){
			let expense=this.expenses[i];
			if(expense.consumers.has(personId)){
				let date:Date= new Date(expense.date);
				let datum = ""+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
				console.log(datum);
				let result: number=resultMap.get(datum);
				if(result==null||result==0){
					resultMap.set(datum,expense.consumers.get(personId));
				}else{
					result = Number(result) + Number(expense.consumers.get(personId));
					resultMap.set(datum,result);
				}
			}
		}
		return resultMap;
	}

	getExpenseForPersonByCategory(personId:string):[number,number,number,number,number]{
		let overnight_stay:number = 0;
		let transport:number =0;
		let activity:number=0;
		let food:number=0;
		let misc:number=0;
		for(let i=0;i<this.expenses.length;i++){
			let expense=this.expenses[i];
			if(expense.consumers.has(personId)){
				let amount:number=expense.consumers.get(personId);
				switch(expense.category){
					case Category.OvernightStay:
						overnight_stay= Number(overnight_stay)+Number(amount);
						break;
					case Category.Activity:
						activity=Number(activity)+Number(amount);
						break;
					case Category.Food:
						food=Number(food)+Number(amount);
						break;
					case Category.Transport:
						transport=Number(transport)+Number(amount);
						break;
					case Category.Misc:
						misc=Number(misc)+Number(amount);
						break;
					default:
							return null;
				}
			}
		}
		return [overnight_stay,activity,food,transport,misc];
	}

	//expenses by category
	getExpensesByCategory(): TSMap<string, number>{
		let map = new TSMap<string,number>();
		for(let e of this.expenses){
			let amount: number = 0;
			if(!map.has(Category[e.category])){
				map.set(Category[e.category], 0);
			}
			amount = Number(map.get(Category[e.category])) + Number(e.getTotalConsumers());
			console.log(e.category.toString() + ' ' + amount);
			map.set(Category[e.category], Number(amount));
		}
		console.log(map);
		return map;
	}

	//table by trip
	getExpensesSummary(): TSMap<string[], number[]>{
		let consumersMap = new TSMap<string,number>();
		let payersMap = new TSMap<string,number>();
		for (let e of this.expenses){
			e.consumers.forEach((value: number, key: string) =>{
				let amount : number = 0;
				if(consumersMap.has(key)){
					amount = Number(consumersMap.get(key));
				}
				amount = Number(amount) + Number(value);
				consumersMap.set(key, amount);
			});
			e.payers.forEach((value: number, key: string) =>{
				let amount : number = 0;
				if(payersMap.has(key)){
					amount = Number(payersMap.get(key));
				}
				amount = Number(amount) + Number(value);
				payersMap.set(key, amount);
			});
		}
		let map = new TSMap<string,number[]>();
		consumersMap.forEach((value: number, key: string) =>{
			let amounts = new Array<number>(0,0,0);
			if(map.has(key)){
				amounts = Array<number>(Number(map.get(key)[0]), Number(map.get(key)[1]));
			}
			amounts[0] += Number(value);
			amounts[2] = Number(amounts[1]) - Number(amounts[0]);
			map.set(key, amounts);
		});
		payersMap.forEach((value: number, key: string) =>{
			let amounts = new Array<number>(0,0,0);
			if(map.has(key)){
				amounts = Array<number>(Number(map.get(key)[0]), Number(map.get(key)[1]));
			}
			amounts[1] += Number(value);
			amounts[2] = Number(amounts[1]) - Number(amounts[0]);
			map.set(key, amounts);
		});
		let result = new TSMap<string[],number[]>();
		map.forEach((value: number[], key: string) =>{
			result.set(this.getPersonInfo(key), value);
		});
		return result;
	}

	getLargestExpenseId(): string{
        let highest = 0;
        for(let expense of this.expenses){
            if(Number(expense.expenseId) > highest){
                highest = Number(expense.expenseId);
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

	getExpenseById(expenseId: string): Expense{
		for(let e of this.expenses){
			if(e.expenseId == expenseId){
				return e;
			}
		}
		return null;
	}

	editExpense(expense: Expense){
		this.removeExpense(expense.expenseId);
		this.addExpense(expense);
	}

    addExpense(expense: Expense){
        this.expenses.push(expense);
    }

    addPerson(person : Person):Boolean{
		let canDo=true;
		for(let i=0;i<this.participants.length;i++){
			if(this.participants[i].firstName==person.firstName&&this.participants[i].lastName==person.lastName){
				canDo=false;
			}
		}
		if(canDo){
			this.participants.push(person);
		}
		return canDo;
    }

    addCurrency(currency : string){
        this.currencies.push(currency);
    }

    removeExpense(id: string){
        this.expenses.splice(this.expenses.findIndex(e => e.expenseId == id),1);
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

	public get standardCurrency(): string {
		return this._standardCurrency;
	}
	public set standardCurrency(value: string) {
		this._standardCurrency = value;
	}
	equals(t : Trip): Boolean {
		return t.tripId==this.tripId;
	}
}