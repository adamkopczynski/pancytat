import * as types from '../constants/actionTypes'

export const createNote = () => ({
  type: types.CREATE_NOTE
})

export const noteCreated = note => ({
  type: types.CREATE_NOTE_SUCCESS,
  note
})

export const fetchQuotes = () => ({
  type: types.FETCH_QUOTES
})

export const quotesFetched = quotes => ({
  type: types.FETCH_QUOTES_SUCCESS,
  quotes
})

export const fetchSingleQuote = () => ({
  type: types.FETCH_SINGLE_QUOTE
})

export const singleQuoteFetched = quote => ({
  type: types.FETCH_SINGLE_QUOTE_SUCCESS,
  quote
})

export const removeQuotes = () => ({
  type: types.REMOVE_QUOTES_FROM_ARRAY
})
