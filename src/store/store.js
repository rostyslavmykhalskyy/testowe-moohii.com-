import { applyMiddleware, createStore } from "redux";
import Reducers from "./rootReducer";
import thunk from "redux-thunk";
const store = createStore(Reducers, applyMiddleware(thunk));

export default store;
