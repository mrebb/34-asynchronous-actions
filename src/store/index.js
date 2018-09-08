import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import logger from '../middleware/logger';
import validator from '../middleware/validator';
import thunk from 'redux-thunk';

import thingReducer from './thing';

const appReducer = combineReducers({thingState: thingReducer});
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(appReducer, composeEnhancers(applyMiddleware(thunk,logger,validator)));