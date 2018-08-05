import * as types from '../constants/actionTypes'

const INITIAL_STATE = {
  list: [],
  randoms: [],
  singleQuote: {},
  fetching: false,
  sending: false,
  quoteId: ''
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){

    case types.FETCH_QUOTES,
         types.FETCH_SINGLE_QUOTE:
      return{...state, fetching: true}

    case types.FETCH_QUOTES_SUCCESS:
      return{...state, fetching: false, list: action.quotes}

    case types.FETCH_SINGLE_QUOTE_SUCCESS:
      return{...state, fetching: false, singleQuote: action.quote}

    case types.REMOVE_QUOTES_FROM_ARRAY:
      return{...state, list: []}

    default:
      return{...state}
  }
}
