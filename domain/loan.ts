import { Person } from "./person";

export class Loan{
    private _payed : boolean;
    private _amount: number;
    private _receiver: Person;
    private _payer: Person;

     constructor(receiver: Person, payer: Person, amount: number){
        this._payed=false;
        this._amount=amount;
        this._receiver = receiver;
        this.payer = payer;
     }

     set receiver(person:Person){
        this._receiver = person;
     }
     set payer(person:Person){
         this._payer = person;
     }
     set amount(amount:number){
        this._amount=amount;
     }
     set payed(payed:boolean){
         this._payed=payed;
     }
     
     get receiver(): Person{
         return this._receiver;
     }
     get payer() : Person{
         return this._payer;
     }
     get amount() : number{
         return this._amount;
     }
     isPayed():boolean{
         return this._payed;
     }

}