import * as types from '../constants/actionTypes'

export const loginUser = () => ({
  type: types.LOGIN_USER
})

export const userLoggedIn = (user) => ({
  type: types.LOGIN_USER_SUCCESS,
  user
})

export const authError = (error) => ({
  type: types.LOGIN_USER_REJECTED,
  error
})
