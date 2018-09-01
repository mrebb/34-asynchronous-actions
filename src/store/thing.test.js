import  { addThing, updateThing, removeThing, addThingAsync, updateThingAsync, removeThingAsync, ADD, UPDATE, DESTROY } from './thing';
const api = `https://internets-of-thing-api.herokuapp.com/api/v1/things`;
import superagent from 'superagent';

describe('thing state', () => {

  describe('thing actions', () => {

    it('should create add action', () => {

      const thing = { name: 'flower' };

      const action = addThing(thing);

      expect(action.type).toBe(ADD);

      expect(action.payload).toEqual(thing);
    });
    it('should create update action', () => {

      const thing = { name: 'roses' };

      const action = updateThing(thing);

      expect(action.type).toBe(UPDATE);

      expect(action.payload).toEqual(thing);
    });
    it('should create delete action', () => {

      const thing = { name: 'shelf' };

      const action = removeThing(thing);

      expect(action.type).toBe(DESTROY);

      expect(action.payload).toEqual(thing);
    });

  });

  describe('thing reducer', () => {

    it('should add to empty list', (done) => {

      superagent.get(`${api}`).then((response) => {
        const initialState = response.body;
        const thing = { name: 'pen' };
        const promise = addThingAsync(thing);
        promise(() => { }).then(things => {
          expect(things.length).toBe(initialState.length + 1);
          return things;
        }).then(things=>{
          let newThing =  things.find(thing=>{
            return thing.name='pen';
          });
          removeThingAsync(newThing)(()=>{})
            .then(res=>{
              console.log(res);
              done();
            });
        }
        );
      }
      )
        .catch(err => console.log(err));
    });
    it('should update existing thing', (done) => {

      superagent.get(`${api}`).then((response) => {
        const initialState = response.body;
        let testId = initialState[0].id;
        let updatedName = 'bottle';
        const thing = { name: updatedName,id:testId };
        const promise = updateThingAsync(thing);
        promise(()=>{}).then(()=>{superagent.get(`${api}`).then((response) => {
          const updatedState = response.body;
          expect(updatedState.length).toBe(initialState.length);
          
        })
          .then(things=>{
            let newThing =  things.find(thing=>{
              return thing.name='bottle';
            });
            removeThingAsync(newThing)(()=>{})
              .then(res=>{
                console.log(res);
                done();
              });
          });
        done();
        });

        return initialState;
      });
        
    });
    it('should delete a thing', (done) => {

      superagent.get(`${api}`).then((response) => {
        const initialState = response.body;
        const thing = { name: 'flower' };
        const promise = addThingAsync(thing);
        promise(() => { }).then(things => {
          expect(things.length).toBe(initialState.length + 1);
          return things;
        }).then(things=>{
          let newThing =  things.find(thing=>{
            return thing.name='flower';
          });
          removeThingAsync(newThing)(()=>{})
            .then(res=>{
              console.log(res);
              done();
            });
        }
        );
      }
      )
        .catch(err => console.log(err));
    });

    
  });
});