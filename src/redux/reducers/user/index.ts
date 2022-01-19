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
  SIGNIN: (state = initialState, action: Action) => {
    return {
      ...state,
      authenticated: true,
      user: action.payload.user,
    }
  },
  LOGOUT: () => initialState,
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
