import Cookies from 'js-cookie'

export const initialState = {
  authenticated: false,
  user: {
    username: '',
    email: '',
    _id: '',
    date: '',
    avatar: '',
  },
}

export type UserReducer = ReturnType<typeof reducer>
const TypeReducers = {
  // eslint-disable-next-line no-unused-vars
  SIGNIN: (state = initialState, action: Action) => {
    return {
      authenticated: true,
      user: action.payload.user,
    }
  },
  LOGOUT: () => {
    Cookies.remove('token')
    return initialState
  },
}

type Action = {
  type: keyof typeof TypeReducers
  payload: {
    user: {
      username: string
      password: string
      email: string
      _id: string
      date: string
      avatar: string
    }
  }
}

const reducer = (state = initialState, action: Action) => {
  const { type } = action
  const handler = TypeReducers[type]
  const newState = handler ? handler(state, action) : state

  return newState
}
export default reducer
