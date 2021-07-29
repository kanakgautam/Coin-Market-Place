import themeReducer from './theme';
import {combineReducers} from 'redux'

const rootReducer =combineReducers({
    theme: themeReducer
})

export default rootReducer;