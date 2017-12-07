class Loan{
    private _payed : boolean;
    private _amount: number;
    private _receiver: Person;
    private _payer: Person;

     constructor(amount: number){
        this._payed=false;
        this._amount=amount;
     }

     set receiver(person:Person){
        this._receiver = person;
     }
     set payer(person:Person){
         this._payer = person;
     }

     get receiver(): Person{
         return this._receiver;
     }
     get payer() : Person{
         return this._payer;
     }



}