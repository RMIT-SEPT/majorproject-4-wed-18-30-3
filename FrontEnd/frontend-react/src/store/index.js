import { createStore } from 'redux'

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

const store = createStore(reducer)

export default store