import { Trip } from "./trip";
import { AsyncStorage } from 'react-native';
import { Person } from "./person";

export class LocalStorage{

    static async getAllTrips(): Promise<Trip[]> {
        return this.getAllTripKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Trip; });
        });
    }
    
    static async getTrip(tripId: string): Promise<Trip>{
        var trip: Trip= AsyncStorage.getItem('trip_' + tripId).then((json)=>{
            return JSON.parse(json) as Trip;
        });
        return trip;
    }

    static async addTrip(trip: Trip){
        let key = 'trip_' + trip.tripId;
        console.log('add trip with key: ' + key);
        AsyncStorage.setItem(key, JSON.stringify(trip).replace(/"_/g,"\""));
    }
    
    static async removeTrip(tripId: string){
        AsyncStorage.removeItem('trip_' + tripId);
    }

    static async updateTrip(trip: Trip){
        this.addTrip(trip);
    }

    static async getAllTripKeys(): Promise<string[]>{
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r, i, store) => { 
                let key: string = store[i][0];
                if(key.startsWith('trip_')){
                    return store[i][0];
                }
            });
        });
    }

    static getAllCurrenciesPossible():Array<string>{
        let list: string[]=["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"];
        return list;
    }
    static getAllCurrencyValuesHard():Array<[string,number]>{
        let list=Array<[string,number]>();
        list=[["AUD",1.5316],["BGN",1.9558],["BRL",3.9196],["CAD",1.5028],["CHF",1.1772],["CNY",7.7975],["CZK",25.84],["DKK",7.445],["EUR",1],["GBP",0.88593],["HKD",9.2953],["HRK",7.5398],["HUF",310.99],["IDR",16123.0],["ILS",4.1432],["INR",76.312],["JPY",134.7],["KRW",1277.7],["MXN",23.522],["MYR",4.8481],["NOK",9.8605],["NZD",1.6825],["PHP",59.43],["PLN",4.1884],["RON",4.6499],["RUB",68.597],["SEK",9.8727],["SGD",1.5937],["THB",39.027],["TRY",4.5475],["USD",1.1895],["ZAR",14.811]];
        return list;
    }

    static async addAllCurrenciesAndValues(list:Array<[string,number]>):Promise<void>{
        return AsyncStorage.setItem("currencyValues",JSON.stringify(list));
    }

    static async getAllCurrenciesAndValues():Promise<Array<[string,number]>>{
        return AsyncStorage.getItem("currencyValues").then((json)=>{
            return JSON.parse(json) as Array<[string,number]>;
        });

    }

    static async initializeCurrencies(online: Boolean):Promise<void>{
        await this.getAllCurrenciesAndValues().then((list)=>{
            if(list!=null&&list.length!=0){
                if(online){
                    console.log(("TODO WRITE ONLINE REST REQUEST: https://api.fixer.io/latest?base=EUR"));
                }else{
                    this.addAllCurrenciesAndValues(this.getAllCurrencyValuesHard());
                }
            }
        });
    }

    static async setCurrencyValue(currencyTag:string, value:number):Promise<void>{
        return this.getAllCurrenciesAndValues().then((list)=>{
            for(let i=0;i<list.length;i++){
                if(list[i][0]==currencyTag){
                    list[i][1]=value;
                    this.addAllCurrenciesAndValues(list);
                    return;
                }
            }
        });
    }

    static async setAllCurrencyStatussesHard():Promise<void>{
        let list = this.getAllCurrenciesPossible();
        let result = Array<[string,Boolean]>();
        for(let i=0;i<list.length;i++){
            result.push([list[i],false]);
        }
        return AsyncStorage.setItem("currencyStatus",result);
    }

    static async getAllCurrencyStatusses():Promise<Array<[string,Boolean]>>{
        return AsyncStorage.getItem("currencyStatus").then((list)=>{
            return JSON.parse(list) as Array<[string,Boolean]>;
        });
    }

    static async addAllCurrencyStatusses(list:Array<[string,Boolean]>):Promise<void>{
        return AsyncStorage.setItem("currencyStatus",JSON.stringify(list));
    }

    static async getCurrencyValue(currencyTag:string):Promise<[string,number]>{
        return LocalStorage.getAllCurrenciesAndValues().then((list)=>{
            let result:[string,number];
            result=["",0];
            for(let i=0;i < list.length;i++){
                if(list[i][0]==currencyTag){
                    result=[currencyTag,list[i][1]];
                    return result;
                }
            }
            return result;
        });
    }

    static async overwriteCurrency(currencyTag:string,value:number):Promise<void>{
        this.getAllCurrencyStatusses().then((list)=>{
            for(let i=0;i<list.length;i++){
                if(list[i][0]==currencyTag){
                    list[i][1]=true;
                }
            }
            this.addAllCurrencyStatusses(list);
            return;
        });
        this.getAllCurrenciesAndValues().then((list)=>{
            for(let i=0;i<list.length;i++){
                if(list[i][0]==currencyTag){
                    list[i][1]=value;
                }
            }
            this.addAllCurrenciesAndValues(list);
            return;
        });
        return;
    }

    static async clearTripDb(){
        this.getAllTripKeys().then((keys: string[])=>{
            for(let id of keys){
                AsyncStorage.removeItem(id);
            }
        });
    }

    static async clearDb(){
        AsyncStorage.getAllKeys().then((keys: string[])=>{
            for(let id of keys){
                AsyncStorage.removeItem(id);
            }
        });
    }
}