import { combineReducers } from "redux";
import answerReducer from './answerReducer'
const reducers = combineReducers({
    answer: answerReducer
})
export default reducers;