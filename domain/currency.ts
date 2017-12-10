
import { TSMap } from "../node_modules/typescript-map";
import * as express from "express";
import {Server, Path, GET, PathParam} from "typescript-rest";
export class Currency{
    private _name : string;
    private _rateToCurrencies : TSMap<string,number>;
    constructor(name: string){
        this._name = name;
        this.update();

    }

    update(){
        const json = 'https://api.fixer.io/latest?base='+ this._name;
        let jsonobj = JSON.parse(json);
        for(let entry in jsonobj.rates){
            console.log(entry);
            //TODO correctly read json, requires testing
        }
    }

    set name(name:string){
        this._name = name;
     }
     set rateToCurrecies(rateToCurrecies:TSMap<string,number>){
         this._rateToCurrencies = rateToCurrecies;
     }
     
     get name(): string{
         return this._name;
     }
     get rateToCurrencies() : TSMap<string,number>{
         return this._rateToCurrencies;
     }

}