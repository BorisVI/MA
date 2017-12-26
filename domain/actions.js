import {Trip} from './trip';
import {Service as Service} from './service';
export const ADD_TIP = 'ADD_TRIP';
export const SELECT_TRIP = 'SELECT_TRIP';
export function addTrip()
{
    return {type: ADD_TIP}
}
export function selectTrip(id)
{
    return {type: SELECT_TRIP, id}
}
export function Reducer(state, action)
{

}