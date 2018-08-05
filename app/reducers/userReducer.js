import * as types from '../constants/actionTypes'

const INITIAL_STATE = {
  name: '',
  email: '',
  uid: '',
  photoUrl: '',
  loggedIn: false,
  loading: false,
  error: ''
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case types.LOGIN_USER:
      return {...state, loading: true}

    case types.LOGIN_USER_SUCCESS:
      return {...state,
              loading: false,
              loggedIn: true,
              name: action.user.displayName,
              email: action.user.email,
              photoUrl: action.user.photoURL,
              uid: action.user.uid}

    case types.LOGIN_USER_REJECTED:
      return {...state, loading: false, error: action.error}

    default:
      return {...state}
  }
}
