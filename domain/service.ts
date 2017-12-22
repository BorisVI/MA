class Service {

	constructor(){
	}
    createPerson(firstname:string,name:string): Person{
        return new Person(firstname,name);
    }
    createLoan(receiver: Person, payer: Person, amount: number): Loan{
        return new Loan(receiver,payer,amount);
    }
    createExpense(): Expense{
        
    }
}
