import {createStore, combineReducers} from 'redux'

import user from '../reducers/userReducer'
import quotes  from '../reducers/quotesReducer'
import favorites  from '../reducers/favoritesReducer'
import comments  from '../reducers/commentsReducer'
import top  from '../reducers/topReducer'

const reducers = combineReducers({
    user,
    quotes,
    favorites,
    comments,
    top
})

const store = createStore(reducers)

export default store
