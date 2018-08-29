// import uuid from 'uuid/v1';
import superagent from 'superagent';
// Actions
const ADD = 'Thing/ADD';
const UPDATE = 'Thing/UPDATE';
const DESTROY = 'Thing/DESTROY';
const FETCH = 'Thing/FETCH';
// Reducer
export default function reducer(state = [], action) {

  const { type, payload } = action;

  switch (type) {
    case ADD:
      return [
        ...state,
        payload
      ];
      case DESTROY: 
      let newState = state.filter(thing => thing.id !== payload.id)
      return [
        ...newState
      ];
    case UPDATE:
      newState = state.filter(thing => thing.id !== payload.id)
      return [
        ...newState,
        payload
      ];
      case FETCH:
      return [...payload];
    default: return state;
  }
}

// Action Creators
export function addThing(thing) {

  return {
    type: ADD,
    payload: thing
  }  
}
export function updateThing(thing) {
  return {
    type: UPDATE,
    payload: thing
  }
}

export function removeThing(thing) {
  return {
    type: DESTROY,
    payload: thing
  }
}
export function fetchThings(things) {
  
  return {
    type: FETCH,
    payload: things
  }  
}
export function addThingAsync(thing) {

  return dispatch => {
    superagent.post('https://internets-of-thing-api.herokuapp.com/api/v1/things')
    .send(thing)
    .then(response=>{
      dispatch(addThing(thing))
      return response.body;
    })

};
}
export function updateThingAsync(thing) {

  return dispatch => {
    superagent.put(`https://internets-of-thing-api.herokuapp.com/api/v1/things/${thing.id}`)
    .send(thing)
    .then(response=>{
      dispatch(updateThing(thing))
      return response.body;
    })

};
}
export function removeThingAsync(thing) {

  return dispatch => {
    superagent.delete(`https://internets-of-thing-api.herokuapp.com/api/v1/things/${thing.id}`)
    .then(response=>{
      dispatch(removeThing(thing))
      return response.body;
    })

};
}
export function fetchThingsAsync(thing) {

  return dispatch => {
      superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things')
      .then(response=>{return response.body})
      .then(things=>dispatch(fetchThings(things)))
  };
}