import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currentUser']
}

const initialState = {
    user: [{
        'id': null, 
        'userName': null, 
        'password': null, 
        'address': null, 
        'phone': null, 
        'userType': null
    }]
  }  

const reducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        return Object.assign({}, state, {
            user: state.user.concat(action.payload)
        })
    }
    return state
}

const newReducer = persistReducer(persistConfig, reducer)

export const store = createStore(newReducer)
export const persistor = persistStore(store)

export default {store, persistor}