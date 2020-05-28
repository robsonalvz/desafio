import { combineReducers } from 'redux';
import person from './person';

const createRootReducer = () => combineReducers({
  person
});

export default createRootReducer;
