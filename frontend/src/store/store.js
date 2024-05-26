// src/store/index.js

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/rootReducer';
import {thunk} from 'redux-thunk';
import logger from "redux-logger";

const middlewares = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
