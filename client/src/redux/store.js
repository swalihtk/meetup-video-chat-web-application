import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logedInCheckReducer from './reducers/loginCheck';

const rootReducer=combineReducers({
    logedIn:logedInCheckReducer
})

const store=createStore(rootReducer, applyMiddleware(thunk));

export default store;