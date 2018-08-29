// import uuid from 'uuid/v1';
import superagent from 'superagent';
// Actions
export const ADD = 'Thing/ADD';
export const UPDATE = 'Thing/UPDATE';
export const DESTROY = 'Thing/DESTROY';
export const FETCH = 'Thing/FETCH';
let defaultState = [];
// Reducer
export default function reducer(state = defaultState, action) {

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
      let updatedState = state.filter(thing => thing.id !== payload.id)
      return [
        ...updatedState,
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
    .then(()=>{
        dispatch(addThing(thing))
        superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things')
          .then(response=>{
            console.log(response.body)
            return response.body})
          .then((things)=>{dispatch(fetchThings(things))})
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
export function fetchThingsAsync() {

  return dispatch => {
      superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things')
      .then(response=>{return response.body})
      .then(things=>dispatch(fetchThings(things)))
  };
}