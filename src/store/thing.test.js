import reducer, { addThing, updateThing, removeThing,addThingAsync,updateThingAsync,removeThingAsync,ADD,UPDATE,DESTROY} from './thing';
import superagent from 'superagent';

describe('thing state', () => {

  describe('thing actions', () => {

    it('should create add action', () => {

      const thing = {name:'flower'};

      const action = addThing(thing);

      expect(action.type).toBe(ADD);

      expect(action.payload).toEqual(thing);
    });
    it('should create update action', () => {

      const thing = {name:'roses'};

      const action = updateThing(thing);

      expect(action.type).toBe(UPDATE);

      expect(action.payload).toEqual(thing);
    });
    it('should create delete action', () => {

      const thing = {name:'shelf'};

      const action = removeThing(thing);

      expect(action.type).toBe(DESTROY);

      expect(action.payload).toEqual(thing);
    });

  });

  describe('thing reducer', () => {

    it('should add to empty list', (done) => {

       superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things').then((response)=>{
        let things = response.body;
      let initialState = things;
      const thing = {name:'pen'};
      addThingAsync(thing)
      const action = addThing(thing)
      const state = reducer(initialState,action);
      expect(state.length).toBe(initialState.length +1);

      expect(state[initialState.length].name).toBe(thing.name);
      done()
      }
      )
      .catch(err=>console.log(err))
    });

    it('should update thing', (done) => {
      return superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things').then((response)=>{
        let things = response.body;
      let initialState = things;
      let targetId = things[0].id;
      const thing = {name:'updatedThing',id:targetId};
      const action = updateThing(thing);
      const state = reducer(initialState,action);

      expect(state.length).toBe(initialState.length);

      done();
      }
      )
    });
    xit('should delete thing', () => {

      const thing = {name:'burger'};

      const addAction = addThing(thing);

      let state = reducer({things:[]}, addAction);

      const catToRemove = {...state.things[0]};

      const deleteAction = removeThing(catToRemove);

      const updatedState = reducer(state, deleteAction);

      expect(updatedState.things.length).toBe(0);

    });
  });
});