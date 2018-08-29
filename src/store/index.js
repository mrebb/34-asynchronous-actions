import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import thingReducer from './thing';

const appReducer = combineReducers({thingState: thingReducer});

export default createStore(appReducer, applyMiddleware(thunk));

// Can't get to work with REDUX Dev tools :(
  
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));