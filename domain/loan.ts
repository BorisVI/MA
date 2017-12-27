import { Person } from "./person";

export class Loan{

    private _loanId: string;
    private _payed : boolean;
    private _amount: number;
    private _receiver: Person;
    private _payer: Person;

     constructor(id:string,receiver: Person, payer: Person, amount: number){
        this.loanId=id;
        this.payed=false;
        this.amount=amount;
        this.receiver = receiver;
        this.payer = payer;
     }

    public get loanId(): string {
		return this._loanId;
	}
	public set loanId(value: string) {
		this._loanId = value;
    }

    public get payed(): boolean {
		return this._payed;
	}
	public set payed(value: boolean) {
		this._payed = value;
	}

    public get amount(): number {
		return this._amount;
	}
	public set amount(value: number) {
		this._amount = value;
    }
    
    public get receiver(): Person {
		return this._receiver;
	}
	public set receiver(value: Person) {
		this._receiver = value;
    }

    public get payer(): Person {
		return this._payer;
	}
	public set payer(value: Person) {
		this._payer = value;
	}

}